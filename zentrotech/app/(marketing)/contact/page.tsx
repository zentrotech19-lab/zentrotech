"use client";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OFFICES, SITE } from "@/lib/constants";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

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
            <form onSubmit={onSubmit} className="lg:col-span-3 glass-glow rounded-3xl p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-text-muted">Your name</span>
                  <input required name="name" className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-indigo" placeholder="Jane Doe" />
                </label>
                <label className="block">
                  <span className="text-sm text-text-muted">Work email</span>
                  <input required type="email" name="email" className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-indigo" placeholder="jane@company.com" />
                </label>
              </div>
              <label className="block">
                <span className="text-sm text-text-muted">Company</span>
                <input name="company" className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-indigo" placeholder="Company name" />
              </label>
              <label className="block">
                <span className="text-sm text-text-muted">What service interests you?</span>
                <select name="service" className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-indigo">
                  <option value="">Select one...</option>
                  <option>AI Agent Development</option>
                  <option>AI Automation</option>
                  <option>AI-Powered Websites</option>
                  <option>Agentic Coding</option>
                  <option>LLM Integration</option>
                  <option>AI Strategy Consulting</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-text-muted">Tell us about your project</span>
                <textarea required name="message" rows={5} className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-indigo" placeholder="What are you trying to build, automate, or solve?" />
              </label>
              <Button type="submit" size="lg" className="w-full md:w-auto">
                {sent ? "Message sent ✓" : "Send message"} <Send className="size-4" />
              </Button>
              {sent && <p className="text-cyan-glow text-sm">Thanks — we&apos;ll respond within 1 business day. (Note: form is currently a demo. Wire to Resend or your email provider before launch.)</p>}
            </form>

            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-6">
                <p className="text-text-muted text-sm">General</p>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 mt-2 text-white hover:text-aurora">
                  <Mail className="size-4" /> {SITE.email}
                </a>
              </div>

              {OFFICES.map((o) => (
                <div key={o.city} className="glass rounded-2xl p-6">
                  <p className="text-aurora text-xs uppercase tracking-widest font-mono">{o.primary ? "Headquarters" : "Office"}</p>
                  <h3 className="text-2xl font-bold text-white mt-2">{o.city}</h3>
                  <div className="mt-4 space-y-2 text-sm">
                    <p className="flex items-start gap-2 text-text-secondary"><MapPin className="size-4 text-text-muted mt-0.5 shrink-0" /> {o.address}</p>
                    <p className="flex items-center gap-2 text-text-secondary"><Phone className="size-4 text-text-muted" /> {o.phone}</p>
                    <p className="flex items-center gap-2 text-text-secondary"><Mail className="size-4 text-text-muted" /> {o.email}</p>
                    <p className="flex items-center gap-2 text-text-secondary"><Clock className="size-4 text-text-muted" /> {o.timezone}</p>
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
