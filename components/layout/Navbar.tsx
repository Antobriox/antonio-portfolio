"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { language, toggleLanguage, navItems } = useI18n();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label={language === "es" ? "Navegación principal" : "Main navigation"}
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-lg border px-4 py-3 transition-all duration-300",
          scrolled
            ? "border-zinc-800/90 bg-zinc-950/82 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <a href="#inicio" className="cursor-pointer">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-50">Antobriox</span>
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-amber-400">Dev</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              className="cursor-pointer rounded-md px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-zinc-50"
            >
              {item.label}
            </a>
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
          ref={menuButton}
          aria-label={language === "es" ? (open ? "Cerrar menú" : "Abrir menú") : (open ? "Close menu" : "Open menu")}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="border-zinc-800 bg-zinc-950 text-zinc-50 md:hidden"
          size="icon"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      <nav
        id="mobile-navigation"
        aria-label={language === "es" ? "Navegación móvil" : "Mobile navigation"}
        className={cn("mx-auto mt-2 max-w-7xl gap-1 rounded-lg border border-zinc-800 bg-zinc-950/95 p-2 shadow-2xl backdrop-blur-xl md:hidden", open ? "grid" : "hidden")}
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={`#${item.href}`}
            onClick={() => {
              setOpen(false);
              document.getElementById(item.href)?.focus({ preventScroll: true });
            }}
            className="cursor-pointer rounded-md px-3 py-3 text-sm text-zinc-200 hover:bg-zinc-900"
          >
            {item.label}
          </a>
        ))}
        <button
          type="button"
          onClick={toggleLanguage}
          className="rounded-md border border-zinc-800 px-3 py-3 text-left font-mono text-xs uppercase tracking-[0.18em] text-amber-300 hover:bg-zinc-900"
        >
          {language === "es" ? "English" : "Espanol"}
        </button>
      </nav>
    </header>
  );
}
