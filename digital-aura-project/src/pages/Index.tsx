import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PageLoader from "@/components/PageLoader";
import { useCMSEditor } from "@/hooks/useCMSEditor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import ClientLogoSection from "@/components/ClientLogoSection";
import { ClientLogoItem } from "@/hooks/useClientLogos";
import Services from "@/components/Services";
import ProcessSection from "@/components/ProcessSection";
import AIShowcase from "@/components/AIShowcase";
import SolutionsSection from "@/components/SolutionsSection";
import CaseStudies from "@/components/CaseStudies";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import BlogInsights from "@/components/BlogInsights";
import TechStack from "@/components/TechStack";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

// Persists across SPA navigations, resets on actual browser reload
let loaderShown = false;

// Shown until real logos are added for the "home" page in the admin panel (Client Logos → Home Page)
const HOME_LOGOS_FALLBACK: ClientLogoItem[] = [
  { name: "Clarity Eye Surgeons", tag: "Healthcare", logo: "https://www.clarityeyesurgeons.com.au/wp-content/uploads/2022/12/cropped-Clarity-Eye-Surgeons-Logo-300x212.png", logoBg: "#f0f8ff" },
  { name: "Grand Bavarchi", tag: "Restaurant", logo: "https://grandbavarchi.com.au/wp-content/uploads/2024/03/GB-logo.png", logoBg: "#fff8f0" },
  { name: "Mainstream Real Estate", tag: "Real Estate", logo: "https://mainstreamrealestate.com.au/wp-content/uploads/2023/02/logo-320x184-1.png", logoBg: "#f0fff8" },
  { name: "Parasher Academy", tag: "Education", logo: "/logos/parasher-academy.png", logoBg: "#f5f0ff" },
  { name: "Silverstone Financial", tag: "Financial Services", logo: "https://silverstonefinancial.co.nz/wp-content/uploads/2025/03/Transparent-BG-e1747031572364.png", logoBg: "#f0faff" },
  { name: "Upmatrix", tag: "SaaS Platform", logo: "https://upmatrix.in/wp-content/uploads/2025/09/UpMatrix-Logo-1.svg", logoBg: "#f0f4ff" },
  { name: "Karm Digital", tag: "Digital Agency", logo: "https://karm.digital/wp-content/uploads/2025/05/karm-logo.png", logoBg: "#f5f0ff" },
  { name: "Geotexelin", tag: "Industrial", logo: "https://cdn.prod.website-files.com/66aba4a3fcdeb2e1f9831db2/6761225cd949ac8e332fc819_Texel%20Logo%20for%20Website.svg", logoBg: "#f0f8ff" },
  { name: "Inn of the Dove", tag: "Hospitality", logo: "https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp", logoBg: "#fff8f5" },
  { name: "AMVI Hospitals", tag: "Healthcare", logo: "https://amvihospitals.com/wp-content/uploads/2025/04/amvi-new-logo-1536x219-1.png", logoBg: "#f5f0ff" },
  { name: "IntegsCloud", tag: "Cloud Solutions", logo: "https://integscloud.com/wp-content/uploads/2024/10/logo1-1-1-1.webp", logoBg: "#f0f4ff" },
  { name: "Game Zone Events", tag: "Events", logo: "https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png", logoBg: "#f5fff5" },
];

const Index = () => {
  useCMSEditor();
  const [loading, setLoading] = useState(() => !loaderShown);

  return (
    <>
      {/* Loader renders on top (z-9999); site renders beneath immediately — no flash */}
      <AnimatePresence>
        {loading && (
          <PageLoader onDone={() => { loaderShown = true; setLoading(false); }} />
        )}
      </AnimatePresence>

      {/* Site is always rendered — visible the moment the loader lifts */}
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <ClientLogos />
        <ClientLogoSection
          servicePage="home"
          heading="750+ Businesses We've Helped Grow"
          accentColor="#FF6B2B"
          fallback={HOME_LOGOS_FALLBACK}
        />
        <Services />
        <ProcessSection />
        <AIShowcase />
        <SolutionsSection />
        <CaseStudies />
        <WhyChooseUs />
        <Testimonials />
        <LeadCaptureForm />
        <BlogInsights />
        <TechStack />
        <CtaBanner />
        <Footer />
        <FloatingElements />
      </div>
    </>
  );
};

export default Index;
