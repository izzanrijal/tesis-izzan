import { ContentSlide } from "../chrome";
import {
  BANDS,
  DEFOP_A,
  DEFOP_C,
  DEFOP_LAB,
  KRITERIA_DIAGNOSIS,
  type DefOpRow,
} from "@/lib/deck-data";

const COLS = ["30%", "36%", "8%", "26%"];

function DefTable({ rows }: { rows: DefOpRow[] }) {
  return (
    <table className="w-full" style={{ borderCollapse: "collapse", tableLayout: "fixed" }}>
      <colgroup>
        {COLS.map((w) => (
          <col key={w} style={{ width: w }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {["Variabel", "Definisi", "Skala", "Kriteria objektif / pengodean"].map((h) => (
            <th
              key={h}
              style={{
                fontSize: 17,
                lineHeight: 1.25,
                fontWeight: 700,
                textAlign: "left",
                color: "var(--s-forest)",
                borderBottom: "3px solid var(--s-forest)",
                padding: "8px 12px",
                verticalAlign: "bottom",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => {
          const isGroup = r[1] === "";
          if (isGroup)
            return (
              <tr key={i}>
                <td
                  colSpan={4}
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--s-forest)",
                    background: "var(--s-mint-soft)",
                    padding: "7px 12px",
                    borderBottom: "1px solid var(--s-rule)",
                  }}
                >
                  {r[0]}
                </td>
              </tr>
            );
          return (
            <tr key={i}>
              {r.map((c, ci) => (
                <td
                  key={ci}
                  style={{
                    fontSize: ci === 0 ? 16 : 15,
                    lineHeight: 1.32,
                    fontWeight: ci === 0 ? 700 : 400,
                    color: ci === 0 ? "var(--s-forest)" : "var(--s-ink)",
                    padding: "7px 12px",
                    verticalAlign: "top",
                    borderBottom: "1px solid var(--s-rule)",
                  }}
                >
                  {c}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function SMetode4() {
  return (
    <ContentSlide
      section="Metode"
      band={BANDS.echo}
      title="Definisi operasional (1/3): luaran, demografi & klinis"
      metaTitle="Definisi operasional — Tabel 2.1"
      basis="BAB II 2.6 — Definisi operasional dan kriteria objektif"
      source="Naskah tesis, Tabel 2.1 (hal. 10)"
    >
      <DefTable rows={DEFOP_A} />
    </ContentSlide>
  );
}

export function SMetode4b() {
  return (
    <ContentSlide
      section="Metode"
      band={BANDS.data}
      title="Definisi operasional (2/3): parameter laboratorium"
      metaTitle="Definisi operasional — Tabel 2.1"
      basis="BAB II 2.6 — C. Parameter laboratorium (0–24 jam pertama admisi)"
      source="Naskah tesis, Tabel 2.1 (hal. 11)"
    >
      <DefTable rows={DEFOP_LAB} />
    </ContentSlide>
  );
}

export function SMetode4c() {
  return (
    <ContentSlide
      section="Metode"
      band={BANDS.echo}
      title="Definisi operasional (3/3): ekokardiografi & perancu"
      metaTitle="Definisi operasional — Tabel 2.1"
      basis="BAB II 2.6 — E. Parameter ekokardiografi dan F. Variabel perancu"
      source="Naskah tesis, Tabel 2.1 (hal. 12)"
    >
      <DefTable rows={DEFOP_C} />
    </ContentSlide>
  );
}

export function SMetode4d() {
  return (
    <ContentSlide
      section="Metode"
      band={BANDS.clinic}
      title="Kriteria objektif diagnosis"
      metaTitle="Kriteria objektif diagnosis"
      basis="BAB II 2.6.2 — Kriteria objektif diagnosis"
      source="Naskah tesis, BAB II 2.6.2 (hal. 13)"
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        {KRITERIA_DIAGNOSIS.map(([k, v]) => (
          <div
            key={k}
            style={{
              borderLeft: "8px solid var(--s-forest)",
              background: "var(--s-mint-soft)",
              padding: "18px 24px",
            }}
          >
            <p style={{ fontSize: 22, fontWeight: 700, color: "var(--s-forest)" }}>{k}</p>
            <p style={{ fontSize: 17, lineHeight: 1.45, color: "var(--s-ink)", marginTop: 8 }}>{v}</p>
          </div>
        ))}
      </div>
    </ContentSlide>
  );
}
