import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Toaster } from "@/components/ui/sonner";
import digitalAuraLogo from "@/assets/wds/brand/digital-aura-logo.png";

import { Hero } from "@/components/website-dev/Hero";
import { TrustMetrics, Problems, Included, Process } from "@/components/website-dev/SectionsA";
import { TechStack, PerformanceSnapshot, Industries } from "@/components/website-dev/SectionsB";
import {
  LogoMarquee,
  RatedPlatforms,
  Testimonials,
  Faq,
  FinalCta,
} from "@/components/website-dev/SectionsC";
import { CtaBand, CtaBanner, QuickEnquiry } from "@/components/website-dev/Cta";
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";

const PAGE_TITLE = "Website Development Services | Custom Business Websites | Digital Aura";
const PAGE_DESCRIPTION =
  "Get custom website development services in Ahmedabad with fast, mobile-friendly, SEO-ready websites built to generate more leads, sales, and business growth. Contact Digital Aura today.";
const PAGE_URL = "https://thedigitalaura.com/website-development-services-ahmedabad";

function useBasicSEO() {
  useEffect(() => {
    document.title = PAGE_TITLE;
    const setTag = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!el) {
        const tagName = selector.startsWith("link") ? "link" : "meta";
        el = document.createElement(tagName) as HTMLMetaElement | HTMLLinkElement;
        if (tagName === "meta") {
          const nameMatch = selector.match(/name="([^"]+)"/);
          const propMatch = selector.match(/property="([^"]+)"/);
          if (nameMatch) el.setAttribute("name", nameMatch[1]);
          if (propMatch) el.setAttribute("property", propMatch[1]);
        } else {
          el.setAttribute("rel", "canonical");
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setTag('meta[name="description"]', "content", PAGE_DESCRIPTION);
    setTag('meta[property="og:title"]', "content", PAGE_TITLE);
    setTag('meta[property="og:description"]', "content", PAGE_DESCRIPTION);
    setTag('meta[property="og:url"]', "content", PAGE_URL);
    setTag('link[rel="canonical"]', "href", PAGE_URL);
  }, []);
}

/* ---------------- Structured data (LocalBusiness) ---------------- */

function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Digital Aura",
    description: PAGE_DESCRIPTION,
    image: digitalAuraLogo,
    telephone: "+91-81412-00284",
    email: "info@thedigitalaura.com",
    url: PAGE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "713, Shilp Arcade, Sardar Patel Ring Rd, Hanspura",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "382330",
      addressCountry: "IN",
    },
    areaServed: "Ahmedabad, Gujarat, India",
    priceRange: "$$",
    serviceType: [
      "Website Development",
      "Website Design",
      "Custom Web Development",
      "Ecommerce Website Development",
      "WordPress Development",
      "Landing Page Development",
      "Website Redesign",
      "Website Maintenance",
    ],
    sameAs: [],
  };
  return (
    <script
      type="application/ld+json"
      // Static, hard-coded JSON — no user input — safe to inject directly.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const WebsiteDevelopmentServicesPage = () => {
  useBasicSEO();
  useCMSEditor();
  const s = useSettings([
    "wds_ctaband1_headline",
    "wds_ctaband1_desc",
    "wds_ctaband1_button",
    "wds_ctabanner_headline",
    "wds_ctabanner_button",
    "wds_ctaband2_headline",
    "wds_ctaband2_desc",
    "wds_ctaband2_button",
  ]);
  return (
    <PageLayout>
      <div className="bg-background">
        <LocalBusinessSchema />
        <Hero />
        <TrustMetrics />
        <Problems />
        <CtaBand
          tone="dark"
          headline={
            s.wds_ctaband1_headline || "Let's Build a Website That Works for Your Business"
          }
          description={
            s.wds_ctaband1_desc ||
            "Whether you're starting from scratch or redesigning an existing website, we'll help you create a website focused on performance, user experience and business growth."
          }
          buttonText={s.wds_ctaband1_button || "Request My Website Proposal"}
          href="#enquiry"
        />
        <Included />
        <Process />
        <QuickEnquiry />
        <TechStack />
        <PerformanceSnapshot />
        <CtaBanner
          headline={s.wds_ctabanner_headline || "Let's Discuss Your Website Goals"}
          buttonText={s.wds_ctabanner_button || "Talk to Our Team"}
          href="#strategy"
          bg="bg-cream"
        />
        <Industries />
        <LogoMarquee />
        <RatedPlatforms />
        <Testimonials />
        <CtaBand
          tone="light"
          headline={
            s.wds_ctaband2_headline || "Still Comparing Website Development Companies?"
          }
          description={
            s.wds_ctaband2_desc ||
            "Let's discuss your project and recommend the right solution for your business."
          }
          buttonText={s.wds_ctaband2_button || "Get Expert Advice"}
          href="#strategy"
        />
        <Faq />
        <FinalCta />
        <Toaster />
      </div>
    </PageLayout>
  );
};

export default WebsiteDevelopmentServicesPage;
