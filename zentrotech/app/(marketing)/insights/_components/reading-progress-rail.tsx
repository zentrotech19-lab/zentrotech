"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * ReadingProgressRail — fixed 2px aurora bar pinned to the top of the viewport
 * that fills L→R as you scroll the whole page (scaleX 0→1, origin-left), with a
 * pulsing leading-edge dot riding the right end of the fill.
 *
 * useScroll(whole page) → scrollYProgress → useSpring (smoothing) → scaleX.
 * Reduced-motion: renders nothing (no scroll-linked motion).
 */
export function ReadingProgressRail() {
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] pointer-events-none"
    >
      <m.div
        className="relative h-full origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, var(--color-indigo), var(--color-violet), var(--color-pink-pulse))",
        }}
      >
        <span
          className="pulse-glow absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-2 w-2 rounded-full"
          style={{
            background: "var(--color-pink-pulse)",
            boxShadow: "0 0 10px var(--color-pink-pulse), 0 0 4px var(--color-violet)",
          }}
        />
      </m.div>
    </div>
  );
}
