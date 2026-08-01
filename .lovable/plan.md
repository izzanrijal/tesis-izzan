# Revisi Besar Deck Tesis + Ekspor PPTX

## 1. Halaman judul (S01) — sesuai sampul PDF

Ganti isi cover dengan teks lengkap halaman i PDF:

- Label **TESIS**
- Judul ID lengkap: "MODEL RANDOM FOREST UNTUK PREDIKSI MORTALITAS IN-HOSPITAL PADA PASIEN INFARK MIOKARD DENGAN ELEVASI SEGMEN ST (STEMI) DAN TANPA ELEVASI SEGMEN ST (NSTEMI) DI INSTALASI GAWAT DARURAT"
- Judul EN (italic, ukuran kecil)
- DISUSUN DAN DIAJUKAN OLEH: dr. Izzan Rijal Muslim — C165221010
- PEMBIMBING (5 nama lengkap):
  Prof. Dr. dr. Idar Mappangara, Sp.PD, Sp.JP(K) · Prof. Dr. dr. Muzakkir Amir, Sp.JP(K) · Dr. dr. Akhtar Fajar Muzakkir, Sp.JP(K) · Dr. dr. Az Hafid Nashar, Sp.JP(K) · Dr. dr. Andi Alfian Zainuddin, M.KM
- Program Pendidikan Dokter Spesialis Ilmu Penyakit Jantung dan Pembuluh Darah · Fakultas Kedokteran Universitas Hasanuddin · Makassar · 2026

Angka besar `0,819` dipindah ke panel kanan yang lebih ramping agar semua teks sampul muat. Slide judul dijadikan berbasis auto-fit: ukuran font turun bertingkat kalau baris bertambah.

## 2. Gambar: pakai figure asli repo, berhenti merekonstruksi kurva

Semua kurva yang selama ini digambar ulang dengan Recharts diganti PNG asli dari
`neocortex-bot/acs-mortality-prediction/figures`, diunggah sebagai pointer aset Lovable (biner tidak masuk repo):

| Slide | File repo |
|---|---|
| ROC mortalitas | `fig01_roc_curve.png` |
| Ambang batas | `fig02_threshold_performance.png` |
| Matriks konfusi | `fig03_confusion_safety.png` + `Fig5_Confusion_Safety.png` |
| Kalibrasi | `fig04_calibration.png` |
| DCA | `fig05_dca.png` |
| Kurva PR | `fig06_pr_curve.png` |
| Distribusi probabilitas | `fig07_prob_distribution.png` |
| Feature importance | `fig08_feature_importance.png` |
| Ablasi | `fig09_ablation.png` |
| Triase | `fig10_triage.png` |
| ROC 3 luaran | `fig11_roc_3outcomes.png` |
| ROC vs skor konvensional | `fig11_roc_comparison.png` |
| Alur STROBE | `strobe_flowchart_v6.png` |
| SHAP | beeswarm + waterfall dari repo |

Gambar ditaruh di kartu berlatar terang (`#FFFFFF`/`--s-panel`) agar tetap menyatu dengan tema hijau tanpa mengubah isi grafik. Komponen chart Recharts yang tidak lagi dipakai dihapus.

## 3. Kerangka teori & kerangka konsep (2 slide baru)

- `index.svg` → Kerangka Teori (Gambar 2.1)
- `My_Untitled_Diagram_1.svg` → Kerangka Konsep (Gambar 2.2)

Keduanya sudah berlatar putih; ditempatkan penuh di kartu putih dengan padding, di-scale agar seluruh diagram terlihat (tinggi diagram teori 1938px → di-fit ke area ±700px). Diunggah sebagai aset SVG.

## 4. Tabel signifikansi lengkap

Tabel 3.1 ditampilkan **seluruh 20 baris variabel** (jenis kelamin, Killip I–III, usia, TDS, nadi, laju napas, Hb, ureum, kreatinin, eGFR, natrium, kalium, GDS, APTT, NLR, SII, LVEF, LVOT VTI, TAPSE) beserta nilai p — dipecah jadi **2 slide 2 kolom** (klinis/hemodinamik dan laboratorium/eko) supaya font tetap ≥22px, bukan diperkecil sampai tak terbaca. Ditambah slide Tabel 3.2 STEMI vs NSTEMI.

## 5. Slide matriks konfusi (1 halaman, dua ambang)

Satu slide berisi dua matriks 2×2 bersebelahan dengan angka nyata dari BAB III:

- **Safety 0,018455** — TP 108, FN 7, TN 572, FP 837; Sens 93,9% · Spes 40,6% · PPV 11,4% · NPV 98,8% · risiko tinggi 945
- **Youden 0,103981** — TP 89, FN 26, TN 1.058, FP 351; Sens 77,4% · Spes 75,1% · PPV 20,2% · NPV 97,6% · risiko tinggi 440

Catatan: BAB IV menyebut angka berbeda (Youden 71,3%/82,0%; safety 98,3%/26,2%). Deck memakai angka BAB III (analisis matriks konfusi) dan diberi catatan kaki kecil bahwa BAB IV mencantumkan varian lain — perlu Anda konfirmasi mana yang final.

## 6. BAB IV Pembahasan (blok baru, 8 slide)

Seksi baru "Pembahasan" mengikuti 4.1–4.11:

1. 4.1 Performa model & interpretasi metrik
2. 4.2 Random Forest vs XGBoost
3. 4.3 Dominasi parameter fungsi ginjal (eGFR, ureum)
4. 4.4 Implikasi triase bertingkat
5. 4.5 + 4.6 Perbandingan dengan validasi GRACE di Asia/Indonesia dan studi ML lain
6. 4.7 + 4.8 Keterbatasan prediksi syok kardiogenik & luaran komposit (Tabel 4.1)
7. 4.9 Implikasi praktik klinis
8. 4.10 + 4.11 Keterbatasan penelitian & kepatuhan TRIPOD+AI

## 7. Outline baru (±32 slide)

```text
Konteks     01 Sampul  02 Latar belakang  03 Keterbatasan GRACE/TIMI  04 Rumusan & tujuan
Teori       05 Kerangka teori  06 Kerangka konsep
Metode      07 Desain & alur STROBE  08 13 prediktor  09 Definisi luaran & analisis
Hasil       10 Karakteristik dasar I  11 Karakteristik dasar II  12 STEMI vs NSTEMI
            13 ROC  14 Ambang batas  15 Matriks konfusi  16 Kalibrasi+DCA+PR
            17 Distribusi probabilitas  18 Feature importance  19 SHAP
            20 Ablasi  21 Triase  22 RF vs XGBoost  23 RF vs GRACE  24 Tiga luaran
Pembahasan  25–32 (delapan slide di atas)
Penutup     33 Kesimpulan  34 Saran  35 Referensi & Q&A
```

## 8. Anti-overflow

Aturan baru di `SlideLayout`/`ContentSlide`: tiap slide dites otomatis dengan skrip Playwright pada 1920×1080 yang mendeteksi `scrollHeight > clientHeight` per blok. Blok yang meluap diberi kelas kompak (turun satu tingkat: body 32→28→24px, caption 24→20px) alih-alih dibiarkan terpotong. Slide yang tetap padat dipecah dua.

## 9. Ekspor PPTX

Skrip Node `scripts/export-pptx.ts` memakai pptxgenjs 16:9:

- render tiap slide deck ke PNG 1920×1080 lewat Playwright dari route `?print`
- tiap PNG di-embed base64 sebagai slide penuh (bukan path)
- validasi dengan `validate_document.py --auto-repair`, konversi LibreOffice → PDF → JPG, QA visual tiap halaman
- hasil ditulis ke `/mnt/documents/tesis-random-forest-stemi-nstemi.pptx` sehingga muncul di panel Files

Catatan: PPTX hasil render gambar bersifat statis (teks tidak bisa diedit di PowerPoint). Kalau Anda butuh teks yang bisa diedit, itu perlu penulisan ulang tiap slide dalam objek pptxgenjs — beri tahu jika itu yang diinginkan.

## Teknis

- Aset gambar/SVG lewat `lovable-assets create` → pointer `.asset.json`, tidak ada biner masuk repo.
- Registry slide diperluas ke ±35 entri; `SECTIONS` ditambah "Teori" dan "Pembahasan".
- `charts.tsx` disusutkan: hanya menyisakan komponen yang benar-benar dipakai (bar sederhana), semua rekonstruksi ROC/DCA/PR/kalibrasi dihapus beserta helper binormal di `deck-data.ts`.
- Verifikasi akhir: screenshot seluruh slide + typecheck.
