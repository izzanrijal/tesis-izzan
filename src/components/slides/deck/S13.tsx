import { BANDS, TRIAGE } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { Panel } from "../ui";

const TONE = [
  { bg: "var(--s-mint-soft)", bar: "var(--s-jade)", fg: "var(--s-forest)" },
  { bg: "var(--s-mint)", bar: "var(--s-emerald)", fg: "var(--s-forest)" },
  { bg: "var(--s-forest)", bar: "var(--s-lime)", fg: "#ffffff" },
];

export function S13() {
  const maxRate = 24.4;
  return (
    <ContentSlide
      index={13}
      section="Interpretasi"
      band={BANDS.clinic}
      title="Triase tiga tingkat: gradien mortalitas 48 kali lipat dari bangsal ke ICU"
      metaTitle="Sistem triase bertingkat berbasis dua ambang batas"
      basis="Basis: 1.524 pasien, 115 kematian; stratifikasi memakai ambang 0,018 dan 0,104 dari model final"
      source="Tabel 3.4 — Sistem Triase Bertingkat; Gambar 3.14"
      callout={
        <Callout label="Nilai triase:">
          Kelompok ICU hanya <strong>22% populasi</strong> namun mencakup{" "}
          <strong>71% seluruh kematian</strong> — alokasi tempat tidur menjadi jauh lebih terarah.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 560px", gap: 52 }}>
        <div className="flex min-w-0 flex-col justify-between">
          {TRIAGE.map((t, i) => {
            const tone = TONE[i];
            return (
              <div
                key={t.tier}
                className="flex items-center"
                style={{
                  background: tone.bg,
                  borderLeft: `10px solid ${tone.bar}`,
                  padding: "22px 30px",
                  gap: 30,
                }}
              >
                <div style={{ width: 300 }}>
                  <p className="slide-subtitle" style={{ color: tone.fg, fontSize: 34 }}>
                    {t.tier}
                  </p>
                  <p
                    className="slide-caption"
                    style={{ color: i === 2 ? "#a9c9ba" : "var(--s-slate)", marginTop: 4 }}
                  >
                    {t.unit} · probabilitas {t.range}
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    style={{
                      height: 34,
                      width: `${(t.rate / maxRate) * 100}%`,
                      background: tone.bar,
                      minWidth: 12,
                    }}
                  />
                  <p
                    className="slide-caption"
                    style={{ color: i === 2 ? "#a9c9ba" : "var(--s-slate)", marginTop: 8 }}
                  >
                    {t.n} pasien · {t.deaths} kematian
                  </p>
                </div>
                <p
                  className="slide-num shrink-0"
                  style={{ color: tone.fg, fontSize: 54, width: 150, textAlign: "right" }}
                >
                  {t.rate.toFixed(1).replace(".", ",")}%
                </p>
              </div>
            );
          })}
        </div>

        <Panel title="Mengapa gradien ini penting" subtitle="Rasio mortalitas ICU : Ward = 48,8 : 1">
          <div className="flex h-full flex-col justify-around">
            {[
              {
                v: "48,8×",
                c: "var(--s-forest)",
                l: "Gradien mortalitas ICU vs bangsal",
                n: "0,5% → 24,4%",
              },
              {
                v: "71%",
                c: "var(--s-flag)",
                l: "Kematian pada tingkat tertinggi",
                n: "82 dari 115 kematian",
              },
              {
                v: "22%",
                c: "var(--s-jade)",
                l: "Porsi populasi tingkat tertinggi",
                n: "336 dari 1.524 pasien",
              },
            ].map((s) => (
              <div key={s.v} className="flex min-w-0 flex-col">
                <p className="slide-caption" style={{ color: "var(--s-slate)" }}>
                  {s.l}
                </p>
                <p
                  className="slide-num"
                  style={{ color: s.c, fontSize: 58, lineHeight: 1.02, marginTop: 4 }}
                >
                  {s.v}
                </p>
                <p className="slide-caption" style={{ color: "var(--s-slate)", marginTop: 2 }}>
                  {s.n}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </ContentSlide>
  );
}
