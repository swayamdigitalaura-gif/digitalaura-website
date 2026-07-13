import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, ChevronDown, LineChart, Users } from "lucide-react";
import { Eyebrow, H2, Lead, PrimaryCTA, Section } from "../shared/SectionPrimitives";

const FAQS = [
  { q: "Why hire a Google Ads agency instead of running ads yourself?", a: "Google Ads has hundreds of settings that affect cost and results. A small mistake can waste your entire budget on the wrong searches. We manage accounts daily and know what to fix immediately." },
  { q: "How much does Google Ads management cost?", a: "Our fee depends on your ad spend, channels, and tracking setup. We give you full pricing clarity in your free Google Ads audit, before you commit to anything." },
  { q: "What's the minimum ad budget to get started?", a: "We work best with businesses spending ₹50,000+ a month on Google Ads. This is enough budget for campaigns to collect real data and start optimizing toward results." },
  { q: "How long before Google Ads start generating leads?", a: "Most accounts see lower cost per lead within 14–30 days of optimization. Reaching your target ROAS usually takes 60–90 days." },
  { q: "What's included in your Google Ads Audit?", a: "A full review of your account structure, conversion tracking, landing pages, competitor activity, and keyword opportunities, plus a 90-day plan to fix what's broken." },
  { q: "Do I need to sign a long-term contract?", a: "No. We work month-to-month with a 15-day cancellation notice. If the results aren't there, you're not locked in." },
  { q: "Who actually manages my Google Ads account?", a: "A senior strategist with at least 5 years of hands-on campaign experience. No interns, no account handoffs." },
  { q: "Will I own my Google Ads account and data?", a: "Yes, 100%. We run all campaigns inside your own Google Ads and Google Analytics accounts. Everything stays yours if you ever leave." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" className="bg-white">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Common Questions</Eyebrow>
          <H2 className="mt-6">Google Ads Management, Explained Simply</H2>
          <Lead className="mt-6">Straightforward answers about cost, timelines, contracts, and who owns your account.</Lead>
          <div className="mt-9"><PrimaryCTA>Speak With A Strategist</PrimaryCTA></div>

          <div className="mt-10 grid grid-cols-3 gap-3 rounded-2xl border border-border bg-surface-cream p-5 shadow-xs">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <BarChart3 className="size-5 text-primary" />
              <span className="font-display text-[18px] font-bold text-navy leading-none">5.8x</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Avg ROAS</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center border-x border-border">
              <LineChart className="size-5 text-primary" />
              <span className="font-display text-[18px] font-bold text-navy leading-none">47%</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Lower CPL</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Users className="size-5 text-primary" />
              <span className="font-display text-[18px] font-bold text-navy leading-none">1.2M+</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Leads Generated</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {FAQS.map((f, i) => (
            <div
              key={f.q}
              className={`overflow-hidden rounded-2xl border bg-surface-cream transition-all ${open === i ? "border-primary/30 shadow-md" : "border-border shadow-xs"}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left"
              >
                <span className="font-display text-[17px] font-bold text-navy md:text-[19px] leading-snug">{f.q}</span>
                <ChevronDown className={`size-5 shrink-0 text-navy/60 transition-transform ${open === i ? "rotate-180 text-primary" : ""}`} />
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-7 pb-7 text-[16px] leading-[1.82] text-muted-foreground">{f.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
