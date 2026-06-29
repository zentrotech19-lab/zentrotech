"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * PulseGlowOnce — runs the shared `.pulse-glow` keyframe a SINGLE time when the
 * element scrolls into view, then drops the class so it doesn't loop forever.
 * Reduced-motion: renders the child untouched.
 */
export function PulseGlowOnce({
  children,
  className,
  role,
}: {
  children: ReactNode;
  className?: string;
  role?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPulsing(true);
          io.disconnect();
        }
      },
      { rootMargin: "-60px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div
      ref={ref}
      role={role}
      className={[className, !reduce && pulsing ? "pulse-glow" : ""]
        .filter(Boolean)
        .join(" ")}
      style={!reduce && pulsing ? { animationIterationCount: 1 } : undefined}
      onAnimationEnd={() => setPulsing(false)}
    >
      {children}
    </div>
  );
}

/**
 * GradientPanOnce — runs the shared `.animate-gradient-pan` keyframe a SINGLE
 * time on enter for an inline gradient-clipped word (e.g. "AUDIT").
 * Reduced-motion: static gradient text, no animation.
 */
export function GradientPanOnce({ children }: { children: ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const [panning, setPanning] = useState(false);

  useEffect(() => {
    if (reduce) return;
    setPanning(true);
  }, [reduce]);

  return (
    <span
      className={[
        "text-aurora",
        !reduce && panning ? "animate-gradient-pan" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={!reduce && panning ? { animationIterationCount: 1 } : undefined}
      onAnimationEnd={() => setPanning(false)}
    >
      {children}
    </span>
  );
}
