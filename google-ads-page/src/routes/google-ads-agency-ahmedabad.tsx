import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/sections/Header";
import { Hero } from "../components/sections/Hero";
import { ChallengesWeSolve } from "../components/sections/ChallengesWeSolve";
import { PlatformsWeManage } from "../components/sections/PlatformsWeManage";
import { ConversionTracking } from "../components/sections/ConversionTracking";
import { LandingPageOptimization } from "../components/sections/LandingPageOptimization";
import { ToolsWeUse } from "../components/sections/ToolsWeUse";
import { SampleAuditSnapshot } from "../components/sections/SampleAuditSnapshot";
import { DashboardGallery } from "../components/sections/DashboardGallery";
import { IndustrySolutions } from "../components/sections/IndustrySolutions";
import { CaseStudies } from "../components/sections/CaseStudies";
import { TrustStrip } from "../components/sections/TrustStrip";
import { Testimonials } from "../components/sections/Testimonials";
import { FAQ } from "../components/sections/FAQ";
import { PerformanceMarketing } from "../components/sections/PerformanceMarketing";
import { FinalCTA } from "../components/sections/FinalCTA";
import { Footer } from "../components/sections/Footer";
import { QuickAnswer, ExploreMore, WhatWeDo, First90Days, VisitUs, AhmedabadMarket, CostBreakdown, SelfCheck, LeakChecks, TrackingByLeadType, AgencyComparison, AdsReels, TeamSection, PeopleSchema, AdsGuides } from "../components/sections/PillarExtras";
import { FeeTable, AdLanguages } from "../components/sections/PricingAndLanguages";
import { StickyMobileCTA } from "../components/sections/StickyMobileCTA";
import { PillarSection, PillarSubNav, PillarTabs } from "../components/shared/Pillar";
import "../pillar-pages.css";

export const Route = createFileRoute("/google-ads-agency-ahmedabad")({
  head: () => ({
    meta: [
      { title: "Google Ads & Performance Marketing Agency in Ahmedabad | Digital Aura" },
      { name: "description", content: "Performance marketing agency and Google Ads company in Ahmedabad. PPC management in your own account, with tracked calls and leads. Month-to-month. Get a free audit." },
      { property: "og:title", content: "Google Ads & Performance Marketing Agency in Ahmedabad | Digital Aura" },
      { property: "og:description", content: "Performance marketing agency and Google Ads company in Ahmedabad. PPC management in your own account, with tracked calls and leads. Month-to-month. Get a free audit." },
      { name: "twitter:title", content: "Google Ads & Performance Marketing Agency in Ahmedabad | Digital Aura" },
      { name: "twitter:description", content: "Performance marketing agency and Google Ads company in Ahmedabad. PPC management in your own account, with tracked calls and leads. Month-to-month. Get a free audit." },
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
    description: "Google Ads management, PPC management and performance marketing for Ahmedabad businesses, run in the client's own account with tracked calls, WhatsApp and form leads.",
    provider: { "@type": "LocalBusiness", "@id": "https://thedigitalaura.com/#localbusiness", name: "Digital Aura" },
    areaServed: { "@type": "City", name: "Ahmedabad" },
    offers: {
      "@type": "Offer",
      description: "Monthly Google Ads management fee. Ad spend is paid to Google separately.",
      priceCurrency: "INR",
      priceSpecification: { "@type": "PriceSpecification", priceCurrency: "INR", minPrice: 15000, maxPrice: 60000, unitText: "MONTH" },
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
    </>
  );
}

const SUBNAV = [
  { href: "#overview", label: "Overview" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#results-proof", label: "Results" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

function LandingPage() {
  return (
    <main className="pillar-page min-h-screen bg-background font-sans text-foreground pt-[72px] pb-20 md:pb-0">
      <PageSchema />
      <PeopleSchema />
      <Header />

      {/* 1. Hero + trust strip */}
      <Hero />
      <TrustStrip />
      <PillarSubNav items={SUBNAV} />

      {/* 2. Overview */}
      <PillarSection id="overview" tone="white" eyebrow="Overview" title="What Google Ads management in Ahmedabad covers">
        <PillarTabs
          label="Overview"
          tabs={[
            { id: "plain", label: "In plain words", content: <QuickAnswer /> },
            { id: "what", label: "What an agency does", content: <WhatWeDo /> },
          ]}
        />
      </PillarSection>

      {/* 2b. Performance marketing / PPC services (Ahmedabad buying-intent keywords) */}
      <PillarSection id="performance-marketing-wrap" tone="light" bare noHead>
        <PerformanceMarketing />
      </PillarSection>

      {/* 3. Problems we solve */}
      <PillarSection id="problems" tone="light" eyebrow="Problems we solve" title="Where Google Ads budgets leak, and how we fix it">
        <PillarTabs
          label="Problems we solve"
          tabs={[
            { id: "selfcheck", label: "Is Google Ads right for you?", content: <SelfCheck /> },
            { id: "challenges", label: "Challenges we solve", content: <ChallengesWeSolve /> },
            { id: "leaks", label: "Six common leaks", content: <LeakChecks /> },
          ]}
        />
      </PillarSection>

      {/* 4. Services (channels) */}
      <PillarSection id="services" tone="white" bare noHead>
        <PlatformsWeManage />
      </PillarSection>

      {/* 5. Process */}
      <PillarSection id="process" tone="light" bare noHead>
        <First90Days />
      </PillarSection>

      {/* 6. Tools, tracking & platforms */}
      <PillarSection id="tools-tracking" tone="white" eyebrow="Tools & tracking" title="Tracking, landing pages and the tools behind every campaign">
        <PillarTabs
          label="Tools and tracking"
          tabs={[
            { id: "conversion", label: "Conversion tracking", content: <ConversionTracking /> },
            { id: "by-lead", label: "What we track", content: <TrackingByLeadType /> },
            { id: "landing", label: "Landing pages", content: <LandingPageOptimization /> },
          ]}
        />
      </PillarSection>

      <PillarSection id="tools" tone="light" bare noHead>
        <ToolsWeUse />
      </PillarSection>

      {/* 7. Industries */}
      <PillarSection id="industries-market" tone="light" eyebrow="Who we serve" title="Industries, the Ahmedabad market and the languages we work in">
        <PillarTabs
          label="Industries and market"
          tabs={[
            { id: "industries", label: "Industry solutions", content: <IndustrySolutions /> },
            { id: "market", label: "Ahmedabad market notes", content: <AhmedabadMarket /> },
            { id: "languages", label: "Ads in your language", content: <AdLanguages /> },
          ]}
        />
      </PillarSection>

      {/* 8. Results & proof */}
      <PillarSection id="results-proof" tone="white" bare noHead>
        <CaseStudies />
        <div className="mt-16"><DashboardGallery /></div>
        <div className="mt-16"><SampleAuditSnapshot /></div>
      </PillarSection>
      <PillarSection tone="light" bare noHead>
        <AdsReels />
      </PillarSection>

      {/* 9. Testimonials */}
      <PillarSection tone="white" bare noHead>
        <Testimonials />
      </PillarSection>

      {/* 10. Pricing & comparison */}
      <PillarSection id="pricing" tone="light" eyebrow="Pricing & comparison" title="What Google Ads costs, and how to choose help">
        <PillarTabs
          label="Pricing and comparison"
          tabs={[
            { id: "fee", label: "Management fee", content: <FeeTable /> },
            { id: "cost", label: "What it costs", content: <CostBreakdown /> },
            { id: "compare", label: "Agency, freelancer or in-house", content: <AgencyComparison /> },
          ]}
        />
      </PillarSection>

      {/* 11. Team */}
      <PillarSection tone="white" bare noHead>
        <TeamSection />
      </PillarSection>

      {/* Explore (link cards) */}
      <PillarSection id="explore" tone="light" eyebrow="Keep exploring" title="Google Ads service pages and guides">
        <PillarTabs
          label="Explore"
          tabs={[
            { id: "pages", label: "Service pages", content: <ExploreMore /> },
            { id: "guides", label: "Google Ads guides", content: <AdsGuides /> },
          ]}
        />
      </PillarSection>

      {/* 12. FAQ (always open) */}
      <FAQ />

      {/* 13. Final CTA + contact */}
      <FinalCTA />

      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
