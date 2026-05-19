"use client";

import dynamic from "next/dynamic";
import type { Dictionary } from "@/lib/i18n/types";

const ProcessTimelineInner = dynamic(
  () => import("@/components/sections/process-timeline").then((mod) => mod.ProcessTimeline),
  { ssr: false }
);

// Client-only wrapper so we can use `ssr: false` (forbidden in Server
// Components in Next 16). ProcessTimeline drags in GSAP + ScrollTrigger,
// keeping it off the initial server bundle saves ~125 kB on every route
// that doesn't render it.
export function ProcessTimeline({ dict }: { dict: Dictionary["process"] }) {
  return <ProcessTimelineInner dict={dict} />;
}
