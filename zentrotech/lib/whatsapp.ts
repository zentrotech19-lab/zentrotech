import { SITE } from "@/lib/constants";

const WA_NUMBER = SITE.phone.replace(/[^\d]/g, "");

export function waLink(prefillText: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(prefillText)}`;
}

// Audit-specific WhatsApp prefill. Every "WhatsApp us" CTA on the /audit page
// and in audit campaigns uses this so the message that lands on our phone is
// unmistakably an audit request — not a generic "hi". The trailing tag also
// lets us eyeball-attribute the source without a CRM.
//
// Default message is human, Bangalore-voiced, English+Kannada code-switch.
export function auditWaLink(opts?: { vertical?: string; source?: string }): string {
  const vertical = opts?.vertical ? ` (${opts.vertical})` : "";
  const tag = opts?.source ? `\n\n[from: ${opts.source}]` : "";
  const msg =
    `Hi ZentroTECH 👋 — I want the free lead-flow audit for my Bangalore business${vertical}. ` +
    `Where are my missed calls / enquiries leaking, and what would you fix first? ` +
    `Ready to share my number + website.${tag}`;
  return waLink(msg);
}
