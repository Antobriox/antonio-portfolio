import { ProgressTachometer } from "@/components/animations/ProgressTachometer";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Builds } from "@/components/sections/Builds";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { TechSpecs } from "@/components/sections/TechSpecs";
import { LanguageProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <main className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5]">
          <Navbar />
          <Hero />
          <About />
          <TechSpecs />
          <Builds />
          <Experience />
          <Contact />
          <Footer />
          <ProgressTachometer />
        </main>
      </SmoothScroll>
    </LanguageProvider>
  );
}
