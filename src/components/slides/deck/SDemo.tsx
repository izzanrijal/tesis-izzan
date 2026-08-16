import { useCallback, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { BANDS } from "@/lib/deck-data";
import { ContentSlide } from "../chrome";
import {
  FEATURES,
  FEATURE_GROUPS,
  validateAll,
  toPayload,
  calculateEgfr2021,
  isExcluded,
  type FeatureKey,
  type HelperValues,
  type PartialFeatureValues,
  type Sex,
} from "@/lib/acs-features";
import {
  getThresholds,
  postPredict,
  type PredictResponse,
  type ThresholdsResponse,
} from "@/lib/acs-api";
import { parseSoap } from "@/lib/soap-parse.functions";
import { CONTOH_LAPORAN } from "@/lib/acs-sample";
import { ShapChart } from "./SDemoShap";

const emptyHelpers: HelperValues = { kreatinin: null, jenisKelamin: null, syok: false };

const btnBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  border: "none",
  borderRadius: 6,
  padding: "12px 22px",
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 18,
  letterSpacing: "0.02em",
  cursor: "pointer",
  lineHeight: 1,
};

const btnPrimary: React.CSSProperties = { ...btnBase, background: "var(--s-forest)", color: "#ffffff" };
const btnGhost: React.CSSProperties = {
  ...btnBase,
  background: "transparent",
  color: "var(--s-forest)",
  border: "2px solid var(--s-forest)",
};
const btnMuted: React.CSSProperties = {
  ...btnBase,
  background: "transparent",
  color: "var(--s-slate)",
  border: "2px solid var(--s-rule)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#ffffff",
  border: "2px solid var(--s-rule)",
  borderRadius: 6,
  padding: "6px 10px",
  fontSize: 16,
  fontFamily: "IBM Plex Sans",
  color: "var(--s-ink)",
  outline: "none",
  lineHeight: 1.15,
  minHeight: 34,
};

const compactCaption: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.14,
};

const featureCardStyle: React.CSSProperties = {
  background: "var(--s-panel)",
  padding: "12px 18px",
  display: "flex",
  minHeight: 0,
  flexDirection: "column",
};

const featureRowsStyle: React.CSSProperties = {
  marginTop: 8,
  display: "grid",
  gridTemplateRows: "repeat(5, minmax(0, 1fr))",
  gap: 7,
  flex: 1,
  minHeight: 0,
};

export function SDemo() {
  const [soap, setSoap] = useState("");
  const [values, setValues] = useState<PartialFeatureValues>({});
  const [helpers, setHelpers] = useState<HelperValues>(emptyHelpers);
  const [egfrAuto, setEgfrAuto] = useState(false);
  const [missing, setMissing] = useState<FeatureKey[]>([]);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const { data: thresholds } = useQuery({
    queryKey: ["thresholds"],
    queryFn: getThresholds,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const parse = useServerFn(parseSoap);

  const parseMutation = useMutation({
    mutationFn: (text: string) => parse({ data: { soap: text } }),
    onSuccess: ({ features }) => {
      const next: PartialFeatureValues = {};
      const kosong: FeatureKey[] = [];
      for (const key of FEATURES.map((f) => f.key)) {
        const v = features[key];
        if (v === null || v === undefined || Number.isNaN(v)) {
          kosong.push(key);
        } else {
          next[key] = key === "killip" ? Math.round(v) : v;
        }
      }
      const nextHelpers: HelperValues = {
        kreatinin: features.kreatinin ?? null,
        jenisKelamin: features.jenis_kelamin ?? null,
        syok: features.syok === true,
      };
      let auto = false;
      if (next.egfr == null) {
        const hitung = calculateEgfr2021(
          nextHelpers.kreatinin,
          next.usia ?? null,
          nextHelpers.jenisKelamin ?? null,
        );
        if (hitung != null) {
          next.egfr = hitung;
          auto = true;
          const i = kosong.indexOf("egfr");
          if (i >= 0) kosong.splice(i, 1);
        }
      }
      setValues(next);
      setHelpers(nextHelpers);
      setEgfrAuto(auto);
      setMissing(kosong);
      setResult(null);
      setParseError(null);
      setModalOpen(false);
    },
    onError: (e) => setParseError(e instanceof Error ? e.message : "Parsing gagal."),
  });

  const predictMutation = useMutation({
    mutationFn: () => postPredict(toPayload(values)),
    onSuccess: (res) => setResult(res),
  });

  const handleChange = useCallback((key: FeatureKey, value: number | null) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key === "egfr") setEgfrAuto(false);
    if (value !== null) setMissing((prev) => prev.filter((k) => k !== key));
  }, []);

  const resetAll = () => {
    setSoap("");
    setValues({});
    setHelpers(emptyHelpers);
    setEgfrAuto(false);
    setMissing([]);
    setResult(null);
    setParseError(null);
  };

  const errors = validateAll(values);
  const belum = FEATURES.filter((f) => errors[f.key]).map((f) => f.label);
  const isValid = belum.length === 0;
  const excluded = isExcluded(values, helpers);

  const loadSample = () => {
    setSoap(CONTOH_LAPORAN);
    setParseError(null);
  };

  const killipValue = values.killip != null ? Math.round(values.killip) : null;

  return (
    <div className="relative h-full">
      <ContentSlide
        index={56}
        section="Penutup"
        band={BANDS.clinic}
        title="Demo langsung: model bekerja real-time"
        metaTitle="Live demo — triase risiko mortalitas dari catatan SOAP"
        basis="Basis: API prediksi aktif (Random Forest 13 fitur, N=1.524) — coba dengan data Anda sendiri"
        source="Demo terhubung ke rfapi.berkompeten.id (POST /predict)"
      >
        <div className="flex h-full min-h-0 flex-col" style={{ gap: 16 }}>
          {/* Baris status + aksi */}
          <div className="flex shrink-0 items-center justify-between">
            <p className="slide-caption" style={{ color: "var(--s-slate)" }}>
              {result
                ? "Hasil prediksi di bawah — tombol untuk pasien baru."
                : "Langkah 1: isi 13 parameter, atau upload SOAP untuk ekstraksi otomatis."}
            </p>
            <div className="flex items-center" style={{ gap: 12 }}>
              <button style={btnGhost} onClick={() => setModalOpen(true)}>
                📄 Upload SOAP
              </button>
              <button
                style={btnMuted}
                onClick={() => {
                  resetAll();
                  setModalOpen(false);
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Body: form ATAU hasil */}
          {result ? (
            <ResultView
              result={result}
              thresholds={thresholds}
              onNew={() => resetAll()}
            />
          ) : (
            <div className="flex min-h-0 flex-1 flex-col" style={{ gap: 12 }}>
              {/* Grup fitur */}
              <div className="grid min-h-0 flex-1" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                {FEATURE_GROUPS.map((g) => (
                  <div
                    key={g.id}
                    style={featureCardStyle}
                  >
                    <p style={{ ...compactCaption, color: "var(--s-forest)", fontWeight: 700 }}>
                      {g.title}
                    </p>
                    <p style={{ ...compactCaption, color: "var(--s-slate)", marginTop: 2 }}>
                      {g.description}
                    </p>
                    <div style={featureRowsStyle}>
                      {FEATURES.filter((f) => f.group === g.id).map((f) => {
                        const err = errors[f.key];
                        const miss = missing.includes(f.key) && (values[f.key] === null || values[f.key] === undefined);
                        const auto = f.key === "egfr" && egfrAuto && values[f.key] != null;
                        const isKillip = f.key === "killip";
                        return (
                          <div key={f.key} className="min-h-0" style={{ display: "flex", flexDirection: "column" }}>
                            <label
                              htmlFor={`demo-${f.key}`}
                              style={{
                                ...compactCaption,
                                display: "block",
                                color: "var(--s-ink)",
                                fontWeight: 600,
                                marginBottom: 2,
                              }}
                            >
                              {f.label}{" "}
                              <span style={{ color: "var(--s-slate)", fontWeight: 400 }}>({f.unit})</span>
                            </label>
                            {isKillip ? (
                              <select
                                id={`demo-${f.key}`}
                                value={killipValue != null ? String(killipValue) : ""}
                                onChange={(e) => handleChange("killip", e.target.value ? Number(e.target.value) : null)}
                                style={{
                                  ...inputStyle,
                                  borderColor: values.killip === 4 ? "var(--s-flag)" : "var(--s-rule)",
                                }}
                              >
                                <option value="">Pilih kelas</option>
                                <option value="1">Killip I</option>
                                <option value="2">Killip II</option>
                                <option value="3">Killip III</option>
                                <option value="4">Killip IV (eksklusi)</option>
                              </select>
                            ) : (
                              <input
                                id={`demo-${f.key}`}
                                type="number"
                                inputMode="decimal"
                                step={f.step}
                                min={f.min}
                                max={f.max}
                                value={values[f.key] ?? ""}
                                onChange={(e) =>
                                  handleChange(f.key, e.target.value === "" ? null : Number(e.target.value))
                                }
                                style={{
                                  ...inputStyle,
                                  borderColor: miss
                                    ? "#d9a406"
                                    : err
                                      ? "var(--s-flag)"
                                      : auto
                                        ? "var(--s-forest)"
                                        : "var(--s-rule)",
                                }}
                              />
                            )}
                            <p
                              style={{
                                ...compactCaption,
                                color: "var(--s-slate)",
                                marginTop: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {miss
                                ? "Tidak ditemukan di laporan — isi manual"
                                : err
                                  ? err
                                  : auto
                                    ? `Otomatis dari kreatinin ${helpers.kreatinin} mg/dL (CKD-EPI 2021)`
                                    : f.hint ?? `Rentang ${f.min}–${f.max}`}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Aksi bawah */}
              <div className="shrink-0 flex flex-col" style={{ gap: 8 }}>
                <p
                  style={{
                    ...compactCaption,
                    color: excluded ? "var(--s-flag)" : "var(--s-slate)",
                    lineHeight: 1.2,
                    maxWidth: 1320,
                  }}
                >
                  {excluded
                    ? "Pasien termasuk kriteria eksklusi (syok kardiogenik / Killip IV) — prediksi dihentikan."
                    : isValid
                      ? "Semua 13 parameter valid."
                      : `${belum.length} parameter belum lengkap: ${belum.join(", ")}`}
                </p>
                <div className="flex items-center justify-end">
                  <button
                    style={{
                      ...btnPrimary,
                      padding: "11px 22px",
                      fontSize: 17,
                      opacity: !isValid || excluded || predictMutation.isPending ? 0.55 : 1,
                      cursor: !isValid || excluded || predictMutation.isPending ? "not-allowed" : "pointer",
                    }}
                    disabled={!isValid || excluded || predictMutation.isPending}
                    onClick={() => predictMutation.mutate()}
                  >
                    {predictMutation.isPending ? "Menghitung risiko & SHAP…" : "Kirim untuk Prediksi"}
                  </button>
                </div>
              </div>
              {predictMutation.isError && (
                <p className="slide-caption" style={{ color: "var(--s-flag)" }}>
                  {predictMutation.error instanceof Error ? predictMutation.error.message : "Prediksi gagal."}
                </p>
              )}
            </div>
          )}
        </div>
      </ContentSlide>

      {/* Modal upload SOAP — inline (ikut skala slide, bukan portal) */}
      {modalOpen && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 60,
            background: "rgba(8, 42, 30, 0.62)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 1240,
              maxHeight: "88%",
              overflow: "auto",
              background: "#fffdf5",
              border: "4px solid var(--s-forest)",
              borderRadius: 10,
              padding: "30px 36px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="slide-subtitle" style={{ color: "var(--s-forest)" }}>
                  Upload laporan SOAP
                </h3>
                <p className="slide-caption" style={{ color: "var(--s-slate)", marginTop: 6 }}>
                  Tempel laporan jaga / SOAP apa adanya. AI mengekstrak 13 parameter, lalu Anda
                  validasi sebelum prediksi. Teks diproses lewat server (kunci API tidak pernah
                  tampil di browser).
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                style={{ ...btnMuted, padding: "8px 16px", fontSize: 16 }}
              >
                ✕ Tutup
              </button>
            </div>

            <textarea
              value={soap}
              onChange={(e) => setSoap(e.target.value)}
              placeholder={"Contoh: Assalamualaikum dokter, mohon izin melaporkan pasien baru di IGD…\nS: … O: Tensi 141/95 mmHg, Nadi 97 x/menit… Echo: EF 38% (BIPLANE), TAPSE 2.2 cm, LVOT VTI 16 cm…"}
              spellCheck={false}
              style={{
                minHeight: 320,
                resize: "vertical",
                fontFamily: "IBM Plex Sans",
                fontSize: 18,
                lineHeight: 1.55,
                border: "2px solid var(--s-rule)",
                borderRadius: 6,
                padding: "14px 16px",
                color: "var(--s-ink)",
                background: "#ffffff",
                outline: "none",
              }}
            />

            <div className="flex items-center" style={{ gap: 14 }}>
              <button
                style={{
                  ...btnPrimary,
                  opacity: parseMutation.isPending || soap.trim().length < 20 ? 0.55 : 1,
                  cursor: parseMutation.isPending || soap.trim().length < 20 ? "not-allowed" : "pointer",
                }}
                disabled={parseMutation.isPending || soap.trim().length < 20}
                onClick={() => parseMutation.mutate(soap)}
              >
                {parseMutation.isPending ? "Memproses laporan…" : "Parsing dengan AI"}
              </button>
              <button style={btnMuted} onClick={loadSample} disabled={parseMutation.isPending}>
                Muat contoh SOAP
              </button>
              {parseMutation.isSuccess && (
                <span className="slide-caption" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
                  ✓ Ekstraksi selesai — form terisi, silakan validasi.
                </span>
              )}
            </div>

            {parseError && (
              <p className="slide-caption" style={{ color: "var(--s-flag)" }}>
                {parseError}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Hasil ---------------- */

function ResultView({
  result,
  thresholds,
  onNew,
}: {
  result: PredictResponse;
  thresholds?: ThresholdsResponse | undefined;
  onNew: () => void;
}) {
  const p = result.probability;
  const persen = (p * 100).toFixed(1);
  const base = result.shap_values.base_value;
  const isHigh = result.risk_category.toUpperCase().includes("HIGH");
  const isMid = result.risk_category.toUpperCase().includes("INTERMEDIATE");
  const toneColor = isHigh ? "var(--s-flag)" : isMid ? "#c9a227" : "var(--s-jade)";
  const toneBg = isHigh ? "#fbe6ee" : isMid ? "#faf3d3" : "#e4f0e8";

  return (
    <div className="flex min-h-0 flex-1 flex-col" style={{ gap: 12, overflow: "hidden" }}>
      <div className="grid shrink-0 items-stretch" style={{ gridTemplateColumns: "minmax(0, 300px) 1fr", gap: 14 }}>
        {/* Kartu probabilitas */}
        <div style={{ background: toneBg, border: `3px solid ${toneColor}`, borderRadius: 8, padding: "15px 20px" }}>
          <p style={{ ...compactCaption, color: "var(--s-ink)", opacity: 0.75 }}>
            Probabilitas mortalitas in-hospital
          </p>
          <p className="slide-num" style={{ color: toneColor, fontSize: 72, lineHeight: 0.95, marginTop: 6 }}>
            {persen}%
          </p>
          <p style={{ ...compactCaption, color: "var(--s-ink)", opacity: 0.7, marginTop: 4 }}>
            p = {p.toFixed(6)} · base {base.toFixed(4)}
          </p>
          <p style={{ color: toneColor, fontWeight: 800, marginTop: 8, fontSize: 22, lineHeight: 1.05 }}>
            {result.risk_category}
          </p>
          <div className="flex items-center" style={{ gap: 8, marginTop: 10 }}>
            <span
              className="slide-badge"
              style={{ background: toneColor, color: "#ffffff", padding: "5px 12px", fontWeight: 700, fontSize: 15 }}
            >
              {result.label}
            </span>
            <span style={{ ...compactCaption, fontFamily: "monospace", color: "var(--s-ink)" }}>
              {result.thresholds}
            </span>
          </div>
        </div>

        {/* Rekomendasi + ambang */}
        <div className="flex min-h-0 flex-col" style={{ gap: 10 }}>
          <div style={{ background: "var(--s-panel)", padding: "12px 18px", flex: "1 1 0", minHeight: 78 }}>
            <p style={{ ...compactCaption, color: "var(--s-forest)", fontWeight: 700 }}>
              Rekomendasi
            </p>
            <p style={{ color: "var(--s-ink)", marginTop: 5, fontSize: 21, lineHeight: 1.25 }}>
              {result.recommendation}
            </p>
          </div>
          {thresholds && (
            <div style={{ background: "var(--s-panel)", padding: "12px 18px" }}>
              <p style={{ ...compactCaption, color: "var(--s-forest)", fontWeight: 700 }}>
                Ambang keputusan{" "}
                <span style={{ fontWeight: 400, color: "var(--s-slate)" }}>({thresholds.source.split(" (")[0]})</span>
              </p>
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 7 }}>
                {thresholds.tiers.map((t) => {
                  const aktif = t.risk_category.toUpperCase() === result.risk_category.toUpperCase();
                  return (
                    <div
                      key={t.risk_category}
                      style={{
                        border: aktif ? `3px solid ${toneColor}` : "2px solid var(--s-rule)",
                        background: aktif ? toneBg : "transparent",
                        padding: "8px 12px",
                      }}
                    >
                      <p style={{ ...compactCaption, color: "var(--s-ink)", fontWeight: 700 }}>
                        {t.risk_category} · {t.label}
                      </p>
                      <p style={{ ...compactCaption, fontFamily: "monospace", color: "var(--s-slate)", marginTop: 2 }}>
                        {t.range}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SHAP + top3 */}
      <div className="grid min-h-0 flex-1" style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 360px)", gap: 14 }}>
        <div className="flex min-h-0 flex-col" style={{ background: "var(--s-panel)", padding: "10px 16px" }}>
          <p style={{ ...compactCaption, color: "var(--s-forest)", fontWeight: 700 }}>
            Kontribusi fitur (SHAP) — merah memperberat, hijau meringankan
          </p>
          <div className="min-h-0 flex-1">
            <ShapChart features={result.shap_values.features} />
          </div>
        </div>
        <div className="flex min-h-0 flex-col" style={{ background: "var(--s-panel)", padding: "10px 16px" }}>
          <p style={{ ...compactCaption, color: "var(--s-forest)", fontWeight: 700 }}>
            3 kontributor teratas
          </p>
          <div className="min-h-0 flex-1" style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
            {result.contributors_top3.map((c) => {
              const naik = c.shap_contribution >= 0;
              return (
                <div
                  key={c.name}
                  style={{
                    background: "#ffffff",
                    border: "2px solid var(--s-rule)",
                    borderRadius: 6,
                    padding: "9px 12px",
                    flex: "1 1 0",
                    minHeight: 0,
                  }}
                >
                  <p style={{ color: "var(--s-ink)", fontWeight: 700, fontSize: 22, lineHeight: 1.05 }}>
                    {c.name} = {c.value}
                  </p>
                  <p style={{ ...compactCaption, color: "var(--s-slate)", marginTop: 4 }}>
                    {naik ? "Memperberat" : "Meringankan"} risiko sebesar{" "}
                    <span style={{ fontFamily: "monospace" }}>
                      {(Math.abs(c.shap_contribution) * 100).toFixed(2)} poin persen
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="shrink-0 flex justify-end">
        <button style={{ ...btnPrimary, padding: "11px 22px", fontSize: 17 }} onClick={onNew}>
          Prediksi Pasien Baru
        </button>
      </div>
    </div>
  );
}
