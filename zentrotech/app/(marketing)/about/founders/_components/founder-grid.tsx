"use client";

import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { FounderCard, type Founder } from "./founder-card";

/**
 * FounderGrid — staggers founder cards in left-to-right (cap 3). Each card runs
 * its own internal de-blur → hairline → text timeline. Reduced-motion is handled
 * inside Stagger / FounderCard, so the grid renders statically with no flash.
 */
export function FounderGrid({ founders }: { founders: Founder[] }) {
  const cards = founders.slice(0, 3);
  return (
    <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((f) => (
        <StaggerItem key={f.slug} className="h-full">
          <FounderCard founder={f} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
