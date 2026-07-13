import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PageLoader from "@/components/PageLoader";
import { useCMSEditor } from "@/hooks/useCMSEditor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
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
import RatedOnPlatforms from "@/components/RatedOnPlatforms";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

// Persists across SPA navigations, resets on actual browser reload
let loaderShown = false;

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
        <RatedOnPlatforms />
        <CtaBanner />
        <Footer />
        <FloatingElements />
      </div>
    </>
  );
};

export default Index;
