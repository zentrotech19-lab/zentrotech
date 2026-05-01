import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ServicesBento } from "@/components/sections/services-bento";
import { CTASection } from "@/components/sections/cta-section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services — AI Agents, Automation, Websites & More",
  description: "Six core AI services from ZentroTECH: agentic AI, intelligent automation, AI-powered websites, agentic coding, LLM integration, and strategy consulting.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="py-24">
        <Container>
          <Badge>Services</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight">
            Six services. <span className="text-aurora">One outcome:</span> shipped AI.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">
            Pick one. Stack several. We meet your business where it is and architect the AI system that gets you to where you're going.
          </p>
        </Container>
      </section>
      <ServicesBento />
      <CTASection />
    </>
  );
}
