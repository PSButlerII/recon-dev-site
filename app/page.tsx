import { ContactSection } from "@/components/home/ContactSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PackagesSection } from "@/components/home/PackageSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProjectFitSection } from "@/components/home/ProjectFitSection";
import { ServicesSection } from "@/components/home/ServiceSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <SiteHeader />

      <main id="top">
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <ProjectFitSection />
        <PackagesSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}