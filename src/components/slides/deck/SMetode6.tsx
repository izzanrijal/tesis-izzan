import { ContentSlide, Callout } from "../chrome";
import { BANDS } from "@/lib/deck-data";
import { Panel, Pill, Bullet, BulletList } from "../ui";

const STACK = ["Python 3.10+", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "Matplotlib", "Seaborn", "SHAP"];

export function SMetode6() {
  return (
    <ContentSlide
      section="Metode"
      band={BANDS.data}
      title="Metode analisis data"
      metaTitle="Analisis statistik dan komputasi"
      basis="BAB II — Metode penelitian"
      source="Naskah tesis, BAB II"
      callout={
        <Callout label="Prinsip analisis:">
          seluruh evaluasi performa dilakukan pada prediksi out-of-fold agar tidak terjadi
          kebocoran data antara pelatihan dan pengujian.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0 items-start" style={{ gridTemplateColumns: "1.1fr 0.9fr", gap: 36 }}>
        <Panel title="Uji statistik" tone="panel">
          <BulletList>
            <Bullet>
              Data numerik disajikan sebagai rerata ± simpang baku; data kategorik sebagai jumlah
              dan persentase.
            </Bullet>
            <Bullet>
              Perbandingan antar kelompok memakai uji t tidak berpasangan atau Mann-Whitney sesuai
              distribusi data.
            </Bullet>
            <Bullet>Data kategorik dibandingkan dengan uji chi-square atau uji Fisher.</Bullet>
            <Bullet>Nilai p &lt; 0,05 dianggap bermakna secara statistik.</Bullet>
          </BulletList>
        </Panel>

        <div className="flex min-h-0 flex-col" style={{ gap: 20 }}>
          <Panel title="Analisis pemodelan" tone="mint">
            <BulletList>
              <Bullet>Random Forest sebagai model utama, XGBoost sebagai pembanding.</Bullet>
              <Bullet>
                Validasi silang 5-fold × 10 seed; evaluasi AUC, Brier, dan interpretasi SHAP.
              </Bullet>
            </BulletList>
          </Panel>

          <div style={{ background: "var(--s-panel)", padding: "22px 26px" }}>
            <p className="slide-caption" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
              PERANGKAT LUNAK
            </p>
            <div className="flex flex-wrap" style={{ gap: 10, marginTop: 12 }}>
              {STACK.map((s) => (
                <Pill key={s} tone="outline">
                  {s}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}
