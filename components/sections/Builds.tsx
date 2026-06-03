"use client";

import { ExternalLink, Rocket, ShieldCheck } from "lucide-react";

import { FadeIn } from "@/components/animations/FadeIn";
import { ParallaxContainer } from "@/components/animations/ParallaxContainer";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

export function Builds() {
  const { t, builds } = useI18n();

  return (
    <SectionReveal id="builds" eyebrow={t.builds.eyebrow} title={t.builds.title}>
      <div className="grid gap-6 lg:grid-cols-2">
        {builds.map((build, index) => (
          <FadeIn key={build.name} delay={index * 0.1}>
            <ParallaxContainer>
              <Card className="rounded-lg border-zinc-800 bg-zinc-950/78 py-0 text-zinc-100 shadow-[0_0_55px_rgba(220,38,38,0.1)] transition hover:border-red-500/45">
                <CardHeader className="border-b border-zinc-800 px-5 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.24em] text-amber-300">
                        {t.builds.label} {build.number.replace("BUILD ", "")}
                      </p>
                      <CardTitle className="mt-2 text-2xl font-semibold text-zinc-50">{build.name}</CardTitle>
                    </div>
                    <ShieldCheck className="size-6 text-red-500" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 px-5 py-5">
                  <p className="leading-7 text-zinc-300">{build.description}</p>

                  {build.features ? (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {build.features.map((feature) => (
                        <span key={feature} className="rounded-md border border-zinc-800 bg-[#18181B]/70 px-3 py-2 text-sm text-zinc-400">
                          {feature}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    {build.technologies.map((tech) => (
                      <Badge key={tech} className="rounded-md border-amber-400/25 bg-amber-400/8 text-amber-100">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <a
                    href={build.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-200 transition hover:text-amber-300"
                  >
                    <Rocket className="size-4" />
                    {t.builds.cta}
                    <ExternalLink className="size-3.5" />
                  </a>
                </CardContent>
              </Card>
            </ParallaxContainer>
          </FadeIn>
        ))}
      </div>
    </SectionReveal>
  );
}
