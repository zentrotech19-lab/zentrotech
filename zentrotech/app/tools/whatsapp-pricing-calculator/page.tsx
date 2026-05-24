import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsappPricingCalculator } from "@/components/tools/whatsapp-pricing-calculator";
import { JsonLd } from "@/components/seo/json-ld";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { buildMetadata } from "@/lib/seo";
import { SITE, SOCIAL } from "@/lib/constants";
import { Calculator, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export const metadata = buildMetadata({
  title: "WhatsApp Business API pricing calculator (India)",
  description:
    "Real Meta wholesale rates (Jan 2026) + every BSP markup compared. DIY vs SaaS vs done-for-you, all-in monthly cost. No biased BSP math.",
  path: "/tools/whatsapp-pricing-calculator",
});

const FAQS = [
  {
    q: "Why is service-window messaging free?",
    a: "Meta's policy: when a user messages you first (or interacts with a click-to-WhatsApp ad), you get a 24-hour service window to reply free of charge with any message type. Outside that window, you must use a pre-approved template — which gets billed as marketing or utility.",
  },
  {
    q: "What's the difference between marketing and utility templates?",
    a: "Utility templates serve a specific transaction the user already opted into — order confirmations, OTPs, delivery updates, appointment reminders, payment receipts. Meta charges ₹0.115 each. Marketing templates are promotional, discounts, broadcasts, win-back, anything offer-led — Meta charges ₹0.8631 each. Mis-classify and Meta rejects your template (or worse, reclassifies and bills you the marketing rate).",
  },
  {
    q: "Why does ZentroTECH charge more than DIY?",
    a: "DIY direct-with-Meta has zero per-message markup but you own everything: BSP approval (2–4 weeks), template writing + approval cycles (each takes 24–48hrs and gets rejected often), opt-out compliance under DPDP Act, send-rate monitoring, quality-rating recovery, and the actual integration into your CRM / website / payment system. Most SMBs underestimate the 6–10 hrs/week of ops this takes. Done-for-you bundles all of it into a flat ₹9,999/mo so you ship campaigns same-day instead of chasing approvals.",
  },
];

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "WhatsApp Business API Pricing Calculator (India)",
  description:
    "Free calculator for WhatsApp Business API costs in India using Jan 2026 Meta wholesale rates and BSP markup comparison.",
  url: `${SITE.url}/tools/whatsapp-pricing-calculator`,
  inLanguage: "en-IN",
  isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
};

export default function WhatsappPricingCalculatorPage() {
  return (
    <>
      <OrganizationSchema />
      <JsonLd data={webPageLd} />

      {/* HERO */}
      <section className="relative overflow-hidden pt-12 pb-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-[-10%] size-[700px] rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)",
          }}
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <Badge>
              <Calculator className="size-3" />
              <span>Free tool · No login</span>
            </Badge>
            <h1 className="mt-6 text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.02]">
              What does WhatsApp Business API{" "}
              <span className="text-aurora">actually cost in India?</span>
            </h1>
            <p className="mt-6 text-text-secondary text-lg md:text-xl leading-relaxed">
              Real Meta wholesale rates (Jan 2026) + every BSP&apos;s markup +
              what done-for-you actually costs. No biased BSP blog math.
            </p>
            <p className="mt-4 text-text-muted text-sm md:text-base leading-relaxed max-w-2xl">
              Meta charges you per conversation type — marketing (₹0.8631/msg),
              utility (₹0.1150/msg), or service (free inside the 24-hour
              customer window). Every BSP (AiSensy, WATI, Interakt) adds a
              percentage markup on those rates plus a monthly subscription.
              This calculator strips out the marketing spin and shows the
              all-in monthly cost across DIY, SaaS, and done-for-you.
            </p>
          </div>
        </Container>
      </section>

      {/* CALCULATOR */}
      <section className="pb-20">
        <Container>
          <WhatsappPricingCalculator />
        </Container>
      </section>

      {/* FAQS */}
      <section className="py-16 border-t border-white/5">
        <Container>
          <div className="max-w-3xl">
            <Badge>FAQ</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-white tracking-tight">
              Questions buyers ask before they sign.
            </h2>
            <div className="mt-10 space-y-6">
              {FAQS.map((f) => (
                <div
                  key={f.q}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-white font-bold">{f.q}</h3>
                  <p className="mt-2 text-text-muted text-sm leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <div className="rounded-3xl glass-glow p-10 md:p-14 text-center">
            <Badge>
              <Sparkles className="size-3" />
              <span>Ready to ship?</span>
            </Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Get your custom WhatsApp setup quote
              <br />
              <span className="text-aurora">in 1 business day.</span>
            </h2>
            <p className="mt-6 text-text-muted text-lg max-w-2xl mx-auto">
              We&apos;ll review your message mix, recommend the BSP path that
              fits, and quote a flat all-in number — including templates, CRM
              wiring, opt-out compliance, and 30-day monitoring.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button href={SOCIAL.whatsapp} size="lg" external>
                <FaWhatsapp className="size-5" />
                WhatsApp us
              </Button>
              <Button href="/contact" size="lg" variant="secondary">
                Get a quote
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
