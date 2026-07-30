import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { RocChart } from "../charts";
import { Bullet, BulletList, MetricBox, Panel } from "../ui";

export function S15() {
  return (
    <ContentSlide
      index={15}
      section="Perbandingan"
      band={BANDS.echo}
      title="Random Forest unggul signifikan atas GRACE 2.0 pada kohort yang sama"
      metaTitle="Perbandingan dengan skor risiko konvensional"
      basis="Basis: 1.524 pasien yang sama; GRACE 2.0 dihitung dari variabel saat masuk (usia, TDS, laju nadi, kreatinin, Killip, elevasi ST, henti jantung)"
      source="Tabel 3.7 — Perbandingan AUC dengan Skor Risiko Konvensional"
      callout={
        <Callout label="Makna klinisnya:">
          Selisih AUC <strong>0,042 (p = 0,029)</strong> pada variabel masuk yang sama — keunggulan
          berasal dari kemampuan menangkap <strong>interaksi non-linear</strong>, bukan dari data
          tambahan.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 640px", gap: 52 }}>
        <div className="flex min-w-0 flex-col">
          <p className="slide-caption" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
            KURVA ROC — RANDOM FOREST VS GRACE 2.0
          </p>
          <div style={{ marginTop: 8 }}>
            <RocChart
              width={940}
              height={450}
              curves={[
                {
                  key: "rf",
                  label: "Random Forest (AUC 0,819)",
                  auc: 0.819,
                  color: "var(--s-forest)",
                },
                {
                  key: "grace",
                  label: "GRACE 2.0 (AUC 0,777)",
                  auc: 0.777,
                  color: "var(--s-flag)",
                },
              ]}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col" style={{ gap: 22 }}>
          <div className="grid shrink-0" style={{ gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <MetricBox label="Random Forest" value="0,819" sub="AUC · 13 fitur" tone="forest" />
            <MetricBox label="GRACE 2.0" value="0,777" sub="AUC · 8 variabel" tone="paper" />
          </div>
          <Panel title="Uji statistik" subtitle="Perbandingan berpasangan pada kohort identik">
            <BulletList>
              <Bullet>
                Selisih AUC <strong>0,042</strong> — bootstrap <strong>p = 0,029</strong> (IK 95%
                0,003 – 0,084); McNemar pada ambang 20%: <strong>p &lt; 0,001</strong>
              </Bullet>
              <Bullet tone="jade">
                GRACE 2.0 memakai regresi logistik (asumsi linear); Random Forest menangkap interaksi non-linear
              </Bullet>
            </BulletList>
          </Panel>
        </div>
      </div>
    </ContentSlide>
  );
}
