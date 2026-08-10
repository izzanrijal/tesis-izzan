import { ContentSlide, Callout } from "../chrome";
import { BANDS } from "@/lib/deck-data";
import { Panel, Bullet, BulletList } from "../ui";

export function SManfaat() {
  return (
    <ContentSlide
      section="Konteks"
      band={BANDS.clinic}
      title="Manfaat penelitian"
      metaTitle="Manfaat teoritis dan klinis"
      basis="BAB I — Pendahuluan, subbab 1.4"
      source="Naskah tesis, BAB I"
      callout={
        <Callout label="Inti manfaat:">
          menerjemahkan data rutin IGD menjadi keputusan triase yang lebih cepat, terukur, dan
          dapat diaudit.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "0.9fr 1.1fr", gap: 40 }}>
        <Panel title="Manfaat teoritis" tone="panel">
          <BulletList>
            <Bullet>
              Menambah wawasan penerapan machine learning, khususnya Random Forest, untuk prediksi
              mortalitas SKA pada populasi Indonesia.
            </Bullet>
            <Bullet>
              Memperkaya literatur mengenai variabel prediktor mortalitas yang relevan secara
              lokal.
            </Bullet>
          </BulletList>
        </Panel>

        <Panel title="Manfaat klinis" tone="mint">
          <BulletList>
            <Bullet>
              Alat bantu keputusan yang cepat dan akurat bagi dokter IGD untuk mengenali pasien
              berisiko tinggi, sehingga tatalaksana definitif dipercepat.
            </Bullet>
            <Bullet>
              Bahan pertimbangan pengembangan sistem prediksi dini syok kardiogenik di fasilitas
              kesehatan.
            </Bullet>
            <Bullet>
              Sumber data untuk penelitian penerapan machine learning di bidang kedokteran pada
              masa mendatang.
            </Bullet>
          </BulletList>
        </Panel>
      </div>
    </ContentSlide>
  );
}
