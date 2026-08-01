import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";
import { Bullet, BulletList, MetricBox } from "../ui";

export function SProbDist() {
  return (
    <ContentSlide
      section="Performa"
      band={BANDS.data}
      title="Distribusi probabilitas prediksi memisahkan kelompok hidup dan meninggal"
      metaTitle="Distribusi probabilitas prediksi"
      basis="Basis: probabilitas out-of-fold seluruh 1.524 pasien, dipisahkan menurut status luaran aktual"
      source="Gambar 3.9 — Distribusi probabilitas prediksi antara pasien mortalitas dan hidup"
      callout={
        <Callout label="Baca gambarnya:">
          Mayoritas pasien hidup menumpuk pada probabilitas 0–0,1; pasien yang meninggal menyebar
          ke kanan. Area tumpang tindih di rentang menengah adalah wilayah{" "}
          <strong>ketidakpastian terbesar</strong> model.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 540px", gap: 46 }}>
        <FigureBox src={FIGS.prob} alt="Histogram distribusi probabilitas prediksi" />
        <div className="flex min-w-0 flex-col justify-between">
          <div>
            <p className="slide-subtitle" style={{ color: "var(--s-forest)" }}>
              Konsekuensi klinis
            </p>
            <BulletList>
              <Bullet>
                Pemisahan distribusi inilah yang menghasilkan AUC 0,819 — bukan satu titik potong
                tunggal.
              </Bullet>
              <Bullet>
                Pasien di zona tumpang tindih paling membutuhkan penilaian klinis, bukan keputusan
                otomatis.
              </Bullet>
              <Bullet tone="jade">
                Bentuk distribusi yang miring ke kiri menjelaskan mengapa ambang safety berada
                pada 0,018 saja.
              </Bullet>
            </BulletList>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <MetricBox label="Pasien hidup" value="1.409" sub="probabilitas rendah dominan" tone="mint" />
            <MetricBox label="Pasien meninggal" value="115" sub="distribusi bergeser kanan" />
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}
