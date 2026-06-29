"use client";

import { useEffect, useRef } from "react";
import { m, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * CountUp — animates a number up to `value` when it scrolls into view.
 * Supports prefix (e.g. "₹"), suffix (e.g. "+", "%"), and decimals.
 * Reduced-motion: snaps to the final value instantly.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  locale = "en-IN",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  locale?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = usePrefersReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 55, damping: 22 });
  const fmt = (n: number) =>
    n.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const display = useTransform(spring, (latest) => fmt(latest));

  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    if (inView) mv.set(value);
  }, [inView, value, mv, reduce]);

  if (reduce) {
    return (
      <span ref={ref} className={className}>
        {prefix}
        {fmt(value)}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <m.span>{display}</m.span>
      {suffix}
    </span>
  );
}
