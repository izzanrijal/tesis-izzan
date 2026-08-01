import type { ReactNode } from "react";

/** Bingkai putih untuk gambar hasil penelitian (figure asli dari repositori analisis). */
export function FigureBox({
  src,
  alt,
  caption,
  fit = "contain",
  pad = 14,
}: {
  src: string;
  alt: string;
  caption?: string;
  fit?: "contain" | "cover";
  pad?: number;
}) {
  return (
    <figure className="flex h-full min-h-0 min-w-0 flex-col">
      <div
        className="min-h-0 flex-1"
        style={{
          background: "#ffffff",
          border: "1px solid var(--s-rule)",
          padding: pad,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full"
          style={{ objectFit: fit, objectPosition: "center" }}
        />
      </div>
      {caption && (
        <figcaption
          className="slide-caption shrink-0"
          style={{ color: "var(--s-slate)", marginTop: 8 }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Kartu berjudul yang membungkus konten apa pun (gambar, tabel, teks). */
export function FigureCard({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="flex h-full min-h-0 min-w-0 flex-col"
      style={{ background: "var(--s-panel)", padding: "18px 20px" }}
    >
      <p className="slide-caption shrink-0" style={{ color: "var(--s-forest)", fontWeight: 700 }}>
        {title}
      </p>
      <div className="min-h-0 flex-1" style={{ marginTop: 10 }}>
        {children}
      </div>
      {note && (
        <p className="slide-caption shrink-0" style={{ color: "var(--s-slate)", marginTop: 8 }}>
          {note}
        </p>
      )}
    </div>
  );
}
