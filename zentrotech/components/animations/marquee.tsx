"use client";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  speed = 30,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("overflow-hidden relative", className)} style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
          width: "max-content",
        }}
      >
        <div className="flex gap-12 items-center">{children}</div>
        <div className="flex gap-12 items-center" aria-hidden>{children}</div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
