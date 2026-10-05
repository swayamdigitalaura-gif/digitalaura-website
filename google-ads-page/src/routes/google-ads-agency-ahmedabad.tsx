import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/sections/Header";
import { Hero } from "../components/sections/Hero";
import { ChallengesWeSolve } from "../components/sections/ChallengesWeSolve";
import { PlatformsWeManage } from "../components/sections/PlatformsWeManage";
import { ConversionTracking } from "../components/sections/ConversionTracking";
import { LandingPageOptimization } from "../components/sections/LandingPageOptimization";
import { ToolsWeUse } from "../components/sections/ToolsWeUse";
import { DashboardGallery } from "../components/sections/DashboardGallery";
import { ProcessTimeline } from "../components/sections/ProcessTimeline";
import { IndustrySolutions } from "../components/sections/IndustrySolutions";
import { CaseStudies } from "../components/sections/CaseStudies";
import { ClientLogoMarquee } from "../components/sections/ClientLogoMarquee";
import { Testimonials } from "../components/sections/Testimonials";
import { Certifications } from "../components/sections/Certifications";
import { FAQ } from "../components/sections/FAQ";
import { FinalCTA } from "../components/sections/FinalCTA";
import { Footer } from "../components/sections/Footer";
import { StickyMobileCTA } from "../components/sections/StickyMobileCTA";

export const Route = createFileRoute("/google-ads-agency-ahmedabad")({
  head: () => ({
    meta: [
      { title: "Google Ads Agency Ahmedabad | Digital Aura" },
      { name: "description", content: "Google Ads agency in Ahmedabad delivering 3-7x ROAS and 40%+ lower CPL via expert campaign management, SEM, SEO, and CRO. Claim your free audit." },
      { property: "og:title", content: "Google Ads Agency Ahmedabad | Digital Aura" },
      { property: "og:description", content: "Ahmedabad's Google Ads management company. 500+ audits delivered. 3-7x average ROAS. Claim your free Google Ads audit today." },
      { name: "twitter:title", content: "Google Ads Agency Ahmedabad | Digital Aura" },
      { name: "twitter:description", content: "Ahmedabad's Google Ads management company. 500+ audits delivered. 3-7x average ROAS. Claim your free Google Ads audit today." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="min-h-screen bg-background font-sans text-foreground pt-[72px]">
      <Header />
      <Hero />
      <ChallengesWeSolve />
      <PlatformsWeManage />
      <ConversionTracking />
      <LandingPageOptimization />
      <ToolsWeUse />
      <DashboardGallery />
      <ProcessTimeline />
      <IndustrySolutions />
      <CaseStudies />
      <ClientLogoMarquee />
      <Testimonials />
      <Certifications />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
