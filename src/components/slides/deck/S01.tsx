import { TOTAL_SLIDES } from "@/lib/deck-data";

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

      {/* Kolom kanan — panel identitas, tanpa angka hasil */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{ width: 560, background: "var(--s-forest)" }}
      >
        {/* Motif garis diagonal halus */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, color-mix(in oklab, #ffffff 7%, transparent) 0 2px, transparent 2px 26px)",
          }}
        />

        <div className="relative flex flex-1 flex-col justify-center" style={{ padding: "0 54px" }}>
          <div style={{ width: 96, height: 10, background: "var(--s-lime)" }} />
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 58,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginTop: 26,
            }}
          >
            SIDANG
            <br />
            HASIL
            <br />
            TESIS
          </p>
          <p
            className="slide-body"
            style={{ color: "#a9c9ba", marginTop: 24, lineHeight: 1.55 }}
          >
            Program Pendidikan Dokter Spesialis
            <br />
            Ilmu Penyakit Jantung dan Pembuluh Darah
          </p>

          <div style={{ height: 1, background: "#2f5e46", margin: "30px 0" }} />

          <p style={{ fontSize: 20, lineHeight: 1.6, color: "#8fb7a2", letterSpacing: "0.04em" }}>
            Universitas Hasanuddin
            <br />
            PJT RSUP Dr. Wahidin Sudirohusodo
            <br />
            Makassar · 2026
          </p>
        </div>

        <div
          className="relative flex shrink-0 items-center justify-between"
          style={{ background: "var(--s-lime)", padding: "0 54px", height: 96 }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "var(--s-forest)",
              fontSize: 22,
              letterSpacing: "0.06em",
            }}
          >
            BUKTI DULU, BARU KEPUTUSAN
          </p>
          <span className="slide-num" style={{ color: "var(--s-forest)", fontSize: 20 }}>
            01 / {TOTAL_SLIDES}
          </span>
        </div>
      </div>
    </div>
  );
}
