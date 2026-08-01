import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";
import { Bullet, BulletList } from "../ui";

export function SKerangkaTeori() {
  return (
    <ContentSlide
      section="Konteks"
      band={BANDS.clinic}
      title="Kerangka teori: dari oklusi koroner hingga mortalitas in-hospital"
      metaTitle="Kerangka teori penelitian"
      basis="Basis: kerangka teori tesis — jalur patofisiologi SKA dan titik masuk prediksi berbasis data admisi"
      source="Kerangka teori tesis (Bab II)"
      callout={
        <Callout label="Poin kunci:">
          Semua jalur patofisiologi bermuara pada <strong>hipoperfusi organ</strong>; parameter
          ginjal, hemodinamik, dan ekokardiografi merekam jalur itu lebih awal daripada tanda
          klinis syok.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 430px", gap: 40 }}>
        <FigureBox src={FIGS.teori} alt="Diagram kerangka teori penelitian" pad={18} />
        <div className="flex min-w-0 flex-col justify-center">
          <p className="slide-subtitle" style={{ color: "var(--s-forest)" }}>
            Alur penalaran
          </p>
          <ul className="flex flex-col gap-[16px]" style={{ marginTop: 20 }}>
            <Bullet>
              Oklusi koroner menimbulkan iskemia miokard dan penurunan volume sekuncup.
            </Bullet>
            <Bullet>
              Penurunan curah jantung menurunkan perfusi ginjal — terekam sebagai eGFR rendah
              dan ureum tinggi saat admisi.
            </Bullet>
            <Bullet>
              Aktivasi neurohormonal dan respons inflamasi memperberat kongesti serta gangguan
              elektrolit.
            </Bullet>
            <Bullet tone="flag">
              Syok kardiogenik dan mortalitas adalah tahap akhir — model bertugas mengenali
              lintasan ini sebelum manifestasi klinis.
            </Bullet>
          </ul>
        </div>
      </div>
    </ContentSlide>
  );
}

export function SKerangkaKonsep() {
  return (
    <ContentSlide
      section="Konteks"
      band={BANDS.data}
      title="Kerangka konsep: 13 variabel admisi sebagai masukan model prediksi"
      metaTitle="Kerangka konsep penelitian"
      basis="Basis: kerangka konsep tesis — variabel bebas, variabel antara, dan luaran yang diprediksi"
      source="Kerangka konsep tesis (Bab II)"
      callout={
        <Callout label="Hipotesis kerja:">
          Kombinasi variabel klinis, laboratorium, dan ekokardiografi yang tersedia dalam 24 jam
          pertama dapat memprediksi mortalitas in-hospital dengan diskriminasi yang lebih baik
          daripada skor risiko konvensional.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 430px", gap: 40 }}>
        <FigureBox src={FIGS.konsep} alt="Diagram kerangka konsep penelitian" pad={18} />
        <div className="flex min-w-0 flex-col justify-center">
          <p className="slide-subtitle" style={{ color: "var(--s-forest)" }}>
            Struktur konsep
          </p>
          <BulletList>
            <Bullet>
              <strong>Variabel bebas:</strong> demografi, tanda vital, Killip, laboratorium, dan
              parameter ekokardiografi saat admisi.
            </Bullet>
            <Bullet>
              <strong>Pemroses:</strong> Random Forest 500 pohon, kedalaman maksimum 6, validasi
              silang 5-fold × 10 seed.
            </Bullet>
            <Bullet>
              <strong>Luaran utama:</strong> mortalitas in-hospital; luaran sekunder: syok
              kardiogenik baru dan komposit.
            </Bullet>
            <Bullet tone="jade">
              <strong>Keluaran terapan:</strong> probabilitas individual, ambang keputusan, dan
              strata triase.
            </Bullet>
          </BulletList>
        </div>
      </div>
    </ContentSlide>
  );
}
