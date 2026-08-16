import { TOTAL_SLIDES } from "@/lib/deck-data";
import { useSlideIndex } from "../SlideIndexContext";

function SectionSlide({
  no,
  kicker,
  title,
  subtitle,
  points,
}: {
  no: string;
  kicker: string;
  title: string;
  subtitle: string;
  points: string[];
}) {
  const resolved = useSlideIndex();
  const num = String(resolved).padStart(2, "0");

  return (
    <div className="slide-content flex" style={{ background: "var(--s-forest)" }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, color-mix(in oklab, #ffffff 6%, transparent) 0 2px, transparent 2px 28px)",
        }}
      />

      {/* Angka besar */}
      <div
        className="relative flex shrink-0 items-end justify-center"
        style={{ width: 520, paddingLeft: 80, paddingBottom: 90 }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 420,
            lineHeight: 0.8,
            letterSpacing: "-0.06em",
            color: "color-mix(in oklab, var(--s-lime) 55%, transparent)",
          }}
        >
          {no}
        </span>
      </div>

      <div
        className="relative flex min-w-0 flex-1 flex-col justify-center"
        style={{ paddingRight: 110, paddingLeft: 20 }}
      >
        <p className="slide-kicker" style={{ color: "var(--s-lime)" }}>
          {kicker}
        </p>
        <div style={{ width: 148, height: 10, background: "var(--s-lime)", marginTop: 18 }} />
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 96,
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            color: "#ffffff",
            marginTop: 24,
          }}
        >
          {title}
        </h2>
        <p
          className="slide-body-lg"
          style={{ color: "#a9c9ba", marginTop: 22, maxWidth: 1000, lineHeight: 1.35 }}
        >
          {subtitle}
        </p>

        <div style={{ height: 1, background: "#2f5e46", margin: "34px 0 22px" }} />

        <div className="flex flex-wrap" style={{ gap: 14 }}>
          {points.map((p) => (
            <span
              key={p}
              className="slide-chrome"
              style={{
                whiteSpace: "nowrap",
                color: "#d7ead f".replace(" ", ""),
                border: "1px solid #2f5e46",
                borderRadius: 999,
                padding: "8px 18px",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div
        className="slide-footer absolute"
        style={{ bottom: 26, right: 80, color: "#8fb7a2" }}
      >
        <span className="slide-num" style={{ letterSpacing: "0.08em" }}>
          {num} / {String(TOTAL_SLIDES).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export const SecPendahuluan = () => (
  <SectionSlide
    no="01"
    kicker="BAGIAN SATU"
    title="Pendahuluan"
    subtitle="Latar belakang mortalitas sindrom koroner akut di IGD, keterbatasan skor konvensional, serta rumusan masalah, tujuan, dan manfaat penelitian."
    points={["Latar belakang", "Keterbatasan GRACE & TIMI", "Rumusan masalah", "Tujuan", "Manfaat"]}
  />
);

export const SecMetode = () => (
  <SectionSlide
    no="02"
    kicker="BAGIAN DUA"
    title="Metode Penelitian"
    subtitle="Kerangka teori dan konsep, desain studi, populasi dan sampel, variabel, definisi operasional, prosedur, etika, serta analisis data."
    points={["Kerangka teori & konsep", "Desain & sampel", "Variabel", "Definisi operasional", "Analisis data"]}
  />
);

export const SecHasil = () => (
  <SectionSlide
    no="03"
    kicker="BAGIAN TIGA"
    title="Hasil"
    subtitle="Karakteristik dasar kohort, performa diskriminasi dan kalibrasi model, ambang batas klinis, serta interpretasi fitur melalui analisis SHAP."
    points={["Karakteristik dasar", "Kurva ROC & kalibrasi", "Ambang batas", "SHAP", "Perbandingan model"]}
  />
);

export const SecPembahasan = () => (
  <SectionSlide
    no="04"
    kicker="BAGIAN EMPAT"
    title="Pembahasan"
    subtitle="Makna klinis performa model, pemilihan algoritma, peran fungsi ginjal, triase bertingkat, posisi terhadap GRACE dan studi machine learning lain, serta keterbatasan."
    points={["Performa model", "Algoritma", "Triase bertingkat", "GRACE di Asia", "Keterbatasan"]}
  />
);

export const SecKesimpulan = () => (
  <SectionSlide
    no="05"
    kicker="BAGIAN LIMA"
    title="Kesimpulan"
    subtitle="Rangkuman temuan utama, implikasi bagi praktik triase di IGD, saran pengembangan, dan daftar rujukan."
    points={["Temuan utama", "Implikasi klinis", "Saran", "Referensi"]}
  />
);
