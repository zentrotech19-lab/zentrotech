import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Refund Policy",
  description:
    "ZentroTECH's money-back trial and refund policy — eligibility, how to request a refund, processing timeline, and what's covered.",
  path: "/refund",
});

const LAST_UPDATED = "24 May 2026";

export default function RefundPolicyPage() {
  return (
    <article className="py-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-indigo-glow font-mono">Legal</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-black text-white tracking-tight">
            Refund Policy
          </h1>
          <p className="mt-3 text-sm text-text-muted">Last updated: {LAST_UPDATED}</p>

          <div className="prose-zentro mt-10 text-text-secondary leading-relaxed space-y-7">
            <section>
              <p>
                We back our work with a money-back trial because we&rsquo;d rather refund a client than carry a project
                neither side is excited about. This policy explains exactly when refunds apply, how to request one,
                and what to expect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">1. The money-back trial &mdash; covered</h2>
              <p>
                Every new engagement with {SITE.name} includes a money-back trial on the first milestone. The first
                milestone is typically:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>The signed discovery deliverable (audit, scoping doc, sitemap, wireframe, or strategy brief)</li>
                <li><strong className="text-white">plus</strong> the first build milestone of the agreed scope.</li>
              </ul>
              <p className="mt-3">
                If, on review of the first milestone, you decide not to continue, you may request a full refund of
                fees paid to that point. We hand over any work-in-progress files, end the engagement, and refund
                without argument.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">2. How to request a refund</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Email <a href={`mailto:${SITE.email}`} className="text-indigo-glow hover:text-white">{SITE.email}</a>{" "}
                  with the subject line <em>&ldquo;Money-back trial &mdash; refund request&rdquo;</em> within 7 days of
                  the first-milestone deliverable being shared with you.
                </li>
                <li>
                  We may schedule a 15-minute call to understand what didn&rsquo;t work &mdash; this is for our
                  learning, not to talk you out of it. The call is optional.
                </li>
                <li>
                  We confirm the refund amount in writing, process the refund within 7 business days, and credit it
                  back to the original payment method (NEFT/RTGS/UPI/Razorpay).
                </li>
                <li>
                  All ZentroTECH-side accounts (project staging URLs, draft AI agents, code repositories) are paused
                  and you receive a final handoff with any work-in-progress files.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">3. What is <strong className="text-white">not</strong> covered</h2>
              <p>The money-back trial is for the first milestone only. The following are not refundable:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Milestones already accepted by you in writing (e.g., go-live sign-off on a website).</li>
                <li>
                  Third-party costs we paid on your behalf and cannot recover (domain registration, premium plugin
                  licences, paid stock photography, third-party API setup fees).
                </li>
                <li>
                  Monthly Care Plans &mdash; these are prepaid for the current month and cancelable with 30 days&rsquo;
                  notice. Mid-cycle cancellations are not pro-rated, but no further charge applies after the notice
                  period.
                </li>
                <li>
                  Project termination after the first-milestone trial window has closed &mdash; in that case, we
                  invoice for actual work delivered to the termination date and hand over completed assets, but no
                  refund applies on accepted milestones.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">4. Care Plan cancellation</h2>
              <p>
                Care Plans (ongoing maintenance, content updates, monitoring) can be cancelled with 30 days&rsquo;
                written notice via email. The current month&rsquo;s fee is not pro-rated; the next month&rsquo;s
                billing stops. You retain all assets we&rsquo;ve produced.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">5. Subscription &amp; consumption-based services</h2>
              <p>
                Some services we configure (WhatsApp Business API messages, OpenAI / Anthropic API tokens, SMS sends,
                voice-minute usage) are billed directly to <strong className="text-white">your</strong> accounts with
                the third-party vendor &mdash; we have no control over those refunds. Refer to the vendor&rsquo;s own
                refund policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">6. Disputes</h2>
              <p>
                If you believe your refund request was wrongly denied, escalate to{" "}
                <a href={`mailto:${SITE.email}`} className="text-indigo-glow hover:text-white">{SITE.email}</a> with
                the subject <em>&ldquo;Refund dispute&rdquo;</em>. We respond within 5 business days. Failing
                resolution, the dispute process in our{" "}
                <Link href="/terms" className="text-indigo-glow hover:text-white">Terms of Service</Link> applies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">7. Changes to this policy</h2>
              <p>
                We may update this Refund Policy as our service model evolves. Existing engagements continue to be
                governed by the version of the policy in force when the proposal was signed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-10 mb-3">8. Contact</h2>
              <ul className="list-none mt-3 space-y-1 pl-0">
                <li>Email: <a href={`mailto:${SITE.email}`} className="text-indigo-glow hover:text-white">{SITE.email}</a></li>
                <li>Phone / WhatsApp: <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`} className="text-indigo-glow hover:text-white">{SITE.phone}</a></li>
              </ul>
            </section>

            <section className="pt-8 border-t border-white/10 mt-10">
              <p className="text-sm text-text-muted">
                See also: <Link href="/privacy" className="text-indigo-glow hover:text-white">Privacy Policy</Link> &middot;{" "}
                <Link href="/terms" className="text-indigo-glow hover:text-white">Terms of Service</Link> &middot;{" "}
                <Link href="/contact" className="text-indigo-glow hover:text-white">Contact us</Link>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </article>
  );
}
