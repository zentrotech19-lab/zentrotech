import { cn } from "@/lib/utils";
import * as React from "react";

export function Card({
  className,
  glow = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { glow?: boolean }) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-300",
        glow ? "glass-glow" : "glass",
        "hover:border-indigo/40 hover:-translate-y-1",
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-xl font-semibold text-white", className)} {...props} />;
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <p className={cn("mt-2 text-text-muted", className)} {...props} />;
}
