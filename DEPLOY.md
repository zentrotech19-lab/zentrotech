# ZentroTECH — Deployment Guide (Vercel + GoDaddy)

**Status:** GitHub repo pushed. Domain `zentrotech.in` bought on GoDaddy.
**You are 4 steps away from going live.**

---

## Step 1 — Connect Vercel to your GitHub repo (5 min)

1. Go to **[vercel.com/new](https://vercel.com/new)** (sign in if prompted)
2. Click **"Import Project"** → **"Import Git Repository"**
3. If GitHub isn't connected yet: click **"Add GitHub Account"** and authorize Vercel
4. Find **`Techvity/zentrotech`** in the list, click **"Import"**
5. On the "Configure Project" screen:
   - **Project Name:** `zentrotech`
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** Click **"Edit"** → select **`zentrotech`** ← **CRITICAL** (our Next.js app is in this subfolder, not the repo root)
   - **Build Command:** leave default (`next build`)
   - **Output Directory:** leave default (`.next`)
   - **Install Command:** leave default (`npm install`)
   - **Environment Variables:** none needed for V1
6. Click **"Deploy"**

First build takes ~2-3 minutes. You'll get a temporary URL like `zentrotech-xyz.vercel.app` — open it. It should look identical to localhost:3030.

---

## Step 2 — Add your `zentrotech.in` domain in Vercel (2 min)

1. From your project dashboard: click **"Settings"** → **"Domains"**
2. Type **`zentrotech.in`** in the box → **"Add"**
3. When prompted for "Redirect" config, select **"Redirect to www.zentrotech.in"** then add **www.zentrotech.in** separately too. (Best practice: pick one as primary, redirect the other.)
4. Vercel will show DNS records you need to set at GoDaddy — copy them. They'll look like:
   - **Type:** A · **Name:** @ · **Value:** `76.76.21.21`
   - **Type:** CNAME · **Name:** www · **Value:** `cname.vercel-dns.com`

---

## Step 3 — Point GoDaddy DNS to Vercel (5 min)

1. Log into **[GoDaddy](https://account.godaddy.com/products)**
2. Find **`zentrotech.in`** in your products → click **"DNS"** or **"Manage DNS"**
3. **DELETE these default GoDaddy records** (they'll conflict with Vercel):
   - The default A record pointing to GoDaddy's parking page
   - Any default CNAME for `www` pointing to a GoDaddy parking domain
4. **ADD these records** (exactly as Vercel showed in Step 2):

   | Type | Name | Value | TTL |
   |---|---|---|---|
   | **A** | `@` | `76.76.21.21` | 600 |
   | **CNAME** | `www` | `cname.vercel-dns.com` | 600 |

5. **Save changes.** GoDaddy will say "Changes can take up to 48 hours" — in practice it's usually 10-30 minutes.

6. **Go back to Vercel → Settings → Domains** — within 10-30 min you'll see green checkmarks next to both `zentrotech.in` and `www.zentrotech.in`. Vercel auto-provisions HTTPS certificates.

---

## Step 4 — Verify the site is live (5 min)

Once Vercel shows green checkmarks:

- **[https://zentrotech.in](https://zentrotech.in)** — your homepage (auto-redirects to /en)
- **[https://zentrotech.in/en](https://zentrotech.in/en)** — English homepage
- **[https://zentrotech.in/ta](https://zentrotech.in/ta)** — Tamil
- **[https://zentrotech.in/kn](https://zentrotech.in/kn)** — Kannada
- **[https://zentrotech.in/services](https://zentrotech.in/services)** — 10 services + 3D lead funnel hero
- **[https://zentrotech.in/locations/bangalore](https://zentrotech.in/locations/bangalore)** — Bangalore landing page
- **[https://zentrotech.in/verticals/clinics](https://zentrotech.in/verticals/clinics)** — clinics vertical
- **[https://zentrotech.in/llms.txt](https://zentrotech.in/llms.txt)** — LLM discoverability file
- **[https://zentrotech.in/sitemap.xml](https://zentrotech.in/sitemap.xml)** — sitemap for Google
- **[https://zentrotech.in/robots.txt](https://zentrotech.in/robots.txt)** — confirms AI crawlers allowed

---

## Optional but recommended

### Set up email at `hello@zentrotech.in` (used in footer + contact page)

GoDaddy includes basic email forwarding free. Three options:

1. **GoDaddy Email Forwarding** (free, simplest) — forward `hello@zentrotech.in` to your personal Gmail
2. **Zoho Mail Lite Free** (₹0/yr for 5 users) — proper mailbox, 5GB storage, send + receive from `hello@zentrotech.in`. [zoho.com/mail](https://zoho.com/mail)
3. **Google Workspace** (₹125/user/month) — if you want Google Drive + Calendar tied to your domain

For V1, **GoDaddy free forwarding** is enough. Upgrade to Zoho when client volume grows.

### Submit sitemap to Google

1. Go to **[Google Search Console](https://search.google.com/search-console)**
2. Add property → enter `https://zentrotech.in`
3. Verify ownership (Vercel sets DNS, so HTML tag method via Vercel headers is easiest)
4. After verification: **Sitemaps** → submit `https://zentrotech.in/sitemap.xml`

Google will start crawling within 24-48h. Index will populate over 2-4 weeks.

### Submit to AI tools (so they know about you)

- **Bing Webmaster Tools** ([bing.com/webmasters](https://www.bing.com/webmasters)) — Bing also powers ChatGPT search, so submitting here boosts your AI visibility
- **Perplexity AI** auto-discovers sites with `llms.txt` files — no manual submission needed
- **Anthropic / Claude** auto-discovers via ClaudeBot — `robots.txt` already permits it

---

## Future deployments

Every `git push` to `main` auto-deploys to production via Vercel. Workflow:

```bash
# Make changes locally
# Test on localhost:3030 with: cd zentrotech && npm run dev
git add .
git commit -m "your change description"
git push
# Vercel auto-builds + deploys in ~2-3 min, no manual action needed
```

For preview deploys (test before going live): push to any non-`main` branch — Vercel auto-creates a preview URL.

---

## Costs summary

| Item | Cost | Frequency |
|---|---|---|
| `zentrotech.in` domain | ₹1 (year 1, GoDaddy 3-yr promo) + ₹899/yr × 2 | Annual |
| Vercel Hobby plan | **₹0** | Free forever for personal projects |
| GoDaddy email forwarding | **₹0** | Free with domain |
| GitHub private repo | **₹0** | Free unlimited |
| **Total year 1** | **~₹1,801** | One-time + recurring |
| **Total ongoing** | **~₹899/yr** | After year 1 |

Vercel Hobby supports up to 100GB bandwidth/month — easily enough for the first 50,000 unique visitors. Upgrade to Vercel Pro (~₹1,650/mo) only when you start hitting that ceiling.

---

## Troubleshooting

**Vercel build fails:** Check the build logs. Most common: forgot to set Root Directory to `zentrotech` in Step 1. Fix: Settings → General → Root Directory → `zentrotech` → Save → Redeploy.

**Domain shows "pending verification":** DNS propagation. Wait 10-30 min. Check [dnschecker.org](https://dnschecker.org) — paste `zentrotech.in` to see where it's pointing globally.

**HTTPS not working:** Vercel auto-provisions Let's Encrypt within 5-10 min of DNS pointing. If after an hour it's still HTTP only, contact Vercel support.

**404 on `/`:** Means proxy.ts isn't running. Check Vercel Function logs. Usually a one-line fix.

---

## What I'd push next (after going live)

1. **Tamil + Kannada native review** — hire Fiverr copywriter (~₹3-5K each) to polish the drafts before any Tamil/Kannada visitor reads them
2. **Google Business Profile** — register at [business.google.com](https://business.google.com), wire to `zentrotech.in`, request reviews from first clients
3. **About / Work / Insights cleanup** — old global-positioning content still exists on those pages; rewrite for new Bangalore lead-engine wedge
4. **Care Plans dedicated page** — explain the monthly subscription model with comparison table

Ping me when you hit any wall in Steps 1-4 above and I'll talk you through it.
