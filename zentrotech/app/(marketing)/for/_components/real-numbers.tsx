"use client";

import { CountUp } from "@/components/animations/count-up";
import { Reveal } from "@/components/animations/reveal";
import { RecoveredCall, type RecoveredCallProps } from "./recovered-call";

/**
 * A flanking stat card. If `count` is supplied the headline animates with CountUp,
 * otherwise the (non-numeric) headline string renders as-is.
 */
export interface FlankStat {
  /** Numeric headline to CountUp to (omit for non-numeric headlines). */
  count?: number;
  prefix?: string;
  suffix?: string;
  /** Fallback / non-numeric headline (e.g. "9pm calls answered"). */
  headline?: string;
  label: string;
  body: string;
}

/**
 * RealNumbers — the "Real Numbers" section for /for/* pages.
 * Renders a left flanking stat, the animated <RecoveredCall> in the middle,
 * and a right flanking stat. Headers/animations live in the page; this owns
 * the 3-up grid only.
 */
export function RealNumbers({
  left,
  right,
  recovered,
}: {
  left: FlankStat;
  right: FlankStat;
  recovered: RecoveredCallProps;
}) {
  return (
    <div className="mt-10 grid md:grid-cols-3 gap-5 items-stretch">
      <Reveal>
        <FlankCard {...left} />
      </Reveal>
      <Reveal delay={0.08}>
        <RecoveredCall {...recovered} />
      </Reveal>
      <Reveal delay={0.16}>
        <FlankCard {...right} />
      </Reveal>
    </div>
  );
}

function FlankCard({ count, prefix, suffix, headline, label, body }: FlankStat) {
  return (
    <div className="glass-glow rounded-2xl p-8 h-full">
      {count != null ? (
        <CountUp
          value={count}
          prefix={prefix}
          suffix={suffix}
          className="block text-5xl md:text-6xl font-black text-aurora tracking-tight tabular-nums"
        />
      ) : (
        <div className="text-4xl md:text-5xl font-black text-aurora tracking-tight">{headline}</div>
      )}
      <div className="mt-3 text-white font-semibold">{label}</div>
      <p className="mt-3 text-text-muted text-sm leading-relaxed">{body}</p>
    </div>
  );
}
