"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

// DSO reduction we underwrite for our payment-recovery service.
// Razorpay's own data + our pilots show 30-50%; we underwrite to 30%.
const ZT_DSO_REDUCTION = 0.3;

/**
 * Indian-system number formatter: 1,00,000 instead of 100,000.
 * en-IN locale natively groups by lakh / crore.
 */
function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(value),
  );
}

/** Render large numbers as readable lakh / crore strings. */
function formatLakhCrore(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_00_00_000) {
    return `₹${(value / 1_00_00_000).toFixed(2)} crore`;
  }
  if (abs >= 1_00_000) {
    return `₹${(value / 1_00_000).toFixed(2)} lakh`;
  }
  return `₹${formatINR(value)}`;
}

export function DsoImpactCalculator() {
  const [monthlyInvoiceValue, setMonthlyInvoiceValue] =
    React.useState<number>(10_00_000);
  const [currentDso, setCurrentDso] = React.useState<number>(60);
  const [invoicesPerMonth, setInvoicesPerMonth] = React.useState<number>(50);
  const [costOfCapital, setCostOfCapital] = React.useState<number>(12);
  const [email, setEmail] = React.useState<string>("");
  const [submitState, setSubmitState] = React.useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  // ---- Calculations (re-derived each render) ----
  // Stuck capital = monthly invoice value × (DSO / 30)
  // That's average outstanding receivables given the payment delay.
  const currentStuck = monthlyInvoiceValue * (currentDso / 30);
  const currentCarryCost = currentStuck * (costOfCapital / 100);

  const newDso = currentDso * (1 - ZT_DSO_REDUCTION);
  const newStuck = monthlyInvoiceValue * (newDso / 30);
  const newCarryCost = newStuck * (costOfCapital / 100);

  const cashFreed = currentStuck - newStuck;
  const annualSaving = cashFreed * (costOfCapital / 100);
  const avgInvoiceValue =
    invoicesPerMonth > 0 ? monthlyInvoiceValue / invoicesPerMonth : 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setSubmitState("error");
      return;
    }
    setSubmitState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "dso-calculator",
          snapshot: {
            inputs: {
              monthlyInvoiceValue,
              currentDso,
              invoicesPerMonth,
              costOfCapital,
            },
            current: {
              stuckCapital: currentStuck,
              annualCarryCost: currentCarryCost,
              dso: currentDso,
            },
            withZentrotech: {
              stuckCapital: newStuck,
              annualCarryCost: newCarryCost,
              dso: newDso,
              reductionPct: ZT_DSO_REDUCTION * 100,
            },
            outcomes: {
              cashFreed,
              annualSaving,
            },
            generatedAt: new Date().toISOString(),
          },
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSubmitState("sent");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <div className="relative">
      <noscript>
        <div className="glass rounded-2xl p-6 text-text-secondary">
          This calculator needs JavaScript to run. Please enable it, or
          WhatsApp us at +91 73489 61600 with your DSO numbers — we&apos;ll
          compute it for you.
        </div>
      </noscript>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* INPUTS */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 md:p-8">
          <h2 className="text-white text-xl font-bold">Your receivables</h2>
          <p className="mt-2 text-text-muted text-sm">
            Conservative defaults for an Indian SMB doing ~₹1.2 Cr/yr.
          </p>

          <div className="mt-6 space-y-5">
            <CurrencyField
              label="Monthly invoice value (₹)"
              hint="Total ₹ you invoice in an average month."
              value={monthlyInvoiceValue}
              step={50_000}
              onChange={setMonthlyInvoiceValue}
            />
            <NumberField
              label="Current DSO (days)"
              hint="Days Sales Outstanding — avg days an invoice takes to get paid."
              value={currentDso}
              step={1}
              max={180}
              onChange={setCurrentDso}
            />
            <NumberField
              label="Invoices per month"
              hint="Total invoices you issue monthly."
              value={invoicesPerMonth}
              step={1}
              max={5000}
              onChange={setInvoicesPerMonth}
            />
            <NumberField
              label="Cost of capital (annual %)"
              hint="Your effective interest rate / opportunity cost. SMB avg in India: 12%."
              value={costOfCapital}
              step={0.5}
              max={30}
              onChange={setCostOfCapital}
            />
          </div>

          {invoicesPerMonth > 0 && (
            <p className="mt-6 text-text-muted text-xs">
              Implied average invoice value: ₹{formatINR(avgInvoiceValue)}
            </p>
          )}
        </div>

        {/* OUTPUTS */}
        <div className="lg:col-span-3 space-y-6">
          {/* Big number */}
          <div className="glass-glow rounded-2xl p-6 md:p-8 text-center">
            <div className="text-text-muted text-xs uppercase tracking-wide">
              How much you save in year 1
            </div>
            <div className="mt-2 text-4xl md:text-6xl font-black text-aurora">
              ₹{formatINR(annualSaving)}
            </div>
            <div className="mt-3 text-text-secondary text-sm">
              Cash freed up:{" "}
              <span className="text-white font-bold">
                {formatLakhCrore(cashFreed)}
              </span>{" "}
              · DSO drops from{" "}
              <span className="text-white font-bold">{currentDso} days</span> to{" "}
              <span className="text-white font-bold">
                {Math.round(newDso)} days
              </span>
            </div>
          </div>

          {/* Before / After */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Today */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold">Today</h3>
                <span className="text-text-muted text-xs uppercase tracking-wide">
                  Current state
                </span>
              </div>
              <dl className="mt-4 space-y-3">
                <Stat
                  label="DSO"
                  value={`${currentDso} days`}
                  tone="muted"
                />
                <Stat
                  label="Stuck capital"
                  value={formatLakhCrore(currentStuck)}
                  tone="muted"
                />
                <Stat
                  label="Annual carry cost"
                  value={`₹${formatINR(currentCarryCost)}`}
                  tone="muted"
                />
              </dl>
            </div>

            {/* With ZentroTECH */}
            <div className="rounded-2xl border border-indigo/40 bg-indigo/10 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold">With ZentroTECH</h3>
                <span className="text-indigo-glow text-xs uppercase tracking-wide">
                  -30% DSO
                </span>
              </div>
              <dl className="mt-4 space-y-3">
                <Stat
                  label="DSO"
                  value={`${Math.round(newDso)} days`}
                  tone="highlight"
                />
                <Stat
                  label="Stuck capital"
                  value={formatLakhCrore(newStuck)}
                  tone="highlight"
                />
                <Stat
                  label="Annual carry cost"
                  value={`₹${formatINR(newCarryCost)}`}
                  tone="highlight"
                />
              </dl>
            </div>
          </div>

          {/* Email capture */}
          <form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <label className="block text-text-secondary text-sm font-medium mb-2">
              Get this calculation emailed as a PDF
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                inputMode="email"
                placeholder="you@company.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-text-muted focus:border-indigo focus:outline-none"
                required
              />
              <Button type="submit" disabled={submitState === "sending"}>
                {submitState === "sending"
                  ? "Sending..."
                  : submitState === "sent"
                    ? "Sent!"
                    : "Email me the PDF"}
              </Button>
            </div>
            {submitState === "sent" && (
              <p className="mt-2 text-indigo-glow text-xs">
                Sent. Check your inbox in 60 seconds — and your spam folder if
                it&apos;s late.
              </p>
            )}
            {submitState === "error" && (
              <p className="mt-2 text-pink-pulse text-xs">
                Couldn&apos;t send. WhatsApp us at +91 73489 61600.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  hint,
  value,
  step = 1,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  step?: number;
  max?: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <label className="block text-text-secondary text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type="number"
        min={0}
        step={step}
        max={max}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-indigo focus:outline-none"
      />
      <p className="mt-1 text-text-muted text-xs">{hint}</p>
    </div>
  );
}

function CurrencyField({
  label,
  hint,
  value,
  step = 10_000,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  step?: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <label className="block text-text-secondary text-sm font-medium mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm">
          ₹
        </span>
        <input
          type="number"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className="w-full rounded-xl bg-white/5 border border-white/10 pl-8 pr-4 py-3 text-white focus:border-indigo focus:outline-none"
        />
      </div>
      <p className="mt-1 text-text-muted text-xs">{hint}</p>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "muted" | "highlight";
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-text-muted text-xs uppercase tracking-wide">
        {label}
      </dt>
      <dd
        className={`font-bold text-lg ${
          tone === "highlight" ? "text-aurora" : "text-white"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
