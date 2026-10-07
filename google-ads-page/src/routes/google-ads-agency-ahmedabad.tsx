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
import { QuickAnswer, AhmedabadMarket, CostBreakdown, AgencyComparison } from "../components/sections/PillarExtras";
import { StickyMobileCTA } from "../components/sections/StickyMobileCTA";

export const Route = createFileRoute("/google-ads-agency-ahmedabad")({
  head: () => ({
    meta: [
      { title: "Google Ads Agency in Ahmedabad | Digital Aura" },
      { name: "description", content: "Google Ads management in Ahmedabad by a team based at Hanspura, SP Ring Road. Month-to-month, run in your own account, with tracked leads. Get a free audit." },
      { property: "og:title", content: "Google Ads Agency in Ahmedabad | Digital Aura" },
      { property: "og:description", content: "Google Ads management in Ahmedabad by a team based at Hanspura, SP Ring Road. Month-to-month, run in your own account, with tracked leads. Get a free audit." },
      { name: "twitter:title", content: "Google Ads Agency in Ahmedabad | Digital Aura" },
      { name: "twitter:description", content: "Google Ads management in Ahmedabad by a team based at Hanspura, SP Ring Road. Month-to-month, run in your own account, with tracked leads. Get a free audit." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="min-h-screen bg-background font-sans text-foreground pt-[72px]">
      <Header />
      <Hero />
      <QuickAnswer />
      <ChallengesWeSolve />
      <PlatformsWeManage />
      <ConversionTracking />
      <LandingPageOptimization />
      <ToolsWeUse />
      <DashboardGallery />
      <ProcessTimeline />
      <IndustrySolutions />
      <AhmedabadMarket />
      <CaseStudies />
      <ClientLogoMarquee />
      <Testimonials />
      <Certifications />
      <CostBreakdown />
      <AgencyComparison />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
