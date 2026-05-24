import { NextResponse } from "next/server";
import { z } from "zod";
import { SITE } from "@/lib/constants";

// Mirrors the client-side Zod schema in /contact. Keep in sync if either changes.
const RequirementsPayload = z.object({
  name: z.string().min(2).max(120),
  businessName: z.string().min(2).max(160),
  whatsapp: z.string().min(10).max(20),
  phone: z.string().max(20).optional().or(z.literal("")),
  email: z.string().email(),
  city: z.string().min(2).max(60),
  industry: z.string().min(2).max(80),
  businessSize: z.string().min(2).max(20),
  yearsInBusiness: z.string().min(1).max(20),
  currentWebsite: z.string().max(200).optional().or(z.literal("")),
  needs: z.array(z.string()).min(1),
  needsOther: z.string().max(200).optional().or(z.literal("")),
  primaryGoal: z.string().min(2).max(120),
  monthlyLeads: z.string().min(1).max(40),
  investmentRange: z.string().min(2).max(40),
  timeline: z.string().min(2).max(40),
  description: z.string().min(30).max(5000),
  source: z.string().max(60).optional().or(z.literal("")),
  additionalNotes: z.string().max(2000).optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true),
});

type Lead = z.infer<typeof RequirementsPayload>;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildLeadEmail(lead: Lead, submittedAtIst: string): { subject: string; html: string; text: string } {
  const subject = `New lead — ${lead.name} (${lead.businessName}) · ${lead.city} · ${lead.investmentRange}`;
  const lines: Array<[string, string]> = [
    ["Submitted", submittedAtIst],
    ["Name", lead.name],
    ["Business", lead.businessName],
    ["WhatsApp", lead.whatsapp],
    ["Phone", lead.phone || "—"],
    ["Email", lead.email],
    ["City", lead.city],
    ["Industry", lead.industry],
    ["Size", lead.businessSize],
    ["Years", lead.yearsInBusiness],
    ["Website", lead.currentWebsite || "—"],
    ["Needs", lead.needs.join(", ")],
    ["Other needs", lead.needsOther || "—"],
    ["Primary goal", lead.primaryGoal],
    ["Current monthly leads", lead.monthlyLeads],
    ["Investment range", lead.investmentRange],
    ["Timeline", lead.timeline],
    ["Source", lead.source || "—"],
    ["Notes", lead.additionalNotes || "—"],
  ];
  const text =
    `New ZentroTECH lead\n\n` +
    lines.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nDescription:\n${lead.description}\n`;

  const rows = lines
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 12px;border-bottom:1px solid #eee;color:#111;vertical-align:top">${escapeHtml(v)}</td></tr>`
    )
    .join("");

  const html = `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#111;background:#f9fafb;padding:24px">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6 60%,#ec4899);padding:16px 20px;color:#fff">
      <div style="font-weight:800;letter-spacing:0.5px">ZENTROTECH</div>
      <div style="font-size:18px;font-weight:700;margin-top:4px">New lead submission</div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
    <div style="padding:14px 20px;border-top:2px solid #f3f4f6">
      <div style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:6px">Project description</div>
      <div style="color:#111;white-space:pre-wrap;line-height:1.55">${escapeHtml(lead.description)}</div>
    </div>
    <div style="padding:12px 20px;background:#f9fafb;color:#6b7280;font-size:12px;text-align:center">
      Reply directly to <a href="mailto:${escapeHtml(lead.email)}" style="color:#6366f1">${escapeHtml(lead.email)}</a>
      &middot; WhatsApp <a href="https://wa.me/${escapeHtml(lead.whatsapp.replace(/\D+/g, ""))}" style="color:#25D366">${escapeHtml(lead.whatsapp)}</a>
    </div>
  </div>
</body></html>`;

  return { subject, html, text };
}

function buildWhatsappFallbackUrl(lead: Lead): string {
  const phone = SITE.whatsapp.replace(/\D+/g, "");
  const msg =
    `Hi ZentroTECH — I just submitted the requirements form.\n\n` +
    `Name: ${lead.name}\n` +
    `Business: ${lead.businessName}\n` +
    `City: ${lead.city}\n` +
    `Industry: ${lead.industry}\n` +
    `Need: ${lead.needs.join(", ")}\n` +
    `Goal: ${lead.primaryGoal}\n` +
    `Timeline: ${lead.timeline}\n` +
    `Investment: ${lead.investmentRange}\n\n` +
    `(Form already submitted — sending this so it lands on your WhatsApp directly.)`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

async function sendViaResend(lead: Lead, email: { subject: string; html: string; text: string }): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY not configured" };

  const from = process.env.LEAD_EMAIL_FROM ?? `ZentroTECH Leads <leads@zentrotech.in>`;
  const to = process.env.LEAD_EMAIL_TO ?? SITE.email;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: email.subject,
        html: email.html,
        text: email.text,
        tags: [
          { name: "type", value: "lead" },
          { name: "investment", value: lead.investmentRange.replace(/[^\w-]/g, "_") },
        ],
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}

async function postToWebhook(lead: Lead, submittedAtIst: string): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return { ok: false, error: "LEAD_WEBHOOK_URL not configured" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submittedAtIst, ...lead }),
    });
    if (!res.ok) return { ok: false, error: `Webhook ${res.status}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = RequirementsPayload.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const lead = parsed.data;
  const submittedAtIst = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Structured server log — surfaces in Vercel logs even if email/webhook fail.
  // Keep this so leads are never lost: at minimum, we can recover from logs.
  console.log(
    "[lead]",
    JSON.stringify({
      at: submittedAtIst,
      name: lead.name,
      business: lead.businessName,
      city: lead.city,
      industry: lead.industry,
      investment: lead.investmentRange,
      timeline: lead.timeline,
      whatsapp: lead.whatsapp,
      email: lead.email,
      needs: lead.needs,
    })
  );

  const email = buildLeadEmail(lead, submittedAtIst);

  // Fan out to all configured delivery channels in parallel — don't fail the
  // whole request if any single channel is down. The user always gets the
  // success response + the WhatsApp fallback URL.
  const [emailResult, webhookResult] = await Promise.allSettled([
    sendViaResend(lead, email),
    postToWebhook(lead, submittedAtIst),
  ]);

  const delivery = {
    email:
      emailResult.status === "fulfilled" ? emailResult.value : { ok: false, error: "rejected" },
    webhook:
      webhookResult.status === "fulfilled" ? webhookResult.value : { ok: false, error: "rejected" },
  };
  if (!delivery.email.ok || !delivery.webhook.ok) {
    console.warn("[lead] delivery partial", delivery);
  }

  return NextResponse.json({
    ok: true,
    whatsappFallbackUrl: buildWhatsappFallbackUrl(lead),
  });
}
