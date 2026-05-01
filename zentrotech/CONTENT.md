# ZentroTECH Content Customization Guide

This guide lists every place you need to swap placeholder content for your real branding/content.

## 1. Brand & Site Constants — `lib/constants.ts`

Update:
- `SITE.url` — your real domain
- `SITE.email` — your real contact email
- `SITE.phone` — your real phone
- `SITE.tagline` — your final tagline (current: "Engineering the AI of 2050, today.")
- `OFFICES[].address`, `phone`, `email` — real office info for Bangalore + Dubai
- `SOCIAL.*` — your real social profile URLs

## 2. Logo & Favicon

- `app/icon.tsx` or `public/favicon.ico` — replace with your logo
- `public/og/default.png` — create a 1200x630 OG image
- The logo "Z" gradient mark in `components/layout/header.tsx` and `footer.tsx` — replace with your logo if you have one

## 3. Case Studies — `content/work/*.mdx`

Replace the 3 sample case studies (`acme-corp-automation.mdx`, `vertex-labs-agent-platform.mdx`, `nimbus-ai-website.mdx`) with real client work. Each file has frontmatter:

```yaml
---
client: "Real client name"
title: "Real outcome-focused title"
excerpt: "1-2 sentence summary"
industry: "Industry"
service: "AI Service category"
results:
  - { label: "Metric", value: "Number" }
---
```

## 4. Insights / Blog — `content/insights/*.mdx`

Sample posts are real-quality opinion pieces. Either keep them attributed to "ZentroTECH Research" or rewrite under your team's voice. Add new posts by dropping new `.mdx` files in this folder.

## 5. Trust Logos — `components/sections/trust-signals.tsx`

The `LOGOS` array contains placeholder client names. Replace with real client names (or company logos as `<img>` if you have them).

## 6. Metrics — `components/sections/trust-signals.tsx`

The `METRICS` array (47+ AI agents, 12 countries, etc.) — update with your real numbers.

## 7. Contact Form — `app/(marketing)/contact/page.tsx`

Currently the form is a demo (just shows "Message sent ✓"). To wire it up:

1. Sign up for [Resend](https://resend.com) or your preferred email provider
2. Add the API key to `.env.local`: `RESEND_API_KEY=re_xxx`
3. Create `app/api/contact/route.ts` to POST form data to Resend
4. Update the form's `onSubmit` to POST to `/api/contact`

## 8. Calendar Booking

The "Book a discovery call" CTA currently links to `/contact`. To replace with Cal.com or Calendly:
1. Sign up and create a booking link
2. Either embed via their widget on `/contact`, or replace the button `href` site-wide

## 9. Real AI Agent Demo Backend — `components/demos/agent-chat-demo.tsx`

Currently scripted responses. To wire to a real LLM:
1. Create `app/api/chat/route.ts` that streams from OpenAI/Anthropic
2. Replace the `reply()` function in the demo with a fetch to that route

## 10. SEO Open Graph Image

Create `/public/og/default.png` (1200x630) with your logo + tagline.

## 11. Domain & Deployment

1. Push to GitHub
2. Connect to Vercel (zero config — auto-detects Next.js)
3. Set custom domain in Vercel dashboard
4. Update `SITE.url` in constants.ts to match
