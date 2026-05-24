"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

// Verified Jan 2026 Meta WhatsApp Business Platform India wholesale rates.
// Source: Meta WhatsApp Conversation-Based Pricing rate card (per-message).
const META_RATES_INR = {
  marketing: 0.8631,
  utility: 0.115,
  service: 0, // Free within the 24-hr service window (Meta policy).
};

type BspOption = {
  id: "diy" | "saas" | "zentrotech";
  label: string;
  blurb: string;
  markupPct: number; // % markup added on top of Meta wholesale.
  monthlySubscription: number; // Flat ₹/mo, on top of usage.
};

const BSP_OPTIONS: BspOption[] = [
  {
    id: "diy",
    label: "DIY direct with Meta",
    blurb: "0% markup. You handle setup, templates, BSP approval, monitoring.",
    markupPct: 0,
    monthlySubscription: 0,
  },
  {
    id: "saas",
    label: "Self-serve SaaS (AiSensy / WATI / Interakt)",
    blurb: "~17.5% avg markup on Meta rates + ~₹1,999/mo subscription.",
    markupPct: 17.5,
    monthlySubscription: 1999,
  },
  {
    id: "zentrotech",
    label: "ZentroTECH done-for-you",
    blurb: "30% markup + flat ₹9,999/mo (setup, templates, monitoring, hand-holding).",
    markupPct: 30,
    monthlySubscription: 9999,
  },
];

/**
 * Indian-system number formatter: 1,00,000 instead of 100,000.
 * Uses the built-in en-IN locale which natively groups by lakh/crore.
 */
function formatINR(value: number): string {
  const rounded = Math.round(value);
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(rounded);
}

function formatINR2(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

type CostBreakdown = {
  metaWholesale: number;
  markup: number;
  subscription: number;
  total: number;
};

function calcCost(
  metaWholesale: number,
  option: BspOption,
): CostBreakdown {
  const markup = metaWholesale * (option.markupPct / 100);
  const total = metaWholesale + markup + option.monthlySubscription;
  return {
    metaWholesale,
    markup,
    subscription: option.monthlySubscription,
    total,
  };
}

export function WhatsappPricingCalculator() {
  const [marketing, setMarketing] = React.useState<number>(5000);
  const [utility, setUtility] = React.useState<number>(2000);
  const [service, setService] = React.useState<number>(1000);
  const [selectedBsp, setSelectedBsp] = React.useState<BspOption["id"]>("saas");
  const [showBreakdown, setShowBreakdown] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [submitState, setSubmitState] = React.useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  // ---- Calculations (re-derived each render) ----
  const marketingCost = marketing * META_RATES_INR.marketing;
  const utilityCost = utility * META_RATES_INR.utility;
  const serviceCost = service * META_RATES_INR.service;
  const metaWholesale = marketingCost + utilityCost + serviceCost;

  const costs = BSP_OPTIONS.map((opt) => ({
    option: opt,
    cost: calcCost(metaWholesale, opt),
  }));

  const saasCost = costs.find((c) => c.option.id === "saas")!.cost.total;
  const ztCost = costs.find((c) => c.option.id === "zentrotech")!.cost.total;
  // Honest delta: SaaS-vs-ZentroTECH annualised. Positive = ZentroTECH cheaper.
  const annualDelta = (saasCost - ztCost) * 12;

  // Max for bar-chart scaling.
  const maxCost = Math.max(...costs.map((c) => c.cost.total), 1);

  // ---- Email submit ----
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
          source: "whatsapp-calculator",
          snapshot: {
            inputs: { marketing, utility, service },
            metaWholesale,
            options: costs.map((c) => ({
              id: c.option.id,
              label: c.option.label,
              monthlyTotal: c.cost.total,
            })),
            selectedBsp,
            annualDelta_saas_vs_zt: annualDelta,
            rates: META_RATES_INR,
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
          WhatsApp us at +91 73489 61600 for a manual quote.
        </div>
      </noscript>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* INPUTS */}
        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="text-white text-xl font-bold">Your monthly volumes</h2>
          <p className="mt-2 text-text-muted text-sm">
            India audience. Rates verified Jan 2026 from Meta&apos;s rate card.
          </p>

          <div className="mt-6 space-y-5">
            <NumberField
              label="Marketing messages / month"
              hint="Promos, broadcasts, win-back campaigns. ₹0.8631 each."
              value={marketing}
              onChange={setMarketing}
            />
            <NumberField
              label="Utility messages / month"
              hint="OTPs, transactional, order updates. ₹0.1150 each."
              value={utility}
              onChange={setUtility}
            />
            <NumberField
              label="Service messages / month"
              hint="Replies inside the 24-hr customer-initiated window. FREE."
              value={service}
              onChange={setService}
            />

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Audience country
              </label>
              <select
                disabled
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white disabled:opacity-70"
              >
                <option>India (IN)</option>
              </select>
              <p className="mt-1 text-text-muted text-xs">
                More countries coming. India rates only in v1.
              </p>
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Compare against which BSP option?
              </label>
              <div className="space-y-2">
                {BSP_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-3 cursor-pointer rounded-xl border px-4 py-3 transition-colors ${
                      selectedBsp === opt.id
                        ? "border-indigo bg-indigo/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="bsp"
                      value={opt.id}
                      checked={selectedBsp === opt.id}
                      onChange={() => setSelectedBsp(opt.id)}
                      className="mt-1"
                    />
                    <span className="flex-1">
                      <span className="block text-white font-medium text-sm">
                        {opt.label}
                      </span>
                      <span className="block text-text-muted text-xs mt-0.5">
                        {opt.blurb}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowBreakdown((v) => !v)}
              className="text-indigo-glow text-sm hover:text-white transition-colors"
            >
              {showBreakdown ? "Hide" : "Show"} full breakdown ↓
            </button>
          </div>
        </div>

        {/* OUTPUTS */}
        <div className="glass-glow rounded-2xl p-6 md:p-8">
          <h2 className="text-white text-xl font-bold">Your monthly cost</h2>
          <p className="mt-2 text-text-muted text-sm">
            Meta wholesale + each BSP&apos;s real markup.
          </p>

          {/* Meta wholesale */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="text-text-muted text-xs uppercase tracking-wide">
              Meta wholesale (you pay Meta directly)
            </div>
            <div className="mt-1 text-2xl font-bold text-white">
              ₹{formatINR2(metaWholesale)}{" "}
              <span className="text-text-muted text-sm font-normal">
                / month
              </span>
            </div>
          </div>

          {/* Bar comparison */}
          <div className="mt-6 space-y-4">
            {costs.map(({ option, cost }) => {
              const widthPct = Math.max(2, (cost.total / maxCost) * 100);
              const isSelected = option.id === selectedBsp;
              return (
                <div key={option.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-sm font-medium ${
                        isSelected ? "text-white" : "text-text-secondary"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="text-white font-bold text-sm">
                      ₹{formatINR(cost.total)}/mo
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        option.id === "zentrotech"
                          ? "bg-linear-to-r from-indigo via-violet to-pink-pulse"
                          : isSelected
                            ? "bg-indigo-glow"
                            : "bg-white/30"
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                  {showBreakdown && (
                    <div className="mt-1 text-text-muted text-xs space-x-3">
                      <span>Wholesale ₹{formatINR2(cost.metaWholesale)}</span>
                      <span>
                        + Markup ₹{formatINR2(cost.markup)} ({option.markupPct}
                        %)
                      </span>
                      <span>+ Sub ₹{formatINR(cost.subscription)}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Annual delta vs SaaS */}
          <div className="mt-6 rounded-xl border border-indigo/30 bg-indigo/10 p-4">
            <div className="text-text-muted text-xs uppercase tracking-wide">
              Annual ZentroTECH vs SaaS
            </div>
            <div className="mt-1 text-xl font-bold text-white">
              {annualDelta >= 0 ? (
                <>You save ₹{formatINR(annualDelta)} / year</>
              ) : (
                <>
                  Costs ₹{formatINR(Math.abs(annualDelta))} more / year — but
                  zero ops time, monitoring, and template-rejection headaches.
                </>
              )}
            </div>
            <p className="mt-2 text-text-muted text-xs leading-relaxed">
              Done-for-you means we own the BSP setup, Meta template approvals,
              opt-out compliance, and 24/7 send-rate monitoring. Roughly 6–10
              hrs/week of in-house ops time most SMBs don&apos;t account for.
            </p>
          </div>

          {/* Email capture */}
          <form onSubmit={handleSubmit} className="mt-6">
            <label className="block text-text-secondary text-sm font-medium mb-2">
              Want this breakdown emailed?
            </label>
            <div className="flex gap-2">
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
                    : "Email me"}
              </Button>
            </div>
            {submitState === "sent" && (
              <p className="mt-2 text-indigo-glow text-xs">
                Sent. We&apos;ll WhatsApp you within 1 business day too.
              </p>
            )}
            {submitState === "error" && (
              <p className="mt-2 text-pink-pulse text-xs">
                Something went wrong. WhatsApp us at +91 73489 61600.
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
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
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
        step={100}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-indigo focus:outline-none"
      />
      <p className="mt-1 text-text-muted text-xs">{hint}</p>
    </div>
  );
}
