"use client";

import dynamic from "next/dynamic";

// Client-only wrapper so we can use `ssr: false` (forbidden in Server
// Components in Next 16). ProcessTimeline drags in GSAP + ScrollTrigger,
// keeping it off the initial server bundle saves ~125 kB on every route
// that doesn't render it.
export const ProcessTimeline = dynamic(
  () => import("@/components/sections/process-timeline").then((mod) => mod.ProcessTimeline),
  { ssr: false }
);
