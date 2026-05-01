# ZentroTECH — India Compliance & Foreign Export Setup Playbook

**Date:** 2026-05-01
**Owner:** ZentroTECH (Bangalore HQ, Karnataka)
**Status:** Operator playbook v1.0 — actionable, no hand-waving
**Scope:** Everything a Bangalore-based AI consultancy needs to legally bill clients in India + UAE + USA + UK in 2026.

> Founder's current state: GST + MSME (Udyam) registered. That's a great start — but it is **nowhere near enough** to receive USD/AED/GBP into your bank without RBI/FEMA grief, claim 0% GST on exports, or sign an enterprise MSA with a Dubai or US client. This document closes those gaps.

---

## Part 1 — Company Structure Decision (15 min read)

### 1.1 The three real options for an Indian AI consultancy

| Structure | Setup time | Setup cost | Annual compliance | Foreign client comfort | Investor friendly | Liability protection |
|---|---|---|---|---|---|---|
| **Sole Proprietorship** | 1 day | ₹0–2k | ₹5–10k/yr | Low (clients see you as freelancer) | No | None — personal assets at risk |
| **One Person Company (OPC)** | 7–10 days | ₹8–12k | ₹25–40k/yr | Medium | Limited (must convert to Pvt Ltd before raising) | Yes |
| **LLP (Limited Liability Partnership)** | 10–15 days | ₹8–15k | ₹15–25k/yr | Medium-High | Poor (VCs hate LLPs) | Yes |
| **Private Limited Company** | 7–10 days | ₹12–20k | ₹40–80k/yr | **High** — what enterprise clients expect | **Yes** — only structure that takes equity | Yes |

### 1.2 Pros / cons for an AI consultancy specifically

**Sole Proprietorship**
- Pros: Zero overhead, file ITR-3 only, GST + MSME enough.
- Cons: Cannot sign serious enterprise MSAs (Dubai legal teams will reject). FEMA paperwork sits on your personal PAN. No equity story. Personal liability if a client sues over an AI hallucination causing damage.

**LLP**
- Pros: Cheaper compliance than Pvt Ltd, partners share profits, limited liability.
- Cons: Cannot issue equity → no ESOPs for engineers, no VC funding. Most US/UAE clients still ask "is this a registered company?" and an LLP technically qualifies but feels less polished.

**Private Limited Company (Pvt Ltd)**
- Pros: Globally recognised structure, enterprise-grade, ESOP-ready, raises capital, easy DTAA documentation, FIRC and SOFTEX flow cleanly through corporate bank.
- Cons: ₹40–80k/year compliance cost, mandatory CA + part-time CS, board meetings, AOC-4 / MGT-7 filings.

**One Person Company (OPC)**
- A solo founder's halfway house. You alone can incorporate. You get limited liability and a CIN (Corporate Identification Number) clients respect. **Mandatory conversion to Pvt Ltd** when paid-up capital crosses ₹50L or turnover crosses ₹2Cr in any 3 consecutive years. Good 12-month bridge if you do not have a co-founder yet.

### 1.3 Recommendation for ZentroTECH

> **Incorporate as a Private Limited Company.**

Why specifically for ZentroTECH:
1. The website spec targets enterprise + mid-market deals in UAE, USA, UK. Any deal over ~₹10L (~$12k) will trigger client procurement: they will ask for your Certificate of Incorporation, MOA/AOA, board resolution authorising the signer, and audited financials. Only Pvt Ltd produces all of these.
2. AI consultancy carries genuine professional liability (model errors, IP leakage, data residency violations). Limited liability is non-negotiable.
3. ESOPs — if you ever hire a senior AI engineer, you'll want to offer equity. Only Pvt Ltd issues stock options under the Companies Act 2013.
4. Foreign banks (Wise, Mercury, Stripe Atlas linkage) onboard Pvt Ltd companies smoothly; sole props get rejected.

**If you are still solo and not ready for a co-founder:** start as **OPC**, convert to Pvt Ltd within 12 months. Same CIN process at MCA, just a single shareholder + a nominee.

### 1.4 How to incorporate a Pvt Ltd — exact steps

All of this happens through the **MCA (Ministry of Corporate Affairs)** SPICe+ (INC-32) integrated form. End-to-end is 7–10 working days if names/documents are clean.

**Pre-requisites (gather first):**
- 2 directors (Pvt Ltd minimum) or 1 director + 1 nominee (OPC). Both Indian residents (180+ days/yr in India) for at least one director.
- PAN + Aadhaar of every director and shareholder.
- Latest passport-size photo of each director.
- Proof of address (bank statement / electricity bill / mobile bill, not older than 60 days).
- Registered office address proof: rent agreement + NOC from owner + latest electricity bill.
- 2 proposed company names (in order of preference).

**Step-by-step:**

1. **DSC (Digital Signature Certificate)** for every director — Class 3 DSC from eMudhra, Sify, or NSDL. Cost: ₹1,500–2,500 per director. Time: same day.
   Portal: https://www.emudhra.com or https://www.ncodesolutions.com
2. **DIN (Director Identification Number)** — auto-applied inside SPICe+ form (no separate DIN-3 needed).
3. **Name reservation (RUN / SPICe+ Part A)** — submit 2 names. MCA approves/rejects in 1–3 days. Cost: ₹1,000.
   Portal: https://www.mca.gov.in
4. **MOA + AOA drafting** — Memorandum of Association (object clause: "AI consulting, software development, IT-enabled services") + Articles of Association. Use eMOA (INC-33) and eAOA (INC-34) — auto-generated forms.
5. **SPICe+ Part B filing** — single integrated form filing for: Incorporation + PAN + TAN + EPFO + ESIC + Profession Tax (Maharashtra/Karnataka) + bank account opening (with selected partner bank). Government fees scale with authorised capital; for ₹1L authorised capital it is ~₹2,000.
6. **Stamp duty (Karnataka):** ~₹1,000 + 0.15% of authorised capital. For ₹1L authorised capital, ~₹1,150.
7. **Certificate of Incorporation (COI)** issued by ROC Bangalore — usually 5–7 working days post-submission. Comes with CIN, PAN, TAN auto-populated.
8. **Bank account opening** — SPICe+ pre-links with HDFC / ICICI / Kotak / Axis. The bank will still call you for KYC + in-person verification, takes 5–10 more days.
9. **GST migration** — your existing GSTIN was issued to your sole prop PAN. You **must apply fresh GST under the new company PAN** and surrender the old GSTIN once all old invoices are settled.
10. **Udyam re-registration** under the new company PAN — 10 minutes online.

### 1.5 Cost breakdown (Pvt Ltd, Karnataka, ₹1L authorised capital)

| Item | Cost (₹) |
|---|---|
| 2× DSC | 3,500 |
| Name reservation | 1,000 |
| Government incorporation fee | 2,000 |
| Stamp duty (Karnataka) | 1,150 |
| Professional fees (CA/CS service provider) | 6,000–12,000 |
| Notary + courier | 500 |
| **Total** | **₹14,000–20,000** |

Add ~₹5,000 if you incorporate via a premium provider with a name dispute / multiple resubmissions.

### 1.6 Best service providers compared (2026 pricing)

| Provider | Pvt Ltd package | Speed | Quality | Notes |
|---|---|---|---|---|
| **IndiaFilings** | ₹7,899–14,899 | 8–10 days | High; assigns dedicated CA | Best documentation, transparent invoicing |
| **Vakilsearch** | ₹6,499–13,999 | 7–9 days | Mixed reviews lately | Aggressive upsells; good for budget |
| **ClearTax (now Cleartax / IndiaFiles by Defmacro)** | ₹9,999–17,999 | 7–10 days | High; integrates with their accounting suite | Best if you'll use Cleartax for filings later |
| **LegalRaasta** | ₹6,999–11,999 | 10–14 days | Medium | Cheaper, slower |
| **Razorpay Rize** | Free incorporation (catch: must use Razorpay current account) | 10–14 days | High | Genuinely good if you'll use Razorpay anyway |
| **Local Bangalore CA (recommended)** | ₹8,000–15,000 + government fees | 7–10 days | Variable but you build relationship | Pick a CA who'll handle all your annual filings — saves 3× later |

**Recommendation:** find a Bangalore-based CA who specialises in IT/SaaS exporters (look for "STPI" and "SOFTEX" experience in their bio). The same person handles incorporation + monthly GST + annual ROC + 15CA/15CB. Combined fees: ~₹20k incorporation + ₹8–15k/month retainer.

---

## Part 2 — Beyond GST + MSME: Mandatory Registrations

> If you skip any of the items marked **CRITICAL**, you cannot legally invoice a foreign client without RBI exposure or 18% GST leakage on every export rupee.

### 2.1 IEC — Import-Export Code (CRITICAL for forex receipts)

- **What:** A 10-digit code from DGFT (Directorate General of Foreign Trade) tied to your PAN.
- **Why:** Even though "service exports" are intangible, RBI/banks require IEC to credit any foreign currency to your account. No IEC, no FIRC. Without an IEC your Wise / HDFC / Stripe payouts will be **held or returned**.
- **Who needs it:** Every entity (sole prop, OPC, LLP, Pvt Ltd) receiving foreign currency for goods/services.
- **Cost:** ₹500 government fee.
- **Timeline:** 1–2 working days.
- **How:** Apply at https://www.dgft.gov.in → Services → IEC → Apply for IEC. Need: PAN, cancelled cheque of company current account, address proof, DSC.
- **Renewal:** Free annual IEC update (mandatory between April–June each year, even if nothing changed). Skipping deactivates your IEC.

### 2.2 GST LUT (Letter of Undertaking) — CRITICAL, saves 18% on every export

- **What:** Annual undertaking on the GST portal that lets you export services **without paying IGST up front**.
- **Why:** Default rule = you must pay 18% IGST on the export invoice and then claim a refund (3–9 months processing). LUT = you invoice with **0% GST** and skip the refund nightmare entirely.
- **Who needs it:** Any GST-registered exporter of services. **Mandatory for any IT services exporter who wants positive cashflow.**
- **Cost:** ₹0.
- **Timeline:** Same day.
- **How:** Login to https://www.gst.gov.in → Services → User Services → Furnish Letter of Undertaking (RFD-11). File it once at the start of every financial year (April).
- **Critical detail:** The LUT must be filed **before** you raise your first export invoice of the FY. If you forget, every invoice raised before the filing date triggers 18% IGST liability.

### 2.3 Karnataka Shops & Establishment Act registration

- **What:** Registration with the Karnataka Department of Labour for any commercial establishment in the state.
- **Why:** Mandatory for any office (even a home office used for business) within 30 days of starting operations. Required to open many corporate bank accounts and get trade license. Police / BBMP can fine ~₹250–5,000 for non-registration.
- **Who:** All Pvt Ltd / LLP / proprietorships with a physical premise in Karnataka.
- **Cost:** Sliding fee based on number of employees. 0 employees: ₹300. 1–9 employees: ₹600–3,000. Renewal every 5 years.
- **Timeline:** 7–10 working days.
- **How:** https://labour.karnataka.gov.in → Karnataka Shops & Commercial Establishment Online Registration. Need: company COI, PAN, address proof, employee count, owner ID.

### 2.4 Karnataka Professional Tax (PT)

- **What:** State tax on professionals and salaried individuals.
- **Why:** Mandatory two registrations: **PTEC** (Professional Tax Enrollment Certificate, paid by the company itself, ₹2,500/year) + **PTRC** (Professional Tax Registration Certificate, used to deduct PT from employee salaries) once you hire anyone.
- **Cost:** PTEC ₹2,500/year flat. PTRC: nil registration fee, but you remit deducted PT monthly.
- **Timeline:** 5–7 working days.
- **How:** https://pt.kar.nic.in (Karnataka Commercial Taxes Department).
- **Penalty for non-compliance:** ₹1,000–5,000 + interest at 1.25%/month.

### 2.5 PF (Provident Fund) and ESI (Employees' State Insurance)

- **What:** Social security schemes administered by EPFO and ESIC.
- **Trigger:** PF = 20+ employees. ESI = 10+ employees earning ≤ ₹21,000/month gross.
- **Why prepare:** SPICe+ auto-generates PF/ESI numbers at incorporation — they sit dormant until you cross the threshold. **Once any single month's headcount crosses the limit, registration becomes retroactive and penalties stack.**
- **Cost:** Employer share = 12% (PF) + 3.25% (ESI) of basic wages. No registration fee.
- **Plan for it now:** When hiring engineer #5 or #6, switch to a payroll tool (Zoho Payroll / RazorpayX Payroll / Keka) that auto-handles PF/ESI deductions and challans.

### 2.6 Gratuity Act (Payment of Gratuity Act, 1972)

- **What:** Statutory entitlement for any employee who completes 5 years of continuous service.
- **Trigger:** 10+ employees. Once triggered, applies forever (even if headcount drops later).
- **Liability:** 15 days of last-drawn salary × number of years served, capped at ₹20L.
- **What to do today:** Add a clause to every offer letter referencing the Act. From employee #10, set up either a **LIC Group Gratuity Trust** (~1% of gross payroll/year, premium) or self-funded gratuity provision in the books. Audit will demand it.

### 2.7 STPI (Software Technology Parks of India) — optional but powerful

- **What:** A scheme under MeitY (Ministry of Electronics & IT) for software / IT-enabled services exporters. ZentroTECH qualifies as a "Non-STP unit" (you can register without physically being in an STPI park).
- **Benefits in 2026:**
  - **Single-window SOFTEX certification** (vs filing each SOFTEX manually with RBI through your bank — much faster).
  - Customs duty exemption on imported hardware / software for export work.
  - Eligibility for some MeitY incentives (ESDM, SAMRIDH).
  - "STPI registered" badge on website increases enterprise client trust.
- **When to register:** Once your annual export receipts cross ~₹50L, the SOFTEX volume justifies STPI membership. Below that, manual SOFTEX through your AD bank is fine.
- **Cost:** Annual service charges scale with export turnover. Up to ₹12.5 Cr/yr exports = ₹50,000/year. Below ₹1 Cr = ₹15,000–20,000/year. Plus one-time registration ₹2,950.
- **How:** Register at https://www.stpi.in → Online Registration. Bangalore office handles Karnataka.

### 2.8 Trademark — India (Class 42)

- **What:** Statutory registration of "ZentroTECH" wordmark + logo with the Trademark Registry under the Trade Marks Act 1999.
- **Why:** Without TM you cannot sue copycats, you cannot enforce against domain squatters, and you cannot license your brand.
- **Class for AI consultancy:** **Class 42** — "scientific and technological services, software design and development". Optionally also **Class 9** if you sell software products and **Class 35** if you do business consulting.
- **Cost:** ₹4,500 government fee (small entity / startup with Udyam) per class, or ₹9,000 if not. Add ₹6,000–15,000 attorney fees per class.
- **Timeline:** Filing receipt = 1 day. TM-1 acceptance = 6–9 months. TM journal publication + opposition window = 4 months. Final certificate = 12–24 months total. **Use the ™ symbol from Day 1 of filing**, switch to ® only after registration.
- **How:** https://ipindia.gov.in → Trade Marks → e-Filing. Or use a TM attorney (₹8,000–12,000/class total).
- **Founder action:** File this **before launching the website**. Once the brand is public, pirates file in conflicting classes.

### 2.9 Trademark — UAE + Madrid Protocol

- **UAE direct filing:** Through UAE Ministry of Economy. Cost ~AED 6,700 (~₹1.5L) per class. Slow (12–18 months). Worth it only if UAE is your primary market.
- **Madrid Protocol (recommended):** A single international application via WIPO (World Intellectual Property Organization) that lets you designate multiple member countries (UAE joined 2021, USA, UK, EU all included).
  - **Pre-requisite:** You must have a base TM application or registration in India first.
  - **Cost:** Basic fee ~CHF 653 (~₹62,000) + ~CHF 100 per designated country + national fees that vary. UAE designation adds ~CHF 822. USA adds ~CHF 460. UK adds ~CHF 264. Budget **₹2.5–3.5L** total for India + UAE + USA + UK via Madrid.
  - **Timeline:** WIPO formality 2–3 months, then each country examines on its own clock (12–24 months).
  - **How:** File via Indian Trademark Registry as the "office of origin": https://ipindia.gov.in/madrid-system.htm.
- **Practical path for ZentroTECH:** File India TM-A in Class 42 first (Month 1). Once application number is issued, file Madrid designating UAE + USA + UK (Month 2–3).

---

## Part 3 — Banking & Forex Setup

### 3.1 Why a regular savings account WON'T work

- Savings accounts are for individuals. RBI prohibits routing business income through them — banks can freeze and report. KYC mismatch.
- More important: only an **AD-Category I bank** can issue **FIRC (Foreign Inward Remittance Certificate)**, which is your statutory proof that the inward forex was a legitimate export receipt. Without FIRCs, you cannot defend GST 0-rating, cannot file SOFTEX, and your CA cannot reconcile your FEMA position.

### 3.2 Best AD-category banks for IT exporters (2026 comparison)

| Bank | Current account min balance | Forex receipt charges | FIRC issuance | API/Tally integration | Notes |
|---|---|---|---|---|---|
| **HDFC Bank** | ₹25,000 (RegularCurrent) / ₹1L (SmartUp) | $5–10 flat per inward | Auto via NetBanking, free for first 25/month | Excellent (HDFC Connect, Tally TDL) | **Best overall for IT exporters.** SmartUp variant is startup-friendly. |
| **ICICI Bank** | ₹25,000 | $7–15 per inward | Manual request, 1–2 day turnaround | Very good | Good if you already bank with ICICI personally |
| **Axis Bank** | ₹10,000 (DigiServe) | $10 per inward | Auto via iConnect | Good | Cheapest min balance, slightly slower forex |
| **Kotak Mahindra** | ₹10,000 (Kotak Edge) | ₹500 + GST per inward | Excellent — Kotak fednet downloads PDF instantly | Very good | Best for solo founders / small MAB |
| **RBL** | ₹25,000 | Competitive | Good | Good | Less coverage outside metros |

**Recommendation for ZentroTECH:** **HDFC SmartUp Current Account.** Reasons:
- Best FIRC turnaround in industry.
- Pre-approved on Razorpay, Stripe India, Wise verification.
- HDFC also runs "ePayLater" + Smart Hub for international payment links.
- Established reputation with US/UAE clients doing wire transfers.

### 3.3 Account types: Current vs CC vs EEFC — which do you need

| Account | Purpose | When to open |
|---|---|---|
| **Current Account (INR)** | Everyday business INR txns, INR payouts | Day 1 — mandatory |
| **Cash Credit (CC)** | Bank gives you a working-capital loan against receivables | Year 2+, when you have audited financials |
| **EEFC (Exchange Earners' Foreign Currency)** | Hold up to 100% of forex earnings in USD/EUR/AED **without** auto-conversion to INR | Open by Month 2. Saves 1–2% on conversion when paying foreign vendors (OpenAI, Anthropic, Vercel, AWS) |

**EEFC strategy for an AI consultancy:** You spend a lot in USD (OpenAI API, Anthropic API, Vercel, GitHub, AWS, Cursor). If you receive in USD and pay in USD, EEFC lets you skip 2× FX conversion (USD→INR→USD = ~3% leakage). This is **real margin** at scale.

### 3.4 FIRC — Foreign Inward Remittance Certificate

- **What:** A bank-issued certificate confirming a specific inward forex credit, with sender details, purpose code, INR equivalent, exchange rate.
- **Why:** Required by GST officer to verify export-without-IGST claim. Required by Income Tax officer to verify export receipts under DTAA. Required to file SOFTEX (RBI compliance) and to file Form 15CA/CB (when remitting back).
- **How to get one for every payment:**
  1. When forex hits your account, your bank sends a "credit advice" SMS/email.
  2. Within 7 days, the bank emails or asks you to **declare the purpose of remittance** (purpose code: P0802 for "software consultancy services" / P1006 for "computer services").
  3. Submit purpose declaration with invoice copy on bank portal.
  4. Bank issues an **e-FIRC** (electronic FIRC) usually within 2–5 days.
- **Save every single FIRC PDF in a `firc/FY-2026-27/` folder.** Loss = ₹10,000+ pain to reissue.

### 3.5 SWIFT vs IBAN vs ACH — what your client uses

| Method | Used by | Speed | Cost (to client) | Cost (to you) |
|---|---|---|---|---|
| **SWIFT wire** | Most enterprise clients globally | 1–4 business days | $20–50 | $5–10 + intermediary fees |
| **IBAN transfer** | EU + UAE (UAE has IBANs since 2011) | 1–3 days | Lower than SWIFT inside SEPA/UAE | Same as SWIFT inward |
| **ACH (US domestic)** | US clients via Wise / Stripe / Mercury | 2–5 days | Often free | Hidden in FX spread |
| **Wise (formerly TransferWise)** | SMBs globally | Instant–2 days | Mid-market FX + ~0.4% fee | You receive INR in your Wise multi-currency, transfer to HDFC |
| **Stripe** | US/EU SaaS clients on cards | T+7 (India payouts) | 2.9% + 30¢ per card | 1.5–2% Stripe takes |

**For ZentroTECH:**
- **Default:** Send clients SWIFT instructions referencing your HDFC USD wire details (HDFC issues these on letterhead).
- **Small invoices (< $2k):** Wise Business is faster + cheaper.
- **US SaaS clients used to cards:** Stripe via Stripe India.

### 3.6 Wise Business (multi-currency) — open this in Week 2

- **Why:** Wise gives you "local receiving accounts" in USD (US ACH routing), GBP (UK sort code), EUR (IBAN), AUD, CAD. To a US client you look like a US bank account, not a foreign wire.
- **Eligibility:** Pvt Ltd / LLP only (sole prop accepted in some cases). You need: COI, PAN, GST cert, IEC, bank statement, director ID.
- **Cost:** ₹0 to open. Per-transfer fees ~0.4%. Holding balance free.
- **Process:** https://wise.com/business → Sign up → Indian business documents upload → 3–7 day verification.
- **FIRC for Wise:** Wise India is partnered with **YES Bank** — they issue FIRCs through the bank. Some founders prefer to **withdraw from Wise to HDFC current account** — that triggers a fresh inward FIRC at HDFC (cleaner audit trail).

### 3.7 Stripe Atlas (US LLC) — when it makes sense

- **What:** Stripe's $500 service to incorporate a Delaware LLC + US bank (Mercury) + Stripe US account.
- **Why ZentroTECH might want it:** US clients pay a US LLC frictionlessly via ACH; some US enterprises legally cannot pay foreign vendors over a threshold without W-8BEN-E paperwork.
- **Why ZentroTECH probably should NOT do it yet:**
  - You will owe US federal taxes (8.84% Delaware franchise + federal corporate). Double tax management gets ugly without a CPA.
  - Form 5472 + Form 1120 must be filed annually (penalty: $25,000 per missed filing).
  - You become a "US Reportable Person" under FATCA — your Indian CA must file additional disclosures.
- **Verdict:** Defer Stripe Atlas until you have **>$200k/yr in US revenue** AND a US-based CPA on retainer. Until then, bill from India + use Wise/Stripe India.

---

## Part 4 — Tax & Compliance Calendar (Pvt Ltd, FY April–March)

> Print this. Stick it on your wall. Missing dates here is the #1 reason founders pay needless penalties.

### 4.1 Monthly

| Date | Task | Form / Portal | Penalty if missed |
|---|---|---|---|
| **7th** | Deposit TDS deducted in previous month | Challan ITNS-281 on https://incometax.gov.in | 1.5%/month interest + late fee |
| **11th** | File GSTR-1 (outward supplies) | https://www.gst.gov.in | ₹50/day (₹20/day for nil) capped at ₹10,000 |
| **20th** | File GSTR-3B (summary return + tax payment) | GST portal | ₹50/day + 18% interest on tax |
| **25th** | Karnataka Professional Tax monthly remittance (if employees) | https://pt.kar.nic.in | 1.25%/month + ₹1,000+ |
| **15th** | PF + ESI challans (if applicable) | https://unifiedportal-emp.epfindia.gov.in | 12% interest p.a. + damages up to 100% |

### 4.2 Quarterly

| Quarter end | Task | Form | Notes |
|---|---|---|---|
| 30 Jun / 30 Sep / 31 Dec / 31 Mar | TDS Returns | Form 24Q (salary), 26Q (resident non-salary), **27Q (non-resident)** | 27Q is critical when paying foreign vendors |
| 15 Jun / 15 Sep / 15 Dec / 15 Mar | Advance Tax instalment | Challan ITNS-280 | 15% / 45% / 75% / 100% of estimated annual tax |

### 4.3 Annual

| Date | Task | Form | Portal |
|---|---|---|---|
| **30 Sep** (extended sometimes) | Tax Audit (if turnover > ₹1 Cr / professional receipts > ₹50L) | Form 3CA-3CD | incometax.gov.in |
| **31 Oct** | Income Tax Return for companies | **ITR-6** | incometax.gov.in |
| **30 Sep** | AGM (Annual General Meeting) | — | Maintain board minutes |
| **30 Oct** | ROC: AOC-4 (financials) | Form AOC-4 | mca.gov.in |
| **29 Nov** | ROC: MGT-7 (annual return) | Form MGT-7 (or MGT-7A for OPC/Small Co.) | mca.gov.in |
| **31 Dec** | GSTR-9 (annual GST return) | Form GSTR-9 | gst.gov.in |
| **31 Dec** | GSTR-9C (reconciliation, if turnover > ₹5 Cr) | Form GSTR-9C | gst.gov.in |
| **30 Apr** | LUT renewal for next FY | RFD-11 | gst.gov.in |
| **30 Jun** | IEC annual update (free) | DGFT portal | dgft.gov.in |
| **31 May** | Form 27EQ (TCS, if applicable) | TRACES | tdscpc.gov.in |
| **30 Sep** | DIR-3 KYC for every director | mca.gov.in | ₹5,000 penalty per director if missed |

### 4.4 Foreign-export specific

- **SOFTEX form** — required for **every** software/IT-services export invoice. Process:
  1. Within 30 days of invoice, submit SOFTEX form (currently digital via STPI / RBI EDPMS).
  2. STPI / AD bank certifies the SOFTEX.
  3. Bank closes the entry in EDPMS (Export Data Processing & Monitoring System) once payment is realised.
  - **Threshold (post-2026):** RBI exempts invoices below USD 25,000 from individual SOFTEX filing — but most banks still ask for them. Always file.
  - **Penalty:** Open EDPMS entries beyond 9 months → bank reports to RBI → potential FEMA contravention (₹2L+ compounding fees).
- **Form 15CA** — declaration before remitting any payment outside India.
- **Form 15CB** — CA certificate accompanying 15CA when amount > ₹5L per remittance OR when DTAA benefit claimed.
- **Place these in workflow:** Every time you pay OpenAI/Anthropic/Vercel from India, your CA must file 15CA (and 15CB above ₹5L). Many founders forget — bank can refuse the remittance.

### 4.5 Penalty matrix (memorise)

| Default | Penalty |
|---|---|
| GSTR-3B late | ₹50/day + 18% interest |
| ITR (company) late | ₹5,000–10,000 + 1% interest/month |
| ROC AOC-4 / MGT-7 late | ₹100/day, no cap |
| DIN KYC missed | ₹5,000/director, DIN deactivated |
| SOFTEX not filed | EDPMS open → FEMA contravention 3× amount |
| LUT not filed | 18% IGST on every export invoice raised before LUT date |
| TDS late | 1.5%/month + ₹200/day for return |
| FEMA violation (no IEC, parking forex offshore) | Up to 3× amount + criminal exposure |

---

## Part 5 — Foreign Receivables: The Tax Story

### 5.1 DTAA basics — India ↔ UAE / USA / UK

A **Double Taxation Avoidance Agreement** prevents the same income from being taxed twice. India has DTAAs with 90+ countries.

- **India–UAE DTAA:** Service fees from UAE generally NOT taxable in UAE (UAE has no income tax for individuals; corporate tax is 9% from 2023, mostly applies to UAE-resident entities). Your UAE client typically does **not** withhold any tax. You declare the receipt as Indian export income.
- **India–USA DTAA:** Article 12 covers "fees for included services" — US client may withhold up to **15%** as TDS unless you provide a TRC + Form W-8BEN-E claiming treaty benefit. You can claim this 15% as Foreign Tax Credit (FTC) in your Indian ITR via Form 67.
- **India–UK DTAA:** Article 13 — "fees for technical services" — UK client may withhold **10%** absent treaty paperwork.

### 5.2 TRC + Form 10F — what foreign clients ask for

- **TRC (Tax Residency Certificate):** Issued by Indian Income Tax Department on Form 10FA / 10FB.
  - **Cost:** ₹0 government fee.
  - **Process:** Apply via incometax.gov.in → e-File → Form 10FA. Issued in 7–15 days. Valid for the financial year stated.
- **Form 10F:** Self-declaration containing: legal name, status (company), nationality, TIN (your PAN), address, period, etc. **Mandatory in digital form on the IT portal** since 2022.
  - File at: incometax.gov.in → e-File → Income Tax Forms → Form 10F.
- **Founder workflow:**
  1. At start of every FY, file Form 10FA → get TRC.
  2. Keep TRC PDF + Form 10F PDF + PAN card scan in `tax/foreign-clients/FY-XXXX/`.
  3. Send the bundle to every new foreign client during onboarding. Their AP team will apply DTAA reduced rate (often 0% for service fees).

### 5.3 Withheld tax — claiming it back

- If a US/UK client withholds tax despite paperwork, you receive: invoice $10,000, payment $9,000, withholding statement $1,000.
- Foreign client must give you **Form 1042-S (US)** or equivalent (UK: P60-equivalent / SA100 schedule).
- In your Indian ITR (ITR-6), claim **Foreign Tax Credit via Form 67** — file Form 67 **before** filing your ITR.
- Exchange rate for conversion: **TT buying rate** on the date the tax was withheld (per Rule 26 of IT Rules).

### 5.4 UAE VAT (5%) — when you ARE in scope

- UAE VAT applies if you have a **place of supply in UAE**. For a Bangalore-based Indian Pvt Ltd selling AI services *from India* to a UAE client *for use in UAE*:
  - **You do NOT charge UAE VAT** (you are not VAT-registered in UAE).
  - Your **UAE client must self-account** for VAT under reverse-charge (their problem, not yours).
- UAE VAT becomes your problem only if:
  - You open a UAE branch / Free Zone Company (DMCC, IFZA, RAKEZ).
  - UAE annual revenue exceeds AED 375,000 → mandatory VAT registration.

### 5.5 India's Equalisation Levy — and why it (probably) doesn't apply to you

- The 2% Equalisation Levy on "online supply of goods or services" by non-resident e-commerce operators was **abolished w.e.f. 1 August 2024** by the Finance Act 2024. No more EL on Google Ads / Facebook Ads / SaaS subscriptions paid by you.
- The 6% EL on online advertising remains for now (paid by *Indian payer* on payments to non-resident advertising platforms). Affects you only if you buy ads from Google Ireland / Meta Ireland — your CA will deduct + remit at remittance time.

### 5.6 Place of supply rules (services)

- **Service to a registered foreign business (B2B):** Place of supply = **location of recipient**. Treated as **export of service** = zero-rated GST under LUT.
- **Service to a foreign individual (B2C):** Place of supply = **location of supplier (you in India)** for some categories. Then GST applies at 18%. Most consultancy is B2B → zero-rated.
- **Critical 4 conditions for "export of service" (Section 2(6) IGST Act):**
  1. Supplier in India.
  2. Recipient outside India.
  3. Place of supply outside India.
  4. **Payment received in convertible foreign exchange** (or INR where RBI allows).
  5. Supplier and recipient are **not merely establishments of a distinct person**.
- Miss any one and your "export" becomes a domestic supply taxed at 18%.

---

## Part 6 — Operational Recommendations

### 6.1 CA on retainer

- **When needed:** Day 1.
- **What they handle:** Monthly GST (GSTR-1, 3B), TDS, payroll TDS (Form 24Q), 15CA/CB filings, advance tax projections, annual ITR-6, tax audit, books closing.
- **Cost:** **₹8,000–15,000/month** for a Bangalore CA handling a young Pvt Ltd with ~30 invoices/month + foreign clients. Add ₹15,000–40,000 one-time at year-end audit + ROC.
- **Find:** Search ICAI directory for Bangalore CAs; ask in FCAI / NASSCOM Karnataka WhatsApp groups; LinkedIn search "Chartered Accountant" + "STPI" + "Bangalore".

### 6.2 Company Secretary (CS) on retainer

- **Mandatory threshold:** Pvt Ltd with paid-up capital ≥ ₹10 Cr OR turnover ≥ ₹50 Cr must appoint a **whole-time CS**. Below that, a **part-time / retainer CS** is sufficient.
- **What they handle:** ROC filings (AOC-4, MGT-7, DIR-3 KYC, INC-22, MGT-14 for resolutions), board meeting minutes, share transfer / allotment, ESOP grants, FEMA filings (FC-GPR for inward equity, FC-TRS for share transfers).
- **Cost:** **₹3,000–8,000/month** retainer for early-stage. Add per-event fees for share allotments, etc.

### 6.3 Bookkeeping software

| Tool | Best for | Pricing | Forex handling | Recommendation |
|---|---|---|---|---|
| **Zoho Books** | India + foreign clients | ₹749–4,999/month | Excellent — multi-currency, auto-FX | **Recommended for ZentroTECH.** Bangalore-built, integrates Zoho Mail + Zoho Invoice + Zoho Payroll. |
| **Tally Prime** | Pure Indian business | ₹18k one-time + 22% AMC | Manual | Most Indian CAs prefer it; integration overhead with foreign workflows |
| **QuickBooks** | Was great until Intuit exited India in 2023 | — | — | Avoid — no India support |
| **Xero** | Foreign-first companies | $33–70/month | Excellent | Use if you go Stripe Atlas |

**Picked stack for ZentroTECH:** Zoho Books (Standard ₹1,499/mo) + Zoho Invoice (free for < 1000 invoices) + sync with HDFC + Wise.

### 6.4 Payment gateways

| Gateway | India fees | Forex acceptance | Settlement time | KYC complexity | Best for |
|---|---|---|---|---|---|
| **Razorpay** | 2% domestic, 3% international | Yes (Razorpay International) | T+2 | Low | **Default pick.** Best dashboard, integrates Books + Payroll. |
| **Cashfree** | 1.75% domestic, 3% international | Yes | T+1 | Low | Slightly lower fees, payouts excellent |
| **Stripe (India)** | 2.0% + ₹3 (cards) | Yes | T+7 | Medium | If clients prefer Stripe brand |
| **Paddle** | 5–10% (acts as Merchant of Record) | Yes — handles VAT/GST in 100+ countries for you | T+30 | Low | If you sell SaaS subscriptions to global SMBs |
| **PayPal** | 4.4% + fixed fee | Yes | T+1 to bank | Medium | Last resort — clients often insist |

**For consultancy invoices (large ticket, not SaaS):** Wire transfers to HDFC for $1k+, Razorpay payment links for $500–1000, Wise for everything else. Skip Stripe/Paddle until you have a SaaS product.

### 6.5 The CA you actually want

Look for a CA who advertises:
- "STPI / SEZ exporter clients"
- "SOFTEX filings"
- "DTAA + TRC"
- "Form 15CA/CB"
- Clients in IT services / SaaS

Interview questions:
1. *"How many of your current clients raise USD invoices monthly?"* (Want: 10+)
2. *"Do you handle 15CA/CB in-house or outsource?"* (Want: in-house)
3. *"Have you filed SOFTEX through EDPMS / STPI Online?"* (Want: yes, recently)
4. *"Have you defended a GST refund / export-without-IGST audit?"* (Want: yes)
5. *"What's your monthly retainer + extras?"* (Want: clear, written)
6. *"Do you use Zoho Books / Tally / Excel for client books?"* (Want: Zoho Books)

### 6.6 Insurance

| Policy | What it covers | Why ZentroTECH needs it | Provider | Annual premium |
|---|---|---|---|---|
| **Professional Indemnity (PI)** | Errors & Omissions in deliverables (e.g., bad AI integration causing client loss) | Most enterprise MSAs (UAE, US) require it | ICICI Lombard, HDFC ERGO, Tata AIG, Bajaj Allianz, Marsh | ₹15k–60k for ₹1Cr cover |
| **Cyber Liability** | Data breach, ransomware, third-party data loss | You handle client data, train models on their docs | Same providers + Howden / Lockton | ₹20k–80k for ₹1Cr cover |
| **Directors & Officers (D&O)** | Personal liability of directors | Important once you raise funding | Tata AIG, ICICI Lombard | ₹40k–1.2L for ₹1Cr cover |
| **Group Health (Mediclaim)** | Employee health | Recruiting incentive + ESI substitute | Plum, Loop, Onsurity, Pazcare | ₹6k–12k per employee/year |

**Buy in Month 1:** PI + Cyber. The two together cost ~₹40k/year and unblock 80% of enterprise procurement checklists.

---

## Part 7 — Founder's First 30 Days Checklist

### Week 1 — Foundation

| # | Action | Owner | Time | Cost |
|---|---|---|---|---|
| 1 | Decide structure (Pvt Ltd vs OPC) | Founder | 1 hr | — |
| 2 | Draft 2 company names + check MCA + TM availability | Founder | 2 hr | — |
| 3 | Get DSC (Class 3) for self + co-director | eMudhra / agent | 1 day | ₹3,500 |
| 4 | Engage CA / incorporation provider | Founder | 1 day | retainer agreed |
| 5 | Submit SPICe+ Part A (name reservation) | CA | 1 day | ₹1,000 |
| 6 | Open dedicated Gmail + Google Workspace for company | Founder | 30 min | ₹176/user/mo |

### Week 2 — Incorporation + critical regs

| # | Action | Owner | Time | Cost |
|---|---|---|---|---|
| 7 | Submit SPICe+ Part B + MOA + AOA | CA | 2 hr | ₹3k govt + stamp |
| 8 | Receive COI + PAN + TAN | ROC | 5 days | included |
| 9 | Open HDFC SmartUp Current Account | HDFC RM | 5–10 days | nil |
| 10 | Apply IEC at DGFT | CA | 2 days | ₹500 |
| 11 | Apply fresh GST under company PAN | CA | 7 days | nil |
| 12 | File LUT (RFD-11) for FY 2026-27 | Founder/CA | 30 min | nil |
| 13 | Karnataka Shops & Establishment registration | CA | 7 days | ₹600 |

### Week 3 — Operational setup

| # | Action | Owner | Time | Cost |
|---|---|---|---|---|
| 14 | Karnataka PT (PTEC) registration | CA | 5 days | ₹2,500 |
| 15 | File Form 10FA → request TRC | CA | 7–15 days | nil |
| 16 | File Form 10F online | Founder/CA | 30 min | nil |
| 17 | Open Wise Business multi-currency account | Founder | 3–7 days | nil |
| 18 | Subscribe Zoho Books Standard | Founder | 1 hr | ₹1,499/mo |
| 19 | Set up Razorpay account + integrate with Zoho Books | Founder | 2 hr | nil onboarding |
| 20 | Buy Professional Indemnity + Cyber Liability (₹1Cr each) | Broker | 3–5 days | ₹35k–60k |

### Week 4 — Brand, growth, polish

| # | Action | Owner | Time | Cost |
|---|---|---|---|---|
| 21 | File India Trademark Class 42 (wordmark + logo) | TM attorney | 1 day | ₹4.5k govt + ₹8k attorney |
| 22 | Initiate Madrid Protocol (UAE + USA + UK) once Indian filing receipt issued | TM attorney | 1 week | ₹2.5L–3.5L |
| 23 | Apply for STPI registration if planning to cross ₹50L exports in Y1 | CA | 14 days | ₹17k |
| 24 | Draft master MSA template (English + DIFC-compliant version) | Lawyer | 1 week | ₹15k–40k |
| 25 | Draft NDA + Statement of Work template | Lawyer | 1 week | included |
| 26 | Set up DocuSign / Zoho Sign for e-signed contracts | Founder | 1 hr | ₹999/mo |
| 27 | Open EEFC account at HDFC | HDFC RM | 5 days | nil |
| 28 | Quarterly compliance calendar in Google Calendar (auto-reminders) | Founder | 1 hr | nil |
| 29 | Backup: scan + cloud-store COI, MOA, AOA, PAN, TAN, GST, IEC, LUT, TRC | Founder | 2 hr | nil |
| 30 | Send LinkedIn announcement + first foreign client outreach | Founder | ongoing | nil |

---

## Part 8 — Common Mistakes & Red Flags

The **top 10 mistakes** Bangalore IT consultancies make scaling to foreign clients:

1. **Receiving forex into a personal savings account** — instant FEMA red flag, RBI scrutiny, account freeze. *Fix:* Always route via current account at AD-Cat-I bank from the very first invoice.
2. **Forgetting to file LUT before the first export invoice of the FY** — every invoice raised pre-LUT triggers 18% IGST liability you must pay then claim refund (3–9 months). *Fix:* Diarise LUT renewal for 1 April every year.
3. **Issuing invoices without "Export of Service under LUT, IGST Nil"** wording — GST officer rejects 0-rated treatment. *Fix:* Use this exact narration on every export invoice + reference LUT ARN number.
4. **Not collecting FIRC for every inward** — when the GST refund / SOFTEX audit comes 18 months later, you cannot prove inward forex. *Fix:* FIRC within 7 days, store in cloud.
5. **Letting EDPMS entries stay open > 9 months** — bank reports to RBI, FEMA contravention case opens (3× amount in penalty). *Fix:* Close every entry as soon as payment realises; reconcile monthly.
6. **No IEC, no purpose code declaration** — bank holds the inward and may return it. *Fix:* IEC in week 1; pre-file purpose code for recurring clients.
7. **Receiving payment via PayPal personal account or Payoneer with wrong KYC** — PayPal converts at terrible FX, no FIRC. *Fix:* PayPal Business + KYC under company PAN, or skip PayPal for Wise.
8. **Treating Form 15CA/CB as optional when paying foreign vendors (OpenAI, Anthropic, Vercel)** — bank refuses remittance / IT department issues notice. *Fix:* Have CA file 15CA before every outward; 15CB above ₹5L.
9. **No DTAA paperwork → 15–20% of US/UK invoice withheld** — and you don't claim FTC properly in ITR. *Fix:* Send TRC + Form 10F + PAN + W-8BEN-E to every foreign client during onboarding.
10. **Mixing personal + business spend on the company current account** (Cursor subscription on company card, then taking founder withdrawal as "drawings") — auditors flag, ITR adds back as deemed dividend. *Fix:* Pay self a clean monthly salary or director's remuneration with TDS deducted; reimburse company expenses against vouchers.

**Bonus FEMA traps:**
- Holding a Stripe/Wise USD balance > 270 days without remitting to India → FEMA contravention (must repatriate within 9 months by default; STPI/IFSC units have longer windows).
- Crypto receipts from foreign clients — RBI does not recognise this as valid forex receipt; cannot zero-rate GST; potential PMLA exposure. **Don't.**
- Equity from an angel investor abroad needs Form **FC-GPR** filed within 30 days of share allotment. Missing it: ₹5,000 + 1% per month penalty. Your CS handles this.

> Verify state-specific items (Karnataka PT slab changes, Shops & Establishment Act amendments, BBMP trade license) with a Bangalore-based CA. Karnataka rules change annually in the State Budget (typically March–April).

---

## Appendix — Key portals (bookmark these)

| Purpose | Portal |
|---|---|
| MCA / SPICe+ / ROC | https://www.mca.gov.in |
| GST | https://www.gst.gov.in |
| Income Tax | https://www.incometax.gov.in |
| TDS / TRACES | https://www.tdscpc.gov.in |
| DGFT (IEC) | https://www.dgft.gov.in |
| Karnataka Labour | https://labour.karnataka.gov.in |
| Karnataka PT | https://pt.kar.nic.in |
| EPFO | https://unifiedportal-emp.epfindia.gov.in |
| ESIC | https://www.esic.gov.in |
| STPI | https://www.stpi.in |
| Trademark Registry | https://ipindia.gov.in |
| DSC (eMudhra) | https://www.emudhra.com |
| Wise Business | https://wise.com/business |

---

*End of playbook. Next document in this series: `02-msa-templates-and-foreign-client-onboarding.md`.*
