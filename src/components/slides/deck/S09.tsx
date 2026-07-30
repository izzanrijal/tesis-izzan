import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { GroupedBars } from "../charts";
import { Pill } from "../ui";

const DATA = [
  { metrik: "Sensitivitas", safety: 0.983, youden: 0.713 },
  { metrik: "Spesifisitas", safety: 0.262, youden: 0.82 },
  { metrik: "PPV", safety: 0.098, youden: 0.244 },
  { metrik: "NPV", safety: 0.995, youden: 0.972 },
];

function StrategyCard({
  tag,
  threshold,
  title,
  desc,
  stats,
  tone,
}: {
  tag: string;
  threshold: string;
  title: string;
  desc: string;
  stats: string;
  tone: "forest" | "mint";
}) {
  const dark = tone === "forest";
  return (
    <div
      className="flex flex-col"
      style={{
        background: dark ? "var(--s-forest)" : "var(--s-mint)",
        padding: "26px 30px",
        borderLeft: `8px solid ${dark ? "var(--s-lime)" : "var(--s-forest)"}`,
      }}
    >
      <div className="flex items-center justify-between gap-6">
        <span
          className="slide-caption"
          style={{ color: dark ? "var(--s-lime)" : "var(--s-jade)", fontWeight: 700 }}
        >
          {tag}
        </span>
        <span
          className="slide-badge"
          style={{
            background: dark ? "#0a3626" : "#ffffff",
            color: dark ? "#c8ddd2" : "var(--s-forest)",
            padding: "8px 16px",
            fontWeight: 700,
          }}
        >
          ambang {threshold}
        </span>
      </div>
      <p
        className="slide-subtitle"
        style={{ color: dark ? "#ffffff" : "var(--s-forest)", fontSize: 34, marginTop: 12 }}
      >
        {title}
      </p>
      <p
        className="slide-body"
        style={{ color: dark ? "#c8ddd2" : "var(--s-ink)", marginTop: 12 }}
      >
        {desc}
      </p>
      <p
        className="slide-body"
        style={{
          color: dark ? "var(--s-lime)" : "var(--s-forest)",
          fontWeight: 700,
          marginTop: 14,
        }}
      >
        {stats}
      </p>
    </div>
  );
}

export function S09() {
  return (
    <ContentSlide
      index={9}
      section="Performa"
      band={BANDS.ed}
      title="Dua ambang batas untuk dua konteks klinis yang berbeda"
      metaTitle="Ambang batas: keamanan vs efisiensi"
      basis="Basis: prediksi out-of-fold pada 1.524 pasien; 115 kematian; ambang keamanan dan ambang Youden dihitung dari kurva yang sama"
      source="Gambar 3.3 — Performa model pada berbagai ambang batas"
      callout={
        <Callout label="Aturan pakai:">
          Ambang keamanan untuk <strong>skrining IGD</strong> — tidak boleh ada pasien risiko tinggi
          yang terlewat. Ambang Youden untuk <strong>alokasi sumber daya</strong>.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "760px 1fr", gap: 56 }}>
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-4">
            <Pill tone="forest">Ambang keamanan 0,018</Pill>
            <Pill tone="mint">Ambang Youden 0,104</Pill>
          </div>
          <div style={{ marginTop: 10 }}>
            <GroupedBars
              width={750}
              height={450}
              data={DATA}
              keys={[
                { key: "safety", label: "Ambang keamanan (0,018)", color: "var(--s-forest)" },
                { key: "youden", label: "Ambang Youden (0,104)", color: "var(--s-jade)" },
              ]}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-between" style={{ gap: 24 }}>
          <StrategyCard
            tone="forest"
            tag="STRATEGI 1 · SKRINING"
            threshold="0,018455"
            title="Ambang keamanan"
            desc="Menangkap hampir seluruh pasien berisiko: hanya 2 dari 115 kematian yang terlewat. Konsekuensinya 837 positif palsu."
            stats="Sens 98,3% · Spec 26,2% · PPV 9,8% · NPV 99,5% · FN = 2"
          />
          <StrategyCard
            tone="mint"
            tag="STRATEGI 2 · ALOKASI SUMBER DAYA"
            threshold="0,103981"
            title="Ambang Youden"
            desc="Memaksimalkan jumlah sensitivitas dan spesifisitas. Efisien tanpa mengorbankan terlalu banyak sensitivitas."
            stats="Sens 71,3% · Spec 82,0% · PPV 24,4% · NPV 97,2% · FN = 33"
          />
        </div>
      </div>
    </ContentSlide>
  );
}
