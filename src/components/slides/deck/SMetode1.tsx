import { ContentSlide } from "../chrome";
import { BANDS } from "@/lib/deck-data";
import { MetricBox, Panel, Bullet, BulletList } from "../ui";

export function SMetode1() {
  return (
    <ContentSlide
      section="Metode"
      band={BANDS.data}
      title="Desain, tempat, waktu, dan sampel penelitian"
      metaTitle="Desain dan sampel"
      basis="BAB II — Metode penelitian"
      source="Naskah tesis, BAB II"
    >
      <div className="flex h-full min-h-0 flex-col" style={{ gap: 26 }}>
        <div className="grid shrink-0" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          <MetricBox label="Total subjek" value="1.524" sub="pasien SKA" tone="forest" />
          <MetricBox label="Mortalitas in-hospital" value="115" sub="7,5% dari kohort" tone="mint" />
          <MetricBox label="STEMI" value="1.047" sub="68,7%" />
          <MetricBox label="NSTEMI" value="477" sub="31,3%" />
        </div>

        <div className="grid min-h-0 flex-1" style={{ gridTemplateColumns: "1fr 1fr", gap: 36 }}>
          <Panel title="Desain & tempat" tone="panel">
            <BulletList>
              <Bullet>Studi kohort retrospektif berbasis rekam medis elektronik.</Bullet>
              <Bullet>
                Pusat Jantung Terpadu RSUP Dr. Wahidin Sudirohusodo, Makassar — rujukan tersier
                Indonesia Timur.
              </Bullet>
              <Bullet>Periode admisi Januari 2024 sampai Desember 2025.</Bullet>
            </BulletList>
          </Panel>

          <Panel title="Populasi & teknik sampling" tone="mint">
            <BulletList>
              <Bullet>
                Populasi: seluruh pasien STEMI dan NSTEMI yang masuk IGD pada periode penelitian.
              </Bullet>
              <Bullet>
                Sampel diambil secara total sampling atas semua kasus yang memenuhi kriteria.
              </Bullet>
              <Bullet>
                Luaran utama: status hidup atau meninggal selama perawatan di rumah sakit.
              </Bullet>
            </BulletList>
          </Panel>
        </div>
      </div>
    </ContentSlide>
  );
}
