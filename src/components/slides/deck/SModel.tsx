import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { Bullet, BulletList, ColTitle } from "../ui";

const PARAMS: [string, string, string][] = [
  ["n_estimators", "500 pohon", "Titik stabil untuk estimasi out-of-bag pada ukuran sampel ini"],
  ["max_depth", "6 tingkat", "Membatasi kompleksitas agar tidak overfitting pada 115 kejadian"],
  ["min_samples_leaf", "5 sampel", "Menjamin tiap daun berbasis lebih dari satu pasien"],
];

export function SModel() {
  return (
    <ContentSlide
      section="Metode"
      band={BANDS.data}
      title="Pengembangan model dan protokol validasi"
      metaTitle="Hiperparameter dan protokol validasi silang"
      basis="Basis: StratifiedKFold 5 lipatan diulang pada 10 seed acak, imputasi median dihitung ulang pada tiap lipatan pelatihan"
      source="Bab III — Pengembangan model Random Forest"
      callout={
        <Callout label="Kejujuran metodologis:" tone="flag">
          Hiperparameter ditetapkan berdasarkan literatur, bukan dioptimasi pada data ini. Tanpa
          nested cross-validation, estimasi performa <strong>berpotensi optimistis</strong>, meski
          risikonya kecil karena tidak ada pencarian hiperparameter berbasis data.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 720px", gap: 44 }}>
        <div className="flex min-w-0 flex-col" style={{ gap: 16 }}>
          <ColTitle>Hiperparameter tetap</ColTitle>
          {PARAMS.map(([k, v, d]) => (
            <div
              key={k}
              style={{
                background: "var(--s-mint-soft)",
                borderLeft: "6px solid var(--s-jade)",
                padding: "14px 20px",
              }}
            >
              <div className="flex items-baseline justify-between" style={{ gap: 16 }}>
                <span
                  style={{
                    fontFamily: "var(--s-mono, inherit)",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "var(--s-forest)",
                  }}
                >
                  {k}
                </span>
                <span className="slide-body" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
                  {v}
                </span>
              </div>
              <p className="slide-caption" style={{ color: "var(--s-ink)", marginTop: 4 }}>
                {d}
              </p>
            </div>
          ))}

          <div style={{ background: "var(--s-panel)", padding: "14px 20px" }}>
            <p className="slide-caption" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
              Protokol validasi
            </p>
            <p className="slide-caption" style={{ color: "var(--s-ink)", marginTop: 4 }}>
              StratifiedKFold 5 lipatan × 10 seed acak; imputasi median dihitung ulang pada tiap
              lipatan pelatihan untuk mencegah kebocoran data.
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col">
          <ColTitle>Justifikasi pemilihan</ColTitle>
          <BulletList>
            <Bullet>
              Hiperparameter ditetapkan <strong>berdasarkan literatur</strong>, bukan dioptimasi
              pada data ini — untuk menghindari overfitting pada 115 kejadian.
            </Bullet>
            <Bullet>
              500 pohon merujuk <strong>Breiman (2001)</strong>: galat generalisasi konvergen
              seiring bertambahnya pohon, penambahan di atas beberapa ratus dapat diabaikan.
            </Bullet>
            <Bullet>
              Kedalaman 6 dan minimal 5 sampel per daun merujuk <strong>Probst dkk. (2019)</strong>{" "}
              untuk data medis dengan kelas tidak seimbang.
            </Bullet>
            <Bullet>
              Pengulangan 10 seed mengurangi variabilitas pembagian lipatan acak, sesuai{" "}
              <strong>Molinaro dkk. (2005)</strong>.
            </Bullet>
            <Bullet tone="flag">
              Nested cross-validation tidak dilakukan karena tidak ada pencarian hiperparameter
              berbasis data.
            </Bullet>
          </BulletList>
        </div>
      </div>
    </ContentSlide>
  );
}
