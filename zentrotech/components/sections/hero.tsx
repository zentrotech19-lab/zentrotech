"use client";
import { m } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SOCIAL } from "@/lib/constants";
import { AgentConstellation3D } from "@/components/3d/agent-constellation-3d-lazy";
import type { Dictionary } from "@/lib/i18n/types";

interface HeroProps {
  dict: Dictionary["hero"];
}

export function Hero({ dict }: HeroProps) {
  return (
    <section className="relative min-h-svh flex items-center overflow-hidden pt-12">
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
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <Badge>
              <Sparkles className="size-3" />
              <span>{dict.badge}</span>
            </Badge>

            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]">
              <span className="block text-white">{dict.title1}</span>
              <span className="block text-aurora">{dict.title2}</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
              {dict.sub}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={SOCIAL.whatsapp} size="lg" external>
                <FaWhatsapp className="size-5" />
                {dict.ctaWhatsapp}
              </Button>
              <Button href="/contact" size="lg" variant="secondary">
                {dict.ctaQuote}
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <p className="mt-4 text-sm text-text-muted">{dict.ctaSubtext}</p>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              {dict.trustStats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl md:text-3xl font-black text-white">{s.value}</p>
                  <p className="text-xs text-text-muted mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-square rounded-3xl glass-glow overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at center, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.15) 50%, transparent 80%)" }}
              />
              <AgentConstellation3D className="absolute inset-0" />
              <div className="absolute bottom-6 left-6 right-6 text-center pointer-events-none">
                <p className="text-xs uppercase tracking-[0.3em] text-text-muted">AI Agents</p>
                <p className="text-text-secondary text-sm mt-1">Working for your business · 24/7</p>
              </div>
            </div>
          </m.div>
        </div>
      </Container>
    </section>
  );
}
