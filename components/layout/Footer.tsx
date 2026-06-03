"use client";

import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 px-5 py-8 text-sm text-zinc-500 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>Antonio Briones - Full Stack Developer</p>
        <p className="font-mono uppercase tracking-[0.22em] text-zinc-600">{t.footer}</p>
      </div>
    </footer>
  );
}
