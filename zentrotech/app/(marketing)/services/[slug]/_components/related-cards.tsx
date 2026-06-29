"use client";

import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { Tilt } from "@/components/animations/tilt";
import { ArrowUpRight } from "lucide-react";

type Related = { slug: string; title: string; short: string };

/**
 * RelatedCards — "often paired with" service links as a Stagger cascade, each
 * card a desktop Tilt wrapping the existing hover-link styling.
 */
export function RelatedCards({ items }: { items: Related[] }) {
  return (
    <Stagger className="grid md:grid-cols-3 gap-5">
      {items.map((r) => (
        <StaggerItem key={r.slug}>
          <Tilt className="h-full">
            <Link
              href={`/services/${r.slug}`}
              className="group glass rounded-2xl p-6 h-full flex flex-col hover:border-indigo/40 transition-colors"
            >
              <h3 className="text-white font-bold">{r.title}</h3>
              <p className="mt-2 text-text-muted text-sm leading-relaxed">{r.short}</p>
              <div className="mt-4 flex items-center gap-1 text-indigo-glow text-sm">
                <span>Learn more</span>
                <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          </Tilt>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
