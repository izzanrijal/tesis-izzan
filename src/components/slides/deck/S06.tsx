import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";

const DOMAINS = [
  {
    label: "Demografi",
    items: ["Usia", "Jenis kelamin"],
    tone: "paper",
  },
  {
    label: "Tanda vital",
    items: ["Tekanan darah sistolik", "Laju nadi", "Laju napas"],
    tone: "paper",
  },
  {
    label: "Laboratorium",
    items: ["Hemoglobin", "Ureum", "eGFR (CKD-EPI 2021)", "Kalium", "APTT"],
    tone: "paper",
  },
  {
    label: "Ekokardiografi",
    items: ["LVEF (Simpson biplane)", "LVOT VTI", "TAPSE"],
    tone: "accent",
  },
  {
    label: "Klasifikasi klinis",
    items: ["Killip kelas I–III"],
    tone: "paper",
  },
];

export function S06() {
  return (
    <ContentSlide
      index={6}
      section="Metode"
      band={BANDS.echo}
      title="Tiga belas prediktor rutin — termasuk tiga parameter ekokardiografi"
      metaTitle="Prediktor: lima domain, 13 variabel"
      basis="Basis: seluruh variabel tersedia rutin dalam 24 jam pertama admisi IGD; definisi operasional mengikuti Tabel 2.1 tesis"
      source="Tabel 2.1 — Definisi operasional variabel"
      callout={
        <Callout label="Keunggulan pembeda:">
          Tiga parameter ekokardiografi — <strong>LVEF, LVOT VTI, dan TAPSE</strong> — tidak
          tersedia dalam skor GRACE maupun TIMI.
        </Callout>
      }
    >
      <div className="flex h-full min-h-0 flex-col" style={{ gap: 26 }}>
        <div className="grid min-h-0 flex-1" style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: 22 }}>
          {DOMAINS.map((d) => {
            const accent = d.tone === "accent";
            return (
              <div
                key={d.label}
                className="flex min-w-0 flex-col"
                style={{
                  background: accent ? "var(--s-mint)" : "var(--s-panel)",
                  borderTop: `8px solid ${accent ? "var(--s-lime)" : "var(--s-forest)"}`,
                  padding: "26px 24px",
                }}
              >
                <p className="slide-caption" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
                  {d.items.length} VARIABEL
                </p>
                <p
                  className="slide-subtitle"
                  style={{ color: "var(--s-forest)", fontSize: 32, marginTop: 8 }}
                >
                  {d.label}
                </p>
                <ul className="flex flex-col" style={{ marginTop: 20, gap: 12 }}>
                  {d.items.map((it) => (
                    <li key={it} className="slide-body flex gap-3" style={{ color: "var(--s-ink)" }}>
                      <span
                        className="shrink-0"
                        style={{
                          width: 8,
                          height: 8,
                          background: accent ? "var(--s-forest)" : "var(--s-jade)",
                          marginTop: 12,
                        }}
                      />
                      <span className="min-w-0">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div
          className="flex shrink-0 items-center justify-between"
          style={{ background: "var(--s-forest)", padding: "22px 32px" }}
        >
          <p className="slide-body" style={{ color: "#c8ddd2" }}>
            Semua prediktor terukur dalam jendela 24 jam pertama — kompatibel dengan alur triase
            IGD dan POCUS.
          </p>
          <p className="slide-num" style={{ color: "var(--s-lime)", fontSize: 40 }}>
            13 PREDIKTOR
          </p>
        </div>
      </div>
    </ContentSlide>
  );
}
