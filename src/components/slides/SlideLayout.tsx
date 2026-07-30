import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Membungkus konten pada kanvas tetap 1920x1080 lalu menskalakannya
 * agar pas di dalam container induk (editor, thumbnail, fullscreen).
 */
export function ScaledSlide({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const update = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      setScale(Math.min(width / 1920, height / 1080));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: 1920,
          height: 1080,
          marginLeft: -960,
          marginTop: -540,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
