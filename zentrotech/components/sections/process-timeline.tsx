"use client";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/i18n/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessTimelineProps {
  dict: Dictionary["process"];
}

export function ProcessTimeline({ dict }: ProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const STEPS = dict.steps;

  const [useStacked, setUseStacked] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqSmall = window.matchMedia("(max-width: 1024px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setUseStacked(mqSmall.matches || mqReduce.matches);
    update();
    mqSmall.addEventListener("change", update);
    mqReduce.addEventListener("change", update);
    return () => {
      mqSmall.removeEventListener("change", update);
      mqReduce.removeEventListener("change", update);
    };
  }, []);

  useGSAP(
    () => {
      if (useStacked) return;
      if (!containerRef.current || !trackRef.current) return;

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
    { scope: containerRef, dependencies: [useStacked] }
  );

  if (useStacked) {
    return (
      <section ref={containerRef} className="relative py-32">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge>{dict.badge}</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">
              {dict.title1} <span className="text-aurora">{dict.title2}</span>
            </h2>
          </div>
          <ol className="space-y-6">
            {STEPS.map((s) => (
              <li key={s.num} className="glass rounded-2xl p-8">
                <span className="text-aurora text-sm font-mono">{s.num}</span>
                <h3 className="text-2xl font-bold text-white mt-2">{s.title}</h3>
                <p className="text-text-muted mt-3">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <div className="flex h-screen items-center">
        <div className="pl-[10vw] absolute top-32">
          <Badge>{dict.badge}</Badge>
          <h2 className="mt-4 text-5xl xl:text-7xl font-black text-white">
            {dict.title1} <span className="text-aurora">{dict.title2}</span>
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
