"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/animations/count-up";
import { DrawLine } from "@/components/animations/draw-line";
import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { SOCIAL } from "@/lib/constants";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/** Timeline phases — drive what is visible in the chat thread. */
type Phase = "outgoing" | "delivered" | "typing" | "reply";

const NEXT_STEPS = [
  "We review your requirements — within 4 business hours.",
  "We WhatsApp or call you to clarify any gaps.",
  "We send a written proposal: scope, timeline, exact ₹ figures.",
  "If aligned, we kick off with a 30-minute call.",
] as const;

/**
 * ReplySequence — the post-submit "ReplyInFifteen" chat sequence.
 * Mounts ONLY when status === 'sent' (gated by the parent), so the timeline
 * never plays on page load. Self-terminating (~2.5s): outgoing bubble →
 * delivered double-tick → typing bubble (the only loop, capped) → reply
 * bubble → "What happens next" Stagger. Reduced-motion jumps straight to the
 * final static state.
 */
export function ReplySequence() {
  const reduce = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduce ? "reply" : "outgoing");

  useEffect(() => {
    if (reduce) {
      setPhase("reply");
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("delivered"), 650));
    timers.push(setTimeout(() => setPhase("typing"), 1150));
    timers.push(setTimeout(() => setPhase("reply"), 2500));
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  const delivered = phase === "delivered" || phase === "typing" || phase === "reply";
  const showTyping = phase === "typing";
  const showReply = phase === "reply";

  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-xl">
          {/* Chat thread */}
          <div className="glass-glow rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-indigo to-violet text-white">
                <FaWhatsapp className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">ZentroTECH</p>
                <p className="text-xs text-text-muted">replies in ~15 min</p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-text-muted">
                <span className="pulse-glow size-2 rounded-full bg-emerald-400" aria-hidden="true" />
                online
              </span>
            </div>

            <div className="space-y-3 pt-5" aria-live="polite">
              {/* 1 — outgoing "Requirements sent" bubble */}
              <m.div
                className="flex justify-end"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-gradient-to-br from-indigo to-violet px-4 py-3 text-sm text-white shadow-lg">
                  <span className="inline-flex items-center gap-2">
                    Requirements sent
                    <CheckBadge active />
                  </span>
                  {/* 2 — delivered double-tick */}
                  <span className="mt-1 flex items-center justify-end gap-0.5 text-[10px] text-white/70">
                    <DoubleTick drawn={delivered} reduce={reduce} />
                  </span>
                </div>
              </m.div>

              {/* 3 — typing bubble (the ONLY loop; ends when reply mounts) */}
              <AnimatePresence>
                {showTyping && (
                  <m.div
                    key="typing"
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white/8 px-4 py-3.5">
                      {[0, 1, 2].map((i) => (
                        <m.span
                          key={i}
                          className="block size-2 rounded-full bg-text-secondary"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.18,
                          }}
                        />
                      ))}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>

              {/* 4 — incoming reply bubble (crossfade in) */}
              <AnimatePresence>
                {showReply && (
                  <m.div
                    key="reply"
                    className="flex justify-start"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <div className="max-w-[85%] space-y-3 rounded-2xl rounded-bl-sm bg-white/8 px-4 py-3 text-sm text-text-secondary">
                      <p>
                        Got it — we have your requirements. A human is reviewing
                        them now and will reply personally.
                      </p>
                      {/* 6 — CountUp "15" in the reply chip */}
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo/30 bg-indigo/10 px-3 py-1 text-xs font-semibold text-indigo-glow">
                        Typical reply in
                        <CountUp
                          value={15}
                          suffix=" min"
                          className="tabular-nums"
                        />
                      </span>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Headline + WhatsApp shortcut */}
          <AnimatePresence>
            {showReply && (
              <m.div
                key="post-reply"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              >
                <div className="mt-10 text-center">
                  <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                    Got it. <span className="text-aurora">We&apos;re on it.</span>
                  </h1>
                  <p className="mx-auto mt-3 max-w-md text-text-secondary">
                    In a hurry? Skip the queue and ping us directly.
                  </p>
                  <div className="mt-6">
                    <Button href={SOCIAL.whatsapp} size="lg" external>
                      <FaWhatsapp className="size-5" />
                      Open WhatsApp
                    </Button>
                  </div>
                </div>

                {/* 5 — "What happens next" Stagger + vertical DrawLine connector */}
                <div className="relative mt-12 pl-2">
                  <p className="mb-5 text-xs font-mono uppercase tracking-widest text-indigo-glow">
                    What happens next
                  </p>
                  <div className="relative">
                    <DrawLine className="left-[15px] top-2 bottom-2" />
                    <Stagger className="space-y-5">
                      {NEXT_STEPS.map((step, i) => (
                        <StaggerItem key={step}>
                          <div className="flex items-start gap-4">
                            <span className="pulse-glow relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-indigo/40 bg-gradient-to-br from-indigo/30 to-violet/20 text-xs font-bold text-indigo-glow">
                              {i + 1}
                            </span>
                            <p className="pt-1 text-sm text-text-secondary">{step}</p>
                          </div>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

/** Small inline checkmark used on the outgoing bubble label. */
function CheckBadge({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden="true">
      <m.path
        d="M3 8.5L6.5 12L13 4.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: active ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />
    </svg>
  );
}

/** Delivered double-tick — two short checks that draw on delivery. */
function DoubleTick({ drawn, reduce }: { drawn: boolean; reduce: boolean }) {
  const target = drawn ? 1 : 0;
  return (
    <svg viewBox="0 0 22 12" className="h-3 w-[18px]" fill="none" aria-label="Delivered">
      <m.path
        d="M1 6.5L4.5 10L11 2.5"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: target }}
        transition={{ duration: 0.3, ease: EASE }}
      />
      <m.path
        d="M8 6.5L11.5 10L18 2.5"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: target }}
        transition={{ duration: 0.3, ease: EASE, delay: reduce ? 0 : 0.18 }}
      />
    </svg>
  );
}
