import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/cta-section";
import { SOUTH_INDIA_CITIES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata = buildMetadata({
  title: "All 138 Locations — ZentroTECH Service Areas Across South India",
  description:
    "ZentroTECH builds websites + AI automation for 138 locations across Bangalore neighborhoods, IT parks, South India metros, and Tier-2 commercial centres.",
  path: "/locations",
});

const TIER_META: Record<string, { label: string; sub: string }> = {
  A: { label: "Bangalore — Neighborhoods + IT Parks", sub: "Our home market" },
  B: { label: "South India Metros + Bangalore Satellites", sub: "Top metros across South India" },
  C: { label: "Tier-2 Commercial Centres", sub: "Mid-sized commercial hubs across the South" },
  D: { label: "Tier-2 Secondary", sub: "Smaller commercial + industrial centres" },
};

const TIER_ORDER = ["A", "B", "C", "D"] as const;

export default function LocationsIndexPage() {
  const grouped = TIER_ORDER.map((tier) => ({
    tier,
    meta: TIER_META[tier],
    items: SOUTH_INDIA_CITIES.filter((c) => c.tier === tier),
  }));

  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-[-10%] size-[700px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)" }}
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <Badge>
              <MapPin className="size-3" />
              <span>138 locations</span>
            </Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.0]">
              Service areas across <span className="text-aurora">South India</span>.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-text-secondary leading-relaxed">
              ZentroTECH delivers websites + AI automation across 138 commercial centres — every Bangalore neighborhood, every major IT park, plus key South India metros and Tier-2 cities. Pick your location.
            </p>
          </div>
        </Container>
      </section>

      {grouped.map((g) => (
        <section key={g.tier} className="py-10 border-t border-white/5">
          <Container>
            <div className="max-w-6xl">
              <div className="flex items-baseline gap-4 flex-wrap">
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">{g.meta.label}</h2>
                <span className="text-text-muted text-sm">{g.meta.sub} · {g.items.length} locations</span>
              </div>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {g.items.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/locations/${c.slug}`}
                    className="glass rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors flex items-center justify-between gap-2 text-sm"
                  >
                    <span className="font-medium truncate">{c.label}</span>
                    <ArrowRight className="size-3.5 text-indigo-glow shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}

      <CTASection />
    </>
  );
}
