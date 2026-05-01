import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AgentChatDemo } from "@/components/demos/agent-chat-demo";
import { CTASection } from "@/components/sections/cta-section";
import { buildMetadata } from "@/lib/seo";
import { Bot, MessageSquare, FileSearch, Code, BarChart3 } from "lucide-react";

export const metadata = buildMetadata({
  title: "AI Agent Showcase — Live Demos",
  description: "Try real ZentroTECH AI agents live. Sales, support, research, code, and analytics agents — all built and operated by our team.",
  path: "/showcase",
});

const AGENTS = [
  { icon: Bot, name: "Sales SDR Agent", category: "Outreach" },
  { icon: MessageSquare, name: "Support Triage Agent", category: "Customer success" },
  { icon: FileSearch, name: "Research Agent", category: "Knowledge work" },
  { icon: Code, name: "Code Review Agent", category: "Engineering" },
  { icon: BarChart3, name: "Analytics Agent", category: "Data" },
];

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
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white">Production-grade agents we build</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AGENTS.map((a) => {
              const Icon = a.icon;
              return (
                <Card key={a.name}>
                  <div className="size-12 rounded-xl bg-linear-to-br from-indigo/20 to-pink-pulse/20 flex items-center justify-center">
                    <Icon className="size-5 text-indigo-glow" />
                  </div>
                  <h3 className="text-xl font-bold text-white mt-4">{a.name}</h3>
                  <p className="text-text-muted text-sm mt-2">{a.category}</p>
                  <p className="text-xs text-indigo-glow mt-4">Available on engagement</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
