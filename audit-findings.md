# ZentroTECH.in — Honest Audit Findings

**Audited:** 2026-05-24
**Branch:** `feat/3d-mascot-system`
**Live URL:** https://www.zentrotech.in (redirects to /en)
**Sitemap reports:** 5,047 URLs
**Audit method:** Code review + live HTTP fetches + DOM evaluation against production

---

## TL;DR — Top 5 things to fix this week

1. **The contact form goes nowhere.** `/api/contact` just `console.log`s submissions. Every lead from the new 5,047-page SEO push is silently dropped. This is the single most expensive bug on the site.
2. **No legal pages.** `/privacy`, `/terms`, `/refund` all 404 — yet the site offers a "money-back trial" and collects personal data (DPDP Act exposure).
3. **Zero trust signals on homepage.** No testimonials, no reviews, no client logos, no case studies, no AggregateRating schema. The whole funnel asks visitors to trust marketing copy with nothing to back it up.
4. **All page titles are duplicated** (`"Title · ZentroTECH · ZentroTECH"`) because per-page titles already end with `| ZentroTECH` and the root template appends ` · ZentroTECH` again.
5. **Tamil and Kannada SEO are dead.** `/ta/services/ai-chatbots/koramangala` returns 404. The 600-line `SEO_TRANSLATIONS` dictionary is imported by zero pages — pure dead code.

---

## 1. Brand Consistency

### F-01 — 🟢 Logo renders correctly on header and footer
The recent fix landed cleanly. `/brand/logo-mark.svg` resolves and renders at 36×36 in both header and footer across all sampled pages (en/ta/kn homepages, programmatic, contact, about, etc.). No regression — keep going.

### F-02 — 🟡 OG image is the same `/og/default.png` for every page
**What's wrong:** All sampled pages (`/answers/*`, `/compare/*`, `/services/*`, `/locations/*`, `/about`, `/insights`, `/services`) return `og:image = https://zentrotech.in/og/default.png`. The variant OG images that already exist on disk (`/public/og/bangalore.png`, `dubai.png`, `home.png`, `insights.png`, `services.png`, `work.png`) are referenced only by the localized homepage (`/[lang]/page.tsx` line 31 uses `/og/home.png`).
**Why it matters:** Every social share of a Koramangala/clinic page surfaces the generic OG card. WhatsApp + LinkedIn share previews are a major SMB referral path — they all look identical.
**Fix:** In `lib/seo.ts`, accept an `ogImage` per template; route service pages to `services.png`, location pages to `bangalore.png` or a city-specific render, insights to `insights.png`. Or generate per-page OG via `next/og` route handler.

### F-03 — 🟡 Title tag duplication: `"... · ZentroTECH · ZentroTECH"`
**What's wrong:** Every sampled page exhibits a doubled brand suffix. Examples (live):
- `/services/ai-chatbots/koramangala`: `AI Chatbots in Koramangala | ZentroTECH · ZentroTECH`
- `/answers/[slug]`: `... | ZentroTECH Answers · ZentroTECH`
- `/locations/electronic-city`: `Lead Engine Websites + AI Automation in Electronic City | ZentroTECH · ZentroTECH`
**Root cause:** `app/layout.tsx` defines `title.template = "%s · ZentroTECH"`. Per-page `buildMetadata({ title })` calls in `lib/seo.ts`, `app/services/[slug]/[city]/page.tsx:36`, `app/services/[slug]/for/[vertical]/[city]/page.tsx:45`, etc., already end with `| ZentroTECH`. The template wraps that string again.
**Why it matters:** Google truncates ~580px of title; doubled brand wastes ~13 chars on every result; looks amateurish in SERPs.
**Fix:** Either strip ` | ZentroTECH` from `buildMetadata` titles or use `title: { absolute: ... }` so the template doesn't append.

### F-04 — 🟢 Favicon + Apple touch icon — fine
`/favicon.ico` + Next-generated `/icon` both serve 200. Good.

---

## 2. Content Quality on Programmatic Pages

### F-05 — 🔴 Service × Vertical × City pages are 99%+ templated
**What's wrong:** I fetched `/services/ai-chatbots/for/clinics/koramangala`, `.../whitefield`, `.../chennai` and stripped HTML + normalized city/state/language tokens. After normalization, the visible body text differs by **37 characters** across cities. The only variability is:
- Two branching sentences (`isBangaloreCore` vs `isMetro` vs other)
- Static vertical pain/use-case copy from `VERTICALS_CONTENT`
**Why it matters:** Google's August 2024 + March 2025 spam updates target "scaled content abuse" — programmatic pages that swap city names but say nothing locally specific. 2,400 near-duplicates of one template is exactly the pattern. Risk of partial deindexing or full manual action.
**Fix:** Either (a) add genuinely city-specific evidence on at least Tier-A cities (real local clients you've worked with, neighbourhood-specific business density, BBMP/local-body context, named local competitors), or (b) shrink the matrix aggressively — keep top 30 cities × top 5 services, drop the 3-way matrix entirely. The 100-city-tier-D pages especially are unlikely to outrank anything and dilute crawl budget.

### F-06 — 🟡 Per-page word count is thin on answer pages
The flagship `/answers/how-much-does-ai-chatbot-cost-india-2026` body strips to **~541 words** of actual prose. For a "100+ comprehensive answers" hub claiming to outrank pricing-intent searches, this is short. Competitors (e.g. comparable WATI/AiSensy/Interakt pricing pages) routinely run 1,200–2,500 words with tables.
**Fix:** Add a pricing comparison table per page, a calculator widget, last-updated date, author byline, and a "sources cited" footer (Meta pricing page, WhatsApp Business changelog, etc.) for E-E-A-T.

### F-07 — 🟡 No `BreadcrumbList` schema anywhere
None of the sampled pages emit `BreadcrumbList` JSON-LD. Google uses this to show the path crumb in SERPs instead of raw URL — a small but free CTR lift, especially on deep programmatic URLs like `/services/ai-chatbots/for/clinics/koramangala`.

### F-08 — 🟢 Schema coverage where it exists is decent
Service/city pages emit `Service` + `FAQPage` + `Organization` (4 JSON-LD blocks). Compare pages emit `Article` + `FAQPage`. Answer pages emit `FAQPage`.

---

## 3. i18n Coverage

### F-09 — 🔴 `SEO_TRANSLATIONS` dictionary is dead code
**What's wrong:** `lib/i18n/seo-translations.ts` is ~600 lines of Tamil/Kannada strings for `serviceCity`, `verticalCity`, `compare`, etc. Grep across the repo finds the constant referenced in **zero** other files. The Tamil/Kannada SEO push exists only on paper.
**Why it matters:** You're shipping Tamil/Kannada nav (header/footer translate fine via `dictionaries/{ta,kn}.ts`) but every actual content page — services, locations, answers, compare — is English-only regardless of locale.
**Fix:** Either delete the file to stop tech-debt rot, or wire it into the programmatic page templates and add `/ta/services/...` + `/kn/services/...` routes.

### F-10 — 🔴 `/ta/services/ai-chatbots/koramangala` returns 404
**What's wrong:** Only the localized homepages (`/ta`, `/kn`) exist. The programmatic matrix lives at `/services/...` (English). There's no `/[lang]/services/...` route. The `<link rel="alternate" hreflang="ta-IN" href="/ta">` in root layout.tsx is technically wrong — `/ta` is only the homepage, not the page for the current URL.
**Why it matters:** Hreflang pointing at the wrong URL confuses Google; Tamil-speaking users clicking the language switcher from a service page get sent to homepage and lose context.
**Fix:** Either (a) build per-page hreflang via metadata in each programmatic page, pointing each language link to the *same path's* localized version (and ship those versions), or (b) drop the hreflang alternates from the global layout and only set them per-page.

### F-11 — 🟡 Tamil homepage title also duplicates brand
`/ta` title: `கட்டுங்கள். ஆட்டோமேட் செய்யுங்கள். பணம் வாங்குங்கள். · ZentroTECH · ZentroTECH`. Same root cause as F-03.

---

## 4. CTAs and Conversion Path

### F-12 — 🔴 The contact form silently discards submissions
**What's wrong:** `app/api/contact/route.ts:47` is the entire production handler:
```ts
console.log("[requirements] new lead", parsed.data);
return NextResponse.json({ ok: true });
```
The comment on line 44 reads `// TODO: wire to Resend / WhatsApp Business API / CRM webhook for real notification routing.`
**Why it matters:** Every form fill on /contact returns the "Got it. We're on it." success screen, but the submission never reaches you. Months of programmatic-SEO traffic could be flowing through this form to nowhere. This is the single highest-impact item in this audit.
**Fix today:** Add Resend / SendGrid / Brevo email send + a Slack/Discord webhook + a WhatsApp template trigger before this lands another lead.

### F-13 — 🟡 Contact page has no per-page metadata
**What's wrong:** `app/(marketing)/contact/page.tsx` starts with `"use client"` (line 1) and exports no `metadata`. Live title falls back to root default: `ZentroTECH — Bangalore's #1 Lead Engine Website Agency`. Meta description is the generic site description.
**Why it matters:** A high-intent commercial query like `"zentrotech contact"` or `"zentrotech quote"` lands on a non-optimized SERP entry.
**Fix:** Split into `contact/page.tsx` (server, exports metadata) + `contact/contact-form.tsx` (client).

### F-14 — 🟢 FloatingCTA actually renders on both viewports
Live DOM check confirms both `md:hidden fixed bottom-0` (mobile bar) and `hidden md:flex fixed bottom-6 right-6` (desktop bubbles) mount. WhatsApp + Phone CTAs are wired. Good.

### F-15 — 🟡 Header "Locations" nav item routes straight to Bangalore
`components/layout/header.tsx:39` sets `{ label: dict.nav.locations, href: "/locations/bangalore" }`. A user in Chennai or Hyderabad clicking "Locations" lands on a Bangalore-specific page instead of the locations index (which does exist at `/locations` and shows all 138 cities).
**Fix:** Change `href: "/locations"`.

### F-16 — 🟢 Contact form Zod validation is solid
Server + client schemas mirror each other. Required fields, lengths, enums, consent checkbox — all correct.

---

## 5. SEO Basics

### F-17 — 🟡 `/about`, `/insights`, `/services` index, `/locations` index — zero JSON-LD
Four of the most-trafficked indexable pages have `application/ld+json` count = 0. Service index in particular should emit a `Service` + `Organization`. About page should emit `AboutPage` + `Organization`.

### F-18 — 🟡 `/about` H1 is off-brand
**Live H1:** `We're building the AI of 2050, today.`
**Site positioning everywhere else:** "Bangalore's #1 Lead Engine Website Agency", "Build. Automate. Get Paid.", "Lead-engine websites + AI automation for Bangalore SMBs."
The /about page is the only place the messaging suddenly becomes "agentic AI for the year 2050" — visionary tone that doesn't match the homepage's SMB-conversion promise. Plus "AI of 2050" is unfalsifiable and reads as marketing puffery; SMB buyers want proof of last quarter, not 25 years out.
**Fix:** Rewrite about page so it tells the founder's specific story, names verifiable milestones, and connects to the "lead engine for Bangalore SMBs" positioning the rest of the site relies on.

### F-19 — 🟢 Canonicals, H1 uniqueness, meta descriptions — present and unique per page
Spot checks across answer, compare, service-city, vertical-city, locations all show unique titles, unique meta descs, unique H1s, single H1 per page. Canonical URLs point to `https://zentrotech.in/...` consistently (good — using the non-www apex as canonical matches the 307 redirect chain).

### F-20 — 🟡 `robots.txt` does not link to `/sitemap.xml`
Live `/robots.txt` lists user-agent rules but no `Sitemap:` directive. Google finds the sitemap via Search Console submission anyway, but Bing/Yandex/others discover sitemap primarily through robots.txt.
**Fix:** Add `Sitemap: https://zentrotech.in/sitemap.xml` to `app/robots.ts`.

### F-21 — 🟡 No 301 from non-www apex
`https://zentrotech.in` returns `307 Temporary Redirect` to `https://www.zentrotech.in/`. Then `https://www.zentrotech.in` returns `307` to `/en`. Two-hop temporary redirect on the root URL — Google handles it but consolidates link equity faster with 301s.
**Fix:** Change Vercel domain settings to permanent redirect; consider single-hop to `/en` directly from apex.

### F-22 — 🟢 Internal linking is healthy
Homepage has 48 unique internal links; all 20 sampled HEAD-checked to 200. The 138-city footer + service grid keeps deep pages reachable.

---

## 6. Performance

### F-23 — 🟡 No `<img loading="lazy">` and no `next/image` usage
Live DOM on programmatic pages shows 2 `<img>` total per page, both the logo, neither lazy. The site uses raw `<img>` tags (`components/layout/header.tsx:56`, `footer.tsx:50`) and `0` occurrences of `_next/image` paths in fetched HTML. That's fine *today* because there are basically no content images — but the moment a blog post or case study with images ships, every image will load eagerly at full size.
**Fix:** Convert to `next/image` (`<Image>` from `next/image`) and add `loading="lazy"` for below-fold images.

### F-24 — 🟡 Two `<canvas>` + magnetic cursor + smooth scroll + framer-motion on every route
Live homepage runs: Starfield (canvas, full-viewport), AgentConstellation3D (canvas, inside hero), MagneticCursor (fixed `will-change-transform`), Lenis smooth scroll, framer-motion LazyMotion + Header entrance animation. Even when each is individually cheap, this stack on a Tier-2 city mobile (single-core ARM, throttled 4G) is heavy. The user note already says "no 3D in production" — but the AgentConstellation3D is still mounted via `agent-constellation-3d-lazy.tsx` on the localized homepage.
**Fix:** Run Lighthouse mobile audit; consider removing the 3D constellation on mobile (`md:` show only), and audit whether MagneticCursor needs to exist at all on a lead-gen site.

### F-25 — 🟡 GA + Clarity + Vercel Analytics + Speed Insights — four telemetry scripts
All four load via `next/script`. That's four DNS lookups + four script downloads on every navigation. The Speed Insights + GA combo overlaps significantly. Audit whether you actually use Clarity recordings — if not, drop it.

---

## 7. Accessibility

### F-26 — 🟢 Skip-to-main link is present
`app/layout.tsx:89` ships a `<a href="#main">Skip to main content</a>` — good.

### F-27 — 🟢 Icon buttons have `aria-label`
WhatsApp/LinkedIn/Twitter/Instagram socials, FloatingCTA buttons, mobile nav, language switcher all have aria-labels. Spot check found 0 buttons without accessible name on the homepage.

### F-28 — 🟢 Decorative logo `alt=""` is correct
Header/footer wordmark "ZentroTECH" is adjacent visible text; the logo `<img alt="">` is the right pattern.

### F-29 — 🟡 No `prefers-reduced-motion` handling visible
Starfield animation, smooth scroll, magnetic cursor, framer-motion entrances all play regardless of `prefers-reduced-motion`. WCAG 2.3.3 + vestibular accessibility guideline. Not a blocker but a small fix worth doing.

---

## 8. Trust / Credibility

### F-30 — 🔴 Zero social proof on the homepage
Live regex scan of `/en` HTML:
- `testimonial`: not found
- `Google review`, `g.page`, `maps.google`: not found
- `clutch.co`: not found
- `case study`: not found
- `Review` / `AggregateRating` schema: not found
- No client logo grid
**Why it matters:** You're asking SMBs for ₹35K-₹8L commitments off a site that has no evidence other businesses bought. Visiting any competitor (Webflow agencies, AiSensy, ConvertWay, Markito) immediately shows founder LinkedIn proof, screenshots of revenue, named client logos, or Trustpilot/Clutch ratings.
**Fix:** Even 3 named client logos + 1 verified Google review screenshot + 1 case study with real numbers (lead count, revenue recovered) on the homepage would change conversion materially. Add `AggregateRating` schema once you have ≥5 verified reviews.

### F-31 — 🟡 "Bangalore's #1 Lead Engine Website Agency" claim is unsubstantiated
The root metadata claims "#1" with no citation. India's ASCI guidelines + Google's product reviews policy both flag unsubstantiated superlatives. Replace with a defensible claim ("Trusted by X Bangalore SMBs since 2026" or just "Bangalore's lead-engine website agency").

### F-32 — 🟡 No author bios on `/insights` posts
Insights are framed as "operator-grade analysis from the ZentroTECH team" — no named author, no LinkedIn link, no headshot, no role. E-E-A-T (Experience-Expertise-Authoritativeness-Trustworthiness) signals are zero. For competing on AI/automation topics in 2026, named authorship is table stakes.

---

## 9. Critical Missing Pages

### F-33 — 🔴 `/privacy`, `/terms`, `/refund` — all 404
Live check confirms all three return 404. Yet:
- The contact form has a consent checkbox: *"I agree to be contacted by ZentroTECH via WhatsApp, phone, or email regarding my enquiry."* — DPDP Act (effective India 2025) requires a linked privacy policy describing what's done with the data.
- Multiple pages advertise a "money-back trial / full refund on first milestone" — a refund policy needs to exist.
- The form collects name, business name, phone, email, city — all "personal data" under DPDP.
**Why it matters:** Legal exposure under DPDP (fines up to ₹250 crore for non-compliance) and Vercel/Cloudflare/Razorpay terms typically require linked legal pages.
**Fix:** Ship `/privacy`, `/terms`, `/refund` this week. Even short, plain-English versions. Footer should link all three.

### F-34 — 🟡 No `/blog` or `/sitemap` HTML page for users
`/sitemap.xml` exists for crawlers but a human-readable sitemap (with category drilldown) is a common SEO + UX feature for sites with 5,047 pages. The `/locations` index already does this for cities — extend the pattern to `/services`, `/answers`, `/compare`.

### F-35 — 🟢 robots.txt present and sensible
Allows GPTBot, ClaudeBot, anthropic-ai — good positioning for AI-search citation. Disallows `/api/`.

### F-36 — 🟢 Sitemap is comprehensive (5,047 URLs)
Includes all locales, services, verticals, locations, 2-way + 3-way matrices, answers, compare, insights, work.

---

## 10. What's Broken

### F-37 — 🟢 No nav 404s
Sampled `/services`, `/locations`, `/about`, `/insights`, `/contact`, `/answers`, `/compare`, `/verticals/clinics`, `/locations/bangalore` — all 200. Programmatic pages with valid slugs return 200.

### F-38 — 🟡 No `/blog` route despite content referring to it
Spot check: no nav item or footer link to `/blog`. Insights live at `/insights`. If you ever advertise `/blog` anywhere (business cards, email signatures, GMB), it 404s.
**Fix:** Add a 301 from `/blog` → `/insights` in `next.config.ts`.

### F-39 — 🟡 Browser console shows 6 errors on programmatic page
On `/services/ai-chatbots/for/clinics/koramangala`, Playwright reported 6 console errors during load (and 1 warning on homepage). These weren't surfaced as visible page-breaks, but should be investigated — could be Clarity/GA failing, font preload mismatches, or hydration warnings.
**Fix:** Open DevTools console on a few production pages and address what's logged.

---

## Severity Summary

| Severity | Count | Items |
|----------|------:|-------|
| 🔴 Critical | 6 | F-05, F-09, F-10, F-12, F-30, F-33 |
| 🟡 Important | 22 | F-02, F-03, F-06, F-07, F-11, F-13, F-15, F-17, F-18, F-20, F-21, F-23, F-24, F-25, F-29, F-31, F-32, F-34, F-38, F-39 (+ 2) |
| 🟢 Nice / verified-ok | 11 | F-01, F-04, F-08, F-14, F-16, F-19, F-22, F-26, F-27, F-28, F-35, F-36, F-37 |

---

## Recommended order of operations

**Week 1 — Stop losing leads + legal exposure:**
1. F-12 (wire `/api/contact` to email + WhatsApp)
2. F-33 (ship privacy + terms + refund)
3. F-13 (fix /contact metadata)
4. F-03 (fix duplicated title tags)

**Week 2 — Trust + content quality:**
5. F-30 (add 3 client logos + 1 testimonial + 1 case study)
6. F-31 (drop the #1 claim or substantiate it)
7. F-18 (rewrite /about to match site positioning)
8. F-06 (deepen at least the top 10 answer pages)

**Week 3 — i18n decision + SEO hygiene:**
9. F-09 + F-10 (decide: ship localized programmatic pages OR delete SEO_TRANSLATIONS + drop /ta /kn from hreflang)
10. F-05 (decide: add real local evidence per city OR shrink the matrix)
11. F-02 (per-template OG images)
12. F-15, F-20, F-21, F-25 (small fixes)

---

*Files referenced in this audit (absolute paths):*
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\app\api\contact\route.ts`
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\app\(marketing)\contact\page.tsx`
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\app\(marketing)\about\page.tsx`
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\app\layout.tsx`
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\app\sitemap.ts`
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\app\services\[slug]\for\[vertical]\[city]\page.tsx`
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\app\services\[slug]\[city]\page.tsx`
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\app\answers\[slug]\page.tsx`
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\components\layout\header.tsx`
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\components\layout\footer.tsx`
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\components\ui\floating-cta.tsx`
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\lib\seo.ts`
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\lib\i18n\seo-translations.ts`
- `c:\Antigravity\TEMP projects\Zentro\zentrotech\lib\data\answers.ts`
