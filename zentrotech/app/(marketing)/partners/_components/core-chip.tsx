"use client";

import { m } from "framer-motion";
import Image from "next/image";

/**
 * CoreChip — the central "ZentroTECH core" node every vendor connector wires into.
 * Gains `.glass-glow` (via the `lit` prop) once all six aurora connectors have landed.
 * A soft aurora halo behind the chip fades in on the same beat.
 */
export function CoreChip({ lit, reduce }: { lit: boolean; reduce: boolean }) {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Aurora halo — only blooms once everything is wired (or instantly for reduced motion) */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.35), rgba(139,92,246,0.18) 45%, transparent 70%)",
        }}
        initial={false}
        animate={{ opacity: reduce ? 0.9 : lit ? 0.9 : 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      <div
        className={`relative flex flex-col items-center rounded-3xl px-7 py-6 transition-shadow duration-700 ${
          lit ? "glass-glow" : "glass"
        }`}
      >
        <div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo/30 to-violet/30">
          <Image
            src="/brand/logo-mark.svg"
            alt=""
            aria-hidden
            width={36}
            height={36}
            className="size-9 object-contain"
          />
        </div>
        <p className="mt-4 text-lg font-black text-white">ZentroTECH core</p>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-indigo-glow">
          one team · one integration
        </p>
      </div>
    </div>
  );
}
