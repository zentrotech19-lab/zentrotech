import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DsoImpactCalculator } from "@/components/tools/dso-impact-calculator";
import { JsonLd } from "@/components/seo/json-ld";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { buildMetadata } from "@/lib/seo";
import { SITE, SOCIAL } from "@/lib/constants";
import { Calculator, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export const metadata = buildMetadata({
  title: "DSO impact calculator — slow-payment cost (India)",
  description:
    "How much working capital is stuck in unpaid invoices? See annual carry cost + savings from a 30% DSO cut. Built for Indian SMBs.",
  path: "/tools/dso-impact-calculator",
});

const FAQS = [
  {
    q: "What is DSO, and why does it matter?",
    a: "DSO — Days Sales Outstanding — is the average number of days an invoice sits unpaid after you issue it. If your DSO is 60 days and you invoice ₹10 lakh/month, you've effectively lent your customers ₹20 lakh of working capital — interest-free. That money could be funding inventory, payroll, or growth. Every day of DSO costs you roughly 0.033% of stuck capital (at 12% annual cost of capital).",
  },
  {
    q: "How does WhatsApp + voice + payment-link automation cut DSO?",
    a: "Indian buyers don't pay because of three blockers: they forgot, they can't find the invoice, or the payment friction is too high. We solve all three: WhatsApp reminders land in the inbox they actually read; one tap opens the invoice + UPI payment link; AI voice calls take over for non-responders by day 14. Most invoices that would have aged to 60+ days clear in 25-35 instead.",
  },
  {
    q: "Is the 30% DSO reduction realistic?",
    a: "It's our floor, not our ceiling. Razorpay's own product data shows 15-20% recovery from automated retry alone. Our pilots — WhatsApp + payment links + AI voice — hit 30-50%. We underwrite to 30% in proposals; clients who hit 40%+ get the better number. We don't bill for outcomes we can't measure.",
  },
];

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "DSO Impact Calculator — Payment Recovery Savings (India)",
  description:
    "Calculate the cost of slow payment for your business: stuck capital, annual carry cost, and savings from a 30% DSO reduction.",
  url: `${SITE.url}/tools/dso-impact-calculator`,
  inLanguage: "en-IN",
  isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
};

export default function DsoImpactCalculatorPage() {
  return (
    <>
      <OrganizationSchema />
      <JsonLd data={webPageLd} />

      {/* HERO */}
      <section className="relative overflow-hidden pt-12 pb-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-15%] top-[-10%] size-[700px] rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 65%)",
          }}
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <Badge>
              <Calculator className="size-3" />
              <span>Free tool · 60-second answer</span>
            </Badge>
            <h1 className="mt-6 text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.02]">
              How much does slow payment{" "}
              <span className="text-aurora">cost your business?</span>
            </h1>
            <p className="mt-6 text-text-secondary text-lg md:text-xl leading-relaxed">
              Most Indian SMBs are sitting on ₹2–20 lakh of stuck capital they
              don&apos;t see. Razorpay&apos;s own data: automated retry
              recovers 15–20%. Done-for-you recovery cuts DSO 30–50%.
            </p>
            <p className="mt-4 text-text-muted text-sm md:text-base leading-relaxed max-w-2xl">
              Days Sales Outstanding (DSO) measures how long money sits
              unpaid. Every extra day costs you interest and reinvestment
              opportunity. WhatsApp reminders + UPI payment links + AI
              voice follow-ups are not a brochure pitch — they&apos;re the
              three highest-conversion recovery channels for the Indian
              market, in that order.
            </p>
          </div>
        </Container>
      </section>

      {/* CALCULATOR */}
      <section className="pb-20">
        <Container>
          <DsoImpactCalculator />
        </Container>
      </section>

      {/* FAQS */}
      <section className="py-16 border-t border-white/5">
        <Container>
          <div className="max-w-3xl">
            <Badge>FAQ</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-white tracking-tight">
              Before you ask us for the audit.
            </h2>
            <div className="mt-10 space-y-6">
              {FAQS.map((f) => (
                <div
                  key={f.q}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-white font-bold">{f.q}</h3>
                  <p className="mt-2 text-text-muted text-sm leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <div className="rounded-3xl glass-glow p-10 md:p-14 text-center">
            <Badge>
              <Sparkles className="size-3" />
              <span>Free 15-min DSO audit</span>
            </Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              DM us <span className="text-aurora">&quot;RECOVERY&quot;</span>{" "}
              on WhatsApp
            </h2>
            <p className="mt-6 text-text-muted text-lg max-w-2xl mx-auto">
              15 minutes. We&apos;ll look at your invoice ageing, recommend
              which 3 changes cut DSO fastest, and tell you honestly whether
              done-for-you recovery makes sense — or if you can DIY it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button
                href={`${SOCIAL.whatsapp.split("?")[0]}?text=RECOVERY`}
                size="lg"
                external
              >
                <FaWhatsapp className="size-5" />
                WhatsApp &quot;RECOVERY&quot;
              </Button>
              <Button href="/contact" size="lg" variant="secondary">
                Book the audit
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
