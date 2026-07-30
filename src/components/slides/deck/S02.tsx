import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { Bullet, BulletList, ColTitle, Panel, Stat } from "../ui";

export function S02() {
  return (
    <ContentSlide
      index={2}
      section="Konteks"
      band={BANDS.ed}
      title="Pembunuh senyap di IGD: syok kardiogenik terlambat dikenali"
      metaTitle="Latar belakang: mortalitas SKA tetap tinggi"
      basis="Basis: mortalitas in-hospital SKA global; angka syok kardiogenik dari kohort Eropa (Chioncel 2020; Tehrani 2020)"
      source="Chioncel et al. (2020), Tehrani et al. (2020), European Heart Journal"
      callout={
        <Callout label="Inti masalah:">
          Bukan kekurangan pilihan terapi, melainkan <strong>waktu</strong> — saat syok tampak
          secara klinis, lingkaran setannya sudah ireversibel.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 640px", gap: 56 }}>
        <div className="flex min-w-0 flex-col justify-between">
          <div className="flex gap-16">
            <Stat label="Mortalitas in-hospital SKA" value="4–12" unit="%" note="Rentang global" />
            <Stat
              label="Bila syok kardiogenik terjadi"
              value="30–50"
              unit="%"
              note="Mortalitas melonjak"
              tone="flag"
            />
          </div>

          <div style={{ height: 1, background: "var(--s-rule)" }} />

          <div>
            <ColTitle>Lingkaran setan yang harus diputus</ColTitle>
            <div className="flex items-center" style={{ marginTop: 24, gap: 14 }}>
              {["Iskemia miokard", "Curah jantung ↓", "Perfusi koroner ↓", "Iskemia memberat"].map(
                (t, i) => (
                  <div key={t} className="flex items-center" style={{ gap: 14 }}>
                    {i > 0 && (
                      <span className="slide-body-lg" style={{ color: "var(--s-jade)" }}>
                        →
                      </span>
                    )}
                    <span
                      className="slide-caption"
                      style={{
                        background: i === 3 ? "var(--s-forest)" : "var(--s-mint)",
                        color: i === 3 ? "#ffffff" : "var(--s-forest)",
                        fontWeight: 700,
                        padding: "16px 18px",
                        display: "inline-block",
                      }}
                    >
                      {t}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <Panel title="Mengapa deteksi dini penting" subtitle="Jendela peluang diukur dalam menit">
          <BulletList>
            <Bullet>
              SKA — mencakup STEMI dan NSTEMI — masih penyebab utama kematian kardiovaskular
              global.
            </Bullet>
            <Bullet>
              Tanda klinis syok (hipotensi, akral dingin, oliguria) muncul <strong>terlambat</strong>.
            </Bullet>
            <Bullet>
              Yang dibutuhkan: alat yang menandai pasien risiko tinggi <strong>sebelum</strong>{" "}
              kolaps — bukan dalam hitungan jam, tetapi menit.
            </Bullet>
            <Bullet tone="flag">
              Intervensi agresif hanya bermakna bila dimulai di dalam jendela tersebut.
            </Bullet>
          </BulletList>
        </Panel>
      </div>
    </ContentSlide>
  );
}
