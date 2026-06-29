"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

/**
 * PulseButton — wraps the shared <Button> and fires the CSS .pulse-glow keyframe ONCE
 * when it scrolls into view (the keyframe loops infinitely, so we mount the class then
 * strip it after a single ~2.4s cycle). Reduced motion → no pulse, plain button.
 */
export function PulseButton(props: ButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (reduce || !inView) return;
    setPulse(true);
    const t = window.setTimeout(() => setPulse(false), 2500);
    return () => window.clearTimeout(t);
  }, [inView, reduce]);

  const { className, ...rest } = props;
  return (
    <span ref={ref} className="inline-flex">
      <Button {...rest} className={`${className ?? ""} ${pulse ? "pulse-glow" : ""}`.trim()} />
    </span>
  );
}
