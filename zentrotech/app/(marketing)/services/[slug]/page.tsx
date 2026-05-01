import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CTASection } from "@/components/sections/cta-section";
import { SERVICES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowRight, Check } from "lucide-react";
import { SITE } from "@/lib/constants";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.title}`,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: ["IN", "AE", "US", "GB"],
    serviceType: service.title,
  };

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
            <Button href="/contact" size="lg">Start a project <ArrowRight className="size-4" /></Button>
            <Button href="/work" variant="secondary" size="lg">See case studies</Button>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white">What you get</h2>
              <ul className="mt-8 space-y-4">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 items-start glass rounded-xl p-4">
                    <div className="size-6 rounded-full bg-indigo/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-4 text-indigo-glow" />
                    </div>
                    <span className="text-text-secondary">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card glow className="p-10">
              <h3 className="text-2xl font-bold text-white">Typical engagement</h3>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <dt className="text-text-muted">Duration</dt><dd className="text-white">8–16 weeks</dd>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <dt className="text-text-muted">Team</dt><dd className="text-white">Lead architect + 2-4 engineers</dd>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <dt className="text-text-muted">Investment</dt><dd className="text-white">From $25K</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Outcome</dt><dd className="text-white">Production-ready system</dd>
                </div>
              </dl>
            </Card>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
