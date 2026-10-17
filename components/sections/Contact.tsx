"use client";

import { Loader2, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { CONTACT_LIMITS, createContactSchema, submitContact, type ContactForm } from "@/lib/contact";

export function Contact() {
  const { t, contactLinks } = useI18n();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const contactSchema = useMemo(
    () => createContactSchema(t.contact.errors),
    [t]
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactForm) => {
    setStatus("idle");
    if (!(await submitContact(values))) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset();
  };

  return (
    <SectionReveal id="contacto" eyebrow={t.contact.eyebrow} title={t.contact.title}>
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <FadeIn>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/72 p-6">
            <p className="text-lg leading-8 text-zinc-300">
              {t.contact.lead}
            </p>
            <p className="mt-4 leading-8 text-zinc-400">{t.contact.text}</p>

            <div className="mt-8 grid gap-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-[#18181B]/70 p-4 text-zinc-300 transition hover:border-amber-400/50 hover:text-amber-200"
                >
                  <link.icon className="size-5 text-red-400" />
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{link.label}</span>
                    <span className="text-sm">{link.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <form onSubmit={handleSubmit(onSubmit)} aria-busy={isSubmitting} className="rounded-lg border border-zinc-800 bg-zinc-950/72 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-zinc-300">
                {t.contact.fields.name}
                <Input autoComplete="name" readOnly={isSubmitting} maxLength={CONTACT_LIMITS.name} aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} className="border-zinc-800 bg-[#18181B] text-zinc-50" {...register("name")} />
                {errors.name ? <span id="contact-name-error" className="text-xs text-red-300">{errors.name.message}</span> : null}
              </label>
              <label className="grid gap-2 text-sm text-zinc-300">
                {t.contact.fields.email}
                <Input autoComplete="email" readOnly={isSubmitting} maxLength={CONTACT_LIMITS.email} aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} className="border-zinc-800 bg-[#18181B] text-zinc-50" type="email" {...register("email")} />
                {errors.email ? <span id="contact-email-error" className="text-xs text-red-300">{errors.email.message}</span> : null}
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm text-zinc-300">
              {t.contact.fields.message}
              <Textarea readOnly={isSubmitting} maxLength={CONTACT_LIMITS.message} aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined} className="min-h-36 border-zinc-800 bg-[#18181B] text-zinc-50" {...register("message")} />
              {errors.message ? <span id="contact-message-error" className="text-xs text-red-300">{errors.message.message}</span> : null}
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button
                disabled={isSubmitting}
                className="h-11 rounded-lg border-red-500/60 bg-red-600 px-5 font-semibold text-white hover:bg-red-500"
              >
                {isSubmitting ? <Loader2 aria-hidden="true" className="mr-2 size-4 animate-spin motion-reduce:animate-none" /> : <Send aria-hidden="true" className="mr-2 size-4" />}
                {t.contact.fields.submit}
              </Button>
              <MagneticButton href="mailto:antoniobriones1910@gmail.com" variant="ghost">
                {t.contact.fields.direct}
              </MagneticButton>
            </div>

            <div role="status" aria-live="polite" aria-atomic="true">
              {status === "success" ? <p className="mt-4 text-sm text-amber-200">{t.contact.success}</p> : null}
              {status === "error" ? <p className="mt-4 text-sm text-red-300">{t.contact.error}</p> : null}
            </div>
          </form>
        </FadeIn>
      </div>
    </SectionReveal>
  );
}
