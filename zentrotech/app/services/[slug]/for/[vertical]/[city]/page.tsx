import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { SOUTH_INDIA_CITIES, SERVICES, SITE, SOCIAL } from "@/lib/constants";
import { VERTICALS_CONTENT } from "@/lib/verticals-content";
import { TOP_30_CITIES } from "@/lib/data/top-cities";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, MapPin, Target, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

// 3-way programmatic SEO matrix: service × vertical × top-30 cities.
// 10 × 8 × 30 = 2,400 hyper-targeted local pages. Each page captures
// long-tail searches like "ai chatbot for clinic in koramangala" or
// "lead generation website for restaurants whitefield".

export function generateStaticParams() {
  const params: { slug: string; vertical: string; city: string }[] = [];
  const verticalSlugs = Object.keys(VERTICALS_CONTENT);
  for (const s of SERVICES) {
    for (const v of verticalSlugs) {
      for (const c of TOP_30_CITIES) {
        params.push({ slug: s.slug, vertical: v, city: c });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; vertical: string; city: string }>;
}) {
  const { slug, vertical, city } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  const v = VERTICALS_CONTENT[vertical];
  const c = SOUTH_INDIA_CITIES.find((x) => x.slug === city);
  if (!s || !v || !c) return {};
  return buildMetadata({
    title: `${s.title} for ${v.shortLabel} in ${c.label} | ZentroTECH`,
    description: `${s.short} Built specifically for ${v.label.toLowerCase()} in ${c.label}, ${c.state}. Free 30-min audit. Quote within 1 business day.`,
    path: `/services/${s.slug}/for/${v.slug}/${c.slug}`,
  });
}

const stateLanguage = (state: string) => {
  if (state === "Tamil Nadu") return "Tamil";
  if (state === "Karnataka") return "Kannada";
  if (state === "Andhra Pradesh" || state === "Telangana") return "Telugu";
  if (state === "Kerala") return "Malayalam";
  return "Hindi";
};

export default async function ServiceVerticalCityPage({
  params,
}: {
  params: Promise<{ slug: string; vertical: string; city: string }>;
}) {
  const { slug, vertical, city } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  const v = VERTICALS_CONTENT[vertical];
  const c = SOUTH_INDIA_CITIES.find((x) => x.slug === city);
  if (!s || !v || !c) notFound();

  // Also reject if city isn't in the curated top-30 list
  if (!(TOP_30_CITIES as readonly string[]).includes(c.slug)) notFound();

  const language = stateLanguage(c.state);
  const isBangaloreCore = c.tier === "A";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${s.title} for ${v.label} in ${c.label}`,
    serviceType: s.title,
    description: `${s.description} Built specifically for ${v.label.toLowerCase()} in ${c.label}, ${c.state}.`,
    provider: {
      "@type": "ProfessionalService",
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      email: SITE.email,
    },
    areaServed: {
      "@type": "City",
      name: c.label,
      addressRegion: c.state,
      addressCountry: "IN",
    },
    audience: { "@type": "BusinessAudience", audienceType: v.label },
    url: `${SITE.url}/services/${s.slug}/for/${v.slug}/${c.slug}`,
  };

  // Use 2 vertical-specific pains + 2 vertical use cases woven in
  const topPains = v.pains.slice(0, 2);
  const topUseCases = v.useCases.slice(0, 3);

  const faqs = [
    {
      question: `Do you build ${s.title.toLowerCase()} specifically for ${v.label.toLowerCase()} in ${c.label}?`,
      answer: isBangaloreCore
        ? `Yes — we've built ${s.title.toLowerCase()} engagements for ${v.label.toLowerCase()} across ${c.label} and know which patterns convert here. ${c.label} is our home Bangalore service area so kickoff is same-day and ongoing reviews are in-person.`
        : `Yes — ${v.label.toLowerCase()} in ${c.label} get our full ${s.title.toLowerCase()} playbook adapted for ${c.state} buyer behaviour. Most engagements run via WhatsApp + video calls with monthly on-site visits.`,
    },
    {
      question: `What makes ${s.title} different for ${v.label.toLowerCase()} vs other businesses?`,
      answer: v.pains[0]
        ? `${v.label.toLowerCase()} have specific pain points other businesses don't: ${v.pains[0].headline.toLowerCase()}. We customise our ${s.title.toLowerCase()} engagement to fix those — not a generic template stretched across verticals.`
        : `Our ${s.title.toLowerCase()} engagements are vertical-customised — we map your specific workflow, customer journey, and conversion bottlenecks before writing a single line of code.`,
    },
    {
      question: `How long does ${s.title.toLowerCase()} for a ${c.label} ${v.label.toLowerCase().replace(/s$/, '')} typically take?`,
      answer: `Starter scope: 2-3 weeks. Standard scope: 4-6 weeks. Full bundle: 6-10 weeks. We commit to a fixed timeline in the proposal — no rolling delays. ${c.label} kickoff is usually within 5 business days of contract signing.`,
    },
    {
      question: `Can the chatbot/voice agent speak ${language} for our ${c.label} ${v.label.toLowerCase()}?`,
      answer: `Yes. Default is English, with ${language} + Hindi natively available. ${c.label} ${v.label.toLowerCase()} consistently see 2-3× higher response rates when the bot speaks the customer's preferred regional language — we activate ${language} on day one of the engagement.`,
    },
    {
      question: `What does ${s.title.toLowerCase()} for a ${c.label} ${v.label.toLowerCase().replace(/s$/, '')} cost in 2026?`,
      answer: `Realistic ranges for SMBs (under 500 employees): starter scope ₹35K-75K (one-off), standard ₹1.5L-3L (one-off + ₹15K-25K/month if ongoing), full bundle ₹3L-8L+. We always quote against a deliverables list. Free 30-min audit before quote.`,
    },
    ...v.faqs.slice(0, 2).map((f) => ({ question: f.q, answer: f.a })),
  ];

  // Internal links
  const otherCities = TOP_30_CITIES.filter((x) => x !== c.slug).slice(0, 6);
  const otherVerticals = Object.values(VERTICALS_CONTENT)
    .filter((x) => x.slug !== v.slug)
    .slice(0, 4);

  return (
    <>
      <JsonLd data={schema} />

      <section className="relative overflow-hidden pt-12 pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-[-10%] size-[700px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)" }}
        />
        <Container className="relative">
          <div className="max-w-4xl">
            <Badge>
              <Target className="size-3" />
              <span>{s.title} · {v.shortLabel} · {c.label}</span>
            </Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.0]">
              {s.title} for <span className="text-aurora">{v.shortLabel}</span> in {c.label}.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed">
              {s.description}
            </p>
            <p className="mt-4 text-base text-text-muted max-w-3xl leading-relaxed">
              Built specifically for {v.label.toLowerCase()} in {c.label}, {c.state} — vertical-customised workflows, {language} + English bot/voice support, and ongoing service.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={SOCIAL.whatsapp} size="lg" external>
                <FaWhatsapp className="size-5" />
                WhatsApp from {c.label}
              </Button>
              <Button href="/contact" size="lg" variant="secondary">
                Get a Custom Quote <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* PAINS */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Badge>Pain points we fix for {v.shortLabel} in {c.label}</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Why {c.label} {v.label.toLowerCase()} lose deals.
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {topPains.map((p) => (
              <div key={p.headline} className="glass rounded-2xl p-8">
                <h3 className="text-white font-bold text-lg leading-snug">{p.headline}</h3>
                <p className="mt-3 text-text-muted leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* USE CASES (vertical-specific deliverables) */}
      <section className="py-20 border-t border-white/5">
        <Container>
          <div className="max-w-3xl">
            <Badge>What we build</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              {s.title} deliverables for <span className="text-aurora">{v.shortLabel}</span> in {c.label}.
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {topUseCases.map((u) => (
              <div key={u.title} className="glass rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-indigo-glow shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="text-white font-bold text-base">{u.title}</h3>
                    <p className="mt-2 text-text-muted text-sm leading-relaxed">{u.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* INTERNAL LINKS */}
      <section className="py-20 border-y border-white/5">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Other {v.shortLabel.toLowerCase()} cities we serve
              </h3>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {otherCities.map((cs) => {
                  const c2 = SOUTH_INDIA_CITIES.find((x) => x.slug === cs);
                  if (!c2) return null;
                  return (
                    <Link
                      key={cs}
                      href={`/services/${s.slug}/for/${v.slug}/${cs}`}
                      className="glass rounded-xl p-4 text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-sm">{c2.label}</span>
                      <ArrowRight className="size-4 text-indigo-glow" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                {s.title} for other verticals in {c.label}
              </h3>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {otherVerticals.map((ov) => (
                  <Link
                    key={ov.slug}
                    href={`/services/${s.slug}/for/${ov.slug}/${c.slug}`}
                    className="glass rounded-xl p-4 text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-sm">{ov.shortLabel}</span>
                    <ArrowRight className="size-4 text-indigo-glow" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FaqSection
        faqs={faqs}
        eyebrow="Frequently asked"
        heading={`${s.title} for ${v.shortLabel} in ${c.label} — common questions`}
        id="faq"
      />

      <CTASection />
    </>
  );
}
