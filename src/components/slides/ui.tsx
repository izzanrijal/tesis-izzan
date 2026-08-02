import type { ReactNode } from "react";

/* Panel kanan bernuansa kertas */
export function Panel({
  title,
  subtitle,
  children,
  tone = "panel",
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  tone?: "panel" | "mint" | "plain";
}) {
  const bg =
    tone === "panel"
      ? "var(--s-panel)"
      : tone === "mint"
        ? "var(--s-mint-soft)"
        : "transparent";
  return (
    <div
      className="flex h-full min-h-0 flex-col"
      style={{ background: bg, padding: tone === "plain" ? 0 : "28px 32px" }}
    >
      {title && (
        <h3 className="slide-subtitle shrink-0" style={{ color: "var(--s-forest)" }}>
          {title}
        </h3>
      )}
      {subtitle && (
        <p
          className="slide-caption shrink-0"
          style={{ color: "var(--s-jade)", marginTop: 6 }}
        >
          {subtitle}
        </p>
      )}
      <div className="min-h-0 flex-1" style={{ marginTop: title ? 22 : 0 }}>
        {children}
      </div>
    </div>
  );
}

/* Judul kecil di dalam kolom */
export function ColTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="slide-subtitle" style={{ color: "var(--s-forest)" }}>
      {children}
    </h3>
  );
}

/* Butir bernomor besar 01/02/03 */
export function NumberedItem({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex gap-7">
      <span
        className="slide-num shrink-0"
        style={{ color: "var(--s-jade)", fontSize: 46, lineHeight: 1, width: 74 }}
      >
        {n}
      </span>
      <div className="min-w-0">
        <p className="slide-body-lg" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
          {title}
        </p>
        {children && (
          <p className="slide-body" style={{ color: "var(--s-ink)", marginTop: 8 }}>
            {children}
          </p>
        )}
      </div>
    </div>
  );
}

/* Butir daftar dengan penanda kotak */
export function Bullet({
  children,
  tone = "forest",
}: {
  children: ReactNode;
  tone?: "forest" | "flag" | "jade";
}) {
  const color =
    tone === "flag" ? "var(--s-flag)" : tone === "jade" ? "var(--s-jade)" : "var(--s-forest)";
  return (
    <li className="slide-body flex gap-4" style={{ color: "var(--s-ink)" }}>
      <span
        className="shrink-0"
        style={{ width: 10, height: 10, background: color, marginTop: 12 }}
      />
      <span className="min-w-0">{children}</span>
    </li>
  );
}

export function BulletList({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col" style={{ gap: "calc(18px * var(--fit, 1))" }}>{children}</ul>;
}


/* Angka besar */
export function Stat({
  value,
  unit,
  label,
  note,
  tone = "forest",
}: {
  value: string;
  unit?: string;
  label: string;
  note?: string;
  tone?: "forest" | "flag" | "jade";
}) {
  const color =
    tone === "flag" ? "var(--s-flag)" : tone === "jade" ? "var(--s-jade)" : "var(--s-forest)";
  return (
    <div className="flex min-w-0 flex-col">
      <p className="slide-caption" style={{ color: "var(--s-slate)" }}>
        {label}
      </p>
      <p className="slide-num" style={{ color, fontSize: 76, lineHeight: 1.02, marginTop: 8 }}>
        {value}
        {unit && (
          <span
            className="slide-body-lg"
            style={{ color: "var(--s-slate)", fontWeight: 400, marginLeft: 10 }}
          >
            {unit}
          </span>
        )}
      </p>
      {note && (
        <p className="slide-caption" style={{ color: "var(--s-slate)", marginTop: 8 }}>
          {note}
        </p>
      )}
    </div>
  );
}

/* Pil label */
export function Pill({
  children,
  tone = "mint",
}: {
  children: ReactNode;
  tone?: "mint" | "forest" | "flag" | "outline";
}) {
  const map = {
    mint: { bg: "var(--s-mint)", fg: "var(--s-forest)", bd: "transparent" },
    forest: { bg: "var(--s-forest)", fg: "#ffffff", bd: "transparent" },
    flag: { bg: "#fbe6ee", fg: "var(--s-flag)", bd: "var(--s-flag)" },
    outline: { bg: "transparent", fg: "var(--s-forest)", bd: "var(--s-forest)" },
  }[tone];
  return (
    <span
      className="slide-badge inline-flex items-center"
      style={{
        background: map.bg,
        color: map.fg,
        border: `2px solid ${map.bd}`,
        padding: "8px 18px",
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
}

/* Tabel data */
export function DataTable({
  head,
  rows,
  highlightCol,
  footRow,
  align = "center",
}: {
  head: ReactNode[];
  rows: ReactNode[][];
  highlightCol?: number;
  footRow?: ReactNode[];
  align?: "center" | "left";
}) {
  const cell = (i: number): React.CSSProperties => ({
    padding: "16px 18px",
    textAlign: i === 0 ? "left" : align,
    background: highlightCol === i ? "var(--s-mint-soft)" : "transparent",
    fontWeight: highlightCol === i ? 700 : 400,
    color: highlightCol === i ? "var(--s-forest)" : "var(--s-ink)",
  });
  return (
    <table className="w-full" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {head.map((h, i) => (
            <th
              key={i}
              className="slide-body"
              style={{
                ...cell(i),
                fontWeight: 700,
                color: "var(--s-forest)",
                borderBottom: "3px solid var(--s-forest)",
                verticalAlign: "bottom",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri}>
            {r.map((c, i) => (
              <td
                key={i}
                className="slide-body"
                style={{ ...cell(i), borderBottom: "1px solid var(--s-rule)" }}
              >
                {c}
              </td>
            ))}
          </tr>
        ))}
        {footRow && (
          <tr>
            {footRow.map((c, i) => (
              <td
                key={i}
                className="slide-body"
                style={{
                  ...cell(i),
                  fontWeight: 700,
                  color: "var(--s-forest)",
                  borderTop: "3px solid var(--s-forest)",
                }}
              >
                {c}
              </td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
}

/* Kotak metrik ringkas */
export function MetricBox({
  label,
  value,
  sub,
  tone = "paper",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "paper" | "mint" | "forest";
}) {
  const bg =
    tone === "forest" ? "var(--s-forest)" : tone === "mint" ? "var(--s-mint)" : "var(--s-panel)";
  const fg = tone === "forest" ? "#ffffff" : "var(--s-forest)";
  const subFg = tone === "forest" ? "#a9c9ba" : "var(--s-slate)";
  return (
    <div className="flex min-w-0 flex-col justify-center" style={{ background: bg, padding: "20px 24px" }}>
      <p className="slide-caption" style={{ color: subFg }}>
        {label}
      </p>
      <p className="slide-num" style={{ color: fg, fontSize: 42, marginTop: 6 }}>
        {value}
      </p>
      {sub && (
        <p className="slide-caption" style={{ color: subFg, marginTop: 4 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* Kolom vertikal dengan garis pemisah kiri */
export function RuledColumn({ children }: { children: ReactNode }) {
  return (
    <div style={{ borderLeft: "3px solid var(--s-forest)", paddingLeft: 26 }}>{children}</div>
  );
}
