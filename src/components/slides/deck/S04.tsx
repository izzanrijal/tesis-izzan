import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { Bullet, BulletList, ColTitle, Panel } from "../ui";

const STEPS = [
  { n: "1", t: "Bootstrap", d: "Sampel acak dengan pengembalian dari 1.524 pasien" },
  { n: "2", t: "Subset fitur acak", d: "Setiap simpul memilih sebagian dari 13 fitur" },
  { n: "3", t: "500 pohon keputusan", d: "Tiap pohon tumbuh tanpa pemangkasan" },
  { n: "4", t: "Agregasi rerata", d: "Probabilitas akhir = rerata seluruh pohon" },
];

export function S04() {
  return (
    <ContentSlide
      index={4}
      section="Konteks"
      band={BANDS.data}
      title="Machine learning: belajar dari data, bukan dari asumsi distribusi"
      metaTitle="Paradigma baru: Random Forest sebagai model utama"
      basis="Basis: Random Forest 500 pohon (Breiman 2001); XGBoost sebagai pembanding; SHAP untuk interpretasi tingkat individu"
      source="Breiman (2001) Random Forests, Machine Learning 45(1)"
      callout={
        <Callout label="Mengapa Random Forest:">
          Ansambel 500 pohon menangkap interaksi non-linear <strong>tanpa mengorbankan
          interpretabilitas</strong> — feature importance dan SHAP tetap dapat dibaca klinisi.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 660px", gap: 56 }}>
        <div className="flex min-w-0 flex-col justify-between">
          <ColTitle>Cara kerja ansambel</ColTitle>

          <div className="flex items-stretch" style={{ gap: 18 }}>
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex min-w-0 flex-1 items-stretch" style={{ gap: 18 }}>
                <div
                  className="flex min-w-0 flex-1 flex-col"
                  style={{
                    background: i === 3 ? "var(--s-forest)" : "var(--s-mint-soft)",
                    borderTop: `6px solid ${i === 3 ? "var(--s-lime)" : "var(--s-jade)"}`,
                    padding: "22px 20px",
                  }}
                >
                  <span
                    className="slide-num"
                    style={{ color: i === 3 ? "var(--s-lime)" : "var(--s-jade)", fontSize: 34 }}
                  >
                    {s.n}
                  </span>
                  <p
                    className="slide-body"
                    style={{
                      color: i === 3 ? "#ffffff" : "var(--s-forest)",
                      fontWeight: 700,
                      marginTop: 10,
                    }}
                  >
                    {s.t}
                  </p>
                  <p
                    className="slide-caption"
                    style={{ color: i === 3 ? "#a9c9ba" : "var(--s-slate)", marginTop: 8 }}
                  >
                    {s.d}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <span
                    className="slide-subtitle self-center"
                    style={{ color: "var(--s-jade)" }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              background: "var(--s-panel)",
              borderLeft: "8px solid var(--s-forest)",
              padding: "22px 26px",
            }}
          >
            <p className="slide-body" style={{ color: "var(--s-ink)" }}>
              Bagging + subset fitur acak menurunkan varians dan menekan overfitting; setiap pohon
              melihat potongan data yang berbeda.
            </p>
          </div>
        </div>

        <Panel title="Keunggulan untuk konteks klinis" subtitle="Yang dibutuhkan di IGD, bukan sekadar akurasi">
          <BulletList>
            <Bullet>
              <strong>Feature importance (Gini)</strong> — hierarki prediktor dapat diperiksa dan
              didiskusikan.
            </Bullet>
            <Bullet>
              <strong>Robust terhadap data hilang</strong> — realitas rekam medis elektronik.
            </Bullet>
            <Bullet>
              <strong>Tanpa asumsi distribusi</strong> — tidak memaksa hubungan linear.
            </Bullet>
            <Bullet tone="jade">
              <strong>XGBoost</strong> dilatih pada data dan fitur identik sebagai pembanding
              performa relatif.
            </Bullet>
            <Bullet tone="jade">
              <strong>SHAP</strong> menguraikan kontribusi tiap fitur pada prediksi satu pasien.
            </Bullet>
          </BulletList>
        </Panel>
      </div>
    </ContentSlide>
  );
}
