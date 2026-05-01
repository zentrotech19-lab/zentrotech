"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  { num: "01", title: "Discover", desc: "Deep-dive workshops to map your AI opportunity portfolio. We listen, we learn, we benchmark." },
  { num: "02", title: "Design", desc: "Architecture, prompts, agent topology, evaluation harness. Every line of code traceable to a business outcome." },
  { num: "03", title: "Deploy", desc: "Production-grade systems shipped iteratively. Observability, cost guards, rollback paths — built in from day one." },
  { num: "04", title: "Defend & Grow", desc: "Continuous monitoring, retraining, expansion. Your AI gets smarter every quarter, not stale." },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return;
      if (window.matchMedia("(max-width: 1024px)").matches) return;

      const totalScroll = trackRef.current.scrollWidth - window.innerWidth + 200;

      gsap.to(trackRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative py-32 lg:py-0 lg:h-screen overflow-hidden">
      <Container className="lg:hidden">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge>How we work</Badge>
          <h2 className="mt-4 text-4xl font-black text-white">Our 4-step <span className="text-aurora">process</span></h2>
        </div>
        <div className="space-y-6">
          {STEPS.map((s) => (
            <div key={s.num} className="glass rounded-2xl p-8">
              <span className="text-aurora text-sm font-mono">{s.num}</span>
              <h3 className="text-2xl font-bold text-white mt-2">{s.title}</h3>
              <p className="text-text-muted mt-3">{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="hidden lg:flex h-screen items-center">
        <div className="pl-[10vw] absolute top-32">
          <Badge>How we work</Badge>
          <h2 className="mt-4 text-5xl xl:text-7xl font-black text-white">
            Our 4-step <span className="text-aurora">process</span>
          </h2>
        </div>

        <div ref={trackRef} className="flex gap-8 px-[10vw] pt-40">
          {STEPS.map((s) => (
            <div key={s.num} className="shrink-0 w-[60vw] xl:w-[40vw] glass-glow rounded-3xl p-12">
              <span className="text-aurora text-sm font-mono tracking-widest">STEP {s.num}</span>
              <h3 className="text-5xl font-black text-white mt-4">{s.title}</h3>
              <p className="text-text-secondary text-lg mt-6 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
