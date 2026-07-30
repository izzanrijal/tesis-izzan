import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { Bullet, BulletList, Panel } from "../ui";

const CONTRIB = [
  { f: "eGFR", v: 0.25 },
  { f: "Ureum", v: 0.16 },
  { f: "APTT", v: 0.08 },
  { f: "Killip", v: 0.08 },
];

export function S12() {
  const max = 0.28;
  return (
    <ContentSlide
      index={12}
      section="Interpretasi"
      band={BANDS.data}
      title="SHAP melampaui peringkat: efek interaksi yang tak terlihat oleh Gini"
      metaTitle="Interpretasi SHAP: global dan per pasien"
      basis="Basis: nilai SHAP pada model final; contoh dekomposisi diambil dari satu pasien risiko tinggi dengan probabilitas prediksi 87,2%"
      source="Gambar 3.11 (SHAP bar), 3.12 (beeswarm), 3.13 (waterfall)"
      callout={
        <Callout label="Nilai tambahnya:">
          Dekomposisi per pasien memungkinkan <strong>penjelasan risiko yang dipersonalisasi</strong> —
          klinisi melihat variabel mana yang mendorong angka tersebut.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 620px", gap: 56 }}>
        <div className="flex min-w-0 flex-col">
          <p className="slide-caption" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
            DEKOMPOSISI WATERFALL — PASIEN RISIKO TINGGI (p = 87,2%)
          </p>

          <div className="flex flex-col" style={{ marginTop: 26, gap: 18 }}>
            {CONTRIB.map((c) => (
              <div key={c.f} className="flex items-center" style={{ gap: 22 }}>
                <span
                  className="slide-body shrink-0"
                  style={{ width: 150, color: "var(--s-ink)", fontWeight: 600 }}
                >
                  {c.f}
                </span>
                <div className="flex min-w-0 flex-1 items-center" style={{ gap: 16 }}>
                  <div
                    style={{
                      width: `${(c.v / max) * 100}%`,
                      height: 44,
                      background: "var(--s-forest)",
                    }}
                  />
                  <span
                    className="slide-body shrink-0"
                    style={{ color: "var(--s-jade)", fontWeight: 700 }}
                  >
                    +{c.v.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-between"
            style={{ marginTop: 34, background: "var(--s-mint)", padding: "22px 28px" }}
          >
            <span className="slide-body" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
              Probabilitas prediksi akhir
            </span>
            <span className="slide-num" style={{ color: "var(--s-forest)", fontSize: 48 }}>
              87,2%
            </span>
          </div>

          <p className="slide-caption" style={{ color: "var(--s-slate)", marginTop: 18 }}>
            Kontribusi ditampilkan untuk empat fitur dengan nilai SHAP terbesar pada pasien
            tersebut.
          </p>
        </div>

        <Panel title="Apa yang ditambahkan SHAP" subtitle="Konsisten dengan Gini, tetapi lebih kaya">
          <BulletList>
            <Bullet>
              Tiga fitur teratas konsisten dengan Gini: <strong>eGFR, LVEF, ureum</strong>.
            </Bullet>
            <Bullet>
              <strong>LVEF menunjukkan efek interaksional kuat</strong> — sebaran nilai SHAP-nya
              lebar, sesuatu yang tidak terdeteksi Gini importance.
            </Bullet>
            <Bullet>
              Pada beeswarm, nilai LVEF rendah menggeser prediksi ke arah risiko mortalitas lebih
              tinggi.
            </Bullet>
            <Bullet>
              Lebar sebaran menandakan efek LVEF <strong>bergantung konteks variabel lain</strong> —
              konsisten dengan fisiologi gagal jantung yang kompleks.
            </Bullet>
            <Bullet tone="jade">
              Waterfall memecah satu prediksi menjadi kontribusi aditif per fitur.
            </Bullet>
          </BulletList>
        </Panel>
      </div>
    </ContentSlide>
  );
}
