import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SOCIAL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { PricingTiers } from "./_components/pricing-tiers";
import { ShimmerOnce } from "./_components/shimmer-once";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — Indian SMB AI agency (real INR, no quotes)",
  description:
    "Starter, Growth retainer, Mid-market tiers in INR. No 'talk to CEO'. 21-day first-result-or-full-refund guarantee. Built for Indian SMBs.",
  path: "/pricing",
});

const TIERS = [
  {
    name: "Starter",
    tagline: "Lead-engine site + 1 WhatsApp flow + analytics",
    setup: "₹35,000 – ₹75,000",
    monthly: "₹9,999 – ₹14,999 / mo",
    delivery: "14-day delivery",
    accent: "from-indigo/40 via-violet/30 to-pink/20",
    highlight: false,
    features: [
      "Lead-engine website (up to 6 pages)",
      "1 WhatsApp Business flow wired to CRM",
      "Analytics + conversion tracking dashboard",
      "Programmatic SEO seeded for your city + service",
      "Hosting on Vercel, SSL, daily backups",
      "1 voice agent script (Kannada or English) — voice add-on optional",
    ],
  },
  {
    name: "Growth retainer",
    tagline: "Site + WhatsApp + voice agent + lead nurture + monthly optimization",
    setup: "Included in retainer",
    monthly: "₹24,999 – ₹39,999 / mo",
    delivery: "Ongoing · 21-day build, monthly iteration",
    accent: "from-violet/40 via-pink/30 to-indigo/30",
    highlight: true,
    features: [
      "Everything in Starter",
      "Always-on Kannada-first AI voice agent (Bolna / Sarvam)",
      "5–7 touch lead nurture sequence (<72 hrs)",
      "Monthly conversion + DSO optimization",
      "Monthly Loom report + 30-min review call",
      "Priority WhatsApp support (15-min response)",
    ],
  },
  {
    name: "Mid-market",
    tagline: "Full stack + multi-language voice + payment recovery + monthly reporting",
    setup: "Scoped per engagement",
    monthly: "₹60,000 – ₹1,50,000 / mo",
    delivery: "21-day initial build, ongoing monthly",
    accent: "from-pink/40 via-violet/30 to-indigo/30",
    highlight: false,
    features: [
      "Everything in Growth retainer",
      "Multi-language voice agent (Kannada, Hindi, Tamil, Telugu, Malayalam, Marathi, Bengali, Gujarati, Punjabi, Odia, English)",
      "Razorpay-integrated payment recovery (30–50% DSO drop)",
      "CRM build / migration + sales team training",
      "Dedicated account engineer + monthly executive report",
      "Quarterly roadmap review with named founders",
    ],
  },
] as const;

const VOICE_ADDON = [
  {
    label: "Bolna AI voice minutes",
    detail: "Wholesale per-minute rate passed through + 30–50% ZentroTECH operations markup. You see both lines on the invoice.",
  },
  {
    label: "Sarvam AI (Indian-language LLM + voice)",
    detail: "Wholesale token + minute rate passed through + 30–50% markup. Kannada, Hindi, Tamil, Telugu, Malayalam, Marathi, Bengali, Gujarati, Punjabi, Odia, English.",
  },
  {
    label: "Volume tiers",
    detail: "Above 5,000 minutes / month, markup drops to 20%. Above 20,000 minutes, drops to 12%. Published, not negotiated.",
  },
];

const NOT_INCLUDED = [
  {
    label: "Meta WhatsApp wholesale message cost",
    detail: "₹0.86 per marketing message · ₹0.13 per utility message · charged directly by Meta to your BSP wallet. We don't mark this up.",
  },
  {
    label: "DLT registration + voice infrastructure",
    detail: "Telco DLT principal-entity / template registration, SIP trunks, outbound caller-ID provisioning — pass-through at actual cost. We handle the paperwork, you pay the bill.",
  },
  {
    label: "Third-party SaaS licences",
    detail: "Razorpay transaction fees, premium plugin licences, paid stock photography, domain registration — billed to your accounts directly.",
  },
  {
    label: "Paid ad spend",
    detail: "If you run Meta / Google / YouTube ads on top of our funnels, the media spend is yours. We can manage the campaigns under a separate retainer.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24">
        <Container>
          <Badge>Pricing</Badge>
          <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl">
            Real numbers. No <span className="text-text-muted">&ldquo;talk to CEO.&rdquo;</span>{" "}
            <span className="bg-linear-to-r from-indigo-glow via-violet to-pink bg-clip-text text-transparent">
              Pricing for Indian SMBs
            </span>{" "}
            that want to ship.
          </h1>
          <p className="mt-8 text-xl text-text-secondary max-w-2xl leading-relaxed">
            Three SKUs. Published in INR. Founders named. Stack named. First measurable result in 21 days
            or full refund.
          </p>
        </Container>
      </section>

      {/* Tier cards — scroll-in rise L→R, ranged prices tally locally */}
      <section className="pb-24">
        <Container>
          <PricingTiers tiers={TIERS} />
        </Container>
      </section>

      {/* Voice AI add-on */}
      <section className="pb-24">
        <Container>
          <div className="glass rounded-3xl p-10 md:p-14">
            <Badge>Voice AI add-on</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-white">
              Pass-through Bolna / Sarvam at wholesale + 30–50% markup.
            </h2>
            <p className="mt-4 text-text-secondary max-w-3xl">
              We don&rsquo;t hide the upstream cost. You see what Bolna or Sarvam charges us, and you see our
              operations markup on the same invoice. Compare against any other agency &mdash; most won&rsquo;t
              show you either number.
            </p>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {VOICE_ADDON.map((row) => (
                <div key={row.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="text-sm font-bold text-white">{row.label}</p>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">{row.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* What's NOT included */}
      <section className="pb-24">
        <Container>
          <div className="rounded-3xl border border-pink/20 bg-pink/[0.04] p-10 md:p-14">
            <p className="text-xs uppercase tracking-widest text-pink font-mono">What&rsquo;s NOT included</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-white">
              The line items most agencies bury.
            </h2>
            <p className="mt-4 text-text-secondary max-w-3xl">
              These are real costs you&rsquo;ll incur on top of our fees. We publish them because finding out
              about them six weeks into a build is how trust dies.
            </p>
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              {NOT_INCLUDED.map((row) => (
                <div key={row.label} className="rounded-2xl border border-white/10 bg-void/40 p-5">
                  <p className="text-sm font-bold text-white">{row.label}</p>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">{row.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24">
        <Container>
          <div className="glass-glow rounded-3xl p-12 md:p-20 text-center">
            <Badge>21-day guarantee</Badge>
            <h2 className="mt-6 text-3xl md:text-5xl font-black text-white max-w-3xl mx-auto">
              First measurable result in <ShimmerOnce>21 days</ShimmerOnce> or full refund.
            </h2>
            <p className="mt-6 text-text-secondary text-lg max-w-2xl mx-auto">
              We commit to a measurable outcome &mdash; leads captured, calls answered, invoices recovered &mdash;
              by Day 21. If we miss it, you get a full refund. Published in our{" "}
              <Link href="/refund" className="text-indigo-glow hover:text-white">
                refund policy
              </Link>
              .
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Get a custom quote
              </Button>
              <Button href={SOCIAL.whatsapp} external variant="secondary" size="lg">
                WhatsApp us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
