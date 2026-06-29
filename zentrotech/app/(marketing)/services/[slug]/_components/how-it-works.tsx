"use client";

import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { DrawLine } from "@/components/animations/draw-line";

type Step = { step: string; title: string; desc: string };

/**
 * HowItWorks — the four-step process as a Stagger cascade with a vertical
 * DrawLine spine that draws itself as you scroll past the steps. The line sits
 * behind the step-number markers (left-7 ≈ centre of the number column).
 */
export function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <div className="relative mt-8">
      <DrawLine className="left-7 top-6 bottom-6" />
      <Stagger className="space-y-4">
        {steps.map((s) => (
          <StaggerItem key={s.step}>
            <div className="relative flex gap-5 glass rounded-2xl p-6">
              <div className="text-indigo-glow font-mono font-black text-2xl tabular-nums">
                {s.step}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{s.title}</h3>
                <p className="text-text-muted text-sm mt-2 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
