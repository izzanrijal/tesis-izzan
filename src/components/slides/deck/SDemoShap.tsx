import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ShapFeature } from "@/lib/acs-api";

const AXIS = { fontSize: 13, fill: "#5b6660", fontFamily: "IBM Plex Sans" };

/**
 * SHAP horizontal bar — gaya deck (bukan shadcn). Merah = memperberat,
 * hijau = meringankan risiko.
 */
export function ShapChart({ features }: { features: ShapFeature[] }) {
  const data = [...features]
    .sort((a, b) => Math.abs(b.shap_contribution) - Math.abs(a.shap_contribution))
    .map((f) => ({
      name: f.name,
      value: f.value,
      kontribusi: Number(f.shap_contribution.toFixed(5)),
      positif: f.shap_contribution >= 0,
    }));

  return (
    <div className="h-full min-h-0 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          barCategoryGap={3}
          margin={{ top: 2, right: 16, bottom: 2, left: 0 }}
        >
          <XAxis type="number" tick={AXIS} tickFormatter={(v: number) => v.toFixed(2)} stroke="#b9b7ab" />
          <YAxis
            type="category"
            dataKey="name"
            width={78}
            tick={AXIS}
            interval={0}
            stroke="#b9b7ab"
          />
          <ReferenceLine x={0} stroke="var(--s-rule)" strokeWidth={2} />
          <Tooltip
            cursor={{ fill: "rgba(236, 234, 223, 0.6)" }}
            contentStyle={{
              background: "#fffdf5",
              border: "2px solid var(--s-rule)",
              borderRadius: 6,
              fontSize: 14,
              color: "var(--s-ink)",
              fontFamily: "IBM Plex Sans",
            }}
            formatter={(val: number, _n, item) => [
              `${val > 0 ? "+" : ""}${val.toFixed(4)} (${val >= 0 ? "memperberat" : "meringankan"})`,
              `Nilai: ${(item?.payload as { value: number } | undefined)?.value ?? "-"}`,
            ]}
          />
          <Bar dataKey="kontribusi" radius={[3, 3, 3, 3]} maxBarSize={14}>
            {data.map((d) => (
              <Cell key={d.name} fill={d.positif ? "var(--s-flag)" : "var(--s-jade)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
