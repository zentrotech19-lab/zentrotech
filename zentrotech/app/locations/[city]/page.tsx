import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { SOUTH_INDIA_CITIES, SERVICES, SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowRight, MapPin, Sparkles, Phone, Clock, Shield } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { SOCIAL } from "@/lib/constants";

const TIER_LABEL: Record<string, string> = {
  A: "Bangalore + neighborhoods",
  B: "South India metros",
  C: "Tamil Nadu tier-2",
  D: "South India tier-2",
};

export function generateStaticParams() {
  return SOUTH_INDIA_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = SOUTH_INDIA_CITIES.find((x) => x.slug === city);
  if (!c) return {};
  return buildMetadata({
    title: `Lead Engine Websites + AI Automation in ${c.label} | ZentroTECH`,
    description: `Professional websites, AI automation, voice agents, chatbots, Android apps, and SEO for businesses in ${c.label}, ${c.state}. Free 30-min audit. Quote within 1 business day.`,
    path: `/locations/${c.slug}`,
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = SOUTH_INDIA_CITIES.find((x) => x.slug === city);
  if (!c) notFound();

  const tierLabel = TIER_LABEL[c.tier];
  const isBangalore = c.slug === "bangalore";
  const isNeighborhood = c.tier === "A" && !isBangalore;

  // Local-business schema per city — Google needs this to surface us in
  // the local pack for "[service] in [city]" searches.
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE.name} — ${c.label}`,
    description: `Lead-generating websites, AI automation, voice agents, chatbots, Android apps, and SEO for businesses in ${c.label}, ${c.state}.`,
    url: `${SITE.url}/locations/${c.slug}`,
    areaServed: {
      "@type": "City",
      name: c.label,
      addressRegion: c.state,
      addressCountry: "IN",
    },
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  // City-specific FAQs that ride the per-page FAQPage schema. Same Q&A
  // shape, plug-in city name. Google indexes each city's FAQ separately.
  const cityFaqs = [
    {
      question: `Do you actually serve businesses in ${c.label}?`,
      answer:
        isBangalore
          ? `Yes — Bangalore is our headquarters. Most projects start with an in-person meeting or video call within 24 hours. ${c.label} clients get the fastest turnaround on every step.`
          : isNeighborhood
            ? `Yes — ${c.label} is part of our home Bangalore service area. We're typically on-site within hours for kickoff and key project meetings.`
            : `Yes — we serve businesses across ${c.label} and the surrounding ${c.state} region. Most engagements run via WhatsApp + video call, with quarterly in-person visits for major projects.`,
    },
    {
      question: `Why a ${c.label}-focused agency vs a Mumbai or Delhi firm?`,
      answer: `Local context matters. A ${c.label} business needs a website + automation that respects how ${c.label} buyers actually search, message, and pay. We build for the way Indian SMBs in your region operate — including regional language support, local payment methods, and the time zones / holidays your customers observe.`,
    },
    {
      question: `What languages do you build websites in for ${c.label}?`,
      answer:
        c.state === "Tamil Nadu"
          ? `English by default, Tamil on request. Our AI voice + chatbot agents speak Tamil + English natively, with Hindi available for cross-region buyers.`
          : c.state === "Karnataka"
            ? `English by default, Kannada on request. Our AI voice + chatbot agents speak Kannada + English natively, with Hindi + Tamil + Telugu available.`
            : c.state === "Andhra Pradesh" || c.state === "Telangana"
              ? `English by default, Telugu on request. Our AI voice + chatbot agents speak Telugu + English natively, with Hindi available.`
              : c.state === "Kerala"
                ? `English by default, Malayalam on request. Our AI voice + chatbot agents speak Malayalam + English natively, with Hindi + Tamil available.`
                : `English by default. AI voice + chatbot agents speak Hindi, Kannada, Tamil, Telugu, English natively, plus Malayalam, Marathi, Bengali, Gujarati, Punjabi as add-ons.`,
    },
    {
      question: `How long does a ${c.label} project typically take?`,
      answer: `Starter SEO website: 2-3 weeks. Lead-engine animated website: 4-6 weeks. Full lead-engine + AI automation bundle: 6-10 weeks. Android app: 6-12 weeks. We commit to a timeline in the proposal — no rolling delays.`,
    },
    {
      question: `Can you visit our office in ${c.label}?`,
      answer:
        isBangalore || isNeighborhood
          ? `Yes — same-day or next-day in-person visits in ${c.label}. We prefer to meet face-to-face for the discovery workshop.`
          : `Yes for major projects (₹3L+ scope) — quarterly on-site visits with 1 week notice. Smaller engagements run via video call + WhatsApp, which most clients prefer for speed.`,
    },
  ];

  // Show only the most-relevant services on a city page rather than all 10
  // — keeps the city page focused on the high-intent SMB use cases.
  const featuredServices = SERVICES.filter((s) =>
    [
      "lead-generation-websites",
      "website-audit-and-seo-fix",
      "ai-voice-agents",
      "ai-chatbots",
      "lead-followup-automation",
      "seo-services-bangalore",
    ].includes(s.slug)
  );

  // Sibling cities (same tier) for internal linking — boosts SEO + helps
  // visitors who realize they're on the wrong city page.
  const siblings = SOUTH_INDIA_CITIES.filter(
    (x) => x.tier === c.tier && x.slug !== c.slug
  ).slice(0, 6);

  return (
    <>
      <JsonLd data={schema} />

      {/* HERO */}
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
              <span>{tierLabel}</span>
            </Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.0]">
              Lead Engine Websites in <span className="text-aurora">{c.label}</span>.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed">
              We build websites + AI automation for businesses across {c.label}, {c.state}. Lead-engine sites that produce qualified enquiries every day, automation that follows up on every lead, and AI voice + chat agents that handle the work while you focus on closing. Free 30-min audit, quote within 1 business day.
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

            {/* Trust band — quick claims that read as local */}
            <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl">
              <div className="glass rounded-xl p-4 flex items-start gap-3">
                <Clock className="size-5 text-indigo-glow mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-white font-semibold text-sm">1 business day</p>
                  <p className="text-text-muted text-xs mt-0.5">Quote turnaround</p>
                </div>
              </div>
              <div className="glass rounded-xl p-4 flex items-start gap-3">
                <Phone className="size-5 text-indigo-glow mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-white font-semibold text-sm">15-min response</p>
                  <p className="text-text-muted text-xs mt-0.5">On WhatsApp during work hours</p>
                </div>
              </div>
              <div className="glass rounded-xl p-4 flex items-start gap-3">
                <Shield className="size-5 text-indigo-glow mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-white font-semibold text-sm">Money-back trial</p>
                  <p className="text-text-muted text-xs mt-0.5">First milestone, full refund if unhappy</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* WHY HERE */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge>Why ZentroTECH for {c.label}</Badge>
              <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
                Built for how <span className="text-aurora">{c.state}</span> businesses actually buy.
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed">
                {isBangalore
                  ? `Bangalore is our home market. We've been operating here long enough to know which directories drive citations, which neighborhoods convert at what rates, and which competitors are hiding behind "request a quote" forms.`
                  : isNeighborhood
                    ? `${c.label} is one of our home Bangalore neighborhoods. We work in person here every week — same-day visits, in-person workshops, and ongoing weekly check-ins for active projects.`
                    : `${c.label} buyers don't behave like Mumbai or Delhi buyers. Pricing expectations, response-time norms, payment terms, language preferences — all different. We build for ${c.state} reality, not a generic Indian-agency template.`}
              </p>
            </div>
            <ul className="space-y-4">
              <li className="border-l-2 border-indigo/40 pl-5">
                <h3 className="text-white font-bold">Local payment methods</h3>
                <p className="mt-1 text-text-muted text-sm leading-relaxed">UPI, Razorpay, PhonePe, Paytm — wired into your funnels by default. Stripe / international gateways available for export businesses.</p>
              </li>
              <li className="border-l-2 border-indigo/40 pl-5">
                <h3 className="text-white font-bold">WhatsApp-first conversion</h3>
                <p className="mt-1 text-text-muted text-sm leading-relaxed">Indian SMB closes on WhatsApp, not calendar bookings. Every page has a WhatsApp CTA above the fold.</p>
              </li>
              <li className="border-l-2 border-indigo/40 pl-5">
                <h3 className="text-white font-bold">Regional language voice + chat</h3>
                <p className="mt-1 text-text-muted text-sm leading-relaxed">Multi-language AI agents are part of every project. Hindi default + your local language at no extra setup cost.</p>
              </li>
              <li className="border-l-2 border-indigo/40 pl-5">
                <h3 className="text-white font-bold">Local SEO depth</h3>
                <p className="mt-1 text-text-muted text-sm leading-relaxed">Google Business Profile + 40+ Indian directories + city-specific landing pages. The full local-pack play.</p>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* SERVICES IN THIS CITY */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl">
            <Badge>What we build in {c.label}</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Six services, <span className="text-aurora">most-used in {c.label}</span>.
            </h2>
            <p className="mt-5 text-text-muted text-lg">
              All ten of our services are available across {c.state}. These six are the ones SMBs in {c.label} most often start with.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group glass rounded-2xl p-6 hover:border-indigo/40 transition-colors"
              >
                <h3 className="text-white font-bold">{s.title}</h3>
                <p className="mt-2 text-text-muted text-sm leading-relaxed">{s.short}</p>
                <div className="mt-4 flex items-center gap-1 text-indigo-glow text-sm">
                  <span>Learn more</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/services" className="text-indigo-glow hover:text-white text-sm font-medium">
              See all 10 services →
            </Link>
          </div>
        </Container>
      </section>

      {/* CITY-SPECIFIC FAQ */}
      <FaqSection
        faqs={cityFaqs}
        eyebrow={`${c.label} FAQs`}
        heading={`Things ${c.label} buyers ask us`}
        intro={`Specific to projects we run in ${c.label} and around ${c.state}.`}
      />

      {/* SIBLING CITIES — internal linking */}
      {siblings.length > 0 && (
        <section className="py-16">
          <Container>
            <div className="rounded-2xl glass p-8">
              <p className="text-xs uppercase tracking-widest text-indigo-glow font-mono">
                <Sparkles className="size-3.5 inline mr-2" aria-hidden="true" />
                Also in {tierLabel}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/locations/${s.slug}`}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary hover:border-indigo/40 hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
                <Link
                  href="/locations/bangalore"
                  className="rounded-full border border-indigo/30 bg-indigo/10 px-4 py-2 text-sm text-indigo-glow hover:bg-indigo/20 transition-colors"
                >
                  All cities →
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
