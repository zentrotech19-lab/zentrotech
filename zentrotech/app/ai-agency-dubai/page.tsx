import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardBody } from "@/components/ui/card";
import { ServicesBento } from "@/components/sections/services-bento";
import { TrustSignals } from "@/components/sections/trust-signals";
import { CTASection } from "@/components/sections/cta-section";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { buildMetadata } from "@/lib/seo";
import { FAQS_DUBAI } from "@/lib/faqs";
import { OFFICES, SITE } from "@/lib/constants";
import {
  MapPin,
  ArrowRight,
  Building2,
  ShieldCheck,
  Banknote,
  Languages,
  Quote,
} from "lucide-react";

export const metadata = buildMetadata({
  title:
    "AI Agency in Dubai — Agentic AI for the UAE | DIFC | ZentroTECH",
  description:
    "Dubai-based AI agency. DIFC-registered delivery, bilingual Arabic/English agents, AED billing, TDRA-aware data residency, aligned to the Dubai AI Strategy 2031.",
  path: "/ai-agency-dubai",
});

const dubai = OFFICES.find((o) => o.city === "Dubai");

export default function DubaiLanding() {
  return (
    <>
      <LocalBusinessSchema city="Dubai" />

      {/* Hero */}
      <section className="py-24">
        <Container>
          <Badge>
            <MapPin className="size-3" /> Dubai, UAE
          </Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl">
            Dubai&apos;s premium <span className="text-aurora">AI agency</span>,
            on the ground at DIFC.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl">
            We operate from the DIFC Innovation Hub on Gate Avenue and partner
            with Dubai enterprises, free-zone scaleups, and Mainland LLCs to
            ship agentic AI that respects the realities of the UAE market —
            Sunday-to-Thursday working week, bilingual Arabic and English
            customer conversations, TDRA-aligned data residency, and the
            ambition encoded into the Dubai AI Strategy 2031 and the Dubai
            Future Foundation&apos;s programmes.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact" size="lg">
              Talk to our Dubai team <ArrowRight className="size-4" />
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore services
            </Button>
            <Button
              href="/work/al-marwa-retail-bilingual-voice-agent"
              variant="ghost"
              size="lg"
            >
              See our bilingual voice agent
            </Button>
          </div>
        </Container>
      </section>

      {/* Why Dubai trusts us */}
      <section className="py-24">
        <Container>
          <div className="max-w-3xl">
            <Badge>Why Dubai businesses trust ZentroTECH</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
              Engineered for the UAE&apos;s pace and regulation.
            </h2>
            <p className="mt-6 text-text-secondary text-lg">
              Dubai is moving faster on AI than almost any city on the planet.
              The Ministry of Cabinet Affairs (MoCAI) appointed Chief AI
              Officers across federal entities, the Dubai AI Strategy 2031
              targets a 100x productivity uplift, and the regulatory perimeter
              spans DIFC, the DIFC Data Protection Law, the UAE Federal Decree
              45/2021 PDPL, and TDRA telecom data rules. We design every
              engagement so it sits cleanly within that perimeter.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <Building2 className="size-6 text-indigo-glow" />
              <CardTitle className="mt-4">DIFC + free-zone savvy</CardTitle>
              <CardBody>
                Comfortable contracting in DIFC, Dubai Internet City, DMCC,
                Dubai South, and Mainland LLC structures. We help scope which
                jurisdiction your AI build sits in.
              </CardBody>
            </Card>
            <Card>
              <ShieldCheck className="size-6 text-indigo-glow" />
              <CardTitle className="mt-4">TDRA &amp; PDPL compliant</CardTitle>
              <CardBody>
                Data residency on AWS Middle East (Bahrain or UAE), Azure UAE
                North, or G42 Core42 infrastructure. PDPL DPAs available. ADGM
                regime supported on request.
              </CardBody>
            </Card>
            <Card>
              <Banknote className="size-6 text-indigo-glow" />
              <CardTitle className="mt-4">AED, USD, or INR billing</CardTitle>
              <CardBody>
                VAT-compliant invoicing through our UAE entity, with optional
                offshore delivery from our Bangalore HQ for cost-sensitive work
                packages.
              </CardBody>
            </Card>
            <Card>
              <Languages className="size-6 text-indigo-glow" />
              <CardTitle className="mt-4">Bilingual by default</CardTitle>
              <CardBody>
                Arabic + English agents with dialect-aware evaluation (Gulf,
                Egyptian, Levantine). See our shipped{" "}
                <a
                  className="text-indigo-glow hover:text-aurora underline-offset-4"
                  href="/work/al-marwa-retail-bilingual-voice-agent"
                >
                  Al Marwa bilingual voice agent
                </a>
                .
              </CardBody>
            </Card>
          </div>
        </Container>
      </section>

      <TrustSignals />

      {/* Local presence */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <Badge>We&apos;re on the ground in Dubai</Badge>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
                A Dubai office, not a sales address.
              </h2>
              <p className="mt-6 text-text-secondary text-lg">
                Our Dubai team sits inside the DIFC Innovation Hub at Gate
                Avenue, surrounded by the financial-services and fintech
                ecosystem we partner with most often. We attend Dubai Future
                Foundation events, GITEX, and Expand North Star, and we travel
                to Abu Dhabi, Sharjah, Riyadh, and Doha for client kickoffs.
                Discovery workshops happen in person whenever the geography
                allows.
              </p>
              <ul className="mt-8 space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-aurora mt-0.5 shrink-0" />
                  <span>
                    Aligned with the Dubai AI Strategy 2031 and the Smart Dubai
                    AI Ethics framework.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-aurora mt-0.5 shrink-0" />
                  <span>
                    Working week mirrored to UAE: Sunday-Thursday on critical
                    delivery, with Friday async coverage from our Bangalore HQ.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-aurora mt-0.5 shrink-0" />
                  <span>
                    Federal Decree 45/2021 (PDPL) compliant data handling
                    pipelines, with DIFC Data Protection Law variants on
                    request.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-aurora mt-0.5 shrink-0" />
                  <span>
                    Standard mutual NDA in 24 hours, MoCAI-aware governance
                    artefacts available for federal-adjacent engagements.
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <Card glow className="space-y-3">
                <p className="text-aurora text-xs uppercase tracking-widest font-mono">
                  Dubai office
                </p>
                <h3 className="text-2xl font-bold text-white">
                  {dubai?.city}, {dubai?.region}
                </h3>
                <p className="text-text-secondary text-sm">{dubai?.address}</p>
                <div className="pt-3 border-t border-white/10 space-y-2 text-sm text-text-secondary">
                  <p>
                    <span className="text-text-muted">Phone:</span>{" "}
                    {dubai?.phone}
                  </p>
                  <p>
                    <span className="text-text-muted">Email:</span>{" "}
                    {dubai?.email}
                  </p>
                  <p>
                    <span className="text-text-muted">Hours:</span> Sun-Thu
                    09:00-19:00 GST
                  </p>
                  <p>
                    <span className="text-text-muted">Coverage:</span> UAE,
                    KSA, Qatar, Bahrain, wider GCC
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <ServicesBento />

      {/* Engagement model for Dubai clients */}
      <section className="py-24">
        <Container>
          <div className="max-w-3xl">
            <Badge>Engagement model</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
              What a Dubai engagement looks like.
            </h2>
            <p className="mt-6 text-text-secondary text-lg">
              Most Dubai engagements start with a one-week paid discovery
              sprint. We sit with your team at DIFC, Internet City, or your
              corporate HQ, frame the problem against the regulatory
              perimeter (free zone vs Mainland, PDPL vs DIFC DPL, AWS Bahrain
              vs Azure UAE North vs Core42), and walk out with an AED- or
              USD-priced fixed proposal. Where bilingual Arabic content is in
              scope we benchmark agent responses across MSA and the relevant
              Gulf dialects before a single line of production prompt ships.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card>
              <p className="text-aurora text-xs uppercase tracking-widest font-mono">
                Week 1
              </p>
              <CardTitle className="mt-3">DIFC discovery</CardTitle>
              <CardBody>
                On-site workshops in Dubai, jurisdiction selection, dialect
                strategy, and a fixed-price proposal in AED, USD, or INR —
                typically AED 25-50K for discovery, credited against the
                build.
              </CardBody>
            </Card>
            <Card>
              <p className="text-aurora text-xs uppercase tracking-widest font-mono">
                Weeks 2-12
              </p>
              <CardTitle className="mt-3">Build &amp; ship</CardTitle>
              <CardBody>
                Sunday-Thursday delivery cadence, weekly demos at your Dubai
                office, deployment to AWS Middle East / Azure UAE / Core42,
                and an Arabic-aware eval harness handed over with the code.
              </CardBody>
            </Card>
            <Card>
              <p className="text-aurora text-xs uppercase tracking-widest font-mono">
                Months 3-12
              </p>
              <CardTitle className="mt-3">Run &amp; improve</CardTitle>
              <CardBody>
                Optional AED-billed monthly retainer covering monitoring,
                model upgrades, eval regression in both Arabic and English,
                and incremental capability adds — with a Dubai engineer on
                call.
              </CardBody>
            </Card>
          </div>
        </Container>
      </section>

      {/* Dubai testimonial */}
      <section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card glow className="text-center">
              <Quote className="size-8 text-aurora mx-auto" />
              <p className="mt-6 text-2xl md:text-3xl text-white leading-relaxed">
                &ldquo;ZentroTECH built our Arabic + English voice agent across
                80 retail stores in the UAE. They handled the dialect
                evaluation, the TDRA data-residency review, and the integration
                with our Dubai-hosted CRM without us having to brief them on
                local context. They felt like a Dubai-native team that happened
                to have an offshore engineering arm in Bangalore.&rdquo;
              </p>
              <div className="mt-8">
                <p className="text-white font-semibold">CTO</p>
                <p className="text-text-muted text-sm">
                  UAE retail group, DIFC (placeholder testimonial — anonymised
                  reference available on NDA, see{" "}
                  <a
                    className="text-indigo-glow hover:text-aurora"
                    href="/work/al-marwa-retail-bilingual-voice-agent"
                  >
                    full Al Marwa case study
                  </a>
                  )
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Local FAQs */}
      <section className="py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Badge>Dubai FAQs</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
              Questions UAE clients actually ask.
            </h2>
            <div className="mt-12 space-y-4">
              {FAQS_DUBAI.map((faq) => (
                <details
                  key={faq.question}
                  className="group glass rounded-2xl p-6 transition-colors open:border-indigo/40"
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-4 text-lg font-semibold text-white marker:hidden list-none">
                    <span>{faq.question}</span>
                    <span className="text-aurora text-2xl leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
            <p className="mt-12 text-text-muted text-sm">
              More questions? Email{" "}
              <a
                className="text-indigo-glow hover:text-aurora"
                href={`mailto:${dubai?.email ?? SITE.email}`}
              >
                {dubai?.email ?? SITE.email}
              </a>{" "}
              or{" "}
              <a className="text-indigo-glow hover:text-aurora" href="/contact">
                book a 30-minute call
              </a>
              .
            </p>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
