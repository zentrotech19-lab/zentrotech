import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { AgentChatDemo } from "@/components/demos/agent-chat-demo";
import { ShowcaseCards } from "@/components/demos/showcase-cards";
import { CTASection } from "@/components/sections/cta-section";
import { Reveal } from "@/components/animations/reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Agent Showcase — Live Demos",
  description: "Try real ZentroTECH AI agents live. Sales, support, research, code, and analytics agents — all built and operated by our team.",
  path: "/showcase",
});

export default function ShowcasePage() {
  return (
    <>
      <section className="py-24">
        <Container>
          <Badge>Live agents</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl">
            Don&apos;t take our word. <span className="text-aurora">Try them.</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">
            These are sandboxed versions of agents we&apos;ve shipped to clients. The real ones have access to your data, your tools, and your workflows.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <AgentChatDemo />
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-black text-white">Production-grade agents we build</h2>
          </Reveal>
          <ShowcaseCards />
        </Container>
      </section>

      <Reveal>
        <CTASection />
      </Reveal>
    </>
  );
}
