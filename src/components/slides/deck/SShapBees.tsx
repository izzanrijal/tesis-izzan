import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";
import { Bullet, BulletList, Panel } from "../ui";

export function SShapBees() {
  return (
    <ContentSlide
      section="Interpretasi"
      band={BANDS.data}
      title="Beeswarm menunjukkan arah pengaruh, bukan hanya besarnya"
      metaTitle="Analisis SHAP — sebaran pengaruh per pasien"
      basis="Basis: nilai SHAP setiap pasien pada model final; warna menyatakan tinggi rendahnya nilai fitur"
      source="Gambar 3.12 — Beeswarm plot nilai SHAP"
      callout={
        <Callout label="Yang tidak terlihat oleh Gini:">
          Lebar sebaran SHAP pada LVEF menandakan <strong>efek yang bergantung konteks</strong> —
          indikasi interaksi antarfitur yang tidak dapat dibaca dari peringkat kepentingan.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 580px", gap: 44 }}>
        <FigureBox
          src={FIGS.shapBees}
          alt="Beeswarm plot sebaran nilai SHAP tiap fitur"
          caption="Gambar 3.12 Sebaran nilai SHAP tiap pasien untuk seluruh fitur"
        />

        <Panel title="Cara membaca" subtitle="Warna = nilai fitur, posisi = arah pengaruh">
          <BulletList>
            <Bullet>
              Titik ke <strong>kanan</strong> menaikkan prediksi risiko mortalitas; ke{" "}
              <strong>kiri</strong> menurunkannya.
            </Bullet>
            <Bullet>
              Warna <strong>merah</strong> menandakan nilai fitur tinggi, <strong>biru</strong>{" "}
              nilai rendah.
            </Bullet>
            <Bullet>
              Ureum tinggi (merah) konsisten menggeser prediksi ke kanan; eGFR tinggi (merah)
              menggeser ke kiri — pola yang sesuai dengan patofisiologi sindrom kardiorenal.
            </Bullet>
            <Bullet>
              LVEF rendah menggeser prediksi ke arah risiko lebih tinggi, dengan sebaran lebar yang
              menandakan efek interaksional.
            </Bullet>
            <Bullet tone="jade">
              Konsistensi arah pengaruh dengan pengetahuan klinis memperkuat kepercayaan terhadap
              model.
            </Bullet>
          </BulletList>
        </Panel>
      </div>
    </ContentSlide>
  );
}
