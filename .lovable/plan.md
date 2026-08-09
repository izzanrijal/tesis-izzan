# Koreksi angka, slide baru, dan penggantian slide ablasi menjadi SHAP

## 1. Koreksi angka matriks konfusi (sumber tunggal)

Angka matriks konfusi tersimpan di satu tempat (`CONFUSION` di data deck) dan dipakai slide matriks konfusi. Nilainya diganti:

- Safety (0,018455): TN 369, FP 1.040, FN 2, TP 113; Sens 98,3% · Spes 26,2% · PPV 9,8% · NPV 99,5%; flagged 1.153.
- Youden (0,103981): TN 1.155, FP 254, FN 33, TP 82; Sens 71,3% · Spes 82,0% · PPV 24,4% · NPV 97,2%; flagged 336.

Slide matriks konfusi juga mendapat keterangan "False negatives = 2 (atau 33) dari 115 kematian | N = 1.524", dan kalimat kompromi di callout diperbarui menjadi FN 33 → 2 dan FP 254 → 1.040, jumlah ditandai 336 → 1.153. Matriks digambar secara native (bukan gambar), jadi file `fig_CM_*_FINAL.png` tidak diperlukan.

Angka lama yang muncul di slide lain juga disisir dan diperbaiki, khususnya slide dua ambang batas (sensitivitas 98,3% / spesifisitas 26,2% / PPV 9,8% / NPV 99,5%; Youden 71,3% / 82,0% / 24,4% / 97,2%; "82 dari 115", "1.155 dari 1.409"), termasuk slide pembahasan yang menyebut jumlah negatif/positif palsu.

Angka triase (Ward 371/2, HCU 817/31, ICU 336/82) tidak diubah.

## 2. Perbandingan GRACE

Slide perbandingan variabel sejajar dipastikan menampilkan: GRACE-5 0,7845; GRACE-8 0,7767; RF-6 0,8042; RF-13 0,8189; selisih RF-6 vs GRACE-5 +0,0196 (p=0,233, tidak bermakna) dan RF-13 vs GRACE-5 +0,0344, dengan narasi bahwa keunggulan berasal dari parameter tambahan (eko/lab), bukan algoritma semata.

## 3. Slide baru: "Pengembangan model dan protokol validasi"

Slide baru berisi teks hiperparameter persis seperti yang Anda tuliskan (500 pohon, kedalaman 6, min 5 sampel per daun, StratifiedKFold 5 lipatan × 10 seed, imputasi median per lipatan, tanpa nested CV). Teksnya panjang, jadi dipecah menjadi: tiga kartu parameter (n_estimators / max_depth / min_samples_leaf), satu kolom naratif justifikasi (Breiman 2001; Probst 2019; Molinaro 2005), dan callout kejujuran "validasi internal, berpotensi optimistis". Tidak ada kalimat yang dibuang.

## 4. Slide baru: "Mengapa Model Ini Valid"

Empat panel: (a) prediksi out-of-fold seluruh 1.524 pasien tanpa kebocoran; (b) stabilitas antar-seed AUC 0,8157 ± 0,0075 (0,8024–0,8247); (c) tidak over-parameterized — 0,649 (k=1) → 0,808 (k=7) → plato 0,812–0,816 (k=10–13), EPV 8,8; (d) kalibrasi baik, Brier 0,061. Callout: validasi internal, validasi eksternal belum dilakukan dan direncanakan.

## 5. Slide baru: "3.3.3 Analisis Jumlah Parameter Optimal"

Diletakkan sebelum slide hasil AUC final (sebelum slide kurva ROC AUC 0,819). Isi: gambar kurva jumlah parameter (gambar yang Anda unggah) dengan caption Gambar 3.14, Tabel 3.4 lengkap 13 baris (k, parameter terakhir, AUC mean ± SD, rentang), teks pembuka dan interpretasi plato (k=10) serta gain marginal (k=7). Karena teksnya banyak, kesimpulan "kenapa 13" ditaruh sebagai slide pendamping/callout ringkas agar tidak ada teks keluar kotak.

## 6. Slide 18 (analisis ablasi) diganti menjadi Analisis SHAP

Slide ablasi dihapus dari urutan. Sebagai gantinya bagian SHAP diperluas memakai tiga gambar yang Anda unggah:

- Slide SHAP A (metode 3.3.2): penjelasan TreeExplainer, additive feature attribution, keunggulan pada fitur berkorelasi, plus gambar bar plot (Gambar 3.11).
- Slide SHAP B: beeswarm (Gambar 3.12) dengan interpretasi arah pengaruh merah/biru dan efek interaksional LVEF.
- Slide SHAP C: waterfall pasien p=87,2% (Gambar 3.13) menggantikan bar chart tiruan yang sekarang dipakai.

## Catatan teknis

- Empat gambar unggahan didaftarkan sebagai aset CDN (`fig_feature_count`, `shap_bar`, `shap_beeswarm`, `shap_waterfall`) dan direferensikan lewat `FIGS`.
- Registry slide dan `TOTAL_SLIDES` diperbarui (35 → 38: +3 slide baru, +2 slide SHAP, −1 ablasi... total dihitung ulang saat implementasi agar penomoran footer sinkron).
- Setelah semua slide diperbaiki, dilakukan pemeriksaan overflow otomatis per slide (screenshot 1920×1080) agar tidak ada teks keluar kotak, lalu deck diekspor ulang ke PPTX editable.
