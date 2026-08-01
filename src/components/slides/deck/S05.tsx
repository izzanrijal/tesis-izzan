import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";
import { Bullet, BulletList, MetricBox } from "../ui";

export function S05() {
  return (
    <ContentSlide
      section="Metode"
      band={BANDS.data}
      title="Desain studi kohort retrospektif dan alur seleksi partisipan"
      metaTitle="Desain studi & alur partisipan (STROBE)"
      basis="Basis: rekam medis elektronik PJT RSUP Dr. Wahidin Sudirohusodo, Januari 2024 – Desember 2025"
      source="Diagram alur STROBE penelitian (repositori analisis)"
      callout={
        <Callout label="Hasil seleksi:">
          <strong>1.524 pasien</strong> masuk analisis akhir dengan <strong>115 kematian</strong>{" "}
          in-hospital (7,5%) — sekitar 10 kejadian per variabel untuk 13 prediktor.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 470px", gap: 44 }}>
        <FigureBox
          src={FIGS.strobe}
          alt="Diagram alur STROBE seleksi partisipan"
          pad={16}
          caption="Diagram alur partisipan sesuai pernyataan STROBE."
        />
        <div className="flex min-w-0 flex-col justify-between">
          <div>
            <p className="slide-subtitle" style={{ color: "var(--s-forest)" }}>
              Rancangan
            </p>
            <BulletList>
              <Bullet>
                Kohort retrospektif satu pusat, pasien SKA (STEMI/NSTEMI) dewasa yang masuk
                melalui IGD.
              </Bullet>
              <Bullet>
                Prediktor diambil dari data 24 jam pertama admisi; luaran dinilai hingga pasien
                keluar rumah sakit.
              </Bullet>
              <Bullet tone="flag">
                Eksklusi utama: data ekokardiografi admisi tidak tercatat karena POCUS belum
                rutin di IGD.
              </Bullet>
            </BulletList>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <MetricBox label="Dianalisis" value="1.524" sub="pasien" tone="mint" />
            <MetricBox label="Kematian" value="115" sub="7,5% prevalensi" />
            <MetricBox label="STEMI" value="1.047" sub="68,7%" />
            <MetricBox label="NSTEMI" value="477" sub="31,3%" />
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}
