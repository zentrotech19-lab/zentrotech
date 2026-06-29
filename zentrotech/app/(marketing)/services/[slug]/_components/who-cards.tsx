"use client";

import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { Tilt } from "@/components/animations/tilt";

type WhoItem = { vertical: string; body: string };

/**
 * WhoCards — the "who it's for" grid as a Stagger cascade, each card lifted
 * with a desktop Tilt. Reduced-motion + touch self-gate inside the primitives.
 */
export function WhoCards({ items }: { items: WhoItem[] }) {
  return (
    <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((w) => (
        <StaggerItem key={w.vertical}>
          <Tilt className="glass rounded-2xl p-6 h-full">
            <h3 className="text-white font-bold">{w.vertical}</h3>
            <p className="mt-3 text-text-muted text-sm leading-relaxed">{w.body}</p>
          </Tilt>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
