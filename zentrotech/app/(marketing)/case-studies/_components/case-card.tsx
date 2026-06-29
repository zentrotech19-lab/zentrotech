"use client";

import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { DrawLine } from "@/components/animations/draw-line";
import { CountUp } from "@/components/animations/count-up";
import { Tilt } from "@/components/animations/tilt";

/**
 * CaseCard — the real "Ledger Resolve" case study card.
 * Reveals on scroll-in (y=24). A 2px aurora recovery-meter draws L→R across the
 * card top (DrawLine horizontal). The ₹ recovery chip counts up to the REAL
 * figure (₹2,10,000) in en-IN. Desktop Tilt + hover glow; arrow nudges +4px.
 */
export function CaseCard({
  slug,
  title,
  vertical,
  location,
  summary,
  recovered,
  isSample,
}: {
  slug: string;
  title: string;
  vertical: string;
  location: string;
  summary: string;
  recovered: number;
  isSample?: boolean;
}) {
  return (
    <Reveal y={24}>
      <Tilt className="h-full">
        <Link
          href={`/case-studies/${slug}`}
          className="group relative block glass rounded-3xl p-8 overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-indigo/40 hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.45)]"
        >
          {/* 2px aurora recovery-meter — draws L→R across the card top */}
          <DrawLine orientation="horizontal" className="left-0 right-0 top-0 !h-0.5" />

          {isSample && (
            <span className="self-start inline-flex items-center gap-2 rounded-full bg-pink/20 border border-pink/50 px-3 py-1 text-xs font-black uppercase tracking-widest text-pink">
              ⚠ Sample template — not a real client
            </span>
          )}

          {/* Recovery chip — synced ₹ count-up to the real figure */}
          <span className="mt-5 self-start inline-flex items-baseline gap-2 rounded-full border border-indigo/40 bg-indigo/10 px-4 py-1.5">
            <CountUp
              value={recovered}
              prefix="₹"
              locale="en-IN"
              className="text-lg font-black text-indigo-glow tabular-nums min-w-[5ch]"
            />
            <span className="text-[11px] uppercase tracking-widest text-text-muted font-mono">
              recovered
            </span>
          </span>

          <h2 className="mt-5 text-2xl font-black text-white group-hover:text-indigo-glow transition-colors">
            {title}
          </h2>
          <p className="mt-2 text-sm text-indigo-glow font-mono">
            {vertical} · {location}
          </p>
          <p className="mt-4 text-sm text-text-secondary leading-relaxed flex-1">{summary}</p>

          <span className="mt-6 inline-flex items-center gap-2 text-sm text-indigo-glow group-hover:text-white transition-colors">
            Read the breakdown
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </Tilt>
    </Reveal>
  );
}
