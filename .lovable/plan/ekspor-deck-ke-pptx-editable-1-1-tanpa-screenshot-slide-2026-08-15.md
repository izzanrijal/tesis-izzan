# Ekspor deck ke PPTX editable 1:1 (tanpa screenshot slide)

Catatan penting: deck saat ini berisi **50 slide** (bukan 34) sesuai `src/components/slides/registry.ts`. Semua target verifikasi disesuaikan ke jumlah nyata, bukan angka 34.

## Tujuan
Menghasilkan `tesis-deck-random-forest-stemi-nstemi-editable.pptx` di `/mnt/documents` di mana:
- seluruh teks adalah textbox native PowerPoint (bisa diklik, diedit, diganti font),
- setiap `<table>` di web menjadi tabel native PowerPoint,
- posisi/ukuran/warna/font sama dengan tampilan web 1920x1080,
- file terbuka tanpa dialog "repair".

Tidak ada satu pun slide yang di-screenshot. Gambar hanya dipakai untuk figur penelitian asli (PNG/SVG) dan wrapper chart Recharts.

## Langkah kerja

### 1. `scripts/dom-dump.mjs` (Playwright, read-only)
Buka `http://localhost:8080/?print=true` pada viewport 1920x1080, deviceScaleFactor 1, tunggu font + gambar selesai.
Untuk tiap `div.deck-print-page`, kumpulkan daftar item terurut z-order:
- **rect**: elemen dengan background non-transparan/border-radius → `{x,y,w,h,fill,alpha,radius}`
- **img**: `src`, posisi, `objectFit`, `opacity`
- **chartshot**: satu screenshot PNG per `.recharts-wrapper` (satu-satunya screenshot yang diizinkan)
- **table**: struktur baris/sel + teks + style sel + lebar kolom nyata + posisi tabel
- **text**: node teks daun → runs (`text,bold,italic,color,size,face,letterSpacing,br`), `align`, `lineHeight`, jumlah baris nyata, dan lebar alami teks dari `Range.getClientRects()`

Elemen di dalam `<table>` dan di dalam `.recharts-wrapper` dikecualikan dari koleksi text/rect agar tidak dobel.

### 2. `scripts/export-pptx.mjs` (pembangun PPTX)
Menulis ulang pipeline yang ada (`export-pptx-native.mjs`) dengan konversi yang benar:
- slide 13.333 x 7.5 in, background solid `F2F1EA`
- posisi: `in = px / 144` (setara `emu = px * 6350`)
- ukuran font: `pt = px * 0.5`; letter-spacing `spc = letter_px * 0.5`
- font: `Archivo` bila fontFamily mengandung Archivo, selain itu `IBM Plex Sans`

Urutan gambar per slide: rect → gambar/chart → overlay pita judul (`082A1E` alpha 0.55) → tabel → teks.

Aturan teks:
- satu baris: `wrap:false`, lebar = `max(w, natW) + 0.22in`, geser x bila melewati tepi kanan
- multi baris: `wrap:true`, lebar = `min(13.333 - x, w * 1.03 + 0.03)`
- margin dalam 0, runs per-style, `lineSpacingMultiple` dari lineHeight
- teks bullet diposisikan setelah kotak marker (marker 10px + gap 16px), bukan menimpanya
- legenda Recharts tidak dibuat ulang sebagai teks (sudah ada di gambar chart)

Aturan tabel native:
- lebar kolom asli dari DOM
- tinggi baris adaptif per sel: `lines = max(1, ceil(len * fs * 0.52 / 72 / colWidthIn))`, `rowH = max(0.14, lines * fs * 1.38/72 + 0.07)`
- bila total tinggi melebihi area, turunkan font (batas 5.5pt) lalu skala sisa
- header: bold, isi `E6F2E3`, teks `0E4632`, garis bawah `0E4632` 1.2pt; baris lain garis bawah `D3D1C5` 0.4pt
- margin sel 0.03in, valign middle

Aturan gambar: `contain` → skala jaga aspek + center; `cover` → crop tengah; opacity < 1 → `alphaModFix`.

### 3. `scripts/pptx-postfix.mjs` (anti-repair)
Buka hasil sebagai zip, perbaiki tiap `ppt/slides/slideN.xml`:
nama `cNvPr` kosong diisi, `<a:ln/>` kosong dihapus, `<a:ext cx="0" cy="0"/>` dihapus, autofit ganda disisakan satu, dimensi < 10000 EMU dinormalisasi, id `cNvPr` dibuat unik per slide, lalu zip ditulis ulang dan diuji integritasnya.

## Verifikasi yang dijalankan (dengan output nyata)
1. Baca PPTX: jumlah slide = 50; hitung textbox, tabel, gambar.
2. `unzip -p ... 'ppt/slides/slide*.xml' | grep -c '<a:t>'` → ribuan.
3. `grep -o '<a:tbl>' | wc -l` → sama dengan jumlah `<table>` yang terdeteksi saat dump.
4. LibreOffice → PDF: jumlah halaman = 50, `pdftotext` tiap halaman tidak kosong.
5. Validator Office + `unzip -t` bersih, trigger repair 0.
6. Spot-check visual pada PDF: pita judul gelap, kotak bullet hijau, tabel tidak meluber, footer "NN / 50" utuh, legenda chart tidak ganda.

## Batasan
Script hanya membaca `src/` dan aset; konten deck tidak diubah. File keluaran ditempatkan di `/mnt/documents` agar bisa diunduh langsung.
