import { BANDS, TABEL_31, TABEL_32 } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";

function CompactTable({
  head,
  rows,
}: {
  head: [string, string, string, string];
  rows: [string, string, string, string][];
}) {
  const sig = (p: string) => p.startsWith("<") || Number(p.replace(",", ".")) < 0.05;
  return (
    <table className="w-full" style={{ borderCollapse: "collapse", fontSize: 19 }}>
      <thead>
        <tr>
          {head.map((h, i) => (
            <th
              key={h + i}
              style={{
                padding: "8px 10px",
                textAlign: i === 0 ? "left" : "center",
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
        {rows.map((r, ri) => (
          <tr key={ri} style={{ background: ri % 2 ? "var(--s-panel)" : "transparent" }}>
            {r.map((c, i) => (
              <td
                key={i}
                style={{
                  padding: "7px 10px",
                  textAlign: i === 0 ? "left" : "center",
                  color: i === 3 && sig(c) ? "var(--s-flag)" : "var(--s-ink)",
                  fontWeight: i === 3 && sig(c) ? 700 : 400,
                  borderBottom: "1px solid var(--s-rule)",
                  whiteSpace: i === 0 ? "normal" : "nowrap",
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
  );
}

export function STabel31() {
  const head: [string, string, string, string] = [
    "Variabel",
    "Hidup (n=1.409)",
    "Meninggal (n=115)",
    "p",
  ];
  const half = Math.ceil(TABEL_31.length / 2);
  return (
    <ContentSlide
      section="Performa"
      band={BANDS.clinic}
      title="Karakteristik dasar: seluruh parameter yang diuji signifikansinya"
      metaTitle="Tabel 3.1 — karakteristik dasar populasi penelitian"
      basis="Basis: seluruh 22 baris Tabel 3.1 ditampilkan tanpa seleksi; nilai p bermakna (<0,05) ditandai magenta"
      source="Tabel 3.1 Karakteristik Dasar Populasi Penelitian"
      callout={
        <Callout label="Pola utama:">
          Kelompok meninggal lebih tua, Killip lebih berat, hemoglobin dan eGFR lebih rendah,
          serta ureum, kreatinin, NLR, dan SII lebih tinggi. Hanya SBP, gula darah sewaktu, dan
          Killip II yang tidak bermakna.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 1fr", gap: 38 }}>
        <CompactTable head={head} rows={TABEL_31.slice(0, half)} />
        <CompactTable head={head} rows={TABEL_31.slice(half)} />
      </div>
    </ContentSlide>
  );
}

export function STabel32() {
  const head: [string, string, string, string] = [
    "Variabel",
    "STEMI (n=1.047)",
    "NSTEMI (n=477)",
    "p",
  ];
  const half = Math.ceil(TABEL_32.length / 2);
  return (
    <ContentSlide
      section="Performa"
      band={BANDS.ed}
      title="STEMI versus NSTEMI: profil risiko lebih berat justru pada NSTEMI"
      metaTitle="Tabel 3.2 — perbandingan karakteristik subtipe SKA"
      basis="Basis: seluruh 23 baris Tabel 3.2 ditampilkan; nilai p bermakna (<0,05) ditandai magenta"
      source="Tabel 3.2 Perbandingan Karakteristik STEMI vs NSTEMI"
      callout={
        <Callout label="Catatan penting:">
          Mortalitas NSTEMI 9,0% versus STEMI 6,9% — <strong>tidak bermakna (p=0,1736)</strong> —
          namun sejalan dengan usia lebih tua, Killip III 19,3%, dan eGFR lebih rendah pada
          NSTEMI.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 1fr", gap: 38 }}>
        <CompactTable head={head} rows={TABEL_32.slice(0, half)} />
        <CompactTable head={head} rows={TABEL_32.slice(half)} />
      </div>
    </ContentSlide>
  );
}
