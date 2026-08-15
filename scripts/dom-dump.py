"""Membaca deck dari DOM (mode ?print=true) menjadi data JSON.

Tidak ada screenshot slide. Satu-satunya raster adalah wrapper chart Recharts.
Hasil: /tmp/browser/deck/native/slides.json + shots/<id>.png
"""
import asyncio, json, os, sys
from playwright.async_api import async_playwright

OUT = sys.argv[1] if len(sys.argv) > 1 else "/tmp/browser/deck/native"
URL = "http://localhost:8080/?print=true"

JS = r"""
() => {
  const CANVAS_W = 1920;
  const rgba = (s) => {
    const m = String(s).match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(",").map((v) => parseFloat(v));
    const a = p.length > 3 ? p[3] : 1;
    if (!a) return null;
    const hex = p.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
    return { hex: hex.toUpperCase(), alpha: a };
  };
  const firstGradientColor = (bg) => {
    const m = String(bg).match(/rgba?\([^)]+\)/g);
    if (!m) return null;
    for (const c of m) { const r = rgba(c); if (r) return r; }
    return null;
  };
  const BLOCKY = new Set(["block","flex","grid","table","list-item","flow-root","inline-flex","inline-grid"]);
  const isTextBlock = (el) => {
    if (!el.textContent || !el.textContent.trim()) return false;
    for (const d of el.querySelectorAll("*")) {
      if (d.tagName === "BR") continue;
      const dd = getComputedStyle(d).display;
      if (BLOCKY.has(dd)) return false;
      if (d.tagName === "IMG" || d.tagName === "SVG" || d.tagName === "svg") return false;
    }
    return true;
  };

  const pages = [...document.querySelectorAll(".deck-print-page")];
  let chartN = 0;
  return pages.map((page, pi) => {
    const base = page.getBoundingClientRect();
    const items = [];
    const rel = (r) => ({ x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height });

    const runsOf = (el) => {
      const runs = [];
      const walk = (node, inh) => {
        for (const n of node.childNodes) {
          if (n.nodeType === 3) {
            const t = n.textContent.replace(/\s+/g, " ");
            if (!t.trim() && !runs.length) continue;
            runs.push({ ...inh, text: t });
          } else if (n.nodeType === 1) {
            if (n.tagName === "BR") { if (runs.length) runs[runs.length - 1].br = true; continue; }
            const cs = getComputedStyle(n);
            const c = rgba(cs.color) || { hex: "12261D" };
            walk(n, {
              bold: parseInt(cs.fontWeight, 10) >= 600,
              italic: cs.fontStyle === "italic",
              color: c.hex,
              size: parseFloat(cs.fontSize),
              face: cs.fontFamily,
            });
          }
        }
      };
      const cs = getComputedStyle(el);
      const c = rgba(cs.color) || { hex: "12261D" };
      walk(el, {
        bold: parseInt(cs.fontWeight, 10) >= 600,
        italic: cs.fontStyle === "italic",
        color: c.hex,
        size: parseFloat(cs.fontSize),
        face: cs.fontFamily,
      });
      return runs.filter((r) => r.text.length);
    };

    const measure = (el, lhPx) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const rects = [...range.getClientRects()].filter((r) => r.width > 0.5);
      // kelompokkan baris dengan toleransi (run beda ukuran font punya top beda tipis)
      const tops = [];
      rects.forEach((r) => {
        if (!tops.some((t) => Math.abs(t - r.top) < Math.max(6, lhPx * 0.6))) tops.push(r.top);
      });
      const lines = Math.max(1, tops.length);
      const natW = lines === 1
        ? rects.reduce((a, r) => a + r.width, 0)
        : rects.length ? Math.max(...rects.map((r) => r.width)) : 0;
      return { lines, natW };

    };

    const visit = (el) => {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      const r = el.getBoundingClientRect();
      if (r.width < 0.5 || r.height < 0.5) return;
      const box = rel(r);

      if (el.classList && el.classList.contains("recharts-wrapper")) {
        items.push({ type: "chart", id: `c${pi + 1}_${++chartN}`, ...box });
        return;
      }
      if (el.tagName === "TABLE") {
        const rows = [...el.querySelectorAll("tr")].map((tr) =>
          [...tr.children].map((td) => {
            const ts = getComputedStyle(td);
            const fill = rgba(ts.backgroundColor);
            const col = rgba(ts.color) || { hex: "12261D" };
            return {
              text: td.innerText.replace(/\s+/g, " ").trim(),
              bold: parseInt(ts.fontWeight, 10) >= 600,
              size: parseFloat(ts.fontSize),
              color: col.hex,
              align: ts.textAlign,
              fill: fill ? fill.hex : null,
              header: td.tagName === "TH",
              w: td.getBoundingClientRect().width,
            };
          }),
        );
        const first = rows.reduce((a, b) => (b.length > a.length ? b : a), rows[0] || []);
        items.push({ type: "table", ...box, colWidths: first.map((c) => c.w), rows });
        return;
      }
      if (el.tagName === "IMG") {
        items.push({
          type: "img", ...box, src: el.getAttribute("src"),
          fit: cs.objectFit || "contain", opacity: parseFloat(cs.opacity || "1"),
        });
        return;
      }
      if (el.tagName === "svg" || el.tagName === "SVG") return;

      const bgc = rgba(cs.backgroundColor);
      const grad = /gradient/.test(cs.backgroundImage) ? firstGradientColor(cs.backgroundImage) : null;
      const bd = parseFloat(cs.borderTopWidth) || 0;
      const bdc = rgba(cs.borderTopColor);
      if (bgc || grad || (bd > 0 && bdc)) {
        const f = bgc || grad;
        items.push({
          type: "rect", ...box,
          fill: f ? f.hex : null,
          alpha: f ? (grad && !bgc ? Math.min(1, f.alpha * 0.85) : f.alpha) * parseFloat(cs.opacity || "1") : 0,
          radius: parseFloat(cs.borderTopLeftRadius) || 0,
          line: bd > 0 && bdc ? { color: bdc.hex, w: bd } : null,
        });
      }

      if (isTextBlock(el)) {
        const runs = runsOf(el);
        if (runs.length) {
          const lh = parseFloat(cs.lineHeight);
          const fs = parseFloat(cs.fontSize);
          const m = measure(el, Number.isFinite(lh) ? lh : fs * 1.2);

          items.push({
            type: "text", ...box, runs,
            align: cs.textAlign, letter: parseFloat(cs.letterSpacing) || 0,
            lineMul: Number.isFinite(lh) ? lh / fs : 1.2,
            lines: m.lines, natW: m.natW,
            padL: parseFloat(cs.paddingLeft) || 0,
            padT: parseFloat(cs.paddingTop) || 0,
          });
        }
        return;
      }
      for (const c of el.children) visit(c);
    };

    for (const c of page.children) visit(c);
    return items.filter((i) => i.x > -400 && i.x < CANVAS_W + 400);
  });
}
"""


async def main():
    os.makedirs(f"{OUT}/shots", exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        ctx = await b.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=2)
        page = await ctx.new_page()
        await page.goto(URL, wait_until="networkidle", timeout=180000)
        await page.evaluate("document.fonts.ready")
        await page.wait_for_timeout(6000)
        slides = await page.evaluate(JS)
        n = 0
        for si, items in enumerate(slides):
            for it in items:
                if it["type"] == "chart":
                    loc = page.locator(".deck-print-page").nth(si).locator(".recharts-wrapper")
                    idx = int(it["id"].split("_")[1]) - 1
                    cnt = await loc.count()
                    local = [x for x in items if x["type"] == "chart"].index(it)
                    if local < cnt:
                        await loc.nth(local).screenshot(path=f"{OUT}/shots/{it['id']}.png")
                        n += 1
        with open(f"{OUT}/slides.json", "w") as f:
            json.dump(slides, f)
        print("slides:", len(slides), "items:", sum(len(s) for s in slides), "charts:", n)
        await b.close()


asyncio.run(main())
