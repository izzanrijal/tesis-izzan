import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";
import { Bullet, BulletList } from "../ui";

export function SAblation() {
  return (
    <ContentSlide
      section="Interpretasi"
      band={BANDS.data}
      title="Analisis ablasi: tidak ada satu fitur pun yang menopang model sendirian"
      metaTitle="Analisis ablasi (leave-one-feature-out)"
      basis="Basis: model dilatih ulang tanpa satu fitur pada tiap iterasi, selisih AUC dibandingkan model lengkap"
      source="Gambar hasil analisis ablasi (repositori analisis)"
      callout={
        <Callout label="Implikasi:">
          Penurunan AUC per fitur bersifat kecil karena informasi antarprediktor{" "}
          <strong>saling tumpang tindih</strong> — konsisten dengan korelasi ureum–eGFR dan
          LVEF–LVOT VTI.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 520px", gap: 44 }}>
        <FigureBox src={FIGS.ablation} alt="Grafik hasil analisis ablasi fitur" />
        <div className="flex min-w-0 flex-col justify-center">
          <p className="slide-subtitle" style={{ color: "var(--s-forest)" }}>
            Yang dijawab analisis ini
          </p>
          <BulletList>
            <Bullet>
              Ablasi mengukur <strong>kontribusi unik</strong> sebuah fitur; Gini mengukur
              seberapa sering fitur dipakai memecah simpul.
            </Bullet>
            <Bullet>
              Fitur dengan Gini tinggi namun penurunan AUC kecil berarti perannya dapat digantikan
              fitur berkorelasi.
            </Bullet>
            <Bullet tone="jade">
              Ketahanan ini menguntungkan penerapan: model tetap berfungsi ketika satu parameter
              tidak tersedia.
            </Bullet>
            <Bullet tone="flag">
              Namun ablasi tetap validasi internal — bukan bukti transportabilitas ke pusat lain.
            </Bullet>
          </BulletList>
        </div>
      </div>
    </ContentSlide>
  );
}
