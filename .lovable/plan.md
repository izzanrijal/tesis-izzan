## Tujuan

Membangun aplikasi presentasi 21 slide (1920×1080, di-scale) untuk tesis **"Random Forest untuk Prediksi Mortalitas In-Hospital pada Pasien STEMI dan NSTEMI di IGD"**, seluruh konten **Bahasa Indonesia**, dengan sistem desain yang meniru persis bahasa visual 8 slide referensi yang diunggah.

## Bahasa desain (dikunci dari referensi)

- **Palet**: kertas `#F2F1EA`, hijau tua `#0E4632`, hijau aksen `#1E8A5F`, hijau muda pucat `#D6EBD3` / `#CFE6C2`, lime aksen `#B5D923`, magenta peringatan `#E0115F`, teks abu `#5B6660`.
- **Tipografi**: satu grotesk tebal untuk judul (huruf besar, tracking rapat, seperti slide 000), sans reguler untuk isi. Ukuran mengikuti skala slide: judul 88–104px, body 32px, caption 24px, chrome 20px.
- **Anatomi slide (wajib konsisten)**, persis referensi 002–008:
  1. Band judul hijau gelap penuh lebar dengan foto ber-overlay, judul putih 1–2 baris.
  2. Baris meta: `NN | Nama seksi: sub-judul` di kiri + **breadcrumb seksi** di kanan (item aktif hijau tebal, lainnya abu).
  3. Baris "Basis:" — sumber data/asumsi satu baris.
  4. Badan slide: grid 2 kolom (utama ~62% / panel kanan ~38%) atau 3 kolom, tergantung tipe.
  5. **Callout kesimpulan** bar hijau pucat dengan garis kiri tebal di bawah.
  6. Footer: `Source: …` kiri, `NN / 21` kanan.
- Slide judul memakai layout khusus slide 000: split kiri kertas / kanan panel hijau muda dengan angka raksasa (`0,819` AUC), garis lime, blok hijau tua di pojok kanan bawah.

## Peta 21 slide

Tiap slide memakai salah satu dari 8 template layout, agar tidak ada satu pun layout berantakan:

| # | Judul (ID) | Template |
|---|---|---|
| 01 | Judul + AUC 0,819 | Cover split |
| 02 | Pembunuh senyap di IGD | 3 statistik + panel narasi |
| 03 | Keterbatasan GRACE & TIMI | Tabel skor + panel keterbatasan |
| 04 | Machine learning: paradigma baru | Diagram alur RF (SVG) + bullet |
| 05 | Desain studi & alur partisipan | Flowchart STROBE (SVG dibuat ulang: 1.952 → 1.524) |
| 06 | 13 prediktor | Grid 5 domain kartu |
| 07 | Karakteristik kohort | Tabel komparatif hidup vs meninggal + p-value |
| 08 | Performa model AUC 0,819 | Chart ROC + panel metrik |
| 09 | Dua ambang batas | Chart threshold + 2 kartu strategi |
| 10 | Kalibrasi & manfaat klinis | 3 chart kecil (kalibrasi, DCA, PR) |
| 11 | eGFR & ureum dominan | Bar chart feature importance |
| 12 | SHAP: melampaui peringkat | Gambar SHAP (repo) + panel interpretasi |
| 13 | Ablasi fitur | Chart ablasi + tabel |
| 14 | Triase 3 tingkat | Diagram tier + gradien mortalitas 48× |
| 15 | RF vs XGBoost | Tabel perbandingan + bar chart |
| 16 | RF vs GRACE 2.0 | ROC dua kurva + kartu uji statistik |
| 17 | Tiga luaran | Chart ROC 3 kurva + tabel |
| 18 | Implikasi klinis | Timeline 3 skenario (gaya slide 007) |
| 19 | Keterbatasan | Ladder P1–P4 (gaya slide 006) |
| 20 | Kepatuhan TRIPOD+AI | Checklist dua kolom ✓/✗ |
| 21 | Kesimpulan, saran & referensi | Grid 4 takeaway + daftar prioritas + referensi |

Semua angka diambil apa adanya dari file prompt — tidak ada angka baru yang dikarang.

## Grafik & gambar

- **Dibuat ulang native (Recharts + SVG)** agar seragam tema: ROC, threshold, kalibrasi, DCA, PR, feature importance, ablasi, triase, ROC 3-luaran, ROC vs GRACE, flowchart STROBE, semua tabel.
- **Diambil dari repo GitHub** (via pointer aset Lovable, bukan biner masuk repo) hanya untuk yang tidak layak dibuat ulang: SHAP beeswarm dan SHAP waterfall.
- **Placeholder gambar** untuk foto band judul: dibuat 4–5 foto medis/IGD bernuansa hijau gelap lewat image generation, dipakai berulang di seluruh seksi.

## Teknis

- TanStack Start; rute `/` = deck. `?slide=N` sebagai sumber kebenaran slide aktif, `document.title` ikut sinkron.
- `SlideLayout` (1920×1080, `transform: scale`, terpusat) + registry slide + token `--slide-*` di `src/styles.css`. Kelas tipografi semantik (`.slide-title`, `.slide-body`, `.slide-chrome`, dst.).
- Navigasi: panah kiri/kanan, Space, `G` untuk grid overview, `F5`/tombol Present untuk fullscreen, `Esc` keluar.
- Mode cetak `?print` — semua slide bertumpuk, `@page 1920×1080 landscape`, siap Cmd+P → PDF.
- Anti-overflow: setiap slide diverifikasi lewat screenshot Playwright pada 1920×1080; header ~180px + body + footer ≤ 1080px. Slide yang padat dipecah, bukan dikecilkan fontnya.

## Verifikasi sebelum selesai

Screenshot ke-21 slide dan periksa satu per satu: tidak ada teks terpotong, tumpang tindih, pill yang wrap, atau kolom yang jebol; breadcrumb dan nomor halaman benar; semua teks Bahasa Indonesia.
