import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { AuditForm } from "./audit-form";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/reveal";
import { Tilt } from "@/components/animations/tilt";
import { CountUp } from "@/components/animations/count-up";
import { DrawLine } from "@/components/animations/draw-line";
import { buildMetadata } from "@/lib/seo";
import { auditWaLink } from "@/lib/whatsapp";
import { SITE } from "@/lib/constants";
import { PhoneMissed, MessageSquareDashed, IndianRupee, Clock4, ShieldCheck, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export const metadata: Metadata = buildMetadata({
  title: "Free lead-flow audit for Bangalore SMBs — find where your leads leak",
  description:
    "Free 20-minute lead-flow audit for Bangalore businesses. We map exactly where your calls, WhatsApp enquiries, and quotes are leaking — and the first 3 fixes. Kannada + English. No pitch, no obligation.",
  path: "/audit",
});

const WA_HREF = auditWaLink({ source: "audit_page_hero" });

const LEAKS = [
  {
    icon: PhoneMissed,
    title: "After-hours & missed calls",
    body: "Bangalore SMBs get 23–40% of enquiry calls outside desk hours or while the line is busy. Each missed call to a local-intent buyer is ₹5,000–₹40,000 walking to the next listing on Google.",
  },
  {
    icon: MessageSquareDashed,
    title: "Enquiries with no follow-up",
    body: "An Indian SMB closes after 5–7 touches. Most owners stop at 1. The WhatsApp 'I'll get back to you' that never gets a second message is the single biggest silent leak we find.",
  },
  {
    icon: IndianRupee,
    title: "Quotes & invoices that ghost",
    body: "Quotes go out, then silence. Invoices age past 60 days. A polite, automated 5–7 touch nurture inside 72 hours recovers a chunk of both — one Jayanagar clinic clawed back 30–50% of unpaid invoices this way.",
  },
];

const WHAT_YOU_GET = [
  "A 1-page map of where your leads actually leak — calls, WhatsApp, website, quotes, reviews",
  "Your Google Business Profile checked against the 3 things that move Bangalore map rankings",
  "A look at whether the 'Zentro Tech' / lookalike brand-name confusion is splitting your search traffic",
  "The 3 highest-ROI fixes to do first — ranked by ₹ recovered, not by what we sell",
  "A realistic 'leads you're probably losing per month' number, in ₹, for your vertical",
  "Sent to you on WhatsApp in plain English (or Kannada) — no 40-slide deck",
];

const STEPS = [
  { n: "01", t: "You book it (60 sec)", d: "Fill the short form below or WhatsApp us. Name, business, where you think leads leak. That's it." },
  { n: "02", t: "We pre-audit (we do the work)", d: "We look at your Google listing, website, and missed-call pattern before we even call — so the audit is specific, not generic." },
  { n: "03", t: "20-min audit call + map", d: "On WhatsApp call or in person if you're near Koramangala. You walk away with the leak map + 3 fixes whether or not you hire us." },
];

const FAQS = [
  {
    q: "Is the audit actually free, or is it a sales call in disguise?",
    a: "Actually free. You keep the leak map and the 3 fixes whether you hire us or not — plenty of owners action them themselves. We do this because the fastest way to earn a Bangalore SMB's trust is to be useful first. If after the audit you want us to fix the leaks for you, we'll quote. If not, no follow-up pressure.",
  },
  {
    q: "What do you need from me to run it?",
    a: "Five minutes and your honest answers: your business type, your website or Google listing, and where you think you're losing leads. The more you share (a screenshot of your missed calls, your current WhatsApp auto-reply), the sharper the audit. We reply on WhatsApp.",
  },
  {
    q: "Do you do this in Kannada?",
    a: "Yes. We're a Kannada-first agency in Bangalore. Start the conversation in Kannada, Hindi, or English — we'll match you. Our whole pitch is that your customers shouldn't have to switch to English to do business with you, and neither should you.",
  },
  {
    q: "I already have a website and a Google listing. Will the audit still help?",
    a: "Almost always yes — that's exactly who we help most. Having a website isn't the problem; having one that captures and follows up on leads is. We routinely find a decent-looking site leaking 20–40% of its enquiries because there's no follow-up layer, no WhatsApp capture, or an incomplete Google profile. We'll show you, specifically, where.",
  },
  {
    q: "How is ZentroTECH different from the other 'Zentro Tech' firms?",
    a: "There are a couple of similarly-named firms (a Dubai web-design shop, one in Thiruvarur) — we're ZentroTECH, the Kannada-first AI + lead-engine agency headquartered in Koramangala, Bangalore, serving 138 cities across South India. If you found us by name and weren't sure, this is us: zentrotech.in.",
  },
];

const auditServiceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Free Lead-Flow Audit for Bangalore SMBs",
  serviceType: "Lead generation and conversion audit",
  description:
    "A free audit that maps where a Bangalore SMB's leads leak — missed calls, un-followed-up enquiries, weak Google Business Profile, ghosted quotes — and the top 3 fixes ranked by revenue recovered.",
  provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  areaServed: { "@type": "City", name: "Bangalore" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR", description: "Free, no-obligation lead-flow audit" },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Small and medium business owners in Bangalore — clinics, salons, real estate, repair, fitness, professional services",
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AuditPage() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema city="Bangalore" />
      <JsonLd data={auditServiceLd} />
      <JsonLd data={faqLd} />

      {/* HERO + FORM */}
      <section className="relative overflow-hidden pt-12 pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-[-10%] size-[700px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)" }}
        />
        <Container className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge>
                <MapPin className="size-3" /> Free · Bangalore SMBs
              </Badge>
              <h1 className="mt-5 text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
                Find out exactly where your <span className="text-aurora">leads are leaking</span>.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-text-secondary leading-snug">
                A free 20-minute lead-flow audit for Bangalore business owners. We map every place a call, WhatsApp
                enquiry, or quote slips through — and hand you the first 3 fixes, ranked by ₹ recovered. Kannada or
                English. No pitch. No obligation.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  "See your missed-lead number in ₹, for your vertical",
                  "Get the top 3 fixes — even if you never hire us",
                  "We reply fast on WhatsApp, not a 10-email drip",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-text-secondary">
                    <ShieldCheck className="size-5 text-aurora mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={WA_HREF} size="lg" external>
                  <FaWhatsapp className="size-5" />
                  WhatsApp us instead
                </Button>
                <span className="inline-flex items-center gap-2 text-text-muted text-sm">
                  <Clock4 className="size-4" aria-hidden="true" /> ~15 min reply in working hours
                </span>
              </div>
              <p className="mt-6 text-sm text-text-muted">
                Bangalore HQ (Koramangala) · Serving 138 cities · Kannada-first · {SITE.phone}
              </p>
            </div>

            {/* Form — the /audit destination every play points to */}
            <div id="book" className="lg:sticky lg:top-24">
              <p className="mb-3 text-center text-xs uppercase tracking-widest text-indigo-glow font-mono">
                Book your free audit · 60 seconds
              </p>
              <AuditForm />
            </div>
          </div>
        </Container>
      </section>

      {/* THE LEAKS */}
      <section className="py-16">
        <Container>
          <div className="max-w-2xl">
            <Badge>What we look for</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Three leaks drain almost every <span className="text-aurora">Bangalore SMB</span>.
            </h2>
            <p className="mt-4 text-text-muted">
              We&rsquo;ve mapped these talking to owners in Koramangala, Jayanagar, Indiranagar, and HSR. None of them
              are theoretical. The audit tells you which ones are costing you the most.
            </p>
          </div>
          <Stagger className="mt-10 grid md:grid-cols-3 gap-5">
            {LEAKS.map((l) => (
              <StaggerItem key={l.title}>
                <Tilt className="glass rounded-2xl p-6 h-full">
                  <l.icon className="size-6 text-indigo-glow" aria-hidden="true" />
                  <h3 className="mt-4 text-white font-bold text-lg">{l.title}</h3>
                  <p className="mt-3 text-text-secondary text-sm leading-relaxed">{l.body}</p>
                </Tilt>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge>What you walk away with</Badge>
              <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
                A real map. <span className="text-aurora">Not a sales deck.</span>
              </h2>
              <p className="mt-4 text-text-muted">
                You keep everything below whether you hire us or not. Plenty of owners action the fixes themselves —
                that&rsquo;s fine by us.
              </p>
              <div className="mt-8">
                <Button href="#book" size="lg">Book my free audit</Button>
              </div>
            </div>
            <Stagger className="space-y-3">
              {WHAT_YOU_GET.map((w, i) => (
                <StaggerItem key={w} className="flex gap-3 glass rounded-xl p-4">
                  <span className="text-indigo-glow font-mono font-bold shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-text-secondary text-sm leading-relaxed">{w}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16">
        <Container>
          <div className="max-w-2xl">
            <Badge>How it works</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              From booking to <span className="text-aurora">your leak map</span> in 3 steps.
            </h2>
          </div>
          <div className="relative mt-10 grid md:grid-cols-3 gap-5">
            {/* 01 → 02 → 03 connector — draws across as you scroll (desktop only). */}
            <DrawLine orientation="horizontal" className="hidden md:block left-[16%] right-[16%] top-12" />
            {STEPS.map((s) => (
              <div key={s.n} className="glass rounded-2xl p-6 relative">
                <div className="text-indigo-glow text-3xl font-black font-mono">{s.n}</div>
                <h3 className="mt-4 text-white font-bold">{s.t}</h3>
                <p className="mt-3 text-text-secondary text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PROOF STRIP */}
      <section className="py-16">
        <Container>
          <Reveal className="glass-glow rounded-3xl p-8 md:p-12 max-w-4xl mx-auto text-center">
            <IndianRupee className="size-8 text-aurora mx-auto" aria-hidden="true" />
            <p className="mt-5 text-5xl md:text-6xl font-black tracking-tight text-aurora">
              <CountUp value={45} suffix="%" className="tabular-nums inline-block min-w-[4ch]" />
            </p>
            <p className="mt-2 text-text-muted text-sm uppercase tracking-widest font-mono">
              of unpaid invoices clawed back (30–50% range)
            </p>
            <p className="mt-6 text-2xl md:text-3xl text-white leading-relaxed">
              &ldquo;A Jayanagar clinic recovered <span className="text-aurora">30–50% of unpaid invoices</span> once
              the follow-up ran automatically — the exact kind of leak the audit surfaces in the first 20 minutes.&rdquo;
            </p>
            <p className="mt-6 text-text-muted text-sm">
              Real outcome from the ZentroTECH follow-up + recovery engine. Your numbers depend on your vertical — the
              audit gives you yours.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <Container>
          <div className="max-w-2xl">
            <Badge>FAQ</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Fair questions before you book.
            </h2>
          </div>
          <Reveal className="mt-10 grid md:grid-cols-2 gap-5">
            {FAQS.map((f) => (
              <div key={f.q} className="glass rounded-2xl p-6">
                <h3 className="text-white font-bold">{f.q}</h3>
                <p className="mt-3 text-text-secondary text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-20">
        <Container>
          <Reveal className="glass-glow rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto">
            <Badge>Free · No obligation</Badge>
            <h2 className="mt-6 text-3xl md:text-5xl font-black text-white tracking-tight">
              Stop guessing where your <span className="text-aurora">leads go to die</span>.
            </h2>
            <p className="mt-6 text-text-secondary max-w-2xl mx-auto">
              20 minutes. A clear map. The 3 fixes that matter most. Start in Kannada, Hindi, or English — we&rsquo;ll
              reply the same way, fast.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Button href="#book" size="lg">Book my free audit</Button>
              <Button href={auditWaLink({ source: "audit_page_footer" })} variant="secondary" size="lg" external>
                <FaWhatsapp className="size-5" />
                WhatsApp ZentroTECH
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
