import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AntobrioxDev",
  description:
    "Portafolio profesional de Antonio Briones, desarrollador Full Stack especializado en aplicaciones web modernas, escalables y centradas en el usuario.",
  metadataBase: new URL("https://antobriox.dev"),
  icons: {
    icon: "/DEV.png",
    shortcut: "/DEV.png",
    apple: "/DEV.png",
  },
  openGraph: {
    title: "AntobrioxDev",
    description:
      "Aplicaciones web modernas con rendimiento, escalabilidad y una identidad visual inspirada en precision JDM.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-[#0B0B0B]">{children}</body>
    </html>
  );
}
