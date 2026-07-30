import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { Bullet, BulletList, Panel, Pill } from "../ui";

const SKENARIO = [
  {
    n: "01",
    tag: "0 – 60 MENIT",
    title: "Triase cepat di IGD",
    desc: "Laboratorium awal dan POCUS ekokardiografi menghasilkan skor risiko untuk menentukan level rawat.",
  },
  {
    n: "02",
    tag: "TERINTEGRASI EMR",
    title: "Alert otomatis risiko tinggi",
    desc: "Peringatan otomatis untuk pasien risiko tinggi, serupa early warning system sepsis.",
  },
  {
    n: "03",
    tag: "MANAJEMEN KAPASITAS",
    title: "Alokasi sumber daya",
    desc: "Identifikasi 371 pasien bangsal (mortalitas 0,5%) yang dapat step-down agar tempat tidur ICU tersedia.",
  },
];

export function S17() {
  return (
    <ContentSlide
      index={17}
      section="Implikasi"
      band={BANDS.ed}
      title="Dari model ke samping tempat tidur: tiga skenario implementasi"
      metaTitle="Implikasi klinis dan jalur penerapan"
      basis="Basis: skenario penerapan yang diusulkan pada Bab 4.9; belum diuji secara prospektif"
      source="Bab 4.9 — Implikasi terhadap Praktik Klinis"
      callout={
        <Callout label="Batas peran:">
          Model ini adalah <strong>alat bantu keputusan klinis (CDSS)</strong> — pelengkap, bukan
          pengganti penilaian klinis dokter.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 560px", gap: 52 }}>
        <div className="flex min-w-0 flex-col justify-between">
          {SKENARIO.map((s) => (
            <div
              key={s.n}
              className="flex"
              style={{
                background: "var(--s-panel)",
                borderLeft: "10px solid var(--s-forest)",
                padding: "16px 26px",
                gap: 28,
              }}
            >
              <span
                className="slide-num shrink-0"
                style={{ color: "var(--s-jade)", fontSize: 44, width: 72 }}
              >
                {s.n}
              </span>
              <div className="min-w-0">
                <Pill tone="mint">{s.tag}</Pill>
                <p
                  className="slide-subtitle"
                  style={{ color: "var(--s-forest)", fontSize: 30, marginTop: 8 }}
                >
                  {s.title}
                </p>
                <p className="slide-caption" style={{ color: "var(--s-ink)", marginTop: 6 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Panel title="Prasyarat sebelum dipakai" tone="mint">
          <BulletList>
            <Bullet tone="flag">Validasi eksternal pada kohort pusat lain</Bullet>
            <Bullet tone="flag">Validasi prospektif di alur kerja IGD nyata</Bullet>
            <Bullet>Protokol tindak lanjut yang jelas untuk tiap tingkat risiko</Bullet>
            <Bullet>Pelatihan staf agar skor dibaca sebagai probabilitas, bukan vonis</Bullet>
            <Bullet tone="jade">Audit berkala terhadap kalibrasi dan pergeseran populasi</Bullet>
          </BulletList>
        </Panel>
      </div>
    </ContentSlide>
  );
}
