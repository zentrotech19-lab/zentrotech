"use client";

import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { ResultCard } from "./result-card";

/**
 * ResultsGrid — 4-up proof grid that rises L→R (Stagger/StaggerItem); each card,
 * once landed, CountUps its parsed numeric core. Card 0 = headline (glow + shine).
 */
export function ResultsGrid({
  results,
}: {
  results: { label: string; value: string }[];
}) {
  if (!results.length) return null;

  return (
    <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {results.map((r, i) => (
        <StaggerItem key={`${r.label}-${i}`} className="h-full">
          <ResultCard label={r.label} value={r.value} index={i} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
