import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Toaster } from "@/components/ui/sonner";
import digitalAuraLogo from "@/assets/wds/brand/digital-aura-logo.png";

import { Hero } from "@/components/website-dev/Hero";
import { Problems, Included, Process } from "@/components/website-dev/SectionsA";
import { TechStack, PerformanceSnapshot, Industries } from "@/components/website-dev/SectionsB";
import {
  Testimonials,
  Faq,
  FinalCta,
} from "@/components/website-dev/SectionsC";
import { WdsTrustStrip } from "@/components/website-dev/TrustStrip";
import { PillarSection, PillarSubNav, PillarTabs } from "@/components/pillar/Pillar";
import { CtaBand } from "@/components/website-dev/Cta";
import "@/components/website-dev/pillar-compact.css";
import "@/pillar-pages.css";
import CaseStudies, { CASE_CARDS } from "@/components/CaseStudies";
import { useSettings } from "@/hooks/useSettings";
import { useCMSEditor } from "@/hooks/useCMSEditor";

const PAGE_TITLE = "Website Development Services in Ahmedabad | Digital Aura";
const PAGE_DESCRIPTION =
  "Get custom website development services in Ahmedabad with fast, mobile-friendly, SEO-ready websites built to generate more leads, sales, and business growth. Contact Digital Aura today.";
const PAGE_URL = "https://thedigitalaura.com/website-development-services-ahmedabad/";

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

const SUBNAV = [
  { href: "#problems", label: "Problems" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#results-proof", label: "Results" },
  { href: "#pricing", label: "Compare" },
  { href: "#faq", label: "FAQ" },
];

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
      <div className="wds-pillar pillar-page bg-background">
        <LocalBusinessSchema />
        {/* 1. Hero (with the enquiry form) + trust strip */}
        <Hero />
        <WdsTrustStrip />
        <PillarSubNav items={SUBNAV} />

        {/* 3. Problems we solve */}
        <PillarSection id="problems" tone="white" bare noHead>
          <Problems />
        </PillarSection>

        {/* 4. What's included */}
        <PillarSection id="services" tone="light" bare noHead>
          <Included />
        </PillarSection>

        {/* 5. Process */}
        <PillarSection tone="white" bare noHead>
          <Process />
        </PillarSection>

        {/* 6. Tech stack and performance */}
        <PillarSection id="tools" tone="light" eyebrow="Tools & performance" title="The technology and speed behind every website">
          <PillarTabs
            label="Technology and performance"
            tabs={[
              { id: "stack", label: "Tech stack", content: <TechStack /> },
              { id: "performance", label: "Performance snapshot", content: <PerformanceSnapshot /> },
            ]}
          />
        </PillarSection>

        {/* 7. Industries */}
        <PillarSection tone="white" bare noHead>
          <Industries />
        </PillarSection>

        {/* 8. Results */}
        <PillarSection id="results-proof" tone="light" bare noHead>
          <div id="results">
            <CaseStudies cases={[CASE_CARDS.riant, CASE_CARDS.prism]} sub="Real websites that turned into real bookings and leads." centered />
          </div>
        </PillarSection>

        {/* 9. Testimonials */}
        <PillarSection tone="white" bare noHead>
          <Testimonials />
        </PillarSection>

        {/* 10. Comparison */}
        <PillarSection id="pricing" tone="light" bare noHead>
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
        </PillarSection>

        {/* Link cards before the FAQ */}
        <PillarSection tone="white" bare noHead>
        <section className="bg-background py-10">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="text-center text-2xl font-bold md:text-[34px]">More website services in Ahmedabad</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <a href="/website-redesign-services-ahmedabad/" className="rounded-2xl border p-5 transition hover:shadow-md">
                <h3 className="text-lg font-bold">Website redesign services</h3>
                <p className="mt-2 text-sm opacity-80">Redesign your site without losing the Google rankings you already have.</p>
              </a>
              <a href="/website-maintenance-amc-ahmedabad/" className="rounded-2xl border p-5 transition hover:shadow-md">
                <h3 className="text-lg font-bold">Website maintenance and AMC</h3>
                <p className="mt-2 text-sm opacity-80">Updates, backups, security and monitoring for your website, built by us or by others.</p>
              </a>
              <a href="/website-development-cost-ahmedabad/" className="rounded-2xl border p-5 transition hover:shadow-md">
                <h3 className="text-lg font-bold">Website development cost</h3>
                <p className="mt-2 text-sm opacity-80">What decides the price of a website in Ahmedabad and how to compare quotes.</p>
              </a>
              <a href="/website-design-cost-ahmedabad/" className="rounded-2xl border p-5 transition hover:shadow-md">
                <h3 className="text-lg font-bold">Website design cost</h3>
                <p className="mt-2 text-sm opacity-80">What a design fee covers and how design differs from development.</p>
              </a>
              <a href="/website-packages-ahmedabad/" className="rounded-2xl border p-5 transition hover:shadow-md">
                <h3 className="text-lg font-bold">Website packages</h3>
                <p className="mt-2 text-sm opacity-80">Starter, Business, Growth and Custom packages, and what each includes.</p>
              </a>
              <a href="/website-design-for-doctors-ahmedabad/" className="rounded-2xl border p-5 transition hover:shadow-md">
                <h3 className="text-lg font-bold">Websites for doctors and hospitals</h3>
                <p className="mt-2 text-sm opacity-80">Patient-first sites with doctor profiles and appointment booking.</p>
              </a>
              <a href="/website-design-for-manufacturers-ahmedabad/" className="rounded-2xl border p-5 transition hover:shadow-md">
                <h3 className="text-lg font-bold">Websites for manufacturers and exporters</h3>
                <p className="mt-2 text-sm opacity-80">Catalogue, RFQ flow and certificates for B2B buyers.</p>
              </a>
            </div>
          </div>
        </section>
        </PillarSection>

        <Faq />
        <FinalCta />
        <Toaster />
      </div>
    </PageLayout>
  );
};

export default WebsiteDevelopmentServicesPage;
