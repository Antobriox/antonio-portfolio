"use client";

import { Code2, Cpu, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();
  const pillars: { icon: LucideIcon; title: string; text: string }[] = [
    {
      icon: Code2,
      ...t.about.pillars[0],
    },
    {
      icon: Cpu,
      ...t.about.pillars[1],
    },
    {
      icon: Route,
      ...t.about.pillars[2],
    },
  ];

  return (
    <SectionReveal id="sobre-mi" eyebrow={t.about.eyebrow} title={t.about.title}>
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <FadeIn>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-6 text-zinc-300 shadow-[0_0_50px_rgba(30,41,59,0.22)]">
            <p className="leading-8">
              {t.about.paragraphOne}
            </p>
            <p className="mt-5 leading-8">{t.about.paragraphTwo}</p>
          </div>
        </FadeIn>

        <div className="grid gap-4">
          {pillars.map(({ icon: Icon, title, text }, index) => (
            <FadeIn key={title} delay={index * 0.08}>
              <div className="rounded-lg border border-zinc-800 bg-[#18181B]/70 p-5 transition hover:border-amber-400/45 hover:bg-zinc-900/80">
                <div className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-md border border-red-500/30 bg-red-500/10 text-red-400">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-50">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-400">{text}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
