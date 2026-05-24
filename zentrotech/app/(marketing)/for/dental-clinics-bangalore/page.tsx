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
  title: "Dental clinic AI voice + WhatsApp · Bangalore",
  description:
    "Kannada-first AI voice + WhatsApp + lead-engine for Bangalore dental clinics. Stop losing ₹5K–₹50K per missed call. Live in 21 days. First result, or full refund.",
  path: "/for/dental-clinics-bangalore",
});

const WHATSAPP_HREF = waLink(
  "Hi ZentroTECH — Bangalore dental clinic, losing after-7pm calls and Kannada patients. Show me the 21-day Kannada voice + WhatsApp setup."
);

const PAIN_POINTS = [
  {
    title: "Missed calls after 7pm",
    body:
      "Your reception closes at 7. Parents calling about a kid's broken tooth, working professionals booking a Saturday cleaning, NRIs ringing from a different timezone — they hit voicemail, then book the clinic 200m down the road. Every ring after-hours that nobody picks up is roughly ₹5,000 to ₹50,000 walking out depending on whether it's a cleaning or a full root-canal course.",
  },
  {
    title: "Kannada and Tamil patients alienated",
    body:
      "Your front desk speaks English and broken Hindi. A Kannada-speaking patient's mother calling about her son's braces appointment gives up halfway through the call. Your English-only WhatsApp auto-reply tells her she's in the wrong place — even when she isn't. Bangalore's local-language patient pool is 60%+ of walk-in dentistry. You're invisible to most of it.",
  },
  {
    title: "Braces and root-canal follow-ups slip",
    body:
      "An orthodontic course is 18–24 months of monthly reviews. A root-canal is 3–5 sittings over a few weeks. Your assistant calls once, the patient doesn't answer, and the appointment dies. Three months later they show up at a competitor saying 'I forgot to come back'. Predictable revenue gets recovered when the follow-up is automated, not when it depends on human memory.",
  },
  {
    title: "Quotes go out, then ghost",
    body:
      "A patient walks in, sees a treatment plan worth ₹80K, says 'I'll think about it', and disappears. You don't follow up. They Google three other clinics, get cheaper-looking quotes, and you lose the case. The Indian SMB closure data is brutal: most clinics quote 3–5 prospective patients a week and close 1. A 5–7 touch nurture inside 72 hours flips that ratio.",
  },
];

const SHIP_IN_21_DAYS = [
  "Kannada + Hindi + English AI voice agent that answers your clinic line 24/7 — books appointments straight into your calendar, handles 'is Dr available on Saturday?', routes emergencies to your mobile",
  "WhatsApp Business API setup with auto-reply for new enquiries, appointment confirmations, and 'reply 1 to reschedule' menus",
  "Conversion-built clinic website (5–7 pages: home, services, doctor profiles, before/after gallery, fees, contact, blog) with WhatsApp + call-now buttons on every screen",
  "Google Business Profile cleanup + 30 days of posts pre-loaded — directions, hours, services, before/after photos, FAQs in Kannada and English",
  "Lead-capture forms that pipe into a CRM (Zoho default — affordable) with auto-routing to front desk + alerts to your mobile within 60 seconds",
  "5–7 touch follow-up sequence for un-booked quotes: WhatsApp + SMS + scheduled AI voice call, runs for 14 days, auto-stops on reply",
  "Recall automation for braces / root-canal patients: 'Dr Sharma's appointment for [name] is on [date], reply YES to confirm' — in Kannada or English by patient preference",
  "Monthly analytics dashboard: missed-calls captured, appointments booked, follow-ups converted, ₹ recovered",
];

const STATS = [
  {
    headline: "85%",
    label: "of missed clinic calls never call back",
    body: "Industry data across Indian dental practices. The first clinic that picks up wins the booking — almost always.",
  },
  {
    headline: "₹5K–₹50K",
    label: "lost per missed call",
    body: "Cleaning to crowns to a full ortho course. Even at the low end, ten missed calls a month is ₹50K of evaporated revenue.",
  },
  {
    headline: "30–50%",
    label: "of after-hours calls recovered",
    body: "What clinics typically see in month 2 once a Kannada-capable voice agent answers calls outside reception hours.",
  },
];

const FAQS = [
  {
    q: "Will the AI voice agent really speak proper Kannada to patients' parents?",
    a: "Yes — Kannada, Tamil, Telugu, Hindi, and English on the same number, switching based on the caller's language. We tune the voice agent on your clinic's actual scripts (appointment booking, fee enquiries, emergency routing) and you sign off on the conversations before it goes live. Patients can also say 'connect me to reception' any time to drop into your real front desk during opening hours.",
  },
  {
    q: "How do appointments from the voice agent land in our system?",
    a: "Straight into your calendar of choice — Google Calendar, Outlook, or any clinic management system with a calendar export. The voice agent checks availability live, books the slot, sends a WhatsApp + SMS confirmation to the patient, and emails your front desk. Double-booking is impossible because it's writing to the same calendar your humans use.",
  },
  {
    q: "What does it cost to run after the 21-day build?",
    a: "Starter from ₹35,000 setup + ₹9,999/month for the Kannada voice agent + basic follow-up automation. Growth at ₹24,999/month adds the full 5–7 touch nurture, WhatsApp Business API messaging volume, and monthly content updates. Mid-market at ₹60K+/month is for chains and multi-doctor practices with custom workflows. Voice-minute and WhatsApp-message API costs are billed at platform rates — we don't mark them up.",
  },
  {
    q: "We already have a website and a missed-call SMS thing. Why switch?",
    a: "Two reasons. One, a missed-call SMS doesn't book the appointment — the patient still has to call back and they usually don't. A voice agent that picks up live and offers a Saturday 11am slot books the patient there and then. Two, your current website probably has no follow-up layer; a patient who enquires for an ₹80K treatment plan should get 5–7 touches in 72 hours, not silence. We bolt the engine onto what you already have if the site is decent — no need to rebuild.",
  },
];

export default function DentalClinicsBangalorePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Voice + WhatsApp for Bangalore Dental Clinics",
    description:
      "Kannada-first AI voice agent, WhatsApp Business API, and lead-engine website built for dental clinics in Bangalore. Recovers 30–50% of missed after-hours calls.",
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: {
      "@type": "City",
      name: "Bangalore",
    },
    serviceType: "Dental clinic lead engine and AI voice automation",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Dental clinics, orthodontists, and multi-doctor dental practices in Bangalore",
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
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)" }}
        />
        <Container className="relative">
          <div className="max-w-4xl">
            <Badge>For Bangalore dental clinics</Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
              AI voice + WhatsApp that books your{" "}
              <span className="text-aurora">after-hours dental patients</span> — in Kannada.
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-text-secondary leading-snug max-w-3xl">
              Every missed call after 7pm is ₹5,000 to ₹50,000 walking out the door. We ship a Kannada-first voice
              agent, WhatsApp follow-up, and a lead-engine clinic website in 21 days. Clinics see 30–50% of after-hours
              calls converted to booked appointments by month 2.
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
              Bangalore HQ · Done-for-you · No SaaS subscription churn · One contract
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
              The four leaks <span className="text-aurora">draining your chair time</span>.
            </h2>
            <p className="mt-4 text-text-muted">
              We&rsquo;ve mapped these by talking to dentists in Koramangala, Indiranagar, Jayanagar, and HSR. None of them
              are theoretical. All of them are fixable inside 21 days.
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
              Concrete deliverables, signed off in week 1 scoping, live by week 3. No rolling delays, no &ldquo;phase 2&rdquo;
              evasion.
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
            <Badge>Real numbers for dental</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              The math is <span className="text-aurora">brutal and fixable</span>.
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
              Not another <span className="text-aurora">SaaS subscription pile</span>.
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">01</div>
              <h3 className="mt-4 text-white font-bold">Bangalore HQ, on-the-ground</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                We sit in Koramangala. We can walk into your clinic for the kick-off, train your front desk on the
                voice-agent escalation, and meet your office manager in person. No US/EU vendor on Slack-Asia hours.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">02</div>
              <h3 className="mt-4 text-white font-bold">Kannada-first, not Kannada-bolted-on</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                The voice agent is tuned for Bangalore Kannada-Hindi code-switching, not generic translated English. It
                understands &ldquo;adre, root-canal alli&rdquo; without breaking.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">03</div>
              <h3 className="mt-4 text-white font-bold">Done-for-you, not DIY SaaS</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                One contract. We build, host, monitor, and tune. You don&rsquo;t log into five dashboards, you don&rsquo;t
                debug Twilio webhooks at 11pm. One number to call when something breaks: ours.
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
                  Single-doctor clinic. Voice agent + WhatsApp + basic follow-up.
                </p>
              </div>
              <div className="rounded-2xl border border-indigo/40 p-6 bg-indigo/5">
                <div className="text-indigo-glow text-xs uppercase tracking-widest font-mono">Growth</div>
                <div className="mt-3 text-2xl font-bold text-white">₹24,999/mo</div>
                <p className="mt-4 text-sm text-text-muted">
                  Multi-doctor practice. Full 5–7 touch nurture, recall automation, monthly content.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 p-6">
                <div className="text-text-muted text-xs uppercase tracking-widest font-mono">Mid-market</div>
                <div className="mt-3 text-2xl font-bold text-white">₹60K+/mo</div>
                <p className="mt-4 text-sm text-text-muted">
                  Chain or 4+ locations. Custom workflows, dedicated success manager.
                </p>
              </div>
            </div>
            <p className="mt-6 text-xs text-text-muted">
              Voice-minute and WhatsApp Business API usage billed at platform rates, no markup. First measurable result
              in 21 days, or full refund — see refund policy.
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
              Questions Bangalore dentists ask us first.
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
              Stop losing patients to the clinic <span className="text-aurora">200m down the road</span>.
            </h2>
            <p className="mt-6 text-text-secondary max-w-2xl mx-auto">
              We ship in 21 days. We&rsquo;re in Bangalore. We pick up our own WhatsApp. Start the conversation in Kannada,
              Hindi, or English — we&rsquo;ll respond the same way.
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
