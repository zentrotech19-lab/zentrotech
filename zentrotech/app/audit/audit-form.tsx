"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { LeakMeter } from "./leak-meter";
import { track } from "@/lib/analytics";
import { auditWaLink } from "@/lib/whatsapp";
import { FaWhatsapp } from "react-icons/fa6";
import { CheckCircle2, ArrowRight } from "lucide-react";

const VERTICALS = [
  "Clinic / Healthcare",
  "Salon / Spa",
  "Real estate / Sub-broker",
  "Coaching / Education",
  "Repair / Home services",
  "Gym / Fitness",
  "CA / Legal / Architect",
  "Restaurant / Cloud kitchen",
  "Other local business",
] as const;

const LEAKS = [
  "Missed / after-hours calls",
  "Enquiries we never follow up",
  "WhatsApp messages we miss",
  "Website gets visits, no leads",
  "Quotes sent, then ghosted",
  "Unpaid invoices piling up",
  "Not sure — that's why I want the audit",
] as const;

const MISSED = ["0-10", "10-30", "30-100", "100+", "No idea"] as const;

const AuditSchema = z.object({
  name: z.string().min(2, "Your name").max(120),
  businessName: z.string().min(2, "Business name").max(160),
  whatsapp: z.string().min(10, "Valid WhatsApp number (10 digits)").max(20),
  email: z.string().email("Valid email").optional().or(z.literal("")),
  website: z.string().max(200).optional().or(z.literal("")),
  vertical: z.string().min(2, "Pick your business type"),
  biggestLeak: z.string().min(2, "Pick where leads leak most"),
  monthlyMissed: z.string().optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true, { message: "Please agree so we can WhatsApp your audit" }),
});

type AuditValues = z.infer<typeof AuditSchema>;

const inputClass =
  "mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-text-muted transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void focus-visible:border-indigo/50 focus-visible:shadow-[0_0_24px_rgba(99,102,241,0.35)]";
const labelClass = "block text-sm text-text-secondary";
const errorClass = "mt-2 text-sm text-pink-pulse";

export function AuditForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [waFallback, setWaFallback] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  // Fire the audit funnel-entry event once on mount.
  useEffect(() => {
    track("audit_view", { location: "audit_page", source: "site" });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AuditValues>({
    resolver: zodResolver(AuditSchema),
    defaultValues: {
      name: "",
      businessName: "",
      whatsapp: "",
      email: "",
      website: "",
      vertical: "",
      biggestLeak: "",
      monthlyMissed: "",
      consent: false,
    },
  });

  const onFirstFocus = () => {
    if (started) return;
    setStarted(true);
    track("audit_form_start", { location: "audit_page" });
  };

  // Live-watch the 4 meter fields so the LeakMeter re-targets on every change.
  const meterFields = {
    vertical: watch("vertical"),
    biggestLeak: watch("biggestLeak"),
    monthlyMissed: watch("monthlyMissed") ?? "",
    consent: watch("consent"),
  };
  const allLit =
    !!meterFields.vertical &&
    !!meterFields.biggestLeak &&
    !!meterFields.monthlyMissed &&
    meterFields.consent === true;

  const onSubmit = handleSubmit(async (values) => {
    setStatus("sending");
    setErrorMessage(null);
    // Capture UTM/source from the URL so attribution survives to GA4 + email.
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const source = [params.get("utm_source"), params.get("utm_campaign"), params.get("utm_content")]
      .filter(Boolean)
      .join(" / ") || "direct";
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `Request failed with ${res.status}`);
      }
      const data = await res.json().catch(() => ({}));
      // PRIMARY CONVERSION — this is the event every other play optimizes for.
      track("audit_lead_submit", {
        location: "audit_page",
        source,
        label: values.vertical,
        value: 500, // proxy lead value (INR) for GA4 value-based reporting
      });
      setWaFallback(data?.whatsappFallbackUrl ?? auditWaLink({ vertical: values.vertical, source: "audit_page" }));
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  });

  const sending = status === "sending" || isSubmitting;

  if (status === "sent") {
    return (
      <Reveal className="glass-glow rounded-3xl p-8 md:p-10 text-center">
        <CheckCircle2 className="size-14 text-indigo-glow mx-auto pulse-glow" aria-hidden="true" />
        <h2 className="mt-5 text-3xl font-black text-white tracking-tight">Got it. Your audit is booked.</h2>
        <p className="mt-3 text-text-secondary">
          We&rsquo;ll WhatsApp you within the hour (usually within 15 minutes in working hours) with the first thing we&rsquo;d fix.
          Want it faster? Send us your WhatsApp now &mdash; one tap.
        </p>
        <div className="mt-7">
          <Button
            href={waFallback ?? auditWaLink({ source: "audit_thankyou" })}
            size="lg"
            external
            onClick={() => track("whatsapp_click", { location: "audit_thankyou", source: "audit" })}
          >
            <FaWhatsapp className="size-5" />
            Send on WhatsApp now
          </Button>
        </div>
        <p className="mt-4 text-text-muted text-sm">No spam. No 20-email drip. One human, one message.</p>
      </Reveal>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={onFirstFocus}
      noValidate
      className={`glass-glow rounded-3xl p-6 md:p-8 space-y-5 ${sending ? "shimmer" : ""}`}
    >
      {/* Live Leak Meter — ignites as the 4 key fields fill. */}
      <LeakMeter fields={meterFields} />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className={labelClass}>
          Your name *
          <input {...register("name")} className={inputClass} placeholder="Ramesh" autoComplete="name" />
          {errors.name && <p className={errorClass} role="alert">{errors.name.message}</p>}
        </label>
        <label className={labelClass}>
          Business name *
          <input {...register("businessName")} className={inputClass} placeholder="Sri Lakshmi Dental" />
          {errors.businessName && <p className={errorClass} role="alert">{errors.businessName.message}</p>}
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className={labelClass}>
          WhatsApp number *
          <input {...register("whatsapp")} className={inputClass} placeholder="+91 98765 43210" inputMode="tel" />
          {errors.whatsapp && <p className={errorClass} role="alert">{errors.whatsapp.message}</p>}
        </label>
        <label className={labelClass}>
          Email (optional)
          <input {...register("email")} type="email" className={inputClass} placeholder="you@business.com" autoComplete="email" />
          {errors.email && <p className={errorClass} role="alert">{errors.email.message}</p>}
        </label>
      </div>

      <label className={labelClass}>
        Website or Google listing (optional, helps us pre-audit)
        <input {...register("website")} className={inputClass} placeholder="yourbusiness.com or Google Maps link" />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className={labelClass}>
          Business type *
          <select {...register("vertical")} className={inputClass}>
            <option value="">Select…</option>
            {VERTICALS.map((v) => (<option key={v} value={v}>{v}</option>))}
          </select>
          {errors.vertical && <p className={errorClass} role="alert">{errors.vertical.message}</p>}
        </label>
        <label className={labelClass}>
          Where do you lose most leads? *
          <select {...register("biggestLeak")} className={inputClass}>
            <option value="">Select…</option>
            {LEAKS.map((l) => (<option key={l} value={l}>{l}</option>))}
          </select>
          {errors.biggestLeak && <p className={errorClass} role="alert">{errors.biggestLeak.message}</p>}
        </label>
      </div>

      <label className={labelClass}>
        Roughly how many enquiries/calls do you think you miss a month? (optional)
        <select {...register("monthlyMissed")} className={inputClass}>
          <option value="">Pick a range…</option>
          {MISSED.map((m) => (<option key={m} value={m}>{m}</option>))}
        </select>
      </label>

      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" {...register("consent")} className="mt-1 size-4 rounded accent-indigo" />
        <span className="text-sm text-text-secondary">
          Yes, WhatsApp / call me with my free audit. *
        </span>
      </label>
      {errors.consent && <p className={errorClass} role="alert">{errors.consent.message}</p>}

      <Button
        type="submit"
        size="lg"
        className={`w-full ${allLit ? "glass-glow ring-2 ring-indigo/40" : ""}`}
        disabled={sending}
      >
        {sending ? "Booking your audit…" : "Get my free lead-flow audit"}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Button>

      <p className="text-center text-text-muted text-xs">
        Free. No obligation. We reply on WhatsApp, fast — not a 10-email sales drip.
      </p>

      <p
        role="alert"
        aria-live="assertive"
        className={`text-pink-pulse text-sm text-center ${status === "error" ? "" : "sr-only"}`}
      >
        {status === "error"
          ? errorMessage ?? "Something went wrong. WhatsApp us directly and we'll sort it."
          : ""}
      </p>
    </form>
  );
}
