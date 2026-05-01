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
  Globe2,
  Quote,
} from "lucide-react";

export const metadata = buildMetadata({
  title:
    "AI Development in the UAE — Abu Dhabi, Dubai, Sharjah | ZentroTECH",
  description:
    "Federal AI development partner for the UAE. Hub71, G42, SRTIP, ADGM, Mubadala-aware engagements. Production AI agents, automation, and bilingual websites delivered across all seven emirates.",
  path: "/ai-development-uae",
});

const uae = OFFICES.find((o) => o.city === "UAE");

export default function UAELanding() {
  return (
    <>
      <LocalBusinessSchema city="UAE" />

      {/* Hero */}
      <section className="py-24">
        <Container>
          <Badge>
            <MapPin className="size-3" /> United Arab Emirates
          </Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl">
            UAE&apos;s federal-grade{" "}
            <span className="text-aurora">AI development</span> partner.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl">
            The UAE is no longer a Dubai story. Abu Dhabi&apos;s Hub71 has
            graduated more than 250 startups; G42 and Presight are operating at
            sovereign-AI scale; Mubadala is funding the global frontier
            through MGX; SRTIP in Sharjah is incubating industrial AI; and the
            federal government has appointed a Minister of State for AI plus
            Chief AI Officers across more than 20 entities. We build AI
            systems for clients on all seven emirates, anchored to whichever
            free zone, mainland jurisdiction, or federal framework suits the
            engagement.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact" size="lg">
              Start a UAE project <ArrowRight className="size-4" />
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore services
            </Button>
            <Button href="/ai-agency-dubai" variant="ghost" size="lg">
              Looking specifically at Dubai?
            </Button>
          </div>
        </Container>
      </section>

      {/* Why UAE businesses pick us */}
      <section className="py-24">
        <Container>
          <div className="max-w-3xl">
            <Badge>Why UAE companies trust ZentroTECH</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
              From Abu Dhabi to Ras Al Khaimah, one delivery model.
            </h2>
            <p className="mt-6 text-text-secondary text-lg">
              The UAE&apos;s AI ambition is unusual: federal direction
              (MoCAI, the National Strategy for AI 2031), sovereign
              infrastructure (G42, Core42, Etisalat by e&amp;), and free-zone
              flexibility (Hub71, DIFC, ADGM, DMCC, SRTIP). We help clients
              navigate that landscape — picking the right jurisdiction, the
              right cloud, the right partner ecosystem — and then we ship the
              system itself.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <Building2 className="size-6 text-indigo-glow" />
              <CardTitle className="mt-4">Pan-emirate footprint</CardTitle>
              <CardBody>
                Active engagements out of Abu Dhabi (Hub71, ADGM), Dubai
                (DIFC, Internet City, DMCC), and Sharjah (SRTIP). Quarterly
                travel to Ras Al Khaimah and Fujairah for industrial clients.
              </CardBody>
            </Card>
            <Card>
              <ShieldCheck className="size-6 text-indigo-glow" />
              <CardTitle className="mt-4">G42 ecosystem aware</CardTitle>
              <CardBody>
                Architectures that interoperate cleanly with Core42 cloud,
                Inception large-language models, and Khazna data centres for
                clients that need sovereign infrastructure.
              </CardBody>
            </Card>
            <Card>
              <Banknote className="size-6 text-indigo-glow" />
              <CardTitle className="mt-4">Federal regulation literate</CardTitle>
              <CardBody>
                Federal Decree 45/2021 (PDPL), TDRA telecom rules, ADGM Data
                Protection Regulations 2021, DIFC Data Protection Law — we
                scope to the right perimeter from day one.
              </CardBody>
            </Card>
            <Card>
              <Globe2 className="size-6 text-indigo-glow" />
              <CardTitle className="mt-4">GCC-wide reach</CardTitle>
              <CardBody>
                UAE-anchored delivery with MoUs and partner relationships
                spanning Saudi Arabia, Qatar, Bahrain, and Oman for clients
                operating across the Gulf.
              </CardBody>
            </Card>
          </div>
        </Container>
      </section>

      <TrustSignals />

      {/* UAE presence */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <Badge>We&apos;re a UAE-resident delivery partner</Badge>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
                A federal partner, not a Dubai-only vendor.
              </h2>
              <p className="mt-6 text-text-secondary text-lg">
                Our UAE entity contracts in AED, invoices VAT, and delivers
                with senior engineers physically present in-country for
                workshops, executive readouts, and regulator-facing reviews.
                Our Bangalore HQ provides 24x5 follow-the-sun coverage so a
                bug raised at 16:00 GST in Abu Dhabi has someone working on it
                while Dubai sleeps. UAE clients get the responsiveness of a
                local boutique with the scale of a 50-engineer consultancy
                behind it.
              </p>
              <ul className="mt-8 space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-aurora mt-0.5 shrink-0" />
                  <span>
                    Aligned with the UAE National Strategy for Artificial
                    Intelligence 2031 and the AI Office&apos;s Model AI Ethics
                    framework.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-aurora mt-0.5 shrink-0" />
                  <span>
                    Proven patterns for Abu Dhabi government-adjacent work via
                    Hub71 and ADGM RegLab pilot frameworks.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-aurora mt-0.5 shrink-0" />
                  <span>
                    Sharjah industrial AI engagements (SRTIP), covering
                    manufacturing, logistics, and energy verticals.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-aurora mt-0.5 shrink-0" />
                  <span>
                    UAE working week: critical Sunday-Thursday delivery, with
                    Friday-Saturday on-call coverage from Bangalore.
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <Card glow className="space-y-3">
                <p className="text-aurora text-xs uppercase tracking-widest font-mono">
                  UAE operations
                </p>
                <h3 className="text-2xl font-bold text-white">
                  Serving all seven emirates
                </h3>
                <p className="text-text-secondary text-sm">{uae?.address}</p>
                <div className="pt-3 border-t border-white/10 space-y-2 text-sm text-text-secondary">
                  <p>
                    <span className="text-text-muted">Phone:</span>{" "}
                    {uae?.phone}
                  </p>
                  <p>
                    <span className="text-text-muted">Email:</span>{" "}
                    {uae?.email}
                  </p>
                  <p>
                    <span className="text-text-muted">Hours:</span> Sun-Thu
                    09:00-19:00 GST
                  </p>
                  <p>
                    <span className="text-text-muted">Coverage:</span> Abu
                    Dhabi, Dubai, Sharjah, Ajman, RAK, Fujairah, UAQ
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <ServicesBento />

      {/* Engagement model for UAE clients */}
      <section className="py-24">
        <Container>
          <div className="max-w-3xl">
            <Badge>Engagement model</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
              What a UAE engagement looks like.
            </h2>
            <p className="mt-6 text-text-secondary text-lg">
              UAE engagements typically begin with a one-week federal-grade
              discovery sprint. We sit with your team in Abu Dhabi, Dubai, or
              Sharjah, map the architecture against the right regulatory
              perimeter (Federal PDPL, ADGM DPR 2021, DIFC DPL, sector-specific
              CBUAE / TDRA / DoH rules), and walk out with an AED-priced
              fixed proposal. Where the engagement touches sovereign
              infrastructure, we model the deployment against Core42, Khazna,
              or Etisalat by e&amp; before committing.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card>
              <p className="text-aurora text-xs uppercase tracking-widest font-mono">
                Week 1
              </p>
              <CardTitle className="mt-3">Discovery sprint</CardTitle>
              <CardBody>
                On-site at Hub71, ADGM, DIFC, or SRTIP. Jurisdictional
                review, sovereign-vs-hyperscaler infra decision, and a
                fixed-price AED proposal — typically AED 25-60K, credited
                against the build.
              </CardBody>
            </Card>
            <Card>
              <p className="text-aurora text-xs uppercase tracking-widest font-mono">
                Weeks 2-14
              </p>
              <CardTitle className="mt-3">Build &amp; ship</CardTitle>
              <CardBody>
                Sunday-Thursday delivery, weekly demos in your emirate of
                choice, deployment to AWS Middle East, Azure UAE North, or
                Core42, and a regulator-ready eval and audit pack handed over
                with the code.
              </CardBody>
            </Card>
            <Card>
              <p className="text-aurora text-xs uppercase tracking-widest font-mono">
                Months 4-18
              </p>
              <CardTitle className="mt-3">Run &amp; expand</CardTitle>
              <CardBody>
                Optional AED-billed retainer for monitoring, model upgrades,
                and the multi-emirate rollout most UAE clients sequence
                quarterly. Bangalore HQ provides 24x5 follow-the-sun support.
              </CardBody>
            </Card>
          </div>
        </Container>
      </section>

      {/* UAE testimonial */}
      <section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card glow className="text-center">
              <Quote className="size-8 text-aurora mx-auto" />
              <p className="mt-6 text-2xl md:text-3xl text-white leading-relaxed">
                &ldquo;We needed an AI partner who could navigate ADGM data
                rules, integrate with our Abu Dhabi-hosted core systems, and
                still ship a working agent in eight weeks. ZentroTECH did all
                three. They understood the federal procurement landscape
                better than most local Dubai shops we&apos;d talked
                to.&rdquo;
              </p>
              <div className="mt-8">
                <p className="text-white font-semibold">VP Operations</p>
                <p className="text-text-muted text-sm">
                  Federal-adjacent enterprise, Abu Dhabi (placeholder
                  testimonial — reference available on NDA)
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* UAE FAQs */}
      <section className="py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Badge>UAE FAQs</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
              Questions UAE leaders ask before they sign.
            </h2>
            <p className="mt-4 text-text-muted">
              Answers below cover the UAE broadly. Dubai-specific questions
              live on our{" "}
              <a
                className="text-indigo-glow hover:text-aurora"
                href="/ai-agency-dubai"
              >
                Dubai page
              </a>
              .
            </p>
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
                href={`mailto:${uae?.email ?? SITE.email}`}
              >
                {uae?.email ?? SITE.email}
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
