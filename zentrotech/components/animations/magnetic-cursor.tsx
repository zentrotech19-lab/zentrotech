"use client";
import { useEffect, useRef, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

const MAGNETIC_SELECTOR = "a, button, [data-magnetic]";

export function MagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Bail entirely on touch devices and when the user prefers reduced motion;
    // no listeners attached, no DOM nodes rendered.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setEnabled(true);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    // Delegated enter/leave detection — walk up from the actual event target so
    // newly-mounted links/buttons (route changes, dialogs, dynamic content) are
    // covered without re-querying the document or leaking listeners.
    const over = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(MAGNETIC_SELECTOR)) {
        ringRef.current?.classList.add("scale-150", "border-pink-pulse");
      }
    };
    const out = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const related = e.relatedTarget as Element | null;
      const fromMagnetic = target?.closest(MAGNETIC_SELECTOR);
      const toMagnetic = related?.closest(MAGNETIC_SELECTOR);
      if (fromMagnetic && fromMagnetic !== toMagnetic) {
        ringRef.current?.classList.remove("scale-150", "border-pink-pulse");
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      <m.div
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[200] hidden lg:block size-3 rounded-full bg-indigo-glow mix-blend-difference"
      />
      <m.div
        ref={ringRef}
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[199] hidden lg:block size-3 rounded-full border-2 border-indigo-glow transition-all duration-200"
      />
    </>
  );
}
