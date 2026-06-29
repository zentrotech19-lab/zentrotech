"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Check, Brain, Database, PenLine } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/** The three labeled phases the agent moves through while it "thinks". */
const STEPS = [
  { label: "Reasoning", Icon: Brain },
  { label: "Querying knowledge base", Icon: Database },
  { label: "Composing answer", Icon: PenLine },
] as const;

/**
 * AgentReasoningTrace — replaces the bare 3-dot typing indicator inside the
 * AgentChatDemo. Three LABELED status rows (Reasoning → Querying knowledge
 * base → Composing answer) Stagger in (~300ms apart). A thin aurora connector
 * draws DOWN via scaleY (origin top) on a gradient bar. The active row's dot
 * runs .pulse-glow; rows that the timeline has passed snap to a cyan check.
 *
 * No new timers: the parent's existing 1100ms timer unmounts the whole trace
 * (via AnimatePresence) when the real reply lands. We only sequence the row
 * highlight locally so the labels feel alive across that single window.
 *
 * Reduced-motion: all rows render at once, connector full-height, no pulse.
 * Identity of this page = labeled rows (NO round dots).
 */
export function AgentReasoningTrace({ active }: { active: boolean }) {
  const reduce = usePrefersReducedMotion();
  // Which row is currently "in progress". Earlier rows = completed (check),
  // later rows = pending. Reduced-motion: jump straight to the last row.
  const [step, setStep] = useState(reduce ? STEPS.length - 1 : 0);

  useEffect(() => {
    if (!active) {
      setStep(reduce ? STEPS.length - 1 : 0);
      return;
    }
    if (reduce) {
      setStep(STEPS.length - 1);
      return;
    }
    // Local highlight sequence only — independent of the parent reply timer,
    // and short enough to finish inside the 1100ms window.
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStep(1), 340));
    timers.push(setTimeout(() => setStep(2), 700));
    return () => timers.forEach(clearTimeout);
  }, [active, reduce]);

  return (
    <m.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -6, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex gap-3"
    >
      <div className="size-8 rounded-full bg-indigo/20 flex items-center justify-center shrink-0">
        <Brain aria-hidden="true" className="size-4 text-indigo-glow" />
      </div>

      <div className="glass relative rounded-2xl px-4 py-3" role="status" aria-live="polite">
        <span className="sr-only">Agent is {STEPS[step].label.toLowerCase()}</span>

        {/* Aurora connector — a thin gradient spine that draws DOWN (scaleY,
            origin top). Sits behind the row markers, spanning row 1 → row 3. */}
        <div className="absolute left-[1.4rem] top-7 bottom-7 w-px overflow-hidden" aria-hidden="true">
          <m.div
            className="h-full w-full origin-top bg-linear-to-b from-indigo-glow via-pink-pulse to-cyan-glow"
            initial={reduce ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </div>

        <div className="space-y-3">
          {STEPS.map((s, i) => {
            const done = i < step;
            const isActive = i === step;
            const Icon = s.Icon;
            return (
              <m.div
                key={s.label}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: reduce ? 0 : i * 0.3 }}
                className="relative z-10 flex items-center gap-3"
              >
                {/* Marker: completed → cyan check; active → pulsing icon tile;
                    pending → dim icon tile. NO bare round dots (page identity). */}
                <span
                  className={[
                    "grid size-7 shrink-0 place-items-center rounded-full border transition-colors",
                    done
                      ? "border-cyan-glow/50 bg-cyan-glow/15 text-cyan-glow"
                      : isActive
                        ? "border-indigo-glow/50 bg-indigo/25 text-indigo-glow"
                        : "border-white/10 bg-white/5 text-text-muted",
                    isActive && !reduce ? "pulse-glow" : "",
                  ].join(" ")}
                >
                  {done ? (
                    <m.span
                      initial={reduce ? false : { scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.25, ease: EASE }}
                    >
                      <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
                    </m.span>
                  ) : (
                    <Icon aria-hidden="true" className="size-3.5" />
                  )}
                </span>
                <span
                  className={[
                    "text-sm transition-colors",
                    done ? "text-text-secondary" : isActive ? "text-white" : "text-text-muted",
                  ].join(" ")}
                >
                  {s.label}
                </span>
              </m.div>
            );
          })}
        </div>
      </div>
    </m.div>
  );
}
