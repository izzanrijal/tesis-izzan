import { ContentSlide } from "../chrome";
import { BANDS } from "@/lib/deck-data";
import { NumberedItem, Panel, Bullet, BulletList } from "../ui";

export function SRumusanTujuan() {
  return (
    <ContentSlide
      section="Konteks"
      band={BANDS.clinic}
      title="Rumusan masalah & tujuan penelitian"
      metaTitle="Rumusan masalah dan tujuan"
      basis="BAB I — Pendahuluan, subbab 1.2 dan 1.3"
      source="Naskah tesis, BAB I"
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 1fr", gap: 44 }}>
        <div className="flex min-h-0 flex-col" style={{ gap: 26 }}>
          <p className="slide-kicker" style={{ color: "var(--s-jade)" }}>
            Rumusan masalah
          </p>
          <NumberedItem n="01" title="Prediktor mana yang signifikan?">
            Variabel klinis, elektrokardiografi, laboratorium, dan ekokardiografi apa pada saat
            admisi IGD yang berperan signifikan sebagai prediktor mortalitas in-hospital pada
            pasien STEMI dan NSTEMI?
          </NumberedItem>
          <NumberedItem n="02" title="Sebaik apa performa modelnya?">
            Bagaimana akurasi, diskriminasi, dan kalibrasi model prediksi berbasis Random Forest
            dalam mengidentifikasi risiko mortalitas in-hospital pada populasi penelitian?
          </NumberedItem>
        </div>

        <Panel title="Tujuan penelitian" tone="mint">
          <div className="flex h-full min-h-0 flex-col" style={{ gap: 20 }}>
            <div style={{ borderLeft: "8px solid var(--s-forest)", paddingLeft: 22 }}>
              <p className="slide-caption" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
                TUJUAN UMUM
              </p>
              <p className="slide-body" style={{ color: "var(--s-ink)", marginTop: 6 }}>
                Mengembangkan dan memvalidasi model prediksi dini mortalitas in-hospital berbasis
                Random Forest pada pasien STEMI dan NSTEMI di IGD PJT RSUP Dr. Wahidin
                Sudirohusodo.
              </p>
            </div>
            <p className="slide-caption" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
              TUJUAN KHUSUS
            </p>
            <BulletList>
              <Bullet>Mengidentifikasi variabel signifikan saat admisi IGD sebagai prediktor mortalitas.</Bullet>
              <Bullet>Membangun model Random Forest berdasarkan variabel terpilih.</Bullet>
              <Bullet>
                Mengevaluasi akurasi, diskriminasi, dan kalibrasi serta membandingkannya dengan
                XGBoost pada validasi internal.
              </Bullet>
            </BulletList>
          </div>
        </Panel>
      </div>
    </ContentSlide>
  );
}
