# Perbaikan Layout Seluruh Slide + Ekspor PPTX

Saya sudah memotret ke-34 slide pada 1920x1080 dan mengukur luapan (overflow) tiap blok.
Hasilnya: **20 dari 34 slide meluap**. Pola kerusakannya sama di hampir semua slide, jadi
perbaikan dimulai dari kerangkanya, bukan tambal per slide.

## Akar masalah (terukur, bukan dugaan)

Pada `ContentSlide`, area isi memakai `flex-1 min-h-0` tetapi **tanpa `overflow: hidden`**.
Akibatnya konten yang lebih tinggi dari kotaknya tetap digambar keluar — menabrak kotak
callout hijau dan footer. Contoh terukur dari pengukuran:

| Slide | Luapan | Gejala di layar |
|---|---|---|
| 07 STROBE | +242 px | kartu statistik tembus callout, angka "1.047 / 477" terpotong footer |
| 17 SHAP | +221 px | bullet kanan lanjut di bawah callout, menimpa nomor halaman |
| 20 Tiga luaran | +206 px, +52 px lebar | tabel 6 kolom melar, baris ke-3 tertimpa callout |
| 22 RF vs GRACE | +198 px | bullet "fasilitas." keluar kotak |
| 05 Kerangka teori | +146 px | bullet terakhir terpotong callout |
| 23, 11, 15, 16, 06, 02, 03, 04, 28, 30, 34, 18, 19, 01 | +5 s/d +126 px | teks mepet / terpotong tipis |
| 08, 09, 10, 12, 13, 14, 21, 24–27, 29, 31–33 | 0 | sudah aman |

## Perbaikan 1 — kerangka slide (memperbaiki semua sekaligus)

Di `chrome.tsx`:

- Area isi diberi `overflow: hidden` dan tinggi pasti: `1080 − band 200 − meta ±100 − callout − footer 64`.
- Callout dipisah dengan jarak tetap 22 px dan `margin-top: auto`, sehingga **tidak mungkin lagi ditimpa** isi.
- Callout dibatasi maksimum 2 baris: teks callout diturunkan ke `slide-body` (32 px) bila lebih dari 110 karakter.
- Judul band: bila judul > 62 karakter, ukuran turun otomatis dari 88 px ke 72 px agar tidak
  memakan dua baris penuh dan menekan isi.

## Perbaikan 2 — komponen `AutoFit`

Komponen baru `AutoFit` membungkus isi tiap slide: mengukur `scrollHeight` sesudah render,
lalu menurunkan skala tipografi bertingkat (100% → 94% → 88% → 82%) lewat variabel CSS
`--fit` yang dipakai oleh `.slide-body`, `.slide-caption`, dan jarak antarbullet. Jadi
**teks otomatis mengecil kalau kepanjangan**, persis permintaan Anda, dan tidak ada lagi
teks keluar kotak. Batas bawah 82% (≈26 px) supaya tetap terbaca saat diproyeksikan.

## Perbaikan 3 — perbaikan khusus per slide

Yang tidak cukup diselesaikan dengan penskalaan:

- **01 Sampul** — angka `0,819` di panel kanan meluap 20 px; panel dipersempit dan angka diturunkan ke 132 px.
- **07 STROBE** — 3 bullet panjang + 4 kartu statistik terlalu banyak untuk satu kolom.
  Kartu statistik dijadikan satu baris 4 kolom ramping di bawah gambar.
- **17 SHAP** — 4 bullet panjang di kolom kanan. Bullet ke-4 (interaksi LVEF) dilebur ke bullet ke-2.
- **20 Tiga luaran** — tabel 6 kolom melar 52 px. Kolom "3 fitur teratas" dipindah jadi
  catatan kaki per baris; tabel tinggal 5 kolom dengan lebar tetap.
- **22 RF vs GRACE** — 4 kartu metrik + 3 bullet. Kartu dijadikan 2 baris ramping (tinggi 118 px),
  bullet ke-3 dipendekkan.
- **05 / 06 Kerangka** — kolom kanan diberi 3 bullet maksimum, sisanya masuk callout.
- **02, 03, 04, 11, 15, 16, 18, 19, 23, 28, 30, 34** — cukup ditangani `AutoFit` + jarak
  antarblok dinaikkan dari 16 px ke 20 px agar kotak tidak saling rapat.

## Perbaikan 4 — jarak antarkotak (masalah "box terlalu rapat")

Ditetapkan satu skala jarak dan dipakai konsisten: gutter kolom 44 px, jarak antarkartu 20 px,
padding kartu 24 px (dari 14–18 px sekarang), jarak isi ke callout 22 px. Kartu berlatar
`--s-panel` diberi garis tepi tipis agar batasnya terbaca.

## Verifikasi

Skrip Playwright yang sama dijalankan ulang: syarat lulus adalah **0 blok meluap di ke-34 slide**,
lalu saya periksa satu per satu tangkapan layarnya dan perbaiki sisa masalah visual.

## Ekspor PPTX

Setelah semua slide bersih:

1. Render tiap slide ke PNG 1920×1080 lewat Playwright dari route `?print`.
2. `pptxgenjs` 16:9, tiap PNG di-embed base64 sebagai gambar penuh satu slide.
3. Validasi `validate_document.py --auto-repair`, konversi LibreOffice → PDF → JPG, dan QA visual tiap halaman.
4. Hasil disimpan ke `/mnt/documents/tesis-random-forest-stemi-nstemi.pptx` sehingga muncul di panel Files.

Catatan: PPTX berbasis render gambar ini **tidak bisa diedit teksnya** di PowerPoint. Kalau
Anda butuh teks yang bisa diedit, itu perlu penulisan ulang tiap slide sebagai objek pptxgenjs —
beri tahu bila itu yang diinginkan.

## Teknis

- `chrome.tsx`: `overflow:hidden` + tinggi pasti pada area isi, callout `margin-top:auto`, judul auto-fit.
- `AutoFit` baru di `src/components/slides/fit.tsx`, dipasang di `ContentSlide` (tidak perlu ubah 34 file).
- Token jarak baru di `src/styles.css` (`--gap-card`, `--pad-card`) dan skala `--fit`.
- Skrip ekspor: `scripts/export-pptx.mjs`.
