# Menambahkan Slide Detail Penelitian dan Seluruh BAB II

Deck saat ini langsung melompat dari latar belakang (S02–S04) ke metode ringkas (desain studi/STROBE). Rumusan masalah, tujuan, manfaat, dan sebagian besar BAB II (populasi, kriteria, variabel, definisi operasional, prosedur, etik, analisis data) belum punya halaman. Rencana ini menambah 8 slide baru dengan tema hijau konsultan yang sama.

## Slide baru (urutan setelah S04 "Machine learning: paradigma baru")

**Blok Konteks — 2 slide**

1. **Rumusan masalah & tujuan penelitian**
   - Kiri: 2 pertanyaan penelitian (variabel prediktor signifikan; performa akurasi/diskriminasi/kalibrasi RF).
   - Kanan: Tujuan umum (kartu highlight) + 3 tujuan khusus bernomor (identifikasi variabel, membangun model RF, evaluasi performa & bandingkan XGBoost).
   - Callout: kaitan tujuan dengan hasil utama (AUC 0,819).

2. **Manfaat penelitian**
   - Panel Manfaat Teoritis (1 poin) dan Manfaat Klinis (3 poin, ikon bernomor).

**Blok Metode (BAB II) — 6 slide, ditempatkan sebelum slide desain studi/STROBE**

3. **Desain, tempat, waktu & sampel**
   - Kohort retrospektif analitik, validasi internal; PJT RSUP Dr. Wahidin Sudirohusodo Makassar; periode 1 Jan 2024 – 31 Des 2025; sumber data RME; total sampling.
   - Strip statistik: N = 1.524 · 115 kematian in-hospital (7,5%) · 1.047 STEMI · 477 NSTEMI.

4. **Kriteria inklusi & eksklusi**
   - Dua kolom: 4 kriteria inklusi vs 5 kriteria eksklusi (ringkas, kalimat pendek; catatan POCUS tidak lengkap dijadikan satu baris singkat).

5. **Variabel penelitian**
   - Tiga panel: Dependen (mortalitas in-hospital; luaran sekunder SKG), Independen (demografi, klinis, laboratorium, ekokardiografi — dikelompokkan sebagai chip), Perancu (revaskularisasi, IMT, hipertensi, DM, merokok, riwayat SKA, obat kardiovaskular).

6. **Definisi operasional & kriteria objektif**
   - Tabel ringkas variabel kunci (mortalitas in-hospital, SKG de novo, Killip, eGFR, LVEF/TAPSE/LVOT VTI) dengan skala dan pengodean.
   - Kartu kriteria diagnosis: STEMI (ambang elevasi ST), NSTEMI (troponin > persentil 99 + bukti iskemia), SKG (hipotensi butuh vasopresor/inotropik + ≥1 tanda hipoperfusi).

7. **Cara kerja, prosedur & etik**
   - Alur 3 langkah horizontal: identifikasi & skrining kohort RME → ekstraksi prediktor 24 jam pertama + penelusuran luaran → penyusunan set data teranonimisasi.
   - Panel kecil pertimbangan etik (data sekunder, anonimisasi, persetujuan umum, kelaikan etik).

8. **Metode analisis data**
   - Perangkat lunak & pustaka (Python 3.10+, Pandas/NumPy, Scikit-learn, XGBoost, Matplotlib/Seaborn, SHAP).
   - Analisis deskriptif (mean ± SD / median IQR; uji-t atau Mann-Whitney; Chi-square atau Fisher).
   - Pra-pemrosesan (imputasi median per fold, penanganan outlier/skala) — ringkas agar tidak menduplikasi slide "Pengembangan model & protokol validasi" yang sudah ada.

Slide "Kerangka teori", "Kerangka konsep", "Desain studi & alur STROBE", "13 prediktor", dan "Pengembangan model & protokol validasi" tetap dipakai sebagai penutup blok BAB II, hanya diurutkan ulang agar alurnya runtut.

## Detail teknis

- File baru di `src/components/slides/deck/`: `SRumusanTujuan.tsx`, `SManfaat.tsx`, `SMetode1.tsx` (desain & sampel), `SMetode2.tsx` (kriteria), `SMetode3.tsx` (variabel), `SMetode4.tsx` (definisi operasional), `SMetode5.tsx` (prosedur & etik), `SMetode6.tsx` (analisis data).
- Semua memakai `ContentSlide` dari `chrome.tsx` plus primitif di `ui.tsx`, dibungkus `AutoFit` seperti slide lain; tidak ada token warna baru.
- `src/lib/deck-data.ts`: `TOTAL_SLIDES` 39 → 47; tambah konstanta teks (kriteria inklusi/eksklusi, daftar variabel, tabel definisi operasional) agar komponen tetap ramping.
- `src/components/slides/registry.ts`: sisipkan 8 entri pada posisi yang benar; penomoran footer otomatis mengikuti `SlideIndexContext`.
- Audit Playwright per slide baru untuk memastikan tidak ada teks keluar dari kotak, lalu ekspor ulang PPTX editable 47 slide lewat `scripts/export-pptx-native.mjs`.

Seluruh teks dalam Bahasa Indonesia, angka hanya dari naskah tesis (tidak ada angka karangan).
