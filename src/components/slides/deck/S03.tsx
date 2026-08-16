import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { Bullet, BulletList, DataTable, Panel } from "../ui";

export function S03() {
  return (
    <ContentSlide
      index={3}
      section="Konteks"
      band={BANDS.clinic}
      title="GRACE dan TIMI berguna, tetapi tidak cukup untuk keputusan individual"
      metaTitle="Keterbatasan skor risiko konvensional"
      basis="Basis: AUC skor konvensional pada studi validasi terpublikasi; semua skor mengasumsikan hubungan linear antarvariabel"
      source="Huang et al. (2020), Park et al. (2021), Weng et al. (2017), Johnson et al. (2018)"
      callout={
        <Callout label="Konsekuensinya:">
          AUC 0,79–0,80 memadai untuk deskripsi populasi, tetapi kurang tajam untuk triase IGD yang
          bertaruh pada satu pasien.
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "1fr 700px", gap: 56 }}>
        <div className="flex min-w-0 flex-col">
          <DataTable
            head={["Skor risiko", "Luaran", "AUC", "Diskriminasi"]}
            rows={[
              ["GRACE", "Mortalitas", "0,79 – 0,80", "Sedang"],
              ["TIMI STEMI", "Mortalitas", "0,76", "Sedang"],
              ["TIMI NSTEMI", "Mortalitas", "0,75", "Sedang"],
              ["qSOFA", "Mortalitas", "0,65", "Lemah"],
              ["Jentzer Score", "SKG, CICU", "0,76", "Sedang"],
            ]}
          />
          <p className="slide-caption" style={{ color: "var(--s-slate)", marginTop: 22 }}>
            Skor dikembangkan pada populasi Eropa dan Amerika Utara; performa pada populasi Asia
            Tenggara belum tentu setara.
          </p>

          <div
            style={{
              marginTop: 28,
              background: "#fbe6ee",
              borderLeft: "8px solid var(--s-flag)",
              padding: "22px 26px",
            }}
          >
            <p className="slide-body" style={{ color: "var(--s-ink)" }}>
              <strong style={{ color: "var(--s-flag)" }}>Celah yang belum terisi:</strong> belum ada
              model prediksi mortalitas SKA yang dikembangkan khusus untuk populasi Indonesia Timur.
            </p>
          </div>
        </div>

        <Panel title="Empat keterbatasan struktural" subtitle="Bukan soal kualitas data, tetapi bentuk modelnya">
          <BulletList>
            <Bullet>
              <strong>Asumsi linearitas</strong> — fisiologi manusia tidak linear; interaksi
              antarvariabel tidak tertangkap.
            </Bullet>
            <Bullet>
              <strong>Dimensi terbatas</strong> — tekanan darah, fungsi ginjal, parameter
              ekokardiografi, dan penanda inflamasi membentuk jaringan yang kompleks.
            </Bullet>
            <Bullet>
              <strong>Transportabilitas</strong> — kalibrasi bergeser saat dipindahkan ke populasi
              berbeda.
            </Bullet>
            <Bullet>
              <strong>Level populasi, bukan individu</strong> — kurang akurat untuk memprediksi
              luaran spesifik pada satu pasien.
            </Bullet>
          </BulletList>
        </Panel>
      </div>
    </ContentSlide>
  );
}
