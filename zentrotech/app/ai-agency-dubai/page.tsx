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
  title: "AI Agency in Dubai — ZentroTECH",
  description: "Dubai's premium AI agency: agentic AI, intelligent automation, AI-native websites. Helping UAE businesses ship production AI in 2026.",
  path: "/ai-agency-dubai",
});

export default function DubaiLanding() {
  return (
    <>
      <LocalBusinessSchema city="Dubai" />
      <section className="py-24">
        <Container>
          <Badge><MapPin className="size-3" /> Dubai, UAE</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl">
            Dubai&apos;s premium <span className="text-aurora">AI agency</span>, on the ground.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">
            We partner with Dubai enterprises and ambitious mid-market firms to design, ship, and operate agentic AI systems built for the UAE&apos;s regulatory and business climate.
          </p>
          <div className="mt-10 flex gap-4">
            <Button href="/contact" size="lg">Talk to our Dubai team <ArrowRight className="size-4" /></Button>
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
