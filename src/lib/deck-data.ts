import bandEd from "@/assets/band-ed.jpg";
import bandEcho from "@/assets/band-echo.jpg";
import bandData from "@/assets/band-data.jpg";
import bandClinic from "@/assets/band-clinic.jpg";

import figRoc from "@/assets/fig01_roc_curve.png.asset.json";
import figThreshold from "@/assets/fig02_threshold_performance.png.asset.json";
import figCalibration from "@/assets/fig04_calibration.png.asset.json";
import figDca from "@/assets/fig05_dca.png.asset.json";
import figPr from "@/assets/fig06_pr_curve.png.asset.json";
import figProb from "@/assets/fig07_prob_distribution.png.asset.json";
import figImportance from "@/assets/fig08_feature_importance.png.asset.json";
import figAblation from "@/assets/fig09_ablation.png.asset.json";
import figTriage from "@/assets/fig10_triage.png.asset.json";
import figRoc3 from "@/assets/fig11_roc_3outcomes.png.asset.json";
import figRocGrace from "@/assets/fig11_roc_comparison.png.asset.json";
import figRocSejajar from "@/assets/roc-grace5-rf6.png.asset.json";
import figStrobe from "@/assets/strobe_flowchart_v6.png.asset.json";
import svgTeori from "@/assets/kerangka-teori.svg.asset.json";
import svgKonsep from "@/assets/kerangka-konsep.svg.asset.json";

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
export const TOTAL_SLIDES = 35;

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

/** Matriks konfusi prediksi out-of-fold rerata 10 seed (Bagian 3.2.3). */
export const CONFUSION = {
  safety: {
    threshold: "0,018455",
    tp: 108,
    fn: 7,
    tn: 572,
    fp: 837,
    sens: "93,9%",
    spec: "40,6%",
    ppv: "11,4%",
    npv: "98,8%",
    flagged: 945,
  },
  youden: {
    threshold: "0,103981",
    tp: 89,
    fn: 26,
    tn: 1058,
    fp: 351,
    sens: "77,4%",
    spec: "75,1%",
    ppv: "20,2%",
    npv: "97,6%",
    flagged: 440,
  },
};
