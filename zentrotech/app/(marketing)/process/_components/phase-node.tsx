"use client";

import { m, useTransform, type MotionValue } from "framer-motion";

/**
 * PhaseNode — one ignitable node on the 21-day spine.
 * Driven by the shared scroll `progress` (0→1) from <TimelineSpine>.
 * `start`/`end` are this node's slice of the overall progress; the node
 * ignites (scale + dim-ring → aurora glow) across that slice. The card
 * accent bar (rendered by the parent) shares the same slice via useTransform.
 *
 * Markup renders fully-lit by default (CSS); the motion values only *animate*
 * toward that lit state. With reduced motion the parent passes a static
 * progress of 1, so every node sits ignited with no movement.
 */
export function PhaseNode({
  progress,
  start,
  end,
  isFinal = false,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  isFinal?: boolean;
}) {
  // Node body: 0.6 → 1 scale as the spine reaches it.
  const scale = useTransform(progress, [start, end], [0.6, 1]);
  // Dim ring → aurora glow.
  const ringOpacity = useTransform(progress, [start, end], [0.25, 1]);
  const glow = useTransform(
    progress,
    [start, end],
    ["0 0 0px rgba(99,102,241,0)", "0 0 22px rgba(129,140,248,0.85)"],
  );
  const coreOpacity = useTransform(progress, [start, end], [0.3, 1]);

  return (
    <div className="relative flex size-7 items-center justify-center" aria-hidden>
      {/* Outer ring */}
      <m.span
        className="absolute inset-0 rounded-full border-2 border-indigo-glow"
        style={{ scale, opacity: ringOpacity, boxShadow: glow }}
      />
      {/* Aurora core */}
      <m.span
        className="size-3 rounded-full bg-linear-to-br from-indigo-glow via-violet to-pink-pulse"
        style={{ scale, opacity: coreOpacity }}
      />
      {/* Day-21 one-shot ring-ping — fires once when the final node lights */}
      {isFinal && <RingPing progress={progress} trigger={end} />}
    </div>
  );
}

function RingPing({
  progress,
  trigger,
}: {
  progress: MotionValue<number>;
  trigger: number;
}) {
  // Expands + fades out exactly as the spine crosses the final node.
  const span = 0.06;
  const pingScale = useTransform(progress, [trigger, trigger + span], [1, 2.6]);
  const pingOpacity = useTransform(
    progress,
    [trigger - 0.001, trigger + span * 0.6, trigger + span],
    [0, 0.7, 0],
  );
  return (
    <m.span
      className="pointer-events-none absolute inset-0 rounded-full border-2 border-pink-pulse"
      style={{ scale: pingScale, opacity: pingOpacity }}
    />
  );
}
