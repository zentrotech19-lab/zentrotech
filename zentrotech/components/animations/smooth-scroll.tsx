"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Lenis only smooths the mouse wheel; on touch devices it adds an idle
    // rAF loop with no visible benefit and can worsen mobile INP. Desktop only.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let id = 0;
    function raf(time: number) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    }
    id = requestAnimationFrame(raf);

    // Stop the loop while the tab is backgrounded.
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(id);
        id = 0;
      } else if (!id) {
        id = requestAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("visibilitychange", onVis);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
