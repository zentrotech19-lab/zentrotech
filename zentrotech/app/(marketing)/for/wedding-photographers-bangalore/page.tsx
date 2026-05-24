import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Wedding photographer lead engine · Bangalore",
  description:
    "5–7 touch nurture inside 72 hrs + payment recovery + lead-engine site for Bangalore wedding photographers. Bookings 2–3×, DSO drops 30–50%. Live in 21 days.",
  path: "/for/wedding-photographers-bangalore",
});

const WHATSAPP_HREF = waLink(
  "Hi ZentroTECH — Bangalore wedding photographer here, losing DMs to slow reply. Want to see the 5-touch nurture and payment recovery in action."
);

const PAIN_POINTS = [
  {
    title: "High-ticket leads die in 6 hours",
    body:
      "A bride DMs your Instagram on a Tuesday night about her December wedding — a ₹50K–₹3L booking. You see it Wednesday morning, reply by lunch, but two other photographers have already sent her their packages. By the time you send your portfolio PDF, she's reviewing three quotes and you're the third. Speed-to-lead in wedding photography is non-negotiable: the first studio to respond wins the discovery call 80% of the time.",
  },
  {
    title: "Mid-season inquiry spikes overwhelm a 1-person studio",
    body:
      "November to February in Bangalore is brutal — Mehndi, Sangeet, Reception, Haldi, then court marriages, then engagement shoots. You're shooting weekends, editing weekdays, and DMs pile up. Each ghosted enquiry is a ₹50K–₹3L wedding that went elsewhere. You can't hire a salesperson for three months a year. You can install automation that handles qualification while you're shooting.",
  },
  {
    title: "Parents call at 11pm in Kannada or Hindi",
    body:
      "The bride messages you on Instagram. Two days later her father calls — at 10:30pm, in Kannada, asking detailed questions about delivery timelines, raw files, drone availability, and your willingness to travel to a Mysore wedding. Your phone is on silent because you were editing till midnight. You see the missed call at 9am. He's already spoken to two other studios. The deal is gone.",
  },
  {
    title: "Payment chasing after the event",
    body:
      "You delivered 800 edited photos and a 4-minute wedding film three weeks ago. The final ₹40K is sitting unpaid. You've sent two polite WhatsApps. You're a creative, not a bill collector. The follow-up dies. Multiply by 6 weddings a season — ₹2.4L sitting in receivables while you're paying for new lenses on EMI. DSO matters for solo studios more than for anyone else.",
  },
];

const SHIP_IN_21_DAYS = [
  "Portfolio-led photographer website (home, wedding portfolio, pre-wedding portfolio, packages, about, contact, blog) — mobile-first, fast, optimised for portfolio image weight",
  "Instagram DM auto-reply that captures lead details (wedding date, city, budget bracket, ceremonies) and routes to a CRM in under 60 seconds",
  "Kannada + Hindi + English AI voice agent for incoming calls — handles &ldquo;available on December 15?&rdquo;, captures budget bracket, books a discovery call, qualifies tire-kickers out",
  "5-touch nurture sequence inside 72 hours: WhatsApp 1 (portfolio link + package PDF), WhatsApp 2 (3 sample album highlights), WhatsApp 3 (price brackets), voice call (warm scheduled call from you), WhatsApp 5 (scarcity nudge: &ldquo;December 15 has one slot left&rdquo;)",
  "Quote-to-booking funnel with a payment-link landing page (Razorpay/UPI) for the booking advance — bride pays the retainer on her phone without a back-and-forth",
  "Payment recovery automation for the final invoice: Day 0 / 3 / 7 / 14 / 21 / 30 reminder cadence via WhatsApp + email + scheduled AI voice call. Auto-stops on payment. Polite escalation, never aggressive — keeps the relationship.",
  "Google Business Profile setup + 30 days of wedding-portfolio posts + review-collection automation that DMs every shot couple 14 days post-event with a 1-tap Google review link",
  "Monthly dashboard: leads in, discovery calls booked, conversion rate, ₹ booked, ₹ outstanding, DSO trend",
];

const STATS = [
  {
    headline: "2–3×",
    label: "lift in booking rate",
    body: "5-touch nurture inside 72 hours vs the typical single portfolio PDF + silence. Same lead volume, multiple of bookings.",
  },
  {
    headline: "30–50%",
    label: "drop in DSO (days sales outstanding)",
    body: "Payment recovery automation runs the polite-but-persistent reminder cadence so you don't have to. Cash in faster, focus on shooting.",
  },
  {
    headline: "11pm calls answered",
    label: "in Kannada and Hindi",
    body: "AI voice agent qualifies the bride's father or mother-in-law at any hour, captures wedding details, and books a discovery call slot on your calendar.",
  },
];

const FAQS = [
  {
    q: "I'm a 1–2 person studio. Will this be overkill?",
    a: "It's built for exactly your size. The whole point is that solo and small studios can't hire a salesperson or office manager, so they need the automation layer instead of human headcount. The voice agent answers when you're shooting, the WhatsApp nurture runs while you're editing, the payment recovery chases invoices while you're sleeping. You stay focused on the craft — the system handles everything that isn't you behind a camera.",
  },
  {
    q: "Will an AI voice answering my phone scare off premium clients?",
    a: "The voice agent identifies itself as an assistant, takes the call respectfully in Kannada or Hindi or English, captures wedding details, and offers to either book a discovery call with you directly or have you call back at a specific time. Most premium clients actually prefer it to ringing an unanswered phone or hitting a voicemail. The studios that go premium use the voice agent as a screening layer — qualifying down to the inquiries worth a personal callback.",
  },
  {
    q: "How does the payment recovery automation handle delicate post-wedding relationships?",
    a: "The tone is calibrated by stage. Day 3: gentle nudge, &ldquo;hi just confirming you received our delivery&rdquo;. Day 7: a friendly reminder with the invoice attached. Day 14: a slightly firmer message offering a payment-link. Day 21: a scheduled voice call from the AI agent referencing the wedding date and outstanding amount. Day 30: a final notice. We model the script with you in week 1 — you sign off before anything goes live. And the second payment lands, the entire cadence stops automatically.",
  },
  {
    q: "What does it cost to run after the 21-day build?",
    a: "Starter from ₹35,000 setup + ₹9,999/month is right-sized for solo studios shooting 20–40 weddings a year. Growth at ₹24,999/month adds the full 5-touch nurture, payment recovery, and monthly portfolio refresh — fits a 2–3 photographer studio. Mid-market at ₹60K+/month is for larger studios with multiple shooters, destination work, or a brand-team operation. Razorpay / WhatsApp API / voice-minute charges go to your accounts directly, no markup.",
  },
];

export default function WeddingPhotographersBangalorePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Lead Engine for Bangalore Wedding Photographers",
    description:
      "Lead-engine website, Kannada/Hindi AI voice agent, 5-touch nurture sequence, and payment recovery automation for wedding photographers in Bangalore. Live in 21 days.",
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: {
      "@type": "City",
      name: "Bangalore",
    },
    serviceType: "Wedding photography lead engine and payment recovery automation",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Wedding photographers, candid wedding studios, and destination wedding photographers in Bangalore",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <OrganizationSchema />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-[-10%] size-[700px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.45) 0%, transparent 65%)" }}
        />
        <Container className="relative">
          <div className="max-w-4xl">
            <Badge>For Bangalore wedding photographers</Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
              Win the booking before the <span className="text-aurora">other studio replies</span>.
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-text-secondary leading-snug max-w-3xl">
              ₹50K–₹3L weddings are decided in the first 6 hours of inquiry. We ship a Kannada/Hindi voice agent + 5-
              touch nurture inside 72 hours + a portfolio-led lead-engine site + payment recovery automation in 21 days.
              Bookings 2–3×. DSO drops 30–50%.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={WHATSAPP_HREF} size="lg" external>
                WhatsApp ZentroTECH
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get a Quote
              </Button>
            </div>
            <p className="mt-6 text-sm text-text-muted">
              Bangalore HQ · For solo studios and small teams · Done-for-you · One contract
            </p>
          </div>
        </Container>
      </section>

      {/* PAIN POINTS */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl">
            <Badge>Pain points we fix</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              The four leaks <span className="text-aurora">costing you weddings</span>.
            </h2>
            <p className="mt-4 text-text-muted">
              Mapped from conversations with photographers across Indiranagar, JP Nagar, Koramangala, and Whitefield.
              Different studios, same leaks.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {PAIN_POINTS.map((p) => (
              <div key={p.title} className="glass rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg">{p.title}</h3>
                <p className="mt-3 text-text-secondary text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WHAT WE SHIP */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl">
            <Badge>21-day delivery</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              What we ship in <span className="text-aurora">21 days</span>.
            </h2>
            <p className="mt-4 text-text-muted">
              Scope locked in week 1. Built and tested in weeks 2–3. Live before your next wedding weekend.
            </p>
          </div>
          <ul className="mt-10 grid md:grid-cols-2 gap-4">
            {SHIP_IN_21_DAYS.map((d, i) => (
              <li key={d} className="flex gap-3 glass rounded-xl p-5">
                <div className="text-indigo-glow font-mono font-bold shrink-0">{String(i + 1).padStart(2, "0")}</div>
                <span className="text-text-secondary text-sm leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* REAL NUMBERS */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl">
            <Badge>Real numbers for wedding photography</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              What changes <span className="text-aurora">by month 2</span>.
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {STATS.map((s) => (
              <div key={s.label} className="glass-glow rounded-2xl p-8">
                <div className="text-5xl md:text-6xl font-black text-aurora tracking-tight">{s.headline}</div>
                <div className="mt-3 text-white font-semibold">{s.label}</div>
                <p className="mt-3 text-text-muted text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW WE'RE DIFFERENT */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl">
            <Badge>How we&rsquo;re different</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Not a generic <span className="text-aurora">creative-portfolio template</span>.
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">01</div>
              <h3 className="mt-4 text-white font-bold">Bangalore HQ, local sensibility</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                Koramangala studio. We understand a Bangalore wedding inquiry — Mehndi vs Sangeet vs Reception, the
                Telugu / Tamil / Kannada families, the destination Goa shoots. The scripts reflect that.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">02</div>
              <h3 className="mt-4 text-white font-bold">Kannada + Hindi voice agent, real-world tuned</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                Tuned to handle a bride&rsquo;s father asking about drone availability and travel charges in Kannada at 11pm.
                Not theoretical multilingual support.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">03</div>
              <h3 className="mt-4 text-white font-bold">Done-for-you, not subscription pile</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                You won&rsquo;t buy Pixieset + HoneyBook + Calendly + Zapier + WATI. One contract. We build and monitor.
                Your monthly tool bill <em>shrinks</em>.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* PRICING TEASER */}
      <section className="py-20">
        <Container>
          <div className="glass-glow rounded-3xl p-10 md:p-14 max-w-5xl mx-auto">
            <Badge>Pricing teaser</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-white tracking-tight">
              Transparent, India-priced, no surprises.
            </h2>
            <div className="mt-8 grid md:grid-cols-3 gap-5">
              <div className="rounded-2xl border border-white/10 p-6">
                <div className="text-text-muted text-xs uppercase tracking-widest font-mono">Starter</div>
                <div className="mt-3 text-2xl font-bold text-white">From ₹35K setup</div>
                <div className="text-text-secondary">+ ₹9,999/mo</div>
                <p className="mt-4 text-sm text-text-muted">
                  Solo studio, 20–40 weddings/year. Voice agent + WhatsApp + basic nurture.
                </p>
              </div>
              <div className="rounded-2xl border border-indigo/40 p-6 bg-indigo/5">
                <div className="text-indigo-glow text-xs uppercase tracking-widest font-mono">Growth</div>
                <div className="mt-3 text-2xl font-bold text-white">₹24,999/mo</div>
                <p className="mt-4 text-sm text-text-muted">
                  2–3 shooter studio. Full 5-touch nurture, payment recovery, monthly portfolio refresh.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 p-6">
                <div className="text-text-muted text-xs uppercase tracking-widest font-mono">Mid-market</div>
                <div className="mt-3 text-2xl font-bold text-white">₹60K+/mo</div>
                <p className="mt-4 text-sm text-text-muted">
                  Larger studios, destination work, brand-team operations. Custom workflows.
                </p>
              </div>
            </div>
            <p className="mt-6 text-xs text-text-muted">
              Razorpay, WhatsApp API, voice-minute usage billed at platform rates direct to your accounts. First
              measurable result in 21 days, or full refund.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl">
            <Badge>FAQ</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Questions photographers ask us first.
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {FAQS.map((f) => (
              <div key={f.q} className="glass rounded-2xl p-6">
                <h3 className="text-white font-bold">{f.q}</h3>
                <p className="mt-3 text-text-secondary text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-24">
        <Container>
          <div className="glass-glow rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto">
            <Badge>Talk to us</Badge>
            <h2 className="mt-6 text-3xl md:text-5xl font-black text-white tracking-tight">
              Book the wedding. <span className="text-aurora">Get paid on time</span>.
            </h2>
            <p className="mt-6 text-text-secondary max-w-2xl mx-auto">
              21-day build. Bangalore HQ. Kannada and Hindi on the voice agent. Start the conversation in any
              language — we respond the same way.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Button href={WHATSAPP_HREF} size="lg" external>
                WhatsApp ZentroTECH
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get a Quote
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
