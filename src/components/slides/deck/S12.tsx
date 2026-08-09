import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";
import { Bullet, BulletList, Panel } from "../ui";

export function S12() {
  return (
    <ContentSlide
      section="Interpretasi"
      band={BANDS.data}
      title="Waterfall: satu prediksi dipecah menjadi kontribusi aditif per fitur"
      metaTitle="SHAP tingkat individu — pasien risiko tinggi (p = 87,2%)"
      basis="Basis: nilai SHAP TreeExplainer pada model final; contoh satu pasien dengan probabilitas prediksi 87,2%"
      source="Gambar 3.13 — SHAP waterfall pasien risiko tinggi"
      callout={
        <Callout label="Nilai tambahnya:">
          Dekomposisi per pasien memungkinkan{" "}
          <strong>penjelasan risiko yang dipersonalisasi</strong> — klinisi melihat variabel mana
          yang mendorong angka tersebut, bukan sekadar skor akhir.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 560px", gap: 44 }}>
        <FigureBox
          src={FIGS.shapWaterfall}
          alt="Diagram waterfall SHAP untuk satu pasien risiko tinggi"
          caption="Gambar 3.13 Dekomposisi SHAP pada pasien dengan probabilitas prediksi 87,2%"
        />

        <div className="flex min-w-0 flex-col" style={{ gap: 20 }}>
          <div
            className="flex items-center justify-between"
            style={{ background: "var(--s-mint)", padding: "18px 26px" }}
          >
            <span className="slide-body" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
              Probabilitas prediksi akhir
            </span>
            <span className="slide-num" style={{ color: "var(--s-forest)", fontSize: 46 }}>
              87,2%
            </span>
          </div>

          <Panel title="Cara membaca" subtitle="Dari nilai dasar menuju prediksi akhir">
            <BulletList>
              <Bullet>
                Prediksi dimulai dari <strong>nilai dasar</strong> (rerata risiko kohort), lalu tiap
                fitur menambah atau mengurangi risiko.
              </Bullet>
              <Bullet>
                Pada pasien ini kontribusi terbesar berasal dari <strong>eGFR dan ureum</strong>,
                diikuti APTT dan parameter hemodinamik.
              </Bullet>
              <Bullet tone="jade">
                Jumlah seluruh kontribusi tepat sama dengan selisih prediksi terhadap nilai dasar —
                sifat aditif inilah keunggulan SHAP.
              </Bullet>
              <Bullet tone="flag">
                Kontribusi bersifat asosiatif, bukan kausal; tidak berarti mengubah satu variabel
                akan menurunkan risiko sebesar itu.
              </Bullet>
            </BulletList>
          </Panel>
        </div>
      </div>
    </ContentSlide>
  );
}
