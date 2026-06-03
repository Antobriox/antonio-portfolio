import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  message: z.string().min(12),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "antoniobriones1910@gmail.com";
  const { name, email, message } = result.data;

  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: toEmail,
    replyTo: email,
    subject: `Nuevo contacto de ${name}`,
    text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
  });

  return NextResponse.json({ ok: true });
}
