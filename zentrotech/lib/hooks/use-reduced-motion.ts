"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  // Lazy initial state — read mq.matches once at mount without triggering a
  // setState-in-effect (React 19 / Next 16 lint flag).
  const [prefers, setPrefers] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefers;
}
