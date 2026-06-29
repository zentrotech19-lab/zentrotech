"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * ArticleSpine — a thin scroll-linked vertical line that draws as the reader
 * scrolls the case-study body. Decorative; hidden on small screens.
 * Reduced-motion: renders a static full-height line.
 */
export function ArticleSpine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 hidden md:block"
    >
      <svg width="2" height="100%" viewBox="0 0 2 100" preserveAspectRatio="none" className="h-full">
        <line x1="1" y1="0" x2="1" y2="100" stroke="var(--color-border-subtle)" strokeWidth="2" />
        <m.line
          x1="1"
          y1="0"
          x2="1"
          y2="100"
          stroke="var(--color-indigo)"
          strokeWidth="2"
          pathLength={1}
          style={{ pathLength: reduce ? 1 : pathLength }}
        />
      </svg>
    </div>
  );
}
