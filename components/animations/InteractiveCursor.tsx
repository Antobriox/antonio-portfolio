"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function InteractiveCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 260, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 260, damping: 28 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!canHover) return;

    const update = (event: MouseEvent) => {
      mouseX.set(event.clientX - 12);
      mouseY.set(event.clientY - 12);
    };

    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden size-6 rounded-full border border-amber-300/70 mix-blend-screen shadow-[0_0_18px_rgba(245,158,11,0.55)] md:block"
      style={{ x: springX, y: springY }}
    />
  );
}
