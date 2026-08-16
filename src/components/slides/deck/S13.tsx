import { BANDS, FIGS, TRIAGE } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";

export function S13() {
  return (
    <ContentSlide
      section="Interpretasi"
      band={BANDS.clinic}
      title="Triase tiga tingkat memisahkan mortalitas 0,5% hingga 24,4%"
      metaTitle="Sistem triase bertingkat berbasis probabilitas"
      basis="Basis: strata diturunkan dan dinilai pada prediksi out-of-fold kohort yang sama (validasi internal)"
      source="Tabel 3.5 dan Gambar 3.15 — Sistem triase bertingkat"
      callout={
        <Callout label="Batasan tegas:">
          Label ward, HCU, dan ICU adalah <strong>usulan strata risiko</strong>, bukan
          rekomendasi penempatan otomatis; keputusan lokasi perawatan tetap memerlukan penilaian
          klinis dan validasi eksternal.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 700px", gap: 42 }}>
        <FigureBox src={FIGS.triage} alt="Diagram sistem triase bertingkat" />

        <div className="flex min-w-0 flex-col justify-center" style={{ gap: 18 }}>
          {TRIAGE.map((t, i) => (
            <div
              key={t.tier}
              className="flex items-center justify-between"
              style={{
                background: i === 2 ? "var(--s-forest)" : "var(--s-panel)",
                borderLeft: `10px solid ${i === 2 ? "var(--s-flag)" : "var(--s-jade)"}`,
                padding: "20px 26px",
              }}
            >
              <div className="min-w-0">
                <p
                  className="slide-subtitle"
                  style={{ color: i === 2 ? "#ffffff" : "var(--s-forest)", fontSize: 32 }}
                >
                  {t.tier} · {t.unit}
                </p>
                <p
                  className="slide-caption"
                  style={{ color: i === 2 ? "#a9c9ba" : "var(--s-slate)", marginTop: 4 }}
                >
                  Probabilitas {t.range} · {t.n} pasien · {t.deaths} kematian
                </p>
              </div>
              <p
                className="slide-num shrink-0"
                style={{ color: i === 2 ? "#ffffff" : "var(--s-forest)", fontSize: 52 }}
              >
                {t.rate.toString().replace(".", ",")}%
              </p>
            </div>
          ))}
          <p className="slide-caption" style={{ color: "var(--s-slate)" }}>
            Kelompok ICU hanya 22% populasi namun memuat 82 dari 115 kematian — gradien risiko
            sekitar 48 kali antara strata terendah dan tertinggi.
          </p>
        </div>
      </div>
    </ContentSlide>
  );
}
