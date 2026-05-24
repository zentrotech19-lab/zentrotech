import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SITE, OFFICES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How ZentroTECH collects, stores, processes, and protects your personal data. DPDP Act 2023 compliant. Bangalore, India.",
  path: "/privacy",
});

const LAST_UPDATED = "24 May 2026";
const office = OFFICES[0];

export default function PrivacyPolicyPage() {
  return (
    <article className="py-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-indigo-glow font-mono">Legal</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-text-muted">Last updated: {LAST_UPDATED}</p>

          <div className="prose-zentro mt-10 text-text-secondary leading-relaxed space-y-7">
            <section>
              <p>
                {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website {SITE.url} and the
                associated services described on it. This Privacy Policy explains what information we collect about you,
                why we collect it, how we use it, and the rights you have over it. We comply with India&rsquo;s Digital
                Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">1. Who we are</h2>
              <p>
                {SITE.name} is a proprietorship based at {office.address}. Contact:{" "}
                <a href={`mailto:${SITE.email}`} className="text-indigo-glow hover:text-white">
                  {SITE.email}
                </a>{" "}
                ·{" "}
                <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`} className="text-indigo-glow hover:text-white">
                  {SITE.phone}
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">2. Personal data we collect</h2>
              <p>We collect the following categories of personal data, and only when you actively provide it:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-white">Contact form submissions:</strong> name, business name, WhatsApp number,
                  alternate phone, email, city, industry, business size, years in business, current website (if any),
                  service interests, primary goal, monthly lead volume, investment range, timeline, project description,
                  source, and any additional notes you share.
                </li>
                <li>
                  <strong className="text-white">Automatic technical data:</strong> IP address, browser type, device type,
                  pages visited, time on page, referring URL. This is collected by Vercel Analytics, Google Analytics
                  (GA4), and Microsoft Clarity to help us understand how visitors use the site. None of these tools
                  receive your name, email, or phone number unless you submit a form.
                </li>
                <li>
                  <strong className="text-white">Communications:</strong> the content of any WhatsApp, phone call, or
                  email you send us in response to your enquiry, kept only as long as needed to serve you.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">3. How we use your data</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to your enquiry within one business day with a quote, audit, or scoping conversation.</li>
                <li>
                  To deliver the services you contract us for (websites, AI automations, audits, etc.), including
                  communicating about scope, timelines, deliverables, and invoices.
                </li>
                <li>To send you transactional emails about your project (kickoff confirmations, milestone updates).</li>
                <li>To improve our website and content based on aggregated, de-identified analytics.</li>
                <li>To comply with Indian tax (GST), legal, and regulatory obligations.</li>
              </ul>
              <p className="mt-3">
                We do <strong className="text-white">not</strong> use your data for unsolicited marketing, do not sell or
                rent your data to third parties, and do not use it to train AI models. If we ever want to do something
                with your data beyond what is listed above, we will ask you first.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">4. Lawful basis (DPDP)</h2>
              <p>
                Under the DPDP Act, we process your personal data on the basis of your explicit consent, given through
                the consent checkbox on our contact form. You may withdraw consent at any time by emailing{" "}
                <a href={`mailto:${SITE.email}`} className="text-indigo-glow hover:text-white">
                  {SITE.email}
                </a>{" "}
                with the subject line &ldquo;Withdraw consent&rdquo;. Withdrawal does not affect lawful processing that
                occurred before the withdrawal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">5. Data sharing</h2>
              <p>
                We share data only with the processors that are technically required to run this website and deliver our
                services:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-white">Vercel</strong> (hosting) &mdash; United States, GDPR + SOC 2 certified.</li>
                <li><strong className="text-white">Google Analytics</strong> &mdash; aggregated traffic analytics.</li>
                <li><strong className="text-white">Microsoft Clarity</strong> &mdash; session replay and heatmaps (sensitive form fields are masked).</li>
                <li><strong className="text-white">Cloudflare / Vercel CDN</strong> &mdash; edge caching, DDoS protection.</li>
                <li><strong className="text-white">Resend / Google Workspace</strong> &mdash; transactional email delivery.</li>
                <li><strong className="text-white">WhatsApp Business</strong> &mdash; if you contact us via WhatsApp.</li>
              </ul>
              <p className="mt-3">
                We do not sell, lease, or trade personal data with anyone. We may share information if compelled by a
                lawful Indian court order or regulator.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">6. Data retention</h2>
              <p>
                Lead form submissions are retained for up to 24 months from the date of submission, or until you ask us
                to delete them, whichever comes first. Active-client project data is retained for the duration of the
                engagement plus 7 years for GST and tax record-keeping obligations. Technical analytics data is retained
                per the default settings of the analytics provider (typically 14&ndash;26 months) in aggregated form.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">7. Your rights under the DPDP Act</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Right to access</strong> a summary of the personal data we hold about you.</li>
                <li><strong className="text-white">Right to correction</strong> of inaccurate or incomplete data.</li>
                <li><strong className="text-white">Right to erasure</strong> of your personal data, subject to legal retention obligations.</li>
                <li><strong className="text-white">Right to withdraw consent</strong> at any time.</li>
                <li><strong className="text-white">Right to nominate</strong> another person to exercise these rights on your behalf in the event of your death or incapacity.</li>
                <li><strong className="text-white">Right to grievance redressal</strong>: contact us first; if unresolved within 30 days, escalate to the Data Protection Board of India.</li>
              </ul>
              <p className="mt-3">
                Email <a href={`mailto:${SITE.email}`} className="text-indigo-glow hover:text-white">{SITE.email}</a> with
                the subject &ldquo;DPDP request&rdquo; to exercise any of these. We respond within 15 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">8. Security</h2>
              <p>
                We use HTTPS everywhere, hash sensitive credentials, restrict admin access by IP and 2FA, and store
                lead data in encrypted vendor databases. No system is 100% secure; if we ever experience a breach
                affecting your data, we will notify you and the Data Protection Board within 72 hours as required by
                the DPDP Act.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">9. Children</h2>
              <p>
                Our services are for business use. We do not knowingly collect personal data from anyone under 18. If
                you believe a child has submitted data through our forms, email us and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">10. Changes to this policy</h2>
              <p>
                We may update this Privacy Policy as our services or the law evolves. The current version&rsquo;s last
                updated date appears at the top of this page. Material changes will be announced via the website banner
                for 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">11. Contact &amp; grievance officer</h2>
              <p>
                For any privacy question, complaint, or DPDP rights request:
              </p>
              <ul className="list-none mt-3 space-y-1 pl-0">
                <li>Email: <a href={`mailto:${SITE.email}`} className="text-indigo-glow hover:text-white">{SITE.email}</a></li>
                <li>Phone / WhatsApp: <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`} className="text-indigo-glow hover:text-white">{SITE.phone}</a></li>
                <li>Postal: {office.address}</li>
              </ul>
            </section>

            <section className="pt-8 border-t border-white/10 mt-10">
              <p className="text-sm text-text-muted">
                See also: <Link href="/terms" className="text-indigo-glow hover:text-white">Terms of Service</Link> &middot;{" "}
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
