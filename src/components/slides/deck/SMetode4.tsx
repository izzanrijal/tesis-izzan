import { ContentSlide } from "../chrome";
import { BANDS } from "@/lib/deck-data";
import { DataTable, Panel } from "../ui";

const DEF: [string, string][] = [
  ["STEMI", "Nyeri dada iskemik disertai elevasi segmen ST persisten pada dua sadapan berdekatan, dengan peningkatan penanda nekrosis miokard."],
  ["NSTEMI", "Sindrom koroner akut tanpa elevasi segmen ST persisten, dengan peningkatan troponin sesuai definisi universal infark miokard."],
  ["Syok kardiogenik", "Hipoperfusi jaringan akibat disfungsi jantung: sistolik <90 mmHg atau membutuhkan vasopresor, disertai tanda hipoperfusi organ."],
];

export function SMetode4() {
  return (
    <ContentSlide
      section="Metode"
      band={BANDS.echo}
      title="Definisi operasional dan kriteria diagnostik"
      metaTitle="Definisi operasional"
      basis="BAB II — Metode penelitian"
      source="Naskah tesis, BAB II"
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1.15fr 0.85fr", gap: 36 }}>
        <div className="min-h-0">
          <DataTable
            align="left"
            head={["Variabel", "Definisi operasional", "Skala"]}
            rows={[
              ["Kelas Killip", "Klasifikasi gagal jantung akut saat admisi (I–IV)", "Ordinal"],
              ["eGFR", "Estimasi laju filtrasi glomerulus, formula CKD-EPI", "Numerik"],
              ["LVEF", "Fraksi ejeksi ventrikel kiri, metode Simpson biplane", "Numerik"],
              ["LVOT VTI", "Velocity time integral pada left ventricular outflow tract", "Numerik"],
              ["TAPSE", "Ekskursi sistolik bidang anulus trikuspid, M-mode", "Numerik"],
              ["NLR / SII", "Rasio neutrofil-limfosit dan indeks inflamasi imun sistemik", "Numerik"],
            ]}
          />
        </div>

        <Panel title="Kriteria diagnostik" tone="mint">
          <div className="flex flex-col" style={{ gap: 16 }}>
            {DEF.map(([k, v]) => (
              <div key={k} style={{ borderLeft: "6px solid var(--s-forest)", paddingLeft: 18 }}>
                <p className="slide-body" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
                  {k}
                </p>
                <p className="slide-caption" style={{ color: "var(--s-ink)", marginTop: 4 }}>
                  {v}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </ContentSlide>
  );
}
