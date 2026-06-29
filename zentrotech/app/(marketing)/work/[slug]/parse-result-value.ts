export type ParsedResult = {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
};

/**
 * parseResultValue — split a human result string into a numeric core + surrounding text
 * so the number can animate with CountUp while prefix/suffix stay static.
 *
 * Examples:
 *   '-58%'      -> { prefix: '-', number: 58,    suffix: '%',   decimals: 0 }
 *   '4.7 / 5'   -> { prefix: '',  number: 4.7,   suffix: ' / 5', decimals: 1 }
 *   '11,200/yr' -> { prefix: '',  number: 11200, suffix: '/yr', decimals: 0 }
 *   '14 weeks'  -> { prefix: '',  number: 14,    suffix: ' weeks', decimals: 0 }
 *   '+18%'      -> { prefix: '+', number: 18,    suffix: '%',   decimals: 0 }
 *   '80'        -> { prefix: '',  number: 80,    suffix: '',    decimals: 0 }
 *   '$1.2M/yr'  -> { prefix: '$', number: 1.2,   suffix: 'M/yr', decimals: 1 }
 *   '99.4%'     -> { prefix: '',  number: 99.4,  suffix: '%',   decimals: 1 }
 * Fallback (no number found): { prefix:'', number: 0, suffix: raw, decimals: 0 }.
 */
export function parseResultValue(raw: string): ParsedResult {
  const value = (raw ?? "").trim();

  // First number in the string: optional sign, digits with thousands separators, optional decimal.
  const match = value.match(/([+-]?)(\d[\d,]*(?:\.\d+)?)/);

  if (!match || match.index === undefined) {
    return { prefix: "", number: 0, suffix: value, decimals: 0 };
  }

  const sign = match[1] ?? "";
  const digits = match[2];
  const start = match.index;
  // Everything before the matched number (including a leading "$" etc.) becomes prefix.
  const prefix = value.slice(0, start) + sign;
  // Everything after the matched number becomes suffix.
  const suffix = value.slice(start + match[0].length);

  const numeric = Number(digits.replace(/,/g, ""));
  if (Number.isNaN(numeric)) {
    return { prefix: "", number: 0, suffix: value, decimals: 0 };
  }

  const dot = digits.indexOf(".");
  const decimals = dot === -1 ? 0 : digits.length - dot - 1;

  return { prefix, number: numeric, suffix, decimals };
}
