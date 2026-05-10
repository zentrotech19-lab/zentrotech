# ZentroTECH Deployment Guide

**Welcome!** This guide will walk you, step by step, through taking your shiny new ZentroTECH website live on the internet. No prior coding or DevOps experience needed — if you can copy, paste, and click buttons, you can do this. Plan to set aside about **2 to 3 hours** the first time. Grab a coffee, take it slow, and you'll be a published web operator by the end.

---

## 1. Choosing Your Domain Name

Your domain is your address on the internet. It needs to feel premium, be easy to remember, and reflect that ZentroTECH is a future-forward AI consultancy.

### Recommended Extensions and Pricing

| Extension | Vibe | Approx. Annual Cost (USD) | Best For |
|---|---|---|---|
| `.ai` | Modern, AI-native, premium signal | $70 to $90 / year | Your main brand domain — recommended |
| `.com` | Universal trust, recognized everywhere | $10 to $14 / year | Worth grabbing as a backup or redirect |
| `.tech` | Industry-specific, clean look | $40 to $55 / year | Strong alternative if `.ai` is taken |

> **Tip:** Buy `.ai` as your hero domain AND `.com` as a defensive purchase. The `.com` can permanently redirect to your `.ai` site. Total combined cost is under $110/year.

### Five Candidate Domain Names

1. **zentrotech.ai** — clean, on-brand, ideal flagship
2. **zentro.tech** — short, punchy, memorable
3. **zentrotech.com** — safe, universal fallback
4. **zentro.ai** — premium and very short (likely expensive if available)
5. **getzentro.ai** — action-oriented, great if `zentro.ai` is taken

> **Warning:** Before falling in love with a name, double-check trademark and availability across all three extensions. Avoid hyphens and numbers — they hurt brand recall.

---

## 2. Buying Your Domain

We recommend **Cloudflare Registrar** (cheapest, no markup, free WHOIS privacy) or **Namecheap** (friendlier interface for first-timers).

### Option A: Cloudflare Registrar

1. Go to **dash.cloudflare.com** and click **Sign Up**.
2. Verify your email, then look for the left sidebar item labeled **Domain Registration → Register Domains**.
3. In the search box, type your candidate (e.g., `zentrotech.ai`) and press **Search**.
4. You'll see a results list with green checkmarks for available domains and a price next to each.
5. Click **Purchase** beside your chosen domain.
6. On the checkout screen, fill in your contact details (use your Bangalore business address). Tick **Auto-renew** so you never lose your domain.
7. Pay with card or UPI.

### Option B: Namecheap

1. Go to **namecheap.com**, click **Sign Up** in the top right.
2. After signing in, type your domain into the central search bar and click **Search**.
3. Available domains appear with an **Add to Cart** orange button.
4. Click **View Cart**, then **Confirm Order**.
5. **Skip every upsell** (PositiveSSL, VPN, hosting). You only need the domain.
6. WhoisGuard privacy is **free and on by default** — keep it.
7. Pay and you're done.

> **Tip:** Whichever you choose, in the dashboard you'll later see a **Nameservers** or **DNS** section — that's where the magic happens in Step 5.

---

## 3. Pushing Your Code to GitHub

GitHub is where your website's source code lives. Vercel will read from GitHub to deploy your site.

### Step 1: Create a GitHub Account

1. Go to **github.com** and click **Sign up**.
2. Use your business email (`thespark.forum@ntplind.com` works fine).
3. Pick a username — something professional like `zentrotech` or `zentro-eng`.
4. Verify your email.

### Step 2: Create a New Repository

1. Click the green **New** button (or the **+** icon top right → **New repository**).
2. **Repository name:** `zentrotech-website`
3. **Description:** "Official ZentroTECH website — Next.js 15"
4. Set visibility to **Private** (you can make it public later).
5. **Do NOT** tick "Add a README" or "Add .gitignore" — your local project already has these.
6. Click **Create repository**.

### Step 3: Push Your Local Code

GitHub will show you a page with commands. Open a terminal in your project folder (`c:\Antigravity\TEMP projects\Zentro\zentrotech\`) and run these one at a time:

```bash
git init
git add .
git commit -m "Initial commit: ZentroTECH website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/zentrotech-website.git
git push -u origin main
```

> **Replace `YOUR-USERNAME`** with the GitHub username you just created.

You'll be asked to log in (GitHub now uses a browser pop-up — just click **Authorize**). After a minute, refresh your GitHub repo page — your code is there. Magic.

> **Warning:** Never commit files containing API keys or passwords. Your `.gitignore` already excludes `.env` files — keep it that way.

---

## 4. Deploying to Vercel

Vercel hosts Next.js sites better than anyone. The free tier is generous and perfect for a launch.

1. Go to **vercel.com** and click **Sign Up**.
2. Choose **Continue with GitHub**. Authorize Vercel to access your repos.
3. On the dashboard, click **Add New… → Project**.
4. You'll see your `zentrotech-website` repo in the list. Click **Import** next to it.
5. Vercel auto-detects the framework — you'll see **Framework Preset: Next.js** highlighted. Don't change anything.
6. Leave Build settings on default. Skip Environment Variables for now (we'll add them in Steps 9 and 10).
7. Click the big black **Deploy** button.
8. Wait 60 to 120 seconds. You'll see fireworks (literally — Vercel celebrates) and a preview URL like `zentrotech-website.vercel.app`.

Visit that URL — your site is **live on the internet**. Take a screenshot. You earned it.

---

## 5. Connecting Your Custom Domain

Now let's swap that `vercel.app` URL for your real domain.

### In Vercel

1. Open your project dashboard, click **Settings** (top tab) → **Domains** (left sidebar).
2. In the input box, type your domain (e.g., `zentrotech.ai`) and click **Add**.
3. Vercel will ask whether to also add `www.zentrotech.ai` — say **yes** (it auto-redirects).
4. Vercel now displays the DNS records you need. You'll see something like:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

> **Tip:** Always copy the values directly from your Vercel dashboard — they occasionally update them.

### In Cloudflare or Namecheap

**Cloudflare:**
1. Open your domain → **DNS → Records**.
2. Click **Add record**, paste the **A** record exactly as above. Set **Proxy status** to **DNS only** (gray cloud).
3. Add another record for the **CNAME** the same way.
4. Save.

**Namecheap:**
1. Dashboard → **Domain List → Manage** beside your domain → **Advanced DNS** tab.
2. Click **Add New Record** for each row above.
3. For Namecheap, the "Name" field uses `@` for root and `www` for the subdomain.
4. Save all changes.

Wait 5 to 30 minutes (occasionally up to 24 hours). Vercel will show a green **Valid Configuration** badge once DNS propagates. Visit your domain — you're live with HTTPS automatically.

---

## 6. Google Search Console + Bing Webmaster Tools

Tells search engines your site exists and starts your SEO journey.

### Google Search Console

1. Go to **search.google.com/search-console**, sign in with your Google account.
2. Click **Add property → Domain** (recommended — covers all subdomains).
3. Type `zentrotech.ai` and click **Continue**.
4. Google gives you a **TXT record** — copy it.
5. Pop back into Cloudflare/Namecheap DNS, add a new record: Type `TXT`, Name `@`, Value (the long string Google gave you).
6. Back in Search Console, click **Verify**. If it fails, wait 10 minutes and retry.
7. Once verified, in the left menu click **Sitemaps**, paste `https://zentrotech.ai/sitemap.xml`, click **Submit**.

### Bing Webmaster Tools

1. Go to **bing.com/webmasters**, sign in.
2. Click **Import from Google Search Console** — easiest path. Authorize and Bing pulls everything in.
3. If you'd rather do it manually: **Add a site**, paste your URL, verify via DNS the same way as Google, then submit `/sitemap.xml`.

---

## 7. Google Business Profile (Local Bangalore SEO)

Critical for showing up in Bangalore "AI consultancy near me" searches.

1. Go to **business.google.com**, sign in, click **Manage now**.
2. **Business name:** ZentroTECH
3. **Business type:** Choose **Service business** (you serve clients, not a walk-in store).
4. **Category:** "Software company" or "Business management consultant" (pick the closest).
5. **Service area:** Add Bangalore, then add nearby areas you serve (Whitefield, Koramangala, Indiranagar, etc.).
6. **Contact info:** Phone number + your zentrotech.ai website URL.
7. Google will mail a postcard to your Bangalore address with a verification code. Takes 5 to 14 days. Enter the code in your dashboard when it arrives.
8. While waiting: upload a logo, cover image, 5+ photos of your team/office, and write a 750-character "About" description packed with keywords like "AI consultancy Bangalore", "AI agents", "AI automation".
9. Once verified, ask your first 3 happy clients for Google reviews — these are SEO gold.

> **Tip:** Repeat this whole process for Dubai once you have a UAE address (a coworking address works).

---

## 8. Adding Analytics

### Vercel Analytics (one-click)

1. In your Vercel project dashboard, click the **Analytics** tab.
2. Click **Enable Analytics**. Done. The free tier covers 2,500 events/month — plenty for launch.

### Optional: Plausible or Umami (privacy-friendly, GDPR-safe)

- **Plausible** (`plausible.io`): $9/month, hosted, beautiful dashboard. Sign up, add your domain, paste their script tag into `app/layout.tsx` inside the `<head>`.
- **Umami** (`umami.is`): Free if self-hosted, or $9/month cloud. Same setup pattern.

Either is great. Plausible is the easier choice if you want zero maintenance.

---

## 9. Wiring Up the Contact Form (Resend)

Right now your contact form is stubbed — it doesn't actually send emails. Let's fix that.

### Get a Resend API Key

1. Go to **resend.com**, sign up (free tier = 3,000 emails/month).
2. Click **API Keys** in the sidebar → **Create API Key**. Name it "Production". Copy the key (starts with `re_…`).
3. Click **Domains** → **Add Domain** → enter `zentrotech.ai`. Resend gives you a few DNS records (SPF, DKIM). Add them in Cloudflare/Namecheap. Click **Verify** after a few minutes.

### Add the Key to Vercel

1. Vercel project → **Settings → Environment Variables**.
2. **Name:** `RESEND_API_KEY` · **Value:** paste your key · **Environment:** check all three (Production, Preview, Development) → **Save**.

### Update the Code

In `app/api/contact/route.ts` (your developer will have created this file), the relevant change is roughly:

```ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  await resend.emails.send({
    from: 'website@zentrotech.ai',
    to: 'thespark.forum@ntplind.com',
    subject: `New lead from ${name}`,
    text: `From: ${email}\n\n${message}`,
  });
  return Response.json({ ok: true });
}
```

Push the change to GitHub (`git add . && git commit -m "wire resend" && git push`). Vercel auto-redeploys.

---

## 10. Wiring Up the Real AI Agent Demo

Replace the stubbed chat demo with a real Claude-powered agent.

### Get an Anthropic API Key

1. Go to **console.anthropic.com**, sign up.
2. Click **Settings → API Keys → Create Key**. Name it "Zentro Website". Copy it (starts with `sk-ant-…`).
3. Add a small amount of credit (start with $5 — lasts a long time on Haiku/Sonnet).

### Add to Vercel

Same as before: **Settings → Environment Variables** → `ANTHROPIC_API_KEY` = your key → Save.

### The Code Change

In `app/api/agent/route.ts`:

```ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const { message } = await req.json();
  const reply = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 512,
    system: 'You are ZentroTECH\'s AI assistant. Help visitors learn about our AI consulting services.',
    messages: [{ role: 'user', content: message }],
  });
  return Response.json({ reply: reply.content[0].text });
}
```

Push to GitHub, Vercel redeploys, demo goes live.

> **Warning:** Set a monthly spend cap in the Anthropic Console (Settings → Billing → Limits) so a viral moment doesn't drain your account.

---

## 11. Post-Launch SEO Checklist

Do these in your first week to accelerate rankings.

- [ ] **Submit to B2B directories:** Clutch.co, DesignRush, GoodFirms, The Manifest, Sortlist — all free, all give backlinks.
- [ ] **LinkedIn launch post:** Personal profile + new company page. Tag the Bangalore AI ecosystem.
- [ ] **Product Hunt launch** (optional but great for `.ai` domains).
- [ ] **Press release** via PRLog or OpenPR (free tiers exist) — "ZentroTECH launches in Bangalore".
- [ ] **Twitter/X + Threads** announcement with site link.
- [ ] **Reddit:** thoughtful posts in r/india, r/bangalore, r/artificial — answer questions, link only if relevant.
- [ ] **Wikipedia-adjacent listings:** Crunchbase profile, AngelList/Wellfound profile.
- [ ] **Local citations:** Justdial, Sulekha, Yellowpages.in — boosts Bangalore local SEO.
- [ ] **Schema validation:** Run your homepage through `validator.schema.org` — confirm zero errors.
- [ ] **PageSpeed test:** `pagespeed.web.dev` — aim for 90+ on mobile.

---

## 12. Maintenance: Adding Blog Posts and Updates

Your blog is built on **MDX files** — basically markdown with superpowers. Adding a post is dead simple.

### Adding a Blog Post

1. In your local project, navigate to `content/insights/`.
2. Create a new file like `agentic-ai-for-bangalore-startups.mdx`.
3. At the top add the frontmatter:

```mdx
---
title: "How Agentic AI Is Transforming Bangalore Startups"
date: "2026-05-15"
author: "ZentroTECH Team"
category: "AI Trends"
excerpt: "A look at how agentic AI is changing the startup playbook in India's Silicon Valley."
---

Your post body goes here. Write naturally in markdown.

## A subheading

Lists, **bold**, [links](https://zentrotech.ai), images — all work.
```

4. In your terminal:

```bash
git add .
git commit -m "Add blog post: agentic AI for Bangalore startups"
git push
```

5. Vercel auto-deploys within 60 seconds. Refresh `zentrotech.ai/insights` — your post is live.

### General Updates

Same workflow for any change: edit, commit, push. Vercel handles the rest. **You never touch a server.**

> **Tip:** Aim for 1 blog post per week for the first 3 months. Long-tail keywords compound. SEO is slow to start but exponential to grow.

---

## You Did It

You now own a live, professional, AI-native website with custom domain, analytics, working contact form, real AI agent demo, and a maintenance flow that takes minutes per update.

Welcome to the internet, ZentroTECH. Now go land your first 10 clients.
