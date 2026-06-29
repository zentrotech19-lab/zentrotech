"use client";

import { Reveal } from "@/components/animations/reveal";

/**
 * ComingSoonCard — dashed placeholder slot. Reveals on scroll-in (staggered
 * AFTER the real card via `delay`) but stays INERT: no recovery-meter, no
 * count-up, no tilt, no hover lift. Keeps the grid from looking empty.
 */
export function ComingSoonCard({
  headline,
  note,
  delay = 0,
}: {
  headline: string;
  note: string;
  delay?: number;
}) {
  return (
    <Reveal y={24} delay={delay}>
      <div className="rounded-3xl border border-dashed border-white/10 p-8 flex flex-col items-start justify-center min-h-[260px] h-full">
        <p className="text-xs uppercase tracking-widest text-text-muted font-mono">Coming soon</p>
        <p className="mt-3 text-lg font-bold text-white/70">{headline}</p>
        <p className="mt-2 text-sm text-text-muted">{note}</p>
      </div>
    </Reveal>
  );
}
