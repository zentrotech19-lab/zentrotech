"use client";
import { useEffect, useRef } from "react";
import { m, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

export function AnimatedCounter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = usePrefersReducedMotion();
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (reduce) {
      // Instantly snap to the final value — no spring run.
      count.set(value);
      return;
    }
    if (inView) count.set(value);
  }, [inView, value, count, reduce]);

  if (reduce) {
    return (
      <span ref={ref} className={className}>
        {value.toLocaleString()}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      <m.span>{display}</m.span>
      {suffix}
    </span>
  );
}
