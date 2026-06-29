/**
 * reach-nodes — coordinate data for the HQ Reach Map.
 * xPct / yPct are percentages within the 0–100 SVG viewBox / positioned layer,
 * laid out so neighbourhoods radiate around the Koramangala HQ pin.
 * The single isHQ node is the centre everything draws from.
 */
export interface ReachNode {
  label: string;
  xPct: number;
  yPct: number;
  isHQ?: boolean;
}

export const REACH_NODES: readonly ReachNode[] = [
  { label: "Headquarters · Koramangala", xPct: 50, yPct: 50, isHQ: true },
  { label: "MG Road", xPct: 46, yPct: 18 },
  { label: "Indiranagar", xPct: 70, yPct: 24 },
  { label: "Whitefield", xPct: 88, yPct: 40 },
  { label: "Outer Ring Road", xPct: 84, yPct: 66 },
  { label: "HSR Layout", xPct: 64, yPct: 82 },
  { label: "Electronic City", xPct: 42, yPct: 88 },
  { label: "JP Nagar", xPct: 22, yPct: 74 },
  { label: "Jayanagar", xPct: 14, yPct: 48 },
  { label: "Banashankari", xPct: 20, yPct: 26 },
  { label: "Manyata / Hebbal", xPct: 30, yPct: 10 },
] as const;
