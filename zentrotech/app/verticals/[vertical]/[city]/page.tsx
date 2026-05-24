import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { SOUTH_INDIA_CITIES, SITE, SOCIAL } from "@/lib/constants";
import { VERTICALS_CONTENT } from "@/lib/verticals-content";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

// Programmatic SEO: every vertical × every city. 8 × 138 = 1,104 static pages.

export function generateStaticParams() {
  const params: { vertical: string; city: string }[] = [];
  for (const v of Object.keys(VERTICALS_CONTENT)) {
    for (const c of SOUTH_INDIA_CITIES) {
      params.push({ vertical: v, city: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string; city: string }>;
}) {
  const { vertical, city } = await params;
  const v = VERTICALS_CONTENT[vertical];
  const c = SOUTH_INDIA_CITIES.find((x) => x.slug === city);
  if (!v || !c) return {};
  return buildMetadata({
    title: `${v.label} ${c.label} — Websites + AI Automation | ZentroTECH`,
    description: `Lead-engine websites, AI voice agents, WhatsApp chatbots, and CRM for ${v.label.toLowerCase()} in ${c.label}, ${c.state}. ${v.sub.slice(0, 120)}`,
    path: `/verticals/${v.slug}/${c.slug}`,
  });
}

const stateLanguage = (state: string) => {
  if (state === "Tamil Nadu") return "Tamil";
  if (state === "Karnataka") return "Kannada";
  if (state === "Andhra Pradesh" || state === "Telangana") return "Telugu";
  if (state === "Kerala") return "Malayalam";
  return "Hindi";
};

export default async function VerticalCityPage({
  params,
}: {
  params: Promise<{ vertical: string; city: string }>;
}) {
  const { vertical, city } = await params;
  const v = VERTICALS_CONTENT[vertical];
  const c = SOUTH_INDIA_CITIES.find((x) => x.slug === city);
  if (!v || !c) notFound();

  const language = stateLanguage(c.state);
  const isBangaloreCore = c.tier === "A";
  const isMetro = c.tier === "B";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Websites + AI Automation for ${v.label} in ${c.label}`,
    serviceType: `Digital agency for ${v.label}`,
    description: `Lead-engine websites, AI voice agents, WhatsApp chatbots, and CRM for ${v.label.toLowerCase()} in ${c.label}, ${c.state}.`,
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
    url: `${SITE.url}/verticals/${v.slug}/${c.slug}`,
  };

  const cityFaqs = [
    {
      question: `Do you serve ${v.label.toLowerCase()} in ${c.label}?`,
      answer: isBangaloreCore
        ? `Yes — ${c.label} is part of our home Bangalore service area. We've worked with ${v.label.toLowerCase()} across ${c.label}'s neighborhoods and know what does and doesn't convert for this vertical here.`
        : isMetro
          ? `Yes — we work with ${v.label.toLowerCase()} across ${c.label}. Engagement runs over WhatsApp + video calls with monthly in-person visits for major milestones.`
          : `Yes — ${v.label.toLowerCase()} in ${c.label} get our full playbook adapted for ${c.state} buyer behaviour. Most work runs remotely; in-person available for larger projects.`,
    },
    {
      question: `What does a ${v.label.toLowerCase()} typically pay for ${c.label} digital marketing in 2026?`,
      answer: `Realistic ranges for ${v.label.toLowerCase()} in ${c.label}: starter website + GMB setup ₹35K-60K (one-time); lead engine + WhatsApp chatbot ₹1.5L-3L (one-time + ₹15K-25K/month); full bundle with voice agent + CRM ₹3L-8L. We always quote against a deliverables list.`,
    },
    {
      question: `Can the AI chatbot and voice agent handle ${language} for our ${c.label} customers?`,
      answer: `Yes. Default is English, with ${language} + Hindi available natively for voice + chat. ${c.label} ${v.label.toLowerCase()} consistently see 2-3× higher response rates when the bot speaks the customer's preferred regional language.`,
    },
    ...v.faqs.slice(0, 3).map((f) => ({ question: f.q, answer: f.a })),
  ];

  const siblingCities = SOUTH_INDIA_CITIES.filter(
    (x) => x.tier === c.tier && x.slug !== c.slug
  ).slice(0, 6);
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
              <Building2 className="size-3" />
              <span>{v.label} · {c.label}</span>
            </Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.0]">
              {v.label} in <span className="text-aurora">{c.label}</span>.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed">{v.sub}</p>
            <p className="mt-4 text-base text-text-muted max-w-3xl leading-relaxed">
              Built specifically for {v.label.toLowerCase()} in {c.label}, {c.state} — local context, {language} + English bot/voice support, and ongoing service. Free 30-min audit. Quote within 1 business day.
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

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Badge>Pain points we fix</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Why {v.label.toLowerCase()} in <span className="text-aurora">{c.label}</span> lose deals.
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {v.pains.map((p) => (
              <div key={p.headline} className="glass rounded-2xl p-8">
                <h3 className="text-white font-bold text-lg leading-snug">{p.headline}</h3>
                <p className="mt-3 text-text-muted leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 border-t border-white/5">
        <Container>
          <div className="max-w-3xl">
            <Badge>What we build for {v.shortLabel}</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Concrete deliverables for <span className="text-aurora">{c.label}</span> {v.label.toLowerCase()}.
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {v.useCases.map((u) => (
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

      <section className="py-20 border-y border-white/5">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Other verticals we serve in {c.label}
              </h3>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {otherVerticals.map((ov) => (
                  <Link
                    key={ov.slug}
                    href={`/verticals/${ov.slug}/${c.slug}`}
                    className="glass rounded-xl p-4 text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-sm">{ov.shortLabel}</span>
                    <ArrowRight className="size-4 text-indigo-glow" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
            {siblingCities.length > 0 && (
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {v.shortLabel} in other cities
                </h3>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {siblingCities.map((sc) => (
                    <Link
                      key={sc.slug}
                      href={`/verticals/${v.slug}/${sc.slug}`}
                      className="glass rounded-xl p-4 text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-sm">{sc.label}</span>
                      <ArrowRight className="size-4 text-indigo-glow" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      <FaqSection
        faqs={cityFaqs}
        eyebrow="Frequently asked"
        heading={`${v.label} in ${c.label} — common questions`}
        id="faq"
      />

      <CTASection />
    </>
  );
}
