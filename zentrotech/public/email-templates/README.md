# ZentroTECH Email Template Suite

Six self-contained, table-based, inline-styled HTML email templates that render reliably across Gmail, Outlook (incl. desktop 2007+), Apple Mail, and major mobile clients. Each file is fully standalone (no shared CSS, no external images, inline SVG logo) and includes a plain-text fallback as an HTML comment at the top.

---

## The templates

| # | File | Purpose | Trigger |
|---|---|---|---|
| 01 | `01-welcome.html` | Confirms a contact-form submission, sets expectations, offers a calendar link, and showcases three case studies. | Auto-send on contact form submit. |
| 02 | `02-discovery-call-followup.html` | 24h follow-up after a discovery call. Recap, next steps, proposal timeline, two relevant articles. | Manual or workflow-triggered after call disposition = "discovery completed". |
| 03 | `03-monthly-newsletter.html` | "The Signal" — monthly insights newsletter with hero story, three article cards, CTA, and featured case study. | Scheduled, first Tuesday of each month. |
| 04 | `04-cold-outreach-bangalore.html` | 1:1 cold outreach to Bangalore startup CTOs. Looks like a personal email, minimal chrome. | Sent via cold-outreach platform (Lemlist / Smartlead / Instantly). |
| 05 | `05-cold-outreach-dubai.html` | More formal, serif-bodied "letter" style cold outreach to UAE enterprise leadership. | Same as above, separate sequence. |
| 06 | `06-launch-announcement.html` | One-time public launch email to the founder's personal network. Warm, authentic, three soft asks. | Single broadcast send. |

---

## Where to send each from

| Template | Recommended platform | Why |
|---|---|---|
| 01 Welcome | **Resend** (transactional, triggered from the Next.js API route handling the contact form) | Lowest latency, full HTML control, deliverability for one-off transactional sends. |
| 02 Discovery follow-up | **Resend** triggered from CRM webhook *or* manual paste into Gmail (looks personal) | If you want it to feel hand-sent, paste into Gmail. If volume grows, automate via Resend. |
| 03 Newsletter | **Mailchimp**, **Beehiiv**, or **Resend Broadcasts** | List management, unsubscribe handling, deliverability warm-up, analytics. |
| 04 Cold outreach (Bangalore) | **Lemlist**, **Smartlead**, or **Instantly** | Sequence support, inbox rotation, reply detection. **Send from a dedicated cold domain** (e.g., `zentrotech.io` or `zentrotech.co`) — never your transactional domain. |
| 05 Cold outreach (Dubai) | Same as above; isolate in a separate sequence with regional sender identity. | Separates compliance/regulatory tone and lets you A/B by region. |
| 06 Launch | **Resend Broadcasts** or **Mailchimp** one-off | Single batch send to a vetted personal-network list. Verify list opt-in before sending. |

> **Cold-outreach warning:** templates 04 and 05 should look as close to a hand-typed email as possible. Strip the footer logo and outer table backgrounds in your sending platform if it allows — many cold-outreach experts recommend zero HTML chrome for replies. The included chrome is minimal and tasteful, but consider an even leaner version.

---

## Variables to swap

Every template uses `{{handlebars_style}}` placeholders. Map them to your platform's merge-tag syntax (Mailchimp uses `*|FIRSTNAME|*`, Lemlist uses `{{firstName}}`, Resend uses React props in the JSX renderer).

### Common across all templates
- `{{first_name}}` — recipient first name
- `{{unsubscribe_url}}` — list-unsubscribe URL (required for CAN-SPAM / GDPR / DMARC `List-Unsubscribe` header)

### `01-welcome.html`
- `{{first_name}}`
- `{{unsubscribe_url}}`

### `02-discovery-call-followup.html`
- `{{first_name}}`, `{{company}}`
- `{{problem_summary}}` — 1-line problem recap (you fill this in per-call)
- `{{constraints}}` — budget/timeline/political constraints
- `{{target_outcome}}` — what success looks like
- `{{timeline}}` — desired completion window
- `{{proposal_date}}` — calendar date proposal will be delivered
- `{{sender_name}}`, `{{sender_email}}`
- `{{unsubscribe_url}}`

### `03-monthly-newsletter.html`
- `{{month}}`, `{{year}}`, `{{issue_number}}`
- `{{unsubscribe_url}}`, `{{preferences_url}}`
- Hero, articles, and case-study copy are **content-edited per issue**, not merge-fielded — edit the file in-platform each month or fork into a templating system (MJML, React Email).

### `04-cold-outreach-bangalore.html`
- `{{first_name}}`, `{{company}}`
- `{{observation_topic}}` — short topic for subject line ("Series A", "the new product", "your hiring sprint")
- `{{observation_specific}}` — full-sentence observation for the body ("hiring 15 engineers post-Series A")
- `{{milestone}}` — what to congratulate them on
- `{{sender_name}}`, `{{calendar_link}}`
- `{{unsubscribe_url}}`

### `05-cold-outreach-dubai.html`
- `{{first_name}}`, `{{company}}`
- `{{date_range}}` — when sender is in Dubai ("June 9-13")
- `{{sender_name}}`, `{{sender_title}}`, `{{sender_email}}`, `{{sender_phone}}`
- `{{calendar_link}}`
- `{{unsubscribe_url}}`

### `06-launch-announcement.html`
- `{{first_name}}`
- `{{founder_name}}`, `{{founder_email}}`
- `{{unsubscribe_url}}`

---

## Subject line A/B tests

### 01 Welcome
- **A (current):** `Thanks for reaching out, {{first_name}} — here's what happens next`
- **B:** `{{first_name}}, we've got your message (and a calendar link)`
- **C:** `Re: your enquiry — what to expect from ZentroTECH`

### 02 Discovery follow-up
- **A (current):** `Following up on our call — {{company}} + ZentroTECH`
- **B:** `{{company}} + ZentroTECH: recap and next steps`
- **C:** `As promised — recap from our call`  *(ultra-short feels personal)*

### 03 Newsletter
- **A (current):** `The Signal — {{month}} {{year}}: agentic AI is finally boring (in the best way)`
- **B:** `Why agents are getting boring (a good thing) + 3 reads`
- **C:** `Issue #{{issue_number}}: {{top_story_hook}}`
- **Tip:** test specificity vs. curiosity gap; The Signal has a strong identity, lead with it for retention.

### 04 Cold outreach (Bangalore)
- **A (current):** `{{first_name}}, quick idea on {{company}}'s {{observation_topic}}`
- **B:** `{{company}} + an 84% support response improvement`
- **C:** `15 minutes? (re: {{observation_topic}})`
- **D:** `Saw your {{milestone}} — congrats + a thought`
- **Tip:** B leads with the metric (high-info), C with brevity (high-curiosity). Test by reply-rate, not open-rate.

### 05 Cold outreach (Dubai)
- **A (current):** `{{company}} & agentic AI in the UAE — a brief introduction`
- **B:** `Introduction from ZentroTECH (DIFC) — agentic AI for {{company}}`
- **C:** `An idea for {{company}} ahead of the AI 2031 deadline`
- **Tip:** UAE enterprise prefers formality; avoid emoji, avoid lowercase-only, avoid "Hey".

### 06 Launch
- **A (current):** `After 14 months of building, ZentroTECH is live`
- **B:** `It's official — ZentroTECH is real`
- **C:** `The thing I've been hinting at`
- **D:** `A small announcement (and three asks)`

---

## Send-time recommendations

All times in the recipient's local timezone unless noted otherwise.

| Template | Best window | Avoid |
|---|---|---|
| 01 Welcome | Send **immediately** on form submit. Transactional — speed signals professionalism. | n/a |
| 02 Discovery follow-up | **Within 24 hours** of the call, ideally same day before 6pm local. | Sending >48h later — the lead cools fast. |
| 03 Newsletter | **First Tuesday** of the month, **10:00–11:00am** in the dominant recipient timezone (likely IST if your list is India-heavy; segment by region if 30%+ are international). | Mondays (overflowing inboxes), Fridays (low engagement), weekends. |
| 04 Cold outreach (Bangalore) | **Tuesday–Thursday, 9:30am or 2:30pm IST.** | Mondays, Fridays, public holidays, festival weeks (Diwali, Eid). |
| 05 Cold outreach (Dubai) | **Sunday–Wednesday, 9:00am or 1:00pm GST.** (Note: UAE work week is Mon–Fri since 2022, but Sun is still a common business day for legacy enterprises.) | Thursdays after 2pm, Fridays (weekend), Ramadan working hours unless culturally aligned. |
| 06 Launch | **Tuesday or Wednesday, 8:30am IST** (catches India morning, UAE early morning, Europe pre-9, US night-before-prime). Single broadcast — don't drip. | Monday (over-saturated), Friday (forgotten by Monday). |

---

## Pre-send checklist

Before sending any template:

1. **Render preview** in [Litmus](https://litmus.com), [Email on Acid](https://www.emailonacid.com), or at minimum: Gmail web, Outlook desktop, Apple Mail iOS.
2. **Spam-test** with [Mail-Tester](https://www.mail-tester.com) — aim for 9.5+/10.
3. **Verify SPF / DKIM / DMARC** are aligned for the sending domain.
4. **Add `List-Unsubscribe` header** (one-click unsubscribe per RFC 8058) for templates 03 and 06.
5. **Plain-text part** — use the comment block at the top of each file as the multipart `text/plain` body when constructing the MIME message in Resend / Mailchimp / etc.
6. **Replace placeholder URLs** — every link points to `zentrotech.ai/...` paths; if those slugs don't exist yet, point them to a credible holding page or `/insights` index.
7. **Personal sends (templates 02, 04, 05)** should send from a real human inbox (`{{founder_name}}@zentrotech.ai`), not a `noreply@` address.

---

## Editing & forking

These are intentionally vanilla HTML — no MJML, no React Email, no build step. To regenerate them in a templating system later:

- **MJML** is the cleanest port; the table structure maps 1:1 to `<mj-section>` / `<mj-column>`.
- **React Email** if you want to drive sends from the Next.js app directly via Resend's React adapter.

Inline SVG logos are intentional — external images get blocked by default in Outlook and many corporate filters.

---

## Brand reference

- Brand colours used (light-mode safe): `#1a0f2e` (deep violet, headings), `#6366f1` (indigo, primary accents/CTAs), `#ec4899` (pink pulse, secondary accents/eyebrows).
- Body text: `#4b5563`. Muted text: `#9ca3af`. Background: `#f8f7f4` (warm off-white) and `#ffffff`.
- Typography: system stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`) — webfonts in email are unreliable. The Dubai template uses `Georgia` to evoke a formal letterhead.
