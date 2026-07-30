import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { RocChart } from "../charts";
import { MetricBox } from "../ui";

export function S08() {
  return (
    <ContentSlide
      index={8}
      section="Performa"
      band={BANDS.data}
      title="AUC 0,819 dengan performa yang stabil di sepuluh seed validasi silang"
      metaTitle="Performa model: diskriminasi dan stabilitas"
      basis="Basis: validasi silang 5-fold diulang pada 10 seed; kurva ROC direkonstruksi dari AUC terlapor untuk keperluan penyajian"
      source="Gambar 3.2 — Kurva ROC, validasi silang 5-fold × 10 seed"
      callout={
        <Callout label="Interpretasi:">
          AUC 0,819 menunjukkan <strong>diskriminasi baik</strong>; Brier 0,061 menandakan
          probabilitas yang terkalibrasi; SD antar-seed hanya ±0,008 — hasilnya reproducible.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "800px 1fr", gap: 56 }}>
        <div className="flex min-w-0 flex-col">
          <p className="slide-caption" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
            KURVA ROC — PREDIKSI OUT-OF-FOLD TERGABUNG
          </p>
          <div style={{ marginTop: 8 }}>
            <RocChart
              width={790}
              height={470}
              curves={[
                { key: "rf", label: "Random Forest", auc: 0.819, color: "var(--s-forest)" },
              ]}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-between">
          <div>
            <p className="slide-caption" style={{ color: "var(--s-slate)" }}>
              AUC prediksi OOF tergabung
            </p>
            <p
              className="slide-num"
              style={{ color: "var(--s-forest)", fontSize: 132, lineHeight: 0.95, marginTop: 6 }}
            >
              0,819
            </p>
            <p className="slide-body" style={{ color: "var(--s-jade)", marginTop: 10 }}>
              Rerata 10 seed: 0,8157 ± 0,0075 · IK 95% 0,8110 – 0,8204
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <MetricBox label="Brier score" value="0,0605" sub="Kalibrasi baik" tone="mint" />
            <MetricBox label="AUPRC" value="0,3005" sub="Baseline 0,075" />
            <MetricBox label="Rentang antar-seed" value="0,8024 – 0,8247" />
            <MetricBox label="Prevalensi luaran" value="7,5%" sub="115 / 1.524" />
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}
