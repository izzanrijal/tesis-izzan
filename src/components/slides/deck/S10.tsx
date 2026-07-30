import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { CalibrationChart, DcaChart, PrChart } from "../charts";

function ChartCard({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col" style={{ background: "var(--s-panel)", padding: "22px 24px" }}>
      <p className="slide-body" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
        {title}
      </p>
      <div style={{ marginTop: 6 }}>{children}</div>
      <p className="slide-caption" style={{ color: "var(--s-slate)", marginTop: 4 }}>
        {note}
      </p>
    </div>
  );
}

export function S10() {
  return (
    <ContentSlide
      index={10}
      section="Performa"
      band={BANDS.data}
      title="Kalibrasi mendekati ideal dan manfaat klinis positif pada rentang keputusan nyata"
      metaTitle="Kalibrasi, decision curve, dan precision–recall"
      basis="Basis: prevalensi luaran 7,5%; kurva DCA dan PR diturunkan dari AUC dan prevalensi terlapor; kurva kalibrasi bersifat rekonstruksi ilustratif"
      source="Gambar 3.6 (kalibrasi), Gambar 3.7 (DCA), Gambar 3.8 (kurva PR)"
      callout={
        <Callout label="Kesimpulan kegunaan:">
          Net benefit positif pada ambang <strong>0,02 – 0,40</strong> — keputusan berpanduan model
          lebih baik daripada strategi <em>treat all</em> maupun <em>treat none</em>.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 26 }}>
        <ChartCard
          title="Kurva kalibrasi"
          note="Mengikuti diagonal ideal, terutama pada rentang probabilitas rendah–sedang. Brier 0,061."
        >
          <CalibrationChart width={490} height={400} />
        </ChartCard>
        <ChartCard
          title="Decision Curve Analysis"
          note="Garis tebal = model; putus-putus = treat all; garis datar = treat none."
        >
          <DcaChart width={490} height={400} auc={0.819} prevalence={0.075} />
        </ChartCard>
        <ChartCard
          title="Kurva Precision–Recall"
          note="AUPRC 0,301 — empat kali lipat baseline prevalensi 0,075 (garis merah)."
        >
          <PrChart width={490} height={400} auc={0.819} prevalence={0.075} />
        </ChartCard>
      </div>
    </ContentSlide>
  );
}
