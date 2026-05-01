import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardBody } from "@/components/ui/card";
import { ServicesBento } from "@/components/sections/services-bento";
import { TrustSignals } from "@/components/sections/trust-signals";
import { CTASection } from "@/components/sections/cta-section";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { buildMetadata } from "@/lib/seo";
import { FAQS_BANGALORE } from "@/lib/faqs";
import { OFFICES, SITE } from "@/lib/constants";
import {
  MapPin,
  ArrowRight,
  Building2,
  ShieldCheck,
  Banknote,
  Users,
  Quote,
} from "lucide-react";

export const metadata = buildMetadata({
  title:
    "AI Consultancy in Bangalore — Agents, Automation & Strategy | ZentroTECH",
  description:
    "Bangalore-headquartered AI consultancy. Production AI agents, automation, and LLM integrations for ORR / Whitefield / Koramangala teams. DPDP-aware, NASSCOM-aligned, INR-friendly.",
  path: "/ai-consultancy-bangalore",
});

const bangalore = OFFICES.find((o) => o.city === "Bangalore");

export default function BangaloreLanding() {
  return (
    <>
      <LocalBusinessSchema city="Bangalore" />

      {/* Hero */}
      <section className="py-24">
        <Container>
          <Badge>
            <MapPin className="size-3" /> Bangalore, Karnataka
          </Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl">
            Bangalore&apos;s <span className="text-aurora">AI consultancy</span>
            , built for India&apos;s IT capital.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl">
            We are headquartered on Residency Road, a stone&apos;s throw from
            MG Road and Koramangala, and we ship production AI for teams across
            the Outer Ring Road, Whitefield, HSR Layout, Indiranagar, and the
            Electronic City corridor. Local engineers, NASSCOM-aligned
            engagement model, INR or USD billing, and the global delivery
            standards Bangalore expects from a tier-one consulting partner.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact" size="lg">
              Talk to our Bangalore team <ArrowRight className="size-4" />
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore services
            </Button>
            <Button href="/ai-agency-dubai" variant="ghost" size="lg">
              Also serving Dubai &amp; the UAE
            </Button>
          </div>
        </Container>
      </section>

      {/* Why Bangalore companies trust us */}
      <section className="py-24">
        <Container>
          <div className="max-w-3xl">
            <Badge>Why Bangalore companies trust ZentroTECH</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
              Built in Bangalore, for the way Bangalore builds.
            </h2>
            <p className="mt-6 text-text-secondary text-lg">
              India&apos;s startup ecosystem grew up here — Flipkart, Razorpay,
              Swiggy, Meesho, Zerodha, CRED, PhonePe, Postman, Freshworks,
              Zoho. The patterns that made those companies winners (lean teams,
              ruthless prioritisation, ship-then-iterate) are the same patterns
              we apply to AI delivery. We don&apos;t bring a McKinsey deck to a
              Koramangala standup. We bring engineers who have shipped against
              the same constraints you have.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <Building2 className="size-6 text-indigo-glow" />
              <CardTitle className="mt-4">Local engineering footprint</CardTitle>
              <CardBody>
                Senior AI engineers on the ground from MG Road to Whitefield,
                with on-site workshops and weekly in-person syncs across the
                ORR / Outer Ring Road belt.
              </CardBody>
            </Card>
            <Card>
              <ShieldCheck className="size-6 text-indigo-glow" />
              <CardTitle className="mt-4">DPDP &amp; Karnataka GST aware</CardTitle>
              <CardBody>
                Engagements scoped against India&apos;s Digital Personal Data
                Protection Act, Karnataka GST registration, ESI / PF / TDS
                compliance, and SOC 2 controls for international clients.
              </CardBody>
            </Card>
            <Card>
              <Banknote className="size-6 text-indigo-glow" />
              <CardTitle className="mt-4">INR or USD pricing</CardTitle>
              <CardBody>
                Bill in INR with full GST invoicing, or in USD via our SEZ /
                STPI-friendly export structure. AED billing also available for
                cross-border GCC engagements out of our Dubai office.
              </CardBody>
            </Card>
            <Card>
              <Users className="size-6 text-indigo-glow" />
              <CardTitle className="mt-4">Founder-friendly delivery</CardTitle>
              <CardBody>
                Most of our Bangalore clients are funded startups (Series A-C)
                or family-run SMBs modernising operations — not Fortune 500
                steering committees. We size the engagement to your stage.
              </CardBody>
            </Card>
          </div>
        </Container>
      </section>

      <TrustSignals />

      {/* HQ credibility */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <Badge>We&apos;re Bangalore-headquartered</Badge>
              <h2 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
                Not a remote vendor with a Bangalore email address.
              </h2>
              <p className="mt-6 text-text-secondary text-lg">
                ZentroTECH is registered in Karnataka and run from a working
                office in the Central Business District. Our engineers commute
                in from Indiranagar, HSR Layout, JP Nagar, Koramangala, and
                Whitefield, and our discovery sprints almost always begin with
                an in-person workshop at our office or yours. When you hire a
                consultancy in Bangalore, you should be able to walk into their
                office. With us, you can.
              </p>
              <ul className="mt-8 space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-aurora mt-0.5 shrink-0" />
                  <span>
                    Member of NASSCOM and aligned with the IT/ITeS export
                    framework operated by STPI Karnataka.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-aurora mt-0.5 shrink-0" />
                  <span>
                    DPDP Act-aware data handling — consent, purpose limitation,
                    erasure, and breach notification baked into every agent we
                    ship.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-aurora mt-0.5 shrink-0" />
                  <span>
                    Bangalore-regulated payroll: ESI, PF, professional tax, and
                    full GST-compliant invoicing under Karnataka jurisdiction.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-aurora mt-0.5 shrink-0" />
                  <span>
                    Comfortable working alongside ELCITA, Manyata, Bagmane, and
                    Embassy tech-park IT teams on co-located deployments.
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <Card glow className="space-y-3">
                <p className="text-aurora text-xs uppercase tracking-widest font-mono">
                  Headquarters
                </p>
                <h3 className="text-2xl font-bold text-white">
                  {bangalore?.city}, {bangalore?.region}
                </h3>
                <p className="text-text-secondary text-sm">
                  {bangalore?.address}
                </p>
                <div className="pt-3 border-t border-white/10 space-y-2 text-sm text-text-secondary">
                  <p>
                    <span className="text-text-muted">Phone:</span>{" "}
                    {bangalore?.phone}
                  </p>
                  <p>
                    <span className="text-text-muted">Email:</span>{" "}
                    {bangalore?.email}
                  </p>
                  <p>
                    <span className="text-text-muted">Hours:</span> Mon-Fri
                    09:00-19:00 IST
                  </p>
                  <p>
                    <span className="text-text-muted">Reach:</span> MG Road,
                    Koramangala, Indiranagar, HSR Layout, Whitefield, ORR
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <ServicesBento />

      {/* What Bangalore engagements look like */}
      <section className="py-24">
        <Container>
          <div className="max-w-3xl">
            <Badge>Engagement model</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
              What a Bangalore engagement looks like.
            </h2>
            <p className="mt-6 text-text-secondary text-lg">
              Bangalore clients usually start with a paid one-week discovery
              workshop at our Residency Road office or theirs. We map the
              opportunity against the realities of Indian operations —
              bilingual customer support across English, Hindi, and Kannada;
              UPI-driven transactional flows; ONDC integration patterns;
              Aadhaar-aware KYC where relevant; and Karnataka-specific labour
              compliance — and walk out with a fixed-price proposal.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card>
              <p className="text-aurora text-xs uppercase tracking-widest font-mono">
                Week 1
              </p>
              <CardTitle className="mt-3">Discovery sprint</CardTitle>
              <CardBody>
                On-site workshops in Bangalore, problem framing, technical
                spike, and a fixed-price proposal — typically INR 5-8 lakh for
                the discovery itself, credited against the build.
              </CardBody>
            </Card>
            <Card>
              <p className="text-aurora text-xs uppercase tracking-widest font-mono">
                Weeks 2-12
              </p>
              <CardTitle className="mt-3">Build &amp; ship</CardTitle>
              <CardBody>
                Vertical slices, weekly demos at your Bangalore office or
                ours, production deployment to your AWS Mumbai / GCP Mumbai
                tenancy, and a written eval suite handed over with the code.
              </CardBody>
            </Card>
            <Card>
              <p className="text-aurora text-xs uppercase tracking-widest font-mono">
                Months 3-12
              </p>
              <CardTitle className="mt-3">Run &amp; improve</CardTitle>
              <CardBody>
                Optional INR-billed monthly retainer for monitoring, model
                upgrades, eval regression, and incremental capability adds —
                with a Bangalore engineer on a Slack response SLA.
              </CardBody>
            </Card>
          </div>
        </Container>
      </section>

      {/* Bangalore client testimonial */}
      <section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card glow className="text-center">
              <Quote className="size-8 text-aurora mx-auto" />
              <p className="mt-6 text-2xl md:text-3xl text-white leading-relaxed">
                &ldquo;We met the ZentroTECH team in person at their Residency
                Road office, scoped a fraud-detection agent in two weeks, and
                shipped to production inside the quarter. They understood our
                Bangalore ops constraints — Karnataka payroll edge cases,
                regional language KYC — without us having to spell it out.
                That&apos;s rare.&rdquo;
              </p>
              <div className="mt-8">
                <p className="text-white font-semibold">
                  Head of Engineering
                </p>
                <p className="text-text-muted text-sm">
                  Series-B fintech, Koramangala (placeholder testimonial — real
                  reference available on NDA)
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
            <Badge>Bangalore FAQs</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
              Questions Bangalore clients actually ask.
            </h2>
            <div className="mt-12 space-y-4">
              {FAQS_BANGALORE.map((faq) => (
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
                href={`mailto:${bangalore?.email ?? SITE.email}`}
              >
                {bangalore?.email ?? SITE.email}
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
