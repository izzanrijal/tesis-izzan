import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import { rocPoints, rocSeries } from "@/lib/deck-data";

const AXIS = { fontSize: 20, fill: "#5b6660", fontFamily: "IBM Plex Sans" };
const GRID = "#dcdacf";

/* ---------------- Kurva ROC ---------------- */

export function RocChart({
  width,
  height,
  curves,
}: {
  width: number;
  height: number;
  curves: { key: string; label: string; auc: number; color: string }[];
}) {
  const data = rocSeries(curves.map((c) => ({ key: c.key, auc: c.auc })));
  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 12, right: 24, bottom: 44, left: 8 }}
    >
      <CartesianGrid stroke={GRID} strokeDasharray="4 6" />
      <XAxis
        dataKey="fpr"
        type="number"
        domain={[0, 1]}
        ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]}
        tickFormatter={(v: number) => v.toFixed(1).replace(".", ",")}
        tick={AXIS}
        stroke="#b9b7ab"
        label={{ value: "1 − Spesifisitas", position: "bottom", offset: 14, ...AXIS }}
      />
      <YAxis
        type="number"
        domain={[0, 1]}
        ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]}
        tickFormatter={(v: number) => v.toFixed(1).replace(".", ",")}
        tick={AXIS}
        stroke="#b9b7ab"
        width={62}
        label={{
          value: "Sensitivitas",
          angle: -90,
          position: "insideLeft",
          offset: 16,
          ...AXIS,
        }}
      />
      <ReferenceLine
        segment={[
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ]}
        stroke="#b9b7ab"
        strokeDasharray="6 6"
      />
      {curves.map((c) => (
        <Line
          key={c.key}
          type="monotone"
          dataKey={c.key}
          stroke={c.color}
          strokeWidth={5}
          dot={false}
          isAnimationActive={false}
          name={c.label}
        />
      ))}
    </LineChart>
  );
}

/* ---------------- Kurva Precision–Recall ---------------- */

export function PrChart({
  width,
  height,
  auc,
  prevalence,
}: {
  width: number;
  height: number;
  auc: number;
  prevalence: number;
}) {
  const data = rocPoints(auc, 80)
    .filter((p) => p.tpr > 0.02)
    .map((p) => ({
      recall: p.tpr,
      precision:
        (p.tpr * prevalence) / (p.tpr * prevalence + p.fpr * (1 - prevalence) || 1e-9),
    }));
  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 12, right: 20, bottom: 44, left: 4 }}
    >
      <CartesianGrid stroke={GRID} strokeDasharray="4 6" />
      <XAxis
        dataKey="recall"
        type="number"
        domain={[0, 1]}
        ticks={[0, 0.5, 1]}
        tickFormatter={(v: number) => v.toFixed(1).replace(".", ",")}
        tick={AXIS}
        stroke="#b9b7ab"
        label={{ value: "Recall", position: "bottom", offset: 14, ...AXIS }}
      />
      <YAxis
        type="number"
        domain={[0, 1]}
        ticks={[0, 0.5, 1]}
        tickFormatter={(v: number) => v.toFixed(1).replace(".", ",")}
        tick={AXIS}
        stroke="#b9b7ab"
        width={54}
      />
      <ReferenceLine y={prevalence} stroke="var(--s-flag)" strokeDasharray="6 6" strokeWidth={3} />
      <Line
        type="monotone"
        dataKey="precision"
        stroke="var(--s-forest)"
        strokeWidth={5}
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  );
}

/* ---------------- Decision Curve Analysis ---------------- */

export function DcaChart({
  width,
  height,
  auc,
  prevalence,
}: {
  width: number;
  height: number;
  auc: number;
  prevalence: number;
}) {
  const roc = rocPoints(auc, 200);
  const data: { pt: number; model: number; all: number; none: number }[] = [];
  for (let i = 1; i <= 50; i++) {
    const pt = i / 100;
    const w = pt / (1 - pt);
    let best = 0;
    roc.forEach((p) => {
      const nb = p.tpr * prevalence - p.fpr * (1 - prevalence) * w;
      if (nb > best) best = nb;
    });
    data.push({
      pt,
      model: best,
      all: prevalence - (1 - prevalence) * w,
      none: 0,
    });
  }
  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 12, right: 20, bottom: 44, left: 4 }}
    >
      <CartesianGrid stroke={GRID} strokeDasharray="4 6" />
      <XAxis
        dataKey="pt"
        type="number"
        domain={[0, 0.5]}
        ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5]}
        tickFormatter={(v: number) => v.toFixed(1).replace(".", ",")}
        tick={AXIS}
        stroke="#b9b7ab"
        label={{ value: "Ambang batas", position: "bottom", offset: 14, ...AXIS }}
      />
      <YAxis
        type="number"
        domain={[-0.04, 0.09]}
        ticks={[-0.04, 0, 0.04, 0.08]}
        tickFormatter={(v: number) => v.toFixed(2).replace(".", ",")}
        tick={AXIS}
        stroke="#b9b7ab"
        width={70}
      />
      <Line
        type="monotone"
        dataKey="model"
        stroke="var(--s-forest)"
        strokeWidth={5}
        dot={false}
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        dataKey="all"
        stroke="var(--s-jade)"
        strokeWidth={3}
        strokeDasharray="8 6"
        dot={false}
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        dataKey="none"
        stroke="#9aa39d"
        strokeWidth={3}
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  );
}

/* ---------------- Kurva kalibrasi ---------------- */

export function CalibrationChart({ width, height }: { width: number; height: number }) {
  // Rekonstruksi ilustratif: kurva mengikuti diagonal ideal dengan deviasi kecil
  const data = [0, 0.05, 0.12, 0.22, 0.35, 0.5, 0.68, 0.85, 1].map((x) => ({
    pred: x,
    obs: Math.max(0, Math.min(1, x - 0.055 * Math.sin(Math.PI * x) * (x > 0.5 ? 1.6 : 1))),
  }));
  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 12, right: 20, bottom: 44, left: 4 }}
    >
      <CartesianGrid stroke={GRID} strokeDasharray="4 6" />
      <XAxis
        dataKey="pred"
        type="number"
        domain={[0, 1]}
        ticks={[0, 0.5, 1]}
        tickFormatter={(v: number) => v.toFixed(1).replace(".", ",")}
        tick={AXIS}
        stroke="#b9b7ab"
        label={{ value: "Probabilitas prediksi", position: "bottom", offset: 14, ...AXIS }}
      />
      <YAxis
        type="number"
        domain={[0, 1]}
        ticks={[0, 0.5, 1]}
        tickFormatter={(v: number) => v.toFixed(1).replace(".", ",")}
        tick={AXIS}
        stroke="#b9b7ab"
        width={54}
      />
      <ReferenceLine
        segment={[
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ]}
        stroke="#b9b7ab"
        strokeDasharray="6 6"
      />
      <Line
        type="monotone"
        dataKey="obs"
        stroke="var(--s-forest)"
        strokeWidth={5}
        dot={{ r: 6, fill: "var(--s-jade)", stroke: "none" }}
        isAnimationActive={false}
      />
    </LineChart>
  );
}

/* ---------------- Bar horizontal (feature importance) ---------------- */

export function ImportanceBars({
  width,
  height,
  data,
}: {
  width: number;
  height: number;
  data: { fitur: string; gini: number }[];
}) {
  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      layout="vertical"
      margin={{ top: 8, right: 96, bottom: 34, left: 8 }}
      barCategoryGap={18}
    >
      <CartesianGrid stroke={GRID} strokeDasharray="4 6" horizontal={false} />
      <XAxis
        type="number"
        domain={[0, 0.17]}
        ticks={[0, 0.05, 0.1, 0.15]}
        tickFormatter={(v: number) => v.toFixed(2).replace(".", ",")}
        tick={AXIS}
        stroke="#b9b7ab"
        label={{ value: "Gini importance", position: "bottom", offset: 8, ...AXIS }}
      />
      <YAxis
        type="category"
        dataKey="fitur"
        tick={{ ...AXIS, fontSize: 26, fill: "#12261d" }}
        stroke="#b9b7ab"
        width={210}
      />
      <Bar dataKey="gini" isAnimationActive={false} radius={0}>
        {data.map((_, i) => (
          <Cell
            key={i}
            fill={i === 0 ? "var(--s-forest)" : i === 1 ? "var(--s-emerald)" : "var(--s-jade)"}
            fillOpacity={i < 2 ? 1 : 1 - (i - 2) * 0.18}
          />
        ))}
      </Bar>
    </BarChart>
  );
}

/* ---------------- Bar berkelompok (perbandingan metrik) ---------------- */

export function GroupedBars({
  width,
  height,
  data,
  keys,
  domain = [0, 1],
}: {
  width: number;
  height: number;
  data: Record<string, string | number>[];
  keys: { key: string; label: string; color: string }[];
  domain?: [number, number];
}) {
  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 8, right: 16, bottom: 56, left: 8 }}
      barCategoryGap={34}
    >
      <CartesianGrid stroke={GRID} strokeDasharray="4 6" vertical={false} />
      <XAxis dataKey="metrik" tick={{ ...AXIS, fontSize: 22 }} stroke="#b9b7ab" />
      <YAxis
        domain={domain}
        tick={AXIS}
        stroke="#b9b7ab"
        width={62}
        tickFormatter={(v: number) => v.toFixed(2).replace(".", ",")}
      />
      <Legend
        verticalAlign="bottom"
        align="center"
        wrapperStyle={{ fontSize: 22, fontFamily: "IBM Plex Sans", paddingTop: 14 }}
        iconType="square"
        iconSize={18}
      />
      {keys.map((k) => (
        <Bar
          key={k.key}
          dataKey={k.key}
          name={k.label}
          fill={k.color}
          isAnimationActive={false}
        />
      ))}
    </BarChart>
  );
}
