import { BANDS } from "@/lib/deck-data";
import { ContentSlide } from "../chrome";
import { Panel } from "../ui";

const PRIORITAS = [
  { p: "Prioritas 1", t: "Validasi eksternal pada kohort independen dari pusat lain" },
  { p: "Prioritas 2", t: "Validasi prospektif untuk memastikan performa real-time" },
  { p: "Prioritas 3", t: "Studi implementasi: integrasi EMR sebagai CDSS dan pengukuran dampak" },
  { p: "Prioritas 4", t: "Model sederhana tanpa parameter ekokardiografi untuk fasilitas terbatas" },
  { p: "Prioritas 5", t: "Analisis fairness: bias menurut jenis kelamin, usia, dan komorbiditas" },
  { p: "Prioritas 6", t: "Prediksi dinamis dengan risiko yang diperbarui seiring perubahan klinis" },
];

const REFS = [
  "Breiman, L. (2001). Random Forests. Machine Learning, 45(1), 5–32.",
  "Thygesen, K. dkk. (2018). Fourth Universal Definition of Myocardial Infarction. JACC, 72(18), 2231–2264.",
  "Chioncel, O. dkk. (2020). Cardiogenic shock: epidemiology and management. EJHF, 22(8), 1315–1341.",
  "Granger, C.B. (2003). Predictors of Hospital Mortality in GRACE. Arch Intern Med, 163(19), 2345.",
  "Collins, G.S. dkk. (2024). TRIPOD+AI statement. BMJ, 385, e078378.",
  "Johnson, K.W. dkk. (2018). Artificial Intelligence in Cardiology. JACC, 71(23), 2668–2679.",
];

export function S21() {
  return (
    <ContentSlide
      index={21}
      section="Penutup"
      band={BANDS.clinic}
      title="Jalan ke depan: enam prioritas dan referensi"
      metaTitle="Saran penelitian lanjutan, referensi, dan sesi diskusi"
      basis="Basis: Bab 5.2; dataset 1.524 pasien PJT RSUP Dr. Wahidin Sudirohusodo, Makassar (2024–2025)"
      source="Bab 5.2 — Saran; daftar referensi terpilih"
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 720px", gap: 52 }}>
        <div className="flex min-w-0 flex-col" style={{ gap: 14 }}>
          {PRIORITAS.map((r, i) => (
            <div
              key={r.p}
              className="flex items-center"
              style={{
                background: i < 2 ? "var(--s-mint)" : "var(--s-panel)",
                borderLeft: `8px solid ${i < 2 ? "var(--s-forest)" : "var(--s-rule)"}`,
                padding: "14px 24px",
                gap: 22,
              }}
            >
              <span
                className="slide-caption shrink-0"
                style={{ color: "var(--s-jade)", fontWeight: 700, width: 140 }}
              >
                {r.p.toUpperCase()}
              </span>
              <span className="slide-body min-w-0" style={{ color: "var(--s-ink)" }}>
                {r.t}
              </span>
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-col" style={{ gap: 22 }}>
          <Panel title="Referensi utama">
            <ol className="flex flex-col" style={{ gap: 12 }}>
              {REFS.map((r, i) => (
                <li key={r} className="slide-caption flex" style={{ color: "var(--s-ink)", gap: 14 }}>
                  <span className="slide-num shrink-0" style={{ color: "var(--s-jade)", width: 34 }}>
                    {i + 1}.
                  </span>
                  <span className="min-w-0">{r}</span>
                </li>
              ))}
            </ol>
          </Panel>
          <div
            className="flex shrink-0 items-center justify-between"
            style={{ background: "var(--s-forest)", padding: "22px 30px", gap: 24 }}
          >
            <p className="slide-subtitle" style={{ color: "#ffffff", fontSize: 34 }}>
              Terima kasih — diskusi dipersilakan
            </p>
            <span
              className="slide-badge"
              style={{ background: "var(--s-lime)", color: "var(--s-forest)", padding: "10px 20px", fontWeight: 700 }}
            >
              TANYA &amp; JAWAB
            </span>
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}
