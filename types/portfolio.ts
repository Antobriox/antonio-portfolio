import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type TechGroup = {
  title: string;
  items: string[];
};

export type Build = {
  number: string;
  name: string;
  description: string;
  features?: string[];
  technologies: string[];
  github: string;
  liveUrl: string;
};

export type Experience = {
  year: string;
  role: string;
  company: string;
  description: string;
  technologies?: string[];
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};
