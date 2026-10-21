import type { ExtraSection, RelatedService } from "@/components/LocalServicePage";
import type { Enhancement } from "@/data/pageEnhancements";

/**
 * QA pass against the page blueprint, competitor findings and own-content gaps:
 * internal-link cards for every "across" link in the blueprint, FAQs the blueprint lists that were
 * missing, and sections that close competitor gaps. No prices, results or legal claims.
 */

export const CARDS = {
  seoPillar: { title: "SEO Services in Ahmedabad", desc: "Our SEO company page: services, process and what to expect month by month.", points: ["Technical SEO", "Local SEO", "AI search"], href: "/seo-services-ahmedabad" },
  seoRealEstate: { title: "SEO for Real Estate", desc: "Project and locality pages, RERA details shown clearly and tracked site-visit enquiries.", points: ["Project pages", "Site-office Maps"], href: "/seo/real-estate-ahmedabad/" },
  seoEducation: { title: "SEO for Coaching and Schools", desc: "Course and branch pages that bring admission enquiries from search and Maps.", points: ["Course pages", "Branch listings"], href: "/seo/education-coaching-ahmedabad/" },
  seoHospitality: { title: "SEO for Restaurants and Hotels", desc: "Maps visibility, text menus and tracked calls and bookings.", points: ["Google Business Profile", "Menu pages"], href: "/seo/restaurants-hospitality-ahmedabad/" },
  gadsRealEstate: { title: "Google Ads for Real Estate", desc: "Campaigns by project and locality, tracked to qualified site visits.", points: ["Project campaigns", "Call tracking"], href: "/google-ads-for-real-estate-ahmedabad/" },
  gadsEducation: { title: "Google Ads for Coaching and Schools", desc: "Admission-season campaigns tracked by course and branch.", points: ["Course campaigns", "Season planning"], href: "/google-ads-for-education-coaching-ahmedabad/" },
  gadsManuf: { title: "Google Ads for Manufacturers", desc: "Tight product campaigns tracked to qualified RFQs.", points: ["Product campaigns", "RFQ tracking"], href: "/google-ads-for-manufacturers-ahmedabad/" },
  metaRealEstate: { title: "Meta Ads for Real Estate", desc: "Lead and WhatsApp campaigns with RERA-aware wording.", points: ["Lead forms", "Site-visit follow-up"], href: "/meta-ads-agency-ahmedabad/real-estate/" },
  metaEducation: { title: "Meta Ads for Education", desc: "Admission-season campaigns with counsellor follow-up.", points: ["Lead forms", "Admission season"], href: "/meta-ads-agency-ahmedabad/education-coaching/" },
  metaRestaurants: { title: "Meta Ads for Restaurants", desc: "Footfall, bookings and own-channel orders with food reels.", points: ["Food reels", "Bookings"], href: "/meta-ads-agency-ahmedabad/restaurants/" },
  webHospitals: { title: "Website Design for Hospitals", desc: "Department and doctor pages with privacy-aware booking routes.", points: ["Department pages", "Doctor profiles"], href: "/website-design-for-hospitals-ahmedabad/" },
  webRealEstate: { title: "Website Design for Real Estate", desc: "A page for every project with a simple site-visit form.", points: ["Project pages", "Site-visit form"], href: "/website-design-for-real-estate-ahmedabad/" },
  webEducation: { title: "Website Design for Schools and Coaching", desc: "Course pages and admission enquiries that work on phones.", points: ["Course pages", "Admission forms"], href: "/website-design-for-schools-coaching-ahmedabad/" },
  webRestaurants: { title: "Website Design for Restaurants", desc: "Fast text menus, Maps and booking for restaurants and cafes.", points: ["Text menu", "Booking"], href: "/website-design-for-restaurants-ahmedabad/" },
  webEcomCost: { title: "Ecommerce Website Cost", desc: "What decides the price of an online store and how to compare quotes.", points: ["Cost drivers", "Quote checklist"], href: "/ecommerce-website-cost-ahmedabad/" },
  webWpCost: { title: "WordPress Website Cost", desc: "What decides the price of a WordPress site and what to ask.", points: ["Cost drivers", "Quote checklist"], href: "/wordpress-website-cost-ahmedabad/" },
  seoAudit: { title: "Free SEO Audit", desc: "Enter your website and get a prioritised fix list across 14 areas.", points: ["Technical to AI search", "No obligation"], href: "/seo/free-audit/" },
  seoPricing: { title: "SEO Packages and Pricing", desc: "How our SEO plans are scoped, what is included and what is not.", points: ["Scope-based", "Written quote"], href: "/seo/pricing-ahmedabad/" },
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

/** Team details supplied by the owner (2026-10-09). Roles and bios are used exactly as given. */
export const TEAM = {
  satish: { name: "Satish Prajapati", role: "Project Manager & Digital Marketing", photo: "/team/satish.png", bio: "Satish Prajapati leads project management and digital marketing initiatives, ensuring smooth project execution and effective marketing strategies. He focuses on team coordination, campaign planning, and delivering results that support business growth." },
  bhavesh: { name: "Bhavesh Bhavsar", role: "Digital Marketing Executive", photo: "/team/bhavesh.webp", bio: "Bhavesh Bhavsar works on digital marketing activities focused on improving online visibility and business growth. He contributes to SEO, website optimization, content planning, and digital marketing performance to help businesses strengthen their online presence." },
  jinali: { name: "Jinali Lodariya", role: "SEO Executive", photo: "/team/jinali.png", bio: "Jinali Lodariya specializes in search engine optimization (SEO), focusing on keyword research, on-page optimization, content optimization, and website performance. She works to improve search engine rankings, organic traffic, and overall website visibility." },
};

/** Founder card shown first in the pillar-page team sections. Bio condensed from the About page. */
const FOUNDER_CARD = {
  name: "Sambhav Shah",
  role: "Founder & CEO",
  photo: "/team/sambhav-shah.webp",
  bio: "Sambhav started in digital marketing in 2015 and built his expertise hands-on, leading business development, client relationships and growing teams. With 10+ years across client acquisition, team leadership and digital execution, he stays personally involved in strategy on every account.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sambhav-shah/" },
    { label: "Instagram", href: "https://www.instagram.com/sambhavshah2/" },
  ],
};

/** Meta ads pillar team, in the order the owner asked for (2026-10-15). */
const META_PILLAR_TEAM = [
  FOUNDER_CARD,
  { name: "Satish Prajapati", role: "Meta Ads Specialist", photo: "/team/satish.png", bio: "Satish plans Meta campaigns from objective to budget and creative direction, and leads the reviews that keep spend following the leads that matter to your business." },
  { name: "Bhavesh Bhavsar", role: "Meta Ads Executive", photo: "/team/bhavesh.webp", bio: "Bhavesh sets up lead forms, the pixel and conversion tracking, and checks that every lead reaches you, whether it comes by form, call or WhatsApp." },
  { name: "Krishna Jani", role: "Meta Ads Executive", photo: "/team/krishna.webp", bio: "Krishna works on ad creative briefs, copy variations and tests, helping keep creatives fresh as results change." },
  { name: "Diya Mahida", role: "Meta Ads Executive", photo: "/team/diya.webp", bio: "Diya handles reporting and optimisation checks across campaigns, summarising what produced leads and what to change next." },
];

/** Google Ads pillar team (same people and wording as the /google-ads-agency-ahmedabad page). */
const GOOGLE_PILLAR_TEAM = [
  FOUNDER_CARD,
  { name: "Satish Prajapati", role: "Google Ads Specialist", photo: "/team/satish.png", bio: "Satish plans account structure, budgets and bidding, and keeps campaigns tied to the enquiries you want. Satish also coordinates the team and walks you through each month's results." },
  { name: "Bhavesh Bhavsar", role: "Google Ads Executive", photo: "/team/bhavesh.webp", bio: "Bhavesh manages campaign setup, conversion tracking and daily checks, so calls, forms and WhatsApp clicks are counted correctly and budgets stay on track." },
  { name: "Krishna Jani", role: "Google Ads Executive", photo: "/team/krishna.webp", bio: "Krishna supports campaign optimisation and landing page checks, making sure the page a visitor lands on keeps the promise made in the ad." },
  { name: "Diya Mahida", role: "Google Ads Executive", photo: "/team/diya.webp", bio: "Diya prepares performance reports and audience and placement reviews, turning account data into clear next steps for the team and for you." },
];

/** Website pillar team (same people and wording as the /website-development-services-ahmedabad page). */
const WEB_PILLAR_TEAM = [
  FOUNDER_CARD,
  { name: "Jaspreet Singh", role: "Web Design & Dev Project Manager", photo: "/team/jaspreet.png", bio: "Jaspreet is your point of contact on a website project. He plans the scope and timeline, coordinates design and development, and keeps every stage moving towards the launch date." },
  { name: "Swayam Parikh", role: "AI Full Stack Developer", photo: "/team/swayam.png", bio: "Swayam builds the front end and back end of custom websites and web apps, and adds AI-powered features where they help, keeping the code fast, secure and easy to maintain." },
  { name: "Abhishek Kaushal", role: "Shopify Developer", photo: "/team/placeholder-male.svg", bio: "Abhishek builds and customises Shopify stores, from theme setup and product catalogues to checkout and payment integrations, so your online store is ready to sell." },
];

/** SEO pillar team (same people and wording as the /seo-services-ahmedabad page) for the SEO sub-pages. */
const SEO_PILLAR_TEAM = [
  FOUNDER_CARD,
  { name: "Satish Prajapati", role: "SEO Specialist", photo: "/team/satish.png", bio: "Satish leads SEO delivery and project management on your account. Audit findings become a prioritised plan, and every month’s work, report and next step is explained to you clearly." },
  { name: "Jinali Lodariya", role: "SEO Executive", photo: "/team/jinali.png", bio: "Jinali handles keyword research, on-page optimisation and content improvements. Titles, headings and page copy are worked through so each service page matches what people in Ahmedabad actually search for." },
  { name: "Bhavesh Bhavsar", role: "SEO Executive", photo: "/team/bhavesh.webp", bio: "Bhavesh looks after website optimisation, content planning and technical checks. The aim is pages that are crawlable, fast and well structured, so Google can find and understand them." },
  { name: "Krishna Jani", role: "SEO Executive", photo: "/team/krishna.webp", bio: "Krishna supports on-page work, Google Business Profile updates and local search tasks, keeping your listings and pages accurate and consistent across the places customers look." },
  { name: "Diya Mahida", role: "SEO Executive", photo: "/team/diya.webp", bio: "Diya supports keyword tracking, reporting and content research, and helps prepare the monthly updates that show which pages moved and what to work on next." },
];
const seoTeamSection = (id: string, subtext: string): ExtraSection => ({ kind: "team", id, eyebrow: "Our team", title: "Meet the team behind your SEO", subtext, members: SEO_PILLAR_TEAM });

/** Pillar-page teams by service, so every cluster page shows the founder first and then the members relevant to that service. */
export const PILLAR_TEAMS = { seo: SEO_PILLAR_TEAM, gads: GOOGLE_PILLAR_TEAM, meta: META_PILLAR_TEAM, web: WEB_PILLAR_TEAM };

/** Instagram reel ids supplied by the owner (2026-10-09), grouped by service. */
export const REELS = {
  seo: ["DXwAkPRMl9c", "DTktVf7gdFf", "DcoMJiOskzp"],
  googleAds: ["DbpWKskDuEi", "DXkCXfnDBZE"],
  meta: ["DYAJTR-hkz2", "DSctZZUDCS4", "DRUXMZwgVSL"],
};

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
    relatedKeys: ["seoPricing", "seoDoctors", "seoManuf", "seoPillar", "gadsAudit"],
    extraAdd: [
      { kind: "reels", id: "seo-videos", eyebrow: "Videos", title: "Watch: SEO in short videos", subtext: "Short, practical videos from our founder, Sambhav Shah, on how SEO works for businesses in Ahmedabad.", ids: REELS.seo, topic: "SEO", slug: "seo" },
      seoTeamSection("seo-team", "Digital Aura is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing. This is the in-house team at our Hanspura office, Ahmedabad, that carries out and explains every audit."),
    ],
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
      { kind: "calculator", id: "downtime-cost", title: "What could downtime cost you?", subtext: "Enter your own numbers to see the value of enquiries at risk when a site is down.", variant: "downtime" },
    ],
  },

  /* ───────────── phase 2: marketing ───────────── */
  seoPricing: {
    relatedKeys: ["seoAudit", "seoDoctors", "seoManuf", "seoPillar", "webDoctors"],
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
  seoDoctors: { relatedKeys: ["seoPillar", "seoPricing", "seoAudit", "seoManuf", "webDoctors", "gadsDoctors", "metaClinics"],
    extraAdd: [seoTeamSection("seo-team", "Digital Aura is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing. This is the in-house team at our Hanspura office, Ahmedabad, that plans and runs healthcare SEO.")],
  },
  seoManufacturers: { relatedKeys: ["seoPillar", "seoPricing", "seoAudit", "seoDoctors", "webManuf"],
    extraAdd: [
      { kind: "text", id: "cost", title: "What B2B SEO costs for a manufacturer", paragraphs: ["The cost depends on catalogue size, the markets you want to reach and how competitive your products are. We give a written scope and fee after a free audit, so you can compare it with what marketplace listings cost you today.", "For businesses in Ahmedabad our SEO plans run from ₹15,000 to ₹1,50,000 a month plus GST. For a plant elsewhere in Gujarat, we confirm the scope and fee in writing after the audit."], links: [{ label: "How our SEO plans are scoped", href: "/seo/pricing-ahmedabad/" }], after: "qualified-leads" },seoTeamSection("seo-team", "Digital Aura is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing. This is the in-house team at our Hanspura office, Ahmedabad, that plans and runs B2B SEO for manufacturers.")],
  },
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
          { title: "Show-up rate", desc: "How many booked patients actually come. It changes what you can afford to pay.", href: "/google-ads-pricing-ahmedabad/#plan", cta: "Try the break-even calculator" },
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
    storyLayout: true,
    statsBand: [
      { value: "120+", label: "Clients served" },
      { value: "750+", label: "Projects delivered" },
      { value: "10+", label: "Years in digital marketing" },
      { value: "Free", label: "Written website quote" },
    ],
    faqAdd: [
      { q: "Can you redesign my existing website instead of building a new one?", a: "Yes. A redesign keeps what works, such as your content and search rankings, and rebuilds what does not. We check redirects so you do not lose Google traffic. Our website redesign service explains how we decide between a refresh, a redesign and a rebuild." },
      { q: "Do you also do SEO and ads after the website is live?", a: "Yes. The same team can run SEO, Google Ads and Meta ads after launch. They are quoted separately from the website, and you can use another provider if you prefer." },
      { q: "What do I need to send to get an accurate quote?", a: "What the site must do, the pages you need or a few sites you like, who will provide the content, whether you need Gujarati or Hindi, your current website address and your deadline. A short WhatsApp message with these is enough to start." },
      { q: "Can I start with a small website and add pages later?", a: "Yes. We build the site so it can grow, with a layout and content system that handles new pages. Our packages show how a Starter site can be extended into a Business or Growth site." },
    ],
    extraAdd: [
      {
        kind: "checklist",
        id: "quote-comparison",
        eyebrow: "Quote grid",
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
        eyebrow: "Total cost",
        slot: "early",
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
      {
        kind: "text",
        id: "about-guide",
        eyebrow: "About this guide",
        title: "Who is behind this guide",
        paragraphs: [
          "This guide is published by Digital Aura, a digital marketing and web development agency based at 713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad. The agency is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing, and has delivered 750+ projects for 120+ clients.",
          "We write about website cost in plain terms because most bad website projects start with a quote nobody compared properly. We update this page when our process or terms change, and the date at the top shows when it was last reviewed.",
        ],
        links: [{ label: "About Digital Aura", href: "/about/" }, { label: "Founder on LinkedIn", href: "https://www.linkedin.com/in/sambhav-shah/" }, { label: "Contact us", href: "/contact/" }],
      },
    ],
  },
  websiteDesignCost: {
    relatedKeys: ["webPillar", "webCost", "webPackages", "webRedesign", "branding", "seoPillar"],
    storyLayout: true,
    statsBand: [
      { value: "120+", label: "Clients served" },
      { value: "750+", label: "Projects delivered" },
      { value: "10+", label: "Years in digital marketing" },
      { value: "Free", label: "Written website quote" },
    ],
    faqAdd: [
      { q: "Do you also build the website you design?", a: "Yes. Design and development work best together because layouts are planned with the platform in mind. We can also hand over the design files if you want to use another developer." },
      { q: "Can you refresh the design of my current site without rebuilding it?", a: "Often yes. A design refresh can update layouts, typography and imagery on the existing platform. If the platform itself is the problem, a redesign or rebuild may suit better, and we will say so." },
      { q: "What is a design system and do I need one?", a: "A design system is a set of reusable components, colours and rules that keep many pages consistent. A small site rarely needs one. A large site with many page types often does." },
      { q: "How do I know a design will bring enquiries?", a: "Nobody can promise results from design alone. We design around the action visitors should take on each page, test on real phones and check speed, which are the things that help a page convert." },
    ],
    extraAdd: [
      {
        kind: "cards",
        id: "accessibility-speed",
        eyebrow: "Quality",
        slot: "early",
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
        eyebrow: "Value",
        slot: "early",
        title: "What is one new customer worth to you?",
        paragraphs: ["Before choosing a design budget, work out what one new customer is worth to your business. A design that brings in a few more enquiries a month can pay for itself, but nobody can promise it."],
        links: [{ label: "Use the break-even calculator", href: "/google-ads-pricing-ahmedabad/#plan" }],
      },
    ],
  },
  websitePackages: {
    relatedKeys: ["webPillar", "webCost", "webDesignCost", "webAmc", "webDoctors", "webManuf", "gadsPillar"],
    storyLayout: true,
    statsBand: [
      { value: "120+", label: "Clients served" },
      { value: "750+", label: "Projects delivered" },
      { value: "10+", label: "Years in digital marketing" },
      { value: "Free", label: "Written website quote" },
    ],
    faqAdd: [
      { q: "Which package do online stores need?", a: "Usually Growth or Custom, depending on the size of the catalogue and the features. Our website development cost guide explains what changes for an online store." },
      { q: "Do the packages include SEO?", a: "Basic on-page SEO, analytics and Search Console are included. Ongoing SEO, such as new content and link work, is separate, and our SEO team can continue after launch." },
      { q: "Can I see examples of websites for each package?", a: "Yes. Ask on the form or on WhatsApp and we will share relevant work. You can also read our case studies." },
      { q: "Can I add Google Ads or Meta ads after the website is live?", a: "Yes. Growth sites are built to receive paid traffic, and the same team can run Google Ads or Meta ads. They are quoted separately." },
    ],
  },
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
    extraAdd: [
      { kind: "reels", id: "meta-videos", eyebrow: "Videos", title: "Watch: Meta ads in short videos", subtext: "Short, practical videos from our founder, Sambhav Shah, on how Meta ads work for businesses in Ahmedabad.", ids: REELS.meta, topic: "Meta ads", slug: "meta" },
      { kind: "team", id: "meta-team", eyebrow: "Our team", title: "Meet the team behind every Meta campaign we run", subtext: "Digital Aura is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing. This is the in-house team at our Hanspura office, Ahmedabad, that plans, builds and reports on your Meta ads.", members: META_PILLAR_TEAM },
    ],
    faqAdd: [
      { q: "Which businesses in Ahmedabad get the best results from Meta ads?", a: "Usually businesses that sell something people do not search for every day and can reply to enquiries quickly: clinics and classes, real estate, restaurants and online stores. Where customers already search in urgent moments, such as for a repair, Google Search often comes first." },
      { q: "What does the free Meta ads account review include?", a: "We look at your ad account structure, Pixel and Conversions API events, audiences, creative and where budget is being wasted. You get a short written summary by email of what we found and what we would fix first. There is no obligation." },
      { q: "What does a Meta ads agency do that I cannot do by boosting posts?", a: "Boosting a post picks a basic objective and audience in one click. An agency sets the right objective and tracking, tests audiences and creative, handles lead follow-up, and reports on leads and cost per lead, not likes or reach." },
      { q: "Do I own my ad account and data?", a: "Account ownership is stated in your proposal. We recommend the ad account and Pixel are in your business's name, so you keep your data if you ever leave." },
      { q: "Is there a minimum contract?", a: "The minimum term and notice period are written in your proposal before you decide." },
    ],
  },
};
