import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";

const POIN: [string, string][] = [
  ["Desain retrospektif, pusat tunggal", "Satu pusat jantung di Indonesia Timur; generalisabilitas perlu diuji eksternal."],
  ["Ukuran sampel moderat", "1.524 pasien dengan 115 kejadian — memadai untuk 13 fitur, tetapi presisi estimasi terbatas."],
  ["Data hilang", "Imputasi dipakai; TAPSE dan LVOT VTI paling rawan karena bergantung ketersediaan ekokardiografi."],
  ["Tanpa validasi eksternal", "Hanya validasi internal; kohort independen dari pusat dan periode berbeda diperlukan."],
  ["Prediksi statis satu waktu", "Hanya data 24 jam pertama; perubahan status klinis selama perawatan tidak diperhitungkan."],
  ["Variabel tidak tercatat", "Laktat, pH darah, LDH, IL-6, dan prokalsitonin tidak tersedia rutin."],
  ["Definisi luaran SKG retrospektif", "Diagnosis dari dokumentasi rekam medis, berpotensi tidak seragam antar dokter."],
  ["Paradoks efek terapi", "Pasien risiko tinggi menerima tata laksana lebih agresif sehingga luaran aktual berubah."],
  ["Ketidakseimbangan kelas", "Mortalitas 7,5% membuat data tidak seimbang; AUPRC hanya memitigasi sebagian."],
  ["Interpretabilitas terbatas", "Ensemble 500 pohon sulit dijelaskan per individu; SHAP membantu tetapi tidak kausal."],
];

export function S18() {
  return (
    <ContentSlide
      section="Pembahasan"
      band={BANDS.clinic}
      title="Sepuluh keterbatasan yang harus diakui sebelum model dipakai"
      metaTitle="Pembahasan 4.10 — keterbatasan penelitian"
      basis="Basis: seluruh sepuluh butir keterbatasan sebagaimana dinyatakan pada Bab IV.10"
      source="Bab IV.10 Keterbatasan Penelitian"
      callout={
        <Callout label="Konsekuensi:" tone="flag">
          Kombinasi desain retrospektif, pusat tunggal, dan tidak adanya validasi eksternal
          menjadikan model ini <strong>alat riset</strong>, belum alat keputusan klinis rutin.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {[POIN.slice(0, 5), POIN.slice(5)].map((kolom, ki) => (
          <div key={ki} className="flex min-w-0 flex-col" style={{ gap: 12 }}>
            {kolom.map(([judul, isi], i) => (
              <div
                key={judul}
                className="flex min-w-0 gap-4"
                style={{
                  background: "var(--s-panel)",
                  borderLeft: "6px solid var(--s-jade)",
                  padding: "10px 16px",
                }}
              >
                <span
                  className="slide-num shrink-0"
                  style={{ color: "var(--s-jade)", fontSize: 26, width: 38, lineHeight: 1.2 }}
                >
                  {String(ki * 5 + i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p style={{ fontSize: 22, fontWeight: 700, color: "var(--s-forest)", lineHeight: 1.2 }}>
                    {judul}
                  </p>
                  <p style={{ fontSize: 19, color: "var(--s-ink)", lineHeight: 1.3, marginTop: 3 }}>
                    {isi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </ContentSlide>
  );
}
