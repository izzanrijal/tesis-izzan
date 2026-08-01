import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";
import { Bullet, BulletList, MetricBox } from "../ui";

export function S15() {
  return (
    <ContentSlide
      section="Perbandingan"
      band={BANDS.clinic}
      title="Random Forest mengungguli GRACE 2.0 pada populasi yang sama"
      metaTitle="Random Forest versus GRACE 2.0"
      basis="Basis: skor GRACE 2.0 dihitung pada seluruh 1.524 pasien dari parameter admisi yang tersedia"
      source="Gambar perbandingan ROC Random Forest vs GRACE 2.0 (repositori analisis)"
      callout={
        <Callout label="Dua uji, dua pertanyaan:">
          Selisih AUC 0,042 (bootstrap p=0,029) menilai <strong>diskriminasi</strong>; McNemar
          p&lt;0,001 pada ambang risiko 20% menilai <strong>klasifikasi berpasangan</strong> —
          keduanya dilaporkan terpisah.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 620px", gap: 44 }}>
        <FigureBox src={FIGS.rocGrace} alt="Kurva ROC Random Forest dibandingkan GRACE 2.0" />

        <div className="flex min-w-0 flex-col justify-between">
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <MetricBox label="AUC Random Forest" value="0,819" tone="mint" />
            <MetricBox label="AUC GRACE 2.0" value="0,777" />
            <MetricBox label="Selisih AUC" value="0,042" sub="IK 95% 0,003 – 0,084" />
            <MetricBox label="Bootstrap p" value="0,029" sub="McNemar p<0,001" />
          </div>

          <div>
            <p className="slide-subtitle" style={{ color: "var(--s-forest)", fontSize: 32 }}>
              Mengapa unggul
            </p>
            <BulletList>
              <Bullet>
                GRACE memakai 8 variabel dengan asumsi hubungan linear; model ini memakai 13
                variabel dan menangkap interaksi non-linear.
              </Bullet>
              <Bullet>
                Tambahan parameter ekokardiografi (LVOT VTI, TAPSE) memberi informasi hemodinamik
                yang tidak ada pada GRACE.
              </Bullet>
              <Bullet tone="flag">
                Keunggulan diperoleh dengan biaya: ekokardiografi dini belum tersedia di semua
                fasilitas.
              </Bullet>
            </BulletList>
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}
