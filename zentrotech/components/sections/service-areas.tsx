"use client";
import Link from "next/link";
import { m } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SOUTH_INDIA_CITIES } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/types";

interface ServiceAreasProps {
  dict: Dictionary["serviceAreas"];
}

// Per-tier featured cities (kept short for a horizontal pill layout).
// Full 138-location list lives at /locations.
const FEATURED_PER_TIER: Record<string, string[]> = {
  A: [
    "bangalore",
    "koramangala",
    "hsr-layout",
    "indiranagar",
    "whitefield",
    "electronic-city",
    "jayanagar",
    "manyata-tech-park",
    "embassy-tech-village",
    "mg-road",
  ],
  B: ["chennai", "hyderabad", "kochi", "coimbatore", "pune", "hosur"],
  C: ["mysore", "mangalore", "madurai", "visakhapatnam", "thiruvananthapuram", "kozhikode"],
  D: ["salem", "tirupati", "warangal", "kollam", "ballari", "davangere"],
};

export function ServiceAreas({ dict }: ServiceAreasProps) {
  const grouped = (["A", "B", "C", "D"] as const).map((tier) => ({
    tier,
    label: dict.tierLabels[tier],
    cities: SOUTH_INDIA_CITIES.filter((c) => FEATURED_PER_TIER[tier].includes(c.slug)),
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

        <div className="mt-12 space-y-6">
          {grouped.map((g, gi) => (
            <m.div
              key={g.tier}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: gi * 0.05 }}
              className="glass rounded-2xl p-6 md:p-7"
            >
              <div className="flex items-center gap-2 text-indigo-glow text-xs uppercase tracking-widest font-mono mb-4">
                <MapPin aria-hidden="true" className="size-3.5" />
                {g.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {g.cities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/locations/${c.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-indigo/20 border border-white/10 hover:border-indigo/40 text-text-secondary hover:text-white text-sm transition-colors"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </m.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 text-indigo-glow hover:text-white text-sm font-semibold transition-colors"
          >
            View all 138 service locations
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
