import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Check, Clock, Mail, MapPin, MessageCircle, Phone, X, Search, Layers, PenLine, Activity,
  MousePointerClick, FileBarChart, PartyPopper, Gem, Wind, GraduationCap, Sun, IndianRupee, ClipboardCheck,
  Stethoscope, Smile, Baby, Megaphone, TrendingUp, Factory, ShoppingCart, Wrench, Database,
} from "lucide-react";
import { Eyebrow, PrimaryCTA, SecondaryCTA, Section, SectionHead, CardBadge, CARD } from "../shared/SectionPrimitives";

/* Sections added from the page blueprint (gads-01). Deliberately free of new
   numeric claims: no prices, ROAS, client counts or budgets are stated here. */

const card = CARD;

/* ---------- 1. Quick answer + who we are right for ---------- */

export function QuickAnswer() {
  const fit = [
    "Businesses that need enquiries, appointments or sales from Google, not just traffic",
    "Owners who want every lead tracked back to the ad that brought it",
    "Teams taking over from another agency or a freelancer and wanting a clean restart",
  ];
  const honest = [
    "If you want guaranteed results or a fixed ROAS, we will say no. Nobody can promise that.",
    "If your monthly ad budget is very small, we will tell you when a freelancer or in-house route fits better.",
    "If your website cannot turn visitors into enquiries, we will fix that first instead of spending more on ads.",
  ];
  return (
    <Section id="quick-answer" className="bg-white">
      <SectionHead
        eyebrow="In 60 seconds"
        title="Google Ads management in Ahmedabad, in plain words"
        lead="Digital Aura is a Google Ads agency and performance marketing company in Hanspura, Ahmedabad. We plan, run and improve your Search, Performance Max, Shopping and YouTube campaigns, set up tracking for calls, WhatsApp and form leads, and send a monthly report that shows enquiries, not just clicks. Campaigns run inside your own Google Ads account."
      />
      <div className="pillar-cols-2 mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        <div className={card}>
          <h3 className="flex items-center gap-3 font-display text-[18px] font-bold text-navy">
            <CardBadge><Check className="size-5" /></CardBadge> Who this is right for
          </h3>
          <ul className="mt-4 space-y-3 text-[15px] text-muted-foreground">
            {fit.map((t) => (
              <li key={t} className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{t}</li>
            ))}
          </ul>
        </div>
        <div className={card}>
          <h3 className="flex items-center gap-3 font-display text-[18px] font-bold text-navy">
            <CardBadge><X className="size-5" /></CardBadge> Who we will be honest with
          </h3>
          <ul className="mt-4 space-y-3 text-[15px] text-muted-foreground">
            {honest.map((t) => (
              <li key={t} className="flex gap-3"><X className="mt-0.5 size-4 shrink-0 text-red-500" />{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-4xl text-center text-[14px] leading-relaxed text-muted-foreground">
        <a className="font-semibold text-primary underline" href="/google-ads-audit-ahmedabad/">How our Google Ads audit works</a>
        {" · "}<a className="font-semibold text-primary underline" href="/google-ads-pricing-ahmedabad/">How Google Ads pricing works</a>
        {" · "}<a className="font-semibold text-primary underline" href="/google-ads-for-doctors-ahmedabad/">Google Ads for doctors</a>
        {" · "}<a className="font-semibold text-primary underline" href="/advertising-agency-ahmedabad/">Advertising agency in Ahmedabad</a>
      </p>
    </Section>
  );
}

/* ---------- 2. Ahmedabad market notes ---------- */

const SEASONS = [
  { Icon: PartyPopper, t: "Festive season", d: "Navratri and Diwali lift demand for retail, jewellery, home and gifting. Budgets and offers need to be ready weeks before the peak, not during it." },
  { Icon: Gem, t: "Wedding season", d: "Jewellery, venues, clothing and event services see search demand rise with the wedding calendar. Plan campaigns around it." },
  { Icon: Wind, t: "Uttarayan and January", d: "Makar Sankranti is a major local event. Brands that tie offers to it get attention that generic campaigns miss." },
  { Icon: GraduationCap, t: "Admission season", d: "Schools, colleges and coaching classes get most of their enquiries in a short window. Campaigns should be live and tracked before it opens." },
  { Icon: Sun, t: "Summer and monsoon", d: "Cooling, water, home repair and pest control spike in summer, and waterproofing and appliance repair follow in the rains." },
];

const AREAS = ["SG Highway & Bodakdev", "Satellite & Prahlad Nagar", "Navrangpura & CG Road", "Maninagar & Vastral", "Naroda & Vatva industrial areas", "Hanspura & SP Ring Road"];

export function AhmedabadMarket() {
  return (
    <Section id="ahmedabad-market" className="bg-surface-cream">
      <SectionHead
        eyebrow="Local knowledge"
        title="Ahmedabad market notes that change how we run ads"
        lead="Demand in Ahmedabad follows the local calendar and the city's areas. Campaigns copied from another city miss both."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {SEASONS.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className={`${card} ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
          >
            <div className="flex items-center gap-3">
              <CardBadge><s.Icon className="size-5" /></CardBadge>
              <h3 className="font-display text-[17px] font-bold text-navy">{s.t}</h3>
            </div>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{s.d}</p>
          </motion.div>
        ))}
        <div className={`${card} pillar-card--wide sm:col-span-2 lg:col-span-6`}>
          <div className="flex items-center gap-3">
            <CardBadge><MapPin className="size-5" /></CardBadge>
            <h3 className="font-display text-[17px] font-bold text-navy">Areas we target</h3>
          </div>
          <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
            Location targeting and ad copy are set by area, so a clinic in Satellite is not paying for clicks from Naroda.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <li key={a} className="rounded-full border border-border bg-surface-cream px-3 py-1 text-[12.5px] font-semibold text-navy">{a}</li>
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
    <Section id="cost" className="bg-surface-cream">
      <SectionHead
        eyebrow="Cost"
        title="What Google Ads really costs in Ahmedabad"
        lead="Four things make up the bill. We explain each one in your free audit and give you the fee in writing before you commit."
      />
      <div className="pillar-cols-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {parts.map((p, i) => (
          <motion.div
            key={p.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className={card}
          >
            <div className="flex items-center gap-3">
              <CardBadge>0{i + 1}</CardBadge>
              <h3 className="font-display text-[17px] font-bold text-navy">{p.t}</h3>
            </div>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{p.d}</p>
          </motion.div>
        ))}
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
    <Section id="compare-options" className="bg-white">
      <SectionHead
        eyebrow="Choosing help"
        title="Agency, freelancer or in-house? An honest comparison"
        lead="A freelancer is the right choice for some businesses, and we would rather you pick the right option than the wrong agency."
      />
      <div className="mx-auto max-w-5xl overflow-x-auto rounded-2xl border border-border bg-white shadow-xs">
        <table className="w-full min-w-[680px] border-collapse text-left text-[14.5px]">
          <thead>
            <tr className="bg-surface-cream text-navy">
              <th className="w-[16%] p-4 text-[12px] font-bold uppercase tracking-wider text-muted-foreground"> </th>
              <th className="bg-primary/10 p-4 font-display text-[16px] font-bold">Agency</th>
              <th className="p-4 font-display text-[16px] font-bold">Freelancer</th>
              <th className="p-4 font-display text-[16px] font-bold">In-house</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r[0]} className="border-t border-border align-top">
                <th className="p-4 text-[12px] font-bold uppercase tracking-wider text-primary">{r[0]}</th>
                <td className="bg-primary/[0.04] p-4 text-navy/90">{r[1]}</td>
                <td className="p-4 text-muted-foreground">{r[2]}</td>
                <td className="p-4 text-muted-foreground">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-5 text-center text-[15px] text-muted-foreground">
        Not sure which fits? <a className="inline-flex items-center gap-1 font-semibold text-primary underline" href="#audit-final">Ask for the free audit <ArrowRight className="size-4" /></a>
      </p>
    </Section>
  );
}

/* ---------- Videos, team and people schema (owner-supplied, 2026-10-09) ---------- */

const ADS_REELS = ["DbpWKskDuEi", "DXkCXfnDBZE"];

export const FOUNDER = {
  name: "Sambhav Shah",
  role: "Founder & CEO",
  photo: "/team/sambhav-shah.webp",
  bio: "Sambhav started in digital marketing in 2015 and built his expertise hands-on, leading business development, client relationships and growing teams. With 10+ years across client acquisition, team leadership and digital execution, he stays personally involved in strategy on every account.",
};

export const TEAM_MEMBERS = [
  { name: "Satish Prajapati", role: "Google Ads Specialist", photo: "/team/satish.png", bio: "Satish plans account structure, budgets and bidding, and keeps campaigns tied to the enquiries you want. Satish also coordinates the team and walks you through each month's results." },
  { name: "Bhavesh Bhavsar", role: "Google Ads Executive", photo: "/team/bhavesh.webp", bio: "Bhavesh manages campaign setup, conversion tracking and daily checks, so calls, forms and WhatsApp clicks are counted correctly and budgets stay on track." },
  { name: "Krishna Jani", role: "Google Ads Executive", photo: "/team/krishna.webp", bio: "Krishna supports campaign optimisation and landing page checks, making sure the page a visitor lands on keeps the promise made in the ad." },
  { name: "Diya Mahida", role: "Google Ads Executive", photo: "/team/diya.webp", bio: "Diya prepares performance reports and audience and placement reviews, turning account data into clear next steps for the team and for you." },
];

export const FOUNDER_SAME_AS = ["https://www.linkedin.com/in/sambhav-shah/", "https://www.instagram.com/sambhavshah2/"];

/** Reel card styled like an Instagram post: thumbnail /reels/google-ads-<n>.webp, video /reels/google-ads-<n>.mp4 played in place; Instagram link if the file is missing. */
function ReelCard({ id, n }: { id: string; n: number }) {
  const label = `Google Ads reel ${n}`;
  const thumb = `/reels/google-ads-${n}.webp`;
  const video = `/reels/google-ads-${n}.mp4`;
  const [mode, setMode] = useState<"idle" | "playing" | "error">("idle");
  const [thumbOk, setThumbOk] = useState(true);
  const url = `https://www.instagram.com/reel/${id}/`;
  return (
    <div className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: "#DBDBDB" }}>
      <div className="flex items-center gap-2 px-3 py-2.5">
        <img src="/reels/sambhav-avatar.jpg" alt="Sambhav Shah" width={28} height={28} loading="lazy" className="h-7 w-7 shrink-0 rounded-full bg-[#EFEFEF] object-cover" />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[11px] font-semibold text-[#262626]">sambhavshah2</p>
          <p className="truncate text-[10px] text-[#8E8E8E]">Original audio</p>
        </div>
        <a href="https://www.instagram.com/sambhavshah2/" target="_blank" rel="noopener noreferrer" className="rounded px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: "#4C5FEF" }}>View profile</a>
      </div>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 5", background: thumbOk ? "#000" : "linear-gradient(160deg, #0A1628, #3a3a5c)" }}>
        {mode === "playing" ? (
          <video src={video} poster={thumb} controls autoPlay playsInline preload="auto" className="absolute inset-0 h-full w-full bg-black object-contain" onError={() => setMode("error")} />
        ) : mode === "error" ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 text-center text-white">
            <span className="text-sm font-bold">This video could not be loaded here</span>
            <span className="text-xs underline">Watch it on Instagram</span>
          </a>
        ) : (
          <button type="button" onClick={() => setMode("playing")} aria-label={`Play video: ${label}`} className="group absolute inset-0 block h-full w-full">
            <img src={thumb} alt={`${label} thumbnail`} loading="lazy" className={`absolute inset-0 h-full w-full object-contain ${thumbOk ? "" : "hidden"}`} onError={() => setThumbOk(false)} />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#262626] shadow-lg transition-transform group-hover:scale-110"><span className="ml-1">&#9654;</span></span>
            </span>
          </button>
        )}
      </div>
      <div className="px-3 pb-2 pt-2.5">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-medium text-[#3897F0]">View more on Instagram</a>
      </div>
      <div className="mx-3 border-t border-[#EFEFEF]" />
      <div className="flex items-center gap-3 px-3 py-2.5 text-[#262626]" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z" /></svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
        <span className="ml-auto"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg></span>
      </div>
      <div className="mx-3 border-t border-[#EFEFEF]" />
      <div className="flex items-center justify-between px-3 py-2.5 text-[11px] text-[#8E8E8E]" aria-hidden="true">
        <span>Add a comment...</span>
        <span className="text-[#262626]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg></span>
      </div>
    </div>
  );
}

export function AdsReels() {
  return (
    <Section id="google-ads-videos" className="bg-surface-cream">
      <SectionHead
        eyebrow="Watch"
        title="Google Ads in short videos"
        lead="Short, practical videos from our founder, Sambhav Shah, on how Google Ads works for businesses in Ahmedabad."
      />
      <div className="mx-auto grid max-w-[580px] grid-cols-1 gap-4 sm:grid-cols-2">
        {ADS_REELS.map((id, i) => <ReelCard key={id} id={id} n={i + 1} />)}
      </div>
    </Section>
  );
}

export function TeamSection() {
  return (
    <Section id="team" className="bg-white">
      <SectionHead
        eyebrow="Our team"
        title="Meet the team that guards your ad spend"
        lead="Digital Aura is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing. This is the in-house team at our Hanspura office, Ahmedabad, that runs your Google Ads."
      />
      <div className="mx-auto max-w-6xl">
        <div className="pillar-team-founder">
          <img src={FOUNDER.photo} alt={`${FOUNDER.name}, ${FOUNDER.role} at Digital Aura`} width={96} height={96} loading="lazy" />
          <div>
            <h3>{FOUNDER.name}</h3>
            <p className="pillar-team-role">{FOUNDER.role}</p>
            <p className="pillar-team-bio">{FOUNDER.bio}</p>
            <p className="mt-3 flex flex-wrap gap-4 text-sm">
              <a className="font-semibold text-primary underline" href={FOUNDER_SAME_AS[0]} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="font-semibold text-primary underline" href={FOUNDER_SAME_AS[1]} target="_blank" rel="noopener noreferrer">Instagram</a>
            </p>
          </div>
        </div>
        <div className="pillar-team-grid" style={{ "--team-cols": TEAM_MEMBERS.length } as React.CSSProperties}>
          {TEAM_MEMBERS.map((m) => (
            <div key={m.name} className="pillar-team-card">
              <div className="pillar-team-card-top">
                <img src={m.photo} alt={`${m.name}, ${m.role} at Digital Aura`} width={56} height={56} loading="lazy" />
                <div>
                  <h3>{m.name}</h3>
                  <p className="pillar-team-role">{m.role}</p>
                </div>
              </div>
              <p className="pillar-team-bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function PeopleSchema() {
  const org = { "@type": "LocalBusiness", "@id": "https://thedigitalaura.com/#localbusiness", name: "Digital Aura" };
  const people = [
    { "@context": "https://schema.org", "@type": "Person", name: FOUNDER.name, jobTitle: "Founder", description: FOUNDER.bio, worksFor: org, url: "https://thedigitalaura.com/about/", sameAs: FOUNDER_SAME_AS },
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

export const STATS_ITEMS = [
  { k: "120+", v: "Clients served" },
  { k: "750+", v: "Projects delivered" },
  { k: "10+", v: "Years in digital marketing" },
  { k: "Free", v: "Google Ads audit, reply by email" },
];

/* ---------- Trust numbers band (same pattern as the SEO page; only the confirmed company figures) ---------- */

export function StatsBand() {
  const items = STATS_ITEMS;
  return (
    <section className="bg-surface-cream">
      <div className="mx-auto w-full max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {items.map((s) => (
            <div key={s.v} className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-white p-4 text-center shadow-xs">
              <div className="font-display text-3xl font-extrabold text-navy md:text-4xl">{s.k}</div>
              <div className="mt-1 text-[13.5px] text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Explore: one card per related page, so the next step is always clear ---------- */

export function ExploreMore() {
  const items = [
    { Icon: IndianRupee, t: "Google Ads pricing", d: "How fees and ad spend are set, and what to budget.", h: "/google-ads-pricing-ahmedabad/" },
    { Icon: ClipboardCheck, t: "Free Google Ads audit", d: "Find where budget is wasted, with a written action list.", h: "/google-ads-audit-ahmedabad/" },
    { Icon: Stethoscope, t: "Google Ads for doctors", d: "Compliant campaigns for clinics and hospitals.", h: "/google-ads-for-doctors-ahmedabad/" },
    { Icon: Smile, t: "Google Ads for dentists", d: "Near-me and treatment campaigns for dental clinics.", h: "/google-ads-for-dentists-ahmedabad/" },
    { Icon: Baby, t: "Google Ads for IVF clinics", d: "Careful, policy-aware search campaigns for fertility clinics.", h: "/google-ads-for-ivf-clinics-ahmedabad/" },
    { Icon: Search, t: "Google Ads service overview", d: "Every Google Ads service we run, on one page.", h: "/services/google-ads/" },
    { Icon: Megaphone, t: "Meta ads agency", d: "Facebook and Instagram campaigns for leads.", h: "/meta-ads-agency-ahmedabad/" },
    { Icon: Search, t: "SEO services", d: "Rank on Google and in AI search over time.", h: "/seo-services-ahmedabad" },
    { Icon: TrendingUp, t: "Conversion rate optimisation", d: "Turn more of the clicks you pay for into enquiries.", h: "/services/cro/" },
  ];
  return (
    <Section id="explore" className="bg-white">
      <SectionHead eyebrow="Explore" title="Explore each Google Ads service" lead="One focused page for each question, so you can go straight to what you need." />
      <div className="pillar-cols-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <a key={i.h} href={i.h} className={`${card} group flex flex-col`}>
            <CardBadge><i.Icon className="size-5" /></CardBadge>
            <h3 className="mt-3 font-display text-[16.5px] font-bold leading-snug text-navy">{i.t}</h3>
            <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-muted-foreground">{i.d}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[13.5px] font-semibold text-primary group-hover:gap-2">
              Learn more <ArrowRight className="size-4" />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Google Ads guides (blog posts on this topic) ---------- */

const GUIDES = [
  { t: "How to choose a Google Ads agency in Ahmedabad", d: "10 questions to ask and the red flags to watch for.", h: "/blog/how-to-choose-google-ads-agency-ahmedabad/" },
  { t: "Google Ads or Meta Ads first", d: "Where an Ahmedabad business should spend its first rupee.", h: "/blog/google-ads-vs-meta-ads-ahmedabad/" },
  { t: "Google Ads clicks but no leads: 10 fixes", d: "Where to look when the ads get clicks and the phone stays quiet.", h: "/blog/google-ads-clicks-but-no-leads-fixes/" },
  { t: "Google Ads audit checklist: 30 checks", d: "Find wasted spend in your account before you add budget.", h: "/blog/google-ads-audit-checklist/" },
  { t: "Google Ads for builders and real estate", d: "Keywords, budget planning and lead quality for property ads.", h: "/blog/google-ads-real-estate-ahmedabad-guide/" },
  { t: "Google Ads strategy checklist for 2026", d: "A step-by-step checklist to review an account before you spend more.", h: "/blog/google-ads-strategy-checklist-2026/" },
  { t: "7 Google Ads mistakes costing you money", d: "The settings and habits that quietly waste budget.", h: "/blog/7-google-ads-mistakes-2026/" },
  { t: "Google Ads in 2026: new strategies worth testing", d: "What is new, and what is worth a test budget.", h: "/blog/google-ads-2026-new-strategies/" },
  { t: "Google Ads tactics that stopped working", d: "Old tricks that no longer pay off.", h: "/blog/google-ads-tactics-stopped-working-2026/" },
  { t: "Local business marketing with Google Ads and Maps", d: "How a local business gets calls from Search and Maps.", h: "/blog/local-business-google-ads-maps-2026/" },
];

export function AdsGuides() {
  return (
    <Section id="ads-guides" className="bg-white">
      <SectionHead eyebrow="Google Ads guides" title="Learn how Google Ads works before you hire anyone" lead="Plain-English guides from our team. Read them to judge any Google Ads proposal, ours included." />
      <div className="pillar-cols-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((g) => (
          <a key={g.h} href={g.h} className={`${card} group flex flex-col`}>
            <h3 className="font-display text-[16.5px] font-bold leading-snug text-navy">{g.t}</h3>
            <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-muted-foreground">{g.d}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[13.5px] font-semibold text-primary group-hover:gap-2">Read the guide <ArrowRight className="size-4" /></span>
          </a>
        ))}
      </div>
    </Section>
  );
}

/* ---------- What the agency actually does (blueprint gads-01 section 3). No prices or new numeric claims. ---------- */

export function WhatWeDo() {
  const items = [
    { Icon: Layers, t: "Account and campaign structure", d: "Campaigns grouped by what you sell and where, so budget goes to the searches that pay." },
    { Icon: Search, t: "Keywords and search terms", d: "We add what converts and block the searches that waste money, reviewed on a regular schedule." },
    { Icon: PenLine, t: "Ads that match the search", d: "Ad copy written for the search, tested against alternatives and improved from real results." },
    { Icon: Activity, t: "Conversion tracking", d: "Calls, WhatsApp clicks and form leads counted in your own Google Ads and Analytics accounts." },
    { Icon: MousePointerClick, t: "Landing page advice", d: "Changes, or a focused page, so the click you paid for lands somewhere that makes it easy to enquire.", h: "/services/cro/" },
    { Icon: FileBarChart, t: "Reporting and a monthly call", d: "A report on enquiries and cost per enquiry, and a call to agree what happens next." },
  ];
  return (
    <Section id="what-we-do" className="bg-white">
      <SectionHead
        eyebrow="What you get"
        title="What a Google Ads agency in Ahmedabad actually does"
        lead="Whatever you call it, a Google Ads agency, a PPC company, a performance marketing agency or a management service, the job is the same: run your paid search so the money you spend turns into enquiries you can count."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((x) => (
          <div key={x.t} className={card}>
            <div className="flex items-center gap-3">
              <CardBadge><x.Icon className="size-5" /></CardBadge>
              <h3 className="font-display text-[17px] font-bold leading-snug text-navy">{x.t}</h3>
            </div>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{x.d}</p>
            {x.h && <a className="mt-2 inline-block text-[13.5px] font-semibold text-primary underline" href={x.h}>Conversion rate optimisation</a>}
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-3xl text-center text-[14.5px] text-muted-foreground">
        Want to know what this costs first? See <a className="font-semibold text-primary underline" href="/google-ads-pricing-ahmedabad/">how Google Ads pricing works</a>, or ask for the <a className="font-semibold text-primary underline" href="/google-ads-audit-ahmedabad/">free Google Ads audit</a>.
      </p>
    </Section>
  );
}

/* ---------- First 90 days (blueprint gads-01 section 5), with one CTA at the end ---------- */

export function First90Days() {
  const steps = [
    { w: "Week 1", t: "Access and goals", d: "We agree what counts as a lead, get access to your Google Ads and Analytics, and read the account history." },
    { w: "Weeks 2 to 3", t: "Audit and tracking", d: "We check structure, search terms and wasted spend, and fix conversion tracking before any budget is scaled." },
    { w: "Weeks 4 to 6", t: "Rebuild and launch", d: "New campaign structure, ads and negative keywords go live, with landing page fixes where they are needed." },
    { w: "Weeks 7 to 12", t: "Optimise and report", d: "Regular search term reviews and tests, the first full monthly report, and a call to decide whether to scale, hold or change." },
  ];
  return (
    <Section id="first-90-days" className="bg-surface-cream">
      <SectionHead
        eyebrow="Your first 90 days"
        title="Our first 90 days, step by step"
        lead="A clear start, so you know what is being done and when. Notice and contract terms are written in your proposal."
      />
      <div className="relative">
        <div className="absolute left-[12%] right-[12%] top-5 hidden h-0.5 bg-border lg:block" aria-hidden="true" />
        <div className="pillar-cols-4 relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((x, i) => (
            <div key={x.w} className={card}>
              <div className="flex items-center gap-3">
                <CardBadge>{i + 1}</CardBadge>
                <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary">{x.w}</span>
              </div>
              <h3 className="mt-3 font-display text-[17px] font-bold text-navy">{x.t}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-center text-[13.5px] text-muted-foreground">Timelines vary with budget, industry and the state of the account. Judge the first month on direction and lead quality, not on a single day.</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PrimaryCTA href="#audit-final">Get My Free Google Ads Audit</PrimaryCTA>
        <SecondaryCTA href="https://wa.me/918141200284">Chat on WhatsApp</SecondaryCTA>
      </div>
    </Section>
  );
}

/* ---------- Map + contact (local trust). Details confirmed by the owner. ---------- */

const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.4042735126313!2d72.6881782!3d23.082292199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83bdb5cc83a9%3A0xcbe9af162f4cdebc!2sDigital%20Aura!5e0!3m2!1sen!2sin!4v1792055176408!5m2!1sen!2sin";

/** Map and contact details, placed directly above the site footer. */
export function VisitUs() {
  const rows = [
    { Icon: Phone, label: "Call us", value: "+91 81412 00284", href: "tel:+918141200284" },
    { Icon: MessageCircle, label: "WhatsApp", value: "Message us", href: "https://wa.me/918141200284" },
    { Icon: Mail, label: "Email", value: "info@thedigitalaura.com", href: "mailto:info@thedigitalaura.com" },
  ];
  return (
    <div id="visit-us" className="mt-14 border-t border-white/15 pt-12">
      <div className="pillar-head !mb-8">
        <span className="pillar-eyebrow">Find us</span>
        <h3 className="mt-3 text-2xl font-extrabold text-white md:text-[28px]">Talk to us, or drop in at our Hanspura office</h3>
      </div>
      <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-white shadow-xs md:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[300px] bg-surface-cream md:min-h-[400px]">
          <iframe
            src={MAPS_EMBED}
            title="Digital Aura office on Google Maps: 713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad"
            width="600"
            height="450"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="flex flex-col p-6 md:p-8">
          <h3 className="font-display text-[22px] font-bold text-navy">Talk to us</h3>
          <ul className="mt-5 space-y-4">
            {rows.map(({ Icon, label, value, href }) => (
              <li key={label}>
                <a href={href} className="group flex items-center gap-3">
                  <CardBadge className="rounded-full"><Icon className="size-5" /></CardBadge>
                  <span className="min-w-0">
                    <span className="block text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
                    <span className="block truncate text-[15px] font-bold text-navy group-hover:text-primary">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3 border-t border-border pt-5 text-[14px] text-muted-foreground">
            <p className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /><span>713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad, Gujarat 382330</span></p>
            <p className="flex items-start gap-3"><Clock className="mt-0.5 size-4 shrink-0 text-primary" /><span>Monday to Saturday, 10 AM to 7 PM. Closed on Sunday.</span></p>
          </div>
          <div className="mt-6 md:mt-auto md:pt-6">
            <PrimaryCTA href="/google-ads-audit-ahmedabad/" className="w-full !px-6 !text-[16px]">Request the free Google Ads audit</PrimaryCTA>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Wave 3: self-check, leak checks and tracking by lead type (blueprint gads-01) ---------- */

export function SelfCheck() {
  const qs = [
    { q: "Do people search for what you sell?", d: "If customers type your service or product into Google, ads can meet them at that moment. If nobody searches for it, another channel may do more." },
    { q: "Is one customer worth more than the cost of the clicks?", d: "Work out what a new customer is worth to you, and how many enquiries it takes to win one. This decides what you can sensibly pay per enquiry." },
    { q: "Can you answer calls and WhatsApp quickly?", d: "Paid enquiries cool fast. If nobody replies within the hour, the best campaign still loses the lead." },
    { q: "Do you have a budget that can run long enough to learn?", d: "Search campaigns need time and data. A budget that stops after a few days cannot show what works." },
  ];
  return (
    <Section id="is-it-right" className="bg-white">
      <SectionHead
        eyebrow="Is Google Ads right for you?"
        title="Four questions to answer before you spend a rupee"
        lead="If you can say yes to all four, Google Ads is likely a good fit. If not, we will tell you what to fix first, or suggest a different channel."
      />
      <div className="pillar-cols-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {qs.map((x, i) => (
          <div key={x.q} className={card}>
            <CardBadge>{i + 1}</CardBadge>
            <h3 className="mt-3 font-display text-[16.5px] font-bold leading-snug text-navy">{x.q}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{x.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-[14px] text-muted-foreground">
        Want to see what your budget could buy? Try the <a className="font-semibold text-primary underline" href="/google-ads-pricing-ahmedabad/">budget calculator on our pricing page</a>.
      </p>
    </Section>
  );
}

export function LeakChecks() {
  const leaks = [
    { t: "Search terms", spot: "Open the Search terms report and read what people actually typed. Look for words that have nothing to do with what you sell.", fix: "We add negative keywords, tighten match types and group searches by intent." },
    { t: "Tracking", spot: "Open the Conversions column. If it is empty, shows clicks only or counts the same lead twice, the account is guessing.", fix: "We count calls, WhatsApp clicks and form leads once each, and check the setup with Tag Assistant." },
    { t: "Landing page", spot: "Click your own ad on a phone. If it lands on a generic homepage that loads slowly, visitors will leave.", fix: "We send each campaign to a page built for that search, with one clear action." },
    { t: "Location and schedule", spot: "Open the location report. Check whether clicks come from outside Ahmedabad, and whether ads run when nobody can answer.", fix: "We set location targeting to people in the area and match the ad schedule to office hours." },
    { t: "Lead follow-up", spot: "Count how many enquiries from the last month were answered the same day. Lost leads are budget lost after the click.", fix: "We set up instant WhatsApp replies and alerts so missed leads are caught." },
    { t: "Brand mixed with generic", spot: "Check whether searches for your own name sit in the same campaign as new-customer searches. Results look better than they are.", fix: "We separate brand and non-brand campaigns so you can see what is bringing new customers." },
  ];
  return (
    <Section id="leak-checks" className="bg-surface-cream">
      <SectionHead
        eyebrow="Check your own account"
        title="Six common leaks, and how to spot each in five minutes"
        lead="You do not need us to find these. Open your account and look. If you would rather have a second pair of eyes, our audit covers all six and more."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {leaks.map((l, i) => (
          <div key={l.t} className={`${card} flex flex-col`}>
            <div className="flex items-center gap-3">
              <CardBadge>{i + 1}</CardBadge>
              <h3 className="font-display text-[17px] font-bold text-navy">{l.t}</h3>
            </div>
            <div className="mt-3 rounded-xl bg-surface-cream p-3">
              <p className="text-[11.5px] font-bold uppercase tracking-wider text-navy">How to spot it</p>
              <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{l.spot}</p>
            </div>
            <div className="mt-2.5 rounded-xl bg-primary/[0.07] p-3">
              <p className="text-[11.5px] font-bold uppercase tracking-wider text-primary">What we change</p>
              <p className="mt-1 text-[14px] leading-relaxed text-navy/80">{l.fix}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-[13.5px] text-muted-foreground">
        For a fuller list, see the <a className="font-semibold text-primary underline" href="/google-ads-audit-ahmedabad/">Google Ads audit checklist</a>. Settings and report names change as Google updates its interface.
      </p>
    </Section>
  );
}

export function TrackingByLeadType() {
  const rows = [
    { Icon: Stethoscope, who: "Clinics and hospitals", lead: "Phone call, WhatsApp message, appointment request", how: "Call and WhatsApp click tracking, a short booking form counted as a conversion, no patient details sent to Google" },
    { Icon: Factory, who: "Manufacturers and exporters", lead: "Quotation request, call, email", how: "RFQ form with product and quantity fields, click-to-call tracking, and a way to mark which enquiries became orders" },
    { Icon: ShoppingCart, who: "Online stores", lead: "Purchase, add to cart", how: "Purchase tracking with order value, a clean product feed, and separate counting for new and returning customers" },
    { Icon: GraduationCap, who: "Education and coaching", lead: "Enquiry form, call, demo-class booking", how: "Form and call conversions by course, with admission outcome fed back where you keep records" },
    { Icon: Wrench, who: "Local services", lead: "Call, WhatsApp, directions request", how: "Call assets with duration thresholds, WhatsApp clicks and Google Business Profile actions" },
  ];
  return (
    <Section id="tracking-by-lead" className="bg-white">
      <SectionHead
        eyebrow="What counts as a lead"
        title="What we track, by the kind of business you run"
        lead="Smart bidding optimises for whatever you count. So we agree what a real lead is for your business first, and set tracking to match."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rows.map((r) => (
          <div key={r.who} className={card}>
            <div className="flex items-center gap-3">
              <CardBadge><r.Icon className="size-5" /></CardBadge>
              <h3 className="font-display text-[17px] font-bold text-navy">{r.who}</h3>
            </div>
            <p className="mt-3 text-[11.5px] font-bold uppercase tracking-wider text-primary">A lead looks like</p>
            <p className="mt-1 text-[14.5px] font-semibold text-navy/90">{r.lead}</p>
            <p className="mt-3 text-[11.5px] font-bold uppercase tracking-wider text-primary">How we measure it</p>
            <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{r.how}</p>
          </div>
        ))}
        <div className="pillar-card rounded-2xl border border-dashed border-primary/40 bg-primary/[0.04] p-5">
          <div className="flex items-center gap-3">
            <CardBadge><Database className="size-5" /></CardBadge>
            <h3 className="font-display text-[17px] font-bold text-navy">Do you keep a CRM?</h3>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
            Qualified leads and sales can be sent back to Google Ads, so bidding learns from real outcomes and not only from form fills. Consent and privacy wording follows the data protection rules that apply to your business.
          </p>
        </div>
      </div>
    </Section>
  );
}
