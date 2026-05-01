import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServicesBento } from "@/components/sections/services-bento";
import { TrustSignals } from "@/components/sections/trust-signals";
import { CTASection } from "@/components/sections/cta-section";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { buildMetadata } from "@/lib/seo";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "AI Development in the UAE — ZentroTECH",
  description: "End-to-end AI development partner for UAE businesses. Agentic systems, automation, AI websites — engineered with global standards, delivered locally.",
  path: "/ai-development-uae",
});

export default function UAELanding() {
  return (
    <>
      <LocalBusinessSchema city="Dubai" />
      <section className="py-24">
        <Container>
          <Badge><MapPin className="size-3" /> United Arab Emirates</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl">
            UAE&apos;s full-stack <span className="text-aurora">AI development</span> partner.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">
            From Abu Dhabi to Sharjah, we build production-grade AI agents, automation systems, and AI-powered digital products for UAE enterprises and innovators.
          </p>
          <div className="mt-10 flex gap-4">
            <Button href="/contact" size="lg">Start a UAE project <ArrowRight className="size-4" /></Button>
            <Button href="/services" variant="secondary" size="lg">Explore services</Button>
          </div>
        </Container>
      </section>
      <TrustSignals />
      <ServicesBento />
      <CTASection />
    </>
  );
}
