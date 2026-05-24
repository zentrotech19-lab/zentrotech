"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE, SOCIAL, SOUTH_INDIA_CITIES } from "@/lib/constants";
import { FaWhatsapp } from "react-icons/fa6";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";

const NEEDS_OPTIONS = [
  { value: "new-website", label: "New website" },
  { value: "redesign-website", label: "Redesign existing website" },
  { value: "animated-3d-website", label: "Animated / 3D website" },
  { value: "android-app", label: "Android app" },
  { value: "ai-chatbot", label: "AI chatbot for website / WhatsApp" },
  { value: "ai-voice-agent", label: "AI voice agent (inbound / outbound)" },
  { value: "lead-followup", label: "Lead follow-up automation" },
  { value: "payment-recovery", label: "Payment recovery automation" },
  { value: "seo-services", label: "SEO services" },
  { value: "crm-setup", label: "CRM + lead management setup" },
  { value: "workflow-automation", label: "Business workflow automation" },
  { value: "other", label: "Something else" },
] as const;

const INDUSTRIES = [
  "Healthcare / Clinic",
  "Real Estate",
  "D2C / E-commerce",
  "Restaurant / F&B",
  "Salon / Spa",
  "Coaching / Education",
  "Professional Services (CA / Legal / Architect)",
  "Manufacturing / B2B",
  "IT / SaaS",
  "Hospitality / Travel",
  "Other",
] as const;

const BUSINESS_SIZES = ["Solo", "1-5", "6-25", "26-100", "100+"] as const;
const YEARS = ["Less than 1", "1-3", "3-5", "5-10", "10+"] as const;
const PRIMARY_GOALS = [
  "More leads from my website",
  "Save founder / team time on operations",
  "Recover unpaid invoices",
  "Launch a new business online",
  "Replace expensive SaaS subscriptions",
  "Beat my competition on Google",
  "Other",
] as const;
const MONTHLY_LEADS = ["0-10", "10-50", "50-200", "200-1000", "1000+", "Don't know"] as const;
const INVESTMENT = [
  "Under ₹1 lakh",
  "₹1-3 lakh",
  "₹3-10 lakh",
  "₹10 lakh+",
  "Want to discuss",
] as const;
const TIMELINES = [
  "Immediately",
  "Within 1 month",
  "1-3 months",
  "3-6 months",
  "Just exploring",
] as const;
const SOURCES = ["Google Search", "WhatsApp", "Referral", "LinkedIn", "Instagram", "Other"] as const;

const RequirementsSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  businessName: z.string().min(2, "Please enter your business name").max(160),
  whatsapp: z.string().min(10, "WhatsApp number must be at least 10 digits").max(20),
  phone: z.string().max(20).optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email"),
  city: z.string().min(2, "Please pick a city").max(60),
  industry: z.string().min(2, "Please pick your industry").max(80),
  businessSize: z.enum(BUSINESS_SIZES, { message: "Please pick business size" }),
  yearsInBusiness: z.enum(YEARS, { message: "Please pick how long you've been in business" }),
  currentWebsite: z.string().max(200).optional().or(z.literal("")),
  needs: z.array(z.string()).min(1, "Pick at least one service you need"),
  needsOther: z.string().max(200).optional().or(z.literal("")),
  primaryGoal: z.enum(PRIMARY_GOALS, { message: "Please pick a primary goal" }),
  monthlyLeads: z.enum(MONTHLY_LEADS, { message: "Please pick your current lead volume" }),
  investmentRange: z.enum(INVESTMENT, { message: "Please pick an investment range" }),
  timeline: z.enum(TIMELINES, { message: "Please pick a timeline" }),
  description: z
    .string()
    .min(30, "Tell us a bit more (at least 30 characters)")
    .max(5000),
  source: z.string().max(60).optional().or(z.literal("")),
  additionalNotes: z.string().max(2000).optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "Please agree to be contacted" }),
});

type RequirementsValues = z.infer<typeof RequirementsSchema>;

const inputClass =
  "mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void";

const labelClass = "block text-sm text-text-secondary";

const errorClass = "mt-2 text-sm text-pink-pulse";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RequirementsValues>({
    resolver: zodResolver(RequirementsSchema),
    defaultValues: {
      name: "",
      businessName: "",
      whatsapp: "",
      phone: "",
      email: "",
      city: "",
      industry: "",
      currentWebsite: "",
      needs: [],
      needsOther: "",
      description: "",
      source: "",
      additionalNotes: "",
      consent: false,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("sending");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `Request failed with ${res.status}`);
      }
      setStatus("sent");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  });

  const sending = status === "sending" || isSubmitting;

  if (status === "sent") {
    return (
      <section className="py-24">
        <Container>
          <div className="max-w-xl mx-auto text-center glass-glow rounded-3xl p-12">
            <CheckCircle2 className="size-16 text-indigo-glow mx-auto" aria-hidden="true" />
            <h1 className="mt-6 text-4xl font-black text-white tracking-tight">
              Got it. We're on it.
            </h1>
            <p className="mt-4 text-text-secondary">
              Your requirements are with our team. We'll WhatsApp you within 1 business day with a custom quote and next steps.
            </p>
            <p className="mt-2 text-text-muted text-sm">
              In a hurry? Ping us directly on WhatsApp.
            </p>
            <div className="mt-8">
              <Button href={SOCIAL.whatsapp} size="lg" external>
                <FaWhatsapp className="size-5" />
                Open WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <LocalBusinessSchema city="Bangalore" />

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Badge>Get a Custom Quote</Badge>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-white tracking-tight">
              Tell us what you need. <span className="text-aurora">We'll quote in 1 business day.</span>
            </h1>
            <p className="mt-6 text-text-secondary text-lg">
              Pricing varies by scope, integrations, and ongoing automation. Fill this out — it takes 4 minutes — and we send a custom proposal with timeline and exact ₹ figures. No obligation.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid lg:grid-cols-5 gap-8">
            <form
              onSubmit={onSubmit}
              noValidate
              className="lg:col-span-3 glass-glow rounded-3xl p-8 md:p-10 space-y-10"
            >
              {/* Section A — Contact */}
              <fieldset className="space-y-6">
                <legend className="text-xs uppercase tracking-widest text-indigo-glow font-mono">A · Contact</legend>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className={labelClass}>
                    Your full name *
                    <input {...register("name")} className={inputClass} placeholder="Ramesh Kumar" />
                    {errors.name && <p className={errorClass} role="alert">{errors.name.message}</p>}
                  </label>
                  <label className={labelClass}>
                    Business name *
                    <input {...register("businessName")} className={inputClass} placeholder="Kumar & Sons" />
                    {errors.businessName && <p className={errorClass} role="alert">{errors.businessName.message}</p>}
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className={labelClass}>
                    WhatsApp number *
                    <input {...register("whatsapp")} className={inputClass} placeholder="+91 98765 43210" />
                    {errors.whatsapp && <p className={errorClass} role="alert">{errors.whatsapp.message}</p>}
                  </label>
                  <label className={labelClass}>
                    Alternate phone (optional)
                    <input {...register("phone")} className={inputClass} placeholder="+91 80 1234 5678" />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className={labelClass}>
                    Email *
                    <input {...register("email")} type="email" className={inputClass} placeholder="ramesh@business.com" />
                    {errors.email && <p className={errorClass} role="alert">{errors.email.message}</p>}
                  </label>
                  <label className={labelClass}>
                    City *
                    <select {...register("city")} className={inputClass}>
                      <option value="">Select your city…</option>
                      {SOUTH_INDIA_CITIES.map((c) => (
                        <option key={c.slug} value={c.label}>{c.label}</option>
                      ))}
                      <option value="Other Indian city">Other Indian city</option>
                      <option value="International">International</option>
                    </select>
                    {errors.city && <p className={errorClass} role="alert">{errors.city.message}</p>}
                  </label>
                </div>
              </fieldset>

              {/* Section B — Business */}
              <fieldset className="space-y-6">
                <legend className="text-xs uppercase tracking-widest text-indigo-glow font-mono">B · Your business</legend>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className={labelClass}>
                    Industry *
                    <select {...register("industry")} className={inputClass}>
                      <option value="">Select an industry…</option>
                      {INDUSTRIES.map((i) => (<option key={i} value={i}>{i}</option>))}
                    </select>
                    {errors.industry && <p className={errorClass} role="alert">{errors.industry.message}</p>}
                  </label>
                  <label className={labelClass}>
                    Business size *
                    <select {...register("businessSize")} className={inputClass}>
                      <option value="">Select team size…</option>
                      {BUSINESS_SIZES.map((b) => (<option key={b} value={b}>{b} people</option>))}
                    </select>
                    {errors.businessSize && <p className={errorClass} role="alert">{errors.businessSize.message}</p>}
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className={labelClass}>
                    Years in business *
                    <select {...register("yearsInBusiness")} className={inputClass}>
                      <option value="">Select…</option>
                      {YEARS.map((y) => (<option key={y} value={y}>{y} years</option>))}
                    </select>
                    {errors.yearsInBusiness && <p className={errorClass} role="alert">{errors.yearsInBusiness.message}</p>}
                  </label>
                  <label className={labelClass}>
                    Current website (optional)
                    <input {...register("currentWebsite")} className={inputClass} placeholder="https://yoursite.com" />
                  </label>
                </div>
              </fieldset>

              {/* Section C — What you need */}
              <fieldset className="space-y-4">
                <legend className="text-xs uppercase tracking-widest text-indigo-glow font-mono">C · What you need *</legend>
                <p className="text-text-muted text-sm">Tick everything that applies — we don't charge per item, we bundle.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {NEEDS_OPTIONS.map((n) => (
                    <label key={n.value} className="flex items-start gap-3 cursor-pointer rounded-xl border border-white/10 bg-white/5 p-3 hover:border-indigo/40 transition-colors">
                      <input
                        type="checkbox"
                        value={n.value}
                        {...register("needs")}
                        className="mt-1 size-4 rounded accent-indigo"
                      />
                      <span className="text-sm text-white">{n.label}</span>
                    </label>
                  ))}
                </div>
                {errors.needs && <p className={errorClass} role="alert">{errors.needs.message as string}</p>}

                <label className={labelClass}>
                  If "Something else", describe briefly
                  <input {...register("needsOther")} className={inputClass} placeholder="e.g. iOS app, custom dashboard…" />
                </label>
              </fieldset>

              {/* Section D — Goals */}
              <fieldset className="space-y-6">
                <legend className="text-xs uppercase tracking-widest text-indigo-glow font-mono">D · Goals & timeline</legend>

                <label className={labelClass}>
                  Primary goal *
                  <select {...register("primaryGoal")} className={inputClass}>
                    <option value="">What matters most?</option>
                    {PRIMARY_GOALS.map((g) => (<option key={g} value={g}>{g}</option>))}
                  </select>
                  {errors.primaryGoal && <p className={errorClass} role="alert">{errors.primaryGoal.message}</p>}
                </label>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className={labelClass}>
                    Current monthly leads *
                    <select {...register("monthlyLeads")} className={inputClass}>
                      <option value="">Approx range</option>
                      {MONTHLY_LEADS.map((m) => (<option key={m} value={m}>{m} per month</option>))}
                    </select>
                    {errors.monthlyLeads && <p className={errorClass} role="alert">{errors.monthlyLeads.message}</p>}
                  </label>
                  <label className={labelClass}>
                    Investment range comfortable for you *
                    <select {...register("investmentRange")} className={inputClass}>
                      <option value="">Pick a range</option>
                      {INVESTMENT.map((i) => (<option key={i} value={i}>{i}</option>))}
                    </select>
                    {errors.investmentRange && <p className={errorClass} role="alert">{errors.investmentRange.message}</p>}
                  </label>
                </div>

                <label className={labelClass}>
                  When do you want to start? *
                  <select {...register("timeline")} className={inputClass}>
                    <option value="">Pick a timeline</option>
                    {TIMELINES.map((t) => (<option key={t} value={t}>{t}</option>))}
                  </select>
                  {errors.timeline && <p className={errorClass} role="alert">{errors.timeline.message}</p>}
                </label>
              </fieldset>

              {/* Section E — Description */}
              <fieldset className="space-y-6">
                <legend className="text-xs uppercase tracking-widest text-indigo-glow font-mono">E · Tell us more</legend>

                <label className={labelClass}>
                  Briefly describe what you want to achieve *
                  <textarea
                    {...register("description")}
                    rows={5}
                    className={inputClass}
                    placeholder="What's the business problem you want solved? What does success look like in 6 months?"
                  />
                  {errors.description && <p className={errorClass} role="alert">{errors.description.message}</p>}
                </label>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className={labelClass}>
                    How did you find us?
                    <select {...register("source")} className={inputClass}>
                      <option value="">Optional</option>
                      {SOURCES.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                  </label>
                  <label className={labelClass}>
                    Anything else? (optional)
                    <input {...register("additionalNotes")} className={inputClass} placeholder="Any context we should know" />
                  </label>
                </div>
              </fieldset>

              {/* Consent */}
              <fieldset>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" {...register("consent")} className="mt-1 size-4 rounded accent-indigo" />
                  <span className="text-sm text-text-secondary">
                    I agree to be contacted by ZentroTECH via WhatsApp, phone, or email regarding my enquiry. *
                  </span>
                </label>
                {errors.consent && <p className={errorClass} role="alert">{errors.consent.message}</p>}
              </fieldset>

              <Button type="submit" size="lg" className="w-full" disabled={sending}>
                {sending ? "Sending…" : "Send my requirements"}
                <Send aria-hidden="true" className="size-4" />
              </Button>

              <p
                role="alert"
                aria-live="assertive"
                className={`text-pink-pulse text-sm ${status === "error" ? "" : "sr-only"}`}
              >
                {status === "error"
                  ? errorMessage ?? "Something went wrong. Please try again or WhatsApp us directly."
                  : ""}
              </p>
            </form>

            <aside className="lg:col-span-2 space-y-5">
              <div className="glass rounded-2xl p-6">
                <p className="text-text-muted text-xs uppercase tracking-widest font-mono">Faster than form</p>
                <p className="text-white font-semibold mt-3">WhatsApp us — fastest response</p>
                <p className="text-text-muted text-sm mt-2">Average reply within 15 minutes during working hours.</p>
                <Button href={SOCIAL.whatsapp} size="md" external className="mt-4 w-full">
                  <FaWhatsapp className="size-4" />
                  Open WhatsApp
                </Button>
              </div>

              <div className="glass rounded-2xl p-6 space-y-3 text-sm">
                <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`} className="flex items-center gap-3 text-white hover:text-aurora">
                  <Phone className="size-4 text-text-muted" aria-hidden="true" /> {SITE.phone}
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-white hover:text-aurora">
                  <Mail className="size-4 text-text-muted" aria-hidden="true" /> {SITE.email}
                </a>
                <p className="flex items-start gap-3 text-text-secondary">
                  <MapPin className="size-4 text-text-muted mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Bangalore, Karnataka, India · Serving 138 cities across South India</span>
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <p className="text-indigo-glow text-xs uppercase tracking-widest font-mono">What happens next</p>
                <ol className="mt-3 space-y-2 text-sm text-text-secondary list-decimal list-inside">
                  <li>We review your requirements (within 4 business hours)</li>
                  <li>We WhatsApp / call you to clarify any gaps</li>
                  <li>We send a written proposal with scope, timeline, ₹ figures</li>
                  <li>If aligned, we start with a 30-min kickoff call</li>
                </ol>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
