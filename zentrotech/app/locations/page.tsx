import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/animations/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { SOUTH_INDIA_CITIES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { CoverageMap } from "./_components/coverage-map";
import { CityGrid } from "./_components/city-grid";

export const metadata = buildMetadata({
  title: "138 Locations — ZentroTECH Service Areas Across South India",
  description:
    "ZentroTECH ships Kannada-first AI voice agents + WhatsApp + lead-engine websites to 138 locations: every Bangalore neighborhood + IT park, South India metros (Chennai, Hyderabad, Coimbatore, Kochi), and Tier-2 commercial centres.",
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
      <OrganizationSchema />
      <section className="relative overflow-hidden pb-16 pt-12">
        <Container className="relative">
          <CoverageMap />
        </Container>
      </section>

      {grouped.map((g) => (
        <section key={g.tier} className="border-t border-white/5 py-10">
          <Container>
            <CityGrid label={g.meta.label} sub={g.meta.sub} items={g.items} />
          </Container>
        </section>
      ))}

      <Reveal>
        <CTASection />
      </Reveal>
    </>
  );
}
