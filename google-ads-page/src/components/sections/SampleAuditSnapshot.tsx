import { Section, SectionHead, PrimaryCTA } from "../shared/SectionPrimitives";

const SAMPLE_AUDIT_PDF = "/downloads/Digital-Aura-Sample-Google-Ads-Audit-Report.pdf";
const PDF_NAME = "Digital-Aura-Sample-Google-Ads-Audit-Report.pdf";

/** First page of the sample Google Ads audit PDF, with a download button (downloads in the same tab). */
export function SampleAuditSnapshot() {
  return (
    <Section id="sample-audit" className="bg-surface-cream">
      <SectionHead
        eyebrow="Sample report"
        title="See what a Digital Aura Google Ads audit looks like"
        lead="Download the full report to see every finding and the plan that follows."
      />
      <div className="mx-auto max-w-[760px]">
        <a href={SAMPLE_AUDIT_PDF} download={PDF_NAME} className="block overflow-hidden rounded-[18px] border border-border bg-white shadow-card">
          <img
            src="/sample-google-ads-audit-page1.webp"
            alt="First page of the Digital Aura sample Google Ads audit report, with the client details hidden"
            width={1200}
            height={1420}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-contain"
          />
        </a>
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <PrimaryCTA href={SAMPLE_AUDIT_PDF} download={PDF_NAME}>
            Download the full sample report (PDF)
          </PrimaryCTA>
          <p className="text-sm text-muted-foreground">4 pages, PDF. Downloads in this tab.</p>
        </div>
      </div>
    </Section>
  );
}
