"use client";

import { useRef, type ReactNode } from "react";
import { m, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * ShimmerOnce — sweeps a single light-shine across its children when scrolled
 * into view, then stops (one-shot, unlike the infinite .shimmer CSS utility).
 * Reduced-motion: renders the text with no sweep.
 */
export function ShimmerOnce({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  if (reduce) {
    return (
      <span ref={ref} className={className}>
        {children}
      </span>
    );
  }

  return (
    <span ref={ref} className={`relative inline-block overflow-hidden ${className ?? ""}`}>
      {children}
      <m.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
        }}
        initial={{ x: "-110%" }}
        animate={inView ? { x: "110%" } : { x: "-110%" }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.3 }}
      />
    </span>
  );
}
