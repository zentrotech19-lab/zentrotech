"use client";
import { cn } from "@/lib/utils";

export function AuroraBackground({
  className,
  intensity = "medium",
}: {
  className?: string;
  intensity?: "low" | "medium" | "high";
}) {
  const opacity = { low: 0.3, medium: 0.5, high: 0.8 }[intensity];

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden -z-10", className)}>
      <div
        className="absolute -top-1/2 left-1/2 -translate-x-1/2 size-[120vw] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(99,102,241,${opacity}) 0%, transparent 60%)`,
          animation: "aurora 20s ease infinite",
        }}
      />
      <div
        className="absolute top-1/3 right-0 size-[60vw] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(236,72,153,${opacity * 0.5}) 0%, transparent 60%)`,
          animation: "pulse-glow 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 left-0 size-[60vw] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(139,92,246,${opacity * 0.6}) 0%, transparent 60%)`,
          animation: "pulse-glow 10s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}
