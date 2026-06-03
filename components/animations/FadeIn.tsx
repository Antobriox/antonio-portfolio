"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useInView } from "react-intersection-observer";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function FadeIn({ children, delay = 0, className, ...props }: FadeInProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.18,
    rootMargin: "-40px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
