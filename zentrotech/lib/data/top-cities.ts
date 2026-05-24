// Top 30 commercially-validated city slugs for the 3-way matrix.
// Cherry-picked from the 138 SOUTH_INDIA_CITIES based on Google Maps SMB
// density + competitor activity research. Limits the 3-way matrix to
// ~2,400 high-quality pages instead of 11,040 thin pages.

export const TOP_30_CITIES = [
  // Tier A — Bangalore high-density commercial neighborhoods + IT parks (20)
  "koramangala",
  "hsr-layout",
  "indiranagar",
  "btm-layout",
  "whitefield",
  "marathahalli",
  "bellandur",
  "sarjapur-road",
  "outer-ring-road",
  "electronic-city",
  "jayanagar",
  "hebbal",
  "nagavara",
  "peenya",
  "mg-road",
  "manyata-tech-park",
  "embassy-tech-village",
  "itpl-whitefield",
  "rmz-ecospace",
  "bagmane-tech-park",
  // Tier B — South India metros + Bangalore satellites (5)
  "chennai",
  "hyderabad",
  "kochi",
  "coimbatore",
  "pune",
  // Tier C — high-priority Tier-2 (5)
  "mysore",
  "mangalore",
  "madurai",
  "visakhapatnam",
  "thiruvananthapuram",
] as const;
