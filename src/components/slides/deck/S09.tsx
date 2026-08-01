import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";
import { Bullet, BulletList, Pill } from "../ui";

export function S09() {
  return (
    <ContentSlide
      section="Performa"
      band={BANDS.ed}
      title="Dua ambang batas untuk dua pertanyaan klinis yang berbeda"
      metaTitle="Pemilihan ambang batas: safety dan Youden"
      basis="Basis: metrik pada prediksi out-of-fold; ambang diturunkan dan dinilai pada kohort yang sama"
      source="Gambar 3.3 — Performa model pada berbagai ambang batas klasifikasi"
      callout={
        <Callout label="Kaidah pakai:">
          Ambang <strong>safety</strong> untuk skrining awal di IGD ketika negatif palsu tidak
          dapat ditoleransi; ambang <strong>Youden</strong> untuk alokasi sumber daya rawat inap.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 660px", gap: 44 }}>
        <FigureBox
          src={FIGS.threshold}
          alt="Grafik performa model pada berbagai ambang batas klasifikasi"
        />

        <div className="flex min-w-0 flex-col" style={{ gap: 20 }}>
          <div style={{ background: "var(--s-mint)", padding: "20px 26px" }}>
            <div className="flex items-center justify-between">
              <p className="slide-subtitle" style={{ color: "var(--s-forest)", fontSize: 32 }}>
                Ambang safety 0,018455
              </p>
              <Pill tone="forest">Sens 98,3%</Pill>
            </div>
            <BulletList>
              <Bullet>Spesifisitas 26,2% · PPV 9,8% · NPV 99,5%</Bullet>
              <Bullet>Hanya 2 negatif palsu pada evaluasi ambang</Bullet>
            </BulletList>
          </div>

          <div style={{ background: "var(--s-panel)", padding: "20px 26px" }}>
            <div className="flex items-center justify-between">
              <p className="slide-subtitle" style={{ color: "var(--s-forest)", fontSize: 32 }}>
                Ambang Youden 0,103981
              </p>
              <Pill tone="outline">Sens 71,3%</Pill>
            </div>
            <BulletList>
              <Bullet>Spesifisitas 82,0% · PPV 24,4% · NPV 97,2%</Bullet>
              <Bullet>
                Mengidentifikasi 82 dari 115 kematian dan mengklasifikasi benar 1.155 dari 1.409
                pasien hidup
              </Bullet>
            </BulletList>
          </div>

          <p className="slide-caption" style={{ color: "var(--s-slate)" }}>
            Karena kedua ambang diturunkan pada kohort yang sama, performanya masih memerlukan
            validasi eksternal.
          </p>
        </div>
      </div>
    </ContentSlide>
  );
}
