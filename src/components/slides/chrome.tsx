import type { ReactNode } from "react";
import { SECTIONS, TOTAL_SLIDES, type SectionName } from "@/lib/deck-data";
import { useSlideIndex } from "./SlideIndexContext";
import { AutoFit } from "./fit";



/* ---------------- Band judul ---------------- */

function TitleBand({ image, title }: { image: string; title: string }) {
  return (
    <div
      className="relative flex shrink-0 items-end overflow-hidden"
      style={{ height: 200, background: "var(--s-forest-deep)" }}
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.55 }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--s-forest-deep) 22%, color-mix(in oklab, var(--s-forest-deep) 78%, transparent) 62%, color-mix(in oklab, var(--s-forest-deep) 55%, transparent) 100%)",
        }}
      />
      <h2
        className="slide-title relative"
        style={{
          color: "#ffffff",
          paddingLeft: 80,
          paddingRight: 220,
          paddingBottom: 34,
          maxWidth: 1720,
          fontSize: title.length > 62 ? 46 : undefined,
        }}
      >
        {title}
      </h2>

    </div>
  );
}

/* ---------------- Breadcrumb seksi ---------------- */

function Breadcrumb({ active }: { active: SectionName }) {
  return (
    <div className="flex shrink-0 items-center gap-[8px]" style={{ fontSize: 18 }}>
      {SECTIONS.map((s, i) => (
        <span key={s} className="flex items-center gap-[8px]">
          {i > 0 && <span style={{ color: "var(--s-rule)" }}>·</span>}
          <span
            style={{
              color: s === active ? "var(--s-forest)" : "#9aa39d",
              fontWeight: s === active ? 700 : 400,
              whiteSpace: "nowrap",
            }}
          >
            {s}
          </span>
        </span>
      ))}
    </div>
  );
}


/* ---------------- Callout kesimpulan ---------------- */

export function Callout({
  label,
  children,
  tone = "mint",
}: {
  label: string;
  children: ReactNode;
  tone?: "mint" | "flag";
}) {
  return (
    <div
      className="flex shrink-0 items-center"
      style={{
        background: tone === "mint" ? "var(--s-mint)" : "#fbe6ee",
        borderLeft: `8px solid ${tone === "mint" ? "var(--s-forest)" : "var(--s-flag)"}`,
        minHeight: 92,
        padding: "18px 32px",
      }}
    >
      <p
        className={typeof children === "string" && children.length > 130 ? "slide-body" : "slide-body-lg"}
        style={{ color: "var(--s-ink)" }}
      >
        <strong style={{ color: "var(--s-forest)" }}>{label}</strong> {children}
      </p>
    </div>

  );
}

/* ---------------- Kerangka slide isi ---------------- */

export function ContentSlide({
  index,
  section,
  band,
  title,
  metaTitle,
  basis,
  source,
  callout,
  children,
}: {
  index?: number;
  section: SectionName;
  band: string;
  title: string;
  metaTitle: string;
  basis: string;
  source: string;
  callout?: ReactNode;
  children: ReactNode;
}) {
  const resolved = useSlideIndex(index);
  const num = String(resolved).padStart(2, "0");

  return (
    <div className="slide-content flex flex-col">
      <TitleBand image={band} title={title} />

      <div
        className="flex min-h-0 flex-1 flex-col"
        style={{ paddingLeft: 80, paddingRight: 80, paddingTop: 26 }}
      >
        <div className="flex shrink-0 items-baseline justify-between gap-10">
          <p className="slide-chrome" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
            <span style={{ fontFamily: "var(--font-display)" }}>{num}</span>
            <span style={{ color: "var(--s-rule)" }}>{"  |  "}</span>
            {metaTitle}
          </p>
          <Breadcrumb active={section} />
        </div>

        <p
          className="slide-chrome shrink-0"
          style={{ color: "var(--s-slate)", marginTop: 10 }}
        >
          {basis}
        </p>

        <div
          className="shrink-0"
          style={{ height: 1, background: "var(--s-rule)", marginTop: 14 }}
        />

        <div className="flex min-h-0 flex-1 flex-col" style={{ paddingTop: 26 }}>
          <AutoFit>{children}</AutoFit>
        </div>

        {callout && <div style={{ marginTop: 22, marginBottom: 4 }}>{callout}</div>}
      </div>


      <div
        className="slide-footer flex shrink-0 items-center justify-between"
        style={{
          height: 64,
          paddingLeft: 80,
          paddingRight: 80,
          color: "#96a09a",
        }}
      >
        <span>Sumber: {source}</span>
        <span className="slide-num" style={{ letterSpacing: "0.08em" }}>
          {num} / {String(TOTAL_SLIDES).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
