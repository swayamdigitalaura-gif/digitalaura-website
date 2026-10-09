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
            <p className="mt-4 text-[14px] text-muted-foreground">
              Curious what the audit covers? <a className="font-semibold text-primary underline" href="/google-ads-audit-ahmedabad/">See how our Google Ads audit works</a>.
            </p>
            <p className="mt-2 text-[14px] text-muted-foreground">
              Planning a budget? <a className="font-semibold text-primary underline" href="/google-ads-pricing-ahmedabad/">How Google Ads pricing works</a>. Running a clinic? <a className="font-semibold text-primary underline" href="/google-ads-for-doctors-ahmedabad/">Google Ads for doctors and hospitals</a>.
            </p>
            <p className="mt-2 text-[14px] text-muted-foreground">
              Comparing channels? See our <a className="font-semibold text-primary underline" href="/advertising-agency-ahmedabad/">advertising agency in Ahmedabad</a> page for Google, Meta, YouTube and LinkedIn ads.
            </p>
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
        <p className="text-[14px] text-muted-foreground">
          More from us: <a className="font-semibold text-primary underline" href="/digital-marketing-agency-ahmedabad/">digital marketing agency in Ahmedabad</a>,{" "}
          <a className="font-semibold text-primary underline" href="/services/cro/">conversion rate optimisation</a>,{" "}
          <a className="font-semibold text-primary underline" href="/awards/">awards and recognition</a> and{" "}
          <a className="font-semibold text-primary underline" href="/service-areas/">the areas we serve</a>.
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

/* ---------- Videos, team and people schema (owner-supplied, 2026-10-09) ---------- */

const ADS_REELS = ["DbpWKskDuEi", "DXkCXfnDBZE"];

export const TEAM_MEMBERS = [
  { name: "Satish Prajapati", role: "Project Manager & Digital Marketing", photo: "/team/satish.png", bio: "Satish Prajapati leads project management and digital marketing initiatives, ensuring smooth project execution and effective marketing strategies. He focuses on team coordination, campaign planning, and delivering results that support business growth." },
  { name: "Bhavesh Bhavsar", role: "Digital Marketing Executive", photo: "/team/bhavesh.webp", bio: "Bhavesh Bhavsar works on digital marketing activities focused on improving online visibility and business growth. He contributes to SEO, website optimization, content planning, and digital marketing performance to help businesses strengthen their online presence." },
];

export const FOUNDER_SAME_AS = ["https://www.linkedin.com/in/sambhav-shah/", "https://www.instagram.com/sambhavshah2/"];

/** Reel card in the style of the video testimonials page: thumbnail (/reels/google-ads-<n>.webp) that opens the reel on Instagram. */
function ReelCard({ id, n }: { id: string; n: number }) {
  const label = `Google Ads reel ${n}`;
  const thumb = `/reels/google-ads-${n}.webp`;
  const url = `https://www.instagram.com/reel/${id}/`;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Watch this reel on Instagram: ${label}`} className="group relative block w-full overflow-hidden text-white" style={{ aspectRatio: "333 / 540", background: "linear-gradient(160deg, #0A1628, #1A6FE8)" }}>
        <img src={thumb} alt={`${label} thumbnail`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
        <span className="absolute inset-0 bg-black/20 transition-all group-hover:bg-black/30" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-transform group-hover:scale-110" style={{ color: "#1A6FE8" }}>&#9654;</span>
        </span>
        <span className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: "rgba(10,22,40,0.75)" }}>Instagram</span>
      </a>
      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm">
        <span className="text-muted-foreground">Reel by Sambhav Shah</span>
        <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">Watch on Instagram</a>
      </div>
    </div>
  );
}

export function AdsReels() {
  return (
    <Section id="google-ads-videos" className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Watch</Eyebrow>
        <H2 className="mt-6">Google Ads in short videos</H2>
        <Lead className="mt-6 mx-auto">Short, practical videos from our founder, Sambhav Shah, on how Google Ads works for businesses in Ahmedabad.</Lead>
      </div>
      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
        {ADS_REELS.map((id, i) => <ReelCard key={id} id={id} n={i + 1} />)}
      </div>
    </Section>
  );
}

export function TeamSection() {
  return (
    <Section id="team" className="bg-surface-cream">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Our team</Eyebrow>
        <H2 className="mt-6">The team behind your Google Ads</H2>
        <Lead className="mt-6 mx-auto">
          Digital Aura is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing. Meet the in-house team you will work with at our Hanspura office, Ahmedabad.
        </Lead>
      </div>
      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
        {TEAM_MEMBERS.map((m) => (
          <div key={m.name} className={card}>
            <div className="flex items-center gap-3">
              <img src={m.photo} alt={`${m.name}, ${m.role} at Digital Aura`} width={56} height={56} loading="lazy" className="size-14 shrink-0 rounded-full bg-surface-cream object-cover" />
              <div>
                <h3 className="font-bold leading-tight">{m.name}</h3>
                <p className="text-sm font-semibold text-primary">{m.role}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Founder Sambhav Shah:{" "}
        <a className="font-semibold text-primary underline" href={FOUNDER_SAME_AS[0]} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        {" · "}
        <a className="font-semibold text-primary underline" href={FOUNDER_SAME_AS[1]} target="_blank" rel="noopener noreferrer">Instagram</a>
      </p>
    </Section>
  );
}

export function PeopleSchema() {
  const org = { "@type": "LocalBusiness", "@id": "https://thedigitalaura.com/#localbusiness", name: "Digital Aura" };
  const people = [
    { "@context": "https://schema.org", "@type": "Person", name: "Sambhav Shah", jobTitle: "Founder", worksFor: org, url: "https://thedigitalaura.com/about/", sameAs: FOUNDER_SAME_AS },
    ...TEAM_MEMBERS.map((m) => ({ "@context": "https://schema.org", "@type": "Person", name: m.name, jobTitle: m.role, description: m.bio, worksFor: org })),
  ];
  return (
    <>
      {people.map((p) => (
        <script key={p.name} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(p) }} />
      ))}
    </>
  );
}
