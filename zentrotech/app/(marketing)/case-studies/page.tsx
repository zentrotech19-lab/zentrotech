import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SOCIAL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/animations/reveal";
import { CaseCard } from "./_components/case-card";
import { ComingSoonCard } from "./_components/coming-soon-card";

export const metadata: Metadata = buildMetadata({
  title: "Case studies — Indian SMB outcomes",
  description:
    "Real Indian SMB outcomes shipped by ZentroTECH. Sample template included until first real engagement closes. More live as clients consent.",
  path: "/case-studies",
});

const CASES = [
  {
    slug: "sample-bangalore-dental-clinic",
    title: "Ledger Resolve — how a Bangalore dental clinic recovered ₹2.1L in unpaid invoices in 21 days",
    vertical: "Multi-clinic dental chain",
    location: "Indiranagar · HSR · Whitefield",
    summary:
      "ICP example showing how our Kannada voice agent + Razorpay-integrated recovery cadence pulled ₹2.1L of overdue invoices back in three weeks.",
    recovered: 210000,
    isSample: true,
  },
] as const;

export default function CaseStudiesIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24">
        <Container>
          <Badge>Case studies</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight max-w-4xl">
            Case studies{" "}
            <span className="text-text-muted">(more shipping as we close clients).</span>
          </h1>
          <p className="mt-8 text-xl text-text-secondary max-w-2xl leading-relaxed">
            ZentroTECH launched in 2026 and we&rsquo;re shipping in 21-day cycles. The sample below is an ICP
            template &mdash; numbers and quotes are illustrative, not from a real client. We&rsquo;ll replace it
            the moment our first real engagement closes and consents to publication.
          </p>
        </Container>
      </section>

      {/* Case grid */}
      <section className="pb-24">
        <Container>
          <div className="grid md:grid-cols-2 gap-6">
            {CASES.map((c) => (
              <CaseCard
                key={c.slug}
                slug={c.slug}
                title={c.title}
                vertical={c.vertical}
                location={c.location}
                summary={c.summary}
                recovered={c.recovered}
                isSample={c.isSample}
              />
            ))}

            {/* Dashed placeholders — Reveal staggered AFTER the real card, stay inert */}
            <ComingSoonCard
              headline="Bangalore salon · WhatsApp + voice agent"
              note="Currently shipping. Case study lands Day 22."
              delay={0.12}
            />
            <ComingSoonCard
              headline="Mysore manufacturer · payment recovery"
              note="In discovery. ETA published once we sign."
              delay={0.24}
            />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <Container>
          <Reveal>
          <div className="relative glass-glow rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            {/* Low-intensity pulsing border glow ring (contained, no harsh edge) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-[1.25rem] border border-indigo/25 pulse-glow opacity-40 blur-[1px]"
            />
            <Badge>Want to be case study #1?</Badge>
            <h2 className="mt-6 text-3xl md:text-5xl font-black text-white max-w-3xl mx-auto">
              We&rsquo;re offering founding-client pricing.
            </h2>
            <p className="mt-6 text-text-secondary text-lg max-w-2xl mx-auto">
              First 5 Bangalore SMBs to sign get founding-client pricing on a 21-day build, in exchange for
              permission to publish the numbers (anonymized if you prefer). Talk to us.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Apply for founding pricing
              </Button>
              <Button href={SOCIAL.whatsapp} external variant="secondary" size="lg">
                WhatsApp us
              </Button>
            </div>
          </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
