"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, useInView } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { CountUp } from "@/components/animations/count-up";
import { Tilt } from "@/components/animations/tilt";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { CoreChip } from "./core-chip";

export interface Vendor {
  name: string;
  powers: string;
  detail: string;
  href: string;
  /** When set, the figure block renders animated Meta pricing instead of plain detail prose. */
  meta?: boolean;
}

interface PathSpec {
  d: string;
  /** Approx length so we can pace the dash draw consistently across geometries. */
  len: number;
}

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * StackWireUp — "Stack Wire-Up".
 * Six vendor cards stagger in; an absolutely-positioned aria-hidden SVG overlay then
 * draws an aurora connector from each card's logo tile to the central ZentroTECH core
 * chip, sequenced one-by-one. As each connector lands, that card's logo tile pulses
 * once (.pulse-glow), its mono "powers" line shimmers (.shimmer), and — for the Meta
 * card — its ₹0.86 / ₹0.13 figures count up. The core chip gains .glass-glow once all
 * six connectors have arrived.
 *
 * Geometry can't be a straight DrawLine bar (each connector is a unique curve from a
 * different card to one shared point), so paths are measured from the live DOM and the
 * stroke is hand-drawn via m.path strokeDashoffset.
 *
 * Reduced motion → final lit state instantly: connectors fully drawn, every card
 * "connected", core glowing, no sequencing.
 */
export function StackWireUp({ vendors }: { vendors: readonly Vendor[] }) {
  const reduce = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);

  const inView = useInView(wrapRef, { once: true, margin: "-120px" });

  const [paths, setPaths] = useState<PathSpec[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  // Per-card connection flags drive pulse/shimmer/countup; index → landed?
  const [connected, setConnected] = useState<boolean[]>(() => vendors.map(() => false));

  const allConnected = connected.length > 0 && connected.every(Boolean);

  // Measure card-tile centers + core center relative to the overlay, build curved paths.
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const core = coreRef.current;
    if (!wrap || !core) return;
    const wrapRect = wrap.getBoundingClientRect();
    const coreRect = core.getBoundingClientRect();
    const cx = coreRect.left - wrapRect.left + coreRect.width / 2;
    const cy = coreRect.top - wrapRect.top + coreRect.height / 2;

    const next: PathSpec[] = [];
    tileRefs.current.forEach((tile) => {
      if (!tile) {
        next.push({ d: "", len: 1 });
        return;
      }
      const r = tile.getBoundingClientRect();
      const sx = r.left - wrapRect.left + r.width / 2;
      const sy = r.top - wrapRect.top + r.height / 2;
      // Quadratic curve bowed toward the core's vertical axis for an "aurora" arc.
      const mx = (sx + cx) / 2 + (cx - sx) * 0.12;
      const my = (sy + cy) / 2 + (sy < cy ? -28 : 28);
      const d = `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)}`;
      const len = Math.hypot(cx - sx, cy - sy) + 40;
      next.push({ d, len });
    });

    setBox({ w: wrapRect.width, h: wrapRect.height });
    setPaths(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    // Fonts/images can shift layout after first paint.
    const t = window.setTimeout(measure, 400);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [measure]);

  // Reduced motion: everything connected immediately.
  useEffect(() => {
    if (reduce) setConnected(vendors.map(() => true));
  }, [reduce, vendors]);

  // Sequenced light-up: when the section enters view and paths exist, flip each
  // card to "connected" on a stagger so its pulse/shimmer/countup fire in turn.
  const fired = useRef(false);
  useEffect(() => {
    if (reduce || fired.current) return;
    if (!inView || paths.length !== vendors.length) return;
    fired.current = true;
    const timers: number[] = [];
    vendors.forEach((_, i) => {
      // 0.45s stagger start (lets cards finish their entrance) + 0.9s draw per card.
      const at = 450 + i * 520 + 760;
      timers.push(
        window.setTimeout(() => {
          setConnected((prev) => {
            const copy = [...prev];
            copy[i] = true;
            return copy;
          });
        }, at),
      );
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, paths.length, reduce, vendors]);

  const drawTime = (i: number) => 0.45 + i * 0.52; // seconds, matches the timer stagger

  return (
    <div ref={wrapRef} className="relative">
      {/* Aurora connector overlay — purely decorative, never intercepts pointer events. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 hidden overflow-visible lg:block"
        width={box.w || undefined}
        height={box.h || undefined}
        viewBox={box.w ? `0 0 ${box.w} ${box.h}` : undefined}
        fill="none"
      >
        <defs>
          <linearGradient id="wire-aurora" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="40%" stopColor="#6366f1" />
            <stop offset="75%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {paths.map((p, i) =>
          p.d ? (
            <m.path
              key={i}
              d={p.d}
              stroke="url(#wire-aurora)"
              strokeWidth={2}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              initial={false}
              animate={{ strokeDashoffset: reduce || connected[i] ? 0 : 1 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.9, delay: drawTime(i), ease: EASE }
              }
              style={{ strokeDashoffset: 1, opacity: 0.9 }}
            />
          ) : null,
        )}
      </svg>

      {/* Layout: cards left/right of a central core on large screens; stacked elsewhere. */}
      <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1fr_minmax(220px,300px)_1fr]">
        {/* Left column — first 3 vendors */}
        <Stagger className="flex flex-col gap-6">
          {vendors.slice(0, 3).map((v, idx) => (
            <StaggerItem key={v.name}>
              <VendorCard
                vendor={v}
                connected={connected[idx]}
                reduce={reduce}
                registerTile={(el) => (tileRefs.current[idx] = el)}
              />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Center — the core chip */}
        <div ref={coreRef} className="order-first lg:order-none">
          <CoreChip lit={allConnected} reduce={reduce} />
        </div>

        {/* Right column — last 3 vendors */}
        <Stagger className="flex flex-col gap-6">
          {vendors.slice(3, 6).map((v, idx) => {
            const i = idx + 3;
            return (
              <StaggerItem key={v.name}>
                <VendorCard
                  vendor={v}
                  connected={connected[i]}
                  reduce={reduce}
                  registerTile={(el) => (tileRefs.current[i] = el)}
                />
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </div>
  );
}

function VendorCard({
  vendor,
  connected,
  reduce,
  registerTile,
}: {
  vendor: Vendor;
  connected: boolean;
  reduce: boolean;
  registerTile: (el: HTMLDivElement | null) => void;
}) {
  // pulse-glow is an infinite CSS keyframe; we want ONE pulse the moment the connector
  // lands, so we mount the class on connect and strip it after a single ~2.4s cycle.
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (!connected || reduce) return;
    setPulse(true);
    const t = window.setTimeout(() => setPulse(false), 2500);
    return () => window.clearTimeout(t);
  }, [connected, reduce]);

  return (
    <Tilt className="h-full" max={6}>
      <div className="glass flex h-full flex-col rounded-3xl p-7 transition-colors duration-300 hover:border-indigo/40">
        <div
          ref={registerTile}
          className={`flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo/20 to-violet/20 ${
            pulse ? "pulse-glow" : ""
          }`}
          aria-hidden
        >
          {/* TODO (Founder): swap brand mark for real partner logos in /public/partners/ */}
          <Image
            src="/brand/logo-mark.svg"
            alt=""
            width={32}
            height={32}
            className="size-8 object-contain opacity-80"
          />
        </div>

        <h3 className="mt-6 text-xl font-black text-white">{vendor.name}</h3>
        <p
          className={`mt-1 inline-block rounded font-mono text-sm text-indigo-glow ${
            connected && !reduce ? "shimmer" : ""
          }`}
        >
          {vendor.powers}
        </p>

        {vendor.meta ? (
          <MetaFigures connected={connected} />
        ) : (
          <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">{vendor.detail}</p>
        )}

        <a
          href={vendor.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm text-indigo-glow transition-colors hover:text-white"
        >
          Visit {vendor.name} →
        </a>
      </div>
    </Tilt>
  );
}

/**
 * MetaFigures — the WhatsApp wholesale pricing block. The two ₹ figures CountUp once
 * the Meta connector lands (CountUp itself fires on scroll-in, but we keep it inside
 * the connected branch so the numbers reveal on the same beat as the wire). When not
 * yet connected we reserve the space with dimmed placeholders to avoid layout shift.
 */
function MetaFigures({ connected }: { connected: boolean }) {
  return (
    <div className="mt-4 flex-1">
      <p className="text-sm leading-relaxed text-text-secondary">
        Meta-approved Business Solution Provider architecture. Wholesale pricing, billed direct to
        your Meta wallet — no markup from us:
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted">marketing</p>
          <p className="mt-1 text-2xl font-black tabular-nums text-white" style={{ minWidth: "5ch" }}>
            {connected ? (
              <CountUp value={0.86} prefix="₹" decimals={2} />
            ) : (
              <span className="opacity-30">₹0.00</span>
            )}
          </p>
          <p className="text-xs text-text-muted">per message</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted">utility</p>
          <p className="mt-1 text-2xl font-black tabular-nums text-white" style={{ minWidth: "5ch" }}>
            {connected ? (
              <CountUp value={0.13} prefix="₹" decimals={2} />
            ) : (
              <span className="opacity-30">₹0.00</span>
            )}
          </p>
          <p className="text-xs text-text-muted">per message</p>
        </div>
      </div>
    </div>
  );
}
