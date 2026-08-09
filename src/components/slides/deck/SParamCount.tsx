import { BANDS, FIGS, K_TABLE } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";

export function SParamCount() {
  return (
    <ContentSlide
      section="Performa"
      band={BANDS.data}
      title="Analisis jumlah parameter optimal: plato tercapai pada sepuluh fitur"
      metaTitle="3.3.3 Analisis jumlah parameter optimal"
      basis="Basis: fitur ditambahkan berurutan menurut peringkat kepentingan, tiap subset dievaluasi dengan protokol 10 seed × 5 lipatan"
      source="Tabel 3.4 dan Gambar 3.14 — Kurva jumlah parameter versus diskriminasi model"
      callout={
        <Callout label="Aturan plato:">
          Titik optimal berada pada <strong>k = 10</strong>, yaitu jumlah fitur terkecil yang
          mencapai AUC dalam rentang satu simpangan baku dari nilai tertinggi (0,816 pada k=12).
          Tiga fitur terakhir menambah 0,003–0,004 AUC — perbaikan marginal.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 620px", gap: 40 }}>
        <div className="flex min-h-0 flex-col" style={{ gap: 14 }}>
          <FigureBox
            src={FIGS.featureCount}
            alt="Kurva hubungan jumlah parameter dengan AUC model"
            caption="Gambar 3.14 Kurva jumlah parameter versus diskriminasi model"
          />
          <p className="slide-caption" style={{ color: "var(--s-slate)" }}>
            Kenaikan tercuram terjadi pada tujuh fitur pertama (0,649 → 0,808); setelahnya kurva
            mendatar. Ketiga belas fitur tetap dipertahankan karena masing-masing memiliki dasar
            patofisiologis dan tersedia rutin di IGD.
          </p>
        </div>

        <div className="min-w-0">
          <p className="slide-caption" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
            Tabel 3.4 AUC out-of-fold pada tiap jumlah parameter
          </p>
          <table
            className="w-full"
            style={{ borderCollapse: "collapse", fontSize: 18, marginTop: 10 }}
          >
            <thead>
              <tr>
                {["k", "Parameter terakhir", "AUC (rerata ± SD)", "Rentang"].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: "5px 10px",
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
              {K_TABLE.map((r) => {
                const sorot = r[0] === "10";
                return (
                  <tr key={r[0]} style={{ background: sorot ? "var(--s-mint)" : "transparent" }}>
                    {r.map((c, i) => (
                      <td
                        key={i}
                        style={{
                          padding: "5px 10px",
                          textAlign: i === 1 ? "left" : "center",
                          color: sorot ? "var(--s-forest)" : "var(--s-ink)",
                          fontWeight: sorot ? 700 : 400,
                          borderBottom: "1px solid var(--s-rule)",
                          whiteSpace: "nowrap",
                          lineHeight: 1.2,
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
        </div>
      </div>
    </ContentSlide>
  );
}
