"use client";
import { m } from "framer-motion";
import { ShieldCheck, BadgeCheck, Languages, Globe2, Clock, Award } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/lib/constants";

// Trust signals — founder-honest version. ZentroTECH launched 2026 so fake
// testimonials and inflated metrics ("47 AI agents in production", "12 countries
// served") would be misleading. This block leans on things that are verifiable
// today: GST registration, money-back trial, response time, languages, infra.
// Replace with real testimonials + AggregateRating schema once 3+ shipped
// clients have given permission.

const PROOFS = [
  {
    icon: BadgeCheck,
    title: "GST-registered Indian business",
    body: `GSTIN ${SITE.gst} · ${SITE.legalForm} · founded ${SITE.founded} · Bengaluru HQ. Verifiable on the GST portal.`,
  },
  {
    icon: ShieldCheck,
    title: "First measurable result in 21 days, or full refund",
    body: "We commit to a specific outcome — lead-response time, qualified-call volume, or invoice DSO — and ship it inside 21 days. If we don't move the number, full refund. No retainer trap. No fine print.",
  },
  {
    icon: Clock,
    title: "15-minute WhatsApp response",
    body: "During business hours we reply on WhatsApp inside 15 minutes. Try it before you commit — that's why the first call is free.",
  },
  {
    icon: Globe2,
    title: "138 cities · 5,000+ indexable pages",
    body: "Programmatic SEO infrastructure built for South India SMBs. Karnataka, Tamil Nadu, Telangana, Andhra Pradesh, Kerala — covered.",
  },
  {
    icon: Languages,
    title: "Six languages, natively",
    body: "English, Hindi, Kannada, Tamil, Telugu, Malayalam. The AI voice and chatbot agents we ship speak the same languages.",
  },
  {
    icon: Award,
    title: "Founder-led, not call-centre led",
    body: "You'll talk to the people who design and ship the work. No account-manager handoffs. No outsourced delivery.",
  },
] as const;

export function TrustSignals() {
  return (
    <section className="relative py-24" id="trust">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <Badge>Why trust us</Badge>
          <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
            We just launched.{" "}
            <span className="text-aurora">Here&apos;s what you can verify today.</span>
          </h2>
          <p className="mt-5 text-text-secondary text-lg">
            We&apos;re a brand-new agency &mdash; no thousand-client backlog to wave at you. Instead, here are the
            things you can check, click, or test yourself before sending a rupee our way.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROOFS.map((p, i) => (
            <m.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-6 md:p-7"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-indigo/10 border border-indigo/30">
                <p.icon aria-hidden="true" className="size-5 text-indigo-glow" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-text-secondary text-sm leading-relaxed">{p.body}</p>
            </m.div>
          ))}
        </div>

        <div className="mt-12 mx-auto max-w-3xl rounded-2xl border border-indigo/30 bg-linear-to-br from-indigo/10 via-violet/5 to-pink/10 p-6 md:p-8 text-center">
          <p className="text-xs uppercase tracking-widest text-indigo-glow font-mono">Founding-client programme</p>
          <p className="mt-3 text-white font-semibold text-lg">
            We&apos;re onboarding our first cohort right now.
          </p>
          <p className="mt-2 text-text-secondary text-sm leading-relaxed">
            Sign on as a founding client and you get: priority delivery, a discounted rate that locks in for the
            first year, and your logo in our Wall of First Clients once the work is live. We will publish your
            real case study with real numbers (with your permission) &mdash; not fake testimonials.
          </p>
        </div>
      </Container>
    </section>
  );
}
