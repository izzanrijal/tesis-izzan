import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { Panel } from "../ui";

const DONE = [
  "Alur partisipan jelas dan dapat ditelusuri (Gambar 2.3)",
  "Definisi prediktor dan luaran bersifat operasional (Tabel 2.1)",
  "Imputasi median, 10 seed validasi silang, prediksi out-of-fold",
  "Metrik lengkap: AUC, AUPRC, Brier, kalibrasi, decision curve",
  "Pembahasan keterbatasan terbuka dan eksplisit",
];

const TODO = [
  "Validasi eksternal belum dilakukan",
  "Analisis sensitivitas mekanisme data hilang belum menyeluruh",
  "Analisis kewajaran (fairness) per subkelompok direncanakan",
];

function Item({ text, ok }: { text: string; ok: boolean }) {
  return (
    <li className="slide-body flex" style={{ color: "var(--s-ink)", gap: 18 }}>
      <span
        className="shrink-0 slide-num"
        style={{
          width: 40,
          height: 40,
          background: ok ? "var(--s-forest)" : "#fbe6ee",
          color: ok ? "#ffffff" : "var(--s-flag)",
          border: ok ? "none" : "2px solid var(--s-flag)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}
      >
        {ok ? "✓" : "✕"}
      </span>
      <span className="min-w-0">{text}</span>
    </li>
  );
}

export function S19() {
  return (
    <ContentSlide
      index={19}
      section="Penutup"
      band={BANDS.data}
      title="Kepatuhan TRIPOD+AI: mayoritas item terpenuhi, tiga celah tersisa"
      metaTitle="Peta pelaporan terhadap 27 item TRIPOD+AI"
      basis="Basis: pedoman TRIPOD+AI (Collins dkk., 2024) sebagai standar pelaporan model prediksi berbasis AI"
      source="Lampiran — Peta Pelaporan TRIPOD+AI; Collins dkk. (2024) BMJ"
      callout={
        <Callout label="Posisi laporan:">
          Pelaporan sudah memenuhi standar untuk <strong>publikasi pengembangan model</strong>;
          celah yang tersisa seluruhnya berkaitan dengan tahap validasi lanjutan.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 1fr", gap: 52 }}>
        <Panel title="Sudah dipenuhi" subtitle="Item inti pengembangan model">
          <ul className="flex flex-col" style={{ gap: 20 }}>
            {DONE.map((t) => (
              <Item key={t} text={t} ok />
            ))}
          </ul>
        </Panel>
        <Panel title="Belum dipenuhi" subtitle="Menjadi agenda penelitian lanjutan" tone="mint">
          <ul className="flex flex-col" style={{ gap: 20 }}>
            {TODO.map((t) => (
              <Item key={t} text={t} ok={false} />
            ))}
          </ul>
        </Panel>
      </div>
    </ContentSlide>
  );
}
