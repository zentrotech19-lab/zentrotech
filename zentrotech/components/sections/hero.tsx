"use client";
import { m } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroDemo } from "@/components/sections/hero-demo";
import { SOCIAL } from "@/lib/constants";
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
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <Badge>
              <Sparkles className="size-3" />
              <span>{dict.badge}</span>
            </Badge>

            {/* Slogan kept as a bold eyebrow; the real H1 below carries the
                search keywords (homepage's strongest on-page ranking signal). */}
            <p className="mt-6 text-2xl md:text-3xl font-black tracking-tight text-aurora">
              {dict.title1} {dict.title2}
            </p>

            <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.06] text-white">
              {"AI Voice & WhatsApp Lead Engines for Bangalore SMBs "}
              <span className="text-aurora">— in Kannada</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
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

            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {dict.trustStats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl md:text-3xl font-black text-white">{s.value}</p>
                  <p className="text-xs text-text-muted mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            <HeroDemo />
          </m.div>
        </div>
      </Container>
    </section>
  );
}
