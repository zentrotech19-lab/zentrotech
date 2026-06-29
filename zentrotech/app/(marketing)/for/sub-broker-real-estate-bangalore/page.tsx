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
  title: "Sub-broker WhatsApp + voice automation · Bangalore",
  description:
    "Kannada-first WhatsApp + voice for Bangalore real-estate sub-brokers. 7-min lead response, weeds 70% tire-kickers, answers 9pm calls. Live in 21 days.",
  path: "/for/sub-broker-real-estate-bangalore",
});

const WHATSAPP_HREF = waLink(
  "Hi ZentroTECH — sub-broker working Whitefield / Sarjapur / HSR. MagicBricks leads die in 6 hours. Tell me about the 7-minute response."
);

const PAIN_POINTS = [
  {
    title: "Hot leads die in 6 hours",
    body:
      "A buyer fills a form on MagicBricks at 11am asking about a 3BHK in Whitefield. By the time you see the alert at 5pm, two other sub-brokers have already shown her three flats. Real-estate buying decisions move fast — the first broker to respond books 40% more closures than the second. A 7-minute response triggers a discovery call. A 6-hour response triggers radio silence.",
  },
  {
    title: "200+ listings, no triage",
    body:
      "You have inventory across Whitefield, Sarjapur, Electronic City, ORR, HSR, and four other neighbourhoods. A buyer says &ldquo;something between ₹1.2Cr and ₹1.6Cr, 3BHK, ready-to-move, near ORR&rdquo; — you spend 20 minutes scrolling through your spreadsheet. Half the listings are stale. Your inventory is in your head, in WhatsApp messages, and in a notebook. A buyer who waits 20 minutes for matches calls the next broker instead.",
  },
  {
    title: "WhatsApp group chaos for property updates",
    body:
      "You run 14 WhatsApp groups — &ldquo;Whitefield 3BHK Premium&rdquo;, &ldquo;Sarjapur Rentals&rdquo;, &ldquo;HSR Sale Listings&rdquo;. Every new listing is a copy-paste job across all of them. Buyers in the wrong group complain. Buyers in the right group don't see your message because it scrolled past. You miss leads because the broadcast isn't tracked — you have no idea who saw what.",
  },
  {
    title: "After-hours buyer calls in Kannada and Hindi",
    body:
      "Working buyers in Bangalore make property calls between 8:30pm and 10:30pm. The bride's father calls in Kannada from Mysore asking &ldquo;ee property alli current status enu?&rdquo;. An NRI son calls at midnight from Dubai about his parents' apartment. Your phone is off after 8pm because you've been doing site visits all day. Every missed after-hours ring is a buyer who calls the next broker tomorrow.",
  },
];

const SHIP_IN_21_DAYS = [
  "Inventory-aware lead-engine website (home, search by neighbourhood, search by budget, search by BHK, ready-to-move filter, individual listing pages, contact) — listings updatable via a single Google Sheet or simple admin",
  "Form-fill alert system that pings your mobile within 60 seconds of any MagicBricks / 99acres / Housing.com / website form submission, with the buyer's brief auto-categorised by budget and area",
  "Kannada + Hindi + English AI voice agent on your enquiry number — handles &ldquo;is the 3BHK in Sarjapur available?&rdquo;, captures budget bracket and timeline, qualifies tire-kickers out, books site-visit slots",
  "WhatsApp Business API setup with auto-categorised broadcast lists by area + BHK + price band — one tap to broadcast a new listing to the right subset of your buyer database",
  "Lead qualification flow: WhatsApp 1 (instant ack), voice agent (budget, BHK, timeline, financing-ready), WhatsApp 2 (3 best-fit listings with photos), site-visit booking link. Weeds out ~70% of tire-kickers without you touching the phone.",
  "Site-visit reminder automation: 24hrs and 1hr before the slot, WhatsApp + voice reminder to both buyer and your team. Cuts no-show rate by half.",
  "Builder/developer commission tracker: every closed deal logged with commission %, due date, and reminder cadence so you actually collect what's owed",
  "Monthly dashboard: leads in by source, response-time average, site visits booked vs done, closures, commission outstanding, by-area performance",
];

const STATS = [
  {
    headline: "40%",
    label: "higher closure rate at 7-min response",
    body: "What sub-brokers see when WhatsApp + AI voice cut first-response time from hours to minutes. Speed is the moat in real estate, not inventory.",
  },
  {
    headline: "70%",
    label: "of tire-kickers weeded out",
    body: "Before your time touches the lead. WhatsApp + voice qualification on budget, BHK, timeline, and financing-readiness means you only spend time on serious buyers.",
  },
  {
    headline: "9pm calls answered",
    label: "in Kannada and Hindi",
    body: "AI voice agent picks up after-hours enquiries, captures the brief, and books a site-visit slot for the next morning. No ring goes unanswered.",
  },
];

const FAQS = [
  {
    q: "I don't want an AI to lie to buyers about availability. Will it?",
    a: "No. The voice agent is given strict scope — it can confirm whether a listing is in inventory, capture buyer requirements, book site-visit slots, and route serious enquiries to you. It cannot quote final prices, negotiate, or commit to features. If a buyer asks something outside scope, it says &ldquo;let me have [your name] call you back in 30 minutes&rdquo; and routes the call. We write the script with you in week 1 — you sign off on every conversation type before go-live.",
  },
  {
    q: "How does the inventory update work? I don't have a CRM.",
    a: "Two options. Option 1: A single Google Sheet that you (or your assistant) edit — listings, price, BHK, status, photos URL. The website and voice agent read from it live. Option 2: A simple admin panel where you can add/edit listings from your phone. Most sub-brokers pick Option 1 because they already maintain a sheet. Either way, the voice agent always speaks from the current data — no stale listings.",
  },
  {
    q: "What about the 14 WhatsApp groups I already run with buyers? Do we kill them?",
    a: "No. We migrate them into structured broadcast lists on WhatsApp Business API — same audience, but now you can tag buyers (e.g., &ldquo;3BHK / ₹1.2–1.6Cr / Whitefield-Sarjapur&rdquo;) and broadcast a new listing only to the buyers it matches. You stop spamming. They get fewer messages. The ones they get are relevant. Open rates go up. We also track which buyers opened/clicked, so you know who to call.",
  },
  {
    q: "What does it cost to run after the 21-day build?",
    a: "Starter from ₹35,000 setup + ₹9,999/month covers a solo sub-broker working 1–2 micro-markets. Growth at ₹24,999/month is for a small team with 3–5 areas, full lead qualification + site-visit automation + commission tracking. Mid-market at ₹60K+/month is for established sub-broker firms with multiple team members, channel-partner agreements, and 100+ listings under management. WhatsApp API + voice-minute charges go to your accounts directly, no markup.",
  },
];

export default function SubBrokerRealEstateBangalorePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WhatsApp + Voice Automation for Bangalore Sub-Broker Real Estate",
    description:
      "WhatsApp + Kannada/Hindi AI voice automation, lead routing, and inventory-aware website for sub-broker real estate practices in Bangalore. Live in 21 days.",
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: {
      "@type": "City",
      name: "Bangalore",
    },
    serviceType: "Sub-broker real estate lead engine and WhatsApp automation",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Sub-broker real estate practices, channel partners, and independent property consultants in Bangalore",
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
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.45) 0%, transparent 65%)" }}
        />
        <Container className="relative">
          <div className="max-w-4xl">
            <Badge>For Bangalore sub-broker real estate</Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
              Be the first broker to <span className="text-aurora">answer the buyer</span>.
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-text-secondary leading-snug max-w-3xl">
              MagicBricks lead at 11am, you see it at 5pm, deal&rsquo;s gone. We ship WhatsApp + Kannada/Hindi voice
              automation + inventory-aware website in 21 days. 7-minute response on every form fill, 70% of tire-kickers
              weeded out before they touch you, 9pm buyer calls answered.
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
              Bangalore HQ · For solo sub-brokers and small firms · Done-for-you · One contract
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
              The four leaks <span className="text-aurora">costing you closures</span>.
            </h2>
            <p className="mt-4 text-text-muted">
              Mapped from conversations with sub-brokers working Whitefield, Sarjapur, ORR, Electronic City, and HSR.
              Same problems across micro-markets.
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
              Concrete deliverables, scope locked in week 1, live by week 3. No drag, no &ldquo;phase 2&rdquo; surprises.
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
            <Badge>Real numbers for sub-broker real estate</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Speed is the <span className="text-aurora">only moat</span>.
            </h2>
          </Reveal>
          <RealNumbers
            left={{
              count: 40,
              suffix: "%",
              label: STATS[0].label,
              body: STATS[0].body,
            }}
            right={{
              count: 70,
              suffix: "%",
              label: STATS[1].label,
              body: STATS[1].body,
            }}
            recovered={{
              language: "Kannada · Hindi",
              greeting: "ನಮಸ್ಕಾರ, ಯಾವ ಏರಿಯಾ ಬೇಕು?",
              subtitle: "“Hello, which area are you looking in?” — buyer captured at 9:30pm.",
              lostRange: "Hot leads die in 6 hours unanswered",
              recovered: 350000,
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
              Not a generic <span className="text-aurora">CRM upsell</span>.
            </h2>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">01</div>
              <h3 className="mt-4 text-white font-bold">Bangalore HQ, micro-market literate</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                We understand a Whitefield 3BHK is not a Sarjapur 3BHK. The scripts, broadcast lists, and lead routing
                reflect that — by area, by builder, by BHK band.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">02</div>
              <h3 className="mt-4 text-white font-bold">Kannada + Hindi voice, real conversations</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                Tuned to handle a buyer asking &ldquo;ee 3BHK alli current price enu&rdquo; at 9:30pm. Not a Twilio
                voicebot reading a script.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-indigo-glow text-3xl font-black font-mono">03</div>
              <h3 className="mt-4 text-white font-bold">Done-for-you vs SaaS exhaustion</h3>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                You won&rsquo;t buy Sell.do + WATI + Zapier + Calendly. One contract. We build, host, monitor. Your
                monthly tool bill <em>drops</em>.
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
                  Solo sub-broker, 1–2 micro-markets. Voice agent + WhatsApp + basic qualification.
                </p>
              </div>
              <div className="rounded-2xl border border-indigo/40 p-6 bg-indigo/5 pulse-glow">
                <div className="text-indigo-glow text-xs uppercase tracking-widest font-mono">Growth</div>
                <div className="mt-3 text-2xl font-bold text-white">
                  <CountUp value={24999} prefix="₹" className="tabular-nums" />/mo
                </div>
                <p className="mt-4 text-sm text-text-muted">
                  Small team, 3–5 areas. Full qualification + site-visit automation + commission tracking.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 p-6">
                <div className="text-text-muted text-xs uppercase tracking-widest font-mono">Mid-market</div>
                <div className="mt-3 text-2xl font-bold text-white">
                  <CountUp value={60} prefix="₹" suffix="K+" className="tabular-nums" />/mo
                </div>
                <p className="mt-4 text-sm text-text-muted">
                  Established firm, 100+ listings, channel-partner workflow, dedicated success manager.
                </p>
              </div>
            </div>
            <p className="mt-6 text-xs text-text-muted">
              WhatsApp API + voice-minute usage billed at platform rates direct to your accounts. First measurable
              result in 21 days, or full refund.
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
              Questions sub-brokers ask us first.
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
              Answer the buyer <span className="text-aurora">before the next broker does</span>.
            </h2>
            <p className="mt-6 text-text-secondary max-w-2xl mx-auto">
              21-day build. Bangalore HQ. Real Kannada and Hindi on the voice agent. Start the conversation in any
              language.
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
