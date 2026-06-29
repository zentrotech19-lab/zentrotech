"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Target, FileSearch, Cpu } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Tilt } from "@/components/animations/tilt";
import { DrawLine } from "@/components/animations/draw-line";

// Icon registry — lets the server page pass a string key instead of a function
// component across the server→client boundary (functions can't be serialized).
const ICONS = { Target, FileSearch, Cpu } as const;
export type PathIcon = keyof typeof ICONS;

export type PathRoute = {
  icon: PathIcon;
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: string[];
};

/**
 * PathRouterCard — one diagnostic "fork" in the branch router.
 * Desktop hover: Tilt lift, icon tile .pulse-glow, primary-CTA aurora left-border
 * gradient-pan sweep, the two paired chips ignite in sequence, CTA arrow translate-x.
 * The left gutter holds a vertical DrawLine wiring the icon down to the primary CTA.
 * All motion is hover/scroll driven and self-gates reduced-motion via Tilt/DrawLine
 * + CSS @media (prefers-reduced-motion).
 */
export function PathRouterCard({ path }: { path: PathRoute }) {
  const [hover, setHover] = useState(false);
  const Icon: LucideIcon = ICONS[path.icon];

  return (
    <Tilt className="h-full" max={6}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`group relative h-full glass rounded-2xl p-8 flex flex-col transition-all duration-300 ${
          hover ? "border-indigo/40 shadow-[0_0_40px_rgba(99,102,241,0.18)] -translate-y-1" : ""
        }`}
      >
        {/* Left-gutter wire: DrawLine connecting icon tile down to the CTA */}
        <DrawLine className="left-[1.85rem] top-20 bottom-24" />

        <div
          className={`relative z-10 size-12 rounded-xl bg-indigo/15 text-indigo-glow flex items-center justify-center transition-colors ${
            hover ? "bg-indigo/25" : ""
          }`}
        >
          <Icon className={`size-6 ${hover ? "pulse-glow" : ""}`} aria-hidden="true" />
        </div>

        <h3 className="relative z-10 mt-6 text-white font-bold text-xl">{path.title}</h3>
        <p className="relative z-10 mt-3 text-text-muted text-sm leading-relaxed">{path.body}</p>

        <div className="relative z-10 mt-auto pt-8 space-y-3">
          <Link
            href={path.primary.href}
            className={`relative flex items-center justify-between overflow-hidden rounded-xl border-l-2 px-4 py-3 text-white font-medium text-sm transition-colors ${
              hover
                ? "bg-indigo/25 border-l-violet"
                : "bg-indigo/15 border-l-indigo/30"
            }`}
          >
            {/* aurora left-border gradient-pan sweep on hover */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-glow via-violet to-pink-pulse ${
                hover ? "animate-gradient-pan opacity-100" : "opacity-0"
              } transition-opacity`}
              style={{ backgroundSize: "100% 200%" }}
            />
            <span className="relative">{path.primary.label}</span>
            <ArrowRight
              className={`relative size-4 transition-transform duration-300 ${hover ? "translate-x-1" : ""}`}
              aria-hidden="true"
            />
          </Link>

          {/* Two paired chips that ignite in sequence on hover */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-text-muted text-xs">Often paired with</span>
            {path.secondary.map((s, i) => (
              <Link
                key={s}
                href={`/services/${s}`}
                style={{ transitionDelay: hover ? `${i * 120}ms` : "0ms" }}
                className={`rounded-full border px-2.5 py-1 text-xs transition-all duration-300 ${
                  hover
                    ? "border-indigo/40 bg-indigo/15 text-white"
                    : "border-border-subtle bg-white/[0.03] text-indigo-glow"
                }`}
              >
                {s.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Tilt>
  );
}
