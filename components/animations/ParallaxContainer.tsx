"use client";

import type { ReactNode } from "react";
import Tilt from "react-parallax-tilt";

type ParallaxContainerProps = {
  children: ReactNode;
  className?: string;
};

export function ParallaxContainer({ children, className }: ParallaxContainerProps) {
  return (
    <Tilt
      className={className}
      tiltMaxAngleX={4}
      tiltMaxAngleY={5}
      perspective={1200}
      scale={1.01}
      transitionSpeed={1200}
      glareEnable
      glareMaxOpacity={0.08}
      glareColor="#F59E0B"
      glarePosition="all"
    >
      {children}
    </Tilt>
  );
}
