"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tilt } from "@/components/animations/tilt";
import { CountUp } from "@/components/animations/count-up";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { parseResultValue } from "./parse-result-value";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function ResultCard({
  label,
  value,
  index,
}: {
  label: string;
  value: string;
  index: number;
}) {
  const isHeadline = index === 0;
  const reduce = usePrefersReducedMotion();
  const { prefix, number, suffix, decimals } = parseResultValue(value);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [swept, setSwept] = useState(false);

  // One-time shimmer sweep on the headline card, fired after the CountUp settles.
  useEffect(() => {
    if (!isHeadline || reduce || !inView || swept) return;
    const t = setTimeout(() => setSwept(true), 1100);
    return () => clearTimeout(t);
  }, [isHeadline, reduce, inView, swept]);

  const inner = (
    <Card
      glow={isHeadline}
      className={`relative overflow-hidden text-center ${isHeadline ? "ring-1 ring-indigo/40" : ""} h-full`}
    >
      {/* One-time shine sweep — headline only, after the number lands. */}
      {isHeadline && swept && !reduce && (
        <m.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
          }}
        />
      )}

      <p
        className="text-3xl font-black text-aurora tabular-nums"
        style={{ minWidth: "4ch" }}
      >
        <CountUp
          value={number}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </p>
      <p className="mt-2 text-xs uppercase tracking-widest text-text-muted">
        {label}
      </p>
    </Card>
  );

  // Non-headline cards get a desktop tilt; headline stays flat to keep the ring/shine crisp.
  return (
    <div ref={ref} className="h-full">
      {isHeadline ? inner : <Tilt className="h-full">{inner}</Tilt>}
    </div>
  );
}
