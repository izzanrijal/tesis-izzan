// Ekspor deck ke PPTX: tiap slide dirender 1920x1080 lewat Playwright,
// lalu di-embed sebagai gambar penuh pada slide 16:9.
import { readFileSync, readdirSync } from "node:fs";
import PptxGenJS from "pptxgenjs";

const dir = process.argv[2] ?? "/tmp/browser/deck/pptx";
const out = process.argv[3] ?? "/mnt/documents/tesis-random-forest-stemi-nstemi.pptx";

const files = readdirSync(dir)
  .filter((f) => f.endsWith(".png"))
  .sort();

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "L16x9", width: 13.333, height: 7.5 });
pptx.layout = "L16x9";
pptx.title = "Model Random Forest untuk Prediksi Mortalitas In-Hospital STEMI/NSTEMI";

for (const f of files) {
  const b64 = readFileSync(`${dir}/${f}`).toString("base64");
  const s = pptx.addSlide();
  s.addImage({ data: `image/png;base64,${b64}`, x: 0, y: 0, w: 13.333, h: 7.5 });
}

await pptx.writeFile({ fileName: out });
console.log("written", out, files.length, "slides");
