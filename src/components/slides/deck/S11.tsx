import { BANDS, FIGS, GINI_TABLE } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";

export function S11() {
  return (
    <ContentSlide
      section="Interpretasi"
      band={BANDS.data}
      title="eGFR dan ureum mendominasi peringkat kepentingan fitur"
      metaTitle="Feature importance (Gini) — seluruh 13 fitur"
      basis="Basis: rerata penurunan impurity antar pohon, dengan simpangan baku antar model CV"
      source="Tabel 3.3 dan Gambar 3.10 — Feature importance berdasarkan Gini importance"
      callout={
        <Callout label="Peringatan tafsir:">
          Gini importance <strong>tidak menyatakan hubungan kausal</strong> dan dapat dipengaruhi
          korelasi antarprediktor — ureum dan eGFR saling berkorelasi kuat.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 700px", gap: 40 }}>
        <FigureBox src={FIGS.importance} alt="Diagram batang feature importance Gini" />

        <div className="min-w-0">
          <table className="w-full" style={{ borderCollapse: "collapse", fontSize: 20 }}>
            <thead>
              <tr>
                {["#", "Fitur", "Gini rerata", "SD antar model"].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 10px",
                      textAlign: i === 1 ? "left" : "center",
                      color: "var(--s-forest)",
                      fontWeight: 700,
                      borderBottom: "3px solid var(--s-forest)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GINI_TABLE.map((r, ri) => (
                <tr key={r[0]} style={{ background: ri < 3 ? "var(--s-mint-soft)" : "transparent" }}>
                  {r.map((c, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "8px 10px",
                        textAlign: i === 1 ? "left" : "center",
                        color: ri < 3 ? "var(--s-forest)" : "var(--s-ink)",
                        fontWeight: ri < 3 ? 700 : 400,
                        borderBottom: "1px solid var(--s-rule)",
                        whiteSpace: "nowrap",
                        lineHeight: 1.2,
                      }}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ContentSlide>
  );
}
