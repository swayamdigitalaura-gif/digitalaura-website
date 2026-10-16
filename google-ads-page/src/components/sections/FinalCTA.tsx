import { Check, Clock } from "lucide-react";
import { Eyebrow } from "../shared/SectionPrimitives";
import { AuditForm } from "../shared/AuditForm";
import { VisitUs } from "./PillarExtras";

const CHECKLIST = [
  "Google Ads Audit",
  "Conversion Tracking Review",
  "Landing Page Review",
  "Competitor PPC Analysis",
  "Keyword Opportunity Report",
  "30-Day Growth Plan",
];

/** Final CTA with the audit form, followed by the map and contact block, in one dark section. */
export function FinalCTA() {
  return (
    <section id="audit-final-section" className="pillar-section pillar-section--navy">
      <div className="pillar-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="flex flex-col justify-center text-white">
            <div><Eyebrow light>Weekly Audit Cap: 5 Brands</Eyebrow></div>
            <h2 className="mt-3 mb-5 font-display font-extrabold leading-tight tracking-[-0.02em] text-white [font-size:clamp(26px,2.8vw,34px)]">
              See Exactly Where Your Ad Budget Is Being Wasted
            </h2>
            <p className="text-[17px] leading-[1.7] text-white/80">
              In 24 hours, a senior strategist reviews your Google Ads account, tracking, and landing pages, then hands you a clear plan to fix it.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CHECKLIST.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] font-semibold text-white/90">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3 text-[15px] font-semibold text-white/70">
              <Clock className="size-5 text-primary" /> Average completion timeline: 24 business hours
            </div>
          </div>

          <div className="rounded-3xl bg-white p-1 shadow-elevated">
            <AuditForm id="audit-final" compact />
          </div>
        </div>
        <VisitUs />
      </div>
    </section>
  );
}
