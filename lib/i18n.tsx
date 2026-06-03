"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { builds, contactLinks, experiences, techGroups } from "@/lib/portfolio";

export type Language = "es" | "en";

type Pillar = {
  title: string;
  text: string;
};

type BuildCopy = {
  description: string;
  features?: string[];
};

type ExperienceCopy = {
  role: string;
  description: string;
};

type ContactCopy = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

const copy = {
  es: {
    nav: ["Inicio", "Sobre mi", "Tecnologias", "Proyectos", "Experiencia", "Contacto"],
    hero: {
      badge: "Full Stack Developer",
      location: "Portoviejo / Ecuador",
      paragraphOne:
        "Diseno y desarrollo aplicaciones web que combinan rendimiento, escalabilidad y una experiencia de usuario intuitiva, transformando ideas en soluciones digitales funcionales.",
      paragraphTwo:
        "Especializado en tecnologias modernas para construir productos solidos, mantenibles y preparados para crecer.",
      projects: "Ver Proyectos",
      contact: "Contactar",
      plate: "Perfil tecnico",
      plateRows: [
        ["Perfil", "Full Stack Developer"],
        ["Enfoque", "Web apps escalables"],
        ["Especialidad", "Frontend / Backend / Data"],
      ],
      available: "Disponible",
      availableText: "Proyectos web y oportunidades profesionales.",
      country: "Ecuador",
      countryText: "Portoviejo, Manabi. Trabajo remoto o hibrido.",
    },
    about: {
      eyebrow: "Perfil",
      title: "Software con criterio, rendimiento y direccion clara.",
      paragraphOne:
        "Soy Antonio Briones, Ingeniero en Software, apasionado por el desarrollo de soluciones tecnologicas innovadoras. Me especializo en la creacion y optimizacion de aplicaciones web y moviles, utilizando tecnologias modernas para construir soluciones eficientes, escalables y centradas en el usuario.",
      paragraphTwo:
        "Me motiva crear software que resuelva problemas reales, optimizando el rendimiento, la funcionalidad y la experiencia de usuario. Actualmente continuo fortaleciendo mis conocimientos en arquitectura de software, desarrollo web moderno y tecnologias emergentes para seguir aportando valor a traves de soluciones digitales de calidad.",
      pillars: [
        {
          title: "Producto solido",
          text: "Interfaces y sistemas mantenibles desde el primer despliegue.",
        },
        {
          title: "Ingenieria moderna",
          text: "Arquitectura, datos y rendimiento trabajando como un mismo motor.",
        },
        {
          title: "Mejora continua",
          text: "Iteracion con precision, medicion y foco en problemas reales.",
        },
      ] satisfies Pillar[],
    },
    specs: {
      eyebrow: "Especificaciones tecnicas",
      title: "Ficha tecnica del stack que uso para construir.",
      block: "Bloque tecnico",
    },
    builds: {
      eyebrow: "Garage",
      title: "Builds digitales con arquitectura y proposito.",
      cta: "Ver sitio en vivo",
      label: "PROYECTO",
      items: [
        {
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
        },
        {
          description: "Aplicacion web enfocada en la gestion de servicios y procesos operativos.",
          features: [
            "Gestion de servicios",
            "Procesos operativos",
            "Panel de control",
            "Registro de informacion",
            "Flujos administrativos",
            "Seguimiento de estados",
          ],
        },
      ] satisfies BuildCopy[],
    },
    experience: {
      eyebrow: "Trayectoria",
      title: "Experiencia profesional enfocada en sistemas reales.",
      items: [
        {
          role: "Ingeniero de Desarrollo de Software",
          description:
            "Participe en el desarrollo de un sistema de gestion empresarial mediante nuevos modulos funcionales, modelado de bases de datos relacionales y registros de auditoria. Implemente procesos para el seguimiento historico de activaciones e inactivaciones de servicios, garantizando integridad, trazabilidad y disponibilidad de informacion.",
        },
        {
          role: "Ingeniero de Desarrollo de Software",
          description:
            "Desarrolle funcionalidades web y participe en la consolidacion de informacion proveniente de multiples fuentes de datos. Implemente sistemas de gestion de cookies y soluciones orientadas a la integracion y centralizacion de informacion empresarial.",
        },
        {
          role: "Ingeniero de Desarrollo de Software",
          description:
            "Brinde soporte tecnico en la incorporacion de mas de 100 equipos a infraestructura corporativa. Ademas, desarrolle un sistema web para la gestion de informes de reuniones cantonales, optimizando acceso, organizacion y documentacion institucional.",
        },
      ] satisfies ExperienceCopy[],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Hablemos de una oportunidad, proyecto o idea.",
      lead: "Tienes una oportunidad laboral, un proyecto o una idea en mente?",
      text: "Estoy disponible para colaborar en proyectos web y nuevas oportunidades profesionales.",
      fields: {
        name: "Nombre",
        email: "Correo",
        message: "Mensaje",
        submit: "Enviar mensaje",
        direct: "Enviar correo directo",
      },
      errors: {
        name: "Escribe tu nombre.",
        email: "Escribe un correo valido.",
        message: "Cuentalo con un poco mas de detalle.",
      },
      success: "Mensaje enviado correctamente.",
      error: "No se pudo enviar por ahora. Usa el correo directo.",
      links: ["LinkedIn", "GitHub", "Correo", "Ubicacion"],
    },
    footer: "Precision / rendimiento / mejora continua",
  },
  en: {
    nav: ["Home", "About", "Specs", "Builds", "Experience", "Contact"],
    hero: {
      badge: "Full Stack Developer",
      location: "Portoviejo / Ecuador",
      paragraphOne:
        "I design and build web applications that combine performance, scalability, and intuitive user experience, turning ideas into functional digital solutions.",
      paragraphTwo:
        "Specialized in modern technologies to build solid, maintainable products prepared to grow.",
      projects: "View Projects",
      contact: "Contact",
      plate: "Technical profile",
      plateRows: [
        ["Profile", "Full Stack Developer"],
        ["Focus", "Scalable web apps"],
        ["Specialty", "Frontend / Backend / Data"],
      ],
      available: "Available",
      availableText: "Web projects and professional opportunities.",
      country: "Ecuador",
      countryText: "Portoviejo, Manabi. Remote or hybrid work.",
    },
    about: {
      eyebrow: "Profile",
      title: "Software with judgment, performance, and clear direction.",
      paragraphOne:
        "I am Antonio Briones, a Software Engineer passionate about building innovative technology solutions. I specialize in creating and optimizing web and mobile applications with modern technologies to deliver efficient, scalable, user-centered products.",
      paragraphTwo:
        "I am motivated by creating software that solves real problems while improving performance, functionality, and user experience. I continue strengthening my knowledge in software architecture, modern web development, and emerging technologies to deliver quality digital solutions.",
      pillars: [
        {
          title: "Solid product",
          text: "Maintainable interfaces and systems from the first deployment.",
        },
        {
          title: "Modern engineering",
          text: "Architecture, data, and performance working as one engine.",
        },
        {
          title: "Continuous improvement",
          text: "Iteration with precision, measurement, and focus on real problems.",
        },
      ] satisfies Pillar[],
    },
    specs: {
      eyebrow: "Technical specs",
      title: "A technical sheet of the stack I use to build.",
      block: "Spec block",
    },
    builds: {
      eyebrow: "Garage",
      title: "Digital builds with architecture and purpose.",
      cta: "View live site",
      label: "BUILD",
      items: [
        {
          description:
            "Web platform for commercial management in a company focused on tires, batteries, and automotive services.",
          features: [
            "Product management",
            "Inventory management",
            "Sales system",
            "Admin panel",
            "Promotion management",
            "Users and roles",
            "Shopping cart",
            "Notifications",
          ],
        },
        {
          description: "Web application focused on service management and operational processes.",
          features: [
            "Service management",
            "Operational processes",
            "Control panel",
            "Information records",
            "Administrative flows",
            "Status tracking",
          ],
        },
      ] satisfies BuildCopy[],
    },
    experience: {
      eyebrow: "Timeline",
      title: "Professional experience focused on real systems.",
      items: [
        {
          role: "Software Development Engineer",
          description:
            "Participated in the development of a business management system by implementing functional modules, relational database modeling, and audit records. Implemented processes to track historical service activations and deactivations, ensuring integrity, traceability, and data availability.",
        },
        {
          role: "Software Development Engineer",
          description:
            "Developed web features and helped consolidate information from multiple data sources. Implemented cookie management systems and solutions focused on integrating and centralizing business information.",
        },
        {
          role: "Software Development Engineer",
          description:
            "Provided technical support for adding more than 100 devices to corporate infrastructure. Also developed a web system for managing cantonal meeting reports, improving access, organization, and institutional documentation.",
        },
      ] satisfies ExperienceCopy[],
    },
    contact: {
      eyebrow: "Pit lane",
      title: "Let's talk about an opportunity, project, or idea.",
      lead: "Do you have a job opportunity, project, or idea in mind?",
      text: "I am available to collaborate on web projects and new professional opportunities.",
      fields: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send message",
        direct: "Send direct email",
      },
      errors: {
        name: "Write your name.",
        email: "Write a valid email.",
        message: "Tell me a little more.",
      },
      success: "Message sent successfully.",
      error: "Could not send it right now. Use direct email.",
      links: ["LinkedIn", "GitHub", "Email", "Location"],
    },
    footer: "Precision / performance / continuous improvement",
  },
};

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (typeof copy)[Language];
  navItems: { href: string; label: string }[];
  techGroups: typeof techGroups;
  builds: (typeof builds[number] & BuildCopy)[];
  experiences: (typeof experiences[number] & ExperienceCopy)[];
  contactLinks: ContactCopy[];
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nContextValue>(() => {
    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === "es" ? "en" : "es")),
      t,
      navItems: ["inicio", "sobre-mi", "specs", "builds", "experiencia", "contacto"].map((href, index) => ({
        href,
        label: t.nav[index],
      })),
      techGroups,
      builds: builds.map((build, index) => ({
        ...build,
        ...t.builds.items[index],
      })),
      experiences: experiences.map((experience, index) => ({
        ...experience,
        ...t.experience.items[index],
      })),
      contactLinks: contactLinks.map((link, index) => ({
        ...link,
        label: t.contact.links[index],
      })),
    };
  }, [language, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);

  if (!value) {
    throw new Error("useI18n must be used inside LanguageProvider");
  }

  return value;
}
