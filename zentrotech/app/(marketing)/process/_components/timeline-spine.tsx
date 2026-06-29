"use client";

import { useRef } from "react";
import {
  m,
  useScroll,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "@/components/animations/reveal";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { PhaseNode } from "./phase-node";

export interface Phase {
  days: string;
  title: string;
  accent: string;
  bullets: readonly string[];
}

/**
 * TimelineSpine — "The 21-Day Clock".
 * One shared useScroll on the phase-stack container drives everything:
 *  (a) a vertical aurora SVG spine drawing top→bottom (m.path strokeDashoffset
 *      — hand-rolled because DrawLine can't render a gradient stroke path);
 *  (b) each phase node ignite (scale 0.6→1, dim ring → aurora glow);
 *  (c) each card accent bar scaleX 0→1 (origin-left) via useTransform slices
 *      of the same progress.
 * The final (Day-21) node fires a one-shot ring-ping.
 *
 * Markup renders fully lit by default. Reduced motion → static lit: we feed a
 * constant progress of 1 so nodes/spine/bars sit at their final state and the
 * cards just appear (no spine animation, Reveal degrades to a plain div).
 */
export function TimelineSpine({ phases }: { phases: readonly Phase[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  // Shared scroll progress for the whole phase stack.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });

  // Static "fully lit" progress for reduced motion.
  const staticProgress = useMotionValue(1);
  const progress = reduce ? staticProgress : scrollYProgress;

  // Spine path draw: strokeDashoffset 1 → 0 across the full progress.
  const dashOffset = useTransform(progress, [0, 1], [1, 0]);

  const n = phases.length;

  return (
    <div ref={ref} className="relative">
      {/* Aurora spine — sits in the left gutter, behind the nodes.
          Hidden on mobile where the stacked cards don't share a rail. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-[13px] hidden w-px md:block"
        aria-hidden
      >
        <svg
          className="size-full overflow-visible"
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="spine-aurora" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="35%" stopColor="#6366f1" />
              <stop offset="70%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          {/* Dim rail underneath */}
          <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          {/* Drawing aurora stroke (pathLength normalized to 1 → dash math is unit-based) */}
          <m.line
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="url(#spine-aurora)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            style={{ strokeDashoffset: reduce ? 0 : dashOffset }}
          />
        </svg>
      </div>

      <div className="space-y-6">
        {phases.map((phase, i) => {
          // This phase's slice of the overall progress.
          const start = i / n;
          const end = (i + 1) / n;
          return (
            <PhaseCard
              key={phase.title}
              phase={phase}
              index={i}
              progress={progress}
              start={start}
              end={end}
              isFinal={i === n - 1}
              reduce={reduce}
            />
          );
        })}
      </div>
    </div>
  );
}

function PhaseCard({
  phase,
  index,
  progress,
  start,
  end,
  isFinal,
  reduce,
}: {
  phase: Phase;
  index: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
  isFinal: boolean;
  reduce: boolean;
}) {
  // Accent bar grows origin-left across this phase's progress slice.
  const barScaleX = useTransform(progress, [start, end], [0, 1]);

  return (
    <Reveal y={28} delay={index * 0.04}>
      <div className="relative grid grid-cols-[28px_1fr] gap-4 md:gap-6">
        {/* Node sits on the spine */}
        <div className="flex justify-center pt-1">
          <PhaseNode progress={progress} start={start} end={end} isFinal={isFinal} />
        </div>

        {/* Card */}
        <div className="group relative glass overflow-hidden rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 hover:border-indigo/40 md:p-10">
          {/* Accent bar — top edge, scaleX origin-left */}
          <m.div
            className={`absolute inset-x-0 top-0 h-1 origin-left rounded-t-3xl bg-linear-to-r ${phase.accent}`}
            style={{ scaleX: reduce ? 1 : barScaleX }}
            aria-hidden
          />
          <div className="grid gap-6 md:grid-cols-[200px_1fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-indigo-glow">
                Phase {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-2xl font-black text-white">{phase.days}</p>
              <p className="mt-1 bg-linear-to-r from-indigo-glow to-violet bg-clip-text text-xl font-bold text-transparent">
                {phase.title}
              </p>
            </div>
            <ul className="space-y-2 text-text-secondary">
              {phase.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-0.5 text-indigo-glow" aria-hidden>
                    ✓
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
