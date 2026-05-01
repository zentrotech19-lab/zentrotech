"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OFFICES, SITE } from "@/lib/constants";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";

const ContactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().max(120).optional().or(z.literal("")),
  service: z.string().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(5000),
});

type ContactValues = z.infer<typeof ContactSchema>;

const inputClass =
  "mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", company: "", service: "", message: "" },
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

  return (
    <>
      <LocalBusinessSchema city="Bangalore" />
      <LocalBusinessSchema city="Dubai" />

      <section className="py-24">
        <Container>
          <Badge>Contact</Badge>
          <h1 className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tight">
            Let&apos;s build <span className="text-aurora">something</span>.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl">
            Tell us a little about your AI ambition. We&apos;ll respond within one business day with concrete next steps.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid lg:grid-cols-5 gap-8">
            <form
              onSubmit={onSubmit}
              noValidate
              className="lg:col-span-3 glass-glow rounded-3xl p-10 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-text-muted">Your name</span>
                  <input
                    {...register("name")}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={inputClass}
                    placeholder="Jane Doe"
                  />
                  {errors.name && (
                    <p id="contact-name-error" role="alert" className="mt-2 text-sm text-pink-pulse">
                      {errors.name.message}
                    </p>
                  )}
                </label>
                <label className="block">
                  <span className="text-sm text-text-muted">Work email</span>
                  <input
                    {...register("email")}
                    type="email"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={inputClass}
                    placeholder="jane@company.com"
                  />
                  {errors.email && (
                    <p id="contact-email-error" role="alert" className="mt-2 text-sm text-pink-pulse">
                      {errors.email.message}
                    </p>
                  )}
                </label>
              </div>

              <label className="block">
                <span className="text-sm text-text-muted">Company</span>
                <input
                  {...register("company")}
                  aria-invalid={errors.company ? "true" : "false"}
                  aria-describedby={errors.company ? "contact-company-error" : undefined}
                  className={inputClass}
                  placeholder="Company name"
                />
                {errors.company && (
                  <p id="contact-company-error" role="alert" className="mt-2 text-sm text-pink-pulse">
                    {errors.company.message}
                  </p>
                )}
              </label>

              <label className="block">
                <span className="text-sm text-text-muted">What service interests you?</span>
                <select
                  {...register("service")}
                  aria-invalid={errors.service ? "true" : "false"}
                  aria-describedby={errors.service ? "contact-service-error" : undefined}
                  className={inputClass}
                >
                  <option value="">Select one...</option>
                  <option>AI Agent Development</option>
                  <option>AI Automation</option>
                  <option>AI-Powered Websites</option>
                  <option>Agentic Coding</option>
                  <option>LLM Integration</option>
                  <option>AI Strategy Consulting</option>
                  <option>Not sure yet</option>
                </select>
                {errors.service && (
                  <p id="contact-service-error" role="alert" className="mt-2 text-sm text-pink-pulse">
                    {errors.service.message}
                  </p>
                )}
              </label>

              <label className="block">
                <span className="text-sm text-text-muted">Tell us about your project</span>
                <textarea
                  {...register("message")}
                  rows={5}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={inputClass}
                  placeholder="What are you trying to build, automate, or solve?"
                />
                {errors.message && (
                  <p id="contact-message-error" role="alert" className="mt-2 text-sm text-pink-pulse">
                    {errors.message.message}
                  </p>
                )}
              </label>

              <Button type="submit" size="lg" className="w-full md:w-auto" disabled={sending}>
                {sending ? "Sending…" : status === "sent" ? "Message sent ✓" : "Send message"}
                <Send aria-hidden="true" className="size-4" />
              </Button>

              {/* Live regions: present in DOM at all times so AT picks up the change. */}
              <p
                role="status"
                aria-live="polite"
                className={`text-cyan-glow text-sm ${status === "sent" ? "" : "sr-only"}`}
              >
                {status === "sent"
                  ? "Message sent. Thanks — we'll respond within 1 business day."
                  : ""}
              </p>
              <p
                role="alert"
                aria-live="assertive"
                className={`text-pink-pulse text-sm ${status === "error" ? "" : "sr-only"}`}
              >
                {status === "error"
                  ? errorMessage ?? "Something went wrong sending your message. Please try again."
                  : ""}
              </p>
            </form>

            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-6">
                <p className="text-text-muted text-sm">General</p>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 mt-2 text-white hover:text-aurora">
                  <Mail aria-hidden="true" className="size-4" /> {SITE.email}
                </a>
              </div>

              {OFFICES.map((o) => (
                <div key={o.city} className="glass rounded-2xl p-6">
                  <p className="text-aurora text-xs uppercase tracking-widest font-mono">{o.primary ? "Headquarters" : "Office"}</p>
                  <h3 className="text-2xl font-bold text-white mt-2">{o.city}</h3>
                  <div className="mt-4 space-y-2 text-sm">
                    <p className="flex items-start gap-2 text-text-secondary"><MapPin aria-hidden="true" className="size-4 text-text-muted mt-0.5 shrink-0" /> {o.address}</p>
                    <p className="flex items-center gap-2 text-text-secondary"><Phone aria-hidden="true" className="size-4 text-text-muted" /> {o.phone}</p>
                    <p className="flex items-center gap-2 text-text-secondary"><Mail aria-hidden="true" className="size-4 text-text-muted" /> {o.email}</p>
                    <p className="flex items-center gap-2 text-text-secondary"><Clock aria-hidden="true" className="size-4 text-text-muted" /> {o.timezone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
