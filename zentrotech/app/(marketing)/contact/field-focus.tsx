"use client";

import { useState, type ReactNode } from "react";
import { m } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * FieldFocus — wraps a single form field and adds an aurora focus-glow.
 * On focus-within: a soft scale (1 → 1.005) + an aurora ring fades in behind
 * the field. GPU-only (transform/opacity). Reduced-motion: renders a plain
 * wrapper with no animation and no ring.
 *
 * Usage: <FieldFocus className="..."><label>…<input/></label></FieldFocus>
 * Detects focus via React focus/blur bubbling so it works for input, select,
 * textarea, and checkboxes alike.
 */
export function FieldFocus({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const [focused, setFocused] = useState(false);

  if (reduce) {
    return <div className={cn("relative", className)}>{children}</div>;
  }

  return (
    <m.div
      className={cn("relative rounded-2xl", className)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      animate={{ scale: focused ? 1.005 : 1 }}
      transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ transformOrigin: "center" }}
    >
      {/* Aurora focus ring — sits behind the field, fades in on focus */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl"
        style={{
          background:
            "linear-gradient(120deg, rgba(6,182,212,0.18), rgba(99,102,241,0.22), rgba(139,92,246,0.18), rgba(236,72,153,0.16))",
          boxShadow: "0 0 0 1px rgba(99,102,241,0.35), 0 8px 30px -12px rgba(99,102,241,0.5)",
        }}
        animate={{ opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <div className="relative">{children}</div>
    </m.div>
  );
}
