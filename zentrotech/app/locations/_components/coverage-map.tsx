"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/animations/count-up";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { MapPin } from "lucide-react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Metro pins inside the 0..420 (w) × 0..520 (h) viewBox of the South-India outline.
 * Bangalore is the hub — every filament draws Bangalore→metro. `order` controls the
 * one-by-one ignition cadence (Bangalore is index 0, brightest).
 */
interface Pin {
  name: string;
  x: number;
  y: number;
  hub?: boolean;
}
const HUB = { x: 196, y: 286 }; // Bangalore
const PINS: Pin[] = [
  { name: "Bangalore", x: 196, y: 286, hub: true },
  { name: "Chennai", x: 274, y: 300 },
  { name: "Hyderabad", x: 214, y: 176 },
  { name: "Coimbatore", x: 178, y: 366 },
  { name: "Kochi", x: 158, y: 424 },
  { name: "Visakhapatnam", x: 300, y: 188 },
];

// Approximate South-India landmass outline (decorative; not a precise map).
const COAST =
  "M150 38 C198 30 250 44 268 86 C288 130 270 168 296 196 C318 220 330 262 314 308 C300 348 286 392 250 430 C214 468 184 502 158 506 C140 470 132 430 120 392 C104 344 92 300 96 254 C100 206 112 162 108 120 C106 86 120 50 150 38 Z";

export function CoverageMap() {
  const reduce = usePrefersReducedMotion();
  // How many pins have ignited so far (drives both pins + their filaments).
  const [lit, setLit] = useState(reduce ? PINS.length : 0);

  useEffect(() => {
    if (reduce) {
      setLit(PINS.length);
      return;
    }
    const timers: number[] = [];
    PINS.forEach((_, i) => {
      timers.push(window.setTimeout(() => setLit((n) => Math.max(n, i + 1)), 350 + i * 320));
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduce]);

  return (
    <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_minmax(320px,460px)]">
      {/* ---- Left: hero copy (LCP h1 stays static, server-friendly markup) ---- */}
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          <Badge>
            <MapPin className="size-3" />
            <span>
              <CountUp value={138} suffix=" locations" className="tabular-nums" />
            </span>
          </Badge>
        </div>
        <h1 className="mt-6 text-4xl font-black leading-[1.0] tracking-tight text-white md:text-6xl lg:text-7xl">
          Service areas across <span className="text-aurora">South India</span>.
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-text-secondary md:text-xl">
          ZentroTECH delivers websites + AI automation across 138 commercial centres — every
          Bangalore neighborhood, every major IT park, plus key South India metros and Tier-2
          cities. Pick your location.
        </p>
      </div>

      {/* ---- Right: aurora ignition map (decorative) ---- */}
      <div aria-hidden="true" className="pointer-events-none relative mx-auto w-full max-w-[460px]">
        {/* soft aurora wash behind the map */}
        <div
          className="absolute right-[-10%] top-[-8%] size-[520px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 65%)" }}
        />
        <svg viewBox="0 0 420 520" className="relative w-full overflow-visible" fill="none">
          <defs>
            <linearGradient id="cov-coast" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="cov-wire" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <radialGradient id="cov-pin" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="100%" stopColor="#6366f1" />
            </radialGradient>
          </defs>

          {/* Landmass outline — gently draws in (or static under reduced motion). */}
          <m.path
            d={COAST}
            stroke="url(#cov-coast)"
            strokeWidth={1.5}
            fill="rgba(99,102,241,0.04)"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 1.1, ease: EASE }}
          />

          {/* Filaments: Bangalore → each metro. Index i draws once pin i has ignited. */}
          {PINS.map((p, i) => {
            if (p.hub) return null;
            const on = i < lit;
            const mx = (HUB.x + p.x) / 2 + (p.x - HUB.x) * 0.1;
            const my = (HUB.y + p.y) / 2 + (p.y < HUB.y ? -22 : 22);
            const d = `M ${HUB.x} ${HUB.y} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${p.x} ${p.y}`;
            return (
              <m.path
                key={`wire-${p.name}`}
                d={d}
                stroke="url(#cov-wire)"
                strokeWidth={1.25}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                initial={false}
                animate={{ strokeDashoffset: on ? 0 : 1, opacity: on ? 0.85 : 0 }}
                transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
                style={{ strokeDashoffset: 1 }}
              />
            );
          })}

          {/* Pins ignite one-by-one: glow halo + solid dot scale 0→1. */}
          {PINS.map((p, i) => {
            const on = i < lit;
            return (
              <g key={`pin-${p.name}`}>
                {/* aurora glow halo */}
                <m.circle
                  cx={p.x}
                  cy={p.y}
                  r={p.hub ? 18 : 13}
                  fill="url(#cov-pin)"
                  initial={false}
                  animate={{ scale: on ? 1 : 0, opacity: on ? (p.hub ? 0.4 : 0.28) : 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
                {/* solid pin */}
                <m.circle
                  cx={p.x}
                  cy={p.y}
                  r={p.hub ? 6 : 4.5}
                  fill={p.hub ? "#c7d2fe" : "#a5b4fc"}
                  initial={false}
                  animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
                  transition={
                    reduce ? { duration: 0 } : { duration: 0.45, ease: EASE, delay: 0.05 }
                  }
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
                {/* steady pulse ring on the hub once lit */}
                {p.hub && on && !reduce && (
                  <circle cx={p.x} cy={p.y} r={6} fill="none" stroke="#818cf8" strokeWidth={1.5}>
                    <animate
                      attributeName="r"
                      from="6"
                      to="22"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.7"
                      to="0"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
