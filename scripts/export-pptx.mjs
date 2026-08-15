// Membangun PPTX editable dari data DOM (scripts/dom-dump.py).
// Semua teks jadi textbox native, semua <table> jadi tabel native.
import { readFileSync, existsSync } from "node:fs";
import PptxGenJS from "pptxgenjs";

const DIR = process.argv[3] ?? "/tmp/browser/deck/native";
const OUT =
  process.argv[2] ??
  "/mnt/documents/tesis-deck-random-forest-stemi-nstemi-editable.pptx";

const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const PX2IN = 1 / 144; // 1920px -> 13.333in
const PX2PT = 0.5; // 1px = 0.5pt pada kanvas ini

const slides = JSON.parse(readFileSync(`${DIR}/slides.json`, "utf8"));
const inch = (px) => Math.round(px * PX2IN * 10000) / 10000;
const pt = (px) => Math.max(5.5, Math.round(px * PX2PT * 10) / 10);
const faceOf = (f) => (/Archivo/i.test(f ?? "") ? "Archivo" : "IBM Plex Sans");

const cache = new Map();
async function imgData(src) {
  if (cache.has(src)) return cache.get(src);
  const url = src.startsWith("http") ? src : `http://localhost:8080${src}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`gagal ambil ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const mime = /\.png/i.test(url)
    ? "image/png"
    : /\.svg/i.test(url)
      ? "image/svg+xml"
      : "image/jpeg";
  const data = `${mime};base64,${buf.toString("base64")}`;
  cache.set(src, data);
  return data;
}

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "L16x9", width: SLIDE_W, height: SLIDE_H });
pptx.layout = "L16x9";
pptx.title =
  "Random Forest untuk Prediksi Mortalitas In-Hospital STEMI/NSTEMI";
pptx.author = "Izzan";

let nTable = 0;
let nText = 0;
let nPic = 0;

function addTable(s, it) {
  const x = inch(it.x);
  const y = inch(it.y);
  const areaH = inch(it.h);
  const totalPx = it.colWidths.reduce((a, b) => a + b, 0) || it.w;
  let colW = it.colWidths.map((w) => (w / totalPx) * inch(it.w));

  const rowsSrc = it.rows;
  let scale = 1;
  let heights = [];
  for (let attempt = 0; attempt < 12; attempt++) {
    heights = rowsSrc.map((row) => {
      let h = 0.14;
      row.forEach((c, ci) => {
        const fs = pt(c.size) * scale;
        const cw = Math.max(0.3, colW[ci] ?? colW[colW.length - 1]);
        const lines = Math.max(
          1,
          Math.ceil((c.text.length * fs * 0.52) / 72 / (cw - 0.06)),
        );
        h = Math.max(h, (lines * fs * 1.38) / 72 + 0.07);
      });
      return h;
    });
    const total = heights.reduce((a, b) => a + b, 0);
    if (total <= areaH || pt(rowsSrc[0][0].size) * scale <= 5.5) break;
    scale *= 0.93;
  }
  const total = heights.reduce((a, b) => a + b, 0);
  if (total > areaH) {
    const k = areaH / total;
    heights = heights.map((h) => h * k);
  }

  const rows = rowsSrc.map((row) =>
    row.map((c) => ({
      text: c.text,
      options: {
        bold: c.bold || c.header,
        fontSize: pt(c.size) * scale,
        fontFace: "IBM Plex Sans",
        color: c.header ? "0E4632" : c.color,
        align: c.align === "center" ? "center" : c.align === "right" ? "right" : "left",
        valign: "middle",
        fill: c.header ? { color: "E6F2E3" } : c.fill ? { color: c.fill } : undefined,
        margin: [1, 2, 1, 2],
        border: [
          { type: "none" },
          { type: "none" },
          c.header
            ? { type: "solid", color: "0E4632", pt: 1.2 }
            : { type: "solid", color: "D3D1C5", pt: 0.4 },
          { type: "none" },
        ],
      },
    })),
  );

  s.addTable(rows, {
    x,
    y,
    w: inch(it.w),
    colW,
    rowH: heights,
    autoPage: false,
    border: { type: "none" },
  });
  nTable++;
}

for (const items of slides) {
  const s = pptx.addSlide();
  s.background = { color: "F2F1EA" };

  for (const it of items) {
    const pos = { x: inch(it.x), y: inch(it.y), w: inch(it.w), h: inch(it.h) };
    if (pos.w < 0.02 || pos.h < 0.02) continue;

    if (it.type === "rect") {
      if (!it.fill && !it.line) continue;
      s.addShape(it.radius > 2 ? pptx.ShapeType.roundRect : pptx.ShapeType.rect, {
        ...pos,
        fill: it.fill
          ? { color: it.fill, transparency: Math.round((1 - (it.alpha ?? 1)) * 100) }
          : { type: "none" },
        line: it.line
          ? { color: it.line.color, width: Math.max(0.25, it.line.w * 0.5) }
          : { type: "none" },
        rectRadius: it.radius ? Math.min(0.18, inch(it.radius)) : 0,
      });
    } else if (it.type === "img") {
      const data = await imgData(it.src);
      s.addImage({
        data,
        ...pos,
        sizing: { type: it.fit === "cover" ? "cover" : "contain", w: pos.w, h: pos.h },
        transparency: Math.round((1 - (it.opacity ?? 1)) * 100),
      });
      nPic++;
    } else if (it.type === "chart") {
      const p = `${DIR}/shots/${it.id}.png`;
      if (!existsSync(p)) continue;
      s.addImage({
        data: `image/png;base64,${readFileSync(p).toString("base64")}`,
        ...pos,
      });
      nPic++;
    } else if (it.type === "table") {
      addTable(s, it);
    } else if (it.type === "text") {
      const hasBr0 = it.runs.some((r) => r.br);
      // banyak baris: metrik font PowerPoint sedikit lebih lebar, kecilkan 4%
      const shrink = (it.lines ?? 1) <= 1 && !hasBr0 ? 1 : 0.96;
      const runs = it.runs.map((r) => ({
        text: r.text,
        options: {
          bold: !!r.bold,
          italic: !!r.italic,
          color: r.color,
          fontSize: Math.max(6, pt(r.size) * shrink),
          fontFace: faceOf(r.face),
          breakLine: !!r.br,
        },
      }));
      const maxSize = Math.max(...it.runs.map((r) => pt(r.size) * shrink));
      const hasBr = it.runs.some((r) => r.br);
      const single = (it.lines ?? 1) <= 1 && !hasBr;

      let x = pos.x + inch(it.padL ?? 0);
      let w;
      if (single) {
        w = Math.max(pos.w, inch(it.natW ?? 0)) + 0.22;
        if (x + w > SLIDE_W) x = Math.max(0, SLIDE_W - w);
      } else {
        w = Math.min(SLIDE_W - x, pos.w * 1.04 + 0.04);
      }
      if (it.align === "right") x = Math.max(0, pos.x + pos.w - w);
      else if (it.align === "center") x = Math.max(0, pos.x + pos.w / 2 - w / 2);

      s.addText(runs, {
        x,
        y: pos.y + inch(it.padT ?? 0),
        w,
        h: pos.h + 0.06,
        align: it.align === "right" ? "right" : it.align === "center" ? "center" : "left",
        valign: "top",
        margin: 0,
        wrap: !single,
        lineSpacingMultiple: Math.max(0.8, Math.min(2, it.lineMul ?? 1.2)),
        charSpacing: it.letter ? Math.round(it.letter * PX2PT * 10) / 10 : 0,
        fontSize: maxSize,
      });
      nText++;
    }
  }
}

await pptx.writeFile({ fileName: OUT });
console.log(
  `selesai: ${OUT} | slide=${slides.length} text=${nText} tabel=${nTable} gambar=${nPic}`,
);
