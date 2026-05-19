"use client";
import dynamic from "next/dynamic";

// Client-only wrapper so we can use `ssr: false` (forbidden in Server
// Components in Next 16). Keeps three.js + drei off the initial server
// bundle on every page that doesn't render the constellation.
const AgentConstellation3DInner = dynamic(
  () =>
    import("@/components/3d/agent-constellation-3d").then(
      (m) => m.AgentConstellation3D
    ),
  { ssr: false }
);

export function AgentConstellation3D({ className }: { className?: string }) {
  return <AgentConstellation3DInner className={className} />;
}
