const PEMBIMBING = [
  "Prof. Dr. dr. Idar Mappangara, Sp.PD, Sp.JP(K)",
  "Prof. Dr. dr. Muzakkir Amir, Sp.JP(K)",
  "Dr. dr. Akhtar Fajar Muzakkir, Sp.JP(K)",
  "Dr. dr. Az Hafid Nashar, Sp.JP(K)",
  "Dr. dr. Andi Alfian Zainuddin, M.KM",
];

export function S01() {
  return (
    <div className="slide-content flex">
      {/* Kolom kiri — kertas */}
      <div className="flex flex-1 flex-col" style={{ padding: "48px 64px 40px 80px" }}>
        <p className="slide-kicker shrink-0" style={{ color: "var(--s-forest)" }}>
          TESIS · PROGRAM PENDIDIKAN DOKTER SPESIALIS
        </p>
        <div className="shrink-0" style={{ height: 1, background: "var(--s-rule)", marginTop: 16 }} />

        <div className="flex min-h-0 flex-1 flex-col justify-center" style={{ paddingRight: 24 }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 46,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--s-forest)",
              maxWidth: 1130,
            }}
          >
            MODEL RANDOM FOREST UNTUK PREDIKSI MORTALITAS IN-HOSPITAL PADA PASIEN INFARK
            MIOKARD DENGAN ELEVASI SEGMEN ST (STEMI) DAN TANPA ELEVASI SEGMEN ST (NSTEMI)
            DI INSTALASI GAWAT DARURAT
          </h1>

          <div style={{ width: 148, height: 10, background: "var(--s-lime)", marginTop: 22 }} />

          <p
            style={{
              fontSize: 23,
              lineHeight: 1.35,
              fontStyle: "italic",
              color: "var(--s-slate)",
              marginTop: 22,
              maxWidth: 1080,
            }}
          >
            Random Forest Model for Predicting In-Hospital Mortality in Patients with ST-Segment
            Elevation Myocardial Infarction (STEMI) and Non-ST-Segment Elevation Myocardial
            Infarction (NSTEMI) in the Emergency Department
          </p>

          <div className="flex" style={{ gap: 64, marginTop: 30 }}>
            <div style={{ minWidth: 330 }}>
              <p style={{ fontSize: 18, letterSpacing: "0.1em", color: "var(--s-jade)", fontWeight: 700 }}>
                DISUSUN DAN DIAJUKAN OLEH
              </p>
              <p
                style={{
                  fontSize: 27,
                  fontWeight: 700,
                  color: "var(--s-forest)",
                  marginTop: 10,
                  lineHeight: 1.25,
                }}
              >
                dr. Izzan Rijal Muslim
              </p>
              <p style={{ fontSize: 21, color: "var(--s-slate)", marginTop: 4 }}>C165221010</p>
            </div>

            <div className="min-w-0 flex-1" style={{ borderLeft: "3px solid var(--s-rule)", paddingLeft: 28 }}>
              <p style={{ fontSize: 18, letterSpacing: "0.1em", color: "var(--s-jade)", fontWeight: 700 }}>
                PEMBIMBING
              </p>
              <ul style={{ marginTop: 10 }}>
                {PEMBIMBING.map((p) => (
                  <li
                    key={p}
                    style={{ fontSize: 21, lineHeight: 1.45, color: "var(--s-ink)" }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <div style={{ height: 1, background: "var(--s-rule)", marginBottom: 18 }} />
          <p style={{ fontSize: 19, lineHeight: 1.5, letterSpacing: "0.04em", color: "#7d8a83" }}>
            PROGRAM PENDIDIKAN DOKTER SPESIALIS ILMU PENYAKIT JANTUNG DAN PEMBULUH DARAH
            <br />
            FAKULTAS KEDOKTERAN UNIVERSITAS HASANUDDIN · MAKASSAR · 2026
            <br />
            PJT RSUP DR. WAHIDIN SUDIROHUSODO
          </p>
        </div>
      </div>

      {/* Kolom kanan — panel mint */}
      <div className="relative flex flex-col" style={{ width: 560, background: "var(--s-mint)" }}>
        <div className="flex flex-1 flex-col justify-center" style={{ padding: "0 54px" }}>
          <p className="slide-kicker" style={{ color: "var(--s-emerald)" }}>
            Area di bawah kurva ROC
          </p>
          <p
            className="slide-num"
            style={{
              color: "var(--s-forest)",
              fontSize: 132,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              marginTop: 20,
            }}
          >
            0,819
          </p>

          <p className="slide-subtitle" style={{ color: "var(--s-forest)", fontSize: 34, marginTop: 26 }}>
            Diskriminasi baik untuk mortalitas in-hospital
          </p>
          <p className="slide-body" style={{ color: "var(--s-emerald)", marginTop: 16 }}>
            Brier 0,061 · AUPRC 0,301 · 5-fold × 10 seed
          </p>
          <div style={{ height: 1, background: "#b9d6b4", margin: "26px 0" }} />
          <p style={{ fontSize: 21, lineHeight: 1.6, color: "var(--s-emerald)" }}>
            1.524 pasien · 13 prediktor
            <br />
            115 kematian in-hospital (7,5%)
            <br />
            Januari 2024 — Desember 2025
          </p>
        </div>

        <div
          className="flex shrink-0 items-center justify-between"
          style={{ background: "var(--s-forest)", padding: "30px 54px", height: 150 }}
        >
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#ffffff", fontSize: 27, lineHeight: 1.25 }}>
            BUKTI DULU,
            <br />
            BARU KEPUTUSAN KLINIS
          </p>
          <span className="slide-num" style={{ color: "#7fae97", fontSize: 20 }}>
            01 / 34
          </span>
        </div>
      </div>
    </div>
  );
}
