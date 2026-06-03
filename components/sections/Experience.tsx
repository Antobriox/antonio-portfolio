"use client";

import { Calendar, Database } from "lucide-react";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";

export function Experience() {
  const { t, experiences } = useI18n();

  return (
    <SectionReveal id="experiencia" eyebrow={t.experience.eyebrow} title={t.experience.title}>
      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-red-500 via-amber-400 to-transparent md:block" />
        <div className="space-y-5">
          {experiences.map((item, index) => (
            <FadeIn key={`${item.company}-${item.year}`} delay={index * 0.08}>
              <article className="grid gap-4 rounded-lg border border-zinc-800 bg-zinc-950/72 p-5 transition hover:border-amber-400/40 md:grid-cols-[8rem_1fr] md:pl-12">
                <div className="flex items-center gap-2 font-mono text-sm text-amber-300">
                  <Calendar className="size-4" />
                  {item.year}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-50">{item.role}</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-red-400">{item.company}</p>
                  <p className="mt-4 leading-8 text-zinc-300">{item.description}</p>
                  {item.technologies ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <Badge key={tech} className="rounded-md border-zinc-700 bg-[#18181B] text-zinc-300">
                          <Database className="mr-1 size-3" />
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
