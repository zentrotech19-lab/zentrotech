"use client";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Phone, X } from "lucide-react";
import { SITE, SOCIAL } from "@/lib/constants";
import { track } from "@/lib/analytics";

// Sticky floating CTA bar — shows on every page.
// Mobile: full-width bottom bar with WhatsApp + Call buttons (high tap-target).
// Desktop: corner floating bubbles (smaller footprint).
// Dismissible — closed state persisted in sessionStorage so it returns next visit.

const PHONE_HREF = `tel:${SITE.phone.replace(/\s+/g, "")}`;
const DISMISS_KEY = "zt-fcta-dismissed";

export function FloatingCta() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") setDismissed(true);
    } catch {
      // sessionStorage might be unavailable in some embedded contexts
    }
  }, []);

  if (!mounted || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // noop
    }
  };

  return (
    <>
      {/* MOBILE — full-width sticky banner at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[200] pointer-events-none">
        <div className="pointer-events-auto bg-gradient-to-t from-black/95 via-black/90 to-black/0 pt-6 pb-3 px-3">
          <div className="flex gap-2 items-stretch">
            <a
              href={SOCIAL.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp ZentroTECH"
              onClick={() => track("whatsapp_click", { location: "floating_cta_mobile" })}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-3.5 px-4 rounded-full shadow-lg shadow-emerald-500/30 transition-colors text-base"
            >
              <FaWhatsapp className="size-5" />
              WhatsApp Us
            </a>
            <a
              href={PHONE_HREF}
              aria-label={`Call ZentroTECH at ${SITE.phone}`}
              onClick={() => track("call_click", { location: "floating_cta_mobile" })}
              className="inline-flex items-center justify-center bg-indigo hover:bg-indigo/80 text-white font-bold py-3.5 px-4 rounded-full shadow-lg shadow-indigo/30 transition-colors size-[52px] shrink-0"
            >
              <Phone className="size-5" />
            </a>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors size-[52px] shrink-0"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP — corner floating bubbles bottom-right */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-[200] flex-col items-end gap-3">
        <a
          href={SOCIAL.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp ZentroTECH"
          onClick={() => track("whatsapp_click", { location: "floating_cta_desktop" })}
          className="group inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-3 pl-3.5 pr-5 rounded-full shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
        >
          <FaWhatsapp className="size-5" />
          <span className="text-sm">WhatsApp Us</span>
        </a>
        <a
          href={PHONE_HREF}
          aria-label={`Call ZentroTECH at ${SITE.phone}`}
          onClick={() => track("call_click", { location: "floating_cta_desktop" })}
          className="group inline-flex items-center gap-2.5 bg-indigo hover:bg-indigo/85 text-white font-bold py-3 pl-3.5 pr-5 rounded-full shadow-lg shadow-indigo/30 transition-all hover:scale-105"
        >
          <Phone className="size-5" />
          <span className="text-sm">{SITE.phone}</span>
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss floating CTA"
          className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur text-white rounded-full size-7 text-xs transition-colors"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </>
  );
}
