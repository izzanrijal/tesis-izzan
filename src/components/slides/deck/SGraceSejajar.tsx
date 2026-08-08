import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";

export function SGraceSejajar() {
  return (
    <ContentSlide
      section="Perbandingan"
      band={BANDS.data}
      title="Perbandingan pada himpunan variabel yang sejajar"
      metaTitle="Random Forest versus skor GRACE pada variabel sejajar"
      basis="Basis: N=1.524, 115 kejadian; protokol identik model utama (10 seed × 5-fold, imputasi median per lipatan, 500 pohon, kedalaman maksimum 6)"
      source="Analisis ulang dataset tesis (Tabel 3.8 dan Gambar 3.12)"
      callout={
        <Callout label="Simpulan:">
          Pada informasi setara, Random Forest tidak kalah dan cenderung lebih baik (+0,0196;
          p=0,233 — belum bermakna). Keunggulan bermakna baru muncul saat parameter ekokardiografi
          dan laboratorium disertakan (0,8189).
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 660px", gap: 40 }}>
        <div className="flex min-h-0 flex-col">
          <div className="min-h-0 flex-1">
            <FigureBox
              src={FIGS.rocSejajar}
              alt="Kurva ROC skor GRACE lima dan delapan komponen dibandingkan Random Forest enam dan tiga belas parameter"
              caption="Gambar 3.12 Kurva ROC Random Forest dan skor GRACE pada populasi penelitian"
            />
          </div>
        </div>

        <div className="flex min-w-0 min-h-0 flex-col">
          <p className="slide-caption shrink-0" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
            Tabel 3.8 Perbandingan AUC pada himpunan variabel yang sejajar
          </p>
          <div className="shrink-0" style={{ marginTop: 10 }}>
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Model", "AUC", "Parameter"].map((h, i) => (
                    <th
                      key={h}
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "var(--s-forest)",
                        textAlign: "left",
                        padding: "8px 12px",
                        borderBottom: "3px solid var(--s-forest)",
                        background: i === 1 ? "var(--s-mint-soft)" : "transparent",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Skor GRACE lima komponen", "0,7845", "Usia, HR, TDS, kreatinin, Killip"],
                  ["Skor GRACE delapan komponen", "0,7767", "GRACE 2.0 lengkap (Tabel 3.7)"],
                  ["RF enam parameter", "0,8042", "GRACE-5 + ureum + eGFR (0,8006 ± 0,0055)"],
                  ["RF tiga belas parameter", "0,8189", "Model utama (0,8157 ± 0,0075)"],
                ].map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, i) => (
                      <td
                        key={i}
                        style={{
                          fontSize: i === 1 ? 24 : 21,
                          lineHeight: 1.25,
                          fontWeight: i === 1 ? 700 : 400,
                          color: i === 1 ? "var(--s-forest)" : "var(--s-ink)",
                          background: i === 1 ? "var(--s-mint-soft)" : "transparent",
                          padding: "8px 12px",
                          borderBottom: "1px solid var(--s-rule)",
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

          <div className="min-h-0 flex-1" style={{ marginTop: 18 }}>
            <div className="flex flex-col" style={{ gap: 10 }}>
              {[
                ["RF-6 vs GRACE-5: +0,0196 (IK 95% −0,0132 s.d. +0,0534; p=0,233)", false],
                ["RF-13: +0,0344 vs GRACE-5 dan +0,0422 vs GRACE-8", false],
                ["Henti jantung, deviasi ST, biomarker nyaris tanpa variasi", true],
              ].map(([t, flag]) => (
                <div key={String(t)} className="flex gap-3">
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      marginTop: 9,
                      flexShrink: 0,
                      background: flag ? "var(--s-flag)" : "var(--s-forest)",
                    }}
                  />
                  <p style={{ fontSize: 23, lineHeight: 1.32, color: "var(--s-ink)" }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}
