# ZentroTECH — Research & Strategy Archive

**Created:** 24 May 2026
**Status:** All research complete. **Execution paused per founder direction** — site stays as-is, this archive sits in the project for future reference.

When you come back to this in a week or three months, **start with `strategy-briefing.html`** — that's the master document. Everything else is the supporting evidence.

---

## 📄 Read in this order

### 1. `strategy-briefing.html` ⭐ START HERE
The single visual master document. Combines:
- The strategic verdict (productized services + Kannada voice wedge)
- Market snapshot stats
- Top 3 competitors that change our plan
- Top 5 demand-side findings
- Reddit market position
- Pricing landscape table with our recommended tiers
- 14-day action sequence (when ready to execute)
- Full source library (all hyperlinks clickable, collapsible)

### 2. `competitor-action-report.html`
Earlier visual that focused on just the 3 competitor findings. Strategy-briefing.html supersedes it but this is shorter if you only want the supply-side.

### 3. `audit-report.html`
The site-audit visual from earlier in the day. Shows 13 site fixes already shipped + remaining nice-to-haves. Most issues already resolved.

---

## 📚 The 6 deep research markdown reports

These are the long-form sources behind the visuals above. Each is 2,500–7,000 words. Read only the section you need.

| File | Words | What's inside | When to read |
|---|---:|---|---|
| `competitor-deep-intel.md` | ~3,100 | 35 competitors profiled (BSPs, agencies, freelancers, voice-AI builders) + pricing landscape + opportunities | Before any positioning decision |
| `demand-side-scan.md` | ~6,100 | What Indian SMBs actually search & ask. Quora threads, search-volume estimates, 45-row content brief table | Before any SEO / content sprint |
| `linkedin-30day-playbook.md` | ~6,500 | Profile copy + 30 daily post drafts + 50 connection targets + engagement workflow | When ready to publish on LinkedIn |
| `twitter-30day-playbook.md` | ~4,500 | Profile polish + 30-day reactive calendar + 38-account follow list + format rules | When ready to publish on X |
| `reddit-playbook.md` | ~3,000 | Tier-3 channel assessment + account hygiene + warmup plan + subreddit map | If/when we want to invest in Reddit |
| `competitor-social-scan.md` + `twitter-landscape-scan.md` | ~2,500 each | Older quick scans, mostly superseded by competitor-deep-intel | Skim only if specific competitor research needed |
| `audit-findings.md` | ~2,500 | The original 39-finding site audit. Most criticals already fixed. | Reference for the bug-fix history |

---

## 🌐 Live website state (as of 24 May 2026)

Nothing else changes unless you decide to ship the action sequence.

| Item | Status |
|---|---|
| **Site URL** | `https://zentrotech.in` (apex redirects to `https://www.zentrotech.in/en`) |
| **Total pages** | 5,050 URLs in sitemap |
| **Page types live** | Home, Services index, Service × City (1,380), Service × Vertical × City (2,400), Vertical × City (1,104), Locations (138), Answers (100), Compare (20), Insights (5+), Privacy / Terms / Refund, Contact, About |
| **Analytics wired** | Vercel Analytics + Speed Insights + GA4 (`G-T55FHNYHSM`) + Microsoft Clarity (project `ww07o8n3d7`) |
| **Search engines notified** | Google Search Console (sitemap resubmitted), IndexNow (Bing/Yandex/Naver, all 5,050 URLs HTTP 200) |
| **Lead capture** | Form → `/api/contact` → Google Apps Script webhook → Google Sheet (`ZentroTECH Leads`) + Gmail notification + WhatsApp fallback URL — **tested end-to-end, working** |
| **Translation dictionary** | en/ta/kn (Tamil + Kannada) shipped but NOT wired into pSEO pages (English-only renders today; ta/kn ready when we decide to localize) |

---

## 🔑 External assets created today

| What | URL / Identifier | Owner |
|---|---|---|
| **Google Sheet — Leads** | `docs.google.com/spreadsheets/d/1OQs1qAMwJq2XsEstPld_xcCAWHb0kWk2_f25vk6FNgU` | Zentrotech19 Gmail |
| **Apps Script webhook** | `script.google.com/macros/s/AKfycbyPpgoF1t6iC_a2eNjRM6jiqY0Pxv-KvghYDA3SSnrFlj8Gb5C8_YLuygSP1jTRyM2qpg/exec` | Zentrotech19 Gmail (Web App, anonymous access) |
| **Vercel env var `LEAD_WEBHOOK_URL`** | (matches above) | Vercel project zentrotech |
| **Google Analytics 4 property** | `G-T55FHNYHSM` (property "zentrotech.in", INR currency, IST timezone) | Zentrotech19 Gmail |
| **Microsoft Clarity project** | `ww07o8n3d7` | Zentrotech19 Gmail |
| **IndexNow key** | `cb6a82d72d99c4293a17e6454b7bf50e` (key file at `/cb6a82d72d99c4293a17e6454b7bf50e.txt`) | Zentrotech19 Gmail |

---

## 📱 Social media accounts (created, profiles set, no posts yet)

| Platform | Handle | State | Notes |
|---|---|---|---|
| **X / Twitter** | `@ZentroTECH19` | Logged in, bio + location + logo set, header skipped | Day 1 launch post drafted in `twitter-30day-playbook.md` but NOT posted |
| **LinkedIn personal** | "Zentro Tech" (created via Google sign-up) | Logged in, profile bare | Profile copy ready in `linkedin-30day-playbook.md` but NOT applied |
| **LinkedIn Company Page** | Not yet created | Blocked — LinkedIn requires 5+ first connections on the personal profile | Reattempt after connections grow |
| **Reddit** | `u/Wide-Assistant-7621` (Reddit auto-assigned) | Logged in, no activity | Generic handle is correct for Reddit per playbook — keep it |
| **Instagram** | Not yet created | Parked — needs phone OTP from you | Re-attempt when you want |
| **Bing Places** | Not yet created | Parked — OAuth popup blocked earlier automation | Easy to do manually when you want |
| **Google Business Profile** | Existing, partially configured | User handling directly | Phase 1 fixes still pending per earlier prompts |

---

## ⏸️ Decisions on hold (revisit when ready)

1. **Business model path** — pure services vs productized services vs hybrid vs SaaS vs info-product. My recommendation in the strategy briefing: **start with productized services + free tools, evolve to hybrid (services + internal SaaS) over 12 months.**

2. **Positioning wedge** — generic "lead engine for Indian SMBs" vs the tighter "Kannada-first AI voice agents for Bangalore SMBs." The demand-side data strongly favours the tighter wedge.

3. **Pricing publication** — ship `/pricing` page with 3 tiers? Or keep "Talk to us"? Three tiers are drafted in the strategy briefing.

4. **Launch posting cadence** — when to begin daily LinkedIn + X content. Day 1 drafts ready.

5. **Custom Bolna AI / Ringg AI partner-program outreach** — early-mover advantage. Drafts can be written in 20 min when you say go.

6. **Vertical landing pages** — dental, coaching, wedding photogs, sub-broker real estate, contractors. None of which has a competitor landing page in Bangalore. Existing programmatic-SEO pipeline can produce these in 1 week.

---

## 🏷️ Quick reference: project memory

Two persistent rules saved in this assistant's memory for future sessions:

1. **No 3D in production** — do not push 3D mascot/animation work to prod; keep on feature branches until quality bar is met.
2. **Privacy: never reference the user's personal email** (`thespark.forum@ntplind.com`) anywhere. Business email (`hello@zentrotech.in`) is public.

---

## 🔁 How to pick this back up later

**Easiest path:**
1. Open `strategy-briefing.html` in Chrome
2. Read the verdict (top), the action sequence (bottom), and skim the rest
3. Tell the assistant: *"I want to execute step N from the strategy briefing's action sequence"*
4. Or: *"I want to deepen research on X first"*

Everything's catalogued. Nothing's lost. Site is healthy and live.
