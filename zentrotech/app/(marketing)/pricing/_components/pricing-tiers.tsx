"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

export type Tier = {
  name: string;
  tagline: string;
  setup: string;
  monthly: string;
  delivery: string;
  accent: string;
  highlight: boolean;
  features: readonly string[];
};

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * PriceTally — for a string like "₹24,999 – ₹39,999 / mo" or "₹35,000 – ₹75,000",
 * runs a LOCAL useSpring counter on each numeric bound around a STATIC dash.
 * Non-numeric strings ("Included in retainer", "Scoped per engagement") render as-is.
 * Reduced-motion: snaps to final values. tabular-nums + reserved width = no CLS.
 */
function PriceTally({ value, className }: { value: string; className?: string }) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  // Capture every integer (grouping commas stripped) and remember the literal
  // surrounding text so prefixes/suffixes/dash render exactly as authored.
  const numbers: number[] = [];
  const parts: { text: string; isNum: boolean }[] = [];
  const re = /[\d,]+/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(value)) !== null) {
    if (match.index > last) parts.push({ text: value.slice(last, match.index), isNum: false });
    const n = Number(match[0].replace(/,/g, ""));
    parts.push({ text: match[0], isNum: true });
    numbers.push(n);
    last = match.index + match[0].length;
  }
  if (last < value.length) parts.push({ text: value.slice(last), isNum: false });

  // No numbers to animate (e.g. "Scoped per engagement") — render plain.
  if (numbers.length === 0) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  let numIdx = -1;
  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {parts.map((p, i) => {
        if (!p.isNum) return <span key={i}>{p.text}</span>;
        numIdx += 1;
        return <Bound key={i} target={numbers[numIdx]} inView={inView} reduce={reduce} />;
      })}
    </span>
  );
}

function Bound({
  target,
  inView,
  reduce,
}: {
  target: number;
  inView: boolean;
  reduce: boolean;
}) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 24 });
  const fmt = (n: number) =>
    Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
  const display = useTransform(spring, (latest) => fmt(latest));

  useEffect(() => {
    if (reduce) {
      mv.set(target);
      return;
    }
    if (inView) mv.set(target);
  }, [inView, target, mv, reduce]);

  if (reduce) return <span>{fmt(target)}</span>;
  return <m.span>{display}</m.span>;
}

/** Spring container that reveals its children L→R, settling under ~650ms. */
const gridV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};
const cardV = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function PricingTiers({ tiers }: { tiers: readonly Tier[] }) {
  const reduce = usePrefersReducedMotion();

  return (
    <m.div
      className="grid lg:grid-cols-3 gap-6"
      variants={reduce ? undefined : gridV}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-60px" }}
    >
      {tiers.map((tier) => (
        <TierCard key={tier.name} tier={tier} reduce={reduce} />
      ))}
    </m.div>
  );
}

function TierCard({ tier, reduce }: { tier: Tier; reduce: boolean }) {
  const [popped, setPopped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  // The Growth ("Most picked") card lands last → its badge pops once and the
  // glass-glow border pulses once. Fire when the card has revealed.
  useEffect(() => {
    if (!tier.highlight) return;
    if (reduce) {
      setPopped(true);
      return;
    }
    if (inView) {
      const t = setTimeout(() => setPopped(true), 520);
      return () => clearTimeout(t);
    }
  }, [tier.highlight, inView, reduce]);

  const Body = (
    <div
      ref={cardRef}
      className={`group relative rounded-3xl p-8 ${
        tier.highlight ? "glass-glow -translate-y-2" : "glass"
      } transition-all duration-300 hover:-translate-y-1 hover:border-indigo/40 flex flex-col h-full`}
    >
      {/* Gradient ribbon */}
      <div
        className={`absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-linear-to-r ${tier.accent}`}
        aria-hidden
      />

      {/* One-shot border-glow pulse for the highlighted card */}
      {tier.highlight && !reduce && (
        <m.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl"
          initial={{ opacity: 0, boxShadow: "0 0 0px rgba(99,102,241,0)" }}
          animate={
            popped
              ? {
                  opacity: [0, 1, 0],
                  boxShadow: [
                    "0 0 0px rgba(99,102,241,0)",
                    "0 0 60px rgba(99,102,241,0.55)",
                    "0 0 0px rgba(99,102,241,0)",
                  ],
                }
              : {}
          }
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      )}

      {tier.highlight &&
        (reduce ? (
          <span className="absolute -top-3 right-6 inline-flex items-center rounded-full bg-linear-to-r from-indigo to-violet px-3 py-1 text-xs font-bold text-white shadow-[0_0_30px_rgba(99,102,241,0.5)]">
            Most picked
          </span>
        ) : (
          <m.span
            className="absolute -top-3 right-6 inline-flex items-center rounded-full bg-linear-to-r from-indigo to-violet px-3 py-1 text-xs font-bold text-white shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            initial={{ scale: 0.8 }}
            animate={popped ? { scale: [0.8, 1.05, 1] } : { scale: 0.8 }}
            transition={{ duration: 0.45, ease: EASE, times: [0, 0.6, 1] }}
          >
            Most picked
          </m.span>
        ))}

      <h2 className="text-2xl font-black text-white">{tier.name}</h2>
      <p className="mt-2 text-sm text-text-muted leading-relaxed">{tier.tagline}</p>

      <div className="mt-6 space-y-1">
        <p className="text-xs uppercase tracking-widest text-indigo-glow font-mono">Setup</p>
        <PriceTally value={tier.setup} className="block text-xl font-bold text-white min-w-[11ch]" />
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-xs uppercase tracking-widest text-indigo-glow font-mono">Monthly</p>
        <PriceTally
          value={tier.monthly}
          className="block text-2xl font-black text-white min-w-[13ch]"
        />
      </div>
      <p className="mt-3 text-sm text-text-secondary">{tier.delivery}</p>

      <ul className="mt-6 space-y-2 text-sm text-text-secondary flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-indigo-glow mt-0.5" aria-hidden>
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          href="/contact"
          variant={tier.highlight ? "primary" : "secondary"}
          className="w-full"
        >
          Get a quote for {tier.name}
        </Button>
      </div>
    </div>
  );

  if (reduce) return <div className="h-full">{Body}</div>;

  return (
    <m.div variants={cardV} className="h-full">
      {Body}
    </m.div>
  );
}
