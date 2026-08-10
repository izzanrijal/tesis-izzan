import { ContentSlide, Callout } from "../chrome";
import { BANDS } from "@/lib/deck-data";
import { Panel, Bullet, BulletList } from "../ui";

export function SMetode2() {
  return (
    <ContentSlide
      section="Metode"
      band={BANDS.data}
      title="Kriteria inklusi dan eksklusi"
      metaTitle="Kriteria seleksi subjek"
      basis="BAB II — Metode penelitian"
      source="Naskah tesis, BAB II"
      callout={
        <Callout label="Konsekuensi desain:">
          model diarahkan memprediksi pasien yang masih tampak stabil di IGD, bukan pasien yang
          sudah jelas syok.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <Panel title="Kriteria inklusi" tone="mint">
          <BulletList>
            <Bullet>Usia 18 tahun atau lebih.</Bullet>
            <Bullet>Diagnosis sindrom koroner akut tipe STEMI atau NSTEMI.</Bullet>
            <Bullet>
              Data rekam medis elektronik lengkap untuk variabel klinis, laboratorium, dan
              ekokardiografi saat admisi.
            </Bullet>
            <Bullet>Tersedia persetujuan umum penggunaan data rumah sakit.</Bullet>
          </BulletList>
        </Panel>

        <Panel title="Kriteria eksklusi" tone="panel">
          <BulletList>
            <Bullet tone="flag">Syok kardiogenik nyata (Killip IV) sejak saat admisi.</Bullet>
            <Bullet tone="flag">Syok non-kardiogenik, misalnya sepsis atau hipovolemia.</Bullet>
            <Bullet tone="flag">Meninggal di IGD sebelum data lengkap terkumpul.</Bullet>
            <Bullet tone="flag">
              Data ekokardiografi tidak lengkap (LVEF, TAPSE, atau LVOT VTI tidak terukur).
            </Bullet>
            <Bullet tone="flag">Pulang paksa sebelum luaran perawatan diketahui.</Bullet>
          </BulletList>
        </Panel>
      </div>
    </ContentSlide>
  );
}
