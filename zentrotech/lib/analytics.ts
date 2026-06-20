// Central GA4 conversion-event layer for ZentroTECH.
//
// WHY THIS FILE EXISTS (the shared foundation for every growth play):
// Every other play — LinkedIn, GBP, comment outreach, lead-magnet — needs a
// single, consistent way to (a) fire a GA4 event and (b) route a user to the
// right destination. If each surface invents its own event names, attribution
// is impossible. So all conversions go through `track()` with a fixed event
// vocabulary, and every outbound link carries UTM/source params so GA4 can
// tell us which channel produced the lead.
//
// GA4 measurement ID lives in app/layout.tsx (G-T55FHNYHSM). gtag is loaded
// there via next/script; this module just pushes events to the same dataLayer.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// The full conversion vocabulary. Keep this list as the single source of truth.
// In GA4 → Admin → Events, mark these as "Key events" (conversions):
//   audit_lead_submit, whatsapp_click, contact_lead_submit, call_click
export type ZtEvent =
  // Primary conversions (the only metrics that matter — quality leads)
  | "audit_lead_submit" // free lead-flow audit requested via /audit form
  | "contact_lead_submit" // full requirements form on /contact submitted
  | "whatsapp_click" // any "WhatsApp us" tap (prefilled, attributable)
  | "call_click" // any tel: click
  // Micro-conversions / funnel steps (diagnose drop-off, not billed on)
  | "audit_view" // /audit page viewed (set as the audit funnel entry)
  | "audit_form_start" // user focused the first audit field
  | "lead_magnet_download" // audit checklist / playbook PDF downloaded
  | "outbound_social_click"; // clicked our own LinkedIn / IG / X from site

export interface ZtEventParams {
  // Where the action happened, e.g. "audit_page", "floating_cta", "footer".
  location?: string;
  // Channel that brought the user, e.g. "linkedin", "gbp", "organic".
  source?: string;
  // Free-form label, e.g. the vertical or city.
  label?: string;
  // Monetary value for GA4 value-based bidding / reporting (INR).
  value?: number;
  [key: string]: unknown;
}

/**
 * Fire a GA4 event. Safe to call on the server (no-op) and before gtag loads
 * (queues onto dataLayer). Never throws.
 */
export function track(event: ZtEvent, params: ZtEventParams = {}): void {
  if (typeof window === "undefined") return;
  try {
    const payload = { send_to: "G-T55FHNYHSM", ...params };
    if (typeof window.gtag === "function") {
      window.gtag("event", event, payload);
    } else {
      // gtag not ready yet — push raw so it flushes once the script loads.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(["event", event, payload]);
    }
  } catch {
    // analytics must never break the UX
  }
}

/**
 * Append UTM + source params to an internal or external URL so the
 * destination (and GA4) can attribute the lead to the right channel.
 * Used by LinkedIn posts, GBP, email signatures linking to /audit.
 */
export function withUtm(
  url: string,
  utm: { source: string; medium?: string; campaign?: string; content?: string }
): string {
  const hasQuery = url.includes("?");
  const sep = hasQuery ? "&" : "?";
  const params = new URLSearchParams({
    utm_source: utm.source,
    utm_medium: utm.medium ?? "social",
    utm_campaign: utm.campaign ?? "audit_match",
    ...(utm.content ? { utm_content: utm.content } : {}),
  });
  return `${url}${sep}${params.toString()}`;
}
