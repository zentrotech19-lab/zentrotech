"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * DrawLine — a gradient line that draws itself as the user scrolls past it.
 * Place it absolutely inside a `relative` container (e.g. spanning a timeline's
 * steps): `<div className="relative">... <DrawLine className="left-5 top-0 bottom-0" /></div>`.
 * Reduced-motion: shows the full line immediately.
 */
export function DrawLine({
  className,
  orientation = "vertical",
}: {
  className?: string;
  orientation?: "vertical" | "horizontal";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 25%"] });
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const vertical = orientation === "vertical";
  const gradient = vertical
    ? "linear-gradient(to bottom, #06b6d4, #6366f1, #8b5cf6, #ec4899)"
    : "linear-gradient(to right, #06b6d4, #6366f1, #8b5cf6, #ec4899)";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute", vertical ? "w-px" : "h-px", className)}
    >
      <div className={cn("absolute inset-0", "bg-white/10")} />
      <m.div
        className="absolute inset-0"
        style={{
          background: gradient,
          ...(vertical
            ? { scaleY: reduce ? 1 : grow, transformOrigin: "top" }
            : { scaleX: reduce ? 1 : grow, transformOrigin: "left" }),
        }}
      />
    </div>
  );
}
