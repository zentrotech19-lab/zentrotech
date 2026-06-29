"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { Tilt } from "@/components/animations/tilt";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export type Founder = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  linkedin: string;
  photo: string;
};

/**
 * FounderCard — staged entrance:
 *  1) avatar tile de-blurs (blur 6px→0 + scale 1.04→1 + opacity 0.7→1, ~380ms)
 *  2) a 1px aurora hairline sweeps the top edge (scaleX 0→1, origin-left)
 *  3) name / title / bio fade in
 * Tilt wraps the resolved card. Reduced-motion: everything renders static.
 */
export function FounderCard({ founder }: { founder: Founder }) {
  const reduce = usePrefersReducedMotion();
  const [tileDone, setTileDone] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);

  const Inner = (
    <div className="glass rounded-3xl p-8 flex flex-col h-full relative overflow-hidden hover:border-indigo/40 transition-colors duration-300">
      {/* Aurora hairline sweep along the top edge */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, #06b6d4, #6366f1, #8b5cf6, #ec4899)",
          transformOrigin: "left",
        }}
        initial={reduce ? false : { scaleX: 0 }}
        animate={reduce ? undefined : tileDone ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />

      {/* Avatar tile — de-blurs on enter (blur on the size-24 tile ONLY) */}
      <m.div
        className="size-24 rounded-2xl bg-linear-to-br from-indigo/20 to-violet/20 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
        style={reduce ? undefined : { willChange: "filter, transform, opacity" }}
        initial={
          reduce ? false : { filter: "blur(6px)", scale: 1.04, opacity: 0.7 }
        }
        whileInView={
          reduce ? undefined : { filter: "blur(0px)", scale: 1, opacity: 1 }
        }
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.38, ease: EASE }}
        onAnimationComplete={() => {
          setTileDone(true);
          const el = tileRef.current;
          if (el) el.style.willChange = "auto";
        }}
        ref={tileRef}
      >
        <Image
          src={founder.photo}
          alt=""
          width={64}
          height={64}
          className="size-16 object-contain"
        />
      </m.div>

      {/* Name / title / bio — fade in after the tile resolves */}
      <m.div
        className="flex flex-col flex-1"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={
          reduce ? undefined : tileDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
        }
        transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
      >
        <h2 className="mt-6 text-xl font-black text-white">{founder.name}</h2>
        <p className="mt-1 text-sm text-indigo-glow font-mono">{founder.title}</p>
        <p className="mt-4 text-sm text-text-secondary leading-relaxed flex-1">
          {founder.bio}
        </p>
        <a
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm text-indigo-glow hover:text-white transition-colors"
        >
          LinkedIn →
        </a>
      </m.div>
    </div>
  );

  if (reduce) return Inner;

  return <Tilt className="h-full">{Inner}</Tilt>;
}
