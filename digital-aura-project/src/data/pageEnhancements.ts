import type { ExtraSection, FaqItem, LocalServiceConfig } from "@/components/LocalServicePage";
import type { LeadFormConfig } from "@/components/PageLeadForm";
import { LAST_UPDATED } from "@/data/auditContent";

/**
 * Cross-cutting upgrades applied to every blueprint cluster page: answer-first box (AEO/GEO),
 * "published by / last updated" line (E-E-A-T), inline lead form, FAQ heading and sources.
 * No prices, stats, client results or legal claims (owner has not confirmed any).
 */

export type Enhancement = Partial<LocalServiceConfig> & { extraAdd?: ExtraSection[]; faqAdd?: FaqItem[] };

/** Merge several enhancement maps (later maps add to earlier ones: extra sections and FAQs are appended). */
export function enhance<T extends Record<string, LocalServiceConfig>>(pages: T, ...maps: Partial<Record<string, Enhancement>>[]): T {
  const out: Record<string, LocalServiceConfig> = { ...pages };
  const keys = new Set(maps.flatMap((m) => Object.keys(m)));
  for (const key of keys) {
    const base = out[key];
    if (!base) {
      // The first map is the page file's own enhancements (strict). Shared maps may list pages from other files.
      if (key in (maps[0] || {})) throw new Error(`pageEnhancements: unknown page ${key}`);
      continue;
    }
    let merged: LocalServiceConfig = { ...base, lastUpdated: LAST_UPDATED };
    let extraSections = [...(base.extraSections || [])];
    let faqs = [...base.faqs];
    for (const m of maps) {
      const e = m[key];
      if (!e) continue;
      const { extraAdd, faqAdd, ...rest } = e;
      merged = { ...merged, ...rest };
      if (extraAdd) extraSections = [...extraSections, ...extraAdd];
      if (faqAdd) faqs = [...faqs, ...faqAdd];
    }
    out[key] = { ...merged, extraSections, faqs };
  }
  return out as T;
}

const BUSINESS_TYPES = ["Doctor, clinic or hospital", "Manufacturer or exporter", "Online store", "Local service business", "Education or coaching", "Real estate", "Professional services", "Other"];

const form = (f: Partial<LeadFormConfig> & Pick<LeadFormConfig, "formName" | "service" | "heading" | "submitLabel">): LeadFormConfig => ({
  id: "audit-form",
  website: "optional",
  businessTypes: BUSINESS_TYPES,
  ...f,
});

const GOOGLE_HELPFUL = { label: "Google Search Central: Creating helpful, reliable, people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" };
const GOOGLE_SEO_GUIDE = { label: "Google Search Central: SEO Starter Guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" };
const GOOGLE_ADS_HELP = { label: "Google Ads Help", href: "https://support.google.com/google-ads" };
const GOOGLE_ADS_POLICY = { label: "Google Ads policies", href: "https://support.google.com/adspolicy" };
const META_STANDARDS = { label: "Meta Advertising Standards", href: "https://transparency.meta.com/policies/ad-standards/" };
const WEB_VITALS = { label: "web.dev: Core Web Vitals", href: "https://web.dev/vitals/" };

const NO_PATIENT_DATA = "Please do not include any patient information in this form.";

export const phase1Enhancements: Record<string, Enhancement> = {
  websiteRedesign: {
    heroCta: { label: "Get My Free Rankings-at-Risk Review", href: "#audit-form" },
    quickAnswer: {
      heading: "Will a website redesign hurt my Google rankings?",
      answer: "It does not have to. Rankings are lost when URLs change without redirects, content is dropped, or tracking breaks at launch. We list every important URL, plan redirects and content, check the staging site, and monitor after launch. Enter your website for a free review of what is at risk before you commit.",
    },
    leadForm: form({ formName: "website-redesign-review", service: "Website redesign: rankings-at-risk review", heading: "Get a free rankings-at-risk review", text: "Enter your current website. We will tell you what could be lost in a redesign and what to protect.", website: "required", notesLabel: "What do you want to change? (optional)", submitLabel: "Get My Free Review", successText: "Thank you. We have your website and will reply by email with the next step." }),
    faqTitle: "Website Redesign FAQs",
    sources: [GOOGLE_SEO_GUIDE, { label: "Google Search Central: Site moves with URL changes", href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes" }, WEB_VITALS],
  },
  websiteMaintenance: {
    heroCta: { label: "Get My Free Website Health Check", href: "#audit-form" },
    quickAnswer: {
      heading: "What is website maintenance and AMC?",
      answer: "Website maintenance, often sold as an annual maintenance contract (AMC), keeps your site updated, backed up, secure and monitored after launch. It covers platform and plugin updates, backups, security checks, uptime monitoring and small changes. We also take over sites built by others. Enter your website for a free health check.",
    },
    leadForm: form({ formName: "website-health-check", service: "Website maintenance: free health check", heading: "Get a free website health check", text: "Enter your website and we will check updates, security basics, speed and backups, then reply by email.", website: "required", notesLabel: "Platform and any problems you have noticed (optional)", submitLabel: "Get My Free Health Check", successText: "Thank you. We have your website and will reply by email with what we found." }),
    faqTitle: "Website Maintenance and AMC FAQs",
    sources: [WEB_VITALS, { label: "Google Search Central: Security issues", href: "https://developers.google.com/search/docs/monitor-debug/security" }],
  },
};

export const phase2Enhancements: Record<string, Enhancement> = {
  seoPricing: {
    heroCta: { label: "Get a Free Audit and Written Quote", href: "#audit-form" },
    quickAnswer: {
      heading: "How are SEO packages priced in Ahmedabad?",
      answer: "SEO packages in Ahmedabad are priced by scope: your site's condition, how competitive your market is, how many services and locations you target, and how much content and link work is needed. Digital Aura scopes the work after a free audit and gives a written quote that lists monthly deliverables, exclusions and exit terms.",
    },
    leadForm: form({ formName: "seo-quote", service: "SEO quote", heading: "Get a free audit and a written quote", text: "Tell us about your business. We will audit your site and send a scoped, written SEO proposal.", notesLabel: "What do you want SEO to achieve? (optional)", notesPlaceholder: "For example: more calls, appointments or product enquiries", submitLabel: "Get My Audit and Quote", successText: "Thank you. We will review your details and reply by email." }),
    faqTitle: "SEO Pricing FAQs",
    sources: [GOOGLE_SEO_GUIDE, GOOGLE_HELPFUL],
    extraAdd: [
      {
        kind: "cards",
        id: "add-ons",
        title: "Add-ons and one-time work",
        subtext: "Work outside the monthly scope is quoted separately, in writing, before it starts.",
        items: [
          { title: "Technical SEO audit", desc: "A one-time review with a prioritised fix list, for teams that will implement it themselves." },
          { title: "Content packs", desc: "Extra service pages, location pages or articles beyond the monthly plan." },
          { title: "Link building campaigns", desc: "Outreach and digital PR for a specific push, focused on relevant, earned links." },
          { title: "Schema and structured data", desc: "Markup for organisation, local business, FAQ, product and article pages." },
          { title: "Site migration support", desc: "Redirect planning and monitoring when you move or redesign a site." },
          { title: "AEO and GEO projects", desc: "Answer-first rewrites and entity clean-up so AI search tools can understand your business." },
        ],
      },
      {
        kind: "text",
        id: "why-scoped",
        title: "Why we scope SEO instead of counting keywords",
        paragraphs: [
          "A keyword count says little about the work. Ranking for ten easy local phrases is very different from competing for three highly competitive ones, and the number of keywords does not show how many pages, fixes or links the job needs.",
          "We write down the pages, fixes, content and locations the plan covers, so you can compare our quote with any other on the same terms.",
        ],
      },
    ],
  },

  seoDoctors: {
    heroCta: { label: "Get a Free Healthcare SEO Audit", href: "#audit-form" },
    quickAnswer: {
      heading: "What is healthcare SEO for doctors and hospitals?",
      answer: "Healthcare SEO helps doctors, clinics and hospitals in Ahmedabad appear when patients search for treatments, doctors and nearby care. It combines a complete Google Business Profile, treatment and doctor pages, technical fixes and careful, informational content, and it tracks calls and appointment requests rather than only traffic.",
    },
    leadForm: form({ formName: "seo-healthcare-audit", service: "Healthcare SEO audit", heading: "Get a free healthcare SEO audit", text: "Tell us about your practice or hospital. " + NO_PATIENT_DATA, notesLabel: "Specialties and locations (optional)", submitLabel: "Get My Free Healthcare Audit", successText: "Thank you. We will review your details and reply by email." }),
    faqTitle: "Healthcare SEO FAQs",
    sources: [GOOGLE_HELPFUL, { label: "Google Search Central: Introduction to structured data", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" }, GOOGLE_ADS_POLICY],
    extraAdd: [
      {
        kind: "text",
        id: "websites-and-seo",
        title: "Websites and SEO together",
        paragraphs: ["Speed, page structure and schema are easiest to get right when the website is built with SEO in mind. We design and build healthcare websites as well as optimise them, so doctor profiles, treatment pages and booking routes work for patients and search engines from the start."],
        links: [{ label: "Website design for doctors and hospitals", href: "/website-design-for-doctors-ahmedabad/" }],
      },
    ],
  },

  seoManufacturers: {
    heroCta: { label: "Get a Free B2B SEO Audit", href: "#audit-form" },
    quickAnswer: {
      heading: "What is B2B SEO for manufacturers?",
      answer: "B2B SEO for Gujarat manufacturers puts your products in front of buyers searching by product, specification, standard or supplier. It builds structured catalogue and specification pages, an RFQ form that captures product and quantity, and export-ready pages, so your own website brings in qualified requests for quotation.",
    },
    leadForm: form({ formName: "seo-b2b-audit", service: "B2B SEO audit", heading: "Get a free B2B SEO audit", text: "Share your website, products and target markets. We will send a prioritised plan.", notesLabel: "Main products and target markets (optional)", submitLabel: "Get My Free B2B SEO Audit", successText: "Thank you. We will review your website and reply by email." }),
    faqTitle: "B2B SEO FAQs",
    sources: [GOOGLE_SEO_GUIDE, { label: "Google Search Central: Managing multi-regional and multilingual sites", href: "https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites" }],
  },

  googleAdsPricing: {
    heroCta: { label: "Get a Written Google Ads Quote", href: "#audit-form" },
    quickAnswer: {
      heading: "How much does Google Ads cost in Ahmedabad?",
      answer: "Google Ads cost has three parts: ad spend paid to Google, a management fee paid to your agency, and GST. You control the ad spend. The fee depends on scope and account complexity. Use the break-even calculator below to find the most you can pay per enquiry before ads start losing money.",
    },
    leadForm: form({ formName: "google-ads-quote", service: "Google Ads quote", heading: "Get a written Google Ads quote", text: "Tell us your business, goal and rough budget. We will send a clear, written quote.", notesLabel: "Monthly ad spend and goal (optional)", submitLabel: "Get My Google Ads Quote", successText: "Thank you. We will review your details and reply by email." }),
    faqTitle: "Google Ads Pricing FAQs",
    sources: [GOOGLE_ADS_HELP, GOOGLE_ADS_POLICY],
  },

  googleAdsDoctors: {
    heroCta: { label: "Book a Free Healthcare Ads Review", href: "#audit-form" },
    quickAnswer: {
      heading: "Can doctors and hospitals run Google Ads in India?",
      answer: "Clinics and hospitals in Ahmedabad can advertise on Google Search within Google's healthcare policy and the professional and advertising rules that apply to them. Safe campaigns focus on services, location and booking, avoid cure or superiority claims, and measure booked appointments. Confirm what applies to you with your legal adviser.",
    },
    leadForm: form({ formName: "google-ads-healthcare-review", service: "Healthcare Google Ads review", heading: "Book a free healthcare Google Ads review", text: "Tell us about your practice. " + NO_PATIENT_DATA, notesLabel: "Specialty and monthly ad spend (optional)", submitLabel: "Book My Free Review", successText: "Thank you. We will review your details and reply by email." }),
    faqTitle: "Google Ads for Doctors FAQs",
    sources: [GOOGLE_ADS_POLICY, { label: "Google Ads policy: Healthcare and medicines", href: "https://support.google.com/adspolicy/answer/176031" }, GOOGLE_ADS_HELP],
    extraAdd: [
      {
        kind: "cards",
        id: "specialty-notes",
        title: "Specialty notes",
        subtext: "Typical searches and the care each specialty needs. Policies for some specialties are stricter, so we check the current rules before any campaign launches.",
        items: [
          { title: "IVF and fertility", desc: "Sensitive topic with stricter advertising rules. We avoid success-rate and outcome claims and check Google's current policy first." },
          { title: "Eye care", desc: "Consultation and procedure searches. Facts about facilities and technology only, with no guarantee of results." },
          { title: "Dental", desc: "High local intent: 'dentist near me' and treatment searches. Strong fit for call and location assets." },
          { title: "Orthopaedics and physiotherapy", desc: "Condition and procedure searches. Focus on consultation booking and clear information." },
          { title: "Dermatology and aesthetics", desc: "Extra care with imagery and claims. We avoid before-and-after material in ads." },
          { title: "Diagnostics and multi-specialty hospitals", desc: "Test, package and department searches. Separate campaigns by service line, with urgent searches handled by call-first ads." },
        ],
      },
      {
        kind: "checklist",
        id: "preflight",
        title: "Pre-flight checklist for healthcare ads",
        subtext: "Questions to settle before spending. " + "It is a working checklist, not legal advice.",
        groups: [
          { title: "Claims and wording", items: ["No cure, guarantee or success-rate claims", "No 'best' or 'No. 1' without proof", "Accreditations mentioned only if you hold them", "Wording reviewed by your own legal adviser"] },
          { title: "People and imagery", items: ["Whether the doctor's name may be used in ads", "No patient testimonials or before-and-after images in ads", "Awards and rankings only if verifiable"] },
          { title: "Data and tracking", items: ["No patient names, symptoms or diagnoses sent to analytics or ad tools", "Forms collect only what is needed to book", "Consent wording and a privacy policy on the landing page"] },
          { title: "Landing page and follow-up", items: ["Fast mobile page with click-to-call and WhatsApp", "Registration and accreditation details displayed accurately", "Front desk ready to answer within minutes", "A record of approved ad copy"] },
        ],
      },
    ],
  },

  metaAdsPricing: {
    heroCta: { label: "Get a Fixed Meta Ads Quote", href: "#audit-form" },
    quickAnswer: {
      heading: "How much do Meta ads cost in Ahmedabad?",
      answer: "Meta ads cost has two budgets: the management fee you pay an agency and the ad spend you pay Meta from your own ad account. Your fee should list what it covers, what is extra and how to exit. Use the break-even calculator below to see the most you can pay per lead.",
    },
    leadForm: form({ formName: "meta-ads-quote", service: "Meta Ads quote", heading: "Get a fixed Meta ads quote", text: "Tell us about your offer and goal. We will send a clear, written quote.", notesLabel: "Monthly ad spend and goal (optional)", submitLabel: "Get My Meta Ads Quote", successText: "Thank you. We will review your details and reply by email." }),
    faqTitle: "Meta Ads Pricing FAQs",
    sources: [META_STANDARDS, { label: "Meta Business Help Centre", href: "https://www.facebook.com/business/help" }],
  },

  metaAdsClinics: {
    heroCta: { label: "Get a Free Clinic Ad Review", href: "#audit-form" },
    quickAnswer: {
      heading: "Can clinics and doctors run Meta ads?",
      answer: "Clinics and hospitals can run Facebook and Instagram ads within Meta's health advertising policies and the rules that apply to them. That means no implying a person has a condition, no cure claims and no sensitive health questions in lead forms. We focus on bookings through WhatsApp, measured as booked appointments.",
    },
    leadForm: form({ formName: "meta-ads-clinic-review", service: "Clinic Meta Ads compliance and account review", heading: "Get a free clinic ad compliance and account review", text: "Tell us about your clinic. " + NO_PATIENT_DATA, notesLabel: "Specialty and current ad set-up (optional)", submitLabel: "Book My Free Review", successText: "Thank you. We will review your details and reply by email." }),
    faqTitle: "Meta Ads for Clinics FAQs",
    sources: [META_STANDARDS, GOOGLE_ADS_POLICY],
    extraAdd: [
      {
        kind: "cards",
        id: "specialty-playbooks",
        title: "Playbooks by specialty",
        subtext: "Typical campaign focus and the main policy watch-out. We confirm current rules before launch.",
        items: [
          { title: "Dental clinics", desc: "Consultation and check-up offers with click-to-WhatsApp booking. Avoid before-and-after images." },
          { title: "Skin and aesthetic clinics", desc: "Strict rules on body-image and result claims. Target adults only and keep language neutral." },
          { title: "IVF and fertility", desc: "Sensitive. No success-rate claims, careful audience handling and sensitive wording." },
          { title: "Eye hospitals", desc: "Screening and consultation awareness with facility and technology facts only." },
          { title: "Orthopaedic, spine and physiotherapy", desc: "Consultation campaigns and education Reels, with no outcome promises." },
          { title: "Multi-speciality hospitals", desc: "Health check-up packages and OPD awareness, split by department." },
        ],
      },
    ],
  },
};

export const phase2WebEnhancements: Record<string, Enhancement> = {
  websiteDevCost: {
    heroCta: { label: "Get My Fixed-Price Website Quote", href: "#audit-form" },
    quickAnswer: {
      heading: "How much does a website cost in Ahmedabad?",
      answer: "Website cost depends on five things: the type of site, how many unique page layouts it needs, the features and integrations, who prepares the content, and the platform. Ask every vendor what is included in design, build, SEO set-up, speed work, hosting and support, and who owns the site afterwards.",
    },
    leadForm: form({ formName: "website-quote", service: "Website development quote", heading: "Get your fixed-price website quote", text: "Tell us what you are building. We will send a written scope and fee.", notesLabel: "What are you building? (optional)", notesPlaceholder: "Type of site, rough number of pages, any special features", submitLabel: "Get My Website Quote", successText: "Thank you. We will review your brief and reply by email." }),
    faqTitle: "Website Cost FAQs",
    sources: [WEB_VITALS, GOOGLE_SEO_GUIDE],
    extraAdd: [
      {
        kind: "cards",
        id: "example-briefs",
        title: "Four example briefs and what each needs",
        subtext: "Scope examples, not price quotes. Your own brief is quoted in writing.",
        items: [
          { title: "A clinic website", desc: "Doctor profiles, treatment pages, a WhatsApp or request-form booking route, Google Business Profile and careful, doctor-reviewed content." },
          { title: "A manufacturer catalogue", desc: "A structured product catalogue, specification tables, certificate downloads and an RFQ form that captures product and quantity." },
          { title: "A D2C online store", desc: "Catalogue, payments, shipping, order emails and product schema on Shopify or WooCommerce." },
          { title: "A booking system", desc: "Logins, calendars, payments and reminders. This usually needs a custom build and is scoped separately." },
        ],
      },
    ],
  },
  websiteDesignCost: {
    heroCta: { label: "Get My Design Quote", href: "#audit-form" },
    quickAnswer: {
      heading: "How much does website design cost in Ahmedabad?",
      answer: "Website design cost depends on how many unique page layouts you need, how custom the visual design is, and how much brand and content work comes with it. Design covers structure, wireframes, visual design and mobile layouts. Development, which builds the site, is separate, although many agencies quote the two together.",
    },
    leadForm: form({ formName: "website-design-quote", service: "Website design quote", heading: "Request a website design quote", text: "Send your references, page list and deadline. We will reply with a clear written quote.", notesLabel: "Reference sites, page list and deadline (optional)", submitLabel: "Get My Design Quote", successText: "Thank you. We will review your brief and reply by email." }),
    faqTitle: "Website Design Cost FAQs",
    sources: [WEB_VITALS, GOOGLE_HELPFUL],
  },
  websitePackages: {
    heroCta: { label: "Choose a Package", href: "#audit-form" },
    quickAnswer: {
      heading: "What website packages do you offer?",
      answer: "Our website packages are Starter, Business, Growth and Custom. Starter is a small focused site, Business a complete lead-generating site, Growth a site built to win search and convert paid traffic, and Custom covers logins, bookings, payments and integrations. Use the picker below, then get a written quote.",
    },
    leadForm: form({ formName: "website-package-quote", service: "Website package quote", heading: "Choose a package and get a written quote", text: "Tell us which package fits, or describe your project and we will recommend one.", notesLabel: "Package you are considering and your goal (optional)", submitLabel: "Get My Package Quote", successText: "Thank you. We will review your details and reply by email." }),
    faqTitle: "Website Package FAQs",
    sources: [WEB_VITALS, GOOGLE_SEO_GUIDE],
  },
  websiteDoctors: {
    heroCta: { label: "Book a Free Website Review", href: "#audit-form" },
    quickAnswer: {
      heading: "What should a doctor or hospital website have?",
      answer: "A good doctor or hospital website answers three questions fast: do you treat my problem, can I trust the doctor, and how do I book. It needs clear treatment and doctor pages, real credentials, fast mobile pages, a simple booking route and careful, factual wording, reviewed by your doctors.",
    },
    leadForm: form({ formName: "website-doctors-review", service: "Doctor and hospital website review", heading: "Book a free website review", text: "Tell us about your practice or hospital. " + NO_PATIENT_DATA, notesLabel: "Specialties and what you want from the website (optional)", submitLabel: "Book My Free Review", successText: "Thank you. We will review your details and reply by email." }),
    faqTitle: "Doctor and Hospital Website FAQs",
    sources: [GOOGLE_HELPFUL, WEB_VITALS, { label: "Google Search Central: Introduction to structured data", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" }],
  },
  websiteManufacturers: {
    heroCta: { label: "Get My Catalogue and RFQ Plan", href: "#audit-form" },
    quickAnswer: {
      heading: "What should a manufacturer or exporter website have?",
      answer: "A manufacturer or exporter website should prove capability, show structured product and specification data and certificates, and capture a request for quotation with product, quantity and country. A brochure site does not do this. We build catalogue and RFQ sites that buyers can use and search engines can read.",
    },
    leadForm: form({ formName: "website-manufacturers-plan", service: "Manufacturer website: catalogue and RFQ plan", heading: "Send your product list and get a catalogue and RFQ plan", text: "Share your products, markets and current website.", notesLabel: "Main products and target markets", submitLabel: "Get My Catalogue Plan", successText: "Thank you. We will review your products and reply by email." }),
    faqTitle: "Manufacturer Website FAQs",
    sources: [GOOGLE_SEO_GUIDE, WEB_VITALS, { label: "Google Search Central: Managing multi-regional and multilingual sites", href: "https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites" }],
    extraAdd: [
      {
        kind: "cards",
        id: "sector-playbooks",
        title: "What each Gujarat sector needs on its website",
        items: [
          { title: "Chemicals and pharma", desc: "Safety data sheets and certificates of analysis as downloads, regulatory information and careful handling of restricted documents." },
          { title: "Engineering and machinery", desc: "Capability lists, drawings, tolerances and material tables." },
          { title: "Plastics and polymers", desc: "Grades, properties and application pages." },
          { title: "Textiles and apparel", desc: "Fabric ranges, MOQ information, lookbooks and certifications." },
          { title: "Ceramics and tiles", desc: "Catalogues by size and finish, with high-quality images." },
          { title: "Food and agro", desc: "Product specifications, packaging, certifications and export documents." },
        ],
      },
    ],
  },
};
