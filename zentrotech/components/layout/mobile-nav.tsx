"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock + Escape + focus trap when open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Defer to next tick so the panel is mounted before we try to focus it.
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  // Restore focus to the trigger after closing.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center justify-center min-w-11 min-h-11 rounded-full hover:bg-white/5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        aria-label="Open menu"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-void/95 backdrop-blur-xl"
          >
            <div className="flex justify-end p-6">
              <button
                ref={closeBtnRef}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center min-w-11 min-h-11 rounded-full hover:bg-white/5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                aria-label="Close menu"
              >
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-2 px-6 mt-12">
              {NAV_LINKS.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-3xl font-bold text-white py-3 hover:text-aurora focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-md"
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
              <div className="mt-8">
                <Button href="/contact" size="lg" onClick={() => setOpen(false)}>
                  Book a Call
                </Button>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
