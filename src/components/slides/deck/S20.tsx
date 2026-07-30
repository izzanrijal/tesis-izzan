import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";

const TAKEAWAYS = [
  {
    n: "01",
    head: "AUC 0,819 dengan 13 variabel rutin",
    body: "Random Forest mencapai diskriminasi baik untuk mortalitas in-hospital pasien SKA di IGD, hanya dengan variabel yang tersedia rutin.",
  },
  {
    n: "02",
    head: "Fungsi ginjal mendominasi",
    body: "eGFR (0,152) dan ureum (0,131) memimpin kepentingan fitur — sinyal paling sensitif untuk hipoperfusi sistemik.",
  },
  {
    n: "03",
    head: "Gradien triase 48 kali lipat",
    body: "Sistem tiga tingkat dari dua ambang model menghasilkan mortalitas 0,5% → 24,4%, memungkinkan alokasi sumber daya berbasis risiko.",
  },
  {
    n: "04",
    head: "Unggul atas GRACE 2.0 dan XGBoost",
    body: "0,819 vs 0,777 (GRACE 2.0) dan 0,816 vs 0,789 (XGBoost) pada kohort yang sama — nilai tambah metode ensambel pohon.",
  },
];

export function S20() {
  return (
    <ContentSlide
      index={20}
      section="Penutup"
      band={BANDS.echo}
      title="Kesimpulan: empat temuan utama"
      metaTitle="Kesimpulan penelitian"
      basis="Basis: seluruh angka berasal dari analisis kohort 1.524 pasien, validasi internal"
      source="Bab 5.1 — Kesimpulan"
      callout={
        <Callout label="Pesan kunci:">
          Random Forest dengan 13 variabel rutin memberi <strong>stratifikasi risiko yang layak
          klinis</strong> pada IGD dengan sumber daya terbatas — sebagai pembuktian konsep yang siap
          divalidasi.
        </Callout>
      }
    >
      <div
        className="grid h-full min-h-0"
        style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 30 }}
      >
        {TAKEAWAYS.map((t, i) => {
          const dark = i === 0 || i === 3;
          return (
            <div
              key={t.n}
              className="flex min-h-0 flex-col justify-center"
              style={{
                background: dark ? "var(--s-forest)" : "var(--s-panel)",
                borderLeft: `10px solid ${dark ? "var(--s-lime)" : "var(--s-forest)"}`,
                padding: "26px 32px",
              }}
            >
              <span
                className="slide-num"
                style={{ color: dark ? "var(--s-lime)" : "var(--s-jade)", fontSize: 40 }}
              >
                {t.n}
              </span>
              <p
                className="slide-subtitle"
                style={{ color: dark ? "#ffffff" : "var(--s-forest)", fontSize: 34, marginTop: 8 }}
              >
                {t.head}
              </p>
              <p
                className="slide-body"
                style={{ color: dark ? "#c8ddd2" : "var(--s-ink)", marginTop: 10 }}
              >
                {t.body}
              </p>
            </div>
          );
        })}
      </div>
    </ContentSlide>
  );
}
