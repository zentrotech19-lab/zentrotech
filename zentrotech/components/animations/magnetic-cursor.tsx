"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    const enter = () => ringRef.current?.classList.add("scale-150", "border-pink-pulse");
    const leave = () => ringRef.current?.classList.remove("scale-150", "border-pink-pulse");

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-magnetic]").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, [data-magnetic]").forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[200] hidden lg:block size-3 rounded-full bg-indigo-glow mix-blend-difference"
      />
      <motion.div
        ref={ringRef}
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[199] hidden lg:block size-3 rounded-full border-2 border-indigo-glow transition-all duration-200"
      />
    </>
  );
}
