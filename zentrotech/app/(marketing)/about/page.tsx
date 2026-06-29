import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/cta-section";
import { TrustSignals } from "@/components/sections/trust-signals";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { Reveal } from "@/components/animations/reveal";
import { buildMetadata } from "@/lib/seo";
import { CredoSplit } from "./_components/credo-split";
import { ValuesGrid } from "./_components/values-grid";

export const metadata = buildMetadata({
  title: "About ZentroTECH — Bangalore's Kannada-First AI Agency",
  description:
    "ZentroTECH is Bangalore's done-for-you AI agency for Indian SMBs. Kannada-first AI voice in 11 Indian languages + WhatsApp + lead-engine websites + payment recovery. 21-day delivery, first result or full refund.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <OrganizationSchema />
      <section className="py-24">
        <Container>
          <Reveal>
            <Badge>About</Badge>
          </Reveal>
          <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight max-w-4xl">
            <span className="text-aurora">Bangalore SMBs</span> deserve better than SaaS dashboards.
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl text-text-secondary max-w-2xl">
              ZentroTECH was founded in 2026 on one bet: Indian SMBs doing ₹50L–₹5Cr in revenue don&apos;t need another SaaS to set up &mdash; they need a Bangalore team that ships the whole system. Lead-engine website. AI voice agent in Kannada. WhatsApp follow-up. Payment recovery. One contract. 21 days. Money back if we don&apos;t move your numbers.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <CredoSplit />
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Reveal className="text-center mb-16">
            <Badge>What we believe</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">Four values, no exceptions.</h2>
          </Reveal>
          <ValuesGrid />
        </Container>
      </section>

      <TrustSignals />

      <section className="py-24">
        <Container>
          <Reveal>
            <div className="glass-glow rounded-3xl p-12 md:p-20">
              <Badge>Our 2050 promise</Badge>
              <h2 className="mt-6 text-4xl md:text-5xl font-black text-white max-w-3xl">
                We promise to keep you ahead — not chasing — the AI curve, every year, every quarter, every release.
              </h2>
              <p className="mt-8 text-text-secondary text-lg max-w-2xl">
                The frontier moves fast. Our job is to absorb that speed for you, translate it into capability you can ship, and hand you a business that compounds in value while your competitors are still benchmarking.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Reveal>
        <CTASection />
      </Reveal>
    </>
  );
}
