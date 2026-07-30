export function S01() {
  return (
    <div className="slide-content flex">
      {/* Kolom kiri — kertas */}
      <div className="flex flex-1 flex-col" style={{ padding: "58px 72px 0 80px" }}>
        <div className="flex shrink-0 items-baseline justify-between">
          <p className="slide-kicker" style={{ color: "var(--s-forest)" }}>
            Tesis · Program Studi Kardiologi
          </p>
        </div>
        <div style={{ height: 1, background: "var(--s-rule)", marginTop: 22 }} />

        <div className="flex min-h-0 flex-1 flex-col justify-center" style={{ paddingRight: 40 }}>
          <p className="slide-kicker" style={{ color: "var(--s-jade)" }}>
            Sindrom Koroner Akut · STEMI &amp; NSTEMI
          </p>
          <h1
            className="slide-hero"
            style={{ color: "var(--s-forest)", marginTop: 26, maxWidth: 1080 }}
          >
            RANDOM
            <br />
            FOREST
          </h1>
          <div
            style={{ width: 172, height: 12, background: "var(--s-lime)", marginTop: 34 }}
          />
          <p
            className="slide-subtitle"
            style={{ color: "var(--s-ink)", marginTop: 34, maxWidth: 990, fontWeight: 600 }}
          >
            Prediksi mortalitas in-hospital pasien STEMI dan NSTEMI di Instalasi Gawat Darurat
          </p>
          <p
            className="slide-body-lg"
            style={{ color: "var(--s-slate)", marginTop: 22, maxWidth: 900 }}
          >
            Model 13 variabel rutin yang tersedia dalam 24 jam pertama — menemukan pasien
            berisiko tinggi sebelum syok kardiogenik terjadi.
          </p>
        </div>

        <div className="shrink-0" style={{ paddingBottom: 46 }}>
          <div className="slide-chrome flex gap-16" style={{ color: "var(--s-ink)" }}>
            <span>
              <strong style={{ color: "var(--s-forest)" }}>1.524</strong> PASIEN
            </span>
            <span>
              <strong style={{ color: "var(--s-forest)" }}>13</strong> PREDIKTOR
            </span>
            <span>
              <strong style={{ color: "var(--s-forest)" }}>115</strong> KEMATIAN (7,5%)
            </span>
            <span>JANUARI 2024 — DESEMBER 2025</span>
          </div>
          <div style={{ height: 1, background: "var(--s-rule)", margin: "22px 0" }} />
          <p className="slide-chrome" style={{ color: "#96a09a", letterSpacing: "0.06em" }}>
            PJT RSUP DR. WAHIDIN SUDIROHUSODO · MAKASSAR
          </p>
        </div>
      </div>

      {/* Kolom kanan — panel mint */}
      <div
        className="relative flex flex-col"
        style={{ width: 620, background: "var(--s-mint)" }}
      >
        <div className="flex flex-1 flex-col justify-center" style={{ padding: "0 62px" }}>
          <p className="slide-kicker" style={{ color: "var(--s-emerald)" }}>
            Area di bawah kurva ROC
          </p>
          <p
            className="slide-num"
            style={{
              color: "var(--s-forest)",
              fontSize: 216,
              lineHeight: 0.86,
              letterSpacing: "-0.05em",
              marginTop: 26,
            }}
          >
            0,819
          </p>
          <p
            className="slide-subtitle"
            style={{ color: "var(--s-forest)", marginTop: 30, maxWidth: 480 }}
          >
            Diskriminasi baik untuk mortalitas in-hospital
          </p>
          <p className="slide-body" style={{ color: "var(--s-emerald)", marginTop: 18 }}>
            Brier 0,061 · AUPRC 0,301 · 5-fold × 10 seed
          </p>
        </div>

        <div
          className="flex shrink-0 items-center justify-between"
          style={{ background: "var(--s-forest)", padding: "34px 62px", height: 178 }}
        >
          <p className="slide-subtitle" style={{ color: "#ffffff", fontSize: 32, lineHeight: 1.25 }}>
            BUKTI DULU,
            <br />
            BARU KEPUTUSAN KLINIS
          </p>
          <span className="slide-num" style={{ color: "#7fae97", fontSize: 22 }}>
            01 / 21
          </span>
        </div>
      </div>
    </div>
  );
}
