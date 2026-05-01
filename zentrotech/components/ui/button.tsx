"use client";
import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-linear-to-r from-indigo to-violet text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] hover:-translate-y-0.5",
        secondary:
          "bg-white/5 text-white border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20",
        ghost:
          "text-text-secondary hover:text-white hover:bg-white/5",
        outline:
          "border border-indigo/40 text-indigo-glow hover:bg-indigo/10 hover:border-indigo",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  external?: boolean;
}

export function Button({
  className,
  variant,
  size,
  href,
  external,
  children,
  ...props
}: ButtonProps) {
  const cls = cn(buttonVariants({ variant, size }), className);
  if (href) {
    if (external) {
      return (
        <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
