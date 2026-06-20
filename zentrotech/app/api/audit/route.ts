import { NextResponse } from "next/server";
import { z } from "zod";
import { SITE } from "@/lib/constants";

// Lead-flow audit request. Deliberately SHORT — speed-to-lead beats a long
// form here. The whole point of /audit is a low-friction "book the audit"
// capture, then we qualify on WhatsApp. Keep this schema in sync with the
// client schema in app/audit/audit-form.tsx.
const AuditPayload = z.object({
  name: z.string().min(2).max(120),
  businessName: z.string().min(2).max(160),
  whatsapp: z.string().min(10).max(20),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().max(200).optional().or(z.literal("")),
  vertical: z.string().min(2).max(80),
  biggestLeak: z.string().min(2).max(120),
  monthlyMissed: z.string().max(40).optional().or(z.literal("")),
  source: z.string().max(120).optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true),
});

type Audit = z.infer<typeof AuditPayload>;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildAuditEmail(a: Audit, atIst: string): { subject: string; html: string; text: string } {
  const subject = `AUDIT request — ${a.name} (${a.businessName}) · ${a.vertical} · leak: ${a.biggestLeak}`;
  const lines: Array<[string, string]> = [
    ["Submitted", atIst],
    ["Name", a.name],
    ["Business", a.businessName],
    ["WhatsApp", a.whatsapp],
    ["Email", a.email || "—"],
    ["Website", a.website || "—"],
    ["Vertical", a.vertical],
    ["Biggest leak (self-reported)", a.biggestLeak],
    ["Est. missed enquiries/mo", a.monthlyMissed || "—"],
    ["Source", a.source || "—"],
  ];
  const text =
    `New ZentroTECH AUDIT request (speed-to-lead — reply on WhatsApp within 5 min)\n\n` +
    lines.map(([k, v]) => `${k}: ${v}`).join("\n");
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
      <div style="font-size:18px;font-weight:700;margin-top:4px">Free lead-flow AUDIT request</div>
      <div style="font-size:12px;opacity:0.9;margin-top:2px">Speed-to-lead — WhatsApp them within 5 minutes.</div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
    <div style="padding:12px 20px;background:#f9fafb;color:#6b7280;font-size:12px;text-align:center">
      WhatsApp <a href="https://wa.me/${escapeHtml(a.whatsapp.replace(/\D+/g, ""))}" style="color:#25D366">${escapeHtml(a.whatsapp)}</a>
      ${a.email ? `&middot; <a href="mailto:${escapeHtml(a.email)}" style="color:#6366f1">${escapeHtml(a.email)}</a>` : ""}
    </div>
  </div>
</body></html>`;
  return { subject, html, text };
}

function buildAuditWhatsappFallback(a: Audit): string {
  const phone = SITE.whatsapp.replace(/\D+/g, "");
  const msg =
    `Hi ZentroTECH — I just requested the free lead-flow audit.\n\n` +
    `Name: ${a.name}\n` +
    `Business: ${a.businessName}\n` +
    `Vertical: ${a.vertical}\n` +
    `Biggest leak: ${a.biggestLeak}\n` +
    (a.website ? `Website: ${a.website}\n` : "") +
    `\n(Form submitted — sending here so it lands on your WhatsApp directly.)`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

async function sendViaResend(a: Audit, email: { subject: string; html: string; text: string }): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY not configured" };
  const from = process.env.LEAD_EMAIL_FROM ?? `ZentroTECH Leads <leads@zentrotech.in>`;
  const to = process.env.LEAD_EMAIL_TO ?? SITE.email;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: a.email || undefined,
        subject: email.subject,
        html: email.html,
        text: email.text,
        tags: [
          { name: "type", value: "audit" },
          { name: "vertical", value: a.vertical.replace(/[^\w-]/g, "_").slice(0, 40) },
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

async function postToWebhook(a: Audit, atIst: string): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return { ok: false, error: "LEAD_WEBHOOK_URL not configured" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "audit", submittedAtIst: atIst, ...a }),
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

  const parsed = AuditPayload.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const a = parsed.data;
  const atIst = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Never lose a lead: structured log surfaces in Vercel even if email/webhook fail.
  console.log(
    "[audit]",
    JSON.stringify({
      at: atIst,
      name: a.name,
      business: a.businessName,
      vertical: a.vertical,
      leak: a.biggestLeak,
      whatsapp: a.whatsapp,
      website: a.website,
      source: a.source,
    })
  );

  const email = buildAuditEmail(a, atIst);
  const [emailResult, webhookResult] = await Promise.allSettled([
    sendViaResend(a, email),
    postToWebhook(a, atIst),
  ]);
  const delivery = {
    email: emailResult.status === "fulfilled" ? emailResult.value : { ok: false, error: "rejected" },
    webhook: webhookResult.status === "fulfilled" ? webhookResult.value : { ok: false, error: "rejected" },
  };
  if (!delivery.email.ok || !delivery.webhook.ok) {
    console.warn("[audit] delivery partial", delivery);
  }

  return NextResponse.json({
    ok: true,
    whatsappFallbackUrl: buildAuditWhatsappFallback(a),
  });
}
