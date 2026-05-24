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
  title: "Contractor lead engine + payment recovery · Bangalore",
  description:
    "JustDial / Indiamart 5–7 touch nurture + Kannada voice + payment recovery for Bangalore contractors. DSO drops 30–50%. Live in 21 days.",
  path: "/for/contractors-bangalore",
});

const WHATSAPP_HREF = waLink(
  "Hi ZentroTECH — Bangalore contractor, ₹40K/mo on JustDial / Indiamart and leads dying unfollowed. Show me the payment-recovery + nurture stack."
);

const PAIN_POINTS = [
  {
    title: "JustDial and Indiamart leads die unfollowed",
    body:
      "You're paying ₹15K–₹40K a month to JustDial / Indiamart / Sulekha for leads. Each lead is shared with 3–5 contractors. Whoever calls first wins. You're driving across Bangalore traffic on a site visit when the lead comes in. By the time you call back at 8pm, the homeowner has already booked someone else. The leads aren't bad — your follow-up window is.",
  },
  {
    title: "Payment delays of 60–120 days",
    body:
      "You finished the kitchen renovation 8 weeks ago. The final ₹1.4L is &ldquo;coming next week&rdquo; for the third time. You don't want to fight with a client whose neighbour is your next potential job. So you send polite WhatsApps, then forget, then send another one. Meanwhile your masons need to be paid, your materials supplier is calling, your cashflow is upside-down. The Indian contractor DSO problem is universal — and it&rsquo;s automatable.",
  },
  {
    title: "Materials supplier WhatsApp chaos",
    body:
      "Cement order to one supplier, steel to another, tiles to a third, plumbing fittings to a fourth. Every site has 3–6 active material WhatsApps + 4–8 site-team WhatsApp threads. Quotes get lost, deliveries get scheduled wrong, payments get confused. You spend two hours a day in WhatsApp instead of two hours managing the site. The chaos costs jobs.",
  },
  {
    title: "Language barrier between you and your site team",
    body:
      "Your masons, plumbers, and electricians speak Kannada or Tamil. Your homeowner client speaks English. Voice notes get forwarded, mistranslated, and a load-bearing wall almost comes down because nobody knew what &ldquo;structural&rdquo; meant. Site supervisors translate manually, badly, all day. The instruction loop is slow and error-prone — and it&rsquo;s a leading indicator of cost overruns.",
  },
];

const SHIP_IN_21_DAYS = [
  "Conversion-built contractor website (home, services — kitchen / bathroom / full renovation / commercial fit-out, project gallery, process, fees / quotation flow, contact, blog)",
  "JustDial / Indiamart / Sulekha lead capture: auto-pull or paste-and-process flow so every paid lead enters a 5-touch nurture inside 60 seconds — WhatsApp + SMS + scheduled voice call",
  "Kannada + Hindi + Tamil + English AI voice agent for the enquiry number — handles &ldquo;is your team available next week for kitchen renovation?&rdquo;, captures scope (rooms, square footage, budget bracket), books site-visit slots",
  "Site-visit booking flow: homeowner picks a slot, gets WhatsApp confirmation, day-before and day-of reminders. Cuts no-show rate by half.",
  "Quote-to-acceptance funnel: signed quote PDF generation, payment-link landing page for 20% advance, WhatsApp confirmation thread linked to the project number",
  "Payment recovery automation per invoice: Day 0 / 3 / 7 / 14 / 21 / 30 polite-but-persistent cadence via WhatsApp + email + AI voice in the client's language. Auto-stops on payment.",
  "Materials supplier WhatsApp consolidation: structured broadcast lists per supplier, order templates, delivery confirmation tracking. Stops the chaos of 14 parallel threads.",
  "Monthly dashboard: leads in by source (JustDial / website / referral), response-time average, quotes sent, jobs booked, ₹ outstanding, DSO trend, materials spend",
];

const STATS = [
  {
    headline: "30–50%",
    label: "of cold JustDial / Indiamart leads captured",
    body: "When a 5-touch follow-up inside 72 hours replaces a single &ldquo;sir please confirm&rdquo; phone call that never connects.",
  },
  {
    headline: "30–50%",
    label: "drop in DSO (days sales outstanding)",
    body: "Payment recovery automation runs the polite reminder cadence so you don't have to call the homeowner whose neighbour is your next job.",
  },
  {
    headline: "9pm calls answered",
    label: "in Kannada, Hindi, Tamil",
    body: "AI voice agent handles &ldquo;next week available aagatte?&rdquo; enquiries, captures scope and books a site visit. No missed ring.",
  },
];

const FAQS = [
  {
    q: "Most of my leads come from JustDial and Indiamart, not from a website. Does this still work?",
    a: "Especially. The website is a credibility layer — homeowners do google your business name before calling, and a professional site closes that loop — but the real value here is the lead-handling layer. Every JustDial or Indiamart lead that lands in your inbox triggers the 5-touch nurture inside 60 seconds, so even when you're driving across Bangalore traffic, the lead is being warmed up. By the time you call back, the homeowner already received a WhatsApp with your gallery, sample projects, and a site-visit slot to pick.",
  },
  {
    q: "My masons and plumbers don't speak English. How will the voice agent help them?",
    a: "The voice agent isn't for them — it's for your incoming homeowner enquiries. For your site team, the value is the WhatsApp consolidation: structured broadcast lists in Kannada or Tamil, voice-note translation, and standardised instruction templates so your supervisor isn't translating verbally every time. You can also (separately) set up a Kannada/Tamil voice agent for outbound calls — for example, calling your tile supplier to confirm delivery, or your homeowner client when the team needs a decision in English.",
  },
  {
    q: "Payment recovery feels awkward. I work in tight community circles in Bangalore — if I aggressively chase a client, I lose two referrals.",
    a: "Tone is everything. The cadence starts gentle — Day 3 is a &ldquo;hi confirming the delivery&rdquo;, Day 7 is &ldquo;here's the invoice copy for your records&rdquo;, Day 14 is a friendly payment-link reminder. Nothing escalates to firm until Day 21, and we never use aggressive language. The system is designed for the Indian SMB context — polite, persistent, and stops the second payment lands. Most contractors find the automation actually <em>improves</em> client relationships because the reminders are professional and predictable rather than awkward personal calls.",
  },
  {
    q: "What does it cost to run after the 21-day build?",
    a: "Starter from ₹35,000 setup + ₹9,999/month is right for a solo contractor doing 8–15 jobs a year. Growth at ₹24,999/month is for a small firm with 2–3 site supervisors, full 5-touch nurture, payment recovery, and materials WhatsApp consolidation. Mid-market at ₹60K+/month is for contractors with crew of 15+, multiple active projects, and commercial fit-out workflows. JustDial / Indiamart subscriptions stay yours, billed directly to those platforms. WhatsApp API and voice-minute usage billed at platform rates, no markup from us.",
  },
];

export default function ContractorsBangalorePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Lead Engine + Payment Recovery for Bangalore Contractors",
    description:
      "Lead-engine website, 5-touch JustDial/Indiamart nurture, Kannada/Hindi/Tamil AI voice agent, and payment recovery automation for contractors in Bangalore. Live in 21 days.",
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: {
      "@type": "City",
      name: "Bangalore",
    },
    serviceType: "Contractor lead engine and payment recovery automation",
    audience: {
      "@type": "BusinessAudience",
      audienceType:
        "Renovation contractors, civil contractors, interior contractors, and commercial fit-out contractors in Bangalore",
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
            <Badge>For Bangalore contractors</Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
              Win the lead. <span className="text-aurora">Get paid on time</span>.
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-text-secondary leading-snug max-w-3xl">
              You pay JustDial ₹40K a month for leads that die because you&rsquo;re on a site visit. Your last
              renovation client owes ₹1.4L for 8 weeks. We ship a 5-touch lead engine + Kannada/Hindi voice agent +
              payment recovery automation in 21 days. 30–50% of cold leads captured. DSO drops 30–50%.
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
              Bangalore HQ · For renovation / civil / interior / commercial fit-out · Done-for-you · One contract
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
              The four leaks <span className="text-aurora">draining your jobs and cashflow</span>.
            </h2>
            <p className="mt-4 text-text-muted">
              Mapped from conversations with renovation and civil contractors across HSR, Whitefield, Jayanagar, and
              Hebbal. Same fights, same fixes.
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
              Concrete deliverables, scoped in week 1, live by week 3. Built around your real day — JustDial pings, site
              visits, materials chaos.
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
            <Badge>Real numbers for contractors</Badge>
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
              Not a generic <span className="text-aurora">website agency</span>.
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">01</div>
              <h3 className="mt-4 text-white font-bold">Bangalore HQ, contractor-literate</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                We understand JustDial economics, site-visit Bangalore traffic, materials supplier WhatsApp, and the
                referral economy you operate in. Scripts and workflows reflect that.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">02</div>
              <h3 className="mt-4 text-white font-bold">Kannada + Hindi + Tamil voice</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                Real-world tuned for the three languages your homeowner clients and site team actually use. Not
                generic translated English.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">03</div>
              <h3 className="mt-4 text-white font-bold">Done-for-you, not SaaS sprawl</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                You won&rsquo;t buy QuickBooks + WATI + Zapier + Calendly + JotForm. One contract. We build, host, monitor.
                Your monthly tool bill <em>drops</em> after working with us.
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
                  Solo contractor, 8–15 jobs/year. Voice agent + WhatsApp + basic lead nurture.
                </p>
              </div>
              <div className="rounded-2xl border border-indigo/40 p-6 bg-indigo/5">
                <div className="text-indigo-glow text-xs uppercase tracking-widest font-mono">Growth</div>
                <div className="mt-3 text-2xl font-bold text-white">₹24,999/mo</div>
                <p className="mt-4 text-sm text-text-muted">
                  2–3 supervisor firm. Full nurture + payment recovery + materials WhatsApp consolidation.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 p-6">
                <div className="text-text-muted text-xs uppercase tracking-widest font-mono">Mid-market</div>
                <div className="mt-3 text-2xl font-bold text-white">₹60K+/mo</div>
                <p className="mt-4 text-sm text-text-muted">
                  Crew of 15+, multiple active projects, commercial fit-out workflows.
                </p>
              </div>
            </div>
            <p className="mt-6 text-xs text-text-muted">
              JustDial / Indiamart fees stay yours. WhatsApp API + voice-minute usage at platform rates, no markup.
              First measurable result in 21 days, or full refund.
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
              Questions contractors ask us first.
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
              Stop losing JustDial leads. <span className="text-aurora">Stop chasing payments</span>.
            </h2>
            <p className="mt-6 text-text-secondary max-w-2xl mx-auto">
              21-day build. Bangalore HQ. Kannada, Hindi, and Tamil on the voice agent. Start the conversation in any
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
