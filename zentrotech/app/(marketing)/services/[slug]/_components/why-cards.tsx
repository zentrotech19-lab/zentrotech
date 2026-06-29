"use client";

import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { Tilt } from "@/components/animations/tilt";

/**
 * WhyCards — the "why ZentroTECH" differentiators as a Stagger cascade with a
 * desktop Tilt per card. Numbering matches the original (01, 02, 03…).
 */
export function WhyCards({ items }: { items: string[] }) {
  return (
    <Stagger className="grid md:grid-cols-3 gap-5">
      {items.map((w, i) => (
        <StaggerItem key={i}>
          <Tilt className="glass rounded-2xl p-6 h-full">
            <div className="text-indigo-glow text-3xl font-black font-mono tabular-nums">
              0{i + 1}
            </div>
            <p className="mt-4 text-text-secondary text-sm leading-relaxed">{w}</p>
          </Tilt>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
