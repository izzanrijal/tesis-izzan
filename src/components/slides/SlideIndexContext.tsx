import { createContext, useContext, type ReactNode } from "react";

const SlideIndexContext = createContext<number | null>(null);

export function SlideIndexProvider({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  return <SlideIndexContext.Provider value={index}>{children}</SlideIndexContext.Provider>;
}

export function useSlideIndex(fallback?: number) {
  const ctx = useContext(SlideIndexContext);
  return ctx ?? fallback ?? 1;
}
