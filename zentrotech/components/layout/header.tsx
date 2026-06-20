"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { MobileNav } from "@/components/layout/mobile-nav";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/" || href.match(/^\/(en|ta|kn)$/)) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeHref = `/${locale}`;
  const navItems = [
    { label: dict.nav.services, href: "/services" },
    { label: dict.nav.locations, href: "/locations" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.insights, href: "/insights" },
  ];

  return (
    <m.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-3 backdrop-blur-xl bg-void/60 border-b border-white/5" : "py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href={homeHref} className="group flex items-center gap-2.5" aria-label="ZentroTECH home">
          <img
            src="/brand/logo-mark.svg"
            alt=""
            width={36}
            height={36}
            className="size-9 drop-shadow-[0_0_18px_rgba(139,92,246,0.45)] transition-transform group-hover:scale-105"
          />
          <span className="text-white font-bold tracking-tight text-lg group-hover:text-aurora transition-colors">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm px-4 py-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void",
                  active
                    ? "text-white bg-white/10"
                    : "text-text-muted hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLocale={locale} label={dict.nav.languageLabel} />
          <Button
            href="/audit"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => track("audit_view", { location: "header_cta", source: "nav" })}
          >
            Free Audit
          </Button>
          <MobileNav />
        </div>
      </div>
    </m.header>
  );
}
