import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { SOCIAL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { StackWireUp, type Vendor } from "./_components/stack-wireup";
import { PulseButton } from "./_components/pulse-button";

export const metadata: Metadata = buildMetadata({
  title: "Stack & partners — Meta, Bolna, Sarvam, Razorpay, Vercel",
  description:
    "Our published partner stack: WhatsApp Business API, Bolna + Sarvam voice AI, Razorpay payments, Next.js + Vercel + GCP/Azure. We integrate, you own the outcome.",
  path: "/partners",
});

const PARTNERS: readonly Vendor[] = [
  {
    name: "Meta WhatsApp Business",
    powers: "WhatsApp Business API · BSP architecture",
    detail:
      "Meta-approved Business Solution Provider architecture. Wholesale pricing: ₹0.86 per marketing message · ₹0.13 per utility message — billed direct to your Meta wallet, no markup from us.",
    href: "https://business.whatsapp.com/products/business-platform",
    meta: true,
  },
  {
    name: "Bolna AI",
    powers: "Voice agent infrastructure · inbound + outbound",
    detail:
      "Production-grade voice agent runtime used for our missed-call recovery, lead qualification, and invoice-chase flows. Sub-second response, Indian carrier-grade telephony.",
    href: "https://bolna.ai",
  },
  {
    name: "Sarvam AI",
    powers: "Indian-language LLM + voice (11 languages)",
    detail:
      "Kannada, Hindi, Tamil, Telugu, Malayalam, Marathi, Bengali, Gujarati, Punjabi, Odia, and English. The reason our Kannada voice agents sound like Bangaloreans, not translations.",
    href: "https://sarvam.ai",
  },
  {
    name: "Razorpay",
    powers: "Payment recovery + reconciliation",
    detail:
      "Smart-collect, payment links, and webhook events wired into our 6-stage recovery cadence. Auto-pauses the moment payment lands. Standard Razorpay MDR applies — pass-through, no markup.",
    href: "https://razorpay.com",
  },
  {
    name: "Next.js + Vercel",
    powers: "Lead-engine site runtime + edge hosting",
    detail:
      "Every ZentroTECH site is built on Next.js 16 and shipped on Vercel’s edge network. Core Web Vitals in the green by default, global CDN, automatic image optimization — the table stakes most Indian agencies skip.",
    href: "https://vercel.com",
  },
  {
    name: "Google Cloud + Microsoft Azure",
    powers: "Voice + AI infra fallback · enterprise-grade",
    detail:
      "Where India-first vendors don’t cover a use case, we fall back to GCP Vertex AI / Azure OpenAI / Azure Communication Services. Redundancy you can’t buy from a single-vendor agency.",
    href: "https://cloud.google.com",
  },
] as const;

export default function PartnersPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24">
        <Container>
          <Badge>Stack & partners</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight max-w-4xl">
            Our stack.{" "}
            <span className="bg-linear-to-r from-indigo-glow via-violet to-pink bg-clip-text text-transparent">
              Published.
            </span>
          </h1>
          <p className="mt-8 text-xl text-text-secondary max-w-2xl leading-relaxed">
            Most agencies won&rsquo;t tell you what runs under the hood. We will. Here&rsquo;s every verified
            integration partner we use to build, deploy, and operate ZentroTECH lead engines for Indian SMBs.
          </p>
        </Container>
      </section>

      {/* Partner grid — Stack Wire-Up */}
      <section className="pb-24">
        <Container>
          <StackWireUp vendors={PARTNERS} />
        </Container>
      </section>

      {/* Positioning */}
      <section className="pb-24">
        <Container>
          <Reveal className="glass-glow rounded-3xl p-10 md:p-14 max-w-4xl">
            <Badge>How we use the stack</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-white">
              We don&rsquo;t sell their software.
            </h2>
            <p className="mt-4 text-xl text-text-secondary leading-relaxed">
              We integrate them into systems we build for you, so you own the outcome.
            </p>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                You don&rsquo;t need nine SaaS dashboards. You need one team that knows which tools to wire
                together for your specific Bangalore SMB problem &mdash; missed calls in Kannada, leads sitting
                cold for 11 hours, invoices unpaid past 30 days &mdash; and the engineering discipline to make
                the integration boring and reliable.
              </p>
              <p>
                The accounts stay in your name. The data stays yours. The phone number is yours. The WhatsApp
                Business Account is yours. If you ever fire ZentroTECH, the stack keeps running and you walk
                away with everything we built. That&rsquo;s the difference between an integration partner and a
                lock-in vendor.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <Container>
          <Reveal className="glass rounded-3xl p-12 md:p-20 text-center">
            <Badge>Talk integration</Badge>
            <h2 className="mt-6 text-3xl md:text-5xl font-black text-white max-w-3xl mx-auto">
              Want us to wire this stack into your business?
            </h2>
            <p className="mt-6 text-text-secondary text-lg max-w-2xl mx-auto">
              Send us your current setup &mdash; what you use today for site, WhatsApp, calls, payments &mdash;
              and we&rsquo;ll map a 21-day migration plan. No charge for the plan.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <PulseButton href="/contact" variant="primary" size="lg">
                Map my migration
              </PulseButton>
              <Button href={SOCIAL.whatsapp} external variant="secondary" size="lg">
                WhatsApp us
              </Button>
            </div>
            <p className="mt-6 text-sm text-text-muted">
              See our published <Link href="/pricing" className="text-indigo-glow hover:text-white">pricing</Link>{" "}
              and{" "}
              <Link href="/process" className="text-indigo-glow hover:text-white">
                21-day process
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
