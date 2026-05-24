import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { SOUTH_INDIA_CITIES, SERVICES, SITE, SOCIAL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

// Programmatic SEO: every service × every city. 10 × 138 = 1,380 static pages.

export function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const s of SERVICES) {
    for (const c of SOUTH_INDIA_CITIES) {
      params.push({ slug: s.slug, city: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  const c = SOUTH_INDIA_CITIES.find((x) => x.slug === city);
  if (!s || !c) return {};
  return buildMetadata({
    title: `${s.title} in ${c.label} | ZentroTECH`,
    description: `${s.short} ZentroTECH builds ${s.title.toLowerCase()} for businesses in ${c.label}, ${c.state}. Free 30-min audit. Quote within 1 business day.`,
    path: `/services/${s.slug}/${c.slug}`,
  });
}

const stateLanguage = (state: string): { primary: string; combo: string } => {
  if (state === "Tamil Nadu") return { primary: "Tamil", combo: "Tamil + English" };
  if (state === "Karnataka") return { primary: "Kannada", combo: "Kannada + English" };
  if (state === "Andhra Pradesh" || state === "Telangana")
    return { primary: "Telugu", combo: "Telugu + English" };
  if (state === "Kerala") return { primary: "Malayalam", combo: "Malayalam + English" };
  return { primary: "Hindi", combo: "Hindi + English" };
};

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  const c = SOUTH_INDIA_CITIES.find((x) => x.slug === city);
  if (!s || !c) notFound();

  const lang = stateLanguage(c.state);
  const isBangaloreCore = c.tier === "A";
  const isMetro = c.tier === "B";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${s.title} in ${c.label}`,
    serviceType: s.title,
    description: `${s.description} Serving ${c.label}, ${c.state}.`,
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
    url: `${SITE.url}/services/${s.slug}/${c.slug}`,
  };

  const faqs = [
    {
      question: `Do you offer ${s.title} in ${c.label}?`,
      answer: isBangaloreCore
        ? `Yes — ${c.label} is part of our home Bangalore service area. We deliver ${s.title.toLowerCase()} in person here: same-day kickoff, weekly check-ins, and on-site workshops at your office.`
        : isMetro
          ? `Yes — we deliver ${s.title.toLowerCase()} to clients across ${c.label}. Engagement runs over WhatsApp + video calls with monthly on-site visits for major milestones.`
          : `Yes — businesses in ${c.label} get full access to our ${s.title.toLowerCase()} engagement. Most work runs remotely via WhatsApp + video; in-person available for larger projects.`,
    },
    {
      question: `How long does a ${s.title.toLowerCase()} project for a ${c.label} business take?`,
      answer: `Typical timelines: starter scope 2-3 weeks, standard scope 4-6 weeks, full bundle 6-10 weeks. We commit to a fixed timeline in the proposal — no rolling delays. ${c.label} kickoff is usually within 5 business days of contract signing.`,
    },
    {
      question: `What does ${s.title} cost for a small business in ${c.label}?`,
      answer: `Pricing depends on scope, but for ${c.label} SMBs (under 500 employees) typical ranges are: starter ₹35K-75K (one-off), standard ₹1.5L-3L, full bundle ₹3L-8L+. We always quote against a clear deliverables list. Free 30-min audit before quote.`,
    },
    {
      question: `Can you build ${s.title.toLowerCase()} in ${lang.primary} for ${c.label} customers?`,
      answer: `Yes. Default language is English, with ${lang.combo} available where it makes the project work better. Our AI voice + chatbot agents speak ${lang.primary} natively, plus Hindi, Tamil, Telugu, Kannada, and Malayalam on request. This matters in ${c.label} — local-language follow-up often 2-3× the response rate of English-only.`,
    },
    {
      question: `Why ZentroTECH over a generic Bangalore agency for ${c.label}?`,
      answer: `${isBangaloreCore ? `${c.label} is our home turf. We work with businesses here every week and know which channels convert.` : `Most Bangalore agencies do not customise for ${c.state} reality — payment norms, response-time expectations, language preferences. We build for how ${c.label} buyers actually behave.`} Plus: one contract for website + AI + WhatsApp + CRM, not 5 vendors and 5 monthly bills.`,
    },
    {
      question: `What if the ${s.title.toLowerCase()} doesn't generate results in ${c.label}?`,
      answer: `Money-back trial on the first milestone — if you're not happy with discovery + first deliverable, full refund. After that, we report monthly on qualified leads / recovered payments / whichever outcome the project is tied to. If results lag for two consecutive months, we redo the strategy at no extra cost.`,
    },
  ];

  const relatedServices = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 4);
  const siblingCities = SOUTH_INDIA_CITIES.filter(
    (x) => x.tier === c.tier && x.slug !== c.slug
  ).slice(0, 6);

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
              <MapPin className="size-3" />
              <span>{s.title} · {c.label}, {c.state}</span>
            </Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.0]">
              {s.title} in <span className="text-aurora">{c.label}</span>.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed">
              {s.description} Built specifically for {c.label} businesses — local context, regional language support ({lang.combo} on request), and ongoing service. Free 30-min audit. Quote within 1 business day.
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
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge>What you get</Badge>
              <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
                {s.title} for <span className="text-aurora">{c.label}</span>, with ongoing service.
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed">{s.description}</p>
              <p className="mt-4 text-text-muted leading-relaxed">
                {isBangaloreCore
                  ? `${c.label} is part of our home Bangalore market — we know which directories drive citations here, which buyer personas convert, and which competitors are ranking for ${s.title.toLowerCase()}-style searches.`
                  : isMetro
                    ? `${c.label} is one of our top metro markets outside Bangalore HQ. We've built ${s.title.toLowerCase()} for ${c.label} clients across multiple industries and know the buyer patterns specific to ${c.state}.`
                    : `For ${c.label} and the surrounding ${c.state} region, we adapt our ${s.title.toLowerCase()} playbook to local pricing expectations, response-time norms, and language preferences.`}
              </p>
            </div>
            <div className="glass-glow rounded-2xl p-8">
              <p className="text-text-muted text-sm uppercase tracking-widest mb-4">Deliverables</p>
              <ul className="space-y-3">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-indigo-glow shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-white">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 border-y border-white/5">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Other services we deliver in {c.label}
              </h3>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {relatedServices.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}/${c.slug}`}
                    className="glass rounded-xl p-4 text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-sm">{r.title}</span>
                    <ArrowRight className="size-4 text-indigo-glow" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
            {siblingCities.length > 0 && (
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {s.title} in other cities
                </h3>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {siblingCities.map((sc) => (
                    <Link
                      key={sc.slug}
                      href={`/services/${s.slug}/${sc.slug}`}
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
        faqs={faqs}
        eyebrow="Frequently asked"
        heading={`${s.title} in ${c.label} — common questions`}
        id="faq"
      />

      <CTASection />
    </>
  );
}
