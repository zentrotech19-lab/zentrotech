"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Eye, Rocket, Heart, Globe2, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { Tilt } from "@/components/animations/tilt";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const VALUES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Eye, title: "Radical transparency", text: "We tell you when AI is the wrong answer. No hammers looking for nails." },
  { icon: Rocket, title: "Ship over slides", text: "Working software in weeks, not deck cycles in quarters." },
  { icon: Heart, title: "Human-first", text: "Every agent we build amplifies humans. Never replaces care." },
  { icon: Globe2, title: "Globally local", text: "Bangalore engineering, Dubai presence, partnerships everywhere." },
];

/** One value card: icon-tile ignites once (scale 0.8→1 + brief .pulse-glow). */
function ValueCard({ icon: Icon, title, text }: (typeof VALUES)[number]) {
  const reduce = usePrefersReducedMotion();
  const [ignited, setIgnited] = useState(false);

  const tile =
    reduce ? (
      <div className="size-14 rounded-2xl bg-linear-to-br from-indigo/20 to-violet/20 mx-auto flex items-center justify-center">
        <Icon className="size-6 text-indigo-glow" />
      </div>
    ) : (
      <m.div
        className={`size-14 rounded-2xl bg-linear-to-br from-indigo/20 to-violet/20 mx-auto flex items-center justify-center${ignited ? " pulse-glow" : ""}`}
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: EASE }}
        onAnimationComplete={() => {
          // brief glow pulse, then settle to static tile
          setIgnited(true);
          window.setTimeout(() => setIgnited(false), 1300);
        }}
      >
        <Icon className="size-6 text-indigo-glow" />
      </m.div>
    );

  return (
    <Tilt className="h-full">
      <Card className="text-center h-full">
        {tile}
        <h3 className="text-xl font-bold text-white mt-6">{title}</h3>
        <p className="text-text-muted text-sm mt-3">{text}</p>
      </Card>
    </Tilt>
  );
}

/** ValuesGrid — 4 value cards revealed in a Stagger, each tile igniting once. */
export function ValuesGrid() {
  return (
    <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {VALUES.map((v) => (
        <StaggerItem key={v.title} className="h-full">
          <ValueCard {...v} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
