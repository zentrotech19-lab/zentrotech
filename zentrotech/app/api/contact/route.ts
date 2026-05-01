import { NextResponse } from "next/server";
import { z } from "zod";

const ContactPayload = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().max(120).optional().or(z.literal("")),
  service: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10).max(5000),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ContactPayload.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // TODO: wire to Resend per CONTENT.md (transactional + lead notification).
  // For now we log on the server so the submission can be eyeballed in dev,
  // and return 200 so the UI's success path is exercisable end-to-end.
  console.log("[contact] new submission", parsed.data);

  return NextResponse.json({ ok: true });
}
