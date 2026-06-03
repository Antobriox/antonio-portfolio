"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "ghost";
};

export function MagneticButton({ children, className, href, variant = "primary" }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const move = (event: MouseEvent) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(element, { x: x * 0.18, y: y * 0.24, duration: 0.35, ease: "power3.out" });
  };

  const reset = () => {
    if (ref.current) {
      gsap.to(ref.current, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.35)" });
    }
  };

  const baseClass = cn(
    "relative h-11 overflow-hidden rounded-lg px-5 text-sm font-semibold shadow-[0_0_28px_rgba(220,38,38,0.22)]",
    "before:absolute before:inset-0 before:-translate-x-full before:bg-white/18 before:transition-transform before:duration-500 hover:before:translate-x-full",
    variant === "primary"
      ? "border-red-500/60 bg-red-600 text-white hover:bg-red-500"
      : "border-zinc-700 bg-zinc-950/40 text-zinc-100 hover:bg-zinc-900/80",
    className
  );

  if (href) {
    return (
      <Button asChild className={baseClass}>
        <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} onMouseMove={move} onMouseLeave={reset}>
          <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
        </a>
      </Button>
    );
  }

  return (
    <Button ref={ref as React.RefObject<HTMLButtonElement>} className={baseClass} onMouseMove={move} onMouseLeave={reset}>
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
    </Button>
  );
}
