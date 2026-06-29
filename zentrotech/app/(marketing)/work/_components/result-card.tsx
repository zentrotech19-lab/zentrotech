"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Tilt } from "@/components/animations/tilt";
import { DrawLine } from "@/components/animations/draw-line";
import { CountUp } from "@/components/animations/count-up";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { parseResultValue } from "./proof-ledger";

type Result = { label: string; value: string };

/**
 * highestImpactIndex — picks the single result that gets the one-shot pulse-glow:
 * the parseable number with the largest absolute magnitude. Falls back to the
 * first result when nothing parses cleanly.
 */
function highestImpactIndex(results: Result[]): number {
  let best = -1;
  let bestMag = -Infinity;
  results.forEach((r, i) => {
    const p = parseResultValue(r.value);
    if (p.kind === "number") {
      const mag = Math.abs(p.value);
      if (mag > bestMag) {
        bestMag = mag;
        best = i;
      }
    }
  });
  return best === -1 ? 0 : best;
}

/**
 * ResultCard — a single shipped case study in the Proof Ledger grid.
 * Scroll-in Reveal (y=24) + desktop Tilt. A horizontal aurora ship-bar draws
 * across the card top (DrawLine). The card's own results[] tally counts up; only
 * clean numeric/percent tokens animate, mixed strings render static (no NaN).
 * Once the numbers land the card gains .glass-glow, and the highest-impact metric
 * fires a one-shot .pulse-glow. Keeps the ArrowUpRight micro-interaction.
 */
export function ResultCard({
  slug,
  client,
  title,
  excerpt,
  industry,
  service,
  results,
}: {
  slug: string;
  client: string;
  title: string;
  excerpt: string;
  industry: string;
  service: string;
  results: Result[];
}) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [landed, setLanded] = useState(false);
  const impactIdx = highestImpactIndex(results);

  // "Numbers land" ~= the count-up window has elapsed after scroll-in. CountUp
  // fires on its own InView; we mirror that timing to flip glow on. Reduced
  // motion: land immediately (CountUp snaps).
  useEffect(() => {
    if (reduce) {
      setLanded(true);
      return;
    }
    if (!inView) return;
    const t = setTimeout(() => setLanded(true), 1100);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  return (
    <Reveal y={24}>
      <Tilt className="h-full">
        <Link href={`/work/${slug}`} className="group block h-full">
          <div
            ref={ref}
            className={cn(
              "relative h-full rounded-2xl p-6 overflow-hidden transition-all duration-500",
              "hover:border-indigo/40 hover:-translate-y-1",
              landed ? "glass-glow" : "glass"
            )}
          >
            {/* Aurora ship-bar — draws L→R across the card top */}
            <DrawLine orientation="horizontal" className="left-0 right-0 top-0 !h-0.5" />

            <div className="aspect-[16/9] rounded-xl bg-linear-to-br from-indigo/30 via-violet/20 to-pink-pulse/30 mb-6 flex items-center justify-center">
              <span className="text-6xl font-black text-white/10">{client.split(" ")[0]}</span>
            </div>

            <p className="text-xs uppercase tracking-widest text-indigo-glow">
              {industry} · {service}
            </p>
            <h2 className="text-2xl font-bold text-white mt-2 group-hover:text-aurora flex items-start gap-2">
              {title}
              <ArrowUpRight className="size-5 shrink-0 mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </h2>
            <p className="text-text-muted mt-3">{excerpt}</p>

            {results.length > 0 && (
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border-subtle pt-5">
                {results.map((r, i) => {
                  const p = parseResultValue(r.value);
                  const isImpact = i === impactIdx;
                  return (
                    <div key={r.label}>
                      <dt className="text-[11px] uppercase tracking-widest text-text-muted font-mono">
                        {r.label}
                      </dt>
                      <dd
                        className={cn(
                          "mt-1 text-2xl font-black text-white tabular-nums min-w-[3ch]",
                          isImpact && "text-indigo-glow"
                        )}
                      >
                        {p.kind === "number" ? (
                          <span
                            className={cn(
                              "inline-block",
                              isImpact && landed && !reduce && "pulse-glow"
                            )}
                          >
                            {p.sign}
                            <CountUp
                              value={p.value}
                              prefix={p.prefix}
                              suffix={p.suffix}
                              decimals={p.decimals}
                              className="tabular-nums"
                            />
                          </span>
                        ) : (
                          <span
                            className={cn(
                              "inline-block",
                              isImpact && landed && !reduce && "pulse-glow"
                            )}
                          >
                            {p.raw}
                          </span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </div>
        </Link>
      </Tilt>
    </Reveal>
  );
}
