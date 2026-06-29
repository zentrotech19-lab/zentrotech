"use client";

import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { CountUp } from "@/components/animations/count-up";

/**
 * parseResultValue — turns a case-study result string into a CountUp-safe token.
 * Only CLEAN numeric/percent tokens animate. We parse: $, %, /yr, weeks, x, and
 * leading +/- signs (with thousands separators + decimals). Anything mixed
 * (e.g. "$1.2M/yr", "8M+", "4.7 / 5") returns null and is rendered STATIC so
 * CountUp never receives a NaN.
 */
export type ParsedValue =
  | { kind: "number"; value: number; prefix: string; suffix: string; decimals: number; sign: string }
  | { kind: "static"; raw: string };

export function parseResultValue(raw: string): ParsedValue {
  const s = raw.trim();

  // Token must be: optional sign, optional $, a number (with , and .), then ONE
  // of the allowed clean suffixes (%, x, /yr, weeks/week) or nothing.
  const m = s.match(/^([+-]?)(\$?)([\d,]+(?:\.\d+)?)\s*(%|x|\/yr|weeks?)?$/i);
  if (!m) return { kind: "static", raw: s };

  const [, sign, dollar, numRaw, rawSuffix] = m;
  const numeric = Number(numRaw.replace(/,/g, ""));
  if (!Number.isFinite(numeric)) return { kind: "static", raw: s };

  const decimals = numRaw.includes(".") ? (numRaw.split(".")[1]?.length ?? 0) : 0;

  let suffix = "";
  if (rawSuffix) {
    const low = rawSuffix.toLowerCase();
    if (low === "%") suffix = "%";
    else if (low === "x") suffix = "x";
    else if (low === "/yr") suffix = "/yr";
    else if (low === "week" || low === "weeks") suffix = numeric === 1 ? " week" : " weeks";
  }

  return {
    kind: "number",
    value: numeric,
    prefix: dollar ? "$" : "",
    suffix,
    decimals,
    sign,
  };
}

export type LedgerStat = {
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
  sign: string;
  label: string;
};

/**
 * ProofLedger — surfaces the aggregate results[] as a 2×2 tally. Each figure
 * counts up once on scroll-in, revealed top→bottom in a Stagger. tabular-nums +
 * reserved min-width keep CLS at zero.
 */
export function ProofLedger({ stats }: { stats: LedgerStat[] }) {
  if (stats.length === 0) return null;
  return (
    <div className="glass-glow rounded-3xl p-8 md:p-10">
      <p className="text-xs uppercase tracking-widest text-indigo-glow font-mono font-black">
        Proof ledger
      </p>
      <p className="mt-3 text-text-secondary leading-relaxed max-w-2xl">
        The numbers across everything we&rsquo;ve shipped — tallied, not rounded.
      </p>
      <Stagger className="mt-8 grid grid-cols-2 gap-6 md:gap-8">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <span className="block text-4xl md:text-5xl font-black text-white">
              <span className="tabular-nums">{s.sign}</span>
              <CountUp
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                decimals={s.decimals}
                className="tabular-nums min-w-[3ch]"
              />
            </span>
            <p className="mt-2 text-xs text-text-muted leading-snug">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
