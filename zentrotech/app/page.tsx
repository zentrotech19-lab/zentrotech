import { Hero } from "@/components/sections/hero";
import { ServicesBento } from "@/components/sections/services-bento";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { TrustSignals } from "@/components/sections/trust-signals";
import { GlobeSection } from "@/components/sections/globe-section";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { CTASection } from "@/components/sections/cta-section";
import { AgentChatDemo } from "@/components/demos/agent-chat-demo";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { OrganizationSchema } from "@/components/seo/organization-schema";

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <Hero />
      <TrustSignals />
      <ServicesBento />
      <ProcessTimeline />

      <section className="relative py-32">
        <Container>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Badge>Live Demo</Badge>
            <h2 className="mt-4 text-4xl md:text-6xl font-black text-white">
              Try a <span className="text-aurora">ZentroTECH</span> agent.
            </h2>
            <p className="mt-6 text-text-muted text-lg">
              This is a sample agent. Real client agents are wired to your data, tools, and workflows.
            </p>
          </div>
          <AgentChatDemo />
        </Container>
      </section>

      <GlobeSection />
      <InsightsPreview />
      <CTASection />
    </>
  );
}
