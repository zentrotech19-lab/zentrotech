"use client";

import { m } from "framer-motion";
import { DrawLine } from "@/components/animations/draw-line";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * CredoSplit — Vision / Mission scroll-in halves stitched by a thin scroll-linked
 * aurora DrawLine. Vision slides from x:-28, mission from x:+28 (both fade).
 * Connector is horizontal on lg, vertical on mobile.
 * Reduced-motion: both halves render in place (no slide), DrawLine self-gates.
 */
export function CredoSplit() {
  const reduce = usePrefersReducedMotion();

  const vision = (
    <div className="glass-glow rounded-3xl p-12 h-full">
      <h2 className="text-3xl font-black text-white">Our vision</h2>
      <p className="mt-6 text-text-secondary leading-relaxed">
        A world where every business — from a 5-person startup in Bangalore to a
        50,000-person enterprise in Dubai — has access to the kind of AI
        infrastructure that until now only Big Tech could build.
      </p>
    </div>
  );

  const mission = (
    <div className="glass rounded-3xl p-12 h-full">
      <h2 className="text-3xl font-black text-white">Our mission</h2>
      <p className="mt-6 text-text-secondary leading-relaxed">
        Design, build, and operate production-grade agentic AI systems for
        businesses across India, the UAE, and the world — and to do it with
        engineering discipline, design taste, and radical honesty about what AI
        can and can&apos;t do.
      </p>
    </div>
  );

  if (reduce) {
    return (
      <div className="relative grid lg:grid-cols-2 gap-12">
        {vision}
        {mission}
      </div>
    );
  }

  return (
    <div className="relative grid lg:grid-cols-2 gap-12">
      {/* Aurora connector: vertical between stacked cards on mobile, horizontal between columns on lg */}
      <DrawLine
        orientation="vertical"
        className="left-1/2 -translate-x-1/2 top-[calc(50%-3rem)] bottom-[calc(50%-3rem)] lg:hidden"
      />
      <DrawLine
        orientation="horizontal"
        className="hidden lg:block top-1/2 -translate-y-1/2 left-[calc(50%-3rem)] right-[calc(50%-3rem)]"
      />

      <m.div
        initial={{ opacity: 0, x: -28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {vision}
      </m.div>

      <m.div
        initial={{ opacity: 0, x: 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {mission}
      </m.div>
    </div>
  );
}
