import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/cta-section";
import { getAllCaseStudies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/animations/reveal";
import { ResultCard } from "./_components/result-card";
import { ProofLedger, type LedgerStat } from "./_components/proof-ledger";

export const metadata = buildMetadata({
  title: "Work — Case Studies",
  description:
    "Explore our portfolio of AI agents, automation systems, and AI-native websites we've shipped for clients across India, UAE, and globally.",
  path: "/work",
});

export default async function WorkPage() {
  const cases = await getAllCaseStudies();

  // Aggregate the results[] into a 2×2 proof ledger. These are clean integers so
  // CountUp never sees a NaN; the per-card cards surface the raw metrics.
  const totalMetrics = cases.reduce((n, c) => n + c.results.length, 0);
  const industries = new Set(cases.map((c) => c.industry)).size;
  const ledger: LedgerStat[] = [
    { value: cases.length, prefix: "", suffix: "", decimals: 0, sign: "", label: "Case studies shipped" },
    { value: industries, prefix: "", suffix: "", decimals: 0, sign: "", label: "Industries served" },
    { value: totalMetrics, prefix: "", suffix: "", decimals: 0, sign: "", label: "Measured outcomes" },
    { value: 100, prefix: "", suffix: "%", decimals: 0, sign: "", label: "Projects shipped to prod" },
  ];

  return (
    <>
      <section className="py-24">
        <Container>
          <Badge>Selected work</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight">
            Work that <span className="text-aurora">ships</span>.
          </h1>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <Reveal y={24}>
            <ProofLedger stats={ledger} />
          </Reveal>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid md:grid-cols-2 gap-6">
            {cases.map((c) => (
              <ResultCard
                key={c.slug}
                slug={c.slug}
                client={c.client}
                title={c.title}
                excerpt={c.excerpt}
                industry={c.industry}
                service={c.service}
                results={c.results}
              />
            ))}
          </div>
        </Container>
      </section>

      <Reveal y={24}>
        <CTASection />
      </Reveal>
    </>
  );
}
