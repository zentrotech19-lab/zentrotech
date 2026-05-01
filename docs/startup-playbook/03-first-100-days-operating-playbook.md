# ZentroTECH — First 100 Days Operating Playbook

**Date:** 2026-05-01
**Owner:** Founder, ZentroTECH (Bangalore)
**Goal:** From zero clients to 3 paying clients and $20–30K MRR within 6 months.
**Status:** Operating doc. Update weekly. Print page 1 and tape it to the wall.

---

## How to use this doc

This is not a strategy paper. It's a sequence. Read Part 1 today, decide your wedge by end of week, then run the rest in order. Every section ends with concrete actions you can do this week. If a section feels theoretical, you're reading it wrong — go back and pick the one tactic, do it, come back.

Operator rule: **Sales > Marketing > Product > Hiring**. In that order. For 100 days, you sell.

---

## Part 1 — Positioning + Pricing Decisions Before Day 1

### The wedge problem

A new consultancy with no logos that says "we do AI for everyone" closes nothing. You need a wedge — a knife-thin first offer that one specific buyer recognizes as "this is for me." You can broaden later. Fractal didn't start as Fractal.

#### Five wedge candidates (pick one)

1. **"Agentic SDR for B2B SaaS in India" (₹3–8L deployment + ₹1.5L/mo)** — You build a Claude-powered outbound SDR agent that researches accounts, writes personalized emails, books meetings into Cal.com. Buyer: 20–80 person SaaS founders in BLR/Pune/Gurgaon who can't afford 4 SDRs.
2. **"AI Ops audit + automation sprint for Dubai SMEs" ($8K audit, $25–60K build)** — 2-week audit of an SME's ops (sales, support, finance), then automate 3 workflows with n8n + Claude. Buyer: family-owned trading/logistics businesses in DIFC/JAFZA.
3. **"Agentic coding pods for US Series A/B startups" ($18–30K/month per pod)** — Embedded 1 senior + 1 mid engineer who ship code 5–10x faster using Claude Code, Cursor, custom agents. Buyer: VP Eng at 30–150 person US startups under hiring freeze.
4. **"AI-powered website + lead engine for premium services firms" ($15–35K project)** — You design + build a Next.js site like ZentroTECH's own, with an embedded AI agent that qualifies leads. Buyer: law firms, architects, consulting boutiques in UK/UAE.
5. **"LLM evaluation + reliability for regulated industries" ($30–80K projects)** — You build eval harnesses, red-team prompts, and observability for fintech/health AI features. Buyer: Head of AI at Indian fintech, UAE bank innovation labs.

#### Criteria for picking your wedge (score 1–5 each)

| Criterion | Why it matters |
|---|---|
| Founder unfair advantage | Can you actually do this Monday morning? |
| Buyer can be reached cold | Is there a LinkedIn search that returns 500+ ICPs in your city? |
| Budget exists today | Are people already spending money on this problem? |
| Time-to-value < 30 days | Can you show ROI inside one quarter? |
| Repeatable, not bespoke | Will engagement #4 look like #1 with 60% reuse? |
| Path to $30K MRR | Does 2–3 logos × deal size get you there? |

**Recommended for ZentroTECH:** Wedge #1 (Agentic SDR for Indian B2B SaaS) as primary, with Wedge #2 (Dubai SME audit) as secondary 60 days in. Indian SaaS is reachable from BLR, talks fast, pays in INR (no FX/banking pain), and gives you 3 logos quickly. Dubai is your higher-margin upgrade path.

### Pricing — actual 2026 numbers

Don't anchor on Indian dev shop rates. You're an AI consultancy, not body-shop. Price by region.

| Engagement | India (INR/USD) | Dubai/UAE (USD) | USA/UK (USD) |
|---|---|---|---|
| Discovery / strategy sprint (2 wk) | ₹3–6L ($3.6–7.2K) | $8–15K | $12–25K |
| Build sprint (4–6 wk, fixed scope) | ₹8–18L ($9.5–22K) | $25–60K | $40–90K |
| Embedded pod (per engineer/month) | ₹4–7L ($4.8–8.5K) | $12–18K | $18–28K |
| Monthly retainer (advisory + on-call) | ₹1.5–4L ($1.8–4.8K) | $5–10K | $8–15K |
| Day rate (workshop / training) | ₹60–90K ($720–1.1K) | $2.5–4K | $3.5–6K |
| Hourly (avoid — see below) | ₹6–10K | $200–300 | $250–400 |

Founder personal day rate floor — **never bill your time below $1,000/day equivalent**. Below that, you can't fund the business.

### The free pilot trap

**Default rule: don't do free work.** Reasons:

1. Free clients don't show up to meetings. Paying clients do.
2. Free pilots have no completion criteria, so they never end.
3. The case study from a free pilot is worth less than from a paid one — the buyer reading it knows.
4. You set a price anchor of zero. The "convert to paid" conversion rate is brutal (~10–20%).

**When a paid pilot is fine** (and you should structure it):
- 2-week paid discovery for 30–50% of normal rate ($3–5K) with a clear "go/no-go to full build" decision date.
- "Scoping engagement" — $2.5K, fixed deliverable: a written 10-page tech spec they own. Becomes the SOW for the build.

**When truly free is OK** (rare, deliberate):
- The client is a top-15 logo in your target segment AND you negotiate explicit case study + 3 named introductions in writing.
- A 2-hour workshop, not a build. Never give away build.

### Lead with what?

**Lead with project + retainer combo.** Hourly = race to the bottom and you spend half your time tracking time. Day rate is fine for workshops. Project = clear deliverable, fixed scope, fixed price, 50% upfront. Retainer = recurring revenue post-project.

Standard ZentroTECH offer shape:

> **Sprint 0** ($3–5K, 2 weeks) → **Build project** (₹10–25L / $25–60K, 4–8 weeks) → **Care & feed retainer** ($2–8K/mo, ongoing).

This is the path to predictable MRR.

---

## Part 2 — Tools Stack for Day 1

Buy the cheapest tier of everything. Upgrade only when the tier is actively blocking revenue. Below: founder-only stack first, then team-of-three additions.

| Tool | Purpose | $/month (solo) | Alternative | When to upgrade |
|---|---|---|---|---|
| **Anthropic Claude API** | Core LLM supplier (your product) | $200–500 (usage) | OpenAI, Vertex Gemini | When monthly spend > $1.5K, ask for startup credits |
| **OpenAI API** | Backup model + Whisper + DALL·E | $50–150 | Groq, Together for OSS | Keep on metered usage |
| **ChromaDB (self-hosted on Vercel/Fly)** | Vector DB for RAG demos | $0 (compute only) | Pinecone Starter $0, Weaviate Cloud $25 | Move to Pinecone Standard ($70+) when you have a paying client with > 1M vectors |
| **GitHub Team** | Code, issues, Actions | $4/user | GitLab Free | Stay on Team until you need SSO ($21/user Enterprise) |
| **Linear** | Project + sprint management | $8/user (Standard) | Jira (don't), Height free | Upgrade to Business ($14) at hire #5 |
| **Slack** | Internal + client channels | $0 (free tier; upgrade at 90 days) | Discord (don't, looks unprofessional to clients) | Pro $7.25/user when you hit message limit or onboard client #2 |
| **Notion** | Docs, wiki, client portals | $10/user (Plus) | Coda, Confluence | Stay on Plus through hire #5 |
| **Cal.com** | Booking, embedded on site | $15 (Teams) | Calendly $10, SavvyCal | Cal.com self-hosted later if you care about brand |
| **Resend** | Transactional email (form, receipts) | $20 (Pro) | Postmark, SES | Stay on Pro until > 50K emails/mo |
| **Postmark** | Newsletter / broadcast | $15 (10K emails) | SendGrid, Loops, Beehiiv | Move to Beehiiv ($39+) once newsletter > 1K subs |
| **Plausible** | Web analytics (privacy-first) | $9 (10K pv) | Fathom, GA4 (free) | Add PostHog $0 free tier for product analytics on demos |
| **PostHog** | Product analytics on demos / case studies | $0 (1M events free) | Mixpanel | Pay only when you cross free limits |
| **Sentry** | Error tracking (your site + client builds) | $26 (Team) | Logtail, Highlight | Team tier handles 50K errors/mo, fine for now |
| **1Password Business** | Secrets, API keys, shared vaults | $19.95 (3 users base) | Bitwarden Teams $6/user | Required from day 1 — non-negotiable |
| **Attio** | CRM (modern, AI-friendly, Notion-feel) | $34/user (Plus) | HubSpot Free, Folk, Pipedrive | Start Attio Plus from day 1 — HubSpot Free is fine but you outgrow it in 60 days |
| **Loom** | Async demos, proposal walkthroughs | $15 (Business) | Tella, Zight | Critical for foreign clients in different time zones |
| **Vercel** | Hosting (already chosen) | $20 (Pro) | Netlify, Cloudflare Pages | Pro until you have an enterprise client demanding SOC2 |
| **Stripe** | International payments (USD/GBP/AED) | 2.9% + $0.30 per txn | Paddle (handles tax) | Add Paddle when EU clients show up |
| **Razorpay** | Indian payments (INR, GST invoicing) | 2% per txn | Cashfree, PayU | Razorpay from day 1 for Indian clients |
| **Wise Business** | Multi-currency receiving account | $43 one-time | Payoneer, Mercury (US LLC route) | Open day 1 — get USD/GBP/EUR/AED accounts |
| **Zoom** | Client calls (don't use Meet for sales) | $14 (Pro) | Google Meet free | Pro tier — recordings, no 40-min cap |
| **Fathom AI / Granola** | AI meeting notes | $19 (Fathom Premium) | Otter, tl;dv | Day 1 — proposals get faster |
| **Google Workspace Business Starter** | Email, Drive, Calendar | $7/user | Zoho Mail | Already have ntplind.com — likely sorted |

**Solo founder monthly burn (first 60 days):** ~**$450–650/month** in tools + ~$300–500 in API usage = **$750–1,150/month**.

**3-person team monthly burn:** ~**$1,400–1,900/month** in tools + ~$1,000–2,500 API usage = **$2,400–4,400/month**.

**Cost-down moves to take today:**
1. Apply to **Anthropic Startup Program** — up to $5K credits.
2. Apply to **AWS Activate Founders** — $1K credits, no funding needed; **AWS Activate Portfolio** ($25–100K) needs an accelerator/VC.
3. **Microsoft for Startups Founders Hub** — $1K Azure + free OpenAI credits.
4. **Vercel for Startups** — Pro free for 1 year if you apply via a partner.
5. **Notion for Startups** — 6 months Plus free.
6. **Linear for Startups** — 6 months free with YC/Antler/etc partnership; otherwise startup discount.
7. **HubSpot for Startups** — 30–90% off if you go via an Indian incubator.

Apply to all 7 in week 1. Target $10–30K of credits before day 30.

---

## Part 3 — The Sales Pipeline

The site won't sell for you for 6+ months (SEO compounds slowly). You sell for the site.

### Five channels, ranked by ROI per founder hour in the first 100 days

| Rank | Channel | Time/wk | Ramp | First close ETA | Why this rank |
|---|---|---|---|---|---|
| 1 | **LinkedIn outbound (manual + light automation)** | 8–10h | 2 wks | Wk 4–8 | Highest signal, your wedge buyer lives here, free |
| 2 | **Founder content (LinkedIn + X + insights blog)** | 5–7h | 4 wks | Wk 8–12 (warm inbound) | Compounds, builds the trust you need |
| 3 | **Cold email (sequenced, multi-channel)** | 4–6h | 3 wks | Wk 6–10 | Scale lever once #1 validates messaging |
| 4 | **Partnerships (Vercel, Anthropic, agencies, Webflow shops)** | 3–4h | 6–8 wks | Wk 8–14 | Highest LTV deals; slow to start |
| 5 | **Inbound SEO** | 2–3h | 6+ months | Month 6–9 | Compound asset; ship it, don't expect it |

#### 3.1 LinkedIn outbound — exact playbook

**Day 1:** Optimize your profile. Headline: *"Helping Indian B2B SaaS teams ship Claude-powered SDR agents — Founder, ZentroTECH"*. Banner = your hero orb screenshot. Featured = 3 things: live demo link, Loom walkthrough, "Book a call" Cal.com.

**Build target list (200/wk):**
- Sales Navigator filters: Job titles (Founder, CEO, VP Sales, Head of Growth) + Company size (20–200) + Industry (Computer Software, IT Services, FinTech) + Geography (Bangalore, Mumbai, Delhi NCR, Pune, Hyderabad, Chennai).
- Export to a Google Sheet: Name, Company, Role, LinkedIn URL, Company URL, Notes, Stage.

**Daily cadence (1 hour):**
- 20 personalized connection requests (no pitch)
- 10 follow-up DMs to people who accepted yesterday
- 5 comments on prospect posts (warm them)
- 5 DMs to "warm" connections (people who liked/commented on your content)

**Connection request template:**
> Hey {First}, building ZentroTECH — agentic AI for Indian B2B SaaS. Loved your post on {specific post topic}. Following along.

**Follow-up DM (2 days after accept):**
> Thanks for connecting {First}. Quick one — at {Company} are you running outbound SDRs in-house, or is that on the founder still? Building agent SDRs that book ~3 meetings/week per agent for early-stage SaaS — happy to send a 90-sec Loom of how it works.

**If they reply yes:** Send Loom + Cal.com link. Don't pitch. Book the call.

**Targets:** Week 1 — 100 connection requests, 30 accepts, 5 conversations, 1 booked call. Week 8 — 600 requests sent, 250 accepted, 50 conversations, 8–12 calls/wk.

#### 3.2 Cold email playbook

**Stack:**
- **Apollo.io** ($59/mo Basic) — data + sequencer
- **Smartlead** ($39/mo) — deliverability + inbox rotation (use 3–5 sending domains)
- **Instantly** ($37/mo) — alternative to Smartlead
- **MillionVerifier** or **NeverBounce** — list cleaning

**Domain setup:** Buy 3 lookalike domains (zentrotech.io, zentrotech.ai, getzentro.com), warm them 2 weeks via Smartlead before sending.

**Sequence (4 emails over 12 days):**

> **Email 1 (Day 0):** Subject: *Quick Q on {Company}'s outbound*
> Saw {Company} is hiring SDRs on LinkedIn. Most early-stage SaaS we talk to are blowing $15K/mo per SDR for 4 meetings/wk.
> We build Claude-powered SDR agents — research, write, follow up — that book ~12 meetings/mo for ~₹1.5L all-in.
> Worth a 20-min look? — {Founder}

> **Email 2 (Day 3):** Subject: *Re: Quick Q on {Company}'s outbound*
> Bumping in case you missed. Short Loom showing the agent in action: {loom link}
> Happy to ghost if not relevant — just hit reply with "no."

> **Email 3 (Day 7):** Different angle — share a one-pager case study (sample, labeled).

> **Email 4 (Day 12):** Breakup — "Closing the loop, won't reach out again unless you say so."

**Volume:** 100 emails/day across warmed domains = 500/wk. Expect 2–4% positive reply rate = 10–20 conversations/wk by week 8.

#### 3.3 Founder content cadence

- **LinkedIn:** 3 posts/wk. Mix = 1 build-in-public ("we shipped X this week"), 1 contrarian opinion, 1 case study or how-to.
- **X/Twitter:** 1 post/day, 70% replies to AI/dev/startup voices, 30% original. Don't expect leads — expect inbound DMs from talent and partners.
- **ZentroTECH Insights blog:** 1 post/wk, 1500–2500 words, targeting one long-tail keyword. First 12 posts: cluster around your wedge.
- **Newsletter:** 1/wk, 800 words, sent Tuesdays 9am IST. Drip subscribers via blog footer + LinkedIn lead magnet.

#### 3.4 Partnerships outreach script

> Hey {First}, founder of ZentroTECH (Bangalore AI consultancy, agentic-AI-first). We work with mid-market clients who often have a {Webflow / Next.js / RevOps / data eng} need adjacent to the AI work.
> Wondering if there's a referral relationship worth exploring — I'd send qualified design/eng work your way, you'd send qualified AI work mine. We can do a 20% referral fee both ways or do swaps.
> Open to a 15-min call?

Targets: 10 outbound/wk. Hit Webflow agencies, Next.js dev shops, data engineering boutiques, brand/design studios, fractional CMO networks, Anthropic partner directory, Vercel community.

### Quotas (founder, weeks 1–12)

| Week | LI requests | LI DMs | Cold emails | Partner outreach | Calls booked | Proposals out |
|---|---|---|---|---|---|---|
| 1–2 | 100/wk | 50/wk | 0 (warming) | 5/wk | 1–3 | 0 |
| 3–4 | 200/wk | 100/wk | 200/wk | 10/wk | 3–5 | 1–2 |
| 5–8 | 250/wk | 150/wk | 500/wk | 10/wk | 6–10 | 3–5 |
| 9–12 | 250/wk | 150/wk | 500/wk | 5/wk (more inbound) | 8–12 | 4–6 |

### The "100 conversations" rule

Founders close their first deal somewhere between conversation #20 and #80. Treat the first 100 sales conversations as research, not failure. Each one teaches you which words land, which objections recur, which buyer responds. Track every single one in Attio. After call 30, your pitch will be twice as good. After 100, you have a closeable offer and a content library.

### CRM hygiene (non-negotiable)

Every conversation ends with: (1) Attio record updated, (2) next step + date set, (3) Loom or summary email sent within 24h. Stages = `Lead → Contacted → Replied → Call Booked → Call Done → Proposal Sent → Negotiation → Won / Lost`. Review pipeline every Friday 4pm — kill dead deals, advance live ones.

---

## Part 4 — Closing Your First 3 Clients

### 4.1 Discovery call (45 minutes, exact agenda)

- **0–3 min:** Rapport. "Where are you calling from?" Don't open with the deck.
- **3–10 min:** Their world. *"Walk me through how {painful workflow} happens today, end-to-end."* Shut up. Take notes.
- **10–25 min:** Diagnose. The five questions:
  1. "What have you tried? What worked, what didn't?"
  2. "What's the cost of leaving this broken for another 6 months?" (anchors urgency)
  3. "Who else is involved in this decision?" (find economic buyer)
  4. "What's the budget rough range you'd compare us against — internal hire, agency, build-it-yourself?"
  5. "If we deliver X by Y, what does success look like — what number moves?"
- **25–35 min:** Show, don't tell. 5-min Loom or live demo of the closest analog you've built / your showcase agents. Tie it back to their problem in 2 sentences.
- **35–42 min:** Co-design the engagement. Sketch on a Notion doc *with them* — phases, timeline, rough investment range. This is the proposal scaffold.
- **42–45 min:** Close to next step. *"I'll send a 3-page proposal Wednesday. Can we book 30 min Friday to walk through it together?"* Always close to a calendar booking, never to "I'll send it over."

### 4.2 Proposal template

ZentroTECH proposals are 3–5 pages, branded (use the indigo/violet palette), delivered as a Notion page (better than PDF — you see when they open it, you can update live).

**Sections:**
1. **Executive summary** (4 sentences). Their problem in their words, your solution in one line, expected outcome with a number, total investment.
2. **What we observed** (1 page). Mirror back what they told you. Buyers buy when they feel heard.
3. **Approach + phases** (1 page). Phase 1 / 2 / 3 with deliverables and durations. Show methodology, not tools.
4. **Investment** (½ page). 3 options: Lite, Core, Comprehensive. Always 3 — they'll pick middle. Show price + what's included + what's not.
5. **Timeline + team** (½ page). Gantt-style mini-chart. Name the founder + named engineer for each phase.
6. **Why ZentroTECH** (½ page). 3 reasons + sample case study + tech stack.
7. **Next steps** (¼ page). "Sign by Friday → kickoff Monday." Include DocuSign link or Stripe checkout link inline.

### 4.3 Contract / MSA — the clauses that matter

Use a templated MSA (₹15–30K from a startup lawyer in BLR — use **Treelife**, **LawSikho**, or **Vakilsearch** for a baseline; have a real lawyer review before client #1).

Critical clauses:

| Clause | What to require |
|---|---|
| **IP** | Client owns the deliverables on full payment. ZentroTECH retains rights to underlying frameworks, prompts library, agents library — license back to client perpetual. |
| **Payment terms** | 50% upfront, 25% at midpoint, 25% on delivery. Net 7 (not Net 30). Late = 1.5%/mo. |
| **Currency + jurisdiction** | INR for India clients (Bangalore courts). USD via Wise for foreign (English law for UK, DIFC courts for UAE, Delaware for US). |
| **Scope creep** | Anything outside written SOW = Change Order at $X day rate. Pre-approved in writing. |
| **Termination** | Either party 14 days written notice. Pay for work completed + 25% of remaining phase. |
| **SLA** | Response time tiers (24h business hours standard; 4h for retainer Premium). Uptime — *don't promise* unless you control infra. |
| **Limitation of liability** | Capped at fees paid in last 12 months. Standard. |
| **Confidentiality** | Mutual NDA folded in. 3-year term. |
| **AI-specific** | Client data not used to train third-party models. Zero data retention with Anthropic/OpenAI via API settings. Right to audit. |
| **Case study + logo rights** | Pre-negotiated: written case study + logo use, with right of approval. This is gold for a new firm. |

### 4.4 Kickoff playbook

**Day 0 (signing day):**
- Send signed MSA + invoice 1.
- Create shared Slack Connect channel + Notion workspace.
- Schedule recurring Mon 10am stand-up + Fri 4pm demo.

**Week 1:**
- Day 1: Kickoff call (90 min). Re-confirm scope, success criteria, RACI. Identify their internal champion + executive sponsor.
- Day 2–3: Access provisioning — repos, APIs, data samples, accounts.
- Day 4–5: Discovery interviews with 3–5 of their stakeholders.
- End of week: Written kickoff summary delivered. *Capture before/after metrics now — you cannot reconstruct them later.*

**Week 4:**
- Mid-engagement check: written status, demo of progress, NPS micro-survey.
- Pre-pitch the retainer: *"Here's how Phase 2 / care-and-feed could look after we ship."*

### 4.5 Pricing negotiation tactics

- **When to discount:** Multi-engagement commitment (2+ projects), case study + 3 named referrals in writing, multi-month upfront pay (give 5%), or a logo so good it's worth 20% off (rare).
- **When NOT to discount:** "We're a startup" (everyone is). "Other vendors quoted less" (they're not buying scope, they're buying outcome). "Can you do it for half if I refer you to a friend?" (pay for performance, never for promise).
- **The trade, not the discount:** If they push price, take scope out. Never lower price without lowering scope. *"I can hit ₹12L but it would be Phase 1 only — Phase 2 quoted separately. Or full scope at ₹18L. Which works?"*
- **When to walk away:** They want fixed price + open-ended scope. They won't sign an MSA. They want to pay on delivery only. They're rude in negotiation. They ghost mid-deal. Walk. Cheaper than dying.

### 4.6 Reference checks they'll do on you

Buyers in 2026 will Google you, then ask you for 2–3 references. Be ready before the call:

- 3 "soft references" you've pre-warmed: ex-colleagues, mentors, 1 vendor partner. They'll vouch for character + competence.
- LinkedIn polished, 100+ recent connections in target industry, recent posts.
- A "press kit" Notion page: founder bio, sample case studies, talks/podcasts, press mentions.
- Domain age + active blog signals legitimacy. Your zentrotech site is a major asset here.

---

## Part 5 — Building Authority + Trust as a Brand-New Firm

### The social proof bootstrap

You have zero logos. So does every consultancy that ever existed on Day 1. You replace logos with **borrowed credibility + density of proof**.

Stack these signals:

(a) **Anthropic Builder / Startup partner status** — Apply to Anthropic for Startups + Builder Program. Listing on a partner directory = passive social proof. Free credits + co-marketing optionality.

(b) **Vercel / Next.js community** — Apply to Vercel Partner program (technology partner tier is reachable). Submit your site to Vercel's "Next.js Showcase." Speak at Vercel Ship watch parties.

(c) **Speak at meetups (within 60 days):** Bangalore — TiE Bangalore, BANGPYPERS, ReactiFlux IN, Bangalore AI Meetup, Plivo Builders, FOSSUnited. Pitch a 20-min talk: *"How we built an agentic SDR with Claude in 3 weeks."* One talk = 50–100 future buyers in the room.

(d) **Write high-quality content.** 12 cornerstone posts in your first 90 days, each one targeting a long-tail keyword + answering a real buyer question. Post the best ones to Hacker News, Indie Hackers, Reddit r/MachineLearning, r/LocalLLaMA, dev.to.

(e) **Get listed on directories.** Process and timing:
- **Clutch.co** — Free profile setup; Sponsored profile ~$300–600/mo for top placement. Get 3 verified client reviews to start ranking.
- **DesignRush** — Free listing; paid placement ~$500–1,500/mo.
- **GoodFirms** — Free profile, paid premium at ~$600/mo.
- **The Manifest** (Clutch sister) — free.
- **Apollo.io company directory, Crunchbase, AngelList** — free, do day 1.
- **Anthropic Partners, Vercel Partners, Webflow Experts (if relevant)** — apply within 30 days.

(f) **Get featured in YourStory / Inc42 / Tech in Asia.** Pitch templates:

> Subject: Pitch — Bangalore AI consultancy serving India + UAE shipping agentic systems for SMBs
>
> Hi {Editor},
> I'm {Name}, founder of ZentroTECH — a Bangalore-headquartered AI consultancy launched in {month}. We're seeing strong pull from Indian B2B SaaS and UAE SMEs for agentic AI deployments, with measurable revenue impact in week 4.
> Would there be interest in a piece on:
> – the rise of agentic-first consultancies vs traditional Big 4 advisory
> – how Indian AI shops are winning UAE deals on price + speed
> – a teardown of our SDR agent build
> Happy to provide data, customer quotes, and screenshots.
> {Name}, Founder, ZentroTECH

Also pitch The Ken, Moneycontrol, Analytics India Magazine, ETCIO. Send to 5 outlets/wk for first 60 days.

(g) **Podcast appearances to target:**
- The Tech Lead Journal
- The Pragmatic Engineer (long shot, but try in month 6)
- ChinaTalk / Latent Space (US AI angle)
- Indian: Founder Thesis, Matrix Moments, Maed in India, The Indian Startup Show
- UAE: The Tech Show Dubai, Lovin Dubai Business
- AI-specific: Cognitive Revolution, No Priors, Practical AI
- Pitch script: *"I'm building an agentic AI consultancy bridging India and UAE. Happy to share what we're learning about deploying Claude in regulated industries. 15-min pre-call to gauge fit?"*

### Sample case studies — the disclaimer pattern

For 90 days, your case studies will be partly fictional/composite. **Always label them.** Three options, in order of preference:

1. **Real client, anonymized.** "Indian SaaS, 60 employees, Series A. Result: 3.2x SDR meetings booked, $480K pipeline in 90 days." Best after client #1.
2. **Past work as IC / freelancer.** Re-frame work you did before ZentroTECH (with permission) as proof of capability.
3. **"Sample build" — clearly labeled.** *"Sample case study — illustrative build using public data."* Builds technical credibility without lying.

Path to real ones: Negotiate the case study clause **into the MSA** of every client (Part 4.3). Capture before/after metrics in week 1 (Part 4.4). Write the case study **during** the project, not after, so it ships within 2 weeks of go-live. By month 6, you should have 3 real, named case studies.

---

## Part 6 — Hiring Plan for Year One

Don't hire on hope. Hire after revenue. Rule: **2 months of MRR > hire's monthly cost in the bank, with 6 months of runway after the hire.**

### The first 5 hires sequence

1. **Lead AI Engineer** (Month 3–5, when you have 1.5 paying clients you can't deliver alone)
   - Range: ₹25–40 LPA cash, 0.5–1.5% ESOP (4-yr vest, 1-yr cliff)
   - Profile: 5+ yrs eng, 1+ yr building with LLMs, has shipped a real agent (not just notebook demos)
   - Why first: They unlock delivery capacity = founder back to selling

2. **Frontend / Full-stack Engineer** (Month 5–7)
   - Range: ₹15–25 LPA, 0.25–0.75% ESOP
   - Profile: 3+ yrs Next.js/React, design sensibility, can ship the AI-powered websites wedge solo
   - Why second: AI-powered website projects scale revenue without scaling senior eng

3. **Sales / BD Lead** (Month 6–9)
   - Range: ₹20–30 LPA base + 8–12% commission on closed revenue + 0.5–1% ESOP
   - Profile: 4+ yrs B2B tech sales, ideally sold to CTO/VP Eng, comfortable with $25K+ deal sizes
   - Why third: Frees the founder from being the only seller. Wait until pitch is repeatable (after ~25 closed/lost deals you've seen patterns).

4. **Founding Designer** (Month 8–10)
   - Range: ₹15–25 LPA, 0.5–1% ESOP
   - Profile: Brand + product designer, strong portfolio (Figma + motion), can lead client design deliverables
   - Why fourth: Once 3+ projects in flight, design becomes the bottleneck

5. **Operations / Finance Lead** (Month 10–12)
   - Range: ₹12–20 LPA, 0.1–0.3% ESOP
   - Profile: CA-track or 5+ yrs ops/finance in services firm; manages invoicing, GST, foreign remittances, contracts, hiring ops
   - Why last: Founder shouldn't be doing GST filings at $30K MRR

### Contract vs full-time vs fractional

- **Full-time:** Hire 1 + 2 full-time. They are the company.
- **Contract (Indian):** First 2–3 months hire #1 can be a 3-month contract-to-hire at ₹3–4L/mo. De-risks both sides.
- **Fractional:** CFO (₹50–80K/mo for 5–8 hrs/wk via someone like AltGraaf network) and Designer (until hire #4). Don't hire fractional sales — they don't care enough.
- **Contract (foreign):** Use **Deel**, **Remote**, or **Multiplier** if you hire engineers in Pune/Hyderabad/Manila as contractors.

### Finding AI engineers in Bangalore (2026)

Sources, in order of yield:
- **Founder's network DMs** (highest signal). Ask 30 people in your network for 3 names each = 90 leads.
- **GitHub graph search:** `location:bangalore language:python "anthropic"` or `"langchain"` or `"llamaindex"`. Cold DM via email-from-GitHub.
- **Communities:** Bangalore AI Meetup, Hugging Face India, BANGPYPERS, Generative AI India (Discord), MLOps Community India, Neynar/Farcaster builders.
- **Wellfound (AngelList Talent)** — best for 1–4 yr exp, equity-aware.
- **LinkedIn Recruiter Lite** ($170/mo) + boolean search.
- **Naukri.com Tech / Hirist** — high volume, lower signal; useful for #2 and #4.
- **InstaHyre, Cutshort, Uplers** — good for sourcing mid-level eng.
- **Hackathons:** Sponsor / judge a hackathon at IIIT-B, IISc, PES, RV. ₹50K sponsorship = top-3 candidate pipeline.
- **Twitter/X:** Follow + DM Indian AI builders. Many are open to side gigs that convert to FT.

### Equity vs cash

For early hires:
- Hire #1 (Lead AI Eng): 0.75–1.5% over 4 years, 1-yr cliff.
- Hires #2–4: 0.25–1.0%
- Hire #5+: 0.1–0.5%
- Pool: Reserve **8–12% ESOP pool** in your cap table from day 1 (set up via Qapita or Hissa for India).
- Cash trade-off: Offer +0.5% ESOP for –10–15% cash, but only for senior hires who actually value equity.
- Refresh grants annually for top performers.

### Where to post

LinkedIn (must), Wellfound (must), GitHub network DMs, YourStory Jobs, Cutshort, Uplers, founder's Twitter, founder's LinkedIn personal post (best ROI), niche Slack/Discord communities. Skip Naukri unless hiring junior/ops.

---

## Part 7 — Founder's Weekly Dashboard

Track these every Friday. Ten minutes. Numbers in a Notion page or Google Sheet. **If you don't measure pipeline, you don't have a business — you have a hobby.**

### Pipeline metrics
- New leads (inbound + outbound)
- Qualified leads (had a discovery call)
- Proposals sent
- Proposals won / lost / pending
- Conversion rate at each stage (lead → call, call → proposal, proposal → close)
- Pipeline value (sum of open proposal $)
- Avg deal size, avg sales cycle days

### Revenue
- Project bookings (signed $ this week)
- MRR (retainer + recurring)
- ARR (MRR × 12)
- Cash collected this week
- Outstanding invoices > 14 days

### Delivery
- Active projects, % on track / at risk / blocked
- Utilization % (billable hrs / available hrs) per person
- NPS / CSAT from client check-ins

### Marketing
- Organic traffic (Plausible)
- Top 5 blog posts by traffic
- Demo bookings (Cal.com)
- Lead magnet downloads

### Top of funnel
- LinkedIn impressions, profile views, follower delta
- Newsletter subscribers, open rate, CTR
- Twitter/X followers + impressions
- LinkedIn DMs sent, replies, calls booked

### Targets

| KPI | Month 3 | Month 6 | Month 12 |
|---|---|---|---|
| Paying clients | 1 | 3 | 8–12 |
| MRR (retainer) | $2K | $8–12K | $25–40K |
| Project bookings (TTM) | $25K | $80–120K | $400–700K |
| Pipeline value | $80K | $250K | $800K+ |
| Newsletter subs | 250 | 1,000 | 5,000 |
| Organic traffic | 1.5K/mo | 8K/mo | 35K/mo |
| Team size | 1 | 2–3 | 6–8 |
| Cash in bank | 6 mo runway | 6 mo runway | 9 mo runway |

---

## Part 8 — Mentorship + Community Strategy

For each: what it is, how to get in, time investment, expected value.

| Org | What | How to apply | Time / wk | Expected value |
|---|---|---|---|---|
| **NASSCOM 10000 Startups** | Indian startup network + warehouse access | Apply online; need pitch deck + incorporation docs | 2h/mo | Logo, intros, govt scheme awareness, $500–2K perks |
| **T-Hub Hyderabad** | India's largest startup incubator; programs for AI | Apply to relevant cohort (e.g., Lab32) | 4h/mo if in cohort | Mentorship, corporate connects, demo days |
| **Anthropic for Startups + Builder Program** | API credits + technical access | Apply via anthropic.com/startups | 1h/mo | $1–5K credits, partner directory listing, technical AMAs |
| **AWS Activate Founders / Portfolio** | Cloud credits + tooling | Founders tier: self-apply ($1K). Portfolio ($25–100K) requires accelerator/VC ref | 1h once | $1–100K credits |
| **Microsoft for Startups Founders Hub** | Azure + GitHub Enterprise + LinkedIn perks | Self-apply | 1h once | $1K Azure, GH Enterprise, $2.5K OpenAI credits, free Microsoft 365 |
| **Y Combinator** | Tier-1 accelerator, US network | Apply to W27 batch (deadline Sept 2026); product-focused, ideally 2 founders | 6h/wk during batch | Brand, $500K SAFE, lifelong network — consider year 2 |
| **Antler India / Sequoia Surge / Accel Atoms** | India accelerators | Application-based | 6h/wk during program | Pre-seed funding, mentor network, demo day |
| **Lenny's Newsletter community** | PM/founder Slack | $200/yr + apply | 2h/mo | High-quality founder network, PMF advice |
| **Indie Hackers** | Bootstrap founder community | Free | 1h/wk | Audience for content, peer learning, podcast targets |
| **LinkedIn AI Builder communities** | Niche groups (e.g., AI Engineers Foundation, Latent Space) | Free | 1h/wk | Talent pool, tactical learning, partnerships |
| **TiE Bangalore** | Local founders + investors | Membership ₹15K/yr | 4h/mo | Bangalore network, deal flow, mentor matchups |
| **BANGPYPERS / ReactiFlux IN / FOSSUnited** | Local dev communities | Free; show up | 2h/wk | Talent pool, talks, contributor reputation |
| **in5 Dubai** | Govt-backed innovation centre, includes AI track | Apply online; needs UAE entity or willingness to set up | 4h/mo | UAE residency path, Dubai network, $20–50K perks |
| **AstroLabs Dubai** | Coworking + business setup partner | Membership ~$500/mo | 4h/mo | Free zone setup, GCC network, intros |
| **DIFC FinTech Hive** | Dubai financial-services accelerator | Cohort application | 6h/wk during program | Bank/insurer pilots, regulator access |
| **Plug and Play MENA / Hub71 (Abu Dhabi)** | Soft-landing programs | Application | 4h/mo | Sovereign-tier client intros |

### Mentor profiles to seek (don't name real people, describe the profile)

1. **An ex-VP Eng turned founder of an Indian SaaS that scaled to $20M+ ARR** — for sales motion + hiring rhythm.
2. **A former partner at a top-tier consulting firm (BCG/Bain/McKinsey) who left to build** — for proposal craft, MSA tactics, executive selling.
3. **A Dubai-based Indian-origin founder with UAE government / enterprise relationships** — for navigating UAE deal cycles + free-zone setup.
4. **A US-based AI engineer turned solo consultant making $300–500K/yr** — for the agentic-coding-pod model + US-client motions.
5. **A boutique design / dev studio founder who exited to a holdco** — for services-firm-to-product playbooks + valuation.
6. **A startup-focused CA / CFO** — for foreign remittance, transfer pricing, GST on exports, ESOP structuring.

How to find them: Warm intros via your network (best). LinkedIn cold DM with a specific 1-question ask (not "can I pick your brain"). Offer them advisor equity (0.1–0.5% over 2 years) if you want recurring time.

---

## Part 9 — Founder's Calendar (Sample Week, 50 hours)

Block your calendar. Defaults break you.

| Time | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| 7:00–8:30 | Gym + read | Gym + read | Gym + read | Gym + read | Gym + read |
| 8:30–9:30 | LinkedIn engagement (50 comments + DMs) | LinkedIn | LinkedIn | LinkedIn | LinkedIn |
| 9:30–10:30 | Outbound prospecting (list build + sequencer) | Outbound | Outbound | Outbound | **Pipeline review + weekly metrics** |
| 10:30–13:00 | **Delivery / build** (deep work) | **Delivery** | Discovery calls (3×45m) | **Delivery** | **Delivery** |
| 13:00–14:00 | Lunch | Lunch | Lunch | Lunch | Lunch |
| 14:00–16:00 | **Delivery** | Discovery calls (3×45m) | **Delivery** | Discovery calls (3×45m) | **Delivery** |
| 16:00–17:00 | Content writing (LinkedIn post + blog draft) | Content | Content (newsletter) | Content (blog publish) | Content (week-in-review post) |
| 17:00–18:00 | Ops (invoicing, contracts, email triage) | Ops | Ops | Ops | Ops + week wrap |
| 18:00–19:30 | Family / off | Family / off | Family / off | Family / off | Family / off |
| 20:30–22:00 | Learning (1 paper + 1 case + 1 demo build) | Learning | Learning | Learning | Off — protect Friday night |
| Sat (4–6h) | Long-form content (1 deep blog post) + reading | | | | |
| Sun | OFF. Non-negotiable. | | | | |

**Allocation:**
- Sales (prospecting + calls + proposals): **20h ≈ 40%** (NOT 20% — at zero clients you over-index on sales)
- Delivery + own product/showcase: **15h ≈ 30%**
- Content (LinkedIn, newsletter, blog): **6h ≈ 12%**
- Ops (CRM, invoices, vendor mgmt): **5h ≈ 10%**
- Learning (papers, demos, mentor calls): **4h ≈ 8%**

As you cross $10K MRR, shift sales to 30% / delivery to 40% / hiring to 10%. As you cross $25K MRR, hire your way out of delivery and shift to 40% sales / 30% leadership / 30% strategy + content.

---

## Part 10 — Common Failure Modes + Antidotes

### 1. Building features instead of selling
- **Symptom:** You spend Wednesday "improving the showcase agents" instead of doing your 30 outbound DMs.
- **Antidote:** Sales blocks are sacred. Calendar enforces. Until $30K MRR, you can't touch product before 11am Mon-Thu. Period.

### 2. Over-discounting first deals
- **Symptom:** You drop 40% to close client #1 because "we need a logo." Now client #1 expects ₹X for ₹3X work, refuses to pay more, and tells 3 friends about your "fair price."
- **Antidote:** Discount max 15% and only in trade for case study + 3 named referrals + 50% upfront. Walk if they push past 20%. Better to lose deal #1 than to anchor your price floor at zero.

### 3. Saying yes to scope creep
- **Symptom:** "Can you also add this small feature?" — said 6 times over a project. You're 60h over budget. Margin is gone. You're resentful. Quality drops.
- **Antidote:** Every "small ask" gets a written Change Order email within 24h. *"Happy to add it — it's an extra 8h, $1,200, and pushes delivery by 5 days. Approve?"* If they say "forget it," you've protected the line. If they say "yes," you're paid. Either way you win.

### 4. Not collecting case study assets during the project
- **Symptom:** Project ships Friday, client celebrates, you ask for metrics 4 weeks later and get crickets. No case study. No referral. You vanish.
- **Antidote:** Case study capture is **week 1 work**, not week 12. Baseline metrics, screenshots, written quote + testimonial are MSA deliverables (Part 4.3). Take a 3-min Loom from the client at midpoint *and* at handoff — it becomes your testimonial reel. Send case study draft within 14 days of go-live.

### 5. Burning out on cold outreach with no system
- **Symptom:** Week 3 you do 200 manual DMs, week 4 you do 12, week 5 you don't open LinkedIn. You quit "because outbound doesn't work."
- **Antidote:** **Systemize before you scale.** Sequencer (Smartlead/Apollo), templates, daily quota in Linear, weekly review. Manual personalization only on the top 20%. A virtual assistant ($400–600/mo from Athena, MagicOps, or Indian VAs at ₹15–25K/mo) does list-building + first-touch by week 4. You stay on first reply + call.

### 6. Hiring before revenue
- **Symptom:** You hire a "rockstar AI engineer" at ₹35 LPA in month 2 because "I'll close deals faster with delivery muscle." Six months later: ₹15L burned, 1 client, runway gone, you fire and demoralize.
- **Antidote:** Strict rule — **sign 2 months of MRR > hire's monthly cost, with 6 months runway post-hire**. Use contractors for spikes. Hire #1 only after client #2 (and only when you literally cannot ship without help). Discipline here saves the business.

### Bonus failure modes

- **Founder isolation.** You go heads-down for 6 weeks, no peer founders, depression sets in. Antidote: weekly co-working with another founder. Mandatory.
- **No legal hygiene.** Year 1 you skip MSAs and use email approvals. Year 2 a client refuses to pay $40K and you have nothing. Antidote: MSA before money. Always.
- **GST + foreign remittance ignorance.** First USD payment hits Wise, you don't file FIRC, GST notice arrives at month 9. Antidote: hire a CA on retainer (₹5–10K/mo) from day 1; file LUT for export of services to avoid 18% GST on foreign revenue.

---

## The 100-Day Scoreboard

Tape this to your wall. Update weekly.

| Week | Theme | Top 3 outcomes |
|---|---|---|
| 1 | Setup + wedge | Pick wedge, stack live, MSA template ready, ICP list of 200 built |
| 2 | First outbound | 100 DMs sent, 30 accepts, 5 conversations, content cadence live |
| 3 | First calls | 3 discovery calls, 1 proposal out, blog post #1 published |
| 4 | Iterate offer | Revised pitch from call learnings, 5 more calls, partnerships outreach starts |
| 5–6 | First close | First paid engagement signed (Sprint 0 or pilot), case study capture begins |
| 7–8 | Delivery + sell | Deliver Sprint 0, pitch full build, second proposal, 2 more discovery calls/wk |
| 9–10 | Client #2 | Close client #2, Vercel/Anthropic partner submissions in, podcast pitches out |
| 11–12 | Operationalize | First case study published, retainer for client #1 signed, client #3 in proposal |
| 13–14 | Pipeline density | $50K+ pipeline open, 8 calls/wk consistent, hire #1 sourcing begins |

---

*End of playbook. Now stop reading and go send 20 DMs.*
