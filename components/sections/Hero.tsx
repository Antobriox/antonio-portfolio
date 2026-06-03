"use client";

import { ArrowDownRight, Gauge, Mail, MapPin, RadioTower } from "lucide-react";
import { Link } from "react-scroll";

import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { mainStack } from "@/lib/portfolio";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-[#0B0B0B] px-5 pt-32 text-[#F5F5F5] sm:px-8">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-x-0 bottom-0 h-[44%] bg-[linear-gradient(105deg,transparent_0_42%,rgba(245,158,11,0.14)_42.3%,transparent_43.2%,transparent_57%,rgba(245,245,245,0.13)_57.4%,transparent_58.2%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(220,38,38,0.22),transparent_28%),radial-gradient(circle_at_12%_82%,rgba(30,41,59,0.55),transparent_32%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.03fr_0.97fr]">
        <FadeIn>
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge className="rounded-md border-amber-400/35 bg-amber-400/10 px-3 py-1 font-mono text-amber-300">
                {t.hero.badge}
              </Badge>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">{t.hero.location}</span>
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] text-zinc-50 sm:text-7xl lg:text-8xl">
              Antonio Briones
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              {t.hero.paragraphOne}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">{t.hero.paragraphTwo}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="builds" smooth offset={-84} duration={700}>
                <MagneticButton>
                  {t.hero.projects}
                  <ArrowDownRight className="size-4" />
                </MagneticButton>
              </Link>
              <Link to="contacto" smooth offset={-84} duration={700}>
                <MagneticButton variant="ghost">
                  {t.hero.contact}
                  <Mail className="size-4" />
                </MagneticButton>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {mainStack.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2 font-mono text-xs text-zinc-300 transition hover:border-amber-400/60 hover:text-amber-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div className="relative hidden min-h-[520px] items-center justify-center lg:flex">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div className="absolute left-1/2 top-16 h-[620px] w-24 -translate-x-1/2 rotate-[14deg] bg-[linear-gradient(90deg,transparent_0_38%,rgba(245,158,11,0.24)_41%,transparent_44%,transparent_56%,rgba(245,245,245,0.18)_59%,transparent_62%)] blur-[1px]" />
              <div className="absolute right-8 top-28 h-80 w-80 rounded-full border border-red-500/10" />
              <div className="absolute bottom-12 left-10 h-52 w-52 rounded-full border border-amber-400/10" />
            </div>

            <div className="relative w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-950/76 p-5 shadow-[0_0_70px_rgba(220,38,38,0.12)] backdrop-blur">
              <div className="flex items-start justify-between border-b border-zinc-800 pb-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-amber-300">{t.hero.plate}</p>
                  <h2 className="mt-3 text-3xl font-semibold text-zinc-50">Antonio Briones</h2>
                </div>
                <Gauge className="size-6 text-red-500" />
              </div>

              <div className="mt-5 grid gap-3">
                {t.hero.plateRows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[7rem_1fr] items-center rounded-md border border-zinc-800 bg-[#18181B]/70 px-4 py-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{label}</span>
                    <span className="text-sm font-semibold text-zinc-100">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-amber-400/20 bg-amber-400/8 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-200">
                    <RadioTower className="size-4" />
                    {t.hero.available}
                  </div>
                  <p className="mt-2 text-xs leading-6 text-zinc-400">{t.hero.availableText}</p>
                </div>
                <div className="rounded-md border border-red-500/20 bg-red-500/8 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-red-200">
                    <MapPin className="size-4" />
                    {t.hero.country}
                  </div>
                  <p className="mt-2 text-xs leading-6 text-zinc-400">{t.hero.countryText}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
