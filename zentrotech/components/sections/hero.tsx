"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuroraBackground } from "@/components/animations/aurora-background";
import { TextScramble } from "@/components/animations/text-scramble";

const NeuralOrb = dynamic(() => import("@/components/3d/neural-orb").then((m) => m.NeuralOrb), {
  ssr: false,
  loading: () => <div className="size-[500px] rounded-full bg-linear-to-br from-indigo/30 to-pink-pulse/20 blur-3xl animate-pulse" />,
});

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <AuroraBackground intensity="high" />

      <div className="absolute right-0 top-0 size-full lg:size-[800px] lg:right-[-10%] lg:top-[5%] opacity-90 pointer-events-none">
        <NeuralOrb className="size-full" />
      </div>

      <Container className="relative z-10">
        <motion.div
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex items-center gap-6 text-sm text-text-muted"
          >
            <div className="flex -space-x-2">
              <div className="size-8 rounded-full bg-linear-to-br from-indigo to-pink-pulse border-2 border-void" />
              <div className="size-8 rounded-full bg-linear-to-br from-violet to-cyan-glow border-2 border-void" />
              <div className="size-8 rounded-full bg-linear-to-br from-pink-pulse to-violet border-2 border-void" />
            </div>
            <span>Trusted by ambitious teams in 12+ countries</span>
          </motion.div>
        </motion.div>
      </Container>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted text-xs flex flex-col items-center gap-2">
        <span>Scroll to explore</span>
        <div className="w-px h-12 bg-linear-to-b from-indigo to-transparent animate-pulse" />
      </div>
    </section>
  );
}
