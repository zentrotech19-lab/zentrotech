"use client";
import Link from "next/link";
import { m } from "framer-motion";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SOUTH_INDIA_CITIES } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/types";

interface ServiceAreasProps {
  dict: Dictionary["serviceAreas"];
}

export function ServiceAreas({ dict }: ServiceAreasProps) {
  const grouped = (["A", "B", "C", "D"] as const).map((tier) => ({
    tier,
    label: dict.tierLabels[tier],
    cities: SOUTH_INDIA_CITIES.filter((c) => c.tier === tier),
  }));

  return (
    <section className="relative py-24" id="service-areas">
      <Container>
        <div className="max-w-2xl">
          <Badge>{dict.badge}</Badge>
          <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
            {dict.title1} <span className="text-aurora">{dict.title2}</span>
          </h2>
          <p className="mt-5 text-text-secondary text-lg">{dict.sub}</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {grouped.map((g, gi) => (
            <m.div
              key={g.tier}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: gi * 0.07 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 text-indigo-glow text-xs uppercase tracking-widest font-mono">
                <MapPin aria-hidden="true" className="size-3.5" />
                {g.label}
              </div>
              <ul className="mt-4 space-y-2">
                {g.cities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/locations/${c.slug}`}
                      className="text-text-secondary hover:text-white text-sm flex items-center justify-between"
                    >
                      <span>{c.label}</span>
                      <span className="text-text-muted text-xs">{c.state}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
