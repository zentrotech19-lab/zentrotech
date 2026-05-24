import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPARE_ENTRIES } from "@/lib/data/compare";
import { SITE, SOCIAL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, CheckCircle2, XCircle, GitCompare } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export function generateStaticParams() {
  return COMPARE_ENTRIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = COMPARE_ENTRIES.find((x) => x.slug === slug);
  if (!c) return {};
  return buildMetadata({
    title: `${c.competitor} vs ZentroTECH — Honest 2026 Comparison for Indian SMBs`,
    description: c.shortPitch,
    path: `/compare/${c.slug}`,
  });
}

const CATEGORY_LABEL: Record<string, string> = {
  "saas-chatbot": "Chatbot SaaS",
  "saas-crm": "CRM SaaS",
  "saas-marketing": "Marketing SaaS",
  agency: "Agency",
  "no-code": "No-Code",
};

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = COMPARE_ENTRIES.find((x) => x.slug === slug);
  if (!c) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.competitor} vs ZentroTECH — Honest 2026 Comparison`,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    description: c.shortPitch,
    url: `${SITE.url}/compare/${c.slug}`,
  };

  return (
    <>
      <JsonLd data={schema} />

      <section className="relative overflow-hidden pt-12 pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-[-10%] size-[700px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)" }}
        />
        <Container className="relative">
          <div className="max-w-4xl">
            <Badge>
              <GitCompare className="size-3" />
              <span>{CATEGORY_LABEL[c.category]} comparison</span>
            </Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.0]">
              <span className="text-text-secondary">{c.competitor}</span>{" "}
              <span className="text-text-muted">vs</span>{" "}
              <span className="text-aurora">ZentroTECH</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-text-secondary leading-relaxed">{c.shortPitch}</p>
          </div>
        </Container>
      </section>

      {/* Competitor overview */}
      <section className="py-12 border-t border-white/5">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              What {c.competitor} is, honestly
            </h2>
            <p className="mt-4 text-text-secondary text-base md:text-lg leading-relaxed">{c.competitorOverview}</p>
          </div>
        </Container>
      </section>

      {/* When competitor wins */}
      <section className="py-12 border-t border-white/5">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                When {c.competitor} wins
              </h2>
              <ul className="mt-6 space-y-3">
                {c.whenCompetitorWins.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-glow rounded-2xl p-8">
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                When ZentroTECH wins
              </h2>
              <ul className="mt-6 space-y-3">
                {c.whenZentroWins.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-indigo-glow shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing comparison */}
      <section className="py-12 border-t border-white/5">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Pricing, side by side</h2>
            <div className="mt-8 space-y-4">
              <div className="glass rounded-xl p-6">
                <p className="text-text-muted text-xs uppercase tracking-widest mb-2">{c.competitor}</p>
                <p className="text-white">{c.pricingCompare.competitor}</p>
              </div>
              <div className="glass-glow rounded-xl p-6">
                <p className="text-text-muted text-xs uppercase tracking-widest mb-2">ZentroTECH</p>
                <p className="text-white">{c.pricingCompare.zentro}</p>
              </div>
              <div className="bg-indigo/10 border border-indigo/30 rounded-xl p-6">
                <p className="text-indigo-glow font-bold text-xs uppercase tracking-widest mb-2">Verdict</p>
                <p className="text-white leading-relaxed">{c.pricingCompare.verdict}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA banner */}
      <section className="py-12">
        <Container>
          <div className="glass-glow rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Want a side-by-side cost for your specific situation?
            </h2>
            <p className="mt-3 text-text-secondary">Free 30-min audit. Quote within 1 business day.</p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button href={SOCIAL.whatsapp} external>
                <FaWhatsapp className="size-4" />
                WhatsApp us
              </Button>
              <Button href="/contact" variant="secondary">
                Get a Custom Quote <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {c.faqs.length > 0 && (
        <FaqSection
          faqs={c.faqs.map((f) => ({ question: f.q, answer: f.a }))}
          eyebrow="Common questions"
          heading={`${c.competitor} vs ZentroTECH FAQ`}
          id="faq"
        />
      )}

      <CTASection />
    </>
  );
}
