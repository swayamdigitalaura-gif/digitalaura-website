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

const TMA_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 44'%3E%3Crect width='130' height='44' rx='8' fill='%232B4FD8'/%3E%3Crect x='8' y='7' width='30' height='30' rx='6' fill='white'/%3E%3Ctext x='23' y='27' font-family='Arial,sans-serif' font-size='17' font-weight='900' fill='%232B4FD8' text-anchor='middle'%3ET%3C/text%3E%3Ctext x='88' y='27' font-family='Arial,sans-serif' font-size='12' font-weight='700' fill='white' text-anchor='middle'%3Erackmyads%3C/text%3E%3C/svg%3E";

// Shown until real logos are added for the "home" page in the admin panel (Client Logos → Home Page).
// Pulled from the full pool of real client logos already seeded across other service pages
// (see admin-backend/seed-client-logos.js), so the homepage isn't stuck with only a dozen.
const HOME_LOGOS_FALLBACK: ClientLogoItem[] = [
  { name: "Track My Ads", tag: "AdTech", logo: TMA_SVG, logoBg: "#f0f8ff" },
  { name: "Silverstone Financial", tag: "Financial Services", logo: "https://silverstonefinancial.co.nz/wp-content/uploads/2025/03/Transparent-BG-e1747031572364.png", logoBg: "#f0faff" },
  { name: "Gleekey", tag: "EdTech", logo: "https://www.gleekey.in/public/front/images/logos/1765275447_logo.png", logoBg: "#f5f0ff" },
  { name: "Game Zone Events", tag: "Events", logo: "https://gamezoneevents.ca/wp-content/uploads/2025/07/Game-Zone-Events-02-1024x717.png", logoBg: "#f5fff5" },
  { name: "Krisha Eye Hospital", tag: "Eye Care", logo: "https://www.krishaeyehospital.com/wp-content/uploads/2024/09/Untitled-design-6-e1726468212929.png", logoBg: "#f0faff" },
  { name: "Parasher Academy", tag: "Education", logo: "/logos/parasher-academy.png", logoBg: "#f5f0ff" },
  { name: "Dr Parth Shah", tag: "Healthcare", logo: "https://www.drparthshah.com.au/wp-content/uploads/2020/02/site_logo.png", logoBg: "#f0f7ff" },
  { name: "Inn of the Dove", tag: "Hospitality", logo: "https://innofthedovehotel.com/wp-content/uploads/2026/02/logo-1.webp", logoBg: "#fff8f5" },
  { name: "Monita", tag: "Consulting", logo: "https://monita.com.au/wp-content/uploads/2024/09/MONITA_v01A_Logo_BG2-sbs-200x74.png", logoBg: "#f0f8ff" },
  { name: "Geotexelin", tag: "Industrial", logo: "https://cdn.prod.website-files.com/66aba4a3fcdeb2e1f9831db2/6761225cd949ac8e332fc819_Texel%20Logo%20for%20Website.svg", logoBg: "#f0f8ff" },
  { name: "MYP Services", tag: "Professional Svcs", logo: "https://mypservices.com.au/wp-content/uploads/2025/09/MYPService-Black.png", logoBg: "#f0f8ff" },
  { name: "AgriWorld Expo", tag: "Agriculture", logo: "https://agriworldexpo.in/wp-content/uploads/2024/09/AgriWorldExpo-Logo-New.png", logoBg: "#f0fff0" },
  { name: "Aroma Immigration", tag: "Immigration", logo: "https://aromaimmigration.com/wp-content/uploads/2022/08/Aroma-Immigration-png-1024x386.png", logoBg: "#f5f0ff" },
  { name: "Clarity Eye Surgeons", tag: "Healthcare", logo: "https://www.clarityeyesurgeons.com.au/wp-content/uploads/2022/12/cropped-Clarity-Eye-Surgeons-Logo-300x212.png", logoBg: "#f0f8ff" },
  { name: "Infinity Manpower", tag: "Staffing & HR", logo: "https://infinitymanpowergroup.com/wp-content/uploads/2025/01/white-logo.png", logoBg: "#1a1a2e" },
  { name: "Sure Freeze", tag: "HVAC & Refrigeration", logo: "https://surefreeze.com.au/wp-content/uploads/2023/09/Sure-Freeze-Logo-Updated-2.png", logoBg: "#f0faff" },
  { name: "IntegsCloud", tag: "Cloud Solutions", logo: "https://integscloud.com/wp-content/uploads/2024/10/logo1-1-1-1.webp", logoBg: "#f0f4ff" },
  { name: "Grand Bavarchi", tag: "Restaurant", logo: "https://grandbavarchi.com.au/wp-content/uploads/2024/03/GB-logo.png", logoBg: "#fff8f0" },
  { name: "Polyform Group", tag: "Manufacturing", logo: "https://polyformgroup.com/assets/images/logo/POLYFORMNEWLOGO_B.svg", logoBg: "#f5f5f5" },
  { name: "Bin Drop Dumpsters", tag: "Waste Management", logo: "https://www.bindropdumpsters.com/wp-content/uploads/Bin-Drop-Logo.png", logoBg: "#f5fff5" },
  { name: "Bhayani Group", tag: "Business Group", logo: "https://bhayanigroup.com/wp-content/uploads/2025/06/logo-1-1.png", logoBg: "#fff8f0" },
  { name: "Attention Hero", tag: "Marketing", logo: "https://cdn.prod.website-files.com/686cabbdef588234860ed3de/6938fac9f358d0e642c011fe_attention_hero_logo.png", logoBg: "#fff8f0" },
  { name: "There You Grow", tag: "Content & Growth", logo: "https://thereyougrow.in/wp-content/uploads/2023/08/Professional-Content-Writing-Services-Expert-Content-Writers-for-Engaging-Content-e1695101657187.png", logoBg: "#f0fff8" },
  { name: "Karm Digital", tag: "Digital Agency", logo: "https://karm.digital/wp-content/uploads/2025/05/karm-logo.png", logoBg: "#f5f0ff" },
  { name: "Dr Ronak Patel", tag: "Healthcare", logo: "/logos/dr-ronak-patel.webp", logoBg: "#f0f7ff" },
  { name: "Dreamfoot", tag: "Sports & Footwear", logo: "https://dreamfoot.in/wp-content/uploads/2025/04/logo-light-4-1.png", logoBg: "#1a1a2e" },
  { name: "AMVI Hospitals", tag: "Healthcare", logo: "https://amvihospitals.com/wp-content/uploads/2025/04/amvi-new-logo-1536x219-1.png", logoBg: "#f5f0ff" },
  { name: "Krisha Hospital", tag: "Healthcare", logo: "https://www.krishahospital.in/wp-content/uploads/2025/01/newlogo.png", logoBg: "#fff0f5" },
  { name: "Shukan Hospital", tag: "Healthcare", logo: "https://shukanhospital.com/wp-content/uploads/2025/11/Frame-16-removebg-preview.png", logoBg: "#f0fff8" },
  { name: "The Grand Palace", tag: "Hospitality", logo: "https://www.thegrandpalace.com.au/wp-content/uploads/2025/04/Logo-removebg-preview.png", logoBg: "#fffbf0" },
  { name: "SK Travels", tag: "Travel & Tourism", logo: "https://sktravelssltd.co.uk/wp-content/uploads/2024/05/sk-travelss-ltd-logo.webp", logoBg: "#fff8f0" },
  { name: "Mainstream Real Estate", tag: "Real Estate", logo: "https://mainstreamrealestate.com.au/wp-content/uploads/2023/02/logo-320x184-1.png", logoBg: "#f0fff8" },
  { name: "OBL Print", tag: "Printing Services", logo: "https://oblprint.com/assets/logo/logo.webp", logoBg: "#f8f5f0" },
  { name: "Upmatrix", tag: "Tech & Software", logo: "https://upmatrix.in/wp-content/uploads/2025/09/UpMatrix-Logo-1.svg", logoBg: "#f0f4ff" },
  { name: "Atul Bakery", tag: "Food & Bakery", logo: "https://image.pngaaa.com/331/3078331-middle.png", logoBg: "#fff8f0" },
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
