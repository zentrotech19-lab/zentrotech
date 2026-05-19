import { NextResponse } from "next/server";
import { z } from "zod";

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

  // TODO: wire to Resend / WhatsApp Business API / CRM webhook for real
  // notification routing. Right now we log on the server so submissions
  // can be eyeballed in dev.
  console.log("[requirements] new lead", parsed.data);

  return NextResponse.json({ ok: true });
}
