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
  { q: "Do you guarantee leads or a fixed ROAS?", a: "No. Nobody can honestly guarantee leads or a return on ad spend, because results depend on your market, your offer, your website and your budget. What we commit to is a clear plan, proper tracking, regular optimisation and reports that show leads and cost per lead." },
  { q: "Performance Max, Search or Shopping: which should my business use?", a: "Search suits businesses where people look for a service, such as clinics, agencies and repair services. Shopping and Performance Max suit stores with product feeds. Many accounts use a mix. We recommend the starting setup after reviewing your business, your tracking and your budget." },
  { q: "Can you take over my existing Google Ads account?", a: "Yes. We start with an audit of the account: structure, search terms, conversion tracking and landing pages. Then we keep what works, stop what wastes budget and rebuild what is broken, all inside your existing account so your history is preserved." },
  { q: "How do you count phone call and WhatsApp leads?", a: "We set up conversion tracking for form submissions, click-to-call, calls from ads and WhatsApp clicks, so each one is counted as a lead and tied back to the campaign and keyword. We also tell you where tracking has limits, for example a WhatsApp click shows interest but not a completed chat." },
  { q: "Do you work with businesses outside Ahmedabad?", a: "Yes. Our team is based in Ahmedabad and we run campaigns for businesses across Gujarat, India and overseas, with location targeting set to wherever your customers are." },
  { q: "Google Ads or Meta ads: which should I start with?", a: "If customers already search for what you sell, such as a repair, a clinic or a service near them, Google Search usually comes first. If you need to create demand, for example for a new product or a visual offer, Meta ads can reach people who are not searching yet. Many businesses end up using both, and we will tell you honestly which fits first." },
  { q: "Can you run Google Ads for doctors and clinics?", a: "Yes, with care. Health advertising has stricter rules from Google and from medical regulators in India, so we keep claims factual, avoid before-and-after promises, and review every ad and page before it goes live." },
  { q: "What do you need from me to start?", a: "Access to your Google Ads account if you have one (or we set one up in your name), your Google Analytics, your website, your phone and WhatsApp numbers, and a clear idea of what a good lead is for your business." },
  { q: "What if my website is not turning clicks into enquiries?", a: "We start by showing where visitors drop off. Then we suggest page changes or build a focused landing page, so the clicks you pay for are more likely to turn into calls, WhatsApp messages and forms." },
  { q: "Are you a Google Partner agency?", a: "Yes. Digital Aura is a Google Partner agency. That means we are recognised by Google for managing Google Ads accounts, and our campaigns follow Google's own recommended practices. We always run your campaigns inside your own Google Ads account." },
  { q: "Can you run Google Ads in Gujarati or Hindi?", a: "Yes. We can write and run ads and target audiences in Gujarati, Hindi and English, so you can reach customers in the language they search in across Ahmedabad and Gujarat." },
];

function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // Static content from the FAQS list above - no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" className="bg-white">
      <FAQSchema />
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
