"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-3 backdrop-blur-xl bg-void/60 border-b border-white/5" : "py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative size-8 rounded-lg bg-linear-to-br from-indigo to-pink-pulse shadow-[0_0_20px_rgba(99,102,241,0.5)]">
            <div className="absolute inset-0.5 rounded-lg bg-void flex items-center justify-center">
              <span className="text-aurora font-black text-sm">Z</span>
            </div>
          </div>
          <span className="text-white font-bold tracking-tight text-lg group-hover:text-aurora transition-colors">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" size="sm" className="hidden sm:inline-flex">
            Book a Call
          </Button>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
}
