"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { LOCALES, LOCALE_META, isLocale, type Locale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  label: string;
}

// Replace the locale segment of a path. Pages outside the localized
// homepage tree (e.g. /services, /contact) get redirected to the chosen
// language's homepage instead — those pages are not yet translated.
function buildHrefForLocale(pathname: string, target: Locale): string {
  const seg = pathname.split("/")[1];
  if (seg && isLocale(seg)) {
    const rest = pathname.slice(seg.length + 1);
    return `/${target}${rest || ""}`;
  }
  return `/${target}`;
}

export function LanguageSwitcher({ currentLocale, label }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-white hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void"
      >
        <Globe className="size-3.5" aria-hidden="true" />
        <span>{LOCALE_META[currentLocale].nativeLabel}</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label={label}
          className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-void/95 backdrop-blur-md shadow-xl py-2 z-50"
        >
          {LOCALES.map((loc) => {
            const active = loc === currentLocale;
            const href = buildHrefForLocale(pathname, loc);
            return (
              <Link
                key={loc}
                href={href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-2 text-sm transition-colors",
                  active ? "text-indigo-glow" : "text-text-secondary hover:text-white hover:bg-white/5"
                )}
              >
                <span>
                  <span className="font-medium">{LOCALE_META[loc].nativeLabel}</span>
                  <span className="text-text-muted text-xs ml-2">{LOCALE_META[loc].label}</span>
                </span>
                {active && <Check className="size-4" aria-hidden="true" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
