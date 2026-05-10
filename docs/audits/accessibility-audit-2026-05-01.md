# Accessibility Audit — ZentroTECH (2026-05-01)

Auditor: senior a11y reviewer · Standard: WCAG 2.2 AA · Method: full source review of `zentrotech/components/**` + `zentrotech/app/**` (the dev server at `localhost:3000` was serving an unrelated Techvity build, so audit is source-driven).

## WCAG 2.2 AA Compliance Score
**~62 / 100** (medium confidence). The site has a strong contrast foundation and uses semantic landmarks (`header`, `main`, `nav`, `footer`, `article`, `section`), but it ships several blocking issues: pinned GSAP scroll, decorative WebGL canvases without `aria-hidden`, form without programmatic error / success announcements, no skip link, sub-44px touch targets, and missing focus-visible rings on links.

---

## Critical Violations (must fix)

### C1 — 3D canvases not hidden from assistive tech (1.1.1, 4.1.2)
**Severity: critical** · Files:
- `components/3d/neural-orb.tsx:43-58`
- `components/3d/globe-scene.tsx:48-60`
- `components/3d/particle-galaxy.tsx:39-47`

The Canvas elements render decorative WebGL scenes with no text alternative and no `aria-hidden`. Screen readers may announce a focusable, label-less `<canvas>`. The Globe additionally **conveys information** (office locations) that exists nowhere in accessible form on the page that uses it (`components/sections/globe-section.tsx`) — though the OFFICES list adjacent does cover this content, the Globe itself should be marked decorative.

**Fix:**
```tsx
<div className={className} aria-hidden="true" role="presentation">
  <Canvas ... tabIndex={-1}>
```
For the globe, also add `tabIndex={-1}` to the Canvas to prevent keyboard focus on `<canvas>`.

### C2 — ProcessTimeline pinned horizontal scroll inaccessible to keyboard (2.1.1, 2.2.2)
**Severity: critical** · File: `components/sections/process-timeline.tsx:24-45`

`gsap.scrollTrigger` with `pin: true` and `scrub: 1` ties step content to mouse-wheel/trackpad scroll. Keyboard users (PageDown / arrow keys / Space) on desktop will visually pin without advancing through steps; screen-reader users get an unmotivated long blank. Mobile fallback (lines 49-63) is fine.

**Fix:** Either disable the pin/scrub when `prefers-reduced-motion: reduce` is set (currently only viewport width is checked) OR provide an arrow/dot navigation that advances `x` translation on keyboard activation. Minimum:
```tsx
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
if (window.matchMedia("(max-width: 1024px)").matches) return;
```
Even with that, sighted keyboard users on desktop still cannot drive the scrub — recommend rendering the mobile stacked variant for everyone and removing the GSAP scrub entirely, or use `snap` plus next/prev buttons.

### C3 — Form has no live region for submission feedback (4.1.3)
**Severity: critical** · File: `app/(marketing)/contact/page.tsx:71-75`

Submit button text mutates to "Message sent ✓" and a `<p>` confirmation appears, but neither is in an `aria-live` region. Screen-reader users get no notification that the form succeeded.

**Fix:**
```tsx
<p role="status" aria-live="polite" className="text-cyan-glow text-sm">
  Thanks — we'll respond within 1 business day.
</p>
```
Also surface the success outside the conditional render so it isn't removed-then-readded each cycle (use `aria-hidden` toggling instead).

### C4 — No skip-to-content link (2.4.1)
**Severity: critical** · File: `app/layout.tsx:54-66`

Keyboard users must tab through Header logo + 5 nav links + Book-a-Call + Mobile-menu trigger before reaching `<main>`. WCAG 2.4.1 requires a skip mechanism.

**Fix:** Add as first child of `<body>`:
```tsx
<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:bg-indigo focus:text-white focus:px-4 focus:py-2 focus:rounded">
  Skip to content
</a>
<main id="main" className="pt-20">{children}</main>
```

### C5 — Inputs lose focus indicator entirely (2.4.7)
**Severity: critical** · File: `app/(marketing)/contact/page.tsx:43,47,52,56,69` and `components/demos/agent-chat-demo.tsx:105`

All form fields use `focus:outline-none focus:border-indigo`. The 1px indigo border on a white/10 border is **not a sufficiently distinct focus indicator** — and on the chat input there is no border swap at all (`focus:bg-white/10` only). Fails 2.4.7 Focus Visible and the new 2.4.11 Focus Not Obscured guidance.

**Fix:** Apply the same `focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void` pattern already used in `components/ui/button.tsx:8` to all inputs/selects/textareas.

---

## Serious Issues

### S1 — Touch targets below 44×44 CSS px (2.5.8 Target Size — AA in WCAG 2.2)
**Severity: serious**
- `components/layout/mobile-nav.tsx:14-20` — open button is `p-2` + `size-5` icon = ~36×36 px hit area.
- `components/layout/mobile-nav.tsx:31-37` — close button is `p-2` + `size-6` icon = ~40×40 px.
- `components/layout/footer.tsx:24-35` — social icons are `size-9` (36×36 px).
- `components/demos/agent-chat-demo.tsx:107` — send button is `size-10` (40×40 px).

WCAG 2.2 requires a 24×24 minimum for the new 2.5.8 AA criterion (so these technically pass that), **but** the recommended 44×44 from 2.5.5 (AAA) is still industry baseline. At minimum, increase mobile-nav and footer icon buttons to `size-11` (44px) or add invisible padding via `p-3`.

### S2 — No `aria-current` on active nav link (4.1.2)
**Severity: serious** · Files: `components/layout/header.tsx:42-52`, `components/layout/mobile-nav.tsx:39-55`, `components/layout/footer.tsx:41-49`

Screen-reader users cannot tell which page they're on from the nav.

**Fix:** Use `usePathname()` and conditionally apply `aria-current="page"`:
```tsx
const pathname = usePathname();
<Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} ...>
```

### S3 — Decorative icons not hidden from screen readers (1.1.1)
**Severity: serious** · Multiple files

Lucide icons rendered alongside visible text labels (e.g. `<ArrowRight className="size-4" />` in `components/sections/cta-section.tsx:21`, `<Send />` in `app/(marketing)/contact/page.tsx:72`, `<MapPin>`, `<Mail>`, `<Phone>`, `<Clock>` throughout) inherit `<svg>` semantics and may be announced as "graphic". Also the social icons in `components/layout/footer.tsx:25-35` rely on the parent `<a aria-label>`, but the inner `<svg>` is still in the AT tree.

**Fix:** add `aria-hidden="true"` to every decorative icon. Lucide accepts it directly: `<ArrowRight aria-hidden="true" className="size-4" />`.

### S4 — Mobile nav focus management & escape (2.1.2, 2.4.3)
**Severity: serious** · File: `components/layout/mobile-nav.tsx:9-67`

The dialog overlay:
- has no `role="dialog"` or `aria-modal="true"`
- does not trap focus inside the panel (Tab escapes to the still-mounted page behind it)
- doesn't return focus to the trigger button on close
- doesn't close on `Escape`
- doesn't lock body scroll

**Fix:** Use `<Dialog>` from Radix or Headless UI, or implement focus trap + Escape listener + `useRef` to restore focus.

### S5 — `dangerouslySetInnerHTML` in TextScramble + decorative motion (1.4.5, 2.3.3)
**Severity: serious** · File: `components/animations/text-scramble.tsx:51`

The scramble effect runs unconditionally (no `prefers-reduced-motion` check). It also injects HTML — though authored, it's still a pattern to remove. While the global CSS rule at `globals.css:115-122` neutralizes CSS animations, this animation is JS-driven and ignores the rule. Same for `AnimatedCounter` (`components/animations/animated-counter.tsx`) which uses framer-motion `useSpring` without `useReducedMotion()`.

**Fix:**
```tsx
import { useReducedMotion } from "framer-motion";
const reduce = useReducedMotion();
useEffect(() => { if (reduce) { setOutput(text); return; } /* ...scramble */ }, [text, reduce]);
```
For framer-motion sections, wrap the app in `<MotionConfig reducedMotion="user">` in `app/layout.tsx`.

### S6 — MagneticCursor only checks pointer, not motion preference (2.3.3)
**Severity: serious** · File: `components/animations/magnetic-cursor.tsx:13-15`

```ts
if (window.matchMedia("(pointer: coarse)").matches) return;
```
A user on a desktop with `prefers-reduced-motion` still gets the springy cursor and may experience vestibular discomfort. Add the second check.

### S7 — Form has no programmatic required indication or error handling (3.3.1, 3.3.2, 4.1.2)
**Severity: serious** · File: `app/(marketing)/contact/page.tsx:39-75`

`required` is on the inputs (good for native validation) but:
- No visible "*" or "(required)" text
- No `aria-required="true"` (redundant with `required` for AT but explicit is better)
- No `aria-describedby` to announce help text or errors
- onSubmit always succeeds — no error path; if a user submits with an invalid email, only the browser tooltip fires (and that bubble is not consistently accessible).

**Fix:** Add visible "Required" indicator next to the labels for name/email/message; render an error region with `role="alert"` for validation failures.

---

## Best-Practice Improvements

### B1 — Logo marquee text contrast (1.4.3)
File: `components/sections/trust-signals.tsx:24`. Logos render `text-white/30`, which on `#0a0a0f` resolves to roughly **2.9:1 contrast** — under AA 3:1 for non-text/UI and well under 4.5:1 for body text. They are decorative-ish but readable text.
**Fix:** raise to `text-white/60` or wrap in `<span aria-hidden="true">` and add a real client-list section.

### B2 — Aurora-gradient headings risk failing contrast at smaller sizes (1.4.3)
File: `app/globals.css:65-70`. The `text-aurora` gradient mixes `#6366f1` (~3.4:1 on void), `#8b5cf6` (~4.0:1), `#ec4899` (~5.3:1). At hero sizes (`text-7xl`) these are *large text* and pass at 3:1, but the same class is used inside small spans (e.g. `components/layout/header.tsx:34` "Z" letter, `text-xs` in `components/sections/process-timeline.tsx:57`). Audit each usage; restrict `.text-aurora` to ≥24 px (text-2xl) text or explicitly check ratio per usage.

### B3 — Watermark category labels on insight cards
Files: `components/sections/insights-preview.tsx:28`, `app/(marketing)/insights/page.tsx:35`. `text-white/10` is intentionally a watermark — wrap in `aria-hidden="true"` so screen readers don't read "Engineering Engineering" twice.

### B4 — `<html lang="en" className="dark">` is fine, but consider `<html dir="ltr">` explicit
File: `app/layout.tsx:56`. Future-proofing if Arabic content is added (Dubai market).

### B5 — TextScramble emits `<span>` markup via `dangerouslySetInnerHTML`
File: `components/animations/text-scramble.tsx:51`. Mid-scramble, the announced text is gibberish. Wrap the visible scrambled string in `aria-hidden="true"` and keep the final `text` prop in a visually hidden but AT-readable mirror.

### B6 — Footer "Built with Next.js. Hosted on Vercel." adds no value
File: `components/layout/footer.tsx:67`. Cosmetic, but it adds a line for screen-reader users to skip.

### B7 — `<span>` Badges with icons lack semantics
File: `components/ui/badge.tsx:3-13`. Generally fine; just confirm no `<Badge>` is used as the only label for an interactive element (none seem to be).

### B8 — Headings hierarchy
- Home (`app/page.tsx`): one `<h1>` in Hero, then h2s for each section, h3s inside cards. Order is logical.
- Contact (`app/(marketing)/contact/page.tsx`): single h1 ✓, then h3 in office cards (line 88) skips h2. **Should be h2** since these are top-level region headings on the page.
- About: h1 then multiple h2s ✓, h3s in value cards ✓.
- Showcase, Services, Insights, Work: each has single h1, then h2s ✓ — though Showcase line 47 jumps directly from h1 to h2 (good), but the `Card` components in `components/ui/card.tsx:23` hard-code h3, which works only if the parent context already has an h2. On the Showcase page (line 47) the h2 exists so the h3 cards are fine.

### B9 — Aurora background `<div>` carries `pointer-events-none` but is `-z-10` and absolute
File: `components/animations/aurora-background.tsx:14`. The decorative blobs are correctly excluded from interaction. No fix needed.

---

## What's Done Well

- Single semantic `<main>` landmark in `app/layout.tsx:61`, with `<header>`, `<nav>`, `<footer>`, `<article>` used throughout.
- Color contrast for body text: `text-text-muted` `#9ca3af` on `#0a0a0f` = **7.31:1** (passes AA body) — good baseline. `text-text-secondary` `#e5e7eb` ≈ 16:1.
- `text-indigo-glow` `#818cf8` on void ≈ **6.79:1** — passes AA for body.
- Buttons (`components/ui/button.tsx:8`) use `focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-void` — correct pattern that should be propagated to inputs/links.
- Mobile menu trigger and close buttons have proper `aria-label="Open menu"` / `aria-label="Close menu"`.
- Footer social icons all carry `aria-label` (LinkedIn, Twitter, GitHub, Instagram).
- Marquee duplicates content with `aria-hidden` on the second copy (`components/animations/marquee.tsx:25`) — correct.
- Form fields wrap input in `<label>` (implicit association) — works for AT.
- Global `prefers-reduced-motion` CSS rule at `app/globals.css:115-122` neutralizes all CSS keyframe animations and transitions.
- `SmoothScrollProvider` checks reduced-motion before initializing Lenis (`components/animations/smooth-scroll.tsx:9`).

---

## Recommended Fixes (ranked by impact)

1. **Add skip link** in `app/layout.tsx` and an `id="main"` on `<main>`. (C4)
2. **Add `aria-hidden="true"` and `tabIndex={-1}` to all 3D Canvas wrappers** in `components/3d/*.tsx`. (C1)
3. **Wire the contact form to `role="status" aria-live="polite"`** in `app/(marketing)/contact/page.tsx`; mark required fields visibly and via `aria-required`. (C3, S7)
4. **Replace inputs' `focus:outline-none focus:border-indigo` with the Button's `focus-visible:ring-*` pattern.** Single sed-style change in `app/(marketing)/contact/page.tsx` and `components/demos/agent-chat-demo.tsx`. (C5)
5. **Drop GSAP pin/scrub in `components/sections/process-timeline.tsx`** for keyboard users — gate on `(prefers-reduced-motion: reduce)` and `pointer: coarse`, render stacked variant otherwise. (C2)
6. **Wrap the app in `<MotionConfig reducedMotion="user">`** in `app/layout.tsx`, and add `useReducedMotion()` guards in `text-scramble.tsx`, `animated-counter.tsx`, and `magnetic-cursor.tsx`. (S5, S6)
7. **Refactor `components/layout/mobile-nav.tsx` into a real dialog** (Radix `<Dialog>` recommended): `role="dialog"`, `aria-modal`, focus trap, Escape, body scroll-lock, focus return. (S4)
8. **Bump touch targets**: mobile-nav `p-2` → `p-3`; footer social icons `size-9` → `size-11`. (S1)
9. **Add `usePathname()`-driven `aria-current="page"` to nav `<Link>` components** in header, mobile-nav, footer. (S2)
10. **Add `aria-hidden="true"` to every Lucide icon that sits next to a text label** (Send, ArrowRight, MapPin, Phone, Mail, Clock, Sparkles, etc.). (S3)
11. **Raise marquee logo opacity** in `components/sections/trust-signals.tsx:24` from `text-white/30` to `text-white/60` to clear 4.5:1, or mark decorative. (B1)
12. **Promote office card `h3`s to `h2`s** in `app/(marketing)/contact/page.tsx:88`. (B8)
13. **Mark watermark category labels `aria-hidden`** in `components/sections/insights-preview.tsx:28` and `app/(marketing)/insights/page.tsx:35`. (B3)
14. **Audit every usage of `.text-aurora`** to ensure the gradient is only applied at ≥24 px sizes; otherwise replace with `text-indigo-glow`. (B2)

Implementation effort estimate: ~1.5 days for all critical + serious issues; another 0.5 day for best-practice cleanup.
