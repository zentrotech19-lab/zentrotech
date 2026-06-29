"use client";

import { useEffect, useRef } from "react";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * LeakMeter — the "Live Leak Meter" strip that sits in the audit form card header.
 * Four segments (Business type / Biggest leak / Missed-per-month / Consent) ignite
 * as their field fills. A live "₹ leaking/month" figure is driven by a LOCAL, re-
 * targetable useSpring — repointed on every field change via a vertical × missed-range
 * lookup table (NOT CountUp, because CountUp fires once).
 *
 * Reduced-motion: segments snap on/off, the ₹ figure snaps to its target (no spring),
 * no pulse-glow loops.
 */

const SEGMENTS = ["Business type", "Biggest leak", "Missed/month", "Consent"] as const;

const SPRING = { stiffness: 60, damping: 20 } as const;

export type LeakMeterFields = {
  vertical: string;
  biggestLeak: string;
  monthlyMissed: string;
  consent: boolean;
};

// Per-vertical average ₹ value of ONE lost lead (rough, vertical-aware proxies).
const VERTICAL_LEAD_VALUE: Record<string, number> = {
  "Clinic / Healthcare": 4500,
  "Salon / Spa": 1800,
  "Real estate / Sub-broker": 35000,
  "Coaching / Education": 9000,
  "Repair / Home services": 2500,
  "Gym / Fitness": 6000,
  "CA / Legal / Architect": 15000,
  "Restaurant / Cloud kitchen": 1200,
  "Other local business": 3500,
};
const DEFAULT_LEAD_VALUE = 4000;

// Midpoint of the "missed enquiries / month" range the owner picks.
const MISSED_MIDPOINT: Record<string, number> = {
  "0-10": 5,
  "10-30": 20,
  "30-100": 60,
  "100+": 130,
  "No idea": 25,
};
const DEFAULT_MISSED = 15;

// Only a fraction of missed enquiries would have actually converted → recoverable ₹.
const CONVERT_RATE = 0.22;

function computeLeak(fields: LeakMeterFields): number {
  // Nothing chosen yet → keep the meter dark.
  if (!fields.vertical && !fields.biggestLeak && !fields.monthlyMissed) return 0;
  const leadValue = VERTICAL_LEAD_VALUE[fields.vertical] ?? DEFAULT_LEAD_VALUE;
  const missed = MISSED_MIDPOINT[fields.monthlyMissed] ?? DEFAULT_MISSED;
  // Picking a "biggest leak" sharpens the estimate a touch (a known leak channel).
  const leakWeight = fields.biggestLeak ? 1 : 0.7;
  return Math.round(leadValue * missed * CONVERT_RATE * leakWeight);
}

export function LeakMeter({ fields }: { fields: LeakMeterFields }) {
  const reduce = usePrefersReducedMotion();

  const lit: boolean[] = [
    !!fields.vertical,
    !!fields.biggestLeak,
    !!fields.monthlyMissed,
    fields.consent === true,
  ];
  const litCount = lit.filter(Boolean).length;
  const allLit = litCount === 4;
  const target = computeLeak(fields);

  // LOCAL re-targetable spring for the ₹ figure — repointed on every field change.
  const mv = useMotionValue(0);
  const spring = useSpring(mv, SPRING);
  const display = useTransform(spring, (latest) =>
    Math.max(0, Math.round(latest)).toLocaleString("en-IN")
  );

  useEffect(() => {
    if (reduce) {
      mv.set(target);
      return;
    }
    mv.set(target);
  }, [target, mv, reduce]);

  // One-time pulse on the whole strip when the 4th segment lights up.
  const firedFull = useRef(false);
  const stripPulse = !reduce && allLit && !firedFull.current;
  useEffect(() => {
    if (allLit) firedFull.current = true;
    else firedFull.current = false;
  }, [allLit]);

  return (
    <div className={cn("rounded-2xl border border-white/10 bg-white/[0.03] p-4", stripPulse && "pulse-glow")}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-glow">
          Live leak meter
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {litCount}/4 mapped
        </span>
      </div>

      {/* Segment bar — each segment scaleX-ignites from the left as its field fills. */}
      <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden="true">
        {SEGMENTS.map((label, i) => (
          <div key={label} className="relative h-1.5 overflow-hidden rounded-full bg-white/8">
            <m.div
              className={cn(
                "absolute inset-0 origin-left rounded-full",
                "bg-gradient-to-r from-indigo via-violet to-pink-pulse",
                lit[i] && !reduce && "pulse-glow"
              )}
              initial={false}
              animate={{ scaleX: lit[i] ? 1 : 0, opacity: lit[i] ? 1 : 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.26, ease: [0.21, 0.47, 0.32, 0.98] }}
            />
          </div>
        ))}
      </div>

      {/* Live ₹ figure — driven by the local re-targetable spring. */}
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <p className="text-xs text-text-muted leading-snug">
          Estimated leaking{allLit ? "" : " so far"}
        </p>
        <p className="text-right text-2xl font-black tracking-tight tabular-nums text-white min-w-[7.5ch]">
          <span className="text-aurora">₹</span>
          {reduce ? (
            <span>{Math.max(0, target).toLocaleString("en-IN")}</span>
          ) : (
            <m.span>{display}</m.span>
          )}
          <span className="ml-1 text-xs font-medium text-text-muted">/mo</span>
        </p>
      </div>
    </div>
  );
}
