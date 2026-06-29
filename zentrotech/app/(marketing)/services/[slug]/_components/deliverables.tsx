"use client";

import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { Check } from "lucide-react";

/**
 * Deliverables — the "what you get" checklist as a Stagger cascade.
 * Each row keeps the original glass + check-pill styling.
 */
export function Deliverables({ items }: { items: readonly string[] }) {
  return (
    <Stagger className="mt-8 space-y-3">
      {items.map((d) => (
        <StaggerItem key={d}>
          <div className="flex gap-3 items-start glass rounded-xl p-4">
            <div className="size-6 rounded-full bg-indigo/20 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="size-3.5 text-indigo-glow" />
            </div>
            <span className="text-text-secondary text-sm">{d}</span>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
