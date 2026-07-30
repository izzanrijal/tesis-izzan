import bandEd from "@/assets/band-ed.jpg";
import bandEcho from "@/assets/band-echo.jpg";
import bandData from "@/assets/band-data.jpg";
import bandClinic from "@/assets/band-clinic.jpg";

export const BANDS = {
  ed: bandEd,
  echo: bandEcho,
  data: bandData,
  clinic: bandClinic,
};

export const SECTIONS = [
  "Konteks",
  "Metode",
  "Performa",
  "Interpretasi",
  "Perbandingan",
  "Implikasi",
  "Penutup",
] as const;

export type SectionName = (typeof SECTIONS)[number];

export const DECK_TITLE =
  "Random Forest untuk Prediksi Mortalitas In-Hospital pada Pasien STEMI dan NSTEMI di IGD";

export const TOTAL_SLIDES = 21;

/* ------------------------------------------------------------------
   Rekonstruksi kurva dari metrik terlapor (model binormal).
   AUC yang dilaporkan dipakai apa adanya sebagai parameter kurva.
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
  // Acklam / bisection hybrid — cukup untuk penggambaran kurva
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
  {
    tier: "Risiko Rendah",
    unit: "Ward",
    range: "< 0,018",
    n: 371,
    deaths: 2,
    rate: 0.5,
  },
  {
    tier: "Risiko Sedang",
    unit: "HCU",
    range: "0,018 – 0,104",
    n: 817,
    deaths: 31,
    rate: 3.8,
  },
  {
    tier: "Risiko Tinggi",
    unit: "ICU",
    range: "≥ 0,104",
    n: 336,
    deaths: 82,
    rate: 24.4,
  },
];

export const IMPORTANCE = [
  { fitur: "eGFR", gini: 0.152, domain: "Ginjal" },
  { fitur: "Ureum", gini: 0.131, domain: "Ginjal" },
  { fitur: "LVOT VTI", gini: 0.099, domain: "Ekokardiografi" },
  { fitur: "Hemoglobin", gini: 0.08, domain: "Laboratorium" },
  { fitur: "Kalium", gini: 0.076, domain: "Laboratorium" },
];
