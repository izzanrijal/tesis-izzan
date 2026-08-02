import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

const STEPS = [1, 0.94, 0.88, 0.82];

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Mengisi area isi slide. Bila konten lebih tinggi dari kotaknya, skala
 * tipografi diturunkan bertingkat (100% -> 82%) lewat variabel CSS `--fit`
 * sehingga teks tidak pernah keluar kotak.
 */
export function AutoFit({ children }: { children: ReactNode }) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useIso(() => {
    const box = boxRef.current;
    const inner = innerRef.current;
    if (!box || !inner) return;

    const fit = () => {
      let i = 0;
      for (; i < STEPS.length - 1; i++) {
        inner.style.setProperty("--fit", String(STEPS[i]));
        const overH = inner.scrollHeight - box.clientHeight;
        const overW = inner.scrollWidth - box.clientWidth;
        if (overH <= 2 && overW <= 2) break;
      }
      inner.style.setProperty("--fit", String(STEPS[i]));
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    const t = window.setTimeout(fit, 400);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  });

  return (
    <div ref={boxRef} className="relative min-h-0 flex-1 overflow-hidden">
      <div ref={innerRef} className="slide-fit absolute inset-0">
        {children}
      </div>
    </div>
  );
}
