"use client";

import type { ReactNode } from "react";

import { FadeIn } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

type SectionRevealProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function SectionReveal({ id, eyebrow, title, children, className }: SectionRevealProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-28 py-20 sm:py-28", className)}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <div className="mb-10 flex flex-col gap-3 sm:mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-amber-400">{eyebrow}</p>
            <h2 className="max-w-3xl text-3xl font-semibold text-zinc-50 sm:text-5xl">{title}</h2>
          </div>
        </FadeIn>
        {children}
      </div>
    </section>
  );
}
