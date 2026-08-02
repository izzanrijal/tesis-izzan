import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";
import { MetricBox } from "../ui";

export function S08() {
  return (
    <ContentSlide
      section="Performa"
      band={BANDS.data}
      title="AUC 0,819 dengan performa stabil pada sepuluh seed validasi silang"
      metaTitle="Performa model: diskriminasi dan stabilitas"
      basis="Basis: kurva ROC asli dari prediksi out-of-fold, validasi silang 5-fold diulang pada 10 seed"
      source="Gambar 3.2 — Kurva ROC Model Random Forest (repositori analisis)"
      callout={
        <Callout label="Interpretasi:">
          AUC 0,819 menunjukkan <strong>diskriminasi baik</strong>; Brier 0,061 menandakan galat
          probabilitas rendah; SD antar-seed hanya ±0,0075 sehingga hasil reproducible.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 620px", gap: 48 }}>
        <FigureBox src={FIGS.roc} alt="Kurva ROC model Random Forest, AUC 0,819" />

        <div className="flex min-w-0 flex-col justify-between">
          <div>
            <p className="slide-caption" style={{ color: "var(--s-slate)" }}>
              AUC prediksi out-of-fold tergabung
            </p>
            <p
              className="slide-num"
              style={{ color: "var(--s-forest)", fontSize: 88, lineHeight: 0.98, marginTop: 4 }}
            >
              0,819
            </p>
            <p className="slide-body" style={{ color: "var(--s-jade)", marginTop: 8 }}>
              Rerata 10 seed 0,8157 ± 0,0075 · IK 95% 0,8110 – 0,8204
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <MetricBox label="Brier score" value="0,0605" sub="Galat probabilitas rendah" tone="mint" />
            <MetricBox label="AUPRC" value="0,3005" sub="Baseline 0,075" />
            <MetricBox label="Rentang antar-seed" value="0,802 – 0,825" />
            <MetricBox label="Prevalensi luaran" value="7,5%" sub="115 / 1.524" />
          </div>

        </div>
      </div>
    </ContentSlide>
  );
}
