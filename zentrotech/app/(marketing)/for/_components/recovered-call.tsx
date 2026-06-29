"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView } from "framer-motion";
import { CountUp } from "@/components/animations/count-up";
import { DrawLine } from "@/components/animations/draw-line";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * RecoveredCall — the centrepiece stat card on /for/* vertical pages.
 *
 * A 3-beat, once-in-view cinematic:
 *   1. RING    — a phone glyph emits 3 expanding aurora ring waves (scale 1→1.6,
 *                opacity 0.5→0), then the glyph desaturates ≈250ms = the call is missed.
 *   2. ANSWER  — snaps to aurora + a firm .pulse-glow; a local-language greeting
 *                types in char-by-char with an English subtitle (min-height reserved).
 *   3. RECOVER — CountUp ₹0 → per-vertical target over ≈1.8s in aurora text, with a
 *                horizontal DrawLine sweep beneath.
 *
 * Reduced-motion: renders the final RECOVER state immediately (answered glyph,
 * full greeting + subtitle, target value, full underline) with no timers.
 */

type Beat = "ring" | "answer" | "recover";

export interface RecoveredCallProps {
  /** Short language label, e.g. "Kannada", "Hindi · Kannada". */
  language: string;
  /** Local-language greeting that types in char-by-char. */
  greeting: string;
  /** English subtitle shown under the greeting. */
  subtitle: string;
  /** What's being lost while the call goes unanswered, e.g. "₹5K–₹50K per missed call". */
  lostRange: string;
  /** The recovered ₹ target the counter climbs to. */
  recovered: number;
  className?: string;
}

function PhoneGlyph({ answered }: { answered: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-7"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      {answered && <path d="M16 4.5l1.6 1.6L21 2.7" className="text-pink-pulse" />}
    </svg>
  );
}

export function RecoveredCall({
  language,
  greeting,
  subtitle,
  lostRange,
  recovered,
  className,
}: RecoveredCallProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [beat, setBeat] = useState<Beat>("ring");
  const [missed, setMissed] = useState(false);
  const [typed, setTyped] = useState("");

  // Drive the 3-beat timeline once, when the card scrolls into view.
  useEffect(() => {
    if (reduce || !inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    // RING for ~1.8s, then desaturate (missed) ~250ms, then ANSWER.
    timers.push(setTimeout(() => setMissed(true), 1800));
    timers.push(setTimeout(() => setBeat("answer"), 2050));
    // ANSWER greeting types in; after it lands, move to RECOVER.
    timers.push(setTimeout(() => setBeat("recover"), 2050 + greeting.length * 55 + 700));
    return () => timers.forEach(clearTimeout);
  }, [reduce, inView, greeting.length]);

  // Char-by-char greeting once we're in (or past) the ANSWER beat.
  useEffect(() => {
    if (reduce) {
      setTyped(greeting);
      return;
    }
    if (beat === "ring") return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(greeting.slice(0, i));
      if (i >= greeting.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [beat, greeting, reduce]);

  const answered = reduce || beat === "answer" || beat === "recover";
  const showRecover = reduce || beat === "recover";

  return (
    <div ref={ref} className={`glass-glow rounded-2xl p-8 ${className ?? ""}`}>
      {/* Beat label */}
      <div className="flex items-center justify-between">
        <span className="text-text-muted text-xs uppercase tracking-widest font-mono">
          The recovered call
        </span>
        <span className="text-indigo-glow text-xs uppercase tracking-widest font-mono">{language}</span>
      </div>

      {/* RING / ANSWER — phone glyph + ring waves */}
      <div className="mt-6 flex items-center gap-4">
        <div className="relative grid place-items-center size-14 shrink-0">
          {/* Expanding aurora ring waves — RING beat only */}
          {!reduce &&
            beat === "ring" &&
            [0, 0.45, 0.9].map((delay) => (
              <m.span
                key={delay}
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-indigo"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 1.35, delay, repeat: Infinity, ease: "easeOut" }}
              />
            ))}
          {/* The glyph itself: desaturated grey while missed, aurora + pulse once answered */}
          <m.div
            className={`relative grid place-items-center size-11 rounded-full ${
              answered ? "text-white pulse-glow" : missed ? "text-text-muted" : "text-indigo-glow"
            }`}
            style={{
              background: answered
                ? "linear-gradient(135deg, var(--color-indigo), var(--color-violet), var(--color-pink-pulse))"
                : missed
                ? "rgba(255,255,255,0.05)"
                : "rgba(99,102,241,0.12)",
            }}
            animate={reduce ? undefined : { scale: answered ? [1, 1.08, 1] : 1 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <PhoneGlyph answered={answered} />
          </m.div>
        </div>

        <div className="min-w-0">
          <div className="text-white font-semibold leading-tight">
            {answered ? "Answered — live" : missed ? "Missed call" : "Incoming call…"}
          </div>
          <div className="text-text-muted text-sm">
            {answered ? "Picked up in your customer’s language" : lostRange}
          </div>
        </div>
      </div>

      {/* ANSWER — greeting types in, English subtitle below. Min-height reserved (no CLS). */}
      <div className="mt-6 min-h-[4.5rem]">
        {answered && (
          <m.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="text-aurora text-xl md:text-2xl font-bold tracking-tight">
              {typed}
              {!reduce && beat === "answer" && typed.length < greeting.length && (
                <span className="text-indigo-glow animate-pulse">▍</span>
              )}
            </div>
            <div className="mt-1 text-text-secondary text-sm">{subtitle}</div>
          </m.div>
        )}
      </div>

      {/* RECOVER — counter climbs to target, DrawLine sweep beneath. Min-height reserved. */}
      <div className="relative mt-6 pt-6 border-t border-white/10 min-h-[5.5rem]">
        {showRecover ? (
          <m.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="text-text-muted text-xs uppercase tracking-widest font-mono">
              Recovered per month
            </div>
            <CountUp
              value={recovered}
              prefix="₹"
              className="mt-2 block text-4xl md:text-5xl font-black text-aurora tracking-tight tabular-nums"
            />
            <div className="relative mt-4 h-px">
              <DrawLine className="left-0 right-0 top-0" orientation="horizontal" />
            </div>
          </m.div>
        ) : (
          <div aria-hidden="true" className="text-text-muted text-xs uppercase tracking-widest font-mono">
            Recovered per month
          </div>
        )}
      </div>
    </div>
  );
}
