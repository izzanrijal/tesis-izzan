import type { ReactNode } from "react";
import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { Bullet, BulletList, DataTable, MetricBox } from "../ui";

/* Kerangka dua kolom yang dipakai seluruh slide pembahasan. */
function Pembahasan({
  band,
  title,
  metaTitle,
  basis,
  source,
  callout,
  left,
  right,
  leftTitle,
  rightTitle,
  cols = "1fr 700px",
}: {
  band: string;
  title: string;
  metaTitle: string;
  basis: string;
  source: string;
  callout: ReactNode;
  left: ReactNode;
  right: ReactNode;
  leftTitle: string;
  rightTitle: string;
  cols?: string;
}) {
  return (
    <ContentSlide
      section="Pembahasan"
      band={band}
      title={title}
      metaTitle={metaTitle}
      basis={basis}
      source={source}
      callout={<Callout label="Intinya:">{callout}</Callout>}
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: cols, gap: 44 }}>
        <div className="flex min-w-0 flex-col">
          <p className="slide-subtitle" style={{ color: "var(--s-forest)", fontSize: 32 }}>
            {leftTitle}
          </p>
          <div style={{ marginTop: 16 }}>{left}</div>
        </div>
        <div
          className="flex min-w-0 flex-col"
          style={{ background: "var(--s-panel)", padding: "22px 28px" }}
        >
          <p className="slide-subtitle" style={{ color: "var(--s-forest)", fontSize: 32 }}>
            {rightTitle}
          </p>
          <div className="min-h-0 flex-1" style={{ marginTop: 16 }}>
            {right}
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}

/* 4.1 */
export function P41() {
  return (
    <Pembahasan
      band={BANDS.data}
      title="Performa model dalam konteks literatur prediksi SKA"
      metaTitle="Pembahasan 4.1 — performa model Random Forest"
      basis="Basis: validasi internal 5-fold × 10 seed; pembanding dari literatur yang dikutip pada Bab IV"
      source="Bab IV.1 Performa Model Random Forest dalam Prediksi Mortalitas"
      leftTitle="Apa yang dicapai"
      left={
        <BulletList>
          <Bullet>
            Rerata AUC antar-seed 0,8157 ± 0,0075 (IK 95% 0,8110–0,8204); AUC vektor OOF rerata
            0,8189.
          </Bullet>
          <Bullet>
            Ambang Youden 0,103981: sensitivitas 71,3%, spesifisitas 82,0%, PPV 24,4%, NPV 97,2%.
          </Bullet>
          <Bullet>
            Ambang safety 0,018455: sensitivitas 98,3%, spesifisitas 26,2%, dua negatif palsu.
          </Bullet>
          <Bullet tone="flag">
            Brier 0,061 menilai akurasi probabilitas keseluruhan, tetapi{" "}
            <strong>tidak menggantikan</strong> calibration-in-the-large dan calibration slope
            yang belum dilaporkan.
          </Bullet>
        </BulletList>
      }
      rightTitle="Posisi terhadap studi lain"
      right={
        <div className="flex h-full flex-col justify-between">
          <DataTable
            head={["Studi", "Model", "Luaran", "AUC"]}
            rows={[
              ["Penelitian ini", "Random Forest", "Mortalitas in-hospital", "0,819"],
              ["Chang dkk. (2022), Korea", "Random Forest", "Syok kardiogenik", "0,784"],
              ["Jajcay dkk. (2023), Eropa", "Gradient boosting", "Syok kardiogenik", "0,795"],
            ]}
            highlightCol={3}
          />
          <p className="slide-caption" style={{ color: "var(--s-slate)" }}>
            Perbedaan dapat berasal dari karakteristik populasi, jumlah dan jenis fitur, serta
            definisi luaran yang tidak identik — perbandingan bersifat deskriptif.
          </p>
        </div>
      }
      callout={
        <>
          Variasi antar-seed menunjukkan estimasi performa masih bergantung pada resampling;{" "}
          <strong>validasi eksternal diperlukan</strong> untuk menilai transportabilitas.
        </>
      }
    />
  );
}

/* 4.2 */
export function P42() {
  return (
    <Pembahasan
      band={BANDS.data}
      title="Mengapa Random Forest dipilih sebagai model utama"
      metaTitle="Pembahasan 4.2 — Random Forest vs XGBoost"
      basis="Basis: analisis sekunder pada set data yang sama, tanpa validasi silang tersarang"
      source="Bab IV.2 Random Forest vs XGBoost: Implikasi Pemilihan Algoritma"
      leftTitle="Argumen pemilihan"
      left={
        <BulletList>
          <Bullet>
            Rerata AUC Random Forest 0,816 dibandingkan XGBoost 0,789 pada data yang sama.
          </Bullet>
          <Bullet>
            Ukuran data sedang (1.524 pasien, 115 kematian) mendukung model yang relatif hemat
            parameter.
          </Bullet>
          <Bullet>
            Random Forest menangkap interaksi tanpa transformasi eksplisit dan lebih stabil pada
            data tidak seimbang.
          </Bullet>
        </BulletList>
      }
      rightTitle="Kehati-hatian tafsir"
      right={
        <BulletList>
          <Bullet tone="flag">
            Perbandingan bersifat internal dan tidak membuktikan keunggulan umum Random Forest
            pada populasi lain.
          </Bullet>
          <Bullet tone="flag">
            Tanpa validasi silang tersarang, selisih performa dapat dipengaruhi ruang
            hiperparameter dan prosedur penalaan.
          </Bullet>
          <Bullet>
            Christodoulou dkk. (2019): machine learning tidak selalu mengungguli regresi logistik;
            keunggulan sangat bergantung karakteristik set data.
          </Bullet>
        </BulletList>
      }
      callout={
        <>
          Pemilihan Random Forest adalah keputusan <strong>berbasis bukti empiris pada kohort
          ini</strong>, bukan klaim superioritas algoritma secara umum.
        </>
      }
    />
  );
}

/* 4.3 */
export function P43() {
  return (
    <Pembahasan
      band={BANDS.echo}
      title="Dominasi fungsi ginjal sebagai cermin perfusi organ sistemik"
      metaTitle="Pembahasan 4.3 — dominasi parameter fungsi ginjal"
      basis="Basis: peringkat Gini importance dan penalaran patofisiologi yang dirujuk pada Bab IV"
      source="Bab IV.3 Dominasi Parameter Fungsi Ginjal sebagai Prediktor"
      leftTitle="Tiga mekanisme patofisiologi"
      left={
        <BulletList>
          <Bullet>
            Hipoperfusi renal akibat penurunan curah jantung yang sudah terjadi{" "}
            <strong>sebelum syok manifes</strong>.
          </Bullet>
          <Bullet>Penyakit ginjal kronik pre-eksisting yang memperberat prognosis.</Bullet>
          <Bullet>
            Aktivasi neurohormonal yang intens (Ghionzoli dkk., 2021).
          </Bullet>
          <Bullet tone="jade">
            eGFR memperhitungkan usia dan jenis kelamin sehingga lebih granular daripada kreatinin
            tunggal; ureum sensitif terhadap hipoperfusi prerenal.
          </Bullet>
        </BulletList>
      }
      rightTitle="LVOT VTI: informasi yang unik"
      right={
        <div className="flex h-full flex-col justify-between">
          <BulletList>
            <Bullet>
              LVOT VTI mencerminkan volume sekuncup secara langsung — lebih hemodinamik daripada
              LVEF yang dipengaruhi preload, afterload, dan kontraktilitas.
            </Bullet>
            <Bullet>
              Informasinya tidak dapat digantikan parameter klinis atau laboratorium mana pun.
            </Bullet>
          </BulletList>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <MetricBox label="eGFR" value="0,152" sub="Gini peringkat 1" tone="mint" />
            <MetricBox label="Ureum" value="0,131" sub="peringkat 2" />
            <MetricBox label="LVOT VTI" value="0,099" sub="peringkat 3" />
          </div>
        </div>
      }
      callout={
        <>
          Temuan ini mendukung <strong>ekokardiografi dini di IGD</strong> — bukan hanya untuk
          LVEF, tetapi juga untuk mengukur LVOT VTI.
        </>
      }
    />
  );
}

/* 4.4 */
export function P44() {
  return (
    <Pembahasan
      band={BANDS.clinic}
      title="Implikasi klinis sistem triase bertingkat"
      metaTitle="Pembahasan 4.4 — implikasi klinis triase bertingkat"
      basis="Basis: strata risiko dari prediksi out-of-fold kohort yang sama"
      source="Bab IV.4 Implikasi Klinis Sistem Triase Bertingkat"
      leftTitle="Distribusi tiga strata"
      left={
        <DataTable
          head={["Strata", "Ambang", "n", "Kematian", "Angka"]}
          rows={[
            ["Rendah / Ward", "< 0,018455", "371", "2", "0,5%"],
            ["Sedang / HCU", "0,018455 – <0,103981", "817", "31", "3,8%"],
            ["Tinggi / ICU", "≥ 0,103981", "336", "82", "24,4%"],
          ]}
          highlightCol={4}
        />
      }
      rightTitle="Yang boleh dan tidak boleh disimpulkan"
      right={
        <BulletList>
          <Bullet>
            NPV pada ambang risiko rendah 99,5% — berguna untuk menenangkan keputusan de-eskalasi.
          </Bullet>
          <Bullet tone="flag">
            Kelompok risiko rendah <strong>tidak dapat disebut aman</strong> untuk ward
            berdasarkan validasi internal saja.
          </Bullet>
          <Bullet tone="flag">
            Nama ward, HCU, dan ICU adalah usulan strata, bukan rekomendasi penempatan otomatis.
          </Bullet>
          <Bullet>
            Manfaat praktis: alokasi sumber daya IGD dan ruang rawat menjadi terukur, bukan
            berdasarkan kesan klinis semata.
          </Bullet>
        </BulletList>
      }
      callout={
        <>
          Gradien risiko <strong>0,5% → 3,8% → 24,4%</strong> memberi bahasa risiko yang sama bagi
          seluruh tim IGD, dengan syarat validasi prospektif.
        </>
      }
    />
  );
}

/* 4.5 */
export function P45() {
  return (
    <Pembahasan
      band={BANDS.clinic}
      title="GRACE pada populasi Asia dan Indonesia cenderung berperforma lebih rendah"
      metaTitle="Pembahasan 4.5 — perbandingan dengan studi validasi GRACE"
      basis="Basis: studi validasi GRACE yang dikutip pada Bab IV dan perhitungan GRACE 2.0 pada kohort ini"
      source="Bab IV.5 Perbandingan dengan Studi Validasi GRACE di Asia dan Indonesia"
      leftTitle="AUC GRACE di berbagai populasi"
      left={
        <div>
          <DataTable
            head={["Studi", "Populasi", "Luaran", "AUC"]}
            rows={[
              ["Zhao dkk. (2019)", "Tiongkok, STEMI", "Mortalitas in-hospital", "0,760"],
              ["Rao dkk. (2020)", "India, SKA", "Mortalitas", "0,771"],
              ["Pandey & Winata (2021)", "Jakarta, STEMI", "Mortalitas 30 hari", "0,745"],
              ["Kohort ini — GRACE 2.0", "Makassar, SKA", "Mortalitas in-hospital", "0,777"],
              ["Kohort ini — Random Forest", "Makassar, SKA", "Mortalitas in-hospital", "0,819"],
            ]}
            highlightCol={3}
          />
        </div>
      }
      rightTitle="Bacaan atas pola ini"
      right={
        <BulletList>
          <Bullet>
            Akurasi GRACE pada populasi Asia Tenggara cenderung lebih rendah daripada populasi
            asal pengembangan skor (Eropa dan Amerika Utara).
          </Bullet>
          <Bullet>
            Hal ini menegaskan pentingnya model prediksi yang{" "}
            <strong>spesifik untuk populasi lokal</strong>.
          </Bullet>
          <Bullet tone="flag">
            Model ini memakai 13 fitur berbanding 8 variabel GRACE, termasuk parameter
            ekokardiografi yang tidak tersedia di semua fasilitas — perbandingan tidak sepenuhnya
            setara.
          </Bullet>
        </BulletList>
      }
      callout={
        <>
          Pada populasi yang sama, selisih AUC <strong>0,042</strong> (p=0,029) memberi bukti
          langsung, bukan sekadar perbandingan lintas-studi.
        </>
      }
    />
  );
}

/* 4.6 */
export function P46() {
  return (
    <Pembahasan
      band={BANDS.data}
      title="Posisi terhadap studi machine learning lain pada SKA"
      metaTitle="Pembahasan 4.6 — perbandingan dengan studi machine learning lainnya"
      basis="Basis: studi machine learning yang dikutip pada Bab IV"
      source="Bab IV.6 Perbandingan dengan Studi Machine Learning Lainnya"
      leftTitle="Pembanding utama"
      left={
        <DataTable
          head={["Studi", "Pendekatan", "Luaran", "AUC"]}
          rows={[
            ["Rahman dkk. (2022)", "XGBoost, variabel klinis saja", "Syok kardiogenik", "0,770"],
            ["Kwon dkk. (2021), Korea", "Pembelajaran mendalam", "Mortalitas SKA", "0,810"],
            ["Penelitian ini", "Random Forest, 13 fitur", "Mortalitas in-hospital", "0,819"],
            ["Penelitian ini", "Random Forest, 13 fitur", "Syok kardiogenik baru", "0,747"],
          ]}
          highlightCol={3}
        />
      }
      rightTitle="Nilai tambah dan batasnya"
      right={
        <BulletList>
          <Bullet>
            Model memakai 13 prediktor yang tersedia dalam 24 jam pertama dan menyediakan
            kepentingan fitur untuk interpretasi global.
          </Bullet>
          <Bullet>
            Pembelajaran mendalam memerlukan data besar, komputasi berat, dan kurang interpretabel
            dibandingkan Random Forest.
          </Bullet>
          <Bullet tone="flag">
            Kebutuhan LVEF, LVOT VTI, dan TAPSE membatasi penerapan pada fasilitas tanpa
            ekokardiografi dini.
          </Bullet>
          <Bullet tone="flag">
            Model <strong>belum siap penggunaan klinis</strong>: belum ada validasi eksternal,
            evaluasi prospektif, maupun studi dampak implementasi.
          </Bullet>
        </BulletList>
      }
      callout={
        <>
          Performa setara studi internasional dicapai dengan model yang{" "}
          <strong>interpretabel dan ringan</strong> — cocok untuk konteks sumber daya terbatas.
        </>
      }
    />
  );
}

/* 4.7 + 4.8 */
export function P47() {
  return (
    <Pembahasan
      band={BANDS.echo}
      title="Syok kardiogenik lebih sulit diprediksi daripada mortalitas"
      metaTitle="Pembahasan 4.7 & 4.8 — luaran syok kardiogenik dan komposit"
      basis="Basis: 171 kejadian syok kardiogenik baru (11,2%) dan 197 kejadian komposit (12,9%)"
      source="Bab IV.7 Keterbatasan Prediksi Syok Kardiogenik; Bab IV.8 Perbandingan Luaran Komposit"
      leftTitle="Empat penjelasan AUC 0,747"
      left={
        <BulletList>
          <Bullet>
            Definisi dan pencatatan syok kardiogenik tidak seragam karena desain retrospektif.
          </Bullet>
          <Bullet>
            Sebagian pasien mungkin sudah berada pada fase awal syok saat admisi tetapi belum
            terdokumentasi.
          </Bullet>
          <Bullet>
            Jumlah kejadian positif lebih terbatas dibandingkan kelas negatif.
          </Bullet>
          <Bullet tone="flag">
            Syok bersifat <strong>dinamis</strong> dan dipengaruhi intervensi — revaskularisasi
            cepat mengubah lintasan, sehingga prediksi statis sulit menangkap time-varying
            confounding.
          </Bullet>
        </BulletList>
      }
      rightTitle="Luaran komposit: eksploratif"
      right={
        <div className="flex h-full flex-col justify-between">
          <BulletList>
            <Bullet>
              AUC komposit 0,769 berada di antara mortalitas (0,819) dan syok kardiogenik (0,747).
            </Bullet>
            <Bullet>
              Komposit menambah jumlah kejadian dan kekuatan statistik, tetapi menggabungkan
              komponen dengan implikasi tata laksana berbeda.
            </Bullet>
          </BulletList>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <MetricBox label="Mortalitas" value="0,819" sub="prevalensi 7,5%" tone="mint" />
            <MetricBox label="Syok baru" value="0,747" sub="prevalensi 11,2%" />
            <MetricBox label="Komposit" value="0,769" sub="prevalensi 12,9%" />
          </div>
        </div>
      }
      callout={
        <>
          Dalam konteks IGD, <strong>prediksi mortalitas tetap fokus utama</strong> karena
          berhubungan langsung dengan kebutuhan penilaian dan intervensi segera.
        </>
      }
    />
  );
}
