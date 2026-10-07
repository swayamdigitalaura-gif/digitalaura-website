import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, X } from "lucide-react";
import { Eyebrow, H2, Lead, PrimaryCTA, Section } from "../shared/SectionPrimitives";

/* Sections added from the page blueprint (gads-01). Deliberately free of new
   numeric claims: no prices, ROAS, client counts or budgets are stated here. */

const card = "rounded-2xl border border-border bg-white p-7 shadow-xs";

/* ---------- 1. Quick answer + who we are right for ---------- */

export function QuickAnswer() {
  return (
    <Section id="quick-answer" className="bg-white">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <Eyebrow>In 60 seconds</Eyebrow>
          <H2 className="mt-6">Google Ads management in Ahmedabad, in plain words</H2>
          <Lead className="mt-6">
            Digital Aura is a Google Ads agency based in Hanspura, Ahmedabad. We plan, run and improve your Search,
            Performance Max, Shopping and YouTube campaigns, set up tracking for calls, WhatsApp and form leads, and send
            a monthly report that shows enquiries, not just clicks. Campaigns run inside your own Google Ads account.
          </Lead>
          <div className="mt-8">
            <PrimaryCTA>Get My Free Google Ads Audit</PrimaryCTA>
          </div>
        </div>
        <div className="grid gap-4">
          <div className={card}>
            <h3 className="font-display text-[18px] font-bold text-navy">Who this is right for</h3>
            <ul className="mt-4 space-y-3 text-[15px] text-muted-foreground">
              {[
                "Businesses that need enquiries, appointments or sales from Google, not just traffic",
                "Owners who want to see every lead tracked back to the ad that brought it",
                "Teams taking over from another agency or a freelancer and wanting a clean restart",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className={card}>
            <h3 className="font-display text-[18px] font-bold text-navy">Who we will be honest with</h3>
            <ul className="mt-4 space-y-3 text-[15px] text-muted-foreground">
              {[
                "If you want guaranteed results or a fixed ROAS, we will say no. Nobody can promise that.",
                "If your monthly ad budget is very small, we will tell you when a freelancer or in-house route fits better.",
                "If your website cannot turn visitors into enquiries, we will fix that first instead of spending more on ads.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <X className="mt-0.5 size-4 shrink-0 text-red-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- 2. Ahmedabad market notes ---------- */

const SEASONS = [
  { t: "Festive season", d: "Navratri and Diwali lift demand for retail, jewellery, home and gifting. Budgets and offers need to be ready weeks before the peak, not during it." },
  { t: "Wedding season", d: "Jewellery, venues, clothing and event services see search demand rise with the wedding calendar. Plan campaigns around it." },
  { t: "Uttarayan and January", d: "Makar Sankranti is a major local event. Brands that tie offers to it get attention that generic campaigns miss." },
  { t: "Admission season", d: "Schools, colleges and coaching classes get most of their enquiries in a short window. Campaigns should be live and tracked before it opens." },
  { t: "Summer and monsoon", d: "Cooling, water, home repair and pest control spike in summer, and waterproofing and appliance repair follow in the rains." },
];

const AREAS = ["SG Highway & Bodakdev", "Satellite & Prahlad Nagar", "Navrangpura & CG Road", "Maninagar & Vastral", "Naroda & Vatva industrial areas", "Hanspura & SP Ring Road"];

export function AhmedabadMarket() {
  return (
    <Section id="ahmedabad-market" className="bg-surface-cream">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Local knowledge</Eyebrow>
        <H2 className="mt-6">Ahmedabad market notes that change how we run ads</H2>
        <Lead className="mt-6 mx-auto">
          Demand in Ahmedabad follows the local calendar and the city&apos;s areas. Campaigns copied from another city miss both.
        </Lead>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SEASONS.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className={card}
          >
            <h3 className="font-display text-[18px] font-bold text-navy">{s.t}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.d}</p>
          </motion.div>
        ))}
        <div className={`${card} sm:col-span-2 lg:col-span-1`}>
          <h3 className="font-display text-[18px] font-bold text-navy">Areas we target</h3>
          <p className="mt-2 text-[15px] text-muted-foreground">
            We set location targeting and ad copy by area, so a clinic in Satellite is not paying for clicks from Naroda.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <li key={a} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-cream px-3 py-1.5 text-[13px] font-semibold text-navy">
                <MapPin className="size-3.5 text-primary" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------- 3. What it costs (structure only, no figures) ---------- */

export function CostBreakdown() {
  const parts = [
    { t: "Your ad spend", d: "The budget Google charges for clicks. You decide it, and it is the largest part of the cost." },
    { t: "Management fee", d: "What an agency charges to plan, run and optimise the account. It depends on your ad spend, the channels and how much tracking and landing page work is needed." },
    { t: "Setup and tracking", d: "Conversion tracking for calls, WhatsApp and forms, and landing page fixes where the current page loses leads." },
    { t: "GST", d: "GST applies to agency fees and to Google Ads invoices as per Indian tax rules. Ask your accountant how input credit works for your business." },
  ];
  return (
    <Section id="cost" className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Cost</Eyebrow>
        <H2 className="mt-6">What Google Ads really costs in Ahmedabad</H2>
        <Lead className="mt-6 mx-auto">
          Four things make up the bill. We explain each one in your free audit and give you the fee in writing before you commit.
        </Lead>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {parts.map((p, i) => (
          <motion.div
            key={p.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className={card}
          >
            <span className="text-[12px] font-bold uppercase tracking-wider text-primary">0{i + 1}</span>
            <h3 className="mt-2 font-display text-[18px] font-bold text-navy">{p.t}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.d}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <PrimaryCTA>Get a Written Quote With My Audit</PrimaryCTA>
        <p className="text-[14px] text-muted-foreground">
          Also see our{" "}
          <a className="font-semibold text-primary underline" href="/seo-services-ahmedabad">SEO company in Ahmedabad</a> and{" "}
          <a className="font-semibold text-primary underline" href="/meta-ads-agency-ahmedabad/">Meta ads agency</a>.
        </p>
      </div>
    </Section>
  );
}

/* ---------- 4. Agency, freelancer or in-house ---------- */

const ROWS: [string, string, string, string][] = [
  ["Best when", "You want strategy, tracking, landing pages and reporting handled together", "Budget is small and the account is simple", "Ads are central to the business and you can hire and manage a specialist"],
  ["Coverage", "A team covers holidays, leave and platform changes", "One person, so leave or illness can pause optimisation", "Depends on how many people you hire"],
  ["Skills", "Ads, tracking, design and development under one roof", "Usually strong in one area", "You build the mix yourself"],
  ["Watch out for", "Ask who exactly will run your account", "Ask who covers when they are away", "Hiring time, salary and tool costs"],
];

export function AgencyComparison() {
  return (
    <Section id="compare-options" className="bg-surface-cream">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Choosing help</Eyebrow>
        <H2 className="mt-6">Agency, freelancer or in-house? An honest comparison</H2>
        <Lead className="mt-6 mx-auto">
          A freelancer is the right choice for some businesses, and we would rather you pick the right option than the wrong agency.
        </Lead>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {(["Agency", "Freelancer", "In-house"] as const).map((who, col) => (
          <div key={who} className={`${card} ${col === 0 ? "border-primary/40" : ""}`}>
            <h3 className="font-display text-[20px] font-bold text-navy">{who}</h3>
            <dl className="mt-4 space-y-4">
              {ROWS.map((r) => (
                <div key={r[0]}>
                  <dt className="text-[12px] font-bold uppercase tracking-wider text-primary">{r[0]}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{r[col + 1]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-[15px] text-muted-foreground">
        Not sure which fits? <a className="inline-flex items-center gap-1 font-semibold text-primary underline" href="#audit">Ask for the free audit <ArrowRight className="size-4" /></a>
      </p>
    </Section>
  );
}
