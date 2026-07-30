import { BANDS } from "@/lib/deck-data";
import { Callout, ContentSlide } from "../chrome";
import { Bullet, BulletList, Panel } from "../ui";

function FlowBox({
  label,
  value,
  tone = "paper",
}: {
  label: string;
  value: string;
  tone?: "paper" | "forest" | "mint";
}) {
  const bg =
    tone === "forest" ? "var(--s-forest)" : tone === "mint" ? "var(--s-mint)" : "var(--s-panel)";
  const fg = tone === "forest" ? "#ffffff" : "var(--s-forest)";
  return (
    <div
      className="flex items-center justify-between"
      style={{ background: bg, padding: "20px 26px", width: 560 }}
    >
      <span className="slide-body" style={{ color: tone === "forest" ? "#c8ddd2" : "var(--s-ink)" }}>
        {label}
      </span>
      <span className="slide-num" style={{ color: fg, fontSize: 38 }}>
        {value}
      </span>
    </div>
  );
}

function Connector() {
  return <div style={{ width: 3, height: 30, background: "var(--s-jade)", marginLeft: 40 }} />;
}

export function S05() {
  return (
    <ContentSlide
      index={5}
      section="Metode"
      band={BANDS.clinic}
      title="Kohort retrospektif nyata dari pusat rujukan jantung Indonesia Timur"
      metaTitle="Desain studi &amp; alur partisipan"
      basis="Basis: rekam medis elektronik PJT RSUP Dr. Wahidin Sudirohusodo, Januari 2024 – Desember 2025; total sampling, tanpa augmentasi sintetis"
      source="Gambar 2.3 — Alur partisipan; Rekam Medis Elektronik PJT RSUP Dr. Wahidin Sudirohusodo"
      callout={
        <Callout label="Data dunia nyata:">
          1.524 pasien — <strong>1.047 STEMI (68,7%)</strong> dan{" "}
          <strong>477 NSTEMI (31,3%)</strong> — dengan 115 kematian in-hospital (7,5%).
        </Callout>
      }
    >
      <div className="grid h-full min-h-0" style={{ gridTemplateColumns: "620px 1fr", gap: 56 }}>
        <div className="flex min-w-0 flex-col">
          <p className="slide-caption" style={{ color: "var(--s-jade)", fontWeight: 700 }}>
            ALUR PARTISIPAN
          </p>
          <div style={{ marginTop: 18 }}>
            <FlowBox label="Pasien diskrining" value="1.952" />
            <div className="flex items-center">
              <Connector />
              <div
                className="slide-caption"
                style={{
                  marginLeft: 22,
                  color: "var(--s-flag)",
                  fontWeight: 700,
                }}
              >
                − 428 dieksklusi
              </div>
            </div>
            <FlowBox label="Masuk analisis akhir" value="1.524" tone="forest" />
            <Connector />
            <div className="flex" style={{ gap: 18 }}>
              <FlowBoxSmall label="STEMI" value="1.047" pct="68,7%" />
              <FlowBoxSmall label="NSTEMI" value="477" pct="31,3%" />
            </div>
            <Connector />
            <FlowBox label="Mortalitas in-hospital" value="115" tone="mint" />
          </div>
        </div>

        <div className="flex min-w-0 flex-col" style={{ gap: 26 }}>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 26 }}>
            <Panel title="Desain" tone="panel">
              <BulletList>
                <Bullet>Kohort retrospektif, total sampling</Bullet>
                <Bullet>PJT RSUP Dr. Wahidin Sudirohusodo, Makassar</Bullet>
                <Bullet>Januari 2024 — Desember 2025</Bullet>
              </BulletList>
            </Panel>
            <Panel title="Kriteria eksklusi" tone="panel">
              <BulletList>
                <Bullet tone="flag">Syok saat admisi</Bullet>
                <Bullet tone="flag">Killip kelas IV</Bullet>
                <Bullet tone="flag">Data ekokardiografi tidak lengkap</Bullet>
                <Bullet tone="flag">Pulang paksa</Bullet>
              </BulletList>
            </Panel>
          </div>
          <div
            style={{
              background: "var(--s-mint-soft)",
              borderLeft: "8px solid var(--s-jade)",
              padding: "24px 28px",
            }}
          >
            <p className="slide-body" style={{ color: "var(--s-ink)" }}>
              Pusat rujukan kardiak utama untuk Indonesia Timur. Seluruh variabel diambil dari
              pemeriksaan rutin dalam <strong>24 jam pertama</strong> sejak admisi IGD — tanpa
              pemeriksaan tambahan khusus penelitian.
            </p>
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}

function FlowBoxSmall({ label, value, pct }: { label: string; value: string; pct: string }) {
  return (
    <div
      className="flex flex-col"
      style={{ background: "var(--s-mint-soft)", padding: "18px 22px", width: 271 }}
    >
      <span className="slide-caption" style={{ color: "var(--s-slate)" }}>
        {label}
      </span>
      <span className="slide-num" style={{ color: "var(--s-forest)", fontSize: 36, marginTop: 4 }}>
        {value}
        <span className="slide-caption" style={{ color: "var(--s-jade)", marginLeft: 10 }}>
          {pct}
        </span>
      </span>
    </div>
  );
}
