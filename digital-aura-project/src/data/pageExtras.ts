import type { ExtraSection, RelatedService } from "@/components/LocalServicePage";
import type { Enhancement } from "@/data/pageEnhancements";

/**
 * QA pass against the page blueprint, competitor findings and own-content gaps:
 * internal-link cards for every "across" link in the blueprint, FAQs the blueprint lists that were
 * missing, and sections that close competitor gaps. No prices, results or legal claims.
 */

export const CARDS = {
  seoPillar: { title: "SEO Services in Ahmedabad", desc: "Our SEO company page: services, process and what to expect month by month.", points: ["Technical SEO", "Local SEO", "AI search"], href: "/seo-services-ahmedabad" },
  seoAudit: { title: "Free SEO Audit", desc: "Enter your website and get a prioritised fix list across 14 areas.", points: ["Technical to AI search", "No obligation"], href: "/seo/free-audit/" },
  seoPricing: { title: "SEO Packages and Pricing", desc: "How our SEO plans are scoped, what is included and what is not.", points: ["Scope-based", "Written quote"], href: "/seo/pricing/" },
  seoCost: { title: "SEO Cost in Ahmedabad (2026 guide)", desc: "Pricing models, cost drivers and red flags to watch for.", points: ["Cost drivers", "Red flags"], href: "/blog/seo-cost-ahmedabad-2026/" },
  seoDoctors: { title: "SEO for Doctors and Hospitals", desc: "Healthcare SEO with careful, informational content and tracked appointments.", points: ["Treatment pages", "Google Business Profile"], href: "/seo/doctors-hospitals-ahmedabad/" },
  seoManuf: { title: "SEO for Manufacturers and B2B", desc: "Product and specification pages and an RFQ funnel for Gujarat manufacturers.", points: ["Product pages", "Export SEO"], href: "/seo/manufacturers-b2b-gujarat/" },
  gadsPillar: { title: "Google Ads Agency in Ahmedabad", desc: "Ongoing management focused on leads you can track.", points: ["Search and Performance Max", "Call and WhatsApp tracking"], href: "/google-ads-agency-ahmedabad" },
  gadsPricing: { title: "Google Ads Pricing", desc: "Ad spend, management fee and GST explained, with a budget calculator.", points: ["Fee models", "Calculators"], href: "/google-ads-pricing-ahmedabad/" },
  gadsAudit: { title: "Google Ads Audit", desc: "A read-only review of your account and where budget leaks.", points: ["Tracking first", "Written action list"], href: "/google-ads-audit-ahmedabad/" },
  gadsDoctors: { title: "Google Ads for Doctors and Hospitals", desc: "Careful campaigns that measure booked appointments.", points: ["Service-line campaigns", "Call tracking"], href: "/google-ads-for-doctors-ahmedabad/" },
  metaPillar: { title: "Meta Ads Agency in Ahmedabad", desc: "Facebook and Instagram campaigns built for leads you can track.", points: ["Lead ads", "Click to WhatsApp"], href: "/meta-ads-agency-ahmedabad/" },
  metaPricing: { title: "Meta Ads Pricing", desc: "Agency fee versus ad spend, what is included and how to exit.", points: ["Fee vs ad spend", "Break-even calculator"], href: "/meta-ads-agency-ahmedabad/pricing/" },
  metaClinics: { title: "Meta Ads for Doctors and Clinics", desc: "Policy-aware campaigns with WhatsApp booking.", points: ["Health ad limits", "Booked appointments"], href: "/meta-ads-agency-ahmedabad/clinics-doctors/" },
  metaDisabled: { title: "Why Meta Disables Ad Accounts", desc: "Common reasons accounts are restricted and how to reduce the risk.", points: ["Policy", "Appeals"], href: "/blog/why-meta-disables-ad-accounts-2026/" },
  webPillar: { title: "Website Development in Ahmedabad", desc: "Our main website design and development page.", points: ["Business sites", "Ecommerce", "Custom builds"], href: "/website-development-services-ahmedabad/" },
  webCost: { title: "Website Development Cost", desc: "What decides the price of a website and how to compare quotes.", points: ["Cost drivers", "After launch"], href: "/website-development-cost-ahmedabad/" },
  webDesignCost: { title: "Website Design Cost", desc: "What a design fee covers and how design differs from development.", points: ["Approaches", "Revisions"], href: "/website-design-cost-ahmedabad/" },
  webPackages: { title: "Website Packages", desc: "Starter, Business, Growth and Custom, with a 1-minute picker.", points: ["What is included", "What is not"], href: "/website-packages-ahmedabad/" },
  webRedesign: { title: "Website Redesign Services", desc: "Redesign without losing the Google rankings you already have.", points: ["Redirect map", "Staging checks"], href: "/website-redesign-services-ahmedabad/" },
  webAmc: { title: "Website Maintenance and AMC", desc: "Updates, backups, security and monitoring after launch.", points: ["Care plans", "Free health check"], href: "/website-maintenance-amc-ahmedabad/" },
  webDoctors: { title: "Website Design for Doctors and Hospitals", desc: "Patient-first sites with doctor profiles and booking.", points: ["Appointment booking", "Doctor profiles"], href: "/website-design-for-doctors-ahmedabad/" },
  webManuf: { title: "Website Design for Manufacturers", desc: "Catalogue, RFQ flow and certificates for B2B buyers.", points: ["Catalogue", "RFQ flow"], href: "/website-design-for-manufacturers-ahmedabad/" },
  wordpress: { title: "WordPress Development", desc: "Custom WordPress themes, plugins and WooCommerce.", points: ["Custom themes", "Speed"], href: "/services/wordpress-development/" },
  shopify: { title: "Shopify Development", desc: "Store set-up, themes and apps for online selling.", points: ["Store build", "Apps"], href: "/services/shopify-development/" },
  fullstackLocal: { title: "Full Stack Development in Ahmedabad", desc: "Custom portals, catalogues and integrations built in Ahmedabad.", points: ["Custom portals", "Integrations"], href: "/full-stack-development-ahmedabad/" },
  fullstack: { title: "Full Stack Development", desc: "Next.js and custom builds for complex needs.", points: ["Custom portals", "Integrations"], href: "/services/full-stack-development/" },
  branding: { title: "Design and Branding", desc: "Logo and brand identity.", points: ["Logo", "Brand kit"], href: "/services/design-branding/" },
  social: { title: "Social Media Marketing", desc: "Organic content that supports your paid campaigns.", points: ["Content planning", "Reels and posts"], href: "/services/social-media-marketing/" },
  cro: { title: "Conversion Rate Optimisation", desc: "Fix the page after the click.", points: ["Landing page testing", "Form and call flow"], href: "/services/cro/" },
  engagement: { title: "Engagement Models", desc: "Retainer, project, hourly and dedicated-resource ways to work with us.", points: ["Retainer", "Project", "Dedicated"], href: "/engagement-models/" },
  socialAgency: { title: "Social Media Marketing Agency in Ahmedabad", desc: "Content, Reels and paid social that bring enquiries.", points: ["Content plan", "Reels", "Paid social"], href: "/social-media-marketing-agency-ahmedabad/" },
  adAgency: { title: "Advertising Agency in Ahmedabad", desc: "Google, Meta, YouTube and LinkedIn ads with tracking.", points: ["PPC", "Meta ads", "Reporting"], href: "/advertising-agency-ahmedabad/" },
  dmAgency: { title: "Digital Marketing Agency in Ahmedabad", desc: "SEO, ads, web and AI automation under one team.", points: ["SEO", "Ads", "Web"], href: "/digital-marketing-agency-ahmedabad/" },
} satisfies Record<string, RelatedService>;

type CardKey = keyof typeof CARDS;
const rel = (...keys: CardKey[]): RelatedService[] => keys.map((k) => CARDS[k]);

const FOR_CLINICS_AGENCY: ExtraSection = {
  kind: "checklist",
  id: "evaluate-agency",
  title: "How to evaluate any healthcare marketing agency, including us",
  subtext: "Questions worth asking before you sign with anyone. We are happy to answer every one of them in writing.",
  groups: [
    { title: "Claims and wording", items: ["How do you decide what an ad can and cannot say?", "Will I see every ad and page before it goes live?", "Do you ever use cure, guarantee or success-rate claims? (You should hear no.)"] },
    { title: "Patient data", items: ["What patient information, if any, reaches ad or analytics tools?", "Who owns the ad account and the data it collects?", "How are enquiries from forms and WhatsApp stored and who can see them?"] },
    { title: "Results", items: ["How do you measure booked appointments, not only clicks and leads?", "What happens when the numbers fall?", "What is in the report and how often do we talk?"] },
  ],
};

type ExtraEntry = Enhancement & { relatedKeys?: CardKey[] };

const raw: Record<string, ExtraEntry> = {
  /* ───────────── phase 1 ───────────── */
  seoFreeAudit: {
    relatedKeys: ["seoPricing", "seoCost", "seoDoctors", "seoManuf", "seoPillar", "gadsAudit"],
    extraAdd: [],
  },
  googleAdsAudit: {
    relatedKeys: ["gadsPillar", "gadsPricing", "gadsDoctors", "metaPillar", "seoPillar", "cro"],
    faqAdd: [
      { q: "What does the Google Ads audit cover?", a: "Conversion tracking, account structure, keywords and match types, search terms and negatives, ads, settings and targeting, bidding and budgets, search intent match and the landing page experience." },
      { q: "Do I have to hire Digital Aura after the audit?", a: "No. The audit comes with a written action list you can use yourself, with your current agency or with us." },
    ],
    extraAdd: [
      { kind: "calculator", id: "self-check", title: "Self-check: is your Google Ads budget leaking? 12 quick questions", subtext: "Answer from what you know today. No account access is needed, and nothing is sent to us.", variant: "ads-selfcheck" },
      {
        kind: "cards",
        id: "audit-levels",
        title: "Free audit or ongoing management: what is the difference?",
        items: [
          { title: "Free audit", desc: "A read-only review with a written action list and a walkthrough. We do not change your account." },
          { title: "Fixes only", desc: "If you want, we make the agreed fixes once and hand the account back to you." },
          { title: "Ongoing management", desc: "We run and improve the account month by month. Scope and fee are written down first.", href: "/google-ads-pricing-ahmedabad/", cta: "How the fee works" },
        ],
      },
    ],
  },
  websiteRedesign: {
    relatedKeys: ["webPillar", "webDoctors", "webManuf", "webAmc", "webCost", "seoPillar"],
    faqAdd: [
      { q: "Can you redesign my site if another agency built it and will not give me access?", a: "Often yes. First we work out what you own: the domain, hosting, content and files. If access is blocked, we can rebuild from the live site and plan redirects from the public URLs. Ask your previous agency for a written handover as well." },
      { q: "Who owns the new website, design files and code?", a: "Ownership terms are stated in your proposal before work starts. Your domain and hosting accounts should be in your name." },
    ],
    extraAdd: [
      {
        kind: "cards",
        id: "refresh-redesign-rebuild",
        title: "Refresh, redesign or rebuild?",
        subtext: "The right level depends on what is wrong. The more that changes, the more redirect and testing work there is.",
        items: [
          { tag: "Lightest", title: "Refresh", desc: "Keep the structure and URLs, update the design, content and speed." },
          { tag: "Middle", title: "Redesign", desc: "New design and page structure on the same platform, with a URL and redirect plan." },
          { tag: "Heaviest", title: "Rebuild", desc: "A new platform. Most redirect, content-migration and testing work." },
        ],
      },
      {
        kind: "checklist",
        id: "redesign-scorecard",
        title: "Self-scorecard: do you need more than a refresh?",
        subtext: "The more of these are true, the more likely a redesign or rebuild will pay off.",
        groups: [
          { title: "Performance and platform", items: ["The site is slow on mobile", "The platform or theme is outdated or unsupported", "The site has been hacked more than once"] },
          { title: "Content and conversion", items: ["You cannot edit pages yourself", "The structure no longer matches what you sell", "Few visitors become enquiries"] },
        ],
      },
    ],
  },
  websiteMaintenance: {
    relatedKeys: ["webPillar", "webDoctors", "webManuf", "webRedesign", "webPackages"],
    faqAdd: [
      { q: "What happens if my website is hacked while I am on a plan?", a: "Recovery usually means restoring a clean backup, finding and closing the way in, and telling you what happened. What is covered and how fast we respond is stated in your plan, so please ask before you sign." },
      { q: "Do I get a report every month?", a: "Reporting frequency is stated in your plan. We recommend a short monthly summary of updates, backups, security checks and uptime." },
    ],
    extraAdd: [
      {
        kind: "cards",
        id: "platform-tasks",
        title: "Maintenance by platform",
        subtext: "The work differs by platform, so the checks do too.",
        items: [
          { title: "WordPress", desc: "Core, theme and plugin updates, backups, security hardening and spam control." },
          { title: "WooCommerce", desc: "All of the above plus checkout, payment and order-email tests after updates." },
          { title: "Shopify", desc: "App audit, theme updates, speed checks and checkout testing." },
          { title: "Next.js and custom builds", desc: "Dependency patching, build and deploy checks, monitoring and error logs." },
        ],
      },
      { kind: "calculator", id: "downtime-cost", title: "What could downtime cost you?", subtext: "Enter your own numbers to see the value of enquiries at risk when a site is down.", variant: "downtime" },
    ],
  },

  /* ───────────── phase 2: marketing ───────────── */
  seoPricing: {
    relatedKeys: ["seoAudit", "seoCost", "seoDoctors", "seoManuf", "seoPillar", "webDoctors"],
    faqAdd: [{ q: "Do you offer a discount for annual payment?", a: "Payment options and any discount are stated in your written proposal. We do not publish a standard discount." }],
    extraAdd: [
      {
        kind: "compare",
        id: "agency-freelancer-inhouse",
        title: "SEO agency, freelancer or in-house?",
        subtext: "Each can work. The right choice depends on scope, budget and how much you want to manage yourself.",
        left: { title: "Freelancer or in-house", tone: "good", items: ["Can suit a small, well-defined scope", "One person's skills and availability set the limit", "Cover for leave or exits is your problem", "Tools and training are a cost you carry"] },
        right: { title: "Agency", tone: "good", items: ["A team covers technical, content and links", "Process and reporting are built in", "Check who actually works on your account", "Compare scope, not only the monthly figure"] },
      },
    ],
  },
  seoDoctors: { relatedKeys: ["seoPillar", "seoPricing", "seoCost", "seoAudit", "seoManuf", "webDoctors", "gadsDoctors", "metaClinics"] },
  seoManufacturers: { relatedKeys: ["seoPillar", "seoPricing", "seoCost", "seoAudit", "seoDoctors", "webManuf"] },
  googleAdsPricing: {
    relatedKeys: ["gadsPillar", "gadsAudit", "gadsDoctors", "metaPillar", "adAgency", "seoPillar", "engagement"],
    extraAdd: [
      {
        kind: "cards",
        id: "why-quotes-differ",
        title: "Why the Google Ads quotes you got differ so much",
        subtext: "Fees on public pages range widely, and the number alone says little.",
        items: [
          { title: "Scope", desc: "One campaign or many, search only or several channels, and who builds the landing page." },
          { title: "Size of the account", desc: "A larger ad spend usually means more work, but not always in proportion." },
          { title: "Who manages it", desc: "A senior specialist, a junior or a shared team changes both cost and results." },
          { title: "Tracking and landing pages", desc: "Whether call, WhatsApp and form tracking and page fixes are included." },
          { title: "Reporting and meetings", desc: "A dashboard, a monthly call and a change log are different from a PDF." },
          { title: "Contract and exit", desc: "Notice period, ownership of the account and handover on exit." },
        ],
      },
      {
        kind: "checklist",
        id: "compare-two-quotes",
        title: "Compare two Google Ads quotes in four steps",
        groups: [
          { title: "1. Separate the fee from ad spend", items: ["Is the management fee written separately from ad spend?", "Is ad spend paid to Google from your own account?"] },
          { title: "2. List what is in scope", items: ["Campaign types and number of campaigns", "Conversion tracking, including calls and WhatsApp", "Landing page work, if any"] },
          { title: "3. Check ownership and reporting", items: ["Who owns the account and its data?", "What is reported, how often and in what form?"] },
          { title: "4. Check the exit terms", items: ["Minimum term and notice period", "Handover of the account if you leave"] },
        ],
      },
    ],
  },
  googleAdsDoctors: {
    relatedKeys: ["gadsPillar", "gadsPricing", "gadsAudit", "seoPillar", "seoDoctors", "metaPillar", "metaClinics", "webDoctors", "cro"],
    extraAdd: [
      {
        kind: "cards",
        id: "cost-per-appointment",
        title: "Measure cost per booked appointment, not cost per click",
        items: [
          { title: "Cost per click", desc: "What Google charges when someone clicks. Useful, but it says nothing about patients." },
          { title: "Cost per enquiry", desc: "Calls, WhatsApp messages and forms divided into your ad spend." },
          { title: "Cost per booked appointment", desc: "The number that matters. It needs your front desk to record bookings." },
          { title: "Show-up rate", desc: "How many booked patients actually come. It changes what you can afford to pay.", href: "/google-ads-pricing-ahmedabad/#break-even-calculator", cta: "Try the break-even calculator" },
        ],
      },
      FOR_CLINICS_AGENCY,
    ],
  },
  metaAdsPricing: {
    relatedKeys: ["metaPillar", "metaClinics", "gadsPillar", "gadsPricing", "socialAgency", "adAgency", "seoPillar"],
    extraAdd: [
      {
        kind: "cards",
        id: "why-quotes-differ",
        title: "Why Meta ads quotes differ so much",
        items: [
          { title: "Scope", desc: "Number of campaigns, platforms and audiences managed." },
          { title: "Creative volume", desc: "How many ad images, videos and copy variations are made each month." },
          { title: "Size of the budget", desc: "Higher ad spend usually means more testing and reporting." },
          { title: "Seniority", desc: "Who plans and who optimises the account." },
          { title: "Reporting", desc: "Leads, cost per lead and learnings, and how often you talk." },
          { title: "Contract and ownership", desc: "Notice period, and who owns the ad account, Pixel and creatives." },
        ],
      },
    ],
  },
  metaAdsClinics: {
    relatedKeys: ["metaPillar", "metaPricing", "gadsPillar", "gadsDoctors", "seoPillar", "seoDoctors", "webDoctors", "metaDisabled"],
    extraAdd: [
      FOR_CLINICS_AGENCY,
      {
        kind: "cards",
        id: "what-we-dont-do",
        title: "What we do not do for clinics",
        items: [
          { title: "No patient data in targeting", desc: "We do not upload or target patient lists, and we do not track symptoms or diagnoses." },
          { title: "No cure or guarantee claims", desc: "Ads describe services, location and booking. They do not promise outcomes." },
          { title: "No testimonials or before-and-after images in ads", desc: "They are a common reason for rejection and may be restricted for some providers." },
          { title: "No promises of appointment numbers", desc: "Results depend on your offer, speciality, area and how quickly you answer." },
        ],
      },
    ],
  },

  /* ───────────── phase 2: web ───────────── */
  websiteDevCost: {
    relatedKeys: ["webPillar", "webDesignCost", "webPackages", "wordpress", "shopify", "webAmc", "seoPillar"],
    extraAdd: [
      {
        kind: "checklist",
        id: "quote-comparison",
        title: "A grid for comparing website quotes (copy it)",
        subtext: "Fill one column per vendor. Blank cells are the questions to ask.",
        groups: [
          { title: "Scope", items: ["Number of pages and unique layouts", "Design level: template, semi-custom or custom", "Platform and why", "Who writes the content and who takes the photos", "SEO set-up, analytics and speed target", "Mobile design included"] },
          { title: "Terms", items: ["Domain and hosting: whose name, whose bill", "Number of revision rounds", "Support period after launch", "Payment schedule", "Ownership of code and design files", "Timeline with milestone dates"] },
        ],
      },
      {
        kind: "cards",
        id: "three-year-cost",
        title: "Three-year cost of ownership: what to add up",
        subtext: "The build quote is only the first line.",
        items: [
          { title: "The build quote", desc: "Design, development, content entry, SEO set-up and launch." },
          { title: "Domain and hosting each year", desc: "Renewals, SSL and business email." },
          { title: "Maintenance or AMC", desc: "Updates, backups and security, if you do not do them yourself." },
          { title: "Content and SEO after launch", desc: "New pages, articles and ongoing optimisation." },
          { title: "Licences", desc: "Premium plugins, themes and apps that renew each year." },
          { title: "A redesign reserve", desc: "Most sites need a refresh within a few years." },
        ],
      },
    ],
  },
  websiteDesignCost: {
    relatedKeys: ["webPillar", "webCost", "webPackages", "webRedesign", "branding", "seoPillar"],
    extraAdd: [
      {
        kind: "cards",
        id: "accessibility-speed",
        title: "Accessibility and speed are design deliverables",
        items: [
          { title: "Contrast and readable text", desc: "Colours and type chosen so text is easy to read in daylight on a phone." },
          { title: "Tap targets", desc: "Buttons and links large enough to press without mistakes." },
          { title: "A speed budget", desc: "Image sizes, fonts and effects planned so pages stay fast." },
          { title: "Keyboard and screen-reader basics", desc: "Clear focus states, headings and labels." },
        ],
      },
      {
        kind: "text",
        id: "customer-worth",
        title: "What is one new customer worth to you?",
        paragraphs: ["Before choosing a design budget, work out what one new customer is worth to your business. A design that brings in a few more enquiries a month can pay for itself, but nobody can promise it."],
        links: [{ label: "Use the break-even calculator", href: "/google-ads-pricing-ahmedabad/#break-even-calculator" }],
      },
    ],
  },
  websitePackages: { relatedKeys: ["webPillar", "webCost", "webDesignCost", "webAmc", "webDoctors", "webManuf", "gadsPillar"] },
  websiteDoctors: {
    relatedKeys: ["webPillar", "webRedesign", "webAmc", "webManuf", "seoDoctors", "gadsDoctors"],
    extraAdd: [
      {
        kind: "checklist",
        id: "doctor-site-checklist",
        title: "Doctor website compliance and trust checklist",
        subtext: "A working checklist, not legal advice. Confirm the points marked 'check' with your own legal adviser.",
        groups: [
          { title: "Content", items: ["Condition and treatment pages are factual", "No cure, guarantee or success-rate claims", "Doctors review medical content before it goes live", "Pages show when they were last updated"] },
          { title: "People and proof", items: ["Real doctor photographs and recognised qualifications", "Check: registration details and how they must be shown", "Check: whether testimonials or before-and-after images are allowed for you"] },
          { title: "Data", items: ["Forms ask only for what is needed to book", "Consent wording and a privacy policy", "No patient reports or images on public URLs"] },
          { title: "Technical", items: ["HTTPS and fast mobile pages", "Clinic and doctor schema that matches the page", "Readable text and clear contrast"] },
        ],
      },
    ],
  },
  websiteManufacturers: { relatedKeys: ["webPillar", "webRedesign", "webAmc", "webDoctors", "seoManuf", "fullstackLocal", "fullstack"] },
};

export const pageExtras: Record<string, Enhancement> = Object.fromEntries(
  Object.entries(raw).map(([key, { relatedKeys, ...rest }]) => [key, relatedKeys ? { ...rest, relatedServices: rel(...relatedKeys) } : rest]),
);

/** Extras for pages defined in localPagesData.ts. */
export const pillarExtras: Record<string, Enhancement> = {
  digitalMarketingAhmedabad: {
    extraAdd: [
      {
        kind: "cards",
        id: "more-ways",
        title: "More ways we can help in Ahmedabad",
        subtext: "Focused pages for each service, with how it works, how it is priced and a free review.",
        items: [
          { title: "SEO services", desc: "Technical SEO, local SEO and AI search, with a free audit.", href: "/seo-services-ahmedabad", tag: "SEO" },
          { title: "Google Ads and PPC", desc: "Search campaigns with call and WhatsApp tracking.", href: "/google-ads-agency-ahmedabad", tag: "Ads" },
          { title: "Meta ads", desc: "Facebook and Instagram campaigns for leads.", href: "/meta-ads-agency-ahmedabad/", tag: "Ads" },
          { title: "Advertising agency", desc: "Google, Meta, YouTube and LinkedIn ads under one plan.", href: "/advertising-agency-ahmedabad/", tag: "Ads" },
          { title: "Social media marketing", desc: "Content, Reels and paid social that bring enquiries.", href: "/social-media-marketing-agency-ahmedabad/", tag: "Social" },
          { title: "Website development", desc: "Fast, SEO-ready websites with a fixed written quote.", href: "/website-development-services-ahmedabad/", tag: "Web" },
        ],
      },
    ],
  },
  metaAdsAhmedabad: {
    quickAnswer: {
      heading: "What does a Meta ads agency in Ahmedabad do?",
      answer: "A Meta ads agency plans and runs Facebook and Instagram campaigns that bring enquiries: it sets the objective and tracking, builds audiences and creative, tests what works, hands leads to your team through forms or WhatsApp, and reports on leads and cost per lead. Boosting a post alone does none of that.",
      points: ["Lead ads and click-to-WhatsApp campaigns", "Tracking set up before spend, so results are measurable", "Monthly reporting on leads, not likes and reach"],
    },
    relatedServices: rel("metaPricing", "metaClinics", "gadsPillar", "socialAgency", "adAgency", "dmAgency", "seoPillar", "cro"),
    faqAdd: [
      { q: "What does a Meta ads agency do that I cannot do by boosting posts?", a: "Boosting a post picks a basic objective and audience in one click. An agency sets the right objective and tracking, tests audiences and creative, handles lead follow-up, and reports on leads and cost per lead, not likes or reach." },
      { q: "Do I own my ad account and data?", a: "Account ownership is stated in your proposal. We recommend the ad account and Pixel are in your business's name, so you keep your data if you ever leave." },
      { q: "Is there a minimum contract?", a: "The minimum term and notice period are written in your proposal before you decide." },
    ],
  },
};
