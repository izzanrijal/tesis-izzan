import { ContentSlide } from "../chrome";
import { BANDS } from "@/lib/deck-data";
import { Panel, Pill } from "../ui";

function ChipRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="slide-caption" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
        {label}
      </p>
      <div className="flex flex-wrap" style={{ gap: 8, marginTop: 8 }}>
        {items.map((i) => (
          <Pill key={i} tone="outline">
            {i}
          </Pill>
        ))}
      </div>
    </div>
  );
}

export function SMetode3() {
  return (
    <ContentSlide
      section="Metode"
      band={BANDS.data}
      title="Variabel penelitian"
      metaTitle="Variabel terikat, bebas, dan perancu"
      basis="BAB II — Metode penelitian"
      source="Naskah tesis, BAB II"
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "0.8fr 1.2fr", gap: 36 }}>
        <div className="flex min-h-0 flex-col" style={{ gap: 20 }}>
          <Panel title="Variabel terikat" tone="mint">
            <p className="slide-body" style={{ color: "var(--s-ink)" }}>
              Mortalitas in-hospital: status hidup atau meninggal selama perawatan, dinilai sebagai
              luaran biner.
            </p>
          </Panel>
          <Panel title="Variabel perancu" tone="panel">
            <p className="slide-body" style={{ color: "var(--s-ink)" }}>
              Komorbid (diabetes melitus, hipertensi, penyakit ginjal kronik), waktu tunda dari
              onset ke IGD, serta strategi reperfusi yang diterima pasien.
            </p>
          </Panel>
        </div>

        <Panel title="Variabel bebas saat admisi IGD" tone="panel">
          <div className="flex flex-col" style={{ gap: 14 }}>
            <ChipRow
              label="KLINIS"
              items={["Usia", "Jenis kelamin", "Tekanan darah sistolik", "Tekanan darah diastolik", "Denyut nadi", "Laju napas", "Kebutuhan oksigen", "Kelas Killip"]}
            />
            <ChipRow
              label="LABORATORIUM"
              items={["Hemoglobin", "Trombosit", "Leukosit", "GOT", "GPT", "Ureum", "Kreatinin", "eGFR", "Natrium", "Kalium", "GDS", "APTT", "NLR", "SII"]}
            />
            <ChipRow label="EKOKARDIOGRAFI" items={["LVEF", "LVOT VTI", "TAPSE"]} />
            <ChipRow label="ELEKTROKARDIOGRAFI" items={["Tipe SKA: STEMI atau NSTEMI"]} />
          </div>
        </Panel>
      </div>
    </ContentSlide>
  );
}
