import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { GroupedBars } from "../charts";
import { DataTable } from "../ui";

const BARS = [
  { metrik: "AUC", rf: 0.816, xgb: 0.789 },
  { metrik: "AUPRC", rf: 0.301, xgb: 0.301 },
  { metrik: "Sensitivitas", rf: 0.983, xgb: 0.945 },
  { metrik: "Spesifisitas", rf: 0.262, xgb: 0.152 },
];

export function S14() {
  return (
    <ContentSlide
      index={14}
      section="Perbandingan"
      band={BANDS.data}
      title="Random Forest mengungguli XGBoost pada dataset dan 13 fitur yang sama"
      metaTitle="Perbandingan algoritma: Random Forest vs XGBoost"
      basis="Basis: dataset identik, 13 fitur identik, protokol validasi silang yang sama"
      source="Tabel 3.6 — Perbandingan Performa RF vs XGBoost"
      callout={
        <Callout label="Pembeda utama:">
          Selisih terbesar ada pada <strong>kalibrasi</strong> — Brier 0,061 vs 0,104. Probabilitas
          Random Forest lebih layak dipakai sebagai angka risiko di samping tempat tidur.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 700px", gap: 52 }}>
        <div className="flex min-w-0 flex-col">
          <p className="slide-caption" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
            METRIK DISKRIMINASI DAN OPERASIONAL (AMBANG KESELAMATAN)
          </p>
          <div style={{ marginTop: 10 }}>
            <GroupedBars
              width={1000}
              height={440}
              data={BARS}
              keys={[
                { key: "rf", label: "Random Forest", color: "var(--s-forest)" },
                { key: "xgb", label: "XGBoost", color: "#b6c6bd" },
              ]}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-between">
          <DataTable
            head={["Metrik", "Random Forest", "XGBoost"]}
            highlightCol={1}
            rows={[
              ["AUC", "0,816", "0,789"],
              ["AUPRC", "0,301", "0,301"],
              ["Sensitivitas", "98,3%", "94,5%"],
              ["Spesifisitas", "26,2%", "15,2%"],
              ["Brier score", "0,061", "0,104"],
              ["Waktu latih", "45,2 s", "38,6 s"],
            ]}
          />
        </div>
      </div>
    </ContentSlide>
  );
}
