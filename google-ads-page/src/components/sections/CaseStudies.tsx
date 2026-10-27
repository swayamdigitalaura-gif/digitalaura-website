import { ArrowRight } from "lucide-react";
import { Section, SectionHead } from "../shared/SectionPrimitives";
import { CaseStudySlider, type SliderCase } from "./CaseStudySlider";

/* Same slider as the "Proven Results" section on the home page. Only real, published case studies
   where Google Ads was part of the work are listed here. */
const CASES: SliderCase[] = [
  {
    tag: "Custom Printing & Signage · Google Ads & Shopping",
    color: "#1A6FE8",
    title: "OBLPrint",
    href: "/case-studies/oblprint/",
    stats: [
      { num: "35", label: "WhatsApp click-to-chats in a month" },
      { num: "79.1%", label: "Optimization score, up from 31/100" },
      { num: "14.6%", label: "Click-through rate on top search keywords" },
    ],
    problems: [
      "Only 10% impression share; every landing page rated Poor by Google",
      "80+ keywords in one ad group, with no negative keywords",
      "Broken website migration left old URLs indexed",
      "Budget went out every month while the WhatsApp stayed silent",
    ],
    solutions: [
      "Rebuilt the account into focused, product-specific campaigns",
      "Launched Google Shopping for stickers, banners and foam board",
      "Tracked WhatsApp chats, calls and form fills properly",
      "Removed wasted keywords and added negative keywords everywhere",
    ],
  },
  {
    tag: "Local Business · Website, Booking System & Google Ads",
    color: "#FF6B2B",
    title: "Riant Bikes",
    href: "/case-studies/riant-bikes/",
    stats: [
      { num: "177", label: "Bookings processed through the new website" },
      { num: "₹1.6L+", label: "Revenue tracked inside the platform" },
      { num: "230", label: "Customers managed in one system" },
    ],
    problems: [
      "Every booking depended on someone answering the phone",
      "No idea which bike earned the most or sat idle",
      "Static pricing while weekend demand kept changing",
      "No digital record of bike condition at rental",
    ],
    solutions: [
      "Built a new website with instant online booking",
      "Fleet management dashboard for demand, branches and revenue",
      "Customer database to spot and reward repeat renters",
      "Launched Google Ads for consistent daily bookings",
    ],
  },
];

export function CaseStudies() {
  return (
    <Section id="results" className="bg-white">
      <SectionHead eyebrow="Proven Results" title="Real Clients. Real Growth. Real Results." lead="Real numbers from real businesses we run Google Ads for." />

      <CaseStudySlider items={CASES} />

      <div className="mt-8 text-center">
        <a href="/case-studies/" className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
          View All Case Studies <ArrowRight className="size-4" />
        </a>
      </div>
    </Section>
  );
}
