import { z } from "zod";

export const CONTACT_LIMITS = { name: 100, email: 254, message: 5000 } as const;

export function createContactSchema(errors?: { name: string; email: string; message: string }) {
  return z.object({
    name: z.string().trim().min(2, errors?.name).max(CONTACT_LIMITS.name, errors?.name)
      .refine((name) => !/[\r\n]/.test(name), errors?.name),
    email: z.email(errors?.email).max(CONTACT_LIMITS.email, errors?.email),
    message: z.string().trim().min(12, errors?.message).max(CONTACT_LIMITS.message, errors?.message),
  });
}

export type ContactForm = z.infer<ReturnType<typeof createContactSchema>>;

export async function submitContact(values: ContactForm): Promise<boolean> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) return false;
    const result: unknown = await response.json();
    return typeof result === "object" && result !== null && "ok" in result && result.ok === true;
  } catch {
    return false;
  }
}
