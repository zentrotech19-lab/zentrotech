import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SOCIAL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Case studies — Indian SMB outcomes",
  description:
    "Real Indian SMB outcomes shipped by ZentroTECH. Sample template included until first real engagement closes. More live as clients consent.",
  path: "/case-studies",
});

const CASES = [
  {
    slug: "sample-bangalore-dental-clinic",
    title: "How a Bangalore dental clinic recovered ₹2.1L in unpaid invoices in 21 days",
    vertical: "Multi-clinic dental chain",
    location: "Indiranagar · HSR · Whitefield",
    summary:
      "ICP example showing how our Kannada voice agent + Razorpay-integrated recovery cadence pulled ₹2.1L of overdue invoices back in three weeks.",
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
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group glass rounded-3xl p-8 hover:border-indigo/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {c.isSample && (
                  <span className="self-start inline-flex items-center gap-2 rounded-full bg-pink/20 border border-pink/50 px-3 py-1 text-xs font-black uppercase tracking-widest text-pink">
                    ⚠ Sample template — not a real client
                  </span>
                )}
                <h2 className="mt-5 text-2xl font-black text-white group-hover:text-indigo-glow transition-colors">
                  {c.title}
                </h2>
                <p className="mt-2 text-sm text-indigo-glow font-mono">
                  {c.vertical} · {c.location}
                </p>
                <p className="mt-4 text-sm text-text-secondary leading-relaxed flex-1">{c.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-indigo-glow group-hover:text-white transition-colors">
                  Read the breakdown →
                </span>
              </Link>
            ))}

            {/* Placeholder slots so the grid doesn't look empty */}
            <div className="rounded-3xl border border-dashed border-white/10 p-8 flex flex-col items-start justify-center min-h-[260px]">
              <p className="text-xs uppercase tracking-widest text-text-muted font-mono">Coming soon</p>
              <p className="mt-3 text-lg font-bold text-white/70">
                Bangalore salon · WhatsApp + voice agent
              </p>
              <p className="mt-2 text-sm text-text-muted">
                Currently shipping. Case study lands Day 22.
              </p>
            </div>

            <div className="rounded-3xl border border-dashed border-white/10 p-8 flex flex-col items-start justify-center min-h-[260px]">
              <p className="text-xs uppercase tracking-widest text-text-muted font-mono">Coming soon</p>
              <p className="mt-3 text-lg font-bold text-white/70">
                Mysore manufacturer · payment recovery
              </p>
              <p className="mt-2 text-sm text-text-muted">In discovery. ETA published once we sign.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <Container>
          <div className="glass-glow rounded-3xl p-12 md:p-20 text-center">
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
        </Container>
      </section>
    </>
  );
}
