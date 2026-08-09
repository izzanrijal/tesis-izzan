import { BANDS, CONFUSION } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";

type Cm = typeof CONFUSION.safety;

function Cell({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "good" | "bad" | "neutral";
}) {
  const bg =
    tone === "good" ? "var(--s-forest)" : tone === "bad" ? "#fbe6ee" : "var(--s-mint-soft)";
  const fg = tone === "good" ? "#ffffff" : tone === "bad" ? "var(--s-flag)" : "var(--s-forest)";
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ background: bg, padding: "14px 8px", minHeight: 104 }}
    >
      <span className="slide-num" style={{ color: fg, fontSize: 46, lineHeight: 1 }}>
        {value.toLocaleString("id-ID")}
      </span>
      <span style={{ color: fg, fontSize: 17, marginTop: 6, opacity: 0.85 }}>{label}</span>
    </div>
  );
}

function Matrix({ title, subtitle, cm }: { title: string; subtitle: string; cm: Cm }) {
  return (
    <div className="flex min-w-0 flex-col" style={{ background: "var(--s-panel)", padding: "20px 24px" }}>
      <p className="slide-subtitle" style={{ color: "var(--s-forest)", fontSize: 32 }}>
        {title}
      </p>
      <p className="slide-caption" style={{ color: "var(--s-jade)", marginTop: 4 }}>
        {subtitle}
      </p>

      <div
        className="grid"
        style={{ gridTemplateColumns: "132px 1fr 1fr", gap: 8, marginTop: 16, alignItems: "stretch" }}
      >
        <div />
        <div className="slide-caption" style={{ color: "var(--s-slate)", textAlign: "center" }}>
          Prediksi hidup
        </div>
        <div className="slide-caption" style={{ color: "var(--s-slate)", textAlign: "center" }}>
          Prediksi meninggal
        </div>

        <div className="slide-caption flex items-center" style={{ color: "var(--s-slate)" }}>
          Aktual hidup
        </div>
        <Cell label="TN — benar negatif" value={cm.tn} tone="neutral" />
        <Cell label="FP — positif palsu" value={cm.fp} tone="neutral" />

        <div className="slide-caption flex items-center" style={{ color: "var(--s-slate)" }}>
          Aktual meninggal
        </div>
        <Cell label="FN — negatif palsu" value={cm.fn} tone="bad" />
        <Cell label="TP — benar positif" value={cm.tp} tone="good" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 16 }}>
        {[
          ["Sensitivitas", cm.sens],
          ["Spesifisitas", cm.spec],
          ["PPV", cm.ppv],
          ["NPV", cm.npv],
        ].map(([l, v]) => (
          <div key={l} style={{ background: "var(--s-paper)", padding: "10px 12px" }}>
            <p style={{ fontSize: 17, color: "var(--s-slate)" }}>{l}</p>
            <p className="slide-num" style={{ color: "var(--s-forest)", fontSize: 30, marginTop: 2 }}>
              {v}
            </p>
          </div>
        ))}
      </div>

      <p className="slide-caption" style={{ color: "var(--s-slate)", marginTop: 12 }}>
        Negatif palsu: <strong>{cm.fn}</strong> dari 115 kematian · N = 1.524 · total pasien
        ditandai berisiko tinggi: <strong>{cm.flagged.toLocaleString("id-ID")}</strong>.
      </p>
    </div>
  );
}

export function SConfusion() {
  return (
    <ContentSlide
      section="Performa"
      band={BANDS.ed}
      title="Matriks konfusi: harga sensitivitas tinggi terbayar oleh positif palsu"
      metaTitle="Analisis matriks konfusi pada dua ambang"
      basis="Basis: prediksi out-of-fold pada seluruh 1.524 pasien (115 kematian), Bagian 3.2.3"
      source="Gambar 3.4 dan Gambar 3.5 — Matriks konfusi ambang safety dan Youden"
      callout={
        <Callout label="Kompromi:">
          Ambang safety menurunkan negatif palsu dari 33 menjadi <strong>2</strong>, tetapi
          menaikkan positif palsu dari 254 menjadi <strong>1.040</strong> — jumlah pasien yang
          ditandai naik dari 336 ke 1.153.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 1fr", gap: 36 }}>
        <Matrix
          title="Ambang safety"
          subtitle={`p ≥ ${CONFUSION.safety.threshold} — prioritas menangkap semua kematian`}
          cm={CONFUSION.safety}
        />
        <Matrix
          title="Ambang Youden"
          subtitle={`p ≥ ${CONFUSION.youden.threshold} — keseimbangan sensitivitas dan spesifisitas`}
          cm={CONFUSION.youden}
        />
      </div>
    </ContentSlide>
  );
}
