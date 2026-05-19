import { notFound } from "next/navigation";
import Link from "next/link";
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
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
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
        <CTASection />
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
              <Badge>
                <Sparkles className="size-3" />
                <span>{content.accentLabel}</span>
              </Badge>
              <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
                {service.title}
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-aurora font-bold leading-tight">
                {content.outcomePromise}
              </p>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed">
                {content.overview}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href={SOCIAL.whatsapp} size="lg" external>
                  <FaWhatsapp className="size-5" />
                  WhatsApp us
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Get a Custom Quote <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>

            <div className="relative aspect-square rounded-3xl glass-glow overflow-hidden">
              <ServiceArt motif={content.artMotif} className="absolute inset-0 p-8" />
            </div>
          </div>
        </Container>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl">
            <Badge>Who it's for</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Built for businesses that <span className="text-aurora">need outcomes</span>, not just outputs.
            </h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {content.whoItsFor.map((w) => (
              <div key={w.vertical} className="glass rounded-2xl p-6">
                <h3 className="text-white font-bold">{w.vertical}</h3>
                <p className="mt-3 text-text-muted text-sm leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WHAT YOU GET + HOW IT WORKS */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <Badge>What's included</Badge>
              <h2 className="mt-4 text-3xl md:text-4xl font-black text-white tracking-tight">
                What you get.
              </h2>
              <ul className="mt-8 space-y-3">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 items-start glass rounded-xl p-4">
                    <div className="size-6 rounded-full bg-indigo/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-3.5 text-indigo-glow" />
                    </div>
                    <span className="text-text-secondary text-sm">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <Badge>How it works</Badge>
              <h2 className="mt-4 text-3xl md:text-4xl font-black text-white tracking-tight">
                Four steps to live.
              </h2>
              <ol className="mt-8 space-y-4">
                {content.howItWorks.map((s) => (
                  <li key={s.step} className="flex gap-5 glass rounded-2xl p-6">
                    <div className="text-indigo-glow font-mono font-black text-2xl tabular-nums">{s.step}</div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{s.title}</h3>
                      <p className="text-text-muted text-sm mt-2 leading-relaxed">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* WHY ZENTROTECH */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Badge>Why ZentroTECH</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              We do this <span className="text-aurora">differently</span>.
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {content.whyZentro.map((w, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <div className="text-indigo-glow text-3xl font-black font-mono">0{i + 1}</div>
                <p className="mt-4 text-text-secondary text-sm leading-relaxed">{w}</p>
              </div>
            ))}
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
            <div className="max-w-2xl">
              <Badge>Stack with</Badge>
              <h2 className="mt-4 text-3xl md:text-4xl font-black text-white tracking-tight">
                Often paired with.
              </h2>
              <p className="mt-4 text-text-muted">
                One contract gets you any combination. These are the services that work well alongside {service.title.toLowerCase()}.
              </p>
            </div>
            <div className="mt-10 grid md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="group glass rounded-2xl p-6 hover:border-indigo/40 transition-colors"
                >
                  <h3 className="text-white font-bold">{r.title}</h3>
                  <p className="mt-2 text-text-muted text-sm leading-relaxed">{r.short}</p>
                  <div className="mt-4 flex items-center gap-1 text-indigo-glow text-sm">
                    <span>Learn more</span>
                    <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
