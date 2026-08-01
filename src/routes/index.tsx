import { useCallback, useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ScaledSlide } from "@/components/slides/SlideLayout";
import { SLIDES } from "@/components/slides/registry";
import { SlideIndexProvider } from "@/components/slides/SlideIndexContext";
import { DECK_TITLE } from "@/lib/deck-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prediksi Mortalitas SKA dengan Random Forest — Deck Tesis" },
      {
        name: "description",
        content:
          "Presentasi 21 slide: model Random Forest memprediksi mortalitas in-hospital pasien STEMI/NSTEMI di IGD dengan AUC 0,819.",
      },
      { property: "og:title", content: "Prediksi Mortalitas SKA dengan Random Forest" },
      {
        property: "og:description",
        content:
          "Deck tesis 21 slide: AUC 0,819, triase tiga tingkat, dan perbandingan dengan GRACE 2.0.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    slide: Math.min(Math.max(Number(search.slide ?? 1) || 1, 1), SLIDES.length),
    print: search.print === true || search.print === "true" || search.print === "",
  }),
  component: Deck,
});

function Deck() {
  const { slide, print } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [grid, setGrid] = useState(false);
  const index = slide - 1;

  const go = useCallback(
    (n: number) => {
      const next = Math.min(Math.max(n, 1), SLIDES.length);
      navigate({ to: "/", search: { slide: next, print: false } });
    },
    [navigate],
  );

  useEffect(() => {
    document.title = `${slide}/${SLIDES.length} — ${SLIDES[index].title}`;
  }, [slide, index]);

  useEffect(() => {
    if (print) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(slide + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(slide - 1);
      } else if (e.key.toLowerCase() === "g") {
        setGrid((v) => !v);
      } else if (e.key === "Escape") {
        setGrid(false);
      } else if (e.key === "F5") {
        e.preventDefault();
        document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, slide, print]);

  if (print) {
    return (
      <div className="bg-paper">
        {SLIDES.map(({ Component }, i) => (
          <div key={i} className="deck-print-page">
            <SlideIndexProvider index={i + 1}>
              <Component />
            </SlideIndexProvider>
          </div>
        ))}
      </div>
    );
  }

  if (grid) {
    return (
      <main className="min-h-screen bg-paper" style={{ padding: 28 }}>
        <h1 className="slide-subtitle" style={{ color: "var(--s-forest)", marginBottom: 20 }}>
          {DECK_TITLE}
        </h1>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {SLIDES.map(({ Component, title }, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setGrid(false);
                go(i + 1);
              }}
              className="text-left"
            >
              <div
                className="aspect-video w-full overflow-hidden"
                style={{ border: "2px solid var(--s-rule)" }}
              >
                <ScaledSlide>
                  <SlideIndexProvider index={i + 1}>
                    <Component />
                  </SlideIndexProvider>
                </ScaledSlide>
              </div>
              <p className="slide-chrome" style={{ color: "var(--s-slate)", marginTop: 6 }}>
                {String(i + 1).padStart(2, "0")} · {title}
              </p>
            </button>
          ))}
        </div>
      </main>
    );
  }

  const Current = SLIDES[index].Component;

  return (
    <main className="flex h-screen w-screen flex-col bg-forest-deep">
      <div className="min-h-0 flex-1">
        <ScaledSlide>
          <SlideIndexProvider index={slide}>
            <Current />
          </SlideIndexProvider>
        </ScaledSlide>
      </div>
      <div
        className="flex shrink-0 items-center justify-center gap-4"
        style={{ padding: "10px 16px", color: "#cfe0d7", fontSize: 14 }}
      >
        <button type="button" onClick={() => go(slide - 1)} aria-label="Slide sebelumnya">
          ←
        </button>
        <span>
          {slide} / {SLIDES.length}
        </span>
        <button type="button" onClick={() => go(slide + 1)} aria-label="Slide berikutnya">
          →
        </button>
        <button type="button" onClick={() => setGrid(true)}>
          Grid (G)
        </button>
        <button
          type="button"
          onClick={() => document.documentElement.requestFullscreen?.()}
        >
          Presentasi (F5)
        </button>
      </div>
    </main>
  );
}
