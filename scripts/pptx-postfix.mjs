// Membersihkan XML PPTX dari pemicu dialog "repair" PowerPoint.
import { readFileSync, writeFileSync } from "node:fs";
import JSZip from "jszip";

const FILE = process.argv[2];
if (!FILE) throw new Error("pakai: node scripts/pptx-postfix.mjs <file.pptx>");

const zip = await JSZip.loadAsync(readFileSync(FILE));
const names = Object.keys(zip.files).filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n));
let fixes = 0;

for (const name of names) {
  let xml = await zip.file(name).async("string");
  const before = xml;

  // 1. nama cNvPr kosong + 6. id unik per slide
  let id = 1;
  xml = xml.replace(/<p:cNvPr([^>]*?)\/>/g, (m, attrs) => {
    let a = attrs;
    a = a.replace(/\sid="\d+"/, "");
    a = /name="[^"]+"/.test(a) ? a : a.replace(/\sname="[^"]*"/, "");
    if (!/name="[^"]+"/.test(a)) a += ` name="Objek ${id}"`;
    return `<p:cNvPr id="${++id}"${a}/>`;
  });
  xml = xml.replace(/<p:cNvPr([^>]*?)>/g, (m, attrs) => {
    if (attrs.endsWith("/")) return m;
    let a = attrs.replace(/\sid="\d+"/, "");
    if (!/name="[^"]+"/.test(a)) a = a.replace(/\sname="[^"]*"/, "") + ` name="Objek ${id}"`;
    return `<p:cNvPr id="${++id}"${a}>`;
  });

  // 2. <a:ln/> kosong
  xml = xml.replace(/<a:ln\s*\/>/g, "").replace(/<a:ln>\s*<\/a:ln>/g, "");
  // 3. ext nol
  xml = xml.replace(/<a:ext cx="0" cy="0"\s*\/>/g, "");
  // 4. autofit ganda
  xml = xml.replace(/(<a:normAutofit[^>]*\/>)\s*<a:spAutoFit\s*\/>/g, "$1");
  xml = xml.replace(/<a:spAutoFit\s*\/>\s*(<a:normAutofit[^>]*\/>)/g, "$1");
  // 5. dimensi terlalu kecil
  xml = xml.replace(/<a:ext cx="(\d+)" cy="(\d+)"\/>/g, (m, cx, cy) => {
    const nx = Math.max(Number(cx), 10000);
    const ny = Math.max(Number(cy), 10000);
    return `<a:ext cx="${nx}" cy="${ny}"/>`;
  });

  if (xml !== before) fixes++;
  zip.file(name, xml);
}

// 7. urutan elemen presentation.xml (notesMasterIdLst harus sebelum sldIdLst)
{
  const pn = "ppt/presentation.xml";
  if (zip.file(pn)) {
    let px = await zip.file(pn).async("string");
    const nm = px.match(/<p:notesMasterIdLst>.*?<\/p:notesMasterIdLst>/s);
    if (nm && px.indexOf(nm[0]) > px.indexOf("<p:sldIdLst>")) {
      px = px.replace(nm[0], "").replace("<p:sldIdLst>", nm[0] + "<p:sldIdLst>");
      zip.file(pn, px);
      console.log("urutan presentation.xml diperbaiki");
    }
  }
}

const buf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
writeFileSync(FILE, buf);
console.log(`postfix selesai: ${names.length} slide, ${fixes} berkas diperbaiki`);
