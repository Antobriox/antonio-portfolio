"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { language, toggleLanguage, navItems } = useI18n();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-lg border px-4 py-3 transition-all duration-300",
          scrolled
            ? "border-zinc-800/90 bg-zinc-950/82 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <Link to="inicio" smooth duration={700} className="cursor-pointer">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-50">Antobriox</span>
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-amber-400">DEV</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              smooth
              spy
              offset={-84}
              duration={700}
              activeClass="text-amber-300"
              className="cursor-pointer rounded-md px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-zinc-50"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleLanguage}
            className="ml-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-amber-300 transition hover:border-amber-400/50 hover:bg-zinc-900"
            aria-label={language === "es" ? "Cambiar a ingles" : "Switch to Spanish"}
          >
            {language === "es" ? "EN" : "ES"}
          </button>
        </div>

        <Button
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
          className="border-zinc-800 bg-zinc-950 text-zinc-50 md:hidden"
          size="icon"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      {open ? (
        <div className="mx-auto mt-2 grid max-w-7xl gap-1 rounded-lg border border-zinc-800 bg-zinc-950/95 p-2 shadow-2xl backdrop-blur-xl md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              smooth
              offset={-84}
              duration={700}
              onClick={() => setOpen(false)}
              className="cursor-pointer rounded-md px-3 py-3 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-md border border-zinc-800 px-3 py-3 text-left font-mono text-xs uppercase tracking-[0.18em] text-amber-300 hover:bg-zinc-900"
          >
            {language === "es" ? "English" : "Espanol"}
          </button>
        </div>
      ) : null}
    </header>
  );
}
