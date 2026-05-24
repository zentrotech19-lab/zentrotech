import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServicesBento } from "@/components/sections/services-bento";
import { CTASection } from "@/components/sections/cta-section";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, Sparkles, Target, FileSearch, Cpu } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { SOCIAL } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Services — Kannada AI Voice + WhatsApp + Lead Engines for Bangalore SMBs",
  description:
    "Ten done-for-you services from ZentroTECH for Indian SMBs: AI voice agents in 11 Indian languages, WhatsApp Business automation, lead-engine websites, payment recovery, lead nurture, SEO, CRM, apps, audits. One contract, one team, 21-day delivery.",
  path: "/services",
});

const PATHS = [
  {
    icon: Target,
    title: "I'm starting from scratch",
    body: "No website yet, or one that should be replaced. You want the full lead engine built fresh.",
    primary: { label: "Lead Engine Websites", href: "/services/lead-generation-websites" },
    secondary: ["seo-services-bangalore", "lead-followup-automation"],
  },
  {
    icon: FileSearch,
    title: "I have a website, but leads are flat",
    body: "The site looks fine but it's not converting or ranking. You want a fix, not a rebuild.",
    primary: { label: "Website Audit + Lead Boost", href: "/services/website-audit-and-seo-fix" },
    secondary: ["seo-services-bangalore", "lead-management-crm"],
  },
  {
    icon: Cpu,
    title: "Leads are fine — I'm drowning in operations",
    body: "Sales follow-up, payment recovery, scheduling, social, admin — you need the routine 60% automated.",
    primary: { label: "Business on Autopilot", href: "/services/business-on-autopilot" },
    secondary: ["lead-followup-automation", "payment-recovery-automation"],
  },
];

const STACK_HIGHLIGHTS = [
  { title: "One contract", body: "Replace 5–6 SaaS subscriptions with a single agreement and a single monthly bill." },
  { title: "One team", body: "Same engineers across web, AI, automation, and Android. Fewer handoffs, faster launches." },
  { title: "No SaaS bloat", body: "Self-hosted n8n, Zoho, WhatsApp Business API. You own the infrastructure, not lease it." },
  { title: "Outcome-tied reporting", body: "We report on leads + payments recovered. Not vanity traffic." },
];

export default function ServicesPage() {
  return (
    <>
      <OrganizationSchema />
      {/* HERO */}
      <section className="relative overflow-hidden pt-12 pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-[-10%] size-[700px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 65%)" }}
        />
        <Container className="relative">
          <div className="max-w-4xl">
            <Badge>
              <Sparkles className="size-3" />
              <span>Ten services · One contract</span>
            </Badge>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.98]">
              Pick what you need. <br />
              <span className="text-aurora">Stack what makes sense.</span>
            </h1>
            <p className="mt-8 text-text-secondary text-lg md:text-xl max-w-2xl leading-relaxed">
              We sell ten services to Indian SMBs — but one client rarely needs all ten. Tell us what's broken and we'll bundle the smallest set that fixes it. We replace 5–6 SaaS subscriptions with one team and one monthly bill.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={SOCIAL.whatsapp} size="lg" external>
                <FaWhatsapp className="size-5" />
                WhatsApp us
              </Button>
              <Button href="/contact" size="lg" variant="secondary">
                Get a Custom Quote <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* PATH PICKER */}
      <section className="py-20" id="pick-your-path">
        <Container>
          <div className="max-w-3xl">
            <Badge>Not sure where to start?</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
              Three paths most clients take.
            </h2>
            <p className="mt-5 text-text-secondary text-lg">
              We don't sell ten services to one buyer. We sell the right two or three for what's actually broken. Pick the path that sounds like you.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {PATHS.map((p) => (
              <div key={p.title} className="glass rounded-2xl p-8 flex flex-col">
                <div className="size-12 rounded-xl bg-indigo/15 text-indigo-glow flex items-center justify-center">
                  <p.icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-white font-bold text-xl">{p.title}</h3>
                <p className="mt-3 text-text-muted text-sm leading-relaxed">{p.body}</p>
                <div className="mt-auto pt-8 space-y-2">
                  <Link
                    href={p.primary.href}
                    className="flex items-center justify-between rounded-xl bg-indigo/15 border border-indigo/30 px-4 py-3 text-white font-medium text-sm hover:bg-indigo/25 transition-colors"
                  >
                    <span>{p.primary.label}</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <p className="text-text-muted text-xs">
                    Often paired with{" "}
                    {p.secondary.map((s, i) => (
                      <span key={s}>
                        <Link href={`/services/${s}`} className="text-indigo-glow hover:text-white">
                          {s.replace(/-/g, " ")}
                        </Link>
                        {i < p.secondary.length - 1 ? " + " : ""}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FULL SERVICES GRID */}
      <ServicesBento />

      {/* STACK / BUNDLE PITCH */}
      <section className="py-24">
        <Container>
          <div className="rounded-3xl glass-glow p-12 md:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <Badge>Why one contract beats six</Badge>
                <h2 className="mt-4 text-3xl md:text-5xl font-black text-white tracking-tight">
                  Stop stitching SaaS. <span className="text-aurora">Start shipping outcomes.</span>
                </h2>
                <p className="mt-6 text-text-muted text-lg leading-relaxed">
                  Most agencies happily set you up with HubSpot + Zapier + Calendly + Twilio + ClickFunnels and walk away. Your monthly tool bill grows from ₹5K to ₹50K and you still don't have leads. We do it differently.
                </p>
              </div>
              <ul className="space-y-5">
                {STACK_HIGHLIGHTS.map((s) => (
                  <li key={s.title} className="border-l-2 border-indigo/40 pl-5">
                    <h3 className="text-white font-bold">{s.title}</h3>
                    <p className="mt-1 text-text-muted text-sm leading-relaxed">{s.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
