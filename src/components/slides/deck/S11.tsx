import { BANDS, IMPORTANCE } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { ImportanceBars } from "../charts";
import { Bullet, BulletList, Panel } from "../ui";

export function S11() {
  return (
    <ContentSlide
      index={11}
      section="Interpretasi"
      band={BANDS.echo}
      title="eGFR dan ureum mendominasi — sinyal mortalitas datang dari ginjal"
      metaTitle="Feature importance: hierarki prediktor"
      basis="Basis: Gini importance pada model Random Forest 500 pohon; lima fitur teratas dari 13 prediktor"
      source="Tabel 3.3 — Feature importance (Gini); Gambar 3.10"
      callout={
        <Callout label="Temuan paling bermakna klinis:">
          eGFR (0,152) + ureum (0,131) menyumbang porsi terbesar — disfungsi ginjal saat admisi
          bukan sekadar komorbiditas, melainkan{" "}
          <strong>cerminan paling sensitif hipoperfusi sistemik</strong>.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 620px", gap: 56 }}>
        <div className="flex min-w-0 flex-col">
          <p className="slide-caption" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
            LIMA FITUR TERATAS — GINI IMPORTANCE
          </p>
          <div style={{ marginTop: 6 }}>
            <ImportanceBars width={880} height={460} data={IMPORTANCE} />
          </div>
        </div>

        <Panel title="Membaca hierarkinya" subtitle="Ginjal, hemodinamik, lalu kapasitas oksigen">
          <BulletList>
            <Bullet>
              <strong>#1 eGFR — 0,152.</strong> Dominan mutlak; menangkap gangguan hemodinamik
              sebelum tampak sebagai syok.
            </Bullet>
            <Bullet>
              <strong>#2 Ureum — 0,131.</strong> Melengkapi eGFR; sensitif terhadap perfusi renal
              dan status katabolik.
            </Bullet>
            <Bullet>
              <strong>#3 LVOT VTI — 0,099.</strong> Ukuran hemodinamik langsung dari
              ekokardiografi.
            </Bullet>
            <Bullet>
              <strong>#4 Hemoglobin — 0,080.</strong> Kapasitas angkut oksigen.
            </Bullet>
            <Bullet>
              <strong>#5 Kalium — 0,076.</strong> Penanda stres seluler.
            </Bullet>
          </BulletList>
          <div
            style={{
              marginTop: 24,
              background: "#ffffff",
              borderLeft: "6px solid var(--s-flag)",
              padding: "18px 22px",
            }}
          >
            <p className="slide-caption" style={{ color: "var(--s-ink)" }}>
              Implikasi: fungsi ginjal saat admisi tidak boleh diabaikan dalam penilaian risiko di
              IGD — sinyalnya lebih kuat daripada fungsi jantung semata.
            </p>
          </div>
        </Panel>
      </div>
    </ContentSlide>
  );
}
