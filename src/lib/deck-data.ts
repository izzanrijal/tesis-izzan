import bandEd from "@/assets/band-ed.jpg";
import bandEcho from "@/assets/band-echo.jpg";
import bandData from "@/assets/band-data.jpg";
import bandClinic from "@/assets/band-clinic.jpg";

const figRoc = { url: "/figures/fig01_roc_curve.png" };
const figThreshold = { url: "/figures/fig02_threshold_performance.png" };
const figCalibration = { url: "/figures/fig04_calibration.png" };
const figDca = { url: "/figures/fig05_dca.png" };
const figPr = { url: "/figures/fig06_pr_curve.png" };
const figProb = { url: "/figures/fig07_prob_distribution.png" };
const figImportance = { url: "/figures/fig08_feature_importance.png" };
const figAblation = { url: "/figures/fig09_ablation.png" };
const figFeatureCount = { url: "/figures/fig_feature_count.png" };
const figShapBar = { url: "/figures/shap_bar.png" };
const figShapBees = { url: "/figures/shap_beeswarm.png" };
const figShapWaterfall = { url: "/figures/shap_waterfall.png" };
const figTriage = { url: "/figures/fig10_triage.png" };
const figRoc3 = { url: "/figures/fig11_roc_3outcomes.png" };
const figRocGrace = { url: "/figures/fig11_roc_comparison.png" };
const figRocSejajar = { url: "/figures/roc-grace5-rf6.png" };
const figStrobe = { url: "/figures/strobe_flowchart_v6.png" };
const svgTeori = { url: "/figures/kerangka-teori.svg" };
const svgKonsep = { url: "/figures/kerangka-konsep.svg" };

export const BANDS = {
  ed: bandEd,
  echo: bandEcho,
  data: bandData,
  clinic: bandClinic,
};

/** Gambar asli hasil analisis (repositori acs-mortality-prediction) + diagram kerangka. */
export const FIGS = {
  roc: figRoc.url,
  threshold: figThreshold.url,
  calibration: figCalibration.url,
  dca: figDca.url,
  pr: figPr.url,
  prob: figProb.url,
  importance: figImportance.url,
  ablation: figAblation.url,
  featureCount: figFeatureCount.url,
  shapBar: figShapBar.url,
  shapBees: figShapBees.url,
  shapWaterfall: figShapWaterfall.url,
  triage: figTriage.url,
  roc3: figRoc3.url,
  rocGrace: figRocGrace.url,
  rocSejajar: figRocSejajar.url,
  strobe: figStrobe.url,
  teori: svgTeori.url,
  konsep: svgKonsep.url,
};

export const SECTIONS = [
  "Konteks",
  "Metode",
  "Performa",
  "Interpretasi",
  "Perbandingan",
  "Pembahasan",
  "Implikasi",
  "Penutup",
] as const;

export type SectionName = (typeof SECTIONS)[number];

export const DECK_TITLE =
  "Random Forest untuk Prediksi Mortalitas In-Hospital pada Pasien STEMI dan NSTEMI di IGD";

/* Diisi oleh registry agar penomoran footer selalu sinkron. */
export const TOTAL_SLIDES = 55;

/* ------------------------------------------------------------------
   Rekonstruksi kurva dari metrik terlapor (model binormal).
   Hanya dipakai untuk sketsa skematik, bukan pengganti kurva asli.
   ------------------------------------------------------------------ */

function erf(x: number): number {
  const s = x < 0 ? -1 : 1;
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t +
      0.254829592) *
      t *
      Math.exp(-a * a);
  return s * y;
}

const cdf = (x: number) => 0.5 * (1 + erf(x / Math.SQRT2));

function invCdf(p: number): number {
  let lo = -8;
  let hi = 8;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (cdf(mid) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Titik-titik ROC binormal dengan AUC persis seperti yang dilaporkan. */
export function rocPoints(auc: number, n = 60) {
  const a = Math.SQRT2 * invCdf(auc);
  const pts: { fpr: number; tpr: number }[] = [{ fpr: 0, tpr: 0 }];
  for (let i = 1; i < n; i++) {
    const fpr = i / n;
    pts.push({ fpr, tpr: Math.min(1, cdf(invCdf(fpr) + a)) });
  }
  pts.push({ fpr: 1, tpr: 1 });
  return pts;
}

/** Gabungkan beberapa kurva ROC menjadi satu seri untuk Recharts. */
export function rocSeries(entries: { key: string; auc: number }[], n = 60) {
  const base = entries.map((e) => ({ key: e.key, pts: rocPoints(e.auc, n) }));
  return base[0].pts.map((_, i) => {
    const row: Record<string, number> = { fpr: base[0].pts[i].fpr };
    base.forEach((b) => (row[b.key] = b.pts[i].tpr));
    return row;
  });
}

export const TRIAGE = [
  { tier: "Risiko Rendah", unit: "Ward", range: "< 0,018", n: 371, deaths: 2, rate: 0.5 },
  { tier: "Risiko Sedang", unit: "HCU", range: "0,018 – 0,104", n: 817, deaths: 31, rate: 3.8 },
  { tier: "Risiko Tinggi", unit: "ICU", range: "≥ 0,104", n: 336, deaths: 82, rate: 24.4 },
];

export const IMPORTANCE = [
  { fitur: "eGFR", gini: 0.152, domain: "Ginjal" },
  { fitur: "Ureum", gini: 0.131, domain: "Ginjal" },
  { fitur: "LVOT VTI", gini: 0.099, domain: "Ekokardiografi" },
  { fitur: "Hemoglobin", gini: 0.08, domain: "Laboratorium" },
  { fitur: "Kalium", gini: 0.076, domain: "Laboratorium" },
];

/** Tabel 3.3 — 13 fitur lengkap. */
export const GINI_TABLE: [string, string, string, string][] = [
  ["1", "eGFR (egfr_igd)", "0,1520", "0,0161"],
  ["2", "Ureum (ureum_igd)", "0,1312", "0,0141"],
  ["3", "LVOT VTI (lvot_vti_igd)", "0,0985", "0,0095"],
  ["4", "Hemoglobin (hb_igd)", "0,0798", "0,0108"],
  ["5", "Kalium (kalium_igd)", "0,0760", "0,0085"],
  ["6", "APTT (aptt_value)", "0,0736", "0,0080"],
  ["7", "Usia (age_when_admission)", "0,0705", "0,0103"],
  ["8", "LVEF (lvef)", "0,0681", "0,0079"],
  ["9", "Tekanan darah sistolik (sbp)", "0,0591", "0,0060"],
  ["10", "Denyut nadi (hr)", "0,0587", "0,0055"],
  ["11", "Laju napas (rr)", "0,0523", "0,0083"],
  ["12", "Killip (killip)", "0,0450", "0,0111"],
  ["13", "TAPSE (tapse_value)", "0,0351", "0,0062"],
];

/** Tabel 3.1 — seluruh parameter, hidup vs meninggal, dengan nilai p. */
export const TABEL_31: [string, string, string, string][] = [
  ["Jenis kelamin — Laki-laki, n (%)", "1145 (81,3)", "83 (72,2)", "0,0178"],
  ["Jenis kelamin — Perempuan, n (%)", "264 (18,7)", "32 (27,8)", "0,0178"],
  ["Killip I, n (%)", "927 (65,8)", "41 (35,7)", "<0,0001"],
  ["Killip II, n (%)", "374 (26,5)", "37 (32,2)", "0,2306"],
  ["Killip III, n (%)", "108 (7,7)", "37 (32,2)", "<0,0001"],
  ["Usia (tahun)", "56,9 ± 11,0", "64,5 ± 9,2", "<0,0001"],
  ["Tekanan darah sistolik (mmHg)", "132,1 ± 24,2", "127,3 ± 28,6", "0,0827"],
  ["Denyut nadi (kali/menit)", "82,5 ± 19,0", "91,0 ± 20,2", "<0,0001"],
  ["Laju napas (kali/menit)", "21,6 ± 3,7", "23,7 ± 4,0", "<0,0001"],
  ["Hemoglobin (g/dL)", "13,8 ± 2,0", "12,4 ± 2,4", "<0,0001"],
  ["Ureum (mg/dL)", "38,3 ± 26,3", "71,8 ± 53,3", "<0,0001"],
  ["Kreatinin (mg/dL)", "1,1 ± 0,8", "1,8 ± 1,5", "<0,0001"],
  ["eGFR (mL/menit/1,73m²)", "83,4 ± 26,0", "57,8 ± 29,0", "<0,0001"],
  ["Natrium (mEq/L)", "136,2 ± 3,6", "134,9 ± 4,3", "0,0021"],
  ["Kalium (mEq/L)", "4,1 ± 0,6", "4,4 ± 1,0", "0,0009"],
  ["Gula darah sewaktu (mg/dL)", "179,9 ± 90,3", "198,8 ± 116,9", "0,0952"],
  ["APTT (detik)", "27,7 ± 12,9", "31,6 ± 20,0", "0,0438"],
  ["NLR", "6,7 ± 5,5", "9,0 ± 7,8", "0,0028"],
  ["SII", "1803,9 ± 1544,9", "2377,6 ± 2406,7", "0,0132"],
  ["LVEF (%)", "42,8 ± 7,7", "38,1 ± 8,8", "<0,0001"],
  ["LVOT VTI (cm)", "17,7 ± 4,7", "15,5 ± 5,6", "<0,0001"],
  ["TAPSE (cm)", "2,0 ± 0,3", "1,9 ± 0,3", "0,0003"],
];

/** Tabel 3.2 — seluruh parameter, STEMI vs NSTEMI, dengan nilai p. */
export const TABEL_32: [string, string, string, string][] = [
  ["Jenis kelamin — Laki-laki, n (%)", "874 (83,5)", "354 (74,2)", "<0,0001"],
  ["Jenis kelamin — Perempuan, n (%)", "173 (16,5)", "123 (25,8)", "<0,0001"],
  ["Mortalitas in-hospital, n (%)", "72 (6,9)", "43 (9,0)", "0,1736"],
  ["Killip I, n (%)", "783 (74,8)", "185 (38,8)", "<0,0001"],
  ["Killip II, n (%)", "211 (20,2)", "200 (41,9)", "<0,0001"],
  ["Killip III, n (%)", "53 (5,1)", "92 (19,3)", "<0,0001"],
  ["Usia (tahun)", "56,2 ± 10,6", "60,2 ± 11,6", "<0,0001"],
  ["Tekanan darah sistolik (mmHg)", "129,3 ± 23,3", "137,1 ± 26,4", "<0,0001"],
  ["Denyut nadi (kali/menit)", "82,0 ± 18,6", "85,5 ± 20,4", "0,0017"],
  ["Laju napas (kali/menit)", "21,6 ± 3,6", "22,2 ± 4,0", "0,0097"],
  ["Hemoglobin (g/dL)", "14,0 ± 1,9", "13,0 ± 2,1", "<0,0001"],
  ["Ureum (mg/dL)", "37,5 ± 27,4", "48,1 ± 35,2", "<0,0001"],
  ["Kreatinin (mg/dL)", "1,1 ± 0,7", "1,3 ± 1,1", "<0,0001"],
  ["eGFR (mL/menit/1,73m²)", "85,0 ± 25,2", "73,7 ± 29,4", "<0,0001"],
  ["Natrium (mEq/L)", "135,8 ± 3,4", "136,5 ± 4,2", "0,0020"],
  ["Kalium (mEq/L)", "4,1 ± 0,6", "4,1 ± 0,8", "0,7835"],
  ["Gula darah sewaktu (mg/dL)", "184,7 ± 94,0", "173,9 ± 89,1", "0,0323"],
  ["APTT (detik)", "28,5 ± 14,9", "27,1 ± 10,0", "0,0370"],
  ["NLR", "7,3 ± 5,6", "6,0 ± 6,0", "0,0001"],
  ["SII", "1971,5 ± 1582,9", "1576,2 ± 1705,9", "<0,0001"],
  ["LVEF (%)", "42,3 ± 6,4", "42,7 ± 10,4", "0,4705"],
  ["LVOT VTI (cm)", "17,5 ± 4,6", "17,7 ± 5,2", "0,5594"],
  ["TAPSE (cm)", "1,9 ± 0,3", "2,0 ± 0,2", "0,0112"],
];

/** Matriks konfusi prediksi out-of-fold pada seluruh 1.524 pasien. */
export const CONFUSION = {
  safety: {
    threshold: "0,018455",
    tp: 113,
    fn: 2,
    tn: 369,
    fp: 1040,
    sens: "98,3%",
    spec: "26,2%",
    ppv: "9,8%",
    npv: "99,5%",
    flagged: 1153,
  },
  youden: {
    threshold: "0,103981",
    tp: 82,
    fn: 33,
    tn: 1155,
    fp: 254,
    sens: "71,3%",
    spec: "82,0%",
    ppv: "24,4%",
    npv: "97,2%",
    flagged: 336,
  },
};

/** Tabel 3.4 — AUC out-of-fold pada setiap jumlah parameter (k). */
export const K_TABLE: [string, string, string, string][] = [
  ["1", "eGFR", "0,649 ± 0,011", "0,635–0,668"],
  ["2", "Ureum", "0,710 ± 0,006", "0,700–0,718"],
  ["3", "LVOT VTI", "0,755 ± 0,006", "0,747–0,769"],
  ["4", "Hemoglobin", "0,766 ± 0,004", "0,757–0,771"],
  ["5", "Kalium", "0,786 ± 0,006", "0,778–0,794"],
  ["6", "APTT", "0,795 ± 0,005", "0,788–0,804"],
  ["7", "Usia", "0,808 ± 0,004", "0,800–0,813"],
  ["8", "LVEF", "0,809 ± 0,005", "0,800–0,816"],
  ["9", "Tekanan darah sistolik", "0,807 ± 0,006", "0,800–0,817"],
  ["10", "Laju jantung", "0,812 ± 0,008", "0,801–0,822"],
  ["11", "Laju napas", "0,815 ± 0,008", "0,802–0,826"],
  ["12", "Kelas Killip", "0,816 ± 0,006", "0,807–0,823"],
  ["13", "TAPSE", "0,815 ± 0,007", "0,804–0,824"],
];

/* ------------------------------------------------------------------
   Tabel 2.1 — Definisi operasional dan kriteria objektif (lengkap,
   sesuai naskah tesis BAB II halaman 10–12).
   Format baris: [variabel, definisi, skala, kriteria objektif/pengodean]
   Baris dengan definisi "" adalah judul kelompok.
   ------------------------------------------------------------------ */
export type DefOpRow = [string, string, string, string];

export const DEFOP_A: DefOpRow[] = [
  ["Variabel dependen", "", "", ""],
  [
    "Mortalitas in-hospital",
    "Kematian selama episode perawatan rumah sakit yang sama setelah admisi dengan STEMI atau NSTEMI",
    "Biner",
    "Meninggal = 1; hidup saat pulang = 0, berdasarkan status keluar rumah sakit",
  ],
  [
    "Syok kardiogenik de novo",
    "Syok kardiogenik baru yang terjadi setelah admisi rawat inap: SBP < 90 mmHg atau kebutuhan vasopresor untuk mempertahankan tekanan darah, disertai tanda hipoperfusi organ, yang tidak ada saat admisi IGD",
    "Biner",
    "Ya = 1 jika cardiogenic_shock = 1; Tidak = 0",
  ],
  [
    "Komposit (mortalitas dan/atau syok kardiogenik)",
    "Luaran gabungan berupa kematian in-hospital dan/atau syok kardiogenik de novo selama periode perawatan indeks",
    "Biner",
    "Ya = 1 jika inhospital_death = 1 atau cardiogenic_shock = 1; Tidak = 0 jika hidup tanpa syok kardiogenik saat pulang",
  ],
  ["A. Karakteristik demografis", "", "", ""],
  ["Usia", "Usia pasien (tahun penuh) pada hari admisi", "Kontinu", "Nilai numerik tahun, dari tanggal lahir di RME"],
  ["Jenis kelamin", "Jenis kelamin biologis pasien", "Biner", "Laki-laki = 1; Perempuan = 0"],
  ["B. Parameter klinis", "", "", ""],
  [
    "Tekanan darah sistolik (SBP)",
    "Tekanan darah sistolik saat admisi, nilai terendah (minimum) dalam 0–24 jam",
    "Kontinu",
    "mmHg, nilai numerik",
  ],
  [
    "Tekanan darah diastolik (DBP)",
    "Tekanan darah diastolik saat admisi, nilai terendah (minimum) dalam 0–24 jam",
    "Kontinu",
    "mmHg, nilai numerik",
  ],
  [
    "Denyut nadi (heart rate)",
    "Denyut nadi saat admisi, nilai tertinggi (maksimum) dalam 0–24 jam",
    "Kontinu",
    "x/menit, nilai numerik",
  ],
  [
    "Kebutuhan oksigen",
    "Kebutuhan oksigen ≥ simple mask secara kontinu dalam 24 jam pertama",
    "Biner",
    "Ya = 1 jika minimal nasal kanul > 5 L/menit, atau simple mask (Venturi/NRBM/HFNC/NIV/ETT) tanpa kembali ke room air; Tidak = 0",
  ],
];

export const DEFOP_LAB: DefOpRow[] = [
  ["Hemoglobin (Hb)", "Kadar hemoglobin darah, nilai pada 0–24 jam pertama", "Kontinu", "g/dL, nilai numerik"],
  ["Leukosit (WBC)", "Jumlah sel darah putih, nilai pada 0–24 jam pertama", "Kontinu", "sel/μL, nilai numerik"],
  ["Trombosit (PLT)", "Jumlah trombosit, nilai pada 0–24 jam pertama", "Kontinu", "×10⁶/L, nilai numerik"],
  ["GOT (AST)", "Kadar aspartat aminotransferase, nilai pada 0–24 jam pertama", "Kontinu", "U/L, nilai numerik"],
  ["GPT (ALT)", "Kadar alanin aminotransferase, nilai pada 0–24 jam pertama", "Kontinu", "U/L, nilai numerik"],
  ["Ureum", "Kadar ureum darah, nilai pada 0–24 jam pertama", "Kontinu", "mg/dL, nilai numerik"],
  ["Kreatinin", "Kadar kreatinin serum, nilai pada 0–24 jam pertama", "Kontinu", "mg/dL, nilai numerik"],
  [
    "eGFR",
    "Laju filtrasi glomerulus estimasi (CKD-EPI 2021)",
    "Kontinu",
    "mL/menit/1,73 m²; eGFR = 142 × [min(Scr/κ,1)]^α × [max(Scr/κ,1)]^−1,200 × 0,9938^Usia × 1,012 [jika perempuan]",
  ],
  ["Natrium", "Kadar natrium serum, nilai pada 0–24 jam pertama", "Kontinu", "mmol/L, nilai numerik"],
  ["Kalium", "Kadar kalium serum, nilai pada 0–24 jam pertama", "Kontinu", "mmol/L, nilai numerik"],
  ["Gula darah sewaktu (GDS)", "Kadar glukosa darah, nilai tertinggi (maksimum) dalam 0–24 jam", "Kontinu", "mg/dL, nilai numerik"],
  [
    "NLR (neutrophil-to-lymphocyte ratio)",
    "Rasio neutrofil terhadap limfosit dari darah tepi, nilai pada 0–24 jam pertama",
    "Kontinu",
    "NLR = hitung jenis neutrofil absolut / hitung jenis limfosit absolut",
  ],
  [
    "SII (systemic immune-inflammation index)",
    "Indeks imun-inflamasi sistemik, dihitung dari nilai laboratorium 0–24 jam pertama",
    "Kontinu",
    "SII = (neutrofil absolut × trombosit absolut) / limfosit absolut",
  ],
  [
    "APTT (activated partial thromboplastin time)",
    "Waktu tromboplastin parsial teraktivasi, nilai pada 0–24 jam pertama",
    "Kontinu",
    "detik, nilai numerik",
  ],
];

export const DEFOP_C: DefOpRow[] = [
  ["E. Parameter ekokardiografi", "", "", ""],
  ["LVEF", "Fraksi ejeksi ventrikel kiri (metode biplane Simpson)", "Kontinu", "%; LVEF = [(LVEDV − LVESV) / LVEDV] × 100%"],
  ["TAPSE", "Tricuspid annular plane systolic excursion", "Kontinu", "mm, nilai numerik"],
  [
    "LVOT VTI (velocity time integral)",
    "Velocity time integral dari left ventricular outflow tract, pulsed-wave Doppler apikal 5-ruang",
    "Kontinu",
    "cm, nilai numerik",
  ],
  ["F. Variabel perancu", "", "", ""],
  ["Revaskularisasi koroner", "Menjalani PCI atau CABG sebelum SKG", "Biner", "Ya = 1; Tidak = 0. Berdasarkan kode prosedur billing/rekam operasi"],
  ["Indeks massa tubuh (IMT)", "Berat badan (kg) / tinggi badan² (m²), ukur pertama ≤ 24 jam", "Kontinu", "kg/m², nilai numerik"],
  [
    "Riwayat hipertensi",
    "Diagnosis hipertensi atau obat antihipertensi sebelum admisi",
    "Biner",
    "Ya = 1 jika tercatat di problem list atau obat antihipertensi kronik",
  ],
  ["Riwayat diabetes melitus", "Diagnosis DM atau obat hipoglikemik/insulin sebelum admisi", "Biner", "Ya = 1; Tidak = 0"],
  ["Riwayat merokok", "Perokok aktif (≥ 1 batang/30 hari) atau mantan perokok", "Biner", "Ya = 1; Tidak = 0"],
  ["Riwayat SKA sebelumnya", "Riwayat STEMI/NSTEMI terdokumentasi sebelum admisi", "Biner", "Ya = 1; Tidak = 0"],
  [
    "Pengobatan kardiovaskular",
    "Penggunaan rutin minimal satu obat kardiovaskular sebelum admisi",
    "Biner",
    "Ya = 1 jika pada wawancara ≤ 24 jam dilaporkan menggunakan furosemid, digoksin, beta-blocker, MRA/ARNI, ACE-I/ARB, nitrat, statin, atau antiplatelet",
  ],
];

/** 2.6.2 Kriteria objektif diagnosis — teks lengkap naskah. */
export const KRITERIA_DIAGNOSIS: [string, string][] = [
  [
    "STEMI",
    "Diagnosis ditegakkan berdasarkan kriteria EKG berupa elevasi segmen ST baru pada titik J di ≥ 2 sadapan berdekatan dengan ambang batas: ≥ 2,5 mm pada pria < 40 tahun, ≥ 2 mm pada pria ≥ 40 tahun, atau ≥ 1,5 mm pada wanita di sadapan V2–V3, dan/atau ≥ 1 mm di sadapan lainnya (Thygesen et al., 2018; Byrne et al., 2023).",
  ],
  [
    "NSTEMI",
    "Ditegakkan jika terdapat setidaknya satu nilai troponin di atas persentil ke-99 batas atas referensi (upper reference limit) disertai bukti iskemia berupa gejala iskemik, perubahan EKG non-persisten, atau LBBB baru (Thygesen et al., 2018; Collet et al., 2021).",
  ],
  [
    "Sindrom koroner akut (SKA)",
    "SKA secara spesifik mencakup STEMI dan NSTEMI. Angina pektoris tidak stabil (APTS) tidak termasuk dalam cakupan diagnosis pada penelitian ini untuk meminimalkan potensi bias diagnosis yang subjektif dan memastikan fokus pada populasi infark miokard akut yang terdefinisi objektif.",
  ],
  [
    "Syok kardiogenik (SKG)",
    "Ditegakkan jika pasien memenuhi seluruh kriteria berikut selama periode perawatan yang sama: (1) hipotensi persisten yang membutuhkan intervensi farmakologis, dibuktikan dengan catatan pemberian vasopresor atau inotropik untuk mempertahankan tekanan darah sistolik ≥ 90 mmHg; dan (2) disertai minimal satu bukti hipoperfusi organ akhir yang tercatat dalam rekam medis, yaitu perubahan status mental, akral dingin, oliguria (produksi urin < 0,5 mL/kg/jam selama ≥ 6 jam), atau peningkatan laktat serum > 2 mmol/L (Baran et al., 2019; Chioncel et al., 2020).",
  ],
];
