# Open Graph Image Templates

Pure-SVG social share images for ZentroTECH. These render at **1200 x 630** (the standard OG / Twitter Card size used by LinkedIn, Twitter/X, WhatsApp, Slack, iMessage, etc.).

## Files

| File | Use for |
| --- | --- |
| `og-default.svg` | Homepage and any page without a custom OG image |
| `og-services.svg` | `/services` overview and individual service pages |
| `og-bangalore.svg` | `/ai-consultancy-bangalore` city landing |
| `og-dubai.svg` | `/ai-agency-dubai` city landing |
| `og-insights.svg` | `/insights` blog index (and as a fallback for posts without their own image) |
| `og-work.svg` | `/work` case-studies index |

All assets follow the **Dark Glass / Indigo Futurism** spec:

- Background gradient `#0a0a0f` to `#1a0f2e`
- Aurora mesh (radial indigo / violet / pink) in the upper-right quadrant
- Brand `Z` mark in the upper-left
- Headline white 72-96px, sub-head `rgba(255,255,255,0.7)` 28-32px
- Subtle SVG noise filter overlay
- System fonts only — no external font requests, no external images. Each file is fully inline and opens in any browser.

## Convert SVG to PNG (1200 x 630)

OG scrapers prefer PNG/JPG. Pick whichever path is most convenient:

### Option 1 — Browser screenshot (no install)

1. Open the `.svg` file directly in Chrome / Edge / Firefox.
2. Open DevTools (F12), toggle device toolbar, set viewport to **1200 x 630**.
3. Use DevTools' "Capture full size screenshot" (Cmd/Ctrl + Shift + P -> type "screenshot").

### Option 2 — Inkscape CLI (batch, exact sizing — recommended)

Install Inkscape, then from this directory:

```bash
for f in og-*.svg; do
  inkscape "$f" --export-type=png --export-width=1200 --export-height=630 \
    --export-filename="${f%.svg}.png"
done
```

Windows PowerShell equivalent:

```powershell
Get-ChildItem og-*.svg | ForEach-Object {
  & inkscape $_.FullName --export-type=png --export-width=1200 --export-height=630 `
    --export-filename=("{0}.png" -f $_.BaseName)
}
```

### Option 3 — `sharp` / `resvg` (if you prefer Node)

```bash
npx @resvg/resvg-js-cli og-default.svg og-default.png --width 1200 --height 630
```

### Option 4 — Online (one-off / quick)

- https://cloudconvert.com/svg-to-png  (set width 1200, height 630)
- https://svgtopng.com/

## Where the PNGs go

Place the rendered PNGs in the Next.js public folder:

```
zentrotech/public/og/
  og-default.png
  og-services.png
  og-bangalore.png
  og-dubai.png
  og-insights.png
  og-work.png
```

(Keep the SVG sources here in `docs/brand-assets/og/` so future tweaks stay versioned alongside the design spec.)

## How to reference them in code

Metadata is generated centrally by `lib/seo.ts`. Pages opt in to a specific OG image via the `ogImage` param on the metadata helper. Examples:

```ts
// app/page.tsx
export const metadata = buildMetadata({
  title: "ZentroTECH — Engineering the AI of 2050, today.",
  description: "...",
  // ogImage defaults to /og/og-default.png — no need to set
});

// app/(marketing)/services/page.tsx
export const metadata = buildMetadata({
  title: "AI Consultancy Services",
  description: "...",
  ogImage: "/og/og-services.png",
});

// app/(city)/ai-consultancy-bangalore/page.tsx
export const metadata = buildMetadata({
  ogImage: "/og/og-bangalore.png",
});

// app/(city)/ai-agency-dubai/page.tsx
export const metadata = buildMetadata({
  ogImage: "/og/og-dubai.png",
});

// app/(marketing)/insights/page.tsx
export const metadata = buildMetadata({
  ogImage: "/og/og-insights.png",
});

// app/(marketing)/work/page.tsx
export const metadata = buildMetadata({
  ogImage: "/og/og-work.png",
});
```

Final URLs are absolute (`https://zentrotech.ai/og/og-services.png`) — `buildMetadata` should prefix `NEXT_PUBLIC_SITE_URL`.

## Validating after deploy

- LinkedIn: https://www.linkedin.com/post-inspector/
- Twitter / X: https://cards-dev.twitter.com/validator (or post & delete in a draft)
- Facebook / WhatsApp: https://developers.facebook.com/tools/debug/
- Generic: https://www.opengraph.xyz/

If a platform shows a stale image after re-uploading, use that platform's "Scrape Again" / "Re-fetch" button — most cache aggressively for 1-7 days.
