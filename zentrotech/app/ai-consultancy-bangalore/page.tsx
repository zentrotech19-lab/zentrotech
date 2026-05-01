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
  title: "AI Consultancy in Bangalore — ZentroTECH",
  description: "Bangalore's full-service AI consultancy: agentic AI, automation, AI websites. Local team, global standards. Trusted by ambitious Bangalore businesses.",
  path: "/ai-consultancy-bangalore",
});

export default function BangaloreLanding() {
  return (
    <>
      <LocalBusinessSchema city="Bangalore" />
      <section className="py-24">
        <Container>
          <Badge><MapPin className="size-3" /> Bangalore, India</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl">
            Bangalore&apos;s <span className="text-aurora">AI consultancy</span>, built for ambitious operators.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">
            Local engineering, global standards. We work with Bangalore startups, scaleups, and enterprise teams shipping production AI in 2026.
          </p>
          <div className="mt-10 flex gap-4">
            <Button href="/contact" size="lg">Talk to our Bangalore team <ArrowRight className="size-4" /></Button>
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
