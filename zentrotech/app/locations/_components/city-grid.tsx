"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/reveal";
import { CountUp } from "@/components/animations/count-up";
import { Tilt } from "@/components/animations/tilt";
import { ArrowRight } from "lucide-react";

interface City {
  slug: string;
  label: string;
}

/**
 * CityGrid — one per tier. The header (label + animated location count) reveals on
 * scroll-in, then the city cards cascade via Stagger. Each card is a Tilt with an
 * arrow that nudges right on hover. Reduced-motion is handled inside the shared
 * primitives (Reveal/Stagger/Tilt all early-return static).
 */
export function CityGrid({
  label,
  sub,
  items,
}: {
  label: string;
  sub: string;
  items: readonly City[];
}) {
  return (
    <div className="max-w-6xl">
      <Reveal>
        <div className="flex flex-wrap items-baseline gap-4">
          <h2 className="text-xl font-black tracking-tight text-white md:text-2xl">{label}</h2>
          <span className="text-sm text-text-muted">
            {sub} ·{" "}
            <CountUp value={items.length} className="tabular-nums text-text-secondary" /> locations
          </span>
        </div>
      </Reveal>

      <Stagger className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((c) => (
          <StaggerItem key={c.slug}>
            <Tilt max={6}>
              <Link
                href={`/locations/${c.slug}`}
                className="group glass flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm text-white transition-colors hover:bg-white/10"
              >
                <span className="truncate font-medium">{c.label}</span>
                <ArrowRight
                  className="size-3.5 shrink-0 text-indigo-glow transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Tilt>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
