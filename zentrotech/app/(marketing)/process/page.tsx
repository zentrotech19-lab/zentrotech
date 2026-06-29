import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/reveal";
import { Tilt } from "@/components/animations/tilt";
import { SOCIAL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { TimelineSpine } from "./_components/timeline-spine";

export const metadata: Metadata = buildMetadata({
  title: "Process — 21-day delivery",
  description:
    "ZentroTECH's 21-day delivery process. Discovery, design, build, test, go-live — daily Loom updates and a first-measurable-result-or-full-refund guarantee.",
  path: "/process",
});

const PHASES = [
  {
    days: "Days 1–3",
    title: "Discovery",
    accent: "from-indigo/40 via-violet/30 to-pink/20",
    bullets: [
      "30-min kick-off call (founders on the call, not a salesperson)",
      "Requirements form covering services, ICP, top 3 lead leaks",
      "Lead-flow audit of your current site, WhatsApp, and missed calls",
      "Stack recommendation + INR estimate in writing by Day 3",
    ],
  },
  {
    days: "Days 4–7",
    title: "Design + sign-off",
    accent: "from-violet/40 via-pink/30 to-indigo/30",
    bullets: [
      "Wireframes for every page",
      "Automation flow diagrams (WhatsApp, voice, payment recovery)",
      "Voice agent scripts in your dialect (Kannada / Hindi / Tamil / Telugu / English)",
      "You approve in writing before we write a line of code",
    ],
  },
  {
    days: "Days 8–17",
    title: "Build",
    accent: "from-pink/40 via-indigo/30 to-violet/30",
    bullets: [
      "Lead-engine site shipped on Next.js + Vercel",
      "WhatsApp Business flows wired to CRM",
      "Voice agent (Bolna / Sarvam) trained on your scripts",
      "Razorpay payment-recovery hooks active",
      "Daily Loom update — what shipped, what's next, where we need you",
    ],
  },
  {
    days: "Days 18–20",
    title: "Test + train",
    accent: "from-indigo/40 via-pink/30 to-violet/30",
    bullets: [
      "End-to-end UAT against your real numbers and real leads",
      "Your team trains on the new stack (1 session, recorded)",
      "Operations playbook delivered (Notion + PDF)",
      "Soft launch — voice agent answers, WhatsApp flows live in shadow",
    ],
  },
  {
    days: "Day 21",
    title: "Go live + refund window resolves",
    accent: "from-violet/40 via-indigo/30 to-pink/30",
    bullets: [
      "Public site live · GBP optimized · indexed in GSC + Bing",
      "Voice agent answering your missed calls (Kannada-first by default)",
      "WhatsApp Business flow live with 5–7 touch nurture",
      "Payment-recovery cadence running on every overdue invoice",
      "First measurable result reviewed (refund window closes if hit; full refund if not)",
    ],
  },
] as const;

const DAY_22 = [
  { label: "Live site", detail: "Indexed, optimized, Core Web Vitals green." },
  { label: "1 WhatsApp flow running", detail: "Every new lead gets a 5–7 touch nurture inside 72 hrs." },
  { label: "1 voice agent answering", detail: "Missed calls picked up 24/7 in your language." },
  { label: "1 invoice-chase sequence", detail: "6-stage cadence over 30 days. Stops the moment payment lands." },
  { label: "Monthly reporting started", detail: "Loom + dashboard on the 1st of every month with named numbers." },
];

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24">
        <Container>
          <Badge>Process</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight max-w-5xl">
            21 days.{" "}
            <span className="text-text-muted">Not 6 months. Not &ldquo;let&rsquo;s scope it.&rdquo;</span>
          </h1>
          <Reveal y={20} delay={0.1}>
            <p className="mt-8 text-xl text-text-secondary max-w-2xl leading-relaxed">
              A published, day-by-day delivery process. Daily Loom updates. Founders on the call. Money-back
              trial starting Day 21.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Phase timeline — "The 21-Day Clock" */}
      <section className="pb-24">
        <Container>
          <TimelineSpine phases={PHASES} />
        </Container>
      </section>

      {/* Day 22 */}
      <section className="pb-24">
        <Container>
          <div className="glass-glow rounded-3xl p-10 md:p-14">
            <Badge>What you get on Day 22</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-white">
              Day 22, your business is already in market.
            </h2>
            <p className="mt-4 text-text-secondary max-w-3xl">
              No &ldquo;phase 2 in Q3.&rdquo; No &ldquo;let&rsquo;s revisit after the discovery extension.&rdquo;
              Every Day-22 deliverable is in production, measurable, and reporting to you.
            </p>
            <Stagger className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DAY_22.map((row) => (
                <StaggerItem key={row.label}>
                  <Tilt className="h-full rounded-2xl border border-white/10 bg-void/40 p-5 transition-colors duration-300 hover:border-indigo/40">
                    <p className="text-sm font-bold text-white">{row.label}</p>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">{row.detail}</p>
                  </Tilt>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <Container>
          <Reveal>
          <div className="glass rounded-3xl p-12 md:p-20 text-center">
            <Badge>Ready to ship?</Badge>
            <h2 className="mt-6 text-3xl md:text-5xl font-black text-white max-w-3xl mx-auto">
              Start the 21-day clock.
            </h2>
            <p className="mt-6 text-text-secondary text-lg max-w-2xl mx-auto">
              Send your current setup and top 3 lead leaks. We&rsquo;ll come back with an INR estimate and a
              start date inside 1 business day.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg" className="pulse-glow">
                Start a project
              </Button>
              <Button href={SOCIAL.whatsapp} external variant="secondary" size="lg">
                WhatsApp us
              </Button>
            </div>
            <p className="mt-6 text-sm text-text-muted">
              See published <Link href="/pricing" className="text-indigo-glow hover:text-white">pricing</Link>{" "}
              and our{" "}
              <Link href="/refund" className="text-indigo-glow hover:text-white">
                21-day refund guarantee
              </Link>
              .
            </p>
          </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
