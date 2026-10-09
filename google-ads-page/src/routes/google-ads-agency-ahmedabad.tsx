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
import { QuickAnswer, StatsBand, ExploreMore, WhatWeDo, First90Days, VisitUs, AhmedabadMarket, CostBreakdown, AgencyComparison, AdsReels, TeamSection, PeopleSchema } from "../components/sections/PillarExtras";
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

/** Breadcrumb and Service structured data. Static JSON, no user input; no prices or ratings. */
function PageSchema() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thedigitalaura.com/" },
      { "@type": "ListItem", position: 2, name: "Google Ads Agency in Ahmedabad", item: "https://thedigitalaura.com/google-ads-agency-ahmedabad" },
    ],
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Google Ads management in Ahmedabad",
    serviceType: "Google Ads management",
    url: "https://thedigitalaura.com/google-ads-agency-ahmedabad",
    description: "Google Ads management for Ahmedabad businesses, run in the client's own account with tracked calls, WhatsApp and form leads.",
    provider: { "@type": "LocalBusiness", "@id": "https://thedigitalaura.com/#localbusiness", name: "Digital Aura" },
    areaServed: { "@type": "City", name: "Ahmedabad" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
    </>
  );
}

function LandingPage() {
  return (
    <main className="min-h-screen bg-background font-sans text-foreground pt-[72px]">
      <PageSchema />
      <PeopleSchema />
      <Header />
      <Hero />
      <QuickAnswer />
      <StatsBand />
      <ChallengesWeSolve />
      <PlatformsWeManage />
      <WhatWeDo />
      <ProcessTimeline />
      <First90Days />
      <ConversionTracking />
      <LandingPageOptimization />
      <ToolsWeUse />
      <DashboardGallery />
      <IndustrySolutions />
      <AhmedabadMarket />
      <CaseStudies />
      <ClientLogoMarquee />
      <Testimonials />
      <Certifications />
      <ExploreMore />
      <CostBreakdown />
      <AgencyComparison />
      <AdsReels />
      <TeamSection />
      <VisitUs />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
