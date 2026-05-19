"use client";
import { m } from "framer-motion";
import { Target, Cpu, MessageSquare, Wallet } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/i18n/types";

const ICONS = [Target, Cpu, MessageSquare, Wallet];

interface UspStripProps {
  dict: Dictionary["usps"];
}

export function UspStrip({ dict }: UspStripProps) {
  return (
    <section className="relative py-24">
      <Container>
        <div className="max-w-2xl">
          <Badge>{dict.badge}</Badge>
          <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
            {dict.title1} <span className="text-aurora">{dict.title2}</span> {dict.title3}
          </h2>
          <p className="mt-5 text-text-secondary text-lg">{dict.sub}</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {dict.items.map((u, i) => {
            const Icon = ICONS[i] ?? Target;
            return (
              <m.div
                key={u.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 hover:border-indigo/40 transition-colors"
              >
                <div className="size-11 rounded-xl bg-indigo/15 text-indigo-glow flex items-center justify-center">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-white font-bold text-lg">{u.title}</h3>
                <p className="mt-2 text-text-muted text-sm leading-relaxed">{u.body}</p>
              </m.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
