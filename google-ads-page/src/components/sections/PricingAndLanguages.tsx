import { motion } from "framer-motion";
import { ArrowRight, Check, Languages, Search, PenLine, FileText, BarChart3 } from "lucide-react";
import { CardBadge, CARD, Section, SectionHead } from "../shared/SectionPrimitives";

/* Owner-supplied figures (2026-10-17): Google Ads management fee Rs 15,000 to Rs 60,000 a month.
   Ad spend is separate and is paid to Google from the client's own account. */

const card = CARD;

const FEE_ROWS: { what: string; amount: string; who: string; note: string }[] = [
  {
    what: "Digital Aura management fee",
    amount: "₹15,000 – ₹60,000 per month",
    who: "Paid to Digital Aura",
    note: "Plans, runs and improves your campaigns, sets up tracking and sends a monthly report. The exact fee is written in your quote.",
  },
  {
    what: "Your Google Ads budget",
    amount: "Your decision",
    who: "Paid to Google, from your own account",
    note: "The money Google charges for clicks. It is not part of our fee, and it never passes through us.",
  },
  {
    what: "GST",
    amount: "As applicable",
    who: "Added on the invoice",
    note: "Charged on the management fee as per Indian tax rules.",
  },
];

const LOWER = [
  "One service or one location",
  "One or two campaign types, such as Search only",
  "One language",
  "Tracking that is already in place",
];
const UPPER = [
  "Several services, branches or cities",
  "Search, Performance Max, Shopping and YouTube together",
  "Campaigns in more than one language",
  "New tracking, landing page work and a larger budget to manage",
];

export function FeeTable() {
  return (
    <Section id="management-fee" className="bg-white">
      <SectionHead
        eyebrow="Management fee"
        title="Google Ads management fee in Ahmedabad: ₹15,000 to ₹60,000 a month"
        lead="Our fee is separate from your ad budget. Where you land in the range depends on how much there is to manage, and you see the number in writing before you commit."
      />
      <div className="mx-auto max-w-5xl space-y-4 md:hidden">
        {FEE_ROWS.map((r, i) => (
          <div key={r.what} className={card}>
            <h3 className="font-display text-[17px] font-bold text-navy">{r.what}</h3>
            <p className={`mt-1 font-display text-[18px] font-extrabold ${i === 0 ? "text-primary" : "text-navy"}`}>{r.amount}</p>
            <p className="mt-2 text-[14.5px] font-semibold text-navy/90">{r.who}</p>
            <p className="mt-1 text-[14.5px] leading-relaxed text-muted-foreground">{r.note}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto hidden max-w-5xl overflow-x-auto rounded-2xl border border-border bg-white shadow-xs md:block">
        <table className="w-full min-w-[680px] border-collapse text-left text-[14.5px]">
          <caption className="sr-only">Google Ads costs in Ahmedabad: management fee, ad budget and GST</caption>
          <thead>
            <tr className="bg-surface-cream text-navy">
              <th scope="col" className="p-4 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">What you pay for</th>
              <th scope="col" className="p-4 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">Amount</th>
              <th scope="col" className="p-4 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">Who gets it</th>
              <th scope="col" className="p-4 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">What it covers</th>
            </tr>
          </thead>
          <tbody>
            {FEE_ROWS.map((r, i) => (
              <tr key={r.what} className="border-t border-border align-top">
                <th scope="row" className="p-4 font-display text-[15.5px] font-bold text-navy">{r.what}</th>
                <td className={`p-4 font-bold ${i === 0 ? "bg-primary/[0.06] text-navy" : "text-navy"}`}>{r.amount}</td>
                <td className="p-4 text-navy/90">{r.who}</td>
                <td className="p-4 text-muted-foreground">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pillar-cols-2 mx-auto mt-6 grid max-w-5xl gap-5 md:grid-cols-2">
        <div className={card}>
          <h3 className="font-display text-[17px] font-bold text-navy">Towards the lower end of the range</h3>
          <ul className="mt-3 space-y-2.5 text-[14.5px] text-muted-foreground">
            {LOWER.map((t) => (
              <li key={t} className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{t}</li>
            ))}
          </ul>
        </div>
        <div className={card}>
          <h3 className="font-display text-[17px] font-bold text-navy">Towards the upper end of the range</h3>
          <ul className="mt-3 space-y-2.5 text-[14.5px] text-muted-foreground">
            {UPPER.map((t) => (
              <li key={t} className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-center text-[14.5px] leading-relaxed text-muted-foreground">
        These fees are for businesses in Ahmedabad; campaigns for other cities or countries are quoted separately. We never promise a fixed return on ad spend. For a worked example of how a budget turns into enquiries, read{" "}
        <a className="font-semibold text-primary underline" href="/google-ads-pricing-ahmedabad/">how Google Ads pricing works</a>, or start with the{" "}
        <a className="inline-flex items-center gap-1 font-semibold text-primary underline" href="#audit-final">free audit <ArrowRight className="size-4" /></a>.
      </p>
    </Section>
  );
}

/* ---------- Languages we run ads in ---------- */

const LANGS = [
  { script: "English", name: "English", use: "Metros, B2B, export and professional services" },
  { script: "हिन्दी", name: "Hindi", use: "North and central India, and Hinglish searches everywhere" },
  { script: "ગુજરાતી", name: "Gujarati", use: "Ahmedabad, Surat, Vadodara, Rajkot and Gujarati communities abroad" },
  { script: "मराठी", name: "Marathi", use: "Pune, Mumbai, Nashik and Maharashtra" },
  { script: "தமிழ்", name: "Tamil", use: "Tamil Nadu and Tamil audiences overseas" },
  { script: "+ more", name: "Other languages", use: "Ask us. We add the language your customers use." },
];

const HOW = [
  { Icon: Search, t: "Keyword research in the language", d: "People search in Gujarati, Hindi and in Hinglish typed in English letters. We research the words your customers actually type, not a word-for-word translation." },
  { Icon: PenLine, t: "Ads written, not translated", d: "Headlines and descriptions are written in the language, with local phrases and offers, then checked by a native speaker before they go live." },
  { Icon: FileText, t: "A landing page that matches", d: "An ad in Gujarati that lands on an English-only page loses the visitor. We match the page, the form and the WhatsApp message to the language." },
  { Icon: BarChart3, t: "Reporting for each language", d: "Campaigns are kept separate by language, so your monthly report shows which language brings the cheaper enquiries." },
];

export function AdLanguages() {
  return (
    <Section id="ad-languages" className="bg-surface-cream">
      <SectionHead
        eyebrow="Languages"
        title="Google Ads in English, Hindi, Gujarati, Marathi, Tamil and more"
        lead="We run campaigns in the language your customers speak, so the ad, the keywords and the page all feel local."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LANGS.map((l, i) => (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className={card}
          >
            <div className="flex items-center gap-3">
              <CardBadge className="!w-auto min-w-10 px-3 text-[14px]">{l.script}</CardBadge>
              <h3 className="font-display text-[17px] font-bold text-navy">{l.name}</h3>
            </div>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{l.use}</p>
          </motion.div>
        ))}
      </div>
      <div className="pillar-cols-4 mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOW.map((h) => (
          <div key={h.t} className={card}>
            <CardBadge><h.Icon className="size-5" /></CardBadge>
            <h3 className="mt-3 font-display text-[16.5px] font-bold leading-snug text-navy">{h.t}</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{h.d}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-center text-[14.5px] leading-relaxed text-muted-foreground">
        <Languages className="mr-1.5 inline size-4 text-primary" />
        Google shows ads by the language your customer uses on Google, so we set the campaign language and the keywords together. Running more than one language adds work, which is why it can move your fee towards the upper end of the{" "}
        <a className="font-semibold text-primary underline" href="#management-fee">management fee range</a>.
        {" "}Also see <a className="font-semibold text-primary underline" href="/meta-ads-agency-ahmedabad/">Meta ads in regional languages</a>.
      </p>
    </Section>
  );
}

