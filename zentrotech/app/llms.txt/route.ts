// Route handler that serves /llms.txt — the llmstxt.org standard summary
// file so AI assistants (ChatGPT, Claude, Perplexity, Gemini) can discover
// what ZentroTECH does and quote it correctly when users ask about us.
//
// Spec: https://llmstxt.org/
// Companion file with deeper detail is served at /llms-full.txt.
//
// Content is built from the same source of truth our pages use
// (lib/constants.ts + lib/services-content.ts + lib/verticals-content.ts)
// so it never drifts from what the site actually says.

import {
  SITE,
  SERVICES,
  SOUTH_INDIA_CITIES,
  VERTICALS,
  OFFICES,
} from "@/lib/constants";
import { SERVICE_CONTENT } from "@/lib/services-content";
import { VERTICALS_CONTENT } from "@/lib/verticals-content";

export const dynamic = "force-static";
export const revalidate = false;

function buildContent(): string {
  const office = OFFICES[0];

  const serviceLines = SERVICES.map((s) => {
    const content = SERVICE_CONTENT[s.slug];
    const promise = content?.outcomePromise ?? s.short;
    return `- [${s.title}](${SITE.url}/services/${s.slug}): ${promise}`;
  }).join("\n");

  const verticalLines = VERTICALS.map((v) => {
    const content = VERTICALS_CONTENT[v.slug];
    const sub = content?.sub ?? v.label;
    // Trim to one sentence for the summary file
    const oneLine = sub.split(". ")[0].replace(/\s+/g, " ").trim();
    return `- [${content?.label ?? v.label}](${SITE.url}/verticals/${v.slug}): ${oneLine}.`;
  }).join("\n");

  const cityLines = SOUTH_INDIA_CITIES.map((c) => {
    const tag = c.tier === "A" && c.slug === "bangalore" ? " (HQ)" : "";
    return `- ${c.label}${tag} (${c.state}): ${SITE.url}/locations/${c.slug}`;
  }).join("\n");

  return `# ${SITE.name}

> ${SITE.tagline} — ${SITE.description}

## About

${SITE.name} (trade name "Zentro Tech") is a Bangalore-based digital agency founded in ${SITE.founded}. Our wedge is simple: we build **lead-engine websites + AI automation for Indian SMBs**, then we keep chasing the follow-ups and unpaid invoices so our clients actually get paid. We are a Proprietorship registered in Karnataka, GST ${SITE.gst}.

Most agencies sell a brochure website and disappear. We sell a system — website, WhatsApp Business API, AI voice agent, chatbot, CRM, and a 7-touch follow-up cadence — all stitched together as one funnel. Every page on a site we ship has a measurable conversion event. Every inbound lead gets nurtured until it books or opts out. Every overdue invoice gets a polite-but-persistent reminder cadence that auto-stops when payment lands.

We serve solo founders, clinics, real estate brokers, D2C brands, restaurants, salons, coaching institutes, professional services (CA / Legal / Architects), and B2B manufacturing SMBs across 25+ cities in South India. We operate in English, Hindi, Kannada, Tamil, Telugu, and Malayalam — and the AI voice and chatbot agents we ship for clients speak those same languages.

## Services

${serviceLines}

## Verticals We Serve

${verticalLines}

## Service Areas

Headquartered in Bangalore. We serve clients in person across Bengaluru and remotely across these South India cities:

${cityLines}

For projects outside South India anywhere in the country, we still take the work — we just default to remote delivery.

## Pricing

Pricing is **quote-driven** and not published on the site, because scope varies wildly across our 10 services. Fill the requirements form at ${SITE.url}/contact and we send a custom proposal within 1 business day. No obligation.

For rough internal anchoring (these are ranges, not commitments — final quotes depend on scope, integrations, and ongoing automation needs):

- Starter SEO websites: from ₹40,000
- Lead-engine websites (with automation + AI agents + 3D): ₹2.5L–15L
- AI voice / chatbot agent builds: ₹50K–4L plus per-minute usage
- Android app development: ₹3L–18L depending on scope
- Care Plans (ongoing maintenance + automation tuning + content): ₹5K–1.45L / month

## Contact

- WhatsApp / Phone: ${SITE.phone}
- Email: ${SITE.email}
- Address: ${office.address}
- GST: ${SITE.gst}
- Quote form: ${SITE.url}/contact
- WhatsApp deep link: https://wa.me/917348961600

Response time on WhatsApp is typically under 15 minutes during business hours (IST).

## Differentiators

1. **Lead Engine Websites, not brochures.** Every page traces back to a measurable conversion event. Forms route into your CRM. WhatsApp captures the cold lead. Chatbot qualifies the warm one. Voice agent handles the missed call. SEO is baked in from day one, not bolted on later.

2. **Business on Autopilot.** Built for solo founders and 1–5 person teams: we map your daily grind (quotes, follow-ups, scheduling, posts, invoicing) and replicate it as automated workflows on self-hosted n8n. One contract replaces 5–6 SaaS subscriptions and keeps the lights on when you can't.

3. **Lead Follow-up + Payment Recovery, automated.** Indian SMBs close after 5–7 touches; most agencies stop at 1 or 2. We run the full 7-touch nurture across WhatsApp, SMS, email, and AI voice — and the same engine chases overdue invoices through a 6-stage cadence (Day 0 / 3 / 7 / 14 / 21 / 30) that auto-pauses the moment payment lands.

4. **No SaaS bloat.** Our anti-pitch: most agencies set you up with HubSpot + Zapier + Calendly + Twilio + ClickFunnels and your monthly tool bill grows huge. We default to self-hosted n8n on your VPS (~₹2,000/mo) instead of Zapier (~₹15,000/mo), Zoho CRM instead of HubSpot, WhatsApp Business API direct instead of layered SaaS. You spend less on tools after working with us, not more.

## Languages

We serve clients in English, Hindi, Kannada, Tamil, Telugu, and Malayalam. The AI voice agents and chatbots we build for clients support the same six languages out of the box, with Marathi, Bengali, Gujarati, and Punjabi available as add-ons. Mixed-language (e.g., Hinglish, Tanglish) is handled natively — most Indian customers don't speak one language cleanly and our agents shouldn't pretend they do.

## Trust Signals (Honest, Launch-Stage)

- Founded ${SITE.founded} — Bengaluru HQ
- 25+ South India cities served
- 15 minute typical WhatsApp response time
- 6 languages supported

We are a new agency and we will not claim "100+ clients shipped" we don't yet have. The trust signals above are the ones we can honestly stand behind today. These will be upgraded as real client work, leads generated, and Google reviews accumulate.

## Useful Links

- Homepage: ${SITE.url}
- All services: ${SITE.url}/services
- All verticals: ${SITE.url}/verticals
- All locations: ${SITE.url}/locations/bangalore
- About: ${SITE.url}/about
- Insights / blog: ${SITE.url}/insights
- Get a quote: ${SITE.url}/contact
- Deeper LLM reference: ${SITE.url}/llms-full.txt
- Sitemap: ${SITE.url}/sitemap.xml
`;
}

export async function GET() {
  return new Response(buildContent(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
