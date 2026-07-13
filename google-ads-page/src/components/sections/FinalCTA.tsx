import { Check, Clock } from "lucide-react";
import { Eyebrow, Section } from "../shared/SectionPrimitives";
import { AuditForm } from "../shared/AuditForm";

const CHECKLIST = [
  "Google Ads Audit",
  "Conversion Tracking Review",
  "Landing Page Review",
  "Competitor PPC Analysis",
  "Keyword Opportunity Report",
  "30-Day Growth Plan",
];

export function FinalCTA() {
  return (
    <Section className="!pb-16 md:!pb-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-navy p-8 shadow-elevated md:p-14">
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-32 size-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-center">
          <div className="text-white flex flex-col justify-center">
            <Eyebrow light>Weekly Audit Cap: 5 Brands</Eyebrow>
            <h2 className="mt-6 font-display text-[40px] font-extrabold leading-[1.08] tracking-[-0.025em] text-white md:text-[56px]">
              See Exactly Where Your Ad Budget Is Being Wasted
            </h2>
            <p className="mt-7 text-[18px] md:text-[20px] leading-[1.82] text-white/80">
              In 24 hours, a senior strategist reviews your Google Ads account, tracking, and landing pages, then hands you a clear plan to fix it.
            </p>
            <ul className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
      </div>
    </Section>
  );
}
