"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView, type Variants } from "framer-motion";
import { CountUp } from "@/components/animations/count-up";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { REACH_NODES, type ReachNode } from "./reach-nodes";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Local stagger variants — radiate the neighbourhood pins out from the centre.
const pinsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
};
const pinItem: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.7 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

/**
 * HQReachMap — "HQ Reach Map".
 * One scroll-into-view trigger starts a hand-rolled timeline (DrawLine can't do
 * radial / per-node connectors, so the SVG is built locally):
 *  1. HQ pin scales 0.6→1 + a one-shot `.pulse-glow` aurora ring fires once;
 *  2. radial connectors draw HQ→~10 named localities via m.line strokeDashoffset
 *     1→0, each slightly staggered;
 *  3. each neighbourhood pin ignites (opacity 0→1, y 8→0, scale 0.7→1) in a
 *     local Stagger radiating from the centre;
 *  4. CountUp ticks "60+ neighbourhoods" as the pins finish.
 *
 * Reduced motion: everything renders in its final lit/static state — connectors
 * fully drawn, pins visible, ring static, CountUp snaps to value.
 */
export function HQReachMap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [started, setStarted] = useState(false);
  const [ringPulsing, setRingPulsing] = useState(false);

  useEffect(() => {
    if (reduce) {
      setStarted(true);
      return;
    }
    if (inView) {
      setStarted(true);
      setRingPulsing(true);
    }
  }, [inView, reduce]);

  const hq = REACH_NODES.find((n) => n.isHQ) ?? REACH_NODES[0];
  const spokes = REACH_NODES.filter((n) => !n.isHQ);
  const active = reduce || started;

  return (
    <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2">
      {/* Map canvas */}
      <div className="relative mx-auto aspect-square w-full max-w-xl">
        {/* Connector layer — radial SVG from HQ to each locality */}
        <svg
          className="absolute inset-0 size-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="reach-aurora" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          {spokes.map((node, i) => (
            <Connector
              key={node.label}
              hq={hq}
              node={node}
              index={i}
              total={spokes.length}
              active={active}
              reduce={reduce}
            />
          ))}
        </svg>

        {/* HQ pin (centre) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${hq.xPct}%`, top: `${hq.yPct}%` }}
        >
          {/* One-shot aurora pulse ring */}
          <span
            aria-hidden
            className={[
              "absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full",
              "bg-[radial-gradient(circle,rgba(99,102,241,0.45),transparent_70%)]",
              !reduce && ringPulsing ? "pulse-glow" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={
              reduce
                ? { opacity: 0.55 }
                : ringPulsing
                  ? { animationIterationCount: 1 }
                  : { opacity: 0.55 }
            }
            onAnimationEnd={() => setRingPulsing(false)}
          />
          <m.div
            className="relative flex size-7 items-center justify-center rounded-full bg-linear-to-br from-indigo to-violet shadow-[0_0_24px_rgba(99,102,241,0.7)] ring-2 ring-white/30"
            initial={false}
            animate={active ? { scale: 1 } : { scale: 0.6 }}
            transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
          >
            <span className="size-2 rounded-full bg-white" />
          </m.div>
          <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-indigo/30 bg-void/70 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
            Headquarters · Koramangala
          </span>
        </div>

        {/* Neighbourhood pins — local Stagger ignites them radiating outward */}
        <m.div
          className="absolute inset-0 z-10"
          variants={pinsContainer}
          initial="hidden"
          animate={active ? "show" : "hidden"}
        >
          {spokes.map((node) => (
            <m.div
              key={node.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.xPct}%`, top: `${node.yPct}%` }}
              variants={reduce ? undefined : pinItem}
            >
              <span className="flex flex-col items-center">
                <span className="size-3 rounded-full bg-indigo-glow shadow-[0_0_12px_rgba(99,102,241,0.6)] ring-2 ring-white/20" />
                <span className="mt-1 whitespace-nowrap rounded-full border border-white/10 bg-void/60 px-2 py-0.5 text-[10px] font-medium text-text-secondary backdrop-blur">
                  {node.label}
                </span>
              </span>
            </m.div>
          ))}
        </m.div>
      </div>

      {/* Copy + count */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-indigo-glow">
          One office. City-wide reach.
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
          From Koramangala to every tech corridor in Bangalore.
        </h2>
        <p className="mt-6 text-lg text-text-secondary">
          Our engineers work on-site across the city — from MG Road and
          Indiranagar to Whitefield, the Outer Ring Road belt, HSR Layout, and
          the Electronic City corridor. Wherever your team sits, an in-person
          discovery workshop and weekly demos are a short drive away.
        </p>

        <div className="mt-8 flex items-baseline gap-3">
          <CountUp
            value={60}
            suffix="+"
            className="inline-block min-w-[3.5ch] text-5xl font-black tabular-nums text-aurora md:text-6xl"
          />
          <span className="text-lg font-semibold text-text-secondary">
            neighbourhoods served across Bangalore
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Connector — a single HQ→locality line that draws itself (strokeDashoffset
 * 1→0) once the shared timeline starts. Each gets a small stagger via delay.
 */
function Connector({
  hq,
  node,
  index,
  total,
  active,
  reduce,
}: {
  hq: ReachNode;
  node: ReachNode;
  index: number;
  total: number;
  active: boolean;
  reduce: boolean;
}) {
  // Slight inward trim so lines start/end near the pin edges, not centres.
  const t = 0.12;
  const x1 = hq.xPct + (node.xPct - hq.xPct) * t;
  const y1 = hq.yPct + (node.yPct - hq.yPct) * t;
  const x2 = hq.xPct + (node.xPct - hq.xPct) * (1 - t);
  const y2 = hq.yPct + (node.yPct - hq.yPct) * (1 - t);

  return (
    <m.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="url(#reach-aurora)"
      strokeWidth={0.5}
      strokeLinecap="round"
      opacity={0.7}
      pathLength={1}
      strokeDasharray={1}
      initial={false}
      animate={{ strokeDashoffset: active ? 0 : 1 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.5, ease: EASE, delay: 0.35 + (index / total) * 0.5 }
      }
    />
  );
}
