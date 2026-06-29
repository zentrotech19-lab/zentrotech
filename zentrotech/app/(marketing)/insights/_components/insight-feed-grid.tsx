"use client";

import Link from "next/link";
import { useState } from "react";
import { m, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { formatDate } from "@/lib/utils";
import type { Insight } from "@/lib/content";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Grid container: Stagger reveal of each card (y=24, ~70ms cascade). With ~6+ posts
 * the last item lands well under ~600ms (delayChildren 0.05 + duration 0.5).
 */
const gridV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const cardV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function InsightFeedGrid({ posts }: { posts: Insight[] }) {
  const reduce = usePrefersReducedMotion();

  if (reduce) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <InsightCard key={p.slug} post={p} scan={false} />
        ))}
      </div>
    );
  }

  return (
    <m.div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={gridV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {posts.map((p) => (
        <StaggeredCard key={p.slug} post={p} />
      ))}
    </m.div>
  );
}

/** Wraps a card in a StaggerItem and fires the category-word scan as it lands. */
function StaggeredCard({ post }: { post: Insight }) {
  const [landed, setLanded] = useState(false);
  return (
    <m.div variants={cardV} onAnimationComplete={() => setLanded(true)}>
      <InsightCard post={post} scan={landed} />
    </m.div>
  );
}

/**
 * Card markup preserved verbatim from the original page (Link wrapper, glass article,
 * hover translate/border, copy). The only addition: the giant category word gets a
 * one-time L→R shimmer "scan" overlay (fill-mode forwards) keyed on `scan`.
 */
function InsightCard({ post: p, scan }: { post: Insight; scan: boolean }) {
  return (
    <Link href={`/insights/${p.slug}`} className="group block">
      <article className="h-full glass rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-indigo/40 group-hover:-translate-y-1">
        <div className="aspect-video bg-linear-to-br from-indigo/30 via-violet/20 to-pink-pulse/30 flex items-center justify-center">
          <span className="relative inline-block overflow-hidden text-5xl font-black text-white/10">
            {p.category}
            {scan && (
              <m.span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                }}
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            )}
          </span>
        </div>
        <div className="p-6">
          <p className="text-xs uppercase tracking-widest text-indigo-glow">{p.category} · {p.readingTime}</p>
          <h2 className="text-xl font-bold text-white mt-2 group-hover:text-aurora">{p.title}</h2>
          <p className="text-text-muted text-sm mt-3 line-clamp-2">{p.excerpt}</p>
          <p className="text-xs text-text-muted mt-4">{formatDate(p.date)}</p>
        </div>
      </article>
    </Link>
  );
}
