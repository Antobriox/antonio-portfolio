import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createContactSchema } from "@/lib/contact";
import { ContactBodyTooLarge, createContactBudget, readContactBody } from "@/lib/contact-server";

const contactSchema = createContactSchema();
const takeBudget = createContactBudget();

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return NextResponse.json({ error: "Unsupported media type" }, { status: 415 });
  }

  const retryAfter = takeBudget();
  if (retryAfter) {
    return NextResponse.json({ error: "Too many requests" }, {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    });
  }

  let body: unknown;
  try {
    body = await readContactBody(request);
  } catch (error) {
    return NextResponse.json({ error: "Invalid payload" }, {
      status: error instanceof ContactBodyTooLarge ? 413 : 400,
    });
  }
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Contact service unavailable" }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "antoniobriones1910@gmail.com";
  const { name, email, message } = result.data;

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `Nuevo contacto de ${name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
    });
    if (error || !data?.id) {
      return NextResponse.json({ error: "Unable to send message" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Unable to send message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
