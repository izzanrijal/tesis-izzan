import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";
import { Bullet, BulletList, Panel } from "../ui";

export function SShapBar() {
  return (
    <ContentSlide
      section="Interpretasi"
      band={BANDS.data}
      title="Analisis SHAP: kontribusi fitur yang dapat dijumlahkan, bukan sekadar peringkat"
      metaTitle="3.3.2 Analisis SHAP — kepentingan fitur global"
      basis="Basis: SHAP TreeExplainer pada model Random Forest final, rerata nilai absolut SHAP seluruh pasien"
      source="Gambar 3.11 — Kontribusi fitur terhadap prediksi mortalitas (SHAP)"
      callout={
        <Callout label="Mengapa SHAP:">
          Pada fitur yang berkorelasi kuat seperti ureum dan eGFR, SHAP{" "}
          <strong>membagi kontribusi secara adil</strong>, sementara Gini importance cenderung
          memihak fitur dengan banyak nilai unik.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 600px", gap: 44 }}>
        <FigureBox
          src={FIGS.shapBar}
          alt="Diagram batang kontribusi fitur berdasarkan nilai SHAP"
          caption="Gambar 3.11 Analisis SHAP: kontribusi fitur terhadap prediksi mortalitas"
        />

        <div className="flex min-w-0 flex-col" style={{ gap: 18 }}>
          <Panel title="Metode" subtitle="TreeExplainer dan atribusi aditif">
            <BulletList>
              <Bullet>
                SHAP menghitung kontribusi tiap fitur terhadap satu prediksi berdasarkan{" "}
                <strong>teori permainan kooperatif</strong>.
              </Bullet>
              <Bullet>
                Implementasi <strong>TreeExplainer</strong> menghitung nilai SHAP secara eksak dan
                efisien untuk model berbasis pohon seperti Random Forest.
              </Bullet>
              <Bullet>
                Sifat <strong>additive feature attribution</strong>: jumlah nilai SHAP seluruh fitur
                sama dengan selisih prediksi terhadap nilai dasar.
              </Bullet>
            </BulletList>
          </Panel>

          <div style={{ background: "var(--s-mint-soft)", padding: "16px 24px" }}>
            <p className="slide-caption" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
              Temuan utama
            </p>
            <p className="slide-caption" style={{ color: "var(--s-ink)", marginTop: 4 }}>
              Tiga fitur teratas — ureum, eGFR, LVOT VTI — konsisten dengan peringkat Gini.
            </p>
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}
