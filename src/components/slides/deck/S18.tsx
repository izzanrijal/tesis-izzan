import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { Panel, Pill } from "../ui";

const LADDER = [
  {
    p: "P1",
    title: "Tanpa validasi eksternal",
    desc: "Seluruh metrik dari validasi internal; performa pada kohort independen dapat berbeda.",
  },
  {
    p: "P2",
    title: "Satu pusat, retrospektif",
    desc: "PJT RSUP Dr. Wahidin Sudirohusodo; kualitas data bergantung rekam medis elektronik.",
  },
  {
    p: "P3",
    title: "Sampel sedang & data hilang",
    desc: "1.524 pasien, 115 kejadian; ekokardiografi tidak tersedia untuk semua pasien.",
  },
  {
    p: "P4",
    title: "Prediksi statis & paradoks terapi",
    desc: "Jendela tetap 24 jam; terapi agresif pada risiko tinggi ikut mengubah luaran.",
  },
];

export function S18() {
  return (
    <ContentSlide
      index={18}
      section="Implikasi"
      band={BANDS.clinic}
      title="Keterbatasan: pembukuan yang jujur sebelum bicara implementasi"
      metaTitle="Keterbatasan penelitian, diurut menurut dampak"
      basis="Basis: Bab 4.10; ambang triase diturunkan dan dievaluasi pada kohort yang sama"
      source="Bab 4.10 — Keterbatasan Penelitian"
      callout={
        <Callout label="Keterbatasan utama:" tone="flag">
          Belum ada <strong>validasi eksternal</strong>. Penerapan klinis mensyaratkan validasi
          prospektif terlebih dahulu.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 520px", gap: 52 }}>
        <div className="flex min-w-0 flex-col justify-between">
          {LADDER.map((l, i) => (
            <div
              key={l.p}
              className="flex items-start"
              style={{
                background: i === 0 ? "#fbe6ee" : "var(--s-panel)",
                borderLeft: `10px solid ${i === 0 ? "var(--s-flag)" : "var(--s-forest)"}`,
                padding: "14px 26px",
                marginLeft: i * 48,
                gap: 24,
              }}
            >
              <span
                className="slide-num shrink-0"
                style={{
                  color: i === 0 ? "var(--s-flag)" : "var(--s-jade)",
                  fontSize: 40,
                  width: 74,
                }}
              >
                {l.p}
              </span>
              <div className="min-w-0">
                <p className="slide-body-lg" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
                  {l.title}
                </p>
                <p className="slide-caption" style={{ color: "var(--s-ink)", marginTop: 4 }}>
                  {l.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Panel title="Yang tetap berlaku" subtitle="Batas interpretasi hasil saat ini">
          <div className="flex flex-col" style={{ gap: 18 }}>
            <Pill tone="outline">Bukti internal, bukan bukti penerapan</Pill>
            <Pill tone="outline">Ambang triase belum diuji ulang</Pill>
            <Pill tone="outline">Generalisasi terbatas ke populasi serupa</Pill>
            <p className="slide-body" style={{ color: "var(--s-ink)", marginTop: 6 }}>
              Keterbatasan ini tidak membatalkan temuan; ia menentukan seberapa jauh temuan boleh
              dibawa. Kesimpulan yang sah saat ini bersifat <strong>pembuktian konsep</strong> pada
              populasi Indonesia Timur.
            </p>
          </div>
        </Panel>
      </div>
    </ContentSlide>
  );
}
