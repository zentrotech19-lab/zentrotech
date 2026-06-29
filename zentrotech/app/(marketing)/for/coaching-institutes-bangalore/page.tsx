import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { waLink } from "@/lib/whatsapp";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/reveal";
import { Tilt } from "@/components/animations/tilt";
import { CountUp } from "@/components/animations/count-up";
import { RealNumbers } from "../_components/real-numbers";

export const metadata: Metadata = buildMetadata({
  title: "Coaching institute lead engine · Bangalore",
  description:
    "Hindi + Kannada AI voice, 5–7 touch WhatsApp nurture, lead-engine website for Bangalore coaching institutes. Cut cost-per-enrolment from ₹400 to ₹140. Live in 21 days.",
  path: "/for/coaching-institutes-bangalore",
});

const WHATSAPP_HREF = waLink(
  "Hi ZentroTECH — Bangalore coaching institute, leads from Meta dying in spreadsheet. Want the 5–7 touch nurture running before next batch."
);

const PAIN_POINTS = [
  {
    title: "Instagram and Meta ad leads die in your spreadsheet",
    body:
      "You spend ₹40K–₹2L a month on Meta ads. Leads come in, a counsellor calls once, the parent doesn't answer, the lead row turns yellow, then white, then is forgotten. Your CAC was ₹400 a lead. You closed 6%. The same lead with a 5–7 touch nurture cadence inside 72 hours closes at 14–18% — same ad spend, 2–3× the enrolments. The leakage is downstream of the ad creative, not upstream.",
  },
  {
    title: "Parents call at 8pm in Hindi or Kannada",
    body:
      "Working parents finally sit down at 8:30pm and call to ask &ldquo;NEET batch yaava time start aagatte?&rdquo; or &ldquo;maine apne bete ke liye demo class book karwana hai&rdquo;. Your counsellor's WhatsApp is off, your call goes to voicemail, and they Google three other institutes. The parent who books a demo at 9pm is the parent who walks in on Saturday. The institute that answers at 9pm wins.",
  },
  {
    title: "Demo-to-enrolment drop-off is invisible",
    body:
      "20 students attend a free demo class. 6 enrol. What happened to the other 14? Nobody followed up beyond a single &ldquo;sir please confirm&rdquo; WhatsApp. Half were on the fence, half were comparing fees with two other coaching centers, and almost all of them would have converted with a 5-touch sequence over 72 hours covering fee, batch timing, faculty intro, sample test, and a final scarcity nudge.",
  },
  {
    title: "Batch-fill anxiety eats your margin",
    body:
      "You committed to a batch of 25 starting next Monday. You have 11 students. You either delay (and lose the 11), or run an unprofitable batch (and demoralise your faculty). The way out is filling batches predictably — knowing 3 weeks in advance roughly how many enrolments are baked in, because every lead from the last 60 days is still in an automated nurture loop, not deleted.",
  },
];

const SHIP_IN_21_DAYS = [
  "Conversion-built coaching website (home, courses, batch schedule, faculty, results, fees, contact, blog) with a per-course landing page and live batch-availability widget",
  "Hindi + Kannada + English AI voice agent on your enquiry number — answers parent calls at 9pm, books demo class slots, handles &ldquo;fees kitna hai?&rdquo;, escalates serious enquiries to your counsellor's mobile during opening hours",
  "WhatsApp Business API with auto-reply for new enquiries, demo-class confirmations, and broadcast lists by course (NEET, JEE, CET, Bank PO, Class 10 Boards)",
  "5–7 touch nurture cadence per inbound lead inside 72 hours: WhatsApp + SMS + email + scheduled AI voice call, auto-stops on enrolment or opt-out",
  "Meta + Google Ads conversion tracking wired to your CRM with per-creative cost-per-enrolment (not per-lead) so you can kill bad creatives without guessing",
  "Demo-class booking page with calendar slots, automatic confirmation, day-before reminder, and day-of reminder via WhatsApp + voice",
  "Parent-portal WhatsApp updates: weekly progress messages, fee-due reminders, attendance, batch announcements — automated from your existing student data",
  "Monthly dashboard: leads in, demos booked, demo show-up rate, enrolments, cost per enrolment, batch-fill projection 3 weeks out",
];

const STATS = [
  {
    headline: "40–60%",
    label: "lift in demo show-up rate",
    body: "What institutes see when a 5–7 touch sequence inside 72 hours replaces a single counsellor phone call.",
  },
  {
    headline: "2–3×",
    label: "faster batch fill",
    body: "When parent calls are answered in Hindi/Kannada at 9pm and demos are confirmed by automated reminders, not human follow-through.",
  },
  {
    headline: "₹400 → ₹140",
    label: "cost per enrolment, typical drop",
    body: "Same ad spend. Better downstream nurture. Demos that show up convert ~3× higher than demos that ghost.",
  },
];

const FAQS = [
  {
    q: "We already have a counsellor team. Won't this replace them?",
    a: "No — it amplifies them. The AI voice agent and WhatsApp automation handle the first-touch volume (the 80% of leads that are tire-kickers or after-hours), so your human counsellors only spend time on warm, qualified, demo-confirmed leads. Counsellors close more, do less data entry, and stop burning out on 9pm parent calls. Most institutes see their existing team handle 2–3× the enrolment volume with the same headcount.",
  },
  {
    q: "What about competing coaching centers in the same neighbourhood?",
    a: "Speed-to-lead is the moat. The institute that responds to a parent's Instagram enquiry in 3 minutes (not 3 hours) gets the demo booking. We don't compete on faculty, fees, or rank-list — we make sure you're the institute the parent actually talks to first. After the demo, the 5–7 touch nurture keeps you in front of the parent while three other institutes go silent.",
  },
  {
    q: "How does the voice agent handle a parent who wants to negotiate fees on the call?",
    a: "It doesn't. The voice agent qualifies, books the demo or counsellor callback, and escalates fee discussions to a human. Negotiation is a sales conversation, not an FAQ. The voice agent's job is to make sure that conversation actually happens — and happens with a parent who's already invested 90 minutes in a demo class. That parent negotiates differently to a cold lead.",
  },
  {
    q: "What does it cost to run after the 21-day build?",
    a: "Starter from ₹35,000 setup + ₹9,999/month covers a single-location institute with one or two courses. Growth at ₹24,999/month is the standard package: full 5–7 touch nurture, multi-course funnels, monthly creative refresh, voice agent across all your enquiry numbers. Mid-market at ₹60K+/month is for institutes with 3+ branches or 6+ courses. Meta/Google ad spend is yours, billed directly to your accounts — we just optimise the pipeline downstream.",
  },
];

export default function CoachingInstitutesBangalorePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Lead Engine for Coaching & Ed-Tech Institutes in Bangalore",
    description:
      "Lead-engine website, Hindi/Kannada AI voice agent, and 5–7 touch WhatsApp + voice nurture cadence for coaching institutes in Bangalore. Live in 21 days.",
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: {
      "@type": "City",
      name: "Bangalore",
    },
    serviceType: "Coaching institute lead engine and parent-call automation",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Coaching institutes, ed-tech centres, test-prep academies, and tuition centres in Bangalore",
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
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 65%)" }}
        />
        <Container className="relative">
          <div className="max-w-4xl">
            <Badge>For Bangalore coaching institutes</Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
              Stop losing leads. <span className="text-aurora">Fill every batch</span>.
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-text-secondary leading-snug max-w-3xl">
              Your Meta ads bring leads. A single counsellor call lets most of them die. We ship a Hindi/Kannada voice
              agent + 5–7 touch nurture inside 72 hours + a conversion-built coaching website in 21 days. Demo show-up
              rates rise 40–60%. Batches fill 2–3× faster.
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
              Bangalore HQ · Done-for-you · NEET / JEE / CET / Boards / Bank / IELTS-ready
            </p>
          </div>
        </Container>
      </section>

      {/* PAIN POINTS */}
      <section className="py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <Badge>Pain points we fix</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              The four leaks <span className="text-aurora">killing your enrolments</span>.
            </h2>
            <p className="mt-4 text-text-muted">
              Mapped from conversations with coaching owners in Jayanagar, BTM, Indiranagar, and Marathahalli. Same
              problems everywhere. Same fix.
            </p>
          </Reveal>
          <Stagger className="mt-10 grid md:grid-cols-2 gap-5">
            {PAIN_POINTS.map((p) => (
              <StaggerItem key={p.title}>
                <Tilt className="h-full">
                  <div className="glass rounded-2xl p-6 h-full">
                    <h3 className="text-white font-bold text-lg">{p.title}</h3>
                    <p className="mt-3 text-text-secondary text-sm leading-relaxed">{p.body}</p>
                  </div>
                </Tilt>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* WHAT WE SHIP */}
      <section className="py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <Badge>21-day delivery</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              What we ship in <span className="text-aurora">21 days</span>.
            </h2>
            <p className="mt-4 text-text-muted">
              Concrete deliverables, scope locked in week 1, live by week 3. No phase-2 evasion, no surprise add-ons.
            </p>
          </Reveal>
          <Stagger className="mt-10 grid md:grid-cols-2 gap-4">
            {SHIP_IN_21_DAYS.map((d, i) => (
              <StaggerItem key={d}>
                <li className="flex gap-3 glass rounded-xl p-5 h-full list-none">
                  <div className="text-indigo-glow font-mono font-bold shrink-0">{String(i + 1).padStart(2, "0")}</div>
                  <span className="text-text-secondary text-sm leading-relaxed">{d}</span>
                </li>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* REAL NUMBERS */}
      <section className="py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <Badge>Real numbers for coaching</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              The economics <span className="text-aurora">aren&rsquo;t complicated</span>.
            </h2>
          </Reveal>
          <RealNumbers
            left={{
              headline: "40–60%",
              label: STATS[0].label,
              body: STATS[0].body,
            }}
            right={{
              headline: "₹400 → ₹140",
              label: STATS[2].label,
              body: STATS[2].body,
            }}
            recovered={{
              language: "Hindi · Kannada",
              greeting: "नमस्ते, डेमो क्लास बुक कर दूँ?",
              subtitle: "“Hello, shall I book a demo class?” — at 9pm, while you sleep.",
              lostRange: "₹40K–₹2L/mo of ad spend leaking",
              recovered: 180000,
            }}
          />
        </Container>
      </section>

      {/* HOW WE'RE DIFFERENT */}
      <section className="py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <Badge>How we&rsquo;re different</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Not a generic <span className="text-aurora">marketing agency pitch</span>.
            </h2>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">01</div>
              <h3 className="mt-4 text-white font-bold">Bangalore HQ, walk-in-friendly</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                Koramangala office. We can sit with your counsellor team for the voice-agent training session. Your
                centre manager has a WhatsApp line into ours.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">02</div>
              <h3 className="mt-4 text-white font-bold">Hindi + Kannada voice that actually works</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                Tuned for the real way Bangalore parents talk — code-switching between Hindi, Kannada, and English mid-
                sentence. Not stilted translation.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">03</div>
              <h3 className="mt-4 text-white font-bold">Done-for-you vs SaaS exhaustion</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                You won&rsquo;t buy HubSpot + Zapier + Calendly + Twilio + WATI. One contract. We build, host, monitor.
                Your monthly tool bill goes <em>down</em> after working with us, not up.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* PRICING TEASER */}
      <section className="py-20">
        <Container>
          <Reveal className="glass-glow rounded-3xl p-10 md:p-14 max-w-5xl mx-auto">
            <Badge>Pricing teaser</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-white tracking-tight">
              Transparent, India-priced, no surprises.
            </h2>
            <div className="mt-8 grid md:grid-cols-3 gap-5">
              <div className="rounded-2xl border border-white/10 p-6">
                <div className="text-text-muted text-xs uppercase tracking-widest font-mono">Starter</div>
                <div className="mt-3 text-2xl font-bold text-white">
                  From <CountUp value={35} prefix="₹" suffix="K" className="tabular-nums" /> setup
                </div>
                <div className="text-text-secondary">
                  + <CountUp value={9999} prefix="₹" className="tabular-nums" />/mo
                </div>
                <p className="mt-4 text-sm text-text-muted">
                  Single-location, 1–2 courses. Voice agent + WhatsApp + basic nurture.
                </p>
              </div>
              <div className="rounded-2xl border border-indigo/40 p-6 bg-indigo/5 pulse-glow">
                <div className="text-indigo-glow text-xs uppercase tracking-widest font-mono">Growth</div>
                <div className="mt-3 text-2xl font-bold text-white">
                  <CountUp value={24999} prefix="₹" className="tabular-nums" />/mo
                </div>
                <p className="mt-4 text-sm text-text-muted">
                  Multi-course, full 5–7 touch nurture, monthly creative refresh, parent-portal automation.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 p-6">
                <div className="text-text-muted text-xs uppercase tracking-widest font-mono">Mid-market</div>
                <div className="mt-3 text-2xl font-bold text-white">
                  <CountUp value={60} prefix="₹" suffix="K+" className="tabular-nums" />/mo
                </div>
                <p className="mt-4 text-sm text-text-muted">
                  3+ branches, custom workflows, dedicated success manager, quarterly business reviews.
                </p>
              </div>
            </div>
            <p className="mt-6 text-xs text-text-muted">
              Ad spend stays in your accounts. Voice-minute and WhatsApp API usage billed at platform rates, no markup.
              First measurable result in 21 days, or full refund.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <Badge>FAQ</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Questions coaching owners ask us first.
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid md:grid-cols-2 gap-5">
            {FAQS.map((f) => (
              <StaggerItem key={f.q}>
                <div className="glass rounded-2xl p-6 h-full">
                  <h3 className="text-white font-bold">{f.q}</h3>
                  <p className="mt-3 text-text-secondary text-sm leading-relaxed">{f.a}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-24">
        <Container>
          <Reveal className="glass-glow rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto">
            <Badge>Talk to us</Badge>
            <h2 className="mt-6 text-3xl md:text-5xl font-black text-white tracking-tight">
              Fill the next batch before the <span className="text-aurora">competitor down the street</span> does.
            </h2>
            <p className="mt-6 text-text-secondary max-w-2xl mx-auto">
              21-day build. Bangalore HQ. Real Kannada and Hindi on the voice agent. Start the conversation in any
              language — we respond the same way.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Button href={WHATSAPP_HREF} size="lg" external className="shimmer">
                WhatsApp ZentroTECH
              </Button>
              <Button href="/contact" variant="secondary" size="lg" className="shimmer">
                Get a Quote
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
