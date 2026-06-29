import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { ServiceArt } from "@/components/sections/service-art";
import { FaqSection } from "@/components/sections/faq-section";
import { SERVICES } from "@/lib/constants";
import { SITE, SOCIAL } from "@/lib/constants";
import { SERVICE_CONTENT } from "@/lib/services-content";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Reveal } from "@/components/animations/reveal";
import { WhoCards } from "./_components/who-cards";
import { HowItWorks } from "./_components/how-it-works";
import { Deliverables } from "./_components/deliverables";
import { WhyCards } from "./_components/why-cards";
import { RelatedCards } from "./_components/related-cards";
import { ArrowRight, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  const content = SERVICE_CONTENT[slug];
  return buildMetadata({
    title: `${service.title}`,
    description: content?.outcomePromise ?? service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const content = SERVICE_CONTENT[slug];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: content?.overview ?? service.description,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: ["IN"],
    serviceType: service.title,
  };

  // If content data isn't available for a slug, fall back to a minimal layout.
  if (!content) {
    return (
      <>
        <JsonLd data={schema} />
        <section className="py-24">
          <Container>
            <Badge>{service.title}</Badge>
            <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl">
              {service.short}
            </h1>
            <p className="mt-6 text-text-secondary text-lg max-w-2xl">{service.description}</p>
            <div className="mt-10 flex gap-4">
              <Button href="/contact" size="lg">Get a Quote <ArrowRight className="size-4" /></Button>
            </div>
          </Container>
        </section>
        <Reveal>
          <CTASection />
        </Reveal>
      </>
    );
  }

  const related = content.relatedSlugs
    .map((s) => SERVICES.find((srv) => srv.slug === s))
    .filter(Boolean) as typeof SERVICES[number][];

  return (
    <>
      <JsonLd data={schema} />

      {/* HERO */}
      <section className="relative overflow-hidden pt-12 pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-[-10%] size-[700px] rounded-full blur-3xl opacity-50"
          style={{ background: `radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)` }}
        />
        <Container className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal y={16} duration={0.5}>
                <Badge>
                  <Sparkles className="size-3" />
                  <span>{content.accentLabel}</span>
                </Badge>
              </Reveal>
              {/* h1 stays static server-rendered text — it is the LCP */}
              <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
                {service.title}
              </h1>
              <Reveal delay={0.08}>
                <p className="mt-6 text-xl md:text-2xl text-aurora font-bold leading-tight">
                  {content.outcomePromise}
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 text-text-secondary text-lg leading-relaxed">
                  {content.overview}
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button href={SOCIAL.whatsapp} size="lg" external>
                    <FaWhatsapp className="size-5" />
                    WhatsApp us
                  </Button>
                  <Button href="/contact" variant="secondary" size="lg">
                    Get a Custom Quote <ArrowRight className="size-4" />
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="relative aspect-square rounded-3xl glass-glow overflow-hidden">
              <ServiceArt motif={content.artMotif} className="absolute inset-0 p-8" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <Badge>Who it's for</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Built for businesses that <span className="text-aurora">need outcomes</span>, not just outputs.
            </h2>
          </Reveal>
          <div className="mt-10">
            <WhoCards items={content.whoItsFor} />
          </div>
        </Container>
      </section>

      {/* WHAT YOU GET + HOW IT WORKS */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <Badge>What's included</Badge>
                <h2 className="mt-4 text-3xl md:text-4xl font-black text-white tracking-tight">
                  What you get.
                </h2>
              </Reveal>
              <Deliverables items={service.deliverables} />
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <Badge>How it works</Badge>
                <h2 className="mt-4 text-3xl md:text-4xl font-black text-white tracking-tight">
                  Four steps to live.
                </h2>
              </Reveal>
              <HowItWorks steps={content.howItWorks} />
            </div>
          </div>
        </Container>
      </section>

      {/* WHY ZENTROTECH */}
      <section className="py-20">
        <Container>
          <Reveal className="max-w-3xl">
            <Badge>Why ZentroTECH</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              We do this <span className="text-aurora">differently</span>.
            </h2>
          </Reveal>
          <div className="mt-10">
            <WhyCards items={content.whyZentro} />
          </div>
        </Container>
      </section>

      {/* SERVICE-SPECIFIC FAQ */}
      <FaqSection
        faqs={content.faqs.map((f) => ({ question: f.q, answer: f.a }))}
        eyebrow="FAQs"
        heading={`${service.title} — questions buyers ask`}
        intro="Everything we get asked on the first call about this specific service."
      />

      {/* RELATED SERVICES */}
      {related.length > 0 && (
        <section className="py-20">
          <Container>
            <Reveal className="max-w-2xl">
              <Badge>Stack with</Badge>
              <h2 className="mt-4 text-3xl md:text-4xl font-black text-white tracking-tight">
                Often paired with.
              </h2>
              <p className="mt-4 text-text-muted">
                One contract gets you any combination. These are the services that work well alongside {service.title.toLowerCase()}.
              </p>
            </Reveal>
            <div className="mt-10">
              <RelatedCards
                items={related.map((r) => ({ slug: r.slug, title: r.title, short: r.short }))}
              />
            </div>
          </Container>
        </section>
      )}

      <Reveal>
        <CTASection />
      </Reveal>
    </>
  );
}
