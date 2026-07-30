import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { DataTable, Panel, Bullet, BulletList } from "../ui";

export function S07() {
  return (
    <ContentSlide
      index={7}
      section="Metode"
      band={BANDS.clinic}
      title="Kelompok yang meninggal berbeda secara mencolok pada hampir semua parameter"
      metaTitle="Karakteristik dasar populasi penelitian"
      basis="Basis: 1.524 pasien; 115 meninggal vs 1.409 hidup; nilai rerata ± simpang baku; uji beda antar kelompok"
      source="Tabel 3.1 — Karakteristik dasar populasi penelitian"
      callout={
        <Callout label="Pola yang muncul:">
          Yang meninggal lebih tua, Killip lebih tinggi, fungsi ginjal lebih buruk, hemoglobin lebih
          rendah, dan LVEF lebih tertekan — <strong>perbedaannya tidak halus, melainkan tajam</strong>.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 560px", gap: 56 }}>
        <div className="min-w-0">
          <DataTable
            head={["Parameter", "Meninggal (n=115)", "Hidup (n=1.409)", "Nilai p"]}
            rows={[
              ["Usia (tahun)", "64,5 ± 9,2", "56,9 ± 11,0", <strong key="a">&lt; 0,0001</strong>],
              ["Killip III", "32,2%", "7,7%", <strong key="b">&lt; 0,0001</strong>],
              ["eGFR (mL/menit)", "57,8 ± 29,0", "83,4 ± 26,0", <strong key="c">&lt; 0,0001</strong>],
              ["LVEF (%)", "38,1 ± 8,8", "42,8 ± 7,7", <strong key="d">&lt; 0,0001</strong>],
              ["Hemoglobin (g/dL)", "12,4 ± 2,4", "13,8 ± 2,0", <strong key="e">&lt; 0,0001</strong>],
              ["Perempuan", "27,8%", "18,7%", <strong key="f">0,018</strong>],
            ]}
            highlightCol={1}
          />
        </div>

        <Panel title="Pembacaan klinis" subtitle="Tiga sinyal yang saling menguatkan">
          <BulletList>
            <Bullet>
              <strong>Usia + Killip</strong> — cadangan fisiologis rendah bertemu beban hemodinamik
              tinggi.
            </Bullet>
            <Bullet>
              <strong>eGFR turun 25,6 mL/menit</strong> pada kelompok meninggal — penanda
              hipoperfusi sistemik paling sensitif.
            </Bullet>
            <Bullet>
              <strong>Hb rendah + LVEF tertekan</strong> — kapasitas angkut oksigen dan pompa
              jantung menurun bersamaan.
            </Bullet>
            <Bullet tone="flag">
              Proporsi perempuan lebih tinggi pada kelompok meninggal (27,8% vs 18,7%; p=0,018).
            </Bullet>
          </BulletList>
        </Panel>
      </div>
    </ContentSlide>
  );
}
