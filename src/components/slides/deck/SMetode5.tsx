import { ContentSlide } from "../chrome";
import { BANDS } from "@/lib/deck-data";
import { Panel, Bullet, BulletList } from "../ui";

const STEPS = [
  ["01", "Penapisan", "Identifikasi seluruh admisi STEMI dan NSTEMI dari rekam medis elektronik periode 2024–2025."],
  ["02", "Ekstraksi", "Penarikan variabel klinis, laboratorium, dan ekokardiografi saat admisi IGD ke basis data penelitian."],
  ["03", "Anonimisasi", "Penghapusan identitas pribadi, penggantian dengan kode subjek sebelum analisis."],
];

export function SMetode5() {
  return (
    <ContentSlide
      section="Metode"
      band={BANDS.data}
      title="Prosedur pengumpulan data dan etika penelitian"
      metaTitle="Prosedur dan etika"
      basis="BAB II — Metode penelitian"
      source="Naskah tesis, BAB II"
    >
      <div className="flex h-full min-h-0 flex-col" style={{ gap: 30 }}>
        <div className="grid shrink-0" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {STEPS.map(([n, t, d]) => (
            <div key={n} style={{ background: "var(--s-panel)", padding: "24px 26px", borderTop: "8px solid var(--s-forest)" }}>
              <p className="slide-num" style={{ color: "var(--s-jade)", fontSize: 40, lineHeight: 1 }}>
                {n}
              </p>
              <p className="slide-body-lg" style={{ color: "var(--s-forest)", fontWeight: 700, marginTop: 10 }}>
                {t}
              </p>
              <p className="slide-caption" style={{ color: "var(--s-ink)", marginTop: 8 }}>
                {d}
              </p>
            </div>
          ))}
        </div>

        <Panel title="Aspek etik" tone="mint">
          <BulletList>
            <Bullet>
              Penelitian memperoleh persetujuan Komisi Etik Penelitian Kesehatan Fakultas
              Kedokteran Universitas Hasanuddin (No. 890/UN4.6.4.5.31/PP36/2026).
            </Bullet>
            <Bullet>
              Data bersifat sekunder dan dianalisis dalam bentuk anonim; tidak ada intervensi
              terhadap pasien dan mematuhi prinsip Deklarasi Helsinki serta regulasi lokal.
            </Bullet>
            <Bullet>
              Kerahasiaan dijaga: akses basis data terbatas pada tim peneliti dan hanya digunakan
              untuk tujuan penelitian ini.
            </Bullet>
          </BulletList>
        </Panel>
      </div>
    </ContentSlide>
  );
}
