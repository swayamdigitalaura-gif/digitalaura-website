import type { ExtraSection } from "@/components/LocalServicePage";

/**
 * Owner-supplied prices (2026-10-17), used on every page that talks about fees so the numbers never disagree.
 * SEO Basic 15k-25k, SEO Growth 25k-50k, SEO Advance 50k-1.5L, Google Ads and Meta Ads management fee 15k-60k.
 * All monthly, excluding GST. Ad spend is separate and is paid to Google or Meta from the client's own account.
 */

export const SEO_PLAN_ROWS: string[][] = [
  [
    "SEO Basic",
    "₹15,000 – ₹25,000 per month",
    "A clinic, shop or service business serving one city, with a small site.",
    "SEO audit and tracking set up. On-page fixes on key service pages. Google Business Profile set-up and upkeep. Local citations and review requests. Monthly report on calls and enquiries.",
  ],
  [
    "SEO Growth",
    "₹25,000 – ₹50,000 per month",
    "Businesses ready to compete for more services and areas.",
    "Everything in SEO Basic. New service and location pages every month. Link building from relevant, earned sources. Technical fixes and speed work. Conversion improvements on key pages. Monthly review call.",
  ],
  [
    "SEO Advance",
    "₹50,000 – ₹1,50,000 per month",
    "Large catalogues, several locations, export or multi-language projects, and crowded markets.",
    "Everything in SEO Growth. Category and product optimisation for online stores. A larger content and link programme. AI search (AEO and GEO) work on key pages. Multi-location or multi-language scope. A named lead and strategy reviews.",
  ],
];

export const seoPlansSection = (): ExtraSection => ({
  kind: "pricing",
  id: "seo-plans",
  eyebrow: "SEO plans",
  title: "SEO packages in Ahmedabad: ₹15,000 to ₹1,50,000 a month",
  subtext: "Three plans. Where you land inside a range depends on your site, competition, locations and how fast you want to move.",
  columns: ["Plan", "Monthly fee", "Best for", "What is included"],
  rows: SEO_PLAN_ROWS,
  footnote: "These prices are for businesses in Ahmedabad. Projects in other cities or countries are quoted separately. Fees are monthly and exclude GST. Your exact fee is set in a written quote after the free audit and lists the work it covers. No ranking is guaranteed on any plan. Multi-location, export and multi-language projects are scoped separately.",
});

const PLATFORM = {
  google: { name: "Google Ads", to: "Google", where: "your own Google Ads account" },
  meta: { name: "Meta Ads", to: "Meta", where: "your own Meta ad account" },
} as const;

export const adsFeeSection = (p: keyof typeof PLATFORM): ExtraSection => {
  const x = PLATFORM[p];
  return {
    kind: "pricing",
    id: "management-fee",
    eyebrow: "Management fee",
    title: `${x.name} management fee in Ahmedabad: ₹15,000 to ₹60,000 a month`,
    subtext: "Our fee is separate from your ad budget. Where you land in the range depends on how much there is to manage, and you see the number in writing before you commit.",
    columns: ["What you pay for", "Amount", "Who gets it", "What it covers"],
    rows: [
      ["Digital Aura management fee", "₹15,000 – ₹60,000 per month", "Digital Aura", "Plans, runs and improves your campaigns, sets up tracking and sends a monthly report. The exact fee is written in your quote."],
      [`Your ${x.name} budget`, "Your decision", `${x.to}, from ${x.where}`, `The money ${x.to} charges for ${p === "google" ? "clicks" : "delivery"}. It is not part of our fee.`],
      ["GST", "As applicable", "Added on the invoice", "Charged on the management fee as per Indian tax rules."],
    ],
    footnote: `These fees are for Ahmedabad businesses; campaigns for other cities or countries are quoted separately. Towards the lower end: one service or location, one or two campaign types, one language, tracking already in place. Towards the upper end: several services or cities, more campaign types, more than one language, new tracking and landing page work, and a larger budget to manage. We never promise a fixed return on ad spend.`,
  };
};

const LANG_CARDS = [
  { tag: "English", title: "English", desc: "Metros, B2B, export and professional services." },
  { tag: "हिन्दी", title: "Hindi", desc: "North and central India, and Hinglish searches everywhere." },
  { tag: "ગુજરાતી", title: "Gujarati", desc: "Ahmedabad, Surat, Vadodara, Rajkot and Gujarati communities abroad." },
  { tag: "मराठी", title: "Marathi", desc: "Pune, Mumbai, Nashik and the rest of Maharashtra." },
  { tag: "தமிழ்", title: "Tamil", desc: "Tamil Nadu and Tamil audiences overseas." },
  { tag: "+ more", title: "Other languages", desc: "Ask us. We add the language your customers use." },
];

export const adLanguagesSection = (p: keyof typeof PLATFORM): ExtraSection => ({
  kind: "cards",
  id: "ad-languages",
  eyebrow: "Languages",
  title: `${PLATFORM[p].name} in English, Hindi, Gujarati, Marathi, Tamil and more`,
  subtext:
    p === "google"
      ? "We run campaigns in the language your customers speak. Keywords, ad copy and the landing page are written in that language, not translated word for word, and each language is reported separately."
      : "We run campaigns in the language your customers speak. Ad text, image and video captions, lead form questions and the WhatsApp message are written in that language, and each language is reported separately.",
  items: LANG_CARDS,
  footnote: "Running more than one language adds work, so it can move your fee towards the upper end of the management fee range. See the management fee table for the figures.",
});
