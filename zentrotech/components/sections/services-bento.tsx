"use client";
import { motion } from "framer-motion";
import { Bot, Zap, Globe, Code2, BrainCircuit, Target, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/constants";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot, Zap, Globe, Code2, BrainCircuit, Target,
};

export function ServicesBento() {
  return (
    <section className="relative py-32" id="services">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-20">
          <Badge>What we do</Badge>
          <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-white">
            Six services, <span className="text-aurora">one north star</span>.
          </h2>
          <p className="mt-6 text-text-muted text-lg">
            From discovery to deployment — we own the full AI lifecycle so your team can ship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link href={`/services/${service.slug}`} className="group block h-full" data-magnetic>
                  <div className="relative h-full rounded-2xl glass p-8 overflow-hidden transition-all duration-500 hover:border-indigo/40 hover:-translate-y-1">
                    <div className="absolute -top-20 -right-20 size-40 rounded-full bg-indigo/10 blur-2xl group-hover:bg-indigo/20 transition-all" />

                    <div className="relative z-10">
                      <div className="size-12 rounded-xl bg-linear-to-br from-indigo/20 to-violet/20 border border-indigo/30 flex items-center justify-center mb-6">
                        {Icon && <Icon className="size-6 text-indigo-glow" />}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-text-muted text-sm leading-relaxed">{service.short}</p>

                      <div className="mt-6 flex items-center gap-2 text-indigo-glow text-sm font-medium">
                        <span>Learn more</span>
                        <ArrowUpRight className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
