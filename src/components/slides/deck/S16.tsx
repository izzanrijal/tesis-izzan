import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { RocChart } from "../charts";
import { Bullet, BulletList, DataTable, Panel } from "../ui";

export function S16() {
  return (
    <ContentSlide
      index={16}
      section="Perbandingan"
      band={BANDS.data}
      title="Tiga luaran, tiga tingkat kesulitan: mortalitas paling mudah diprediksi"
      metaTitle="Performa model untuk tiga luaran berbeda"
      basis="Basis: model dan fitur yang sama dilatih ulang untuk tiap luaran pada kohort 1.524 pasien"
      source="Tabel 3.5 — Performa Model untuk Berbagai Luaran; Gambar 3.15"
      callout={
        <Callout label="Kesimpulan luaran:">
          Syok kardiogenik lebih sulit diprediksi karena bersifat <strong>dinamis</strong> dan
          dipengaruhi intervensi — pasien yang segera menjalani PCI bisa tidak jatuh ke syok meski
          profil risikonya tinggi.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 700px", gap: 52 }}>
        <div className="flex min-w-0 flex-col">
          <p className="slide-caption" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
            KURVA ROC — TIGA LUARAN
          </p>
          <div style={{ marginTop: 8 }}>
            <RocChart
              width={940}
              height={450}
              curves={[
                {
                  key: "mort",
                  label: "Mortalitas (0,819)",
                  auc: 0.819,
                  color: "var(--s-forest)",
                },
                {
                  key: "komposit",
                  label: "Komposit (0,769)",
                  auc: 0.769,
                  color: "var(--s-jade)",
                },
                {
                  key: "skg",
                  label: "Syok kardiogenik (0,747)",
                  auc: 0.747,
                  color: "var(--s-flag)",
                },
              ]}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col" style={{ gap: 18 }}>
          <DataTable
            head={["Luaran", "AUC", "AUPRC", "Prevalensi"]}
            highlightCol={1}
            rows={[
              ["Mortalitas in-hospital", "0,819", "0,301", "7,5%"],
              ["Komposit", "0,769", "0,635", "12,9%"],
              ["Syok kardiogenik baru", "0,747", "0,500", "11,2%"],
            ]}
          />
          <Panel title="Mengapa syok lebih sulit" tone="mint">
            <BulletList>
              <Bullet>
                Dipengaruhi intervensi: revaskularisasi mengubah lintasan
              </Bullet>
              <Bullet tone="jade">
                Fitur teratas syok: <strong>LVOT VTI</strong>, <strong>TDS</strong>, <strong>APTT</strong>
              </Bullet>
            </BulletList>
          </Panel>
        </div>
      </div>
    </ContentSlide>
  );
}
