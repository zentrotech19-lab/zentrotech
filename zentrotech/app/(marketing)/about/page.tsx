import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CTASection } from "@/components/sections/cta-section";
import { TrustSignals } from "@/components/sections/trust-signals";
import { buildMetadata } from "@/lib/seo";
import { Eye, Rocket, Heart, Globe2 } from "lucide-react";

export const metadata = buildMetadata({
  title: "About — Our 2050 Promise",
  description: "Why ZentroTECH exists, what we believe, and the vision driving our work in agentic AI and intelligent automation.",
  path: "/about",
});

const VALUES = [
  { icon: Eye, title: "Radical transparency", text: "We tell you when AI is the wrong answer. No hammers looking for nails." },
  { icon: Rocket, title: "Ship over slides", text: "Working software in weeks, not deck cycles in quarters." },
  { icon: Heart, title: "Human-first", text: "Every agent we build amplifies humans. Never replaces care." },
  { icon: Globe2, title: "Globally local", text: "Bangalore engineering, Dubai presence, partnerships everywhere." },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-24">
        <Container>
          <Badge>About</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight max-w-4xl">
            We&apos;re building the AI of <span className="text-aurora">2050</span>, today.
          </h1>
          <p className="mt-8 text-xl text-text-secondary max-w-2xl">
            ZentroTECH was founded on a simple bet: that the next decade belongs to companies who can ship agentic AI faster than their competitors can write a strategy memo about it.
          </p>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glass-glow rounded-3xl p-12">
              <h2 className="text-3xl font-black text-white">Our vision</h2>
              <p className="mt-6 text-text-secondary leading-relaxed">
                A world where every business — from a 5-person startup in Bangalore to a 50,000-person enterprise in Dubai — has access to the kind of AI infrastructure that until now only Big Tech could build.
              </p>
            </div>
            <div className="glass rounded-3xl p-12">
              <h2 className="text-3xl font-black text-white">Our mission</h2>
              <p className="mt-6 text-text-secondary leading-relaxed">
                Design, build, and operate production-grade agentic AI systems for businesses across India, the UAE, and the world — and to do it with engineering discipline, design taste, and radical honesty about what AI can and can&apos;t do.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <Badge>What we believe</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">Four values, no exceptions.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title} className="text-center">
                  <div className="size-14 rounded-2xl bg-linear-to-br from-indigo/20 to-violet/20 mx-auto flex items-center justify-center">
                    <Icon className="size-6 text-indigo-glow" />
                  </div>
                  <h3 className="text-xl font-bold text-white mt-6">{v.title}</h3>
                  <p className="text-text-muted text-sm mt-3">{v.text}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <TrustSignals />

      <section className="py-24">
        <Container>
          <div className="glass-glow rounded-3xl p-12 md:p-20">
            <Badge>Our 2050 promise</Badge>
            <h2 className="mt-6 text-4xl md:text-5xl font-black text-white max-w-3xl">
              We promise to keep you ahead — not chasing — the AI curve, every year, every quarter, every release.
            </h2>
            <p className="mt-8 text-text-secondary text-lg max-w-2xl">
              The frontier moves fast. Our job is to absorb that speed for you, translate it into capability you can ship, and hand you a business that compounds in value while your competitors are still benchmarking.
            </p>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
