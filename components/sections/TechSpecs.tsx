"use client";

import { Wrench } from "lucide-react";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";

export function TechSpecs() {
  const { t, techGroups } = useI18n();

  return (
    <SectionReveal id="specs" eyebrow={t.specs.eyebrow} title={t.specs.title}>
      <div className="grid gap-5 md:grid-cols-2">
        {techGroups.map((group, index) => (
          <FadeIn key={group.title} delay={index * 0.08}>
            <article className="rounded-lg border border-zinc-800 bg-zinc-950/72 p-5 shadow-[inset_0_1px_0_rgba(245,245,245,0.04)] transition hover:border-red-500/45">
              <div className="mb-5 flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">{t.specs.block}</p>
                  <h3 className="mt-1 text-xl font-semibold text-zinc-50">{group.title}</h3>
                </div>
                <Wrench className="size-5 text-amber-300" />
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge
                    key={item}
                    className="rounded-md border-zinc-700 bg-[#18181B] px-3 py-1.5 text-zinc-300 transition hover:border-amber-400 hover:bg-amber-400/10 hover:text-amber-100"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </SectionReveal>
  );
}
