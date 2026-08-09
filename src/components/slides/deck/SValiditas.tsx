import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";

const PANELS: [string, string, string][] = [
  [
    "Prediksi out-of-fold",
    "1.524 pasien",
    "Setiap prediksi dibuat oleh model yang belum pernah melihat pasien tersebut. Imputasi median dihitung ulang pada tiap lipatan pelatihan sehingga tidak ada kebocoran data.",
  ],
  [
    "Stabilitas antar-seed",
    "0,8157 ± 0,0075",
    "AUC pada sepuluh seed berkisar 0,8024 hingga 0,8247. Simpangan baku yang kecil menunjukkan performa tidak bergantung pada satu pembagian lipatan tertentu.",
  ],
  [
    "Tidak over-parameterized",
    "Plato pada k = 10",
    "AUC naik dari 0,649 (k=1) ke 0,808 (k=7), lalu mendatar pada 0,812–0,816 untuk k=10–13. Rasio kejadian per variabel (EPV) 8,8 dengan pembatasan kedalaman pohon.",
  ],
  [
    "Kalibrasi baik",
    "Brier 0,061",
    "Probabilitas yang dihasilkan mendekati frekuensi kejadian teramati, sehingga angka risiko dapat dipakai untuk keputusan triase, bukan sekadar peringkat.",
  ],
];

export function SValiditas() {
  return (
    <ContentSlide
      section="Performa"
      band={BANDS.data}
      title="Mengapa model ini valid"
      metaTitle="Bukti validitas: out-of-fold, stabilitas, kompleksitas, kalibrasi"
      basis="Basis: seluruh bukti berasal dari validasi internal pada kohort yang sama (N=1.524, 115 kejadian)"
      source="Bab III — Hasil validasi internal model"
      callout={
        <Callout label="Batasnya:" tone="flag">
          Seluruh bukti di atas adalah <strong>validasi internal</strong>. Validasi eksternal pada
          kohort dari pusat dan periode berbeda belum dilakukan dan direncanakan sebagai langkah
          berikutnya.
        </Callout>
      }
    >
      <div
        className="grid h-full min-h-0"
        style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 26 }}
      >
        {PANELS.map(([judul, angka, isi], i) => (
          <div
            key={judul}
            className="flex min-w-0 flex-col"
            style={{
              background: i % 3 === 0 ? "var(--s-mint-soft)" : "var(--s-panel)",
              borderTop: "6px solid var(--s-jade)",
              padding: "22px 28px",
            }}
          >
            <p className="slide-caption" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
              {String(i + 1).padStart(2, "0")} · {judul}
            </p>
            <p
              className="slide-num"
              style={{ color: "var(--s-forest)", fontSize: 46, marginTop: 6, lineHeight: 1.1 }}
            >
              {angka}
            </p>
            <p className="slide-body" style={{ color: "var(--s-ink)", marginTop: 10 }}>
              {isi}
            </p>
          </div>
        ))}
      </div>
    </ContentSlide>
  );
}
