declare module "react-scroll" {
  import type { ComponentType, ReactNode } from "react";

  export type LinkProps = {
    to: string;
    children?: ReactNode;
    smooth?: boolean;
    spy?: boolean;
    offset?: number;
    duration?: number;
    activeClass?: string;
    className?: string;
    onClick?: () => void;
  };

  export const Link: ComponentType<LinkProps>;
}
