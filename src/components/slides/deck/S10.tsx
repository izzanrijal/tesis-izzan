import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";

export function S10() {
  return (
    <ContentSlide
      section="Performa"
      band={BANDS.data}
      title="Kalibrasi mendekati ideal dan manfaat klinis positif pada rentang keputusan nyata"
      metaTitle="Kalibrasi, decision curve, dan precision–recall"
      basis="Basis: gambar asli hasil analisis pada prediksi out-of-fold mentah, tanpa koreksi Platt scaling"
      source="Gambar 3.6 (kalibrasi), Gambar 3.7 (DCA), Gambar 3.8 (kurva PR)"
      callout={
        <Callout label="Kesimpulan kegunaan:">
          Net benefit positif pada ambang <strong>0,02 – 0,40</strong> — keputusan berpanduan
          model lebih baik daripada strategi <em>treat all</em> maupun <em>treat none</em>.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 26 }}>
        <FigureBox
          src={FIGS.calibration}
          alt="Kurva kalibrasi model Random Forest"
          caption="Kalibrasi baik pada rentang probabilitas rendah–sedang; Brier 0,061."
        />
        <FigureBox
          src={FIGS.dca}
          alt="Decision curve analysis model Random Forest"
          caption="Net benefit model melampaui treat all dan treat none pada ambang 0,02–0,40."
        />
        <FigureBox
          src={FIGS.pr}
          alt="Kurva precision-recall model Random Forest"
          caption="AUPRC 0,301 — empat kali baseline prevalensi 0,075."
        />
      </div>
    </ContentSlide>
  );
}
