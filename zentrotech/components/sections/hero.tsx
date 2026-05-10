"use client";
import { m } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TextScramble } from "@/components/animations/text-scramble";

export function Hero() {
  return (
    <section className="relative min-h-svh flex items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[5%] size-[700px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-15%] bottom-[-10%] size-[500px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 65%)" }}
      />

      <Container className="relative z-10">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <Badge>
            <Sparkles className="size-3" />
            <span>AI Consultancy · Bangalore · Dubai · Global</span>
          </Badge>

          <h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95]">
            <span className="block text-white">Engineering the</span>
            <span className="block text-aurora">
              <TextScramble text="AI of 2050" />
            </span>
            <span className="block text-white">today.</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
            We design and ship agentic AI systems, intelligent automation, and AI-native digital products for ambitious businesses across India, the UAE, and the world.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/services" size="lg">
              Explore Services
              <ArrowRight className="size-4" />
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Book a Call
            </Button>
          </div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex items-center gap-6 text-sm text-text-muted"
          >
            <div className="flex -space-x-2">
              <div className="size-8 rounded-full bg-linear-to-br from-indigo to-indigo-glow border-2 border-void" />
              <div className="size-8 rounded-full bg-linear-to-br from-violet to-indigo border-2 border-void" />
              <div className="size-8 rounded-full bg-linear-to-br from-indigo-glow to-violet border-2 border-void" />
            </div>
            <span>Trusted by ambitious teams in 12+ countries</span>
          </m.div>
        </m.div>
      </Container>
    </section>
  );
}
