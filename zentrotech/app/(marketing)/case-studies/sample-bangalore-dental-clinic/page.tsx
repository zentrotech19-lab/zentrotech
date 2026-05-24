import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SOCIAL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sample: Bangalore dental clinic recovered ₹2.1L (template)",
  description:
    "SAMPLE TEMPLATE — illustrative, not a real client. How ZentroTECH's Kannada voice + Razorpay recovery would land for a 4-clinic dental chain in 21 days.",
  path: "/case-studies/sample-bangalore-dental-clinic",
});

const BEFORE = [
  { label: "Outstanding invoices", value: "₹3.4L" },
  { label: "Missed calls / month", value: "280" },
  { label: "Avg WhatsApp reply time", value: "11 hrs" },
];

const AFTER = [
  { label: "Recovered in 21 days", value: "₹2.1L" },
  { label: "Missed-call recovery rate", value: "88%" },
  { label: "Avg WhatsApp reply time", value: "7 min" },
];

const STACK = [
  { label: "Meta WhatsApp Business", detail: "BSP-routed nurture + reminder flows" },
  { label: "Bolna Kannada voice agent", detail: "Inbound missed-call recovery, 24/7" },
  { label: "Razorpay recovery flow", detail: "Payment links + auto-pause on receipt" },
];

export default function SampleDentalClinicCaseStudyPage() {
  return (
    <article className="py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* VERY visible sample banner */}
          <div
            role="note"
            className="rounded-3xl border-2 border-pink/60 bg-pink/10 p-6 md:p-8"
          >
            <p className="text-xs uppercase tracking-widest text-pink font-mono font-black">
              Sample template — not a real ZentroTECH client
            </p>
            <p className="mt-3 text-xl md:text-2xl font-black text-white">
              The numbers, names, and quote below are illustrative.
            </p>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              We&rsquo;re a 2026-founded agency. This page exists so prospects can see what a real ZentroTECH
              case study will look like once our first engagement closes and the client consents to
              publication. Numbers are based on documented industry baselines and our own targets, not on a
              specific signed client.
            </p>
          </div>

          {/* Title */}
          <p className="mt-12 text-xs uppercase tracking-widest text-indigo-glow font-mono">
            Case study · Sample template
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-black text-white tracking-tight">
            How a Bangalore dental clinic recovered ₹2.1L in unpaid invoices in 21 days
          </h1>
          <p className="mt-4 text-sm text-text-muted italic">
            [Sample template &mdash; replace with first real client.]
          </p>

          {/* Client meta */}
          <div className="mt-10 glass rounded-3xl p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono">Client</p>
                <p className="mt-2 text-white font-bold">4-clinic dental chain</p>
                <p className="text-text-muted">Anonymized · ICP example</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono">Location</p>
                <p className="mt-2 text-white font-bold">Bangalore</p>
                <p className="text-text-muted">Indiranagar · HSR · Whitefield</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono">Timeline</p>
                <p className="mt-2 text-white font-bold">21-day build</p>
                <p className="text-text-muted">21-day refund window: passed without trigger</p>
              </div>
            </div>
          </div>

          {/* Before / After */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-pink/20 bg-pink/[0.04] p-8">
              <p className="text-xs uppercase tracking-widest text-pink font-mono">Before ZentroTECH</p>
              <ul className="mt-6 space-y-4">
                {BEFORE.map((row) => (
                  <li key={row.label}>
                    <p className="text-3xl font-black text-white">{row.value}</p>
                    <p className="text-sm text-text-muted">{row.label}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-indigo/30 bg-indigo/[0.06] p-8 glass-glow">
              <p className="text-xs uppercase tracking-widest text-indigo-glow font-mono">After 21 days</p>
              <ul className="mt-6 space-y-4">
                {AFTER.map((row) => (
                  <li key={row.label}>
                    <p className="text-3xl font-black bg-linear-to-r from-indigo-glow via-violet to-pink bg-clip-text text-transparent">
                      {row.value}
                    </p>
                    <p className="text-sm text-text-muted">{row.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stack */}
          <section className="mt-12">
            <h2 className="text-2xl font-black text-white">Stack used</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {STACK.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="text-sm font-bold text-white">{s.label}</p>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">{s.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-text-muted">
              See full{" "}
              <Link href="/partners" className="text-indigo-glow hover:text-white">
                stack and partners
              </Link>
              .
            </p>
          </section>

          {/* How it worked */}
          <section className="mt-12 space-y-6 text-text-secondary leading-relaxed">
            <h2 className="text-2xl font-black text-white">How the 21 days played out</h2>
            <p>
              Days 1&ndash;3: ZentroTECH ran a lead-flow audit across the chain&rsquo;s three clinics. We found
              280 missed calls a month going unrecovered, mostly during lunch and after 7pm, and an 11-hour
              average WhatsApp reply time on enquiries. Most overdue invoices were follow-up appointments
              where the patient simply forgot. Outstanding receivables: ₹3.4L.
            </p>
            <p>
              Days 4&ndash;7: Wireframes for a 4-page lead-engine microsite, automation diagrams for missed-call
              recovery and invoice-chase, and Kannada voice agent scripts approved by the clinic&rsquo;s reception
              lead. Sign-off in writing on Day 7.
            </p>
            <p>
              Days 8&ndash;17: Built the Next.js site, wired Meta WhatsApp Business for nurture, deployed a
              Kannada-first Bolna voice agent on a virtual number that forwarded missed calls, and integrated
              Razorpay payment links into a 6-stage reminder cadence (Day 0 / 3 / 7 / 14 / 21 / 30). Daily Loom
              updates throughout.
            </p>
            <p>
              Days 18&ndash;20: UAT with real patient data. Reception team trained in one 45-minute session
              (recorded). Soft-launched the voice agent in shadow mode.
            </p>
            <p>
              Day 21: Go-live. Over the following three weeks, the recovery cadence pulled ₹2.1L of overdue
              invoices back into the chain&rsquo;s account, the Kannada voice agent recovered 88% of missed
              calls, and the average WhatsApp reply time dropped from 11 hours to 7 minutes. The money-back
              trial expired without being triggered.
            </p>
          </section>

          {/* Quote */}
          <section className="mt-12">
            {/* TODO (Founder): replace with a real, attributable client quote once we have one. */}
            <blockquote className="glass rounded-3xl p-8 md:p-10 border-l-4 border-indigo">
              <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                &ldquo;[Insert real client quote here]&rdquo;
              </p>
              <p className="mt-4 text-sm text-indigo-glow font-mono">
                &mdash; Clinic owner · Bangalore · [pending real attribution]
              </p>
            </blockquote>
          </section>

          {/* Outcomes block */}
          <section className="mt-12 rounded-3xl border border-indigo/30 bg-indigo/[0.06] p-8 glass-glow">
            <p className="text-xs uppercase tracking-widest text-indigo-glow font-mono">21-day refund window</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-black text-white">
              First measurable result hit. No refund triggered.
            </h2>
            <p className="mt-3 text-text-secondary leading-relaxed">
              Day-21 measurable result was hit, no refund requested, retainer rolled into ongoing Growth tier.
              See our published{" "}
              <Link href="/refund" className="text-indigo-glow hover:text-white">
                refund policy
              </Link>{" "}
              and{" "}
              <Link href="/pricing" className="text-indigo-glow hover:text-white">
                pricing
              </Link>
              .
            </p>
          </section>

          {/* CTA */}
          <section className="mt-12 glass rounded-3xl p-10 md:p-14 text-center">
            <Badge>Want results like this for your business?</Badge>
            <h2 className="mt-4 text-2xl md:text-4xl font-black text-white">
              Same playbook. 21 days. First measurable result, or full refund.
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Start a project
              </Button>
              <Button href={SOCIAL.whatsapp} external variant="secondary" size="lg">
                WhatsApp us
              </Button>
            </div>
            <p className="mt-6 text-sm text-text-muted">
              Back to{" "}
              <Link href="/case-studies" className="text-indigo-glow hover:text-white">
                all case studies
              </Link>
              .
            </p>
          </section>
        </div>
      </Container>
    </article>
  );
}
