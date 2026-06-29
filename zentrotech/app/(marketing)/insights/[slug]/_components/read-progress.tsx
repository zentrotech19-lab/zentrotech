"use client";

import { m, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const R = 18;
const CIRC = 2 * Math.PI * R;

/**
 * ReadProgress — the visible read-through UI driven by ONE shared scroll
 * MotionValue (created in ArticleShell from useScroll on the articleRef):
 *  1. a fixed 3px top "aurora" bar (scaleX, origin-left) with a leading-edge glow dot.
 *  2. a 44px bottom-right SVG dial (m.circle pathLength=progress) with a center %
 *     label and a check-pop at 100%.
 * The dial fades in only after >4% progress. Reduced-motion: bar sits full, dial hidden.
 */
export function ReadProgress({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      setPct(Math.min(100, Math.max(0, Math.round(v * 100))));
    });
    return () => unsub();
  }, [progress]);

  // Dial visibility: only after >4% read. Use a small spring-free opacity ramp.
  const dialOpacity = useTransform(progress, [0.04, 0.08], [0, 1]);
  const done = pct >= 100;

  const auroraBar = "linear-gradient(to right, #06b6d4, #6366f1, #8b5cf6, #ec4899)";

  if (reduce) {
    // Static final state: full bar, no floating dial (avoids motion).
    return (
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
        style={{ background: auroraBar }}
      />
    );
  }

  return (
    <>
      {/* Top aurora bar */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[3px]"
      >
        <m.div
          className="relative h-full w-full origin-left"
          style={{ scaleX: progress, background: auroraBar }}
        >
          {/* Leading-edge glow dot pinned to the bar's right edge */}
          <span className="pulse-glow absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-pink-pulse shadow-[0_0_10px_3px_rgba(236,72,153,0.6)]" />
        </m.div>
      </div>

      {/* Bottom-right dial */}
      <m.div
        aria-hidden="true"
        style={{ opacity: dialOpacity }}
        className="fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-void/70 backdrop-blur-sm ring-1 ring-white/10"
      >
        <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
          <circle
            cx="22"
            cy="22"
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="3"
          />
          <m.circle
            cx="22"
            cy="22"
            r={R}
            fill="none"
            stroke="#ec4899"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            style={{ pathLength: progress }}
          />
        </svg>
        <span className="pointer-events-none absolute grid place-items-center">
          {done ? (
            <m.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <m.path
                d="M5 12.5l4 4 10-10"
                stroke="#34d399"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </m.svg>
          ) : (
            <span className="text-[10px] font-bold tabular-nums text-white">
              {pct}
            </span>
          )}
        </span>
      </m.div>
    </>
  );
}
