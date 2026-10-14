/**
 * Lead capture for the older /services/* templates: an inline form at the end of the page plus the mobile sticky CTA bar.
 * Plain React (no effects at render), so it prerenders into the static HTML like the rest of the page.
 */
import PageLeadForm, { type LeadFormConfig } from "@/components/PageLeadForm";
import { StickyCtaBar } from "@/components/PageCta";
import PillarLinks from "@/components/PillarLinks";

const ORANGE = "#FF6B2B";
const FORM_ID = "service-enquiry";

const ServiceLeadCapture = ({ service, slug }: { service: string; slug: string }) => {
  const cfg: LeadFormConfig = {
    id: FORM_ID,
    formName: `service-${slug}`,
    service,
    heading: `Talk to us about ${service}`,
    text: "Send your details. It is free to ask, and we reply by email.",
    website: "optional",
    notesLabel: "What do you need help with?",
    submitLabel: "Send my details",
  };
  return (
    <>
      <PillarLinks slug={slug} />
      <PageLeadForm cfg={cfg} accent={ORANGE} />
      <div className="h-16 md:hidden" aria-hidden="true" />
      <StickyCtaBar accent={ORANGE} label="Get a free consultation" href={`#${FORM_ID}`} topic={service} />
    </>
  );
};

export default ServiceLeadCapture;
