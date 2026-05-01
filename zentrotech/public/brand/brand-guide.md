# ZentroTECH Brand Guide

A short, practical reference for using the ZentroTECH identity correctly.

---

## 1. The mark

The ZentroTECH mark is a stylised "Z" rendered as a circuit path inside a hex portal —
three horizontal data tracks bridged by an angled flow with terminal nodes. It evokes
intelligence flowing through systems without falling back on generic AI clichés
(no neural swirls, no robot heads).

| File | When to use |
|---|---|
| `logo-mark.svg` | Default icon-only mark. Brand gradient. Works on dark and light backgrounds because it has its own subtle inner glow. Use whenever color is available. |
| `logo-mark-mono-light.svg` | Single-color **white** mark for dark photographic or busy backgrounds where the gradient gets lost. |
| `logo-mark-mono-dark.svg` | Single-color **black** mark for light backgrounds, print, faxes, embroidery, single-color stamping. |
| `logo-horizontal.svg` | Default lockup for **dark** UI (site header, dark email, dark slides). Mark + wordmark side by side. |
| `logo-horizontal-light.svg` | Lockup for **light** backgrounds (invoices, light decks, white-paper stationery). |
| `logo-stacked.svg` | Vertical lockup for narrow / square placements (badges, social avatars when sized large, app splash, posters). |
| `favicon.svg` | Browser tab. Optimised to read at 16x16 — frame thinned, nodes dropped. |
| `apple-touch-icon.svg` | iOS / Android home-screen icon. Mark on a soft brand-gradient field; the OS rounds the corners. |
| `og-default-1200x630.svg` | Default social share card. Wordmark + tagline on dark aurora gradient. Use unless a page-specific OG image exists. |

---

## 2. Minimum sizes

| Asset | Minimum width |
|---|---|
| `logo-mark.svg` | 24 px on screen / 8 mm in print |
| `favicon.svg` | 16 px |
| `logo-horizontal*` | 120 px wide |
| `logo-stacked.svg` | 96 px wide |

Below the minimum, swap to `favicon.svg` instead of shrinking the full mark.

---

## 3. Clear space

Leave clear space equal to **the height of one bar of the Z** on all sides of the mark
or lockup. Nothing — type, photography, edges, chrome — may enter that zone.

For the horizontal lockup the gap between the mark and wordmark is fixed in the file;
do not adjust it.

---

## 4. Color

### Brand palette

| Name | HEX | RGB | CMYK (approx) |
|---|---|---|---|
| Void Black | `#0a0a0f` | 10, 10, 15 | 73, 71, 60, 87 |
| Deep Violet | `#1a0f2e` | 26, 15, 46 | 90, 95, 33, 52 |
| Indigo | `#6366f1` | 99, 102, 241 | 70, 64, 0, 0 |
| Violet | `#8b5cf6` | 139, 92, 246 | 56, 70, 0, 0 |
| Pink Pulse | `#ec4899` | 236, 72, 153 | 0, 80, 14, 0 |
| Cyan Glow | `#06b6d4` | 6, 182, 212 | 73, 0, 18, 0 |
| Text on dark | `#ffffff` / `#e5e7eb` | 255,255,255 / 229,231,235 | 0,0,0,0 |
| Muted text | `#9ca3af` | 156, 163, 175 | 12, 6, 0, 40 |

The brand gradient flows: **Cyan Glow -> Indigo -> Violet -> Pink Pulse**.

### Backgrounds

- Default: Void Black with Deep Violet aurora pools.
- Light: pure white. Avoid mid-grey backgrounds — they kill the gradient.

---

## 5. Typography

- Headings: **Geist** / **Inter Display** / **Satoshi** — bold, geometric.
- Body: **Inter** / **Geist Sans**.
- Mono: **JetBrains Mono** for code and AI demo accents.

The wordmark uses a tight geometric sans rendered with system-ui in the SVG so files
stay self-contained. When recreating in print, use **Geist Bold** with **+60 tracking**.

---

## 6. Do / Don't

**Do**
- Use the gradient mark on Void Black or Deep Violet.
- Keep the hex frame intact.
- Pair with generous clear space.
- Use `mono-light` on photographs.

**Don't**
- Don't stretch, skew, or rotate the mark.
- Don't recolor the gradient (no orange Z, no green Z, etc.).
- Don't drop a shadow under the mark.
- Don't place the gradient mark on busy photography — use mono.
- Don't outline the wordmark.
- Don't break the lockup spacing.
- Don't fill the hex frame — it must stay an open portal.
- Don't re-typeset "ZENTROTECH" in a different typeface and call it the logo.

---

## 7. File hygiene

All assets in this folder are SVG, self-contained, and use only system-ui font
fallbacks — they render identically without web-font loading. For raster needs
(slides, social posts) export at 2x or 3x from these masters; do not redraw.
