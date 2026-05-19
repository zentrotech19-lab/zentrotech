"use client";
import dynamic from "next/dynamic";

// Client-only wrapper so we can use `ssr: false` (forbidden in Server
// Components in Next 16). Keeps three.js + drei off the initial server
// bundle on every page that doesn't render the funnel.
const LeadFunnel3DInner = dynamic(
  () => import("@/components/3d/lead-funnel-3d").then((m) => m.LeadFunnel3D),
  { ssr: false }
);

export function LeadFunnel3D({ className }: { className?: string }) {
  return <LeadFunnel3DInner className={className} />;
}
