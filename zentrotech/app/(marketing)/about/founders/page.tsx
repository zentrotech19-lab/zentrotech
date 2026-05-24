import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE, SOCIAL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Founders — ZentroTECH Bangalore AI agency team",
  description:
    "The founding team behind ZentroTECH. Named people, named bios, named LinkedIn — transparency for Indian SMBs tired of faceless agencies.",
  path: "/about/founders",
});

// ────────────────────────────────────────────────────────────────────────
// TODO (Founder): Replace placeholder cards below with real photos, names,
// titles, bios, and LinkedIn URLs. Photos go in /public/team/ as JPG/PNG.
// Until real assets land, the brand mark serves as the placeholder image.
// ────────────────────────────────────────────────────────────────────────
const FOUNDERS = [
  {
    slug: "founder-1",
    name: "Founder name — to be added",
    title: "Founding Team · ZentroTECH",
    bio:
      "Two-sentence placeholder bio. The real bio will cover what this founder built before ZentroTECH, what they personally ship at ZentroTECH today, and why an Indian SMB owner should trust them with their lead engine.",
    linkedin: "https://linkedin.com/in/zentrotech",
    photo: "/brand/logo-mark.svg",
  },
  {
    slug: "founder-2",
    name: "Founder name — to be added",
    title: "Founding Team · ZentroTECH",
    bio:
      "Two-sentence placeholder bio. The real bio will cover engineering background, customer-facing work at ZentroTECH today, and a verifiable proof point (project shipped, system built, talk given).",
    linkedin: "https://linkedin.com/in/zentrotech",
    photo: "/brand/logo-mark.svg",
  },
  {
    slug: "founder-3",
    name: "Founder name — to be added",
    title: "Founding Team · ZentroTECH",
    bio:
      "Two-sentence placeholder bio. The real bio will name the founder, their delivery / ops / GTM remit at ZentroTECH, and one concrete thing they personally guarantee for every engagement.",
    linkedin: "https://linkedin.com/in/zentrotech",
    photo: "/brand/logo-mark.svg",
  },
];

const PRINCIPLES = [
  {
    title: "Transparency",
    text: "Published prices. Published stack. Published founders. We tell you what Meta charges us per WhatsApp message and what we mark up on voice minutes — on the same invoice.",
  },
  {
    title: "Speed",
    text: "21-day delivery, not 6-month discovery. Daily Loom updates while we build. WhatsApp response in 15 minutes. We respect your time because every day a lead leaks is your money.",
  },
  {
    title: "Real numbers",
    text: "30–50% of unpaid invoices recovered. 5–7 follow-up touches inside 72 hours. 21-day first measurable result — or full refund. 11 Indian languages across 138 cities. We repeat the same numbers everywhere because they're measurable, and you can hold us to them.",
  },
];

export default function FoundersPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24">
        <Container>
          <Badge>The team</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight max-w-4xl">
            Built by{" "}
            <span className="bg-linear-to-r from-indigo-glow via-violet to-pink bg-clip-text text-transparent">
              people
            </span>
            , not a sales team.
          </h1>
          <p className="mt-8 text-xl text-text-secondary max-w-2xl leading-relaxed">
            Every Indian agency hides behind a logo. We don&rsquo;t. Named founders, named bios, named LinkedIn
            profiles. If something breaks on your project, you know exactly who to message.
          </p>
        </Container>
      </section>

      {/* Founder cards */}
      <section className="pb-24">
        <Container>
          {/* Placeholder disclosure — required while founder bios are pending. */}
          <div
            role="note"
            className="mb-10 rounded-3xl border-2 border-pink/60 bg-pink/10 p-6 md:p-7 max-w-3xl"
          >
            <p className="text-xs uppercase tracking-widest text-pink font-mono font-black">
              Founder bios pending
            </p>
            <p className="mt-2 text-text-secondary leading-relaxed">
              The agency is real and operating; the photos and bios below are placeholders. We&rsquo;ll have
              named LinkedIn profiles and verifiable bios published before our first paid engagement.
            </p>
          </div>
          {/* TODO (Founder): Replace placeholder cards with real photo + name + title + bio + LinkedIn for each founder. */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOUNDERS.map((f) => (
              <div
                key={f.slug}
                className="glass rounded-3xl p-8 hover:border-indigo/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div
                  className="size-24 rounded-2xl bg-linear-to-br from-indigo/20 to-violet/20 flex items-center justify-center overflow-hidden"
                  aria-hidden="true"
                >
                  <Image
                    src={f.photo}
                    alt=""
                    width={64}
                    height={64}
                    className="size-16 object-contain"
                  />
                </div>
                <h2 className="mt-6 text-xl font-black text-white">{f.name}</h2>
                <p className="mt-1 text-sm text-indigo-glow font-mono">{f.title}</p>
                <p className="mt-4 text-sm text-text-secondary leading-relaxed flex-1">{f.bio}</p>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-indigo-glow hover:text-white transition-colors"
                >
                  LinkedIn →
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why we started */}
      <section className="pb-24">
        <Container>
          <div className="glass-glow rounded-3xl p-10 md:p-14 max-w-4xl">
            <Badge>Why we started ZentroTECH</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-white">
              Indian SMBs deserve better than SaaS dashboards or 6-month-discovery agencies.
            </h2>
            <div className="mt-6 space-y-5 text-text-secondary leading-relaxed">
              <p>
                We&rsquo;ve watched the same story play out across Bangalore, Mysore, Coimbatore, and Hyderabad
                for years. A clinic, a salon, a 4-store retail chain, a small manufacturer &mdash; smart owners
                running real businesses &mdash; get sold a stack of nine SaaS tools they never use, or a
                six-month &ldquo;digital transformation&rdquo; that ships nothing but slides. Meanwhile the
                actual problem &mdash; missed calls in Kannada, leads sitting in a WhatsApp inbox for 11 hours,
                invoices going unpaid because nobody wants to make the awkward call &mdash; never gets solved.
              </p>
              <p>
                ZentroTECH exists to close that gap. We build lead-engine websites, Kannada-first AI voice
                agents, and WhatsApp + payment-recovery automation for Bangalore SMBs &mdash; in 21 days, with
                published prices, with named founders on the call. We&rsquo;d rather refund a client than carry
                a project neither side is excited about. That&rsquo;s why every engagement starts with a 21-day
                money-back trial. We win when you win, in measurable INR. No dashboards to log into. No
                six-month discovery. Just real numbers, shipped fast, by people who pick up their own phones.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What we stand for */}
      <section className="pb-24">
        <Container>
          <div className="text-center mb-12">
            <Badge>What we stand for</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white">Three principles. No exceptions.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="glass rounded-3xl p-8 hover:border-indigo/40 hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-2xl font-black text-white">{p.title}</h3>
                <p className="mt-4 text-sm text-text-secondary leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <Container>
          <div className="glass-glow rounded-3xl p-12 md:p-20 text-center">
            <Badge>Talk to us directly</Badge>
            <h2 className="mt-6 text-3xl md:text-5xl font-black text-white max-w-3xl mx-auto">
              DM us <span className="text-aurora">&ldquo;AUDIT&rdquo;</span> on WhatsApp for a free 15-min lead-flow teardown.
            </h2>
            <p className="mt-6 text-text-secondary text-lg max-w-2xl mx-auto">
              No deck. No sales call. We&rsquo;ll record a 15-minute Loom looking at your current funnel and tell
              you the top 3 things to fix &mdash; whether or not you hire {SITE.name}.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href={SOCIAL.whatsapp} external variant="primary" size="lg">
                DM &ldquo;AUDIT&rdquo; on WhatsApp
              </Button>
              <Link
                href="/contact"
                className="text-sm text-text-muted hover:text-white transition-colors"
              >
                Or use the contact form →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
