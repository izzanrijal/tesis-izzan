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
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 700px", gap: 40 }}>
        <FigureBox
          src={FIGS.rocSejajar}
          alt="Kurva ROC skor GRACE lima dan delapan komponen dibandingkan Random Forest enam dan tiga belas parameter"
          caption="Gambar 3.12 Kurva ROC model Random Forest dan skor GRACE pada populasi penelitian"
        />

        <div className="flex min-w-0 flex-col justify-between">
          <div>
            <p className="slide-caption" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
              Tabel 3.8 Perbandingan AUC pada himpunan variabel yang sejajar
            </p>
            <div style={{ marginTop: 10 }}>
              <DataTable
                align="left"
                head={["Model", "AUC", "Parameter"]}
                highlightCol={1}
                rows={[
                  [
                    "Skor GRACE lima komponen",
                    "0,7845",
                    "Usia, denyut jantung, TD sistolik, kreatinin serum, kelas Killip",
                  ],
                  [
                    "Skor GRACE delapan komponen",
                    "0,7767",
                    "Delapan komponen GRACE 2.0 (konsisten Tabel 3.7)",
                  ],
                  [
                    "Random Forest enam parameter",
                    "0,8042",
                    "Usia, denyut jantung, TD sistolik, Killip, ureum, eGFR — rerata per seed 0,8006 ± 0,0055",
                  ],
                  [
                    "Random Forest tiga belas parameter",
                    "0,8189",
                    "Tiga belas fitur model utama — rerata per seed 0,8157 ± 0,0075",
                  ],
                ]}
              />
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <BulletList>
              <Bullet>
                Selisih Random Forest enam parameter vs GRACE lima komponen: +0,0196 (IK 95%
                −0,0132 sampai +0,0534; bootstrap berpasangan 2.000 iterasi, p=0,233).
              </Bullet>
              <Bullet>
                Model utama tiga belas parameter: +0,0344 terhadap GRACE lima komponen dan +0,0422
                terhadap GRACE delapan komponen.
              </Bullet>
              <Bullet tone="flag">
                Tiga komponen GRACE 2.0 (henti jantung saat admisi 6/1.524, deviasi ST, peningkatan
                biomarker) hampir tidak bervariasi sehingga tidak menambah daya diskriminasi.
              </Bullet>
            </BulletList>
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}
