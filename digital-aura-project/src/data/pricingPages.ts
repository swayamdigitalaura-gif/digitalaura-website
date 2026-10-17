import { SEO_PLAN_ROWS } from "@/data/pricingData";
import type { LeadFormConfig } from "@/components/PageLeadForm";

/**
 * Content for the three Ahmedabad pricing pages (SEO, Google Ads, Meta Ads). One template (components/PricingPage.tsx) renders
 * all three, so they always share the same section order, the same look and the same site header, footer, FAQ and "Find us" block.
 *
 * Prices are the owner's figures (2026-10-17), for Ahmedabad only, per month, excluding GST:
 *   SEO Basic 15k-25k, SEO Growth 25k-50k, SEO Advance 50k-1.5L, Google Ads and Meta Ads management fee 15k-60k.
 * Ad spend is separate and is paid to Google or Meta from the client's own account.
 *
 * Icon names are strings (resolved in the template) so this file can be imported by PageSEO without pulling in UI code.
 * Answers may contain [text](/path) links; schema strips them to plain text.
 */

export type PricingKey = "seo" | "gads" | "meta";
export type IconName =
  | "search" | "wrench" | "filetext" | "mappin" | "link" | "bot" | "chart" | "target" | "gauge" | "layers" | "languages"
  | "shield" | "key" | "receipt" | "calendar" | "users" | "megaphone" | "trending" | "clipboard" | "wallet" | "sparkles"
  | "pen" | "phone" | "stethoscope" | "factory" | "cart" | "clock" | "scale" | "globe";

export type Item = { icon: IconName; title: string; desc: string };
export type Step = { title: string; desc: string };
export type Faq = { q: string; a: string };
export type LinkCard = { title: string; desc: string; href: string; icon: IconName; tag?: string };
export type TableData = { caption: string; columns: string[]; rows: string[][]; featuredCol?: number };

export interface PricingPageConfig {
  key: PricingKey;
  path: string; // route without trailing slash
  /** Pillar page this page supports. Linked from the hero, the intro text, the explore block and the FAQ. */
  pillar: { href: string; label: string; short: string };
  meta: { title: string; description: string };
  breadcrumbLabel: string;
  eyebrow: string;
  h1: string;
  /** First paragraph: answers the price question straight away. */
  answer: string;
  updated: string; // ISO date
  glance: { title: string; rows: { label: string; value: string; note?: string }[]; foot: string };
  heroCta: string;
  stats: { value: string; label: string }[];
  prices: { eyebrow: string; title: string; sub: string; table: TableData; footnote: string; extra?: { title: string; left: { title: string; items: string[] }; right: { title: string; items: string[] } } };
  fit?: { eyebrow: string; title: string; sub: string; table: TableData };
  included: { eyebrow: string; title: string; sub: string; items: Item[]; paid: { title: string; items: string[] }; never: { title: string; items: string[] } };
  factors: { eyebrow: string; title: string; sub: string; items: Item[] };
  plan: { eyebrow: string; title: string; sub: string; kind: "timeline" | "calculators"; timeline?: Step[]; calculators?: { id: string; label: string; variant: "ads-budget" | "break-even" }[]; staged?: { title: string; steps: Step[] }; note?: string };
  compare: { eyebrow: string; title: string; sub: string; us: TableData; fees?: { title: string; items: Item[] }; options: TableData };
  reach: { eyebrow: string; title: string; sub: string; kind: "languages" | "industries"; cards: { tag?: string; title: string; desc: string; href?: string; icon?: IconName }[]; links?: { label: string; href: string }[]; note?: string };
  steps: { eyebrow: string; title: string; sub: string; items: Step[] };
  terms: { eyebrow: string; title: string; sub: string; items: Item[] };
  explore: { eyebrow: string; title: string; sub: string; pillarCard: LinkCard; cards: LinkCard[] };
  faqTitle: string;
  faqs: Faq[];
  leadForm: LeadFormConfig;
  cta: { heading: string; text: string; button: string; findUsLabel: string };
}

const UPDATED = "2026-10-17";

/** Shown in every "plan your numbers" or "what to expect" block, so the promise is the same on every page. */
const NO_GUARANTEE = "We never promise a ranking, a number of leads or a return on ad spend. Nobody can honestly promise one.";

/* ───────────────────────── SEO ───────────────────────── */

const seo: PricingPageConfig = {
  key: "seo",
  path: "/seo/pricing-ahmedabad",
  pillar: { href: "/seo-services-ahmedabad", label: "SEO Services in Ahmedabad", short: "SEO services in Ahmedabad" },
  meta: {
    title: "SEO Packages & Pricing in Ahmedabad (2026) | Digital Aura",
    description: "SEO packages in Ahmedabad from ₹15,000 to ₹1,50,000 a month plus GST: Basic, Growth and Advance plans, what each includes, contract terms and how to get a written quote after a free audit.",
  },
  breadcrumbLabel: "SEO Packages and Pricing",
  eyebrow: "SEO Pricing · Ahmedabad",
  h1: "SEO Packages and Pricing in Ahmedabad (2026)",
  answer:
    "SEO at Digital Aura costs ₹15,000 to ₹1,50,000 a month, plus GST: SEO Basic is ₹15,000 to ₹25,000, SEO Growth is ₹25,000 to ₹50,000 and SEO Advance is ₹50,000 to ₹1,50,000. Where you land depends on your website, your competition and how many services and areas you want to rank for. You get the exact fee in writing after a free audit. These prices are for businesses in Ahmedabad. For what the work involves, see our [SEO services in Ahmedabad](/seo-services-ahmedabad) page.",
  updated: UPDATED,
  glance: {
    title: "SEO fees at a glance",
    rows: [
      { label: "SEO Basic", value: "₹15,000 – ₹25,000", note: "One city, small site" },
      { label: "SEO Growth", value: "₹25,000 – ₹50,000", note: "More services and areas" },
      { label: "SEO Advance", value: "₹50,000 – ₹1,50,000", note: "Large, multi-location or crowded markets" },
    ],
    foot: "Per month, plus GST. For Ahmedabad businesses. Exact fee in writing after a free audit.",
  },
  heroCta: "Get a free audit and written quote",
  stats: [
    { value: "120+", label: "Clients served" },
    { value: "750+", label: "Projects delivered" },
    { value: "10+", label: "Years in digital marketing" },
    { value: "Free", label: "SEO audit before any quote" },
  ],
  prices: {
    eyebrow: "SEO plans",
    title: "SEO plans and monthly fees in Ahmedabad",
    sub: "Three plans. The range inside each plan is set by your site, your competition and the scope you need.",
    table: { caption: "SEO plans in Ahmedabad with monthly fee ranges, excluding GST", columns: ["Plan", "Monthly fee", "Best for", "What is included"], rows: SEO_PLAN_ROWS },
    footnote: "Prices are for businesses in Ahmedabad. Projects in other cities or countries are quoted separately. Fees are monthly and exclude GST. Your exact fee is written after the free audit and lists the work it covers. No ranking is guaranteed on any plan.",
  },
  fit: {
    eyebrow: "Which plan",
    title: "Which SEO plan fits your business?",
    sub: "A quick way to find where you probably sit. The free audit confirms it.",
    table: {
      caption: "Which SEO plan fits which kind of business",
      columns: ["Your business", "Likely plan", "Why"],
      featuredCol: 1,
      rows: [
        ["A clinic, dental practice or shop serving one area", "SEO Basic", "A small site and one city. Fix the basics, set up Google Business Profile and build local trust."],
        ["A service business with several services or areas", "SEO Growth", "Each service and area needs its own page and regular content to compete."],
        ["An online store, manufacturer, exporter or multi-branch business", "SEO Advance", "Large catalogues, several locations or a crowded market need deeper content, links and AI search work."],
        ["You are not sure", "Free audit first", "We review your site and tell you which plan, if any, is worth paying for."],
      ],
    },
  },
  included: {
    eyebrow: "What you get",
    title: "What is in your monthly SEO fee",
    sub: "Your written quote shows which of these apply to you, and how often.",
    items: [
      { icon: "wrench", title: "Audit and technical fixes", desc: "Crawling, indexing, speed, mobile usability, redirects and structured data." },
      { icon: "filetext", title: "On-page optimisation", desc: "Titles, headings, internal links and page content matched to what buyers search." },
      { icon: "pen", title: "Content", desc: "New pages and articles that answer real questions. The number per month is written into the quote." },
      { icon: "mappin", title: "Local SEO and Google Business Profile", desc: "Profile set-up and upkeep, local pages, citations and review requests." },
      { icon: "link", title: "Link building", desc: "Relevant, earned links. We do not buy links or use spam networks." },
      { icon: "bot", title: "AI search (AEO and GEO)", desc: "Answer-first content and schema so AI search tools can understand and cite your pages." },
      { icon: "chart", title: "Reporting", desc: "Rankings, traffic and, more importantly, calls and enquiries, with a call to explain what changed." },
    ],
    paid: { title: "Quoted separately if you need it", items: ["Ad spend for Google or Meta campaigns", "Paid third-party tools and licences", "Website development beyond SEO fixes", "Content packs beyond the agreed number", "Photography and video"] },
    never: { title: "Never part of our service", items: ["Buying links or using spam networks", "Guaranteed rankings or guaranteed leads", "Copying content from other websites"] },
  },
  factors: {
    eyebrow: "What decides your price",
    title: "What decides where you land in the range",
    sub: "Two agencies can both say \"20 keywords\" and mean very different amounts of work. We price the work, not the keyword count.",
    items: [
      { icon: "gauge", title: "How strong your competition is", desc: "A search with many established sites ranking needs more work than a quiet local one." },
      { icon: "wrench", title: "The health of your website", desc: "A site with technical problems needs fixing before content can do its job." },
      { icon: "layers", title: "Services and locations", desc: "More service lines and more areas mean more pages to build and optimise." },
      { icon: "pen", title: "Content needed", desc: "New service pages, location pages and articles are real work, scoped apart from fixes." },
      { icon: "languages", title: "Languages", desc: "Pages in Gujarati, Hindi or English each need their own keyword research and writing." },
      { icon: "clock", title: "How fast you want to move", desc: "More content, local work and link building in a month means a bigger scope." },
    ],
  },
  plan: {
    eyebrow: "What to expect",
    title: "What to expect, and when",
    sub: "SEO compounds over months. Anyone promising instant first-page rankings is not being straight with you.",
    kind: "timeline",
    timeline: [
      { title: "First weeks", desc: "Audit findings, tracking set up, and the highest-impact technical and page fixes started." },
      { title: "Around three months", desc: "Fixes and new pages are indexed. You can see early movement in impressions and rankings." },
      { title: "Six months and beyond", desc: "Content, links and authority build. Enquiries from search should grow if the plan is working." },
    ],
    note: "Timelines depend on competition and the condition of your site. We report on calls and enquiries, not only rankings. " + NO_GUARANTEE,
  },
  compare: {
    eyebrow: "Compare",
    title: "How our quote compares with a typical SEO quote",
    sub: "Use this list on any proposal you receive, ours included.",
    us: {
      caption: "Digital Aura SEO quote compared with a typical agency quote",
      columns: ["", "Digital Aura", "A typical quote"],
      featuredCol: 1,
      rows: [
        ["How it is priced", "By scope: pages, fixes, content and locations", "By number of keywords"],
        ["Contract", "Term and notice written in your proposal", "6 to 12 month lock-in, often not explained"],
        ["GST", "Stated in the proposal", "Often not mentioned"],
        ["What you get", "Named deliverables for each month", "Vague lines such as \"link building\" and \"reporting\""],
        ["Ownership", "Your site, Search Console, Analytics and Business Profile stay in your accounts", "Accounts and reports held by the agency"],
        ["Reporting", "Calls, forms and enquiries, with a call to explain", "Rankings only"],
        ["Promises", "None. Nobody can guarantee a ranking", "\"Page one in 90 days\""],
      ],
    },
    options: {
      caption: "SEO agency, freelancer or in-house",
      columns: ["", "Agency", "Freelancer", "In-house"],
      featuredCol: 1,
      rows: [
        ["Best when", "You want technical, content, local and reporting handled together", "Your site is small and the work is simple", "SEO is central to the business and you can hire and manage a specialist"],
        ["Coverage", "A team covers leave and changes", "One person, so leave can pause the work", "Depends on how many people you hire"],
        ["Watch out for", "Ask who will actually work on your site", "Ask who covers when they are away", "Hiring time, salary and tool costs"],
      ],
    },
  },
  reach: {
    eyebrow: "Plans for your industry",
    title: "SEO pricing for specific industries",
    sub: "Some businesses need a different approach. These pages explain how we scope them.",
    kind: "industries",
    cards: [
      { title: "Doctors and hospitals", desc: "Treatment and doctor pages, local listings and careful wording.", href: "/seo/doctors-hospitals-ahmedabad/", icon: "stethoscope", tag: "Healthcare" },
      { title: "Manufacturers and B2B", desc: "Product and specification pages and enquiry funnels for buyers.", href: "/seo/manufacturers-b2b-gujarat/", icon: "factory", tag: "B2B" },
      { title: "Online stores", desc: "Category and product pages, duplicate URLs from filters and product schema.", href: "/services/seo-content-marketing/ecommerce-seo/", icon: "cart", tag: "Ecommerce" },
      { title: "Local businesses", desc: "Google Business Profile, local pages and reviews for one-city businesses.", href: "/services/seo-content-marketing/local-seo/", icon: "mappin", tag: "Local" },
    ],
  },
  steps: {
    eyebrow: "How we quote",
    title: "How we build your SEO quote",
    sub: "Four steps from first conversation to a written scope.",
    items: [
      { title: "Free audit", desc: "We review your site, local presence and competitors. See the [free SEO audit](/seo/free-audit/)." },
      { title: "Goal and scope", desc: "We agree what success means (calls, forms, sales) and which pages, locations and fixes are needed." },
      { title: "Written quote", desc: "You receive the scope, monthly deliverables, what is excluded and the fee in writing." },
      { title: "Start and review", desc: "Work starts on the agreed plan, with regular reports and a review of what to do next." },
    ],
  },
  terms: {
    eyebrow: "Contract and billing",
    title: "Contract, billing and ownership in plain words",
    sub: "Exact terms are written into your proposal. Ask us about any of these before you decide.",
    items: [
      { icon: "calendar", title: "Minimum term and notice", desc: "We state the minimum period and how to end the agreement in the proposal, so there is no hidden lock-in." },
      { icon: "receipt", title: "GST and invoicing", desc: "Fees are shown excluding GST. The proposal states how GST applies and how you will be invoiced." },
      { icon: "key", title: "Who owns what", desc: "Your website, Google Business Profile, Search Console, Analytics and content stay in your accounts." },
      { icon: "wallet", title: "Add-ons and one-time work", desc: "A technical audit, extra content packs, link campaigns, schema, a site migration or an AEO and GEO project are quoted separately." },
    ],
  },
  explore: {
    eyebrow: "Keep exploring",
    title: "Where to go next",
    sub: "See what the work involves, check your site for free, or read how we price the other services.",
    pillarCard: { title: "SEO Services in Ahmedabad", desc: "Our main SEO page: what we do, how we work, results from Ahmedabad businesses and the team behind your account.", href: "/seo-services-ahmedabad", icon: "search", tag: "Main SEO page" },
    cards: [
      { title: "Free SEO audit", desc: "Enter your website and get a prioritised fix list across 14 areas.", href: "/seo/free-audit/", icon: "clipboard" },
      { title: "Google Ads pricing", desc: "Management fee, ad spend and GST explained.", href: "/google-ads-pricing-ahmedabad/", icon: "wallet" },
      { title: "Meta ads pricing", desc: "Facebook and Instagram ads fee and ad spend.", href: "/meta-ads-agency-ahmedabad/pricing/", icon: "megaphone" },
      { title: "SEO in 2026 guide", desc: "How SEO works now that AI answers sit above the links.", href: "/blog/seo-in-2026-ai-era/", icon: "trending" },
    ],
  },
  faqTitle: "SEO Pricing FAQs",
  faqs: [
    { q: "How much do SEO packages cost in Ahmedabad?", a: "In Ahmedabad, our SEO plans run from ₹15,000 to ₹1,50,000 a month plus GST: SEO Basic ₹15,000–₹25,000, SEO Growth ₹25,000–₹50,000 and SEO Advance ₹50,000–₹1,50,000. Where you land depends on your site, competition, locations and the content needed, and you receive the exact fee in writing after a free audit." },
    { q: "What is included in a monthly SEO package?", a: "Depending on your plan: technical fixes, on-page optimisation, content, local SEO and Google Business Profile, link building, AI search work and reporting. Your quote lists what applies to you." },
    { q: "Do you charge per keyword?", a: "No. Keyword counts do not show how much work is involved, so we scope by pages, fixes, content and locations instead." },
    { q: "Is GST extra?", a: "Yes. The fees on this page exclude GST. Your proposal states how GST applies and how you will be invoiced." },
    { q: "What is the minimum contract?", a: "The minimum term and notice period are written in your proposal. Ask us before you sign and we will explain them in plain words." },
    { q: "Can I upgrade or downgrade later?", a: "Yes. The plan can change as your goals change, and the change is agreed in writing." },
    { q: "Do the plans include content writing?", a: "Content is part of most plans, but the number of pieces is limited and written into the quote. Extra content is quoted separately." },
    { q: "Is AI search (AEO and GEO) included?", a: "We improve answer-first content and structured data as part of the work. Nobody can guarantee an AI citation, so we focus on what you can control." },
    { q: "Why do SEO prices vary so much between agencies?", a: "Scope, experience, content volume, link quality and contract length all differ. A low price often means fewer deliverables or work that is hard to verify. Compare what is included, not only the number." },
    { q: "Do these prices apply outside Ahmedabad?", a: "The prices on this page are for businesses in Ahmedabad. Projects in other cities or countries are scoped and quoted separately. Read about our [SEO services in Ahmedabad](/seo-services-ahmedabad) or ask for a quote." },
    { q: "Do you offer a free audit before I pay anything?", a: "Yes. The [free SEO audit](/seo/free-audit/) has no obligation. We review your site and tell you what is worth fixing first and what it would take." },
  ],
  leadForm: {
    id: "audit-form", formName: "seo-quote", service: "SEO quote", heading: "Get a free audit and a written quote",
    text: "Tell us about your business. We will audit your site and send a scoped, written SEO proposal.", website: "optional",
    notesLabel: "What do you want SEO to achieve? (optional)", notesPlaceholder: "For example: more calls, appointments or product enquiries",
    submitLabel: "Get My Audit and Quote", successText: "Thank you. We will review your details and reply by email.",
  },
  cta: { heading: "Get a free audit and a written SEO quote", text: "Tell us about your business and we will send an audit and a scoped, written proposal with the fee next to the work it covers.", button: "Get my audit and quote", findUsLabel: "Get a free SEO audit and quote" },
};

/* ───────────────────────── Google Ads ───────────────────────── */

const ADS_FEE_COLUMNS = ["What you pay for", "Amount", "Who gets it", "What it covers"];

const gads: PricingPageConfig = {
  key: "gads",
  path: "/google-ads-pricing-ahmedabad",
  pillar: { href: "/google-ads-agency-ahmedabad", label: "Google Ads Agency in Ahmedabad", short: "Google Ads agency in Ahmedabad" },
  meta: {
    title: "Google Ads Pricing in Ahmedabad (2026): Fees & Ad Spend | Digital Aura",
    description: "Google Ads management in Ahmedabad costs ₹15,000 to ₹60,000 a month plus GST, with ad spend paid to Google separately. See what the fee covers, the budget calculator and how to compare quotes.",
  },
  breadcrumbLabel: "Google Ads Pricing",
  eyebrow: "Google Ads Pricing · Ahmedabad",
  h1: "Google Ads Pricing in Ahmedabad: Management Fee, Ad Spend and GST (2026)",
  answer:
    "Google Ads cost has three parts: your ad spend, which is paid to Google; our management fee of ₹15,000 to ₹60,000 a month; and GST. You decide the ad spend. The fee depends on how much there is to manage and is written in your quote before you commit. These prices are for businesses in Ahmedabad. To see what the work covers, read about our [Google Ads agency in Ahmedabad](/google-ads-agency-ahmedabad).",
  updated: UPDATED,
  glance: {
    title: "Google Ads costs at a glance",
    rows: [
      { label: "Management fee", value: "₹15,000 – ₹60,000", note: "Per month, to Digital Aura" },
      { label: "Ad spend", value: "Your decision", note: "Paid to Google from your own account" },
      { label: "GST", value: "As applicable", note: "On the management fee" },
    ],
    foot: "For Ahmedabad businesses. Exact fee in writing after a free audit.",
  },
  heroCta: "Get a written Google Ads quote",
  stats: [
    { value: "120+", label: "Clients served" },
    { value: "750+", label: "Projects delivered" },
    { value: "10+", label: "Years in digital marketing" },
    { value: "Free", label: "Google Ads audit" },
  ],
  prices: {
    eyebrow: "Management fee",
    title: "Google Ads management fee: ₹15,000 to ₹60,000 a month",
    sub: "Our fee is separate from your ad budget. Where you land in the range depends on how much there is to manage, and you see the number in writing before you commit.",
    table: {
      caption: "Google Ads costs in Ahmedabad: management fee, ad budget and GST",
      columns: ADS_FEE_COLUMNS,
      featuredCol: 1,
      rows: [
        ["Digital Aura management fee", "₹15,000 – ₹60,000 per month", "Paid to Digital Aura", "Plans, runs and improves your campaigns, sets up tracking and sends a monthly report. The exact fee is written in your quote."],
        ["Your Google Ads budget", "Your decision", "Paid to Google, from your own account", "The money Google charges for clicks. It is not part of our fee."],
        ["GST", "As applicable", "Added on the invoice", "Charged on the management fee as per Indian tax rules."],
      ],
    },
    footnote: "These fees are for businesses in Ahmedabad; campaigns for other cities or countries are quoted separately. " + NO_GUARANTEE,
    extra: {
      title: "Where you land in the range",
      left: { title: "Towards the lower end", items: ["One service or one location", "One or two campaign types, such as Search only", "One language", "Tracking that is already in place"] },
      right: { title: "Towards the upper end", items: ["Several services, branches or cities", "Search, Performance Max, Shopping and YouTube together", "Campaigns in more than one language", "New tracking, landing page work and a larger budget to manage"] },
    },
  },
  included: {
    eyebrow: "What you get",
    title: "What your management fee covers",
    sub: "The fee pays for the work. It never includes the money Google charges for clicks.",
    items: [
      { icon: "target", title: "Strategy and set-up", desc: "Campaign structure, keywords, ads and location targeting built around your services and areas." },
      { icon: "phone", title: "Conversion tracking", desc: "Form submissions, click-to-call, calls from ads and WhatsApp clicks counted as leads and tied to the keyword." },
      { icon: "trending", title: "Ongoing optimisation", desc: "Search terms, bids, budgets and ads reviewed and improved month after month." },
      { icon: "filetext", title: "Landing page advice", desc: "We show where visitors drop off and suggest page changes so more clicks become enquiries." },
      { icon: "chart", title: "Monthly reporting", desc: "A report on enquiries and cost per enquiry, not only clicks, with a call to explain it." },
      { icon: "key", title: "Account ownership", desc: "Campaigns run inside your own Google Ads and Analytics accounts, so everything stays yours." },
    ],
    paid: { title: "Paid separately", items: ["Your ad spend, paid to Google", "GST on the fee", "A new landing page or website build, if you need one", "A call-tracking tool subscription, if you want one"] },
    never: { title: "Never part of our service", items: ["Guaranteed leads or a fixed return on ad spend", "Ad accounts you cannot access", "Hiding the fee inside your ad spend"] },
  },
  factors: {
    eyebrow: "What decides your cost",
    title: "What pushes Google Ads cost up or down",
    sub: "Your cost per click and your management fee both move with these six things.",
    items: [
      { icon: "gauge", title: "Competition and season", desc: "Festive and wedding seasons and crowded categories raise the price of a click." },
      { icon: "sparkles", title: "Quality Score and relevance", desc: "Ads and pages that match what people search earn cheaper clicks." },
      { icon: "filetext", title: "Landing page", desc: "A page that loads fast and asks for the enquiry clearly turns more clicks into leads." },
      { icon: "phone", title: "Tracking and bidding", desc: "When Google can see which clicks became leads, it can find more of them." },
      { icon: "languages", title: "Languages", desc: "Each language needs its own keywords, ads and page, which adds work to the fee." },
      { icon: "clock", title: "Your response speed", desc: "Leads that get a quick call or WhatsApp reply are worth more than the same lead answered late." },
    ],
  },
  plan: {
    eyebrow: "Plan your budget",
    title: "Work out your ad budget before you spend it",
    sub: "Two free tools: one to plan a monthly budget, one to find the most you can pay for each enquiry before ads lose money.",
    kind: "calculators",
    calculators: [
      { id: "budget", label: "Budget calculator", variant: "ads-budget" },
      { id: "break-even", label: "Break-even test", variant: "break-even" },
    ],
    staged: {
      title: "How a budget grows: test, learn, scale",
      steps: [
        { title: "Test", desc: "A modest budget on your best services to collect real data." },
        { title: "Learn", desc: "Read which searches, ads and pages bring enquiries, and cut the rest." },
        { title: "Scale", desc: "Raise the budget on what works, in steps you can afford." },
        { title: "Decide", desc: "Keep, change or stop, based on cost per enquiry against what a customer is worth." },
      ],
    },
    note: NO_GUARANTEE,
  },
  compare: {
    eyebrow: "Compare",
    title: "How our quote compares with a typical Google Ads quote",
    sub: "Use this list on any proposal you receive, ours included.",
    us: {
      caption: "Digital Aura Google Ads quote compared with a typical agency quote",
      columns: ["", "Digital Aura", "A typical quote"],
      featuredCol: 1,
      rows: [
        ["Fee and ad spend", "Written separately, so you see what reaches Google", "Mixed into one number"],
        ["Contract", "Month-to-month with a 15-day cancellation notice", "6 to 12 month lock-in"],
        ["Tracking", "Calls, WhatsApp and forms counted as leads", "Extra, or missing"],
        ["Ad account", "Your own Google Ads account", "Run in the agency's account"],
        ["Reporting", "Enquiries and cost per enquiry", "Clicks and impressions"],
        ["Promises", "None. Nobody can guarantee ROAS", "\"Guaranteed leads\""],
      ],
    },
    fees: {
      title: "Common fee models",
      items: [
        { icon: "wallet", title: "Flat monthly fee", desc: "The same fee each month. Easy to plan, and it does not grow just because you spend more." },
        { icon: "scale", title: "Percentage of ad spend", desc: "The agency earns more when you spend more, whether or not it works. Ask for a cap." },
        { icon: "layers", title: "Hybrid", desc: "A smaller flat fee plus a share of spend above a limit." },
        { icon: "target", title: "Performance-based", desc: "Paid per lead or sale. Works only when leads can be counted cleanly." },
      ],
    },
    options: {
      caption: "Google Ads agency, freelancer or in-house",
      columns: ["", "Agency", "Freelancer", "In-house"],
      featuredCol: 1,
      rows: [
        ["Best when", "You want strategy, tracking, landing pages and reporting handled together", "Budget is small and the account is simple", "Ads are central to the business and you can hire and manage a specialist"],
        ["Coverage", "A team covers holidays, leave and platform changes", "One person, so leave or illness can pause optimisation", "Depends on how many people you hire"],
        ["Watch out for", "Ask who exactly will run your account", "Ask who covers when they are away", "Hiring time, salary and tool costs"],
      ],
    },
  },
  reach: {
    eyebrow: "Languages and industries",
    title: "Google Ads in English, Hindi, Gujarati, Marathi, Tamil and more",
    sub: "We run campaigns in the language your customers speak. Keywords, ad copy and the landing page are written in that language, not translated word for word, and each language is reported separately.",
    kind: "languages",
    cards: [
      { tag: "English", title: "English", desc: "Metros, B2B, export and professional services." },
      { tag: "हिन्दी", title: "Hindi", desc: "North and central India, and Hinglish searches everywhere." },
      { tag: "ગુજરાતી", title: "Gujarati", desc: "Ahmedabad, Surat, Vadodara, Rajkot and Gujarati communities abroad." },
      { tag: "मराठी", title: "Marathi", desc: "Pune, Mumbai, Nashik and the rest of Maharashtra." },
      { tag: "தமிழ்", title: "Tamil", desc: "Tamil Nadu and Tamil audiences overseas." },
      { tag: "+ more", title: "Other languages", desc: "Ask us. We add the language your customers use." },
    ],
    links: [
      { label: "Google Ads for doctors", href: "/google-ads-for-doctors-ahmedabad/" },
      { label: "Google Ads for dentists", href: "/google-ads-for-dentists-ahmedabad/" },
      { label: "Google Ads for IVF clinics", href: "/google-ads-for-ivf-clinics-ahmedabad/" },
    ],
    note: "Google shows ads by the language your customer uses on Google, so we set the campaign language and the keywords together. More than one language adds work, which can move your fee towards the upper end of the range.",
  },
  steps: {
    eyebrow: "How we quote",
    title: "How we quote Google Ads management",
    sub: "Four steps, in writing.",
    items: [
      { title: "Goal and market", desc: "We learn what a customer is worth to you and what you want from the campaign." },
      { title: "Account or website review", desc: "For an existing account we run a read-only [Google Ads audit](/google-ads-audit-ahmedabad/). For a new one we review your site and market." },
      { title: "Budget and plan", desc: "We suggest a test ad spend, a campaign plan and tracking set-up." },
      { title: "Written quote", desc: "You receive the management fee, what it covers, the contract terms and how GST applies." },
    ],
  },
  terms: {
    eyebrow: "Contract and reporting",
    title: "Contracts, ownership and reporting included in the fee",
    sub: "Exact terms are written into your proposal before you sign.",
    items: [
      { icon: "calendar", title: "Contract and notice", desc: "Month-to-month with a 15-day cancellation notice. You are not locked in." },
      { icon: "key", title: "Account ownership", desc: "We run campaigns inside your own Google Ads and Analytics accounts. Everything stays yours if you leave." },
      { icon: "wallet", title: "Ad spend paid to Google", desc: "Your ad budget goes to Google, and you can see it in your own account." },
      { icon: "phone", title: "Conversion tracking", desc: "Calls, WhatsApp clicks and form leads are counted from day one." },
      { icon: "chart", title: "Monthly report", desc: "Enquiries, cost per enquiry and what we will change next, explained on a call." },
      { icon: "receipt", title: "GST and invoicing", desc: "The proposal states how GST applies to our fee and how you will be invoiced." },
    ],
  },
  explore: {
    eyebrow: "Keep exploring",
    title: "Where to go next",
    sub: "See what the work involves, check your account for free, or read how we price the other services.",
    pillarCard: { title: "Google Ads Agency in Ahmedabad", desc: "Our main Google Ads page: what we manage, how we work, results from Ahmedabad businesses and the team behind your account.", href: "/google-ads-agency-ahmedabad", icon: "target", tag: "Main Google Ads page" },
    cards: [
      { title: "Free Google Ads audit", desc: "A read-only review of your account and where budget leaks.", href: "/google-ads-audit-ahmedabad/", icon: "clipboard" },
      { title: "SEO pricing", desc: "SEO Basic, Growth and Advance plans for Ahmedabad.", href: "/seo/pricing-ahmedabad/", icon: "wallet" },
      { title: "Meta ads pricing", desc: "Facebook and Instagram ads fee and ad spend.", href: "/meta-ads-agency-ahmedabad/pricing/", icon: "megaphone" },
      { title: "Google Ads strategy checklist", desc: "A step-by-step review to run before you spend more.", href: "/blog/google-ads-strategy-checklist-2026/", icon: "filetext" },
    ],
  },
  faqTitle: "Google Ads Pricing FAQs",
  faqs: [
    { q: "How much does Google Ads cost per month in Ahmedabad?", a: "Total cost is your ad spend plus the management fee plus GST. You choose the ad spend. For Ahmedabad businesses our management fee is ₹15,000 to ₹60,000 per month, written in a quote after we review your goals and account." },
    { q: "How much does a Google Ads agency in Ahmedabad charge?", a: "Agencies use flat fees, a percentage of ad spend, or a mix. For Ahmedabad businesses our management fee is ₹15,000 to ₹60,000 per month plus GST, written in your quote and always kept separate from your ad spend, which you pay to Google from your own account." },
    { q: "What is the difference between ad spend and management fee?", a: "Ad spend is paid to Google for clicks. The management fee is paid to the agency for strategy, set-up, optimisation, tracking and reporting." },
    { q: "Is GST charged on Google Ads and on agency fees?", a: "Tax treatment can differ between Google's invoices and agency fees, so please confirm with your accountant. The fees on this page exclude GST, and our proposal states how GST applies to our fee." },
    { q: "Can I run Google Ads with a small monthly budget?", a: "You can, but a very small budget limits how much data the account gathers and how quickly it can improve. We advise honestly on what is realistic, and tell you when a freelancer would suit you better." },
    { q: "Do you take a percentage of my ad spend?", a: "Our management fee is quoted in rupees per month, not as a share of your ad spend. It is stated in your proposal and kept separate from your ad spend, so you always know what goes to Google." },
    { q: "Is there a contract or lock-in?", a: "No long lock-in. We work month-to-month with a 15-day cancellation notice, written into your proposal." },
    { q: "How do I know how many leads my budget will produce?", a: "No one can promise it. We estimate from click costs and your website's conversion rate, then refine after the first weeks of data. Use the break-even calculator on this page to find the most you can pay per enquiry." },
    { q: "Can you run Google Ads in Gujarati, Hindi, Marathi or Tamil?", a: "Yes. We write and run Google Ads in English, Hindi, Gujarati, Marathi, Tamil and other languages, with keyword research, ad copy and landing pages in the same language." },
    { q: "Do these prices apply outside Ahmedabad?", a: "The prices on this page are for businesses in Ahmedabad. Campaigns for other cities or countries are quoted separately. See our [Google Ads agency in Ahmedabad](/google-ads-agency-ahmedabad) page for how we work." },
    { q: "Do you offer a free estimate or audit before I pay anything?", a: "Yes. We offer a free [Google Ads audit](/google-ads-audit-ahmedabad/) and a written quote with no obligation." },
  ],
  leadForm: {
    id: "audit-form", formName: "google-ads-quote", service: "Google Ads quote", heading: "Get a written Google Ads quote",
    text: "Tell us your business, goal and rough budget. We will send a clear, written quote.", website: "optional",
    notesLabel: "Monthly ad spend and goal (optional)", submitLabel: "Get My Google Ads Quote", successText: "Thank you. We will review your details and reply by email.",
  },
  cta: { heading: "Get a written Google Ads quote", text: "Tell us about your business, goal and rough budget. We will send a clear quote with the fee kept separate from your ad spend.", button: "Get my Google Ads quote", findUsLabel: "Get a free Google Ads audit and quote" },
};

/* ───────────────────────── Meta Ads ───────────────────────── */

const meta: PricingPageConfig = {
  key: "meta",
  path: "/meta-ads-agency-ahmedabad/pricing",
  pillar: { href: "/meta-ads-agency-ahmedabad/", label: "Meta Ads Agency in Ahmedabad", short: "Meta ads agency in Ahmedabad" },
  meta: {
    title: "Meta Ads Pricing in Ahmedabad (2026): Fees & Ad Spend | Digital Aura",
    description: "Meta (Facebook and Instagram) ads management in Ahmedabad costs ₹15,000 to ₹60,000 a month plus GST, with ad spend paid to Meta separately. See what is included, how to plan your budget and compare quotes.",
  },
  breadcrumbLabel: "Meta Ads Pricing",
  eyebrow: "Meta Ads Pricing · Ahmedabad",
  h1: "Meta Ads Pricing in Ahmedabad: Management Fee, Ad Spend and GST (2026)",
  answer:
    "Meta ads cost has two budgets: our management fee of ₹15,000 to ₹60,000 a month, plus GST, and your ad spend, which you pay to Meta from your own ad account. The fee depends on the number of campaigns, how much creative you need, the languages and the tracking, and it is written in your quote before you commit. These prices are for businesses in Ahmedabad. To see what the work covers, read about our [Meta ads agency in Ahmedabad](/meta-ads-agency-ahmedabad/).",
  updated: UPDATED,
  glance: {
    title: "Meta ads costs at a glance",
    rows: [
      { label: "Management fee", value: "₹15,000 – ₹60,000", note: "Per month, to Digital Aura" },
      { label: "Ad spend", value: "Your decision", note: "Paid to Meta from your own ad account" },
      { label: "GST", value: "As applicable", note: "On the management fee" },
    ],
    foot: "For Ahmedabad businesses. Exact fee in writing after a goal call.",
  },
  heroCta: "Get a fixed Meta ads quote",
  stats: [
    { value: "120+", label: "Clients served" },
    { value: "750+", label: "Projects delivered" },
    { value: "10+", label: "Years in digital marketing" },
    { value: "Free", label: "Meta ads account review" },
  ],
  prices: {
    eyebrow: "Management fee",
    title: "Meta ads management fee: ₹15,000 to ₹60,000 a month",
    sub: "Our fee is separate from your ad budget. Where you land in the range depends on how much there is to manage, and you see the number in writing before you commit.",
    table: {
      caption: "Meta ads costs in Ahmedabad: management fee, ad budget and GST",
      columns: ADS_FEE_COLUMNS,
      featuredCol: 1,
      rows: [
        ["Digital Aura management fee", "₹15,000 – ₹60,000 per month", "Paid to Digital Aura", "Plans, runs and improves your campaigns, sets up tracking and sends a monthly report. The exact fee is written in your quote."],
        ["Your Meta Ads budget", "Your decision", "Paid to Meta, from your own Meta ad account", "The money Meta charges for delivery. It is not part of our fee."],
        ["GST", "As applicable", "Added on the invoice", "Charged on the management fee as per Indian tax rules."],
      ],
    },
    footnote: "These fees are for businesses in Ahmedabad; campaigns for other cities or countries are quoted separately. " + NO_GUARANTEE,
    extra: {
      title: "Where you land in the range",
      left: { title: "Towards the lower end", items: ["One offer or one location", "One or two campaign types", "One language", "Tracking and lead handling already in place"] },
      right: { title: "Towards the upper end", items: ["Several offers, branches or cities", "Lead ads, click-to-WhatsApp and retargeting together", "Campaigns in more than one language", "A lot of new creative every month, and a larger budget to manage"] },
    },
  },
  included: {
    eyebrow: "What you get",
    title: "What our Meta ads fee includes",
    sub: "The fee pays for the work. It never includes the money Meta charges for delivery.",
    items: [
      { icon: "clipboard", title: "Strategy and audit", desc: "Your goal, audience and offer reviewed, and your existing account checked if you have one." },
      { icon: "phone", title: "Tracking set-up", desc: "Pixel, conversions and lead forms or WhatsApp set up, and a check that every lead reaches you." },
      { icon: "megaphone", title: "Campaign build and testing", desc: "Audiences, placements and ad variations built and tested against your real cost per lead." },
      { icon: "sparkles", title: "Creative direction", desc: "Briefs, copy and tests for the images and videos that carry the campaign." },
      { icon: "trending", title: "Optimisation", desc: "Budgets and ads reviewed through the month so spend follows the leads that matter." },
      { icon: "chart", title: "Reporting", desc: "A monthly report on leads and cost per lead, with a call to explain what to change." },
    ],
    paid: { title: "Paid separately", items: ["Your ad spend, paid to Meta", "GST on the fee", "Large video or photo production, if you want it", "Social media management, which is a separate service"] },
    never: { title: "Never part of our service", items: ["Guaranteed leads or ROAS", "Ad accounts you cannot access", "Claims that break Meta's ad policies"] },
  },
  factors: {
    eyebrow: "What decides your cost",
    title: "What decides your Meta ads cost",
    sub: "Creative is the cost that keeps coming back, because ads wear out and need replacing.",
    items: [
      { icon: "layers", title: "Campaigns and formats", desc: "Lead ads, click-to-WhatsApp, Reels and retargeting each need their own set-up." },
      { icon: "sparkles", title: "Creative volume", desc: "More new images and videos each month means more work, and fresher ads." },
      { icon: "languages", title: "Languages", desc: "Ad text, video captions and lead form questions are written for each language." },
      { icon: "phone", title: "Tracking and lead handling", desc: "Pixel, forms and WhatsApp follow-up decide whether leads are counted and answered." },
      { icon: "users", title: "Audience and category", desc: "Healthcare, real estate and education have different audience sizes and ad rules." },
      { icon: "wallet", title: "Size of the budget", desc: "A larger ad budget needs more testing, checking and reporting." },
    ],
  },
  plan: {
    eyebrow: "Plan your budget",
    title: "Work out what you can pay for a lead",
    sub: "A free break-even test shows the most you can pay per lead before Meta ads start losing money, and a simple staged plan shows how a budget usually grows.",
    kind: "calculators",
    calculators: [{ id: "break-even", label: "Break-even test", variant: "break-even" }],
    staged: {
      title: "How a Meta ads budget is usually staged",
      steps: [
        { title: "Set up and test", desc: "A modest budget to test audiences and creative." },
        { title: "Read the early signals", desc: "Look at lead quality and cost, not only likes and reach." },
        { title: "Back what works", desc: "Move spend to the audiences and ads that bring good leads." },
        { title: "Scale with care", desc: "Raise the budget in steps, watching cost per lead." },
      ],
    },
    note: NO_GUARANTEE,
  },
  compare: {
    eyebrow: "Compare",
    title: "How our quote compares with a typical Meta ads quote",
    sub: "Use this list on any proposal you receive, ours included.",
    us: {
      caption: "Digital Aura Meta ads quote compared with a typical agency quote",
      columns: ["", "Digital Aura", "A typical quote"],
      featuredCol: 1,
      rows: [
        ["Fee and ad spend", "Written separately, so you see what reaches Meta", "Mixed into one number"],
        ["What the fee covers", "Strategy, tracking, testing, creative direction and reporting, listed", "Vague \"management\""],
        ["Contract", "Term and notice written in your proposal", "Long lock-in, not explained"],
        ["Ad account", "Your own Meta ad account", "Run in the agency's account"],
        ["Reporting", "Leads and cost per lead", "Reach, likes and clicks"],
        ["Promises", "None. Nobody can guarantee leads or ROAS", "\"Guaranteed leads\""],
      ],
    },
    fees: {
      title: "Meta ads pricing and social media management",
      items: [
        { icon: "megaphone", title: "Paid Meta ads", desc: "Facebook and Instagram campaigns built to bring leads, covered by the fee on this page." },
        { icon: "users", title: "Organic social media", desc: "Posts and Reels for your own pages. It is a [separate service](/social-media-marketing-agency-ahmedabad/) with its own scope and quote." },
        { icon: "layers", title: "Both together", desc: "Many clients combine them, so organic content supports the paid campaigns." },
      ],
    },
    options: {
      caption: "Meta ads agency, freelancer or in-house",
      columns: ["", "Agency", "Freelancer", "In-house"],
      featuredCol: 1,
      rows: [
        ["Best when", "You want strategy, creative direction, tracking and reporting together", "Budget is small and the account is simple", "Ads are central to the business and you can hire and manage a specialist"],
        ["Coverage", "A team covers leave and platform changes", "One person, so leave can pause optimisation", "Depends on how many people you hire"],
        ["Watch out for", "Ask who will run your account", "Ask who covers when they are away", "Hiring time, salary and tool costs"],
      ],
    },
  },
  reach: {
    eyebrow: "Languages and industries",
    title: "Meta ads in English, Hindi, Gujarati, Marathi, Tamil and more",
    sub: "We run campaigns in the language your customers speak. Ad text, image and video captions, lead form questions and the WhatsApp message are written in that language, and each language is reported separately.",
    kind: "languages",
    cards: [
      { tag: "English", title: "English", desc: "Metros, B2B, export and professional services." },
      { tag: "हिन्दी", title: "Hindi", desc: "North and central India, and Hinglish searches everywhere." },
      { tag: "ગુજરાતી", title: "Gujarati", desc: "Ahmedabad, Surat, Vadodara, Rajkot and Gujarati communities abroad." },
      { tag: "मराठी", title: "Marathi", desc: "Pune, Mumbai, Nashik and the rest of Maharashtra." },
      { tag: "தமிழ்", title: "Tamil", desc: "Tamil Nadu and Tamil audiences overseas." },
      { tag: "+ more", title: "Other languages", desc: "Ask us. We add the language your customers use." },
    ],
    links: [
      { label: "Meta ads for clinics and doctors", href: "/meta-ads-agency-ahmedabad/clinics-doctors/" },
      { label: "Meta ads for real estate", href: "/meta-ads-agency-ahmedabad/real-estate/" },
      { label: "Meta ads for ecommerce", href: "/meta-ads-agency-ahmedabad/ecommerce/" },
      { label: "Meta ads for education and coaching", href: "/meta-ads-agency-ahmedabad/education-coaching/" },
    ],
    note: "More than one language adds work, so it can move your fee towards the upper end of the range.",
  },
  steps: {
    eyebrow: "How we quote",
    title: "How we quote Meta ads",
    sub: "Four steps, in writing.",
    items: [
      { title: "Goal call", desc: "We learn your offer, your audience and what a lead is worth to you." },
      { title: "Account and tracking check", desc: "We review your existing ad account, pixel and lead handling, or plan them from scratch." },
      { title: "Plan and budget", desc: "We suggest a test ad spend, the campaign types and the creative needed." },
      { title: "Written quote", desc: "You receive the management fee, what it covers, the contract terms and how GST applies." },
    ],
  },
  terms: {
    eyebrow: "Contract and reporting",
    title: "Contract terms, reporting and ownership",
    sub: "Exact terms are written into your proposal before you sign.",
    items: [
      { icon: "calendar", title: "Term and notice", desc: "The minimum period and how to end the agreement are stated in your proposal." },
      { icon: "chart", title: "Reporting", desc: "Leads, cost per lead and what we will change next, explained on a call each month." },
      { icon: "key", title: "Ownership", desc: "Campaigns run in your own Meta ad account, so the pixel, audiences and history stay yours." },
      { icon: "wallet", title: "Ad spend paid to Meta", desc: "Your ad budget goes to Meta from your own account, and you can see every rupee." },
      { icon: "sparkles", title: "Creative and production", desc: "Creative direction is part of the fee. Large video or photo shoots are quoted separately." },
      { icon: "receipt", title: "GST and invoicing", desc: "The proposal states how GST applies to our fee and how you will be invoiced." },
    ],
  },
  explore: {
    eyebrow: "Keep exploring",
    title: "Where to go next",
    sub: "See what the work involves, get a free account review, or read how we price the other services.",
    pillarCard: { title: "Meta Ads Agency in Ahmedabad", desc: "Our main Meta ads page: what we run, how we work, results from Ahmedabad businesses and the team behind your account.", href: "/meta-ads-agency-ahmedabad/", icon: "megaphone", tag: "Main Meta ads page" },
    cards: [
      { title: "Meta ads for clinics and doctors", desc: "Policy-aware campaigns with WhatsApp booking.", href: "/meta-ads-agency-ahmedabad/clinics-doctors/", icon: "stethoscope" },
      { title: "Google Ads pricing", desc: "Management fee, ad spend and GST explained.", href: "/google-ads-pricing-ahmedabad/", icon: "wallet" },
      { title: "SEO pricing", desc: "SEO Basic, Growth and Advance plans for Ahmedabad.", href: "/seo/pricing-ahmedabad/", icon: "search" },
      { title: "Meta lead gen ads guide", desc: "What top advertisers actually do to get better leads.", href: "/blog/meta-lead-gen-ads-2026/", icon: "filetext" },
    ],
  },
  faqTitle: "Meta Ads Pricing FAQs",
  faqs: [
    { q: "How much does a Meta ads agency charge in Ahmedabad?", a: "For Ahmedabad businesses, our Meta ads management fee is ₹15,000 to ₹60,000 per month plus GST, depending on scope: the number of campaigns, creative volume, languages and tracking. We give the exact fee in a written quote after a goal call and keep it separate from your ad spend, which you pay to Meta from your own ad account." },
    { q: "Is ad spend included in your fee?", a: "No. Ad spend is paid to Meta from your own ad account. Our fee covers the work." },
    { q: "What is the minimum ad budget for Meta ads?", a: "It depends on your goal and market. A very small budget limits testing and learning. We advise honestly and suggest a starting test budget." },
    { q: "Do prices include GST?", a: "No. The fees on this page exclude GST. The proposal states how GST applies to our fee and how you will be invoiced." },
    { q: "Do you charge a setup fee?", a: "Any set-up fee is stated in your written proposal before you decide." },
    { q: "Is there a lock-in contract?", a: "The minimum term and notice are stated in your proposal, so you can read them before you sign." },
    { q: "What is a good cost per lead on Meta in Ahmedabad?", a: "It varies by industry, offer and lead quality. A good cost per lead is one below what a lead is worth to you. Use the break-even calculator on this page to work that number out." },
    { q: "How much does social media management cost in Ahmedabad?", a: "It depends on the number of posts, Reels and platforms. It is a [separate service](/social-media-marketing-agency-ahmedabad/) that we scope and quote in writing. Many clients combine it with Meta ads." },
    { q: "Can you run Meta ads in Gujarati, Hindi, Marathi or Tamil?", a: "Yes. We write and run Facebook and Instagram ads in English, Hindi, Gujarati, Marathi, Tamil and other languages, including the ad text, video captions, lead form questions and WhatsApp message, and we report each language separately." },
    { q: "Will you guarantee leads or ROAS?", a: "No. Nobody honestly can. We focus on tracking, testing and improving what you can measure." },
    { q: "Do these prices apply outside Ahmedabad?", a: "The prices on this page are for businesses in Ahmedabad. Campaigns for other cities or countries are quoted separately. See our [Meta ads agency in Ahmedabad](/meta-ads-agency-ahmedabad/) page for how we work." },
  ],
  leadForm: {
    id: "audit-form", formName: "meta-ads-quote", service: "Meta Ads quote", heading: "Get a fixed Meta ads quote",
    text: "Tell us about your offer and goal. We will send a clear, written quote.", website: "optional",
    notesLabel: "Monthly ad spend and goal (optional)", submitLabel: "Get My Meta Ads Quote", successText: "Thank you. We will review your details and reply by email.",
  },
  cta: { heading: "Get a fixed Meta ads quote", text: "Tell us about your offer and goal. We will send a clear quote with the fee kept separate from your ad spend.", button: "Get my Meta ads quote", findUsLabel: "Get a free Meta ads account review" },
};

export const PRICING_PAGES: Record<PricingKey, PricingPageConfig> = { seo, gads, meta };

/** Strips [text](/path) links so schema and meta text stay plain. */
export const plainText = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
