"use client";

import { Phone, CalendarCheck, MessageSquare } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { CountUp } from "@/components/animations/count-up";

/**
 * Concept 1 — "Live Lead Engine" hero panel.
 * Shows the product outcome the customer wants: a missed call gets answered,
 * an appointment booked, a WhatsApp follow-up sent, and revenue recovered.
 * Cards stream in (staggered), the ₹ figure counts up, a LIVE dot pulses.
 * All GPU-cheap (transform/opacity + one CSS pulse); reduced-motion safe via
 * the shared Stagger/CountUp primitives.
 */

const LEADS = [
  {
    Icon: Phone,
    ic: "bg-emerald-500/15 text-emerald-400",
    title: "Missed call answered",
    meta: "Dental clinic · Koramangala",
  },
  {
    Icon: CalendarCheck,
    ic: "bg-indigo/15 text-indigo-glow",
    title: "Appointment booked",
    meta: "Tomorrow · 11:00 AM",
  },
  {
    Icon: MessageSquare,
    ic: "bg-pink-pulse/15 text-pink-pulse",
    title: "Follow-up sent",
    meta: "WhatsApp · 5 of 7 touches",
  },
];

export function HeroDemo() {
  return (
    <div
      className="relative mx-auto w-full max-w-[420px]"
      role="img"
      aria-label="ZentroTECH live lead engine: a missed call is answered in Kannada, an appointment is booked, a WhatsApp follow-up is sent, and unpaid revenue is recovered automatically."
    >
      {/* aurora glow behind the panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-[3rem] blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(99,102,241,0.5), rgba(139,92,246,0.25) 40%, transparent 70%)",
        }}
      />

      <div className="glass-glow relative rounded-3xl border border-white/10 p-6 shadow-2xl">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-text-muted">Lead Engine</span>
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 pulse-glow" />
            LIVE
          </span>
        </div>

        <Stagger className="mt-5 space-y-3">
          {LEADS.map((l) => (
            <StaggerItem
              key={l.title}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5"
            >
              <div className={`flex size-9 items-center justify-center rounded-xl ${l.ic}`}>
                <l.Icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{l.title}</p>
                <p className="text-xs text-text-muted">{l.meta}</p>
              </div>
              <span className="ml-auto text-lg font-bold text-emerald-400" aria-hidden="true">
                ✓
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="text-3xl font-black text-white">
            <CountUp value={240000} prefix="₹" />{" "}
            <span className="text-emerald-400" aria-hidden="true">
              ▲
            </span>
          </p>
          <p className="mt-1 text-xs text-text-muted">
            recovered this month · <CountUp value={248} /> calls answered
          </p>
        </div>
      </div>
    </div>
  );
}
