// Membangun PPTX yang teksnya bisa diedit: tiap elemen slide (kotak, teks,
// gambar) dipetakan menjadi objek native PowerPoint.
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import PptxGenJS from "pptxgenjs";

const DIR = "/tmp/browser/deck/native";
const OUT =
  process.argv[2] ?? "/mnt/documents/tesis-random-forest-stemi-nstemi-editable.pptx";

const slides = JSON.parse(readFileSync(`${DIR}/slides.json`, "utf8"));
const K = 13.333 / 1920; // px -> inch
const inch = (v) => Math.round(v * K * 1000) / 1000;

const cache = new Map();
async function imgData(src) {
  if (cache.has(src)) return cache.get(src);
  const url = src.startsWith("http") ? src : `http://localhost:8080${src}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`gagal ambil ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const mime = url.match(/\.png/i) ? "image/png" : url.match(/\.svg/i) ? "image/svg+xml" : "image/jpeg";
  const data = `${mime};base64,${buf.toString("base64")}`;
  cache.set(src, data);
  return data;
}

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "L16x9", width: 13.333, height: 7.5 });
pptx.layout = "L16x9";
pptx.title = "Model Random Forest untuk Prediksi Mortalitas In-Hospital STEMI/NSTEMI";
pptx.author = "Izzan";

for (const items of slides) {
  const s = pptx.addSlide();
  s.background = { color: "F2F1EA" };

  for (const it of items) {
    const pos = { x: inch(it.x), y: inch(it.y), w: inch(it.w), h: inch(it.h) };

    if (it.type === "rect") {
      s.addShape(pptx.ShapeType.rect, {
        ...pos,
        fill: { color: it.fill, transparency: Math.round((1 - it.alpha) * 100) },
        line: { type: "none" },
        rectRadius: it.radius ? Math.min(0.2, inch(it.radius)) : 0,
      });
    } else if (it.type === "img") {
      const data = await imgData(it.src);
      s.addImage({ data, ...pos, sizing: { type: it.fit === "cover" ? "cover" : "contain", w: pos.w, h: pos.h } });
    } else if (it.type === "svgshot") {
      const p = `${DIR}/shots/${it.id}.png`;
      if (!existsSync(p)) continue;
      s.addImage({
        data: `image/png;base64,${readFileSync(p).toString("base64")}`,
        ...pos,
      });
    } else if (it.type === "text") {
      const runs = it.runs.map((r, i) => ({
        text: r.text,
        options: {
          bold: r.bold,
          italic: r.italic,
          color: r.color,
          fontSize: Math.max(6, r.size),
          fontFace: /Archivo/i.test(r.face) ? "Archivo" : "IBM Plex Sans",
          breakLine: !!r.br,
        },
      }));
      const maxSize = Math.max(...it.runs.map((r) => r.size));
      const hasBr = it.runs.some((r) => r.br);
      const single = (it.lines ?? 1) <= 1 && !hasBr;
      // satu baris: jangan dibungkus (metrik font PowerPoint berbeda),
      // banyak baris: beri kelonggaran lebar 6%.
      const wNat = inch(Math.max(it.w, (it.natW ?? 0) + 6));
      const w = single
        ? Math.min(13.333 - pos.x, Math.max(pos.w, wNat) + 0.08)
        : Math.min(13.333 - pos.x, pos.w * 1.06 + 0.05);
      s.addText(runs, {
        ...pos,
        w,
        x: it.align === "right" ? Math.max(0, pos.x + pos.w - w) : pos.x,
        h: pos.h + 0.05,
        align: it.align === "right" ? "right" : it.align === "center" ? "center" : "left",
        valign: "top",
        margin: 0,
        wrap: !single,
        lineSpacingMultiple: Math.max(0.9, Math.min(2, it.lineMul)),
        charSpacing: it.letter ? Math.round(it.letter * 0.5 * 10) / 10 : 0,
        fontSize: Math.max(6, maxSize),
        fit: "shrink",
      });
    }
  }
}

await pptx.writeFile({ fileName: OUT });
console.log("selesai:", OUT, slides.length, "slide");

