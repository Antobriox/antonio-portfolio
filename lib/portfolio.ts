import { GitBranch, Mail, MapPin, Network } from "lucide-react";

import type { Build, ContactLink, Experience, NavItem, TechGroup } from "@/types/portfolio";

export const navItems: NavItem[] = [
  { label: "Inicio", href: "inicio" },
  { label: "Sobre mi", href: "sobre-mi" },
  { label: "Specs", href: "specs" },
  { label: "Builds", href: "builds" },
  { label: "Experiencia", href: "experiencia" },
  { label: "Contacto", href: "contacto" },
];

export const mainStack = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase"];

export const techGroups: TechGroup[] = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Svelte", "HTML5", "CSS3"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "NestJS", "Flask"],
  },
  {
    title: "Bases de Datos",
    items: ["PostgreSQL", "Supabase", "MongoDB", "Firebase"],
  },
  {
    title: "Herramientas y DevOps",
    items: ["Git", "GitHub", "Docker", "Vercel", "Postman", "Cursor", "Visual Studio Code", "Figma"],
  },
];

export const builds: Build[] = [
  {
    number: "BUILD #001",
    name: "CARSA WEB",
    description:
      "Plataforma web para la gestion comercial de una empresa especializada en llantas, baterias y servicios automotrices.",
    features: [
      "Gestion de productos",
      "Gestion de inventario",
      "Sistema de ventas",
      "Panel administrativo",
      "Gestion de promociones",
      "Gestion de usuarios y roles",
      "Carrito de compras",
      "Notificaciones",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Zustand", "Shadcn UI"],
    github: "https://github.com/Antobriox/carsa-web",
    liveUrl: "https://carsa-web.vercel.app",
  },
  {
    number: "BUILD #002",
    name: "LIMPUS",
    description: "Aplicacion web enfocada en la gestion de servicios y procesos operativos.",
    features: [
      "Gestion de servicios",
      "Procesos operativos",
      "Panel de control",
      "Registro de informacion",
      "Flujos administrativos",
      "Seguimiento de estados",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    github: "https://github.com/Antobriox/limpus",
    liveUrl: "https://limpus.vercel.app",
  },
];

export const experiences: Experience[] = [
  {
    year: "2025",
    role: "Ingeniero de Desarrollo de Software",
    company: "Robert Ponce Company S.A.S",
    description:
      "Participe en el desarrollo de un sistema de gestion empresarial mediante nuevos modulos funcionales, modelado de bases de datos relacionales y registros de auditoria. Implemente procesos para el seguimiento historico de activaciones e inactivaciones de servicios, garantizando integridad, trazabilidad y disponibilidad de informacion.",
  },
  {
    year: "2024",
    role: "Ingeniero de Desarrollo de Software",
    company: "Sistemas Informaticos Genesis",
    description:
      "Desarrolle funcionalidades web y participe en la consolidacion de informacion proveniente de multiples fuentes de datos. Implemente sistemas de gestion de cookies y soluciones orientadas a la integracion y centralizacion de informacion empresarial.",
    technologies: ["Python", "Node.js", "Next.js", "MongoDB", "PostgreSQL"],
  },
  {
    year: "2024",
    role: "Ingeniero de Desarrollo de Software",
    company: "Prefectura de Manabi",
    description:
      "Brinde soporte tecnico en la incorporacion de mas de 100 equipos a infraestructura corporativa. Ademas, desarrolle un sistema web para la gestion de informes de reuniones cantonales, optimizando acceso, organizacion y documentacion institucional.",
    technologies: ["Next.js", "TypeScript", "PrimeReact"],
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "LinkedIn",
    value: "Antonio Briones",
    href: "https://www.linkedin.com/in/antonio-briones-2a8742313/",
    icon: Network,
  },
  {
    label: "GitHub",
    value: "@Antobriox",
    href: "https://github.com/Antobriox",
    icon: GitBranch,
  },
  {
    label: "Correo",
    value: "antoniobriones1910@gmail.com",
    href: "mailto:antoniobriones1910@gmail.com",
    icon: Mail,
  },
  {
    label: "Ubicacion",
    value: "Portoviejo, Manabi, Ecuador",
    href: "https://www.google.com/maps/search/Portoviejo+Manabi+Ecuador",
    icon: MapPin,
  },
];
