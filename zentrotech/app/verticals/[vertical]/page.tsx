import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { SERVICES, SITE, SOCIAL } from "@/lib/constants";
import { VERTICALS_CONTENT } from "@/lib/verticals-content";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Check,
  AlertCircle,
  Stethoscope,
  Building2,
  ShoppingBag,
  Utensils,
  Scissors,
  GraduationCap,
  Briefcase,
  Factory,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

// Maps the `icon` string from VERTICALS_CONTENT to a Lucide component.
// Mirrors the pattern used in services-bento.tsx so the data file stays
// JSON-safe (no React imports in lib/).
const ICONS: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  Stethoscope,
  Building2,
  ShoppingBag,
  Utensils,
  Scissors,
  GraduationCap,
  Briefcase,
  Factory,
};

export function generateStaticParams() {
  return Object.keys(VERTICALS_CONTENT).map((vertical) => ({ vertical }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical } = await params;
  const v = VERTICALS_CONTENT[vertical];
  if (!v) return {};
  // Title pulls the H1 (already vertical-specific). Description starts
  // with `sub` and tail-loads 2-3 long-tail keywords for SEO without
  // jamming the human-readable copy.
  const tailKeywords = v.keywords.slice(0, 3).join(", ");
  return buildMetadata({
    title: `${v.h1} | ZentroTECH`,
    description: `${v.sub} Keywords: ${tailKeywords}.`,
    path: `/verticals/${v.slug}`,
  });
}

export default async function VerticalPage({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical } = await params;
  const v = VERTICALS_CONTENT[vertical];
  if (!v) notFound();

  const Icon = ICONS[v.icon] ?? Sparkles;

  // Service schema for the vertical — provider Organization, areaServed IN.
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${v.label} — ZentroTECH`,
    serviceType: v.label,
    description: v.sub,
    areaServed: "IN",
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/verticals/${v.slug}`,
  };

  // Look up the full service objects for this vertical's relevant slugs.
  // Preserve the order specified in the data file (most-relevant first).
  const relatedServices = v.services
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter(Boolean) as typeof SERVICES[number][];

  // Sibling verticals — everything else for internal linking.
  const siblings = Object.values(VERTICALS_CONTENT).filter(
    (x) => x.slug !== v.slug
  );

  return (
    <>
      <JsonLd data={schema} />

      {/* HERO — pain-focused, single indigo halo, dual CTAs */}
      <section className="relative overflow-hidden pt-12 pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-[-10%] size-[700px] rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)",
          }}
        />
        <Container className="relative">
          <div className="max-w-4xl">
            <Badge>
              <Sparkles className="size-3" aria-hidden="true" />
              <span>{v.shortLabel}</span>
            </Badge>

            <div className="mt-6 flex items-start gap-5">
              <div className="hidden sm:flex size-14 rounded-2xl bg-linear-to-br from-indigo/20 to-violet/20 border border-indigo/30 items-center justify-center shrink-0">
                <Icon className="size-7 text-indigo-glow" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.0]">
                {v.h1}
              </h1>
            </div>

            <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed">
              {v.sub}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={SOCIAL.whatsapp} size="lg" external>
                <FaWhatsapp className="size-5" />
                WhatsApp for {v.shortLabel}
              </Button>
              <Button href="/contact" size="lg" variant="secondary">
                Get a Custom Quote <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* PAIN POINTS — 4-card grid */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl">
            <Badge>The problem</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Where <span className="text-aurora">{v.shortLabel.toLowerCase()}</span> revenue leaks today.
            </h2>
            <p className="mt-5 text-text-muted text-lg">
              Four patterns we see across every {v.shortLabel.toLowerCase()} engagement before we plug in the automation layer.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {v.pains.map((p) => (
              <div
                key={p.headline}
                className="glass rounded-2xl p-6 flex gap-4 items-start"
              >
                <div className="size-9 rounded-lg bg-indigo/15 border border-indigo/25 flex items-center justify-center shrink-0">
                  <AlertCircle
                    className="size-4 text-indigo-glow"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-snug">
                    {p.headline}
                  </h3>
                  <p className="mt-2 text-text-muted text-sm leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* USE CASES — what we build for this vertical */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl">
            <Badge>What we build</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              What we build for <span className="text-aurora">{v.label}</span>.
            </h2>
            <p className="mt-5 text-text-muted text-lg">
              Concrete systems live in 4-8 weeks. Every use case is wired
              into your existing tools — no rip-and-replace.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {v.useCases.map((u) => (
              <div
                key={u.title}
                className="glass rounded-2xl p-6 flex gap-4 items-start hover:border-indigo/40 transition-colors"
              >
                <div className="size-9 rounded-lg bg-linear-to-br from-indigo/20 to-violet/20 border border-indigo/30 flex items-center justify-center shrink-0">
                  <Check
                    className="size-4 text-indigo-glow"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-snug">
                    {u.title}
                  </h3>
                  <p className="mt-2 text-text-muted text-sm leading-relaxed">
                    {u.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* RELEVANT SERVICES — link cards into /services/[slug] */}
      {relatedServices.length > 0 && (
        <section className="py-20">
          <Container>
            <div className="max-w-2xl">
              <Badge>Services we deploy</Badge>
              <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
                Services most relevant to <span className="text-aurora">{v.shortLabel}</span>.
              </h2>
              <p className="mt-5 text-text-muted text-lg">
                One contract bundles any combination — these are the services that pull the most weight in {v.shortLabel.toLowerCase()} engagements.
              </p>
            </div>

            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group glass rounded-2xl p-6 hover:border-indigo/40 transition-colors"
                >
                  <h3 className="text-white font-bold">{s.title}</h3>
                  <p className="mt-2 text-text-muted text-sm leading-relaxed">
                    {s.short}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-indigo-glow text-sm">
                    <span>Learn more</span>
                    <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/services"
                className="text-indigo-glow hover:text-white text-sm font-medium"
              >
                See all 10 services →
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* KEYWORD COVERAGE STRIP — long-tail SEO without keyword-stuffing */}
      <section className="py-16">
        <Container>
          <div className="rounded-2xl glass p-8">
            <Badge>Search visibility</Badge>
            <h3 className="mt-4 text-xl md:text-2xl font-bold text-white tracking-tight">
              Searches we serve
            </h3>
            <p className="mt-2 text-text-muted text-sm max-w-2xl">
              Long-tail buyer queries our {v.shortLabel.toLowerCase()} pages are built to rank for — pulled from real Indian search demand.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {v.keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-text-muted"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* VERTICAL FAQ */}
      <FaqSection
        faqs={v.faqs.map((f) => ({ question: f.q, answer: f.a }))}
        eyebrow={`${v.label} FAQs`}
        heading={`Common questions from ${v.shortLabel} buyers`}
        intro={`What buyers in ${v.shortLabel.toLowerCase()} ask before signing — answered honestly, in plain language.`}
      />

      {/* SIBLING VERTICALS — internal linking */}
      {siblings.length > 0 && (
        <section className="py-16">
          <Container>
            <div className="rounded-2xl glass p-8">
              <p className="text-xs uppercase tracking-widest text-indigo-glow font-mono">
                <Sparkles
                  className="size-3.5 inline mr-2"
                  aria-hidden="true"
                />
                Also see other verticals
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/verticals/${s.slug}`}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary hover:border-indigo/40 hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="rounded-full border border-indigo/30 bg-indigo/10 px-4 py-2 text-sm text-indigo-glow hover:bg-indigo/20 transition-colors"
                >
                  All verticals →
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
