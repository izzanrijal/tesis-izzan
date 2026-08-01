import { BANDS, FIGS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { FigureBox } from "../figure";
import { DataTable } from "../ui";

export function S16() {
  return (
    <ContentSlide
      section="Perbandingan"
      band={BANDS.echo}
      title="Tiga luaran: mortalitas paling dapat diprediksi, syok kardiogenik paling sulit"
      metaTitle="Performa model untuk berbagai luaran"
      basis="Basis: model yang sama dilatih ulang untuk tiap luaran pada kohort 1.524 pasien"
      source="Tabel 3.5, Tabel 4.1, dan Gambar 3.15 — Perbandingan kurva ROC berbagai luaran"
      callout={
        <Callout label="Mengapa berbeda:">
          Syok kardiogenik adalah luaran <strong>dinamis</strong> yang dipengaruhi intervensi dan
          pencatatan retrospektif; mortalitas lebih tegas didefinisikan sehingga lebih mudah
          diprediksi.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 780px", gap: 40 }}>
        <FigureBox src={FIGS.roc3} alt="Kurva ROC untuk tiga luaran" />

        <div className="flex min-w-0 flex-col justify-center">
          <DataTable
            head={["Luaran", "AUC ± SD", "IK 95%", "AUPRC", "Prevalensi", "3 fitur teratas"]}
            rows={[
              [
                "Mortalitas",
                "0,819 ± 0,007",
                "0,805–0,833",
                "0,301",
                "7,5%",
                "eGFR, ureum, LVOT VTI",
              ],
              [
                "Syok kardiogenik baru",
                "0,747 ± 0,005",
                "0,736–0,757",
                "0,500",
                "11,2%",
                "LVOT VTI, SBP, APTT",
              ],
              [
                "Komposit",
                "0,769 ± 0,004",
                "0,761–0,777",
                "0,635",
                "12,9%",
                "LVOT VTI, SBP, eGFR",
              ],
            ]}
            highlightCol={1}
          />
          <p className="slide-caption" style={{ color: "var(--s-slate)", marginTop: 16 }}>
            Dari 1.524 subjek: 115 kematian, 171 kejadian syok kardiogenik baru, dan 197 kejadian
            komposit. Analisis luaran sekunder bersifat eksploratif.
          </p>
        </div>
      </div>
    </ContentSlide>
  );
}
