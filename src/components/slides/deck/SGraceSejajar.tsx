import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";
import { Bullet, BulletList, DataTable } from "../ui";

export function SGraceSejajar() {
  return (
    <ContentSlide
      section="Perbandingan"
      band={BANDS.data}
      title="Perbandingan pada himpunan variabel yang sejajar"
      metaTitle="Random Forest versus skor GRACE pada variabel sejajar"
      basis="Basis: N=1.524, 115 kejadian; protokol identik model utama (10 seed × 5-fold, imputasi median per lipatan, 500 pohon, kedalaman maksimum 6)"
      source="Analisis ulang dataset tesis (Tabel 3.8 dan Gambar 3.12)"
      callout={
        <Callout label="Simpulan:">
          Pada informasi setara, Random Forest tidak kalah dan cenderung lebih baik (+0,0196;
          p=0,233 — belum bermakna). Keunggulan bermakna baru muncul saat parameter ekokardiografi
          dan laboratorium disertakan (0,8189).
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 660px", gap: 40 }}>
        <div className="flex min-h-0 flex-col">
          <div className="min-h-0 flex-1">
            <FigureBox
              src={FIGS.rocSejajar}
              alt="Kurva ROC skor GRACE lima dan delapan komponen dibandingkan Random Forest enam dan tiga belas parameter"
              caption="Gambar 3.12 Kurva ROC Random Forest dan skor GRACE pada populasi penelitian"
            />
          </div>
        </div>

        <div className="flex min-w-0 min-h-0 flex-col">
          <p className="slide-caption shrink-0" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
            Tabel 3.8 Perbandingan AUC pada himpunan variabel yang sejajar
          </p>
          <div className="shrink-0" style={{ marginTop: 10 }}>
            <DataTable
              align="left"
              head={["Model", "AUC", "Parameter"]}
              highlightCol={1}
              rows={[
                [
                  <span className="slide-caption">Skor GRACE lima komponen</span>,
                  "0,7845",
                  <span className="slide-caption">Usia, HR, TDS, kreatinin, Killip</span>,
                ],
                [
                  <span className="slide-caption">Skor GRACE delapan komponen</span>,
                  "0,7767",
                  <span className="slide-caption">GRACE 2.0 lengkap (Tabel 3.7)</span>,
                ],
                [
                  <span className="slide-caption">RF enam parameter</span>,
                  "0,8042",
                  <span className="slide-caption">GRACE-5 + ureum + eGFR (0,8006 ± 0,0055)</span>,
                ],
                [
                  <span className="slide-caption">RF tiga belas parameter</span>,
                  "0,8189",
                  <span className="slide-caption">Model utama (0,8157 ± 0,0075)</span>,
                ],
              ]}
            />
          </div>

          <div className="min-h-0 flex-1 list-compact" style={{ marginTop: 14 }}>
            <BulletList>
              <Bullet>
                RF-6 vs GRACE-5: +0,0196 (IK 95% −0,0132 s.d. +0,0534; p=0,233).
              </Bullet>
              <Bullet>
                RF-13: +0,0344 vs GRACE-5; +0,0422 vs GRACE-8.
              </Bullet>
              <Bullet tone="flag">
                Henti jantung (6/1.524), deviasi ST, dan biomarker nyaris tanpa variasi.
              </Bullet>
            </BulletList>
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}
