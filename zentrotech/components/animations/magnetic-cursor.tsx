"use client";
import { useEffect, useRef, useState } from "react";

const MAGNETIC_SELECTOR = "a, button, [data-magnetic]";

export function MagneticCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setEnabled(true);

    let targetX = -100;
    let targetY = -100;
    let curX = -100;
    let curY = -100;
    let raf = 0;

    const tick = () => {
      curX += (targetX - curX) * 0.22;
      curY += (targetY - curY) * 0.22;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const move = (e: MouseEvent) => {
      targetX = e.clientX - 14;
      targetY = e.clientY - 14;
    };

    const over = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(MAGNETIC_SELECTOR)) {
        ringRef.current?.classList.add("scale-150", "bg-indigo/30", "border-indigo-glow");
        ringRef.current?.classList.remove("border-white/40");
      }
    };
    const out = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const related = e.relatedTarget as Element | null;
      const fromMagnetic = target?.closest(MAGNETIC_SELECTOR);
      const toMagnetic = related?.closest(MAGNETIC_SELECTOR);
      if (fromMagnetic && fromMagnetic !== toMagnetic) {
        ringRef.current?.classList.remove("scale-150", "bg-indigo/30", "border-indigo-glow");
        ringRef.current?.classList.add("border-white/40");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-200 hidden lg:block will-change-transform"
    >
      <div
        ref={ringRef}
        className="size-7 rounded-full border border-white/40 transition-[transform,background-color,border-color] duration-200 ease-out"
      />
    </div>
  );
}
