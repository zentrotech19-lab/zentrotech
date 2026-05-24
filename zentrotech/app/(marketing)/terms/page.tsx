import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SITE, OFFICES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for ZentroTECH — engagement scope, payment terms, intellectual property, warranties, and dispute resolution under Indian law.",
  path: "/terms",
});

const LAST_UPDATED = "24 May 2026";
const office = OFFICES[0];

export default function TermsPage() {
  return (
    <article className="py-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-indigo-glow font-mono">Legal</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-text-muted">Last updated: {LAST_UPDATED}</p>

          <div className="prose-zentro mt-10 text-text-secondary leading-relaxed space-y-7">
            <section>
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the {SITE.name} website ({SITE.url}) and
                the services provided by {SITE.name}, a proprietorship registered in Karnataka, India (GST {SITE.gst}).
                By using the website or engaging us for services, you agree to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">1. Scope of services</h2>
              <p>
                {SITE.name} delivers lead-engine websites, AI automations (chatbots, voice agents, follow-up systems),
                Android app development, SEO, and related digital services to Indian small and medium businesses.
                Specific scope, deliverables, timeline, and price are agreed in a written proposal signed before work
                begins. Anything outside that signed proposal is out of scope and may require a change order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">2. Engagement &amp; acceptance</h2>
              <p>
                An engagement is formed when both parties sign the proposal and the first invoice is paid. No verbal
                agreement, WhatsApp message, or email constitutes a binding engagement. Until a signed proposal exists,
                anything we discuss is informational.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">3. Payment terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Project fees are quoted in Indian Rupees (INR/₹) and exclusive of GST. GST is applied at the rate in force on the invoice date.</li>
                <li>Standard milestone schedule: 40% on kickoff, 30% on staging review, 30% on go-live. Larger projects use a custom milestone plan.</li>
                <li>Invoices are due within 7 days of issue. Past-due invoices accrue a late fee of 2% per month or the maximum permitted by Indian law, whichever is lower.</li>
                <li>Recurring Care Plans are billed monthly in advance; cancellation requires 30 days&rsquo; notice.</li>
                <li>Accepted payment methods: NEFT, IMPS, RTGS, UPI, Razorpay. Wire transfers from outside India are subject to a 1.5% processing fee.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">4. Money-back trial</h2>
              <p>
                The first milestone of every new engagement comes with a money-back trial. If you are not satisfied with
                the discovery deliverable and first build milestone, you receive a full refund of fees paid to that
                date, and the engagement ends. Details are in our{" "}
                <Link href="/refund" className="text-indigo-glow hover:text-white">Refund Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">5. Intellectual property</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-white">Client-owned on delivery:</strong> upon receipt of full payment for a
                  milestone, all custom website code, AI prompts, automation flows, and brand assets we created
                  specifically for you transfer to you. You own them outright.
                </li>
                <li>
                  <strong className="text-white">{SITE.name}-owned:</strong> our proprietary frameworks, internal
                  tooling, reusable component libraries, methodology documents, and any pre-existing code or templates
                  remain our property. We grant you a perpetual, royalty-free, non-exclusive licence to use them as
                  part of the deliverable.
                </li>
                <li>
                  <strong className="text-white">Third-party tools:</strong> services we configure for you (Razorpay,
                  WhatsApp Business API, Twilio, OpenAI API, etc.) are governed by those providers&rsquo; own terms.
                  You hold the accounts and pay the usage costs directly to them.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">6. Client responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate business information, brand assets, copy, and access credentials needed to deliver the work.</li>
                <li>Respond to clarification requests and review milestones within 5 business days. Delays in client review extend timelines proportionally.</li>
                <li>Hold all required licences, GST registration, and regulatory clearances for your business.</li>
                <li>Pay invoices on time.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">7. Warranties &amp; disclaimers</h2>
              <p>
                We warrant that the work will be delivered with reasonable skill and care, free of defects in materials
                or workmanship at the time of delivery, and substantially conforming to the agreed scope. We do{" "}
                <strong className="text-white">not</strong> warrant specific business outcomes (lead volumes, revenue,
                rankings) &mdash; those depend on factors outside our control (market, your sales follow-through, Google
                algorithm changes). Where we make outcome estimates, they are good-faith projections, not guarantees.
              </p>
              <p>
                Except as expressly stated, the services are provided &ldquo;as is&rdquo; without any other warranty,
                express or implied, including merchantability or fitness for a particular purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">8. Limitation of liability</h2>
              <p>
                To the maximum extent permitted by Indian law, our total liability arising out of or relating to any
                engagement is limited to the total fees paid by you to {SITE.name} in the six months preceding the
                event giving rise to the claim. We are not liable for any indirect, incidental, special, consequential,
                or punitive damages including loss of profits, revenue, data, or business opportunity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">9. Confidentiality</h2>
              <p>
                Each party will treat the other&rsquo;s non-public business information (financials, strategy, customer
                lists, technical configurations) as confidential and use it solely for delivering the engagement. This
                obligation survives termination for 3 years. We may reference the engagement publicly (logo, name,
                generic case study) unless you object in writing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">10. Termination</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Either party may terminate for material breach if the breach is not cured within 15 days of written
                  notice.
                </li>
                <li>
                  You may terminate for any reason during the money-back trial window for a full refund. After that, you
                  may terminate at any time with 30 days&rsquo; written notice; we will invoice for work-in-progress to
                  that date and hand over all completed deliverables.
                </li>
                <li>
                  We may pause work for non-payment after 14 days past invoice due date.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">11. Governing law &amp; dispute resolution</h2>
              <p>
                These Terms are governed by the laws of India. Any dispute will first be addressed by good-faith
                negotiation between authorised representatives. If unresolved within 30 days, the dispute will be
                referred to mediation under the Mediation Act, 2023. Failing mediation, exclusive jurisdiction is
                vested in the competent courts of Bengaluru, Karnataka.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">12. Website use</h2>
              <p>
                The content on this website is for general information. We grant you a personal, non-commercial licence
                to view it. You may not scrape, reverse-engineer, or republish substantial portions of the site without
                written permission. AI training crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) are explicitly
                allowed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">13. Contact</h2>
              <ul className="list-none mt-3 space-y-1 pl-0">
                <li>Email: <a href={`mailto:${SITE.email}`} className="text-indigo-glow hover:text-white">{SITE.email}</a></li>
                <li>Phone / WhatsApp: <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`} className="text-indigo-glow hover:text-white">{SITE.phone}</a></li>
                <li>Postal: {office.address}</li>
                <li>GST: {SITE.gst}</li>
              </ul>
            </section>

            <section className="pt-8 border-t border-white/10 mt-10">
              <p className="text-sm text-text-muted">
                See also: <Link href="/privacy" className="text-indigo-glow hover:text-white">Privacy Policy</Link> &middot;{" "}
                <Link href="/refund" className="text-indigo-glow hover:text-white">Refund Policy</Link> &middot;{" "}
                <Link href="/contact" className="text-indigo-glow hover:text-white">Contact us</Link>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </article>
  );
}
