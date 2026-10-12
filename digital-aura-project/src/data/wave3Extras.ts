import type { Enhancement } from "@/data/pageEnhancements";

/**
 * Wave 3: blueprint sections that were still missing from the cluster pages and can be written without owner data.
 * Content is process, checklist and explanation only: no prices, no results, no client names, no new numeric claims.
 * A section with `after` is inserted right after the section with that id; the rest are appended before the FAQ.
 */
export const wave3Extras: Record<string, Enhancement> = {
  /* ───────────── web-04: redesign ───────────── */
  websiteRedesign: {
    extraAdd: [
      {
        kind: "cards",
        id: "platform-paths",
        after: "ranking-risks",
        title: "Which platform should the redesigned site run on?",
        subtext: "A redesign does not always need a new platform. These are the common paths, and the search work each one needs.",
        items: [
          { tag: "Same platform", title: "WordPress to a clean WordPress build", desc: "Often the safest path. URLs can stay the same, so rankings are least at risk. The work is replacing a heavy theme and stacked plugins with a lean build, and keeping titles, headings and internal links." },
          { tag: "Moving in", title: "Wix, Weebly, Joomla, Drupal or old PHP to WordPress", desc: "URLs almost always change, so a full old-to-new URL map and 301 redirects are essential. Content, images, forms and metadata have to be moved by hand or script, then checked page by page." },
          { tag: "Only when needed", title: "WordPress to Next.js", desc: "Makes sense when you need custom features, portals or very high speed on large catalogues. It does not rank better by itself. It adds build and hosting work, so we use it only where the project needs it." },
          { tag: "Ecommerce", title: "WooCommerce, Shopify or Magento replatforming", desc: "Product and category URLs, product feeds, structured data and order history all need a plan. A store that changes platform without redirects can lose its product pages from Google quickly." },
        ],
        footnote: "We recommend the platform that fits your goals, not the one that is easiest for us to build. The choice and the reasons are written in your proposal.",
      },
      {
        kind: "checklist",
        id: "launch-day-checks",
        after: "cost-and-time",
        title: "The launch-day checks that protect your rankings",
        subtext: "This is the list we work through before and on the day a redesigned site goes live. You can use it to check any agency's launch plan.",
        groups: [
          { title: "Before launch, on the staging site", items: ["Every important old URL is listed and mapped to a new URL", "Page titles, meta descriptions and headings carried over or improved on purpose", "Internal links, image alt text and structured data are in place", "Staging is blocked from search so it is not indexed by mistake", "Forms, call buttons and WhatsApp buttons work on mobile"] },
          { title: "On launch day", items: ["The staging block is removed (the most common launch mistake is leaving noindex on)", "301 redirects are live for every changed URL", "The XML sitemap is updated and submitted in Search Console", "Analytics and conversion tracking are firing on the live site", "Canonical tags point to the live addresses, not to staging"] },
          { title: "In the weeks after", items: ["Search Console is checked for crawl errors and newly missing pages", "Old URLs that still get visits are confirmed to redirect once, not in a chain", "Impressions, clicks and enquiries are compared with the weeks before launch", "Speed and Core Web Vitals are re-tested on real mobile devices"] },
        ],
        footnote: "Rankings can move for a few weeks after any site change. A planned launch keeps that movement small and short.",
      },
      {
        kind: "text",
        id: "after-launch-care",
        title: "After launch: monitoring, support and maintenance",
        paragraphs: [
          "A redesign is not finished on launch day. The first weeks are when problems show up: a redirect that was missed, a page that Google has not picked up, a form that stopped sending email. We review Search Console and enquiries after launch and report what changed, so nothing is left to chance.",
          "Once the site is stable, it still needs updates, backups and security checks. Many clients move to a monthly care plan at that point, and the scope and terms of that plan are written down before you commit.",
        ],
        links: [{ label: "Website maintenance and AMC", href: "/website-maintenance-amc-ahmedabad/" }, { label: "Free rankings-at-risk review", href: "#audit-form" }],
      },
    ],
  },

  /* ───────────── web-05: maintenance / AMC ───────────── */
  websiteMaintenance: {
    extraAdd: [
      {
        kind: "checklist",
        id: "every-plan-includes",
        after: "by-platform",
        title: "What a good maintenance plan should include",
        subtext: "Use this as a yardstick for any AMC, ours or someone else's. Each line has a reason.",
        groups: [
          { title: "Keeping it current", items: ["Core, theme and plugin updates, tested on a staging copy first (untested updates are a common cause of broken sites)", "Plugin and theme licence tracking, so nothing quietly expires", "Domain, hosting and SSL renewal dates tracked, so the site never lapses"] },
          { title: "Keeping it safe", items: ["Off-site backups, with a restore test now and then (a backup that cannot be restored is not a backup)", "Malware scanning and firewall rules", "Login hardening and user-account clean-up"] },
          { title: "Keeping it working", items: ["Uptime monitoring with alerts to a person who will act", "Form, checkout and email-delivery tests (a form that fails silently loses enquiries)", "Broken-link checks and a speed review", "Google Analytics and Search Console health checks"] },
          { title: "Keeping you informed", items: ["A short monthly report: updates applied, backups verified, issues fixed, what is recommended next", "A named person to contact and a stated way to raise urgent problems"] },
        ],
        footnote: "Which of these are included, and how often, is listed in your plan. Items that depend on hosting access are marked, because they can only be as strong as the access we are given.",
      },
      {
        kind: "cards",
        id: "severity-levels",
        after: "if-hacked",
        title: "How we sort problems by urgency",
        subtext: "Not every issue is an emergency. Sorting them is how the serious ones get fixed first.",
        items: [
          { tag: "Highest", title: "Site down or hacked", desc: "Treated first. We confirm the cause, restore from a clean backup where needed, close the way in and tell you what happened." },
          { tag: "High", title: "Checkout, payments or forms broken", desc: "Enquiries or orders are being lost, so these come next. We test the full path from the visitor's side after the fix." },
          { tag: "High", title: "Security alert", desc: "A vulnerable plugin or a suspicious login. We patch or isolate it before it can be used against the site." },
          { tag: "Normal", title: "Content change", desc: "Text, image, doctor or product updates, handled in the order they arrive and within the hours your plan includes." },
          { tag: "Planned", title: "Minor bug or improvement", desc: "Small visual or layout issues, batched into the monthly work so they do not interrupt more urgent items." },
        ],
        footnote: "Response and fix targets for each level, support hours and channels are written in your plan. Outages caused by a hosting provider or another third party are outside what we control, and we will say so plainly.",
      },
      {
        kind: "compare",
        id: "not-included",
        title: "What is and is not part of a maintenance plan",
        subtext: "Most disagreements about AMC come from assuming something was included. We would rather list it.",
        left: { title: "Usually included", tone: "good", items: ["Updates, backups, security and uptime monitoring", "Small content edits within the allotted hours", "Speed, form and checkout checks", "A monthly report and a point of contact"] },
        right: { title: "Usually separate", tone: "bad", items: ["Hosting, domain renewal and paid SSL", "Premium plugin or theme licences and third-party app fees", "New pages, new features or a redesign", "SEO and advertising as ongoing services", "Extra work beyond the plan, quoted before it starts"] },
        footnote: "Pass-through costs such as hosting or licences are billed at what they cost, or managed for you if you prefer. Your plan says which.",
      },
      {
        kind: "cards",
        id: "maintenance-by-sector",
        title: "Maintenance for doctors, manufacturers and online stores",
        subtext: "The checks that matter depend on what the website is for.",
        items: [
          { title: "Doctors and hospitals", desc: "Doctor and timing updates, booking-form tests, consent and privacy-wording checks, and fast fixes when a number or address changes.", href: "/website-design-for-doctors-ahmedabad/" },
          { title: "Manufacturers and exporters", desc: "Product and certificate updates, RFQ form and file-upload tests, multilingual page checks, and catalogue speed on slower overseas connections.", href: "/website-design-for-manufacturers-ahmedabad/" },
          { title: "Online stores", desc: "Checkout, payment and order-email tests after every update, stock and price sync checks, and database clean-up as order history grows." },
        ],
      },
    ],
  },

  /* ───────────── web-06: doctors website ───────────── */
  websiteDoctors: {
    extraAdd: [
      {
        kind: "cards",
        id: "industry-pages",
        title: "Website guides for specific specialities",
        subtext: "Different practices need different pages, wording and tools.",
        items: [
          { title: "Dentists", desc: "Treatment pages, doctor profiles and easy booking.", href: "/website-design-for-dentists-ahmedabad/" },
          { title: "Ophthalmologists and eye hospitals", desc: "Accessible design, camps and appointment tools.", href: "/website-design-for-ophthalmologists-ahmedabad/" },
        ],
      },
      {
        kind: "cards",
        id: "staff-updates",
        after: "cms-security",
        title: "What your staff can update without a developer",
        subtext: "A hospital website changes every week. Your reception team should be able to keep it current.",
        items: [
          { title: "Add a doctor once", desc: "A doctor's profile feeds the department page, the doctors directory and site search, so one entry is enough and details never disagree." },
          { title: "Change timings in one place", desc: "OPD hours, leave and holiday notices are edited centrally and show up everywhere the timing appears." },
          { title: "Publish notices and packages", desc: "News, health-check packages, camps and announcements go live without touching the design." },
          { title: "Roles and permissions", desc: "Reception can edit timings, a marketing person can publish articles, and only an administrator can change settings or users." },
          { title: "Training and a walkthrough", desc: "A short hands-on session at handover, plus a recorded walkthrough your team can replay when someone new joins." },
        ],
        footnote: "We build on a content management system your team owns the logins to, and we explain who holds the admin accounts at handover.",
      },
      {
        kind: "compare",
        id: "safe-wording",
        after: "compliance",
        title: "Safer and riskier wording on a medical website",
        subtext: "General guidance for choosing words. Medical advertising rules are specific, so every claim is checked with the doctor and, where needed, your legal adviser before it goes live.",
        left: { title: "Safer: factual and informative", tone: "good", items: ["Consultant Orthopaedic Surgeon, MS Orthopaedics, registration number shown", "Services offered, address, timings and how to book", "Plain explanations of a condition and when to see a doctor", "Facilities, equipment and the process of a consultation"] },
        right: { title: "Riskier: promotional or absolute", tone: "bad", items: ["\"Best doctor in Ahmedabad\" or \"number one hospital\"", "\"100% cure\", \"guaranteed results\" or \"painless\"", "Identifiable before-and-after photos or patient testimonials", "Fear-based copy or pressure to book immediately"] },
        footnote: "We are a web agency, not legal advisers. Please confirm what you may publish with your medical council or legal counsel.",
      },
    ],
  },

  /* ───────────── web-07: manufacturers website ───────────── */
  websiteManufacturers: {
    extraAdd: [
      {
        kind: "checklist",
        id: "product-page-data",
        after: "catalogue",
        title: "What a product page should carry",
        subtext: "Buyers compare suppliers on specifications. A page that states them clearly is easier for people and for search engines to understand.",
        groups: [
          { title: "Identity and specification", items: ["Product name and code", "Material or grade, dimensions and tolerance", "Standards the product meets", "Typical applications"] },
          { title: "Commercial details", items: ["Minimum order quantity and packaging unit", "Lead-time range", "Customisation options", "Available certificates and test reports"] },
          { title: "Documents buyers ask for", items: ["Datasheet or technical drawing to download", "Safety data sheet, TDS or COA for chemicals", "GSM, composition and swatches for textiles", "FSSAI, shelf life and packing for food and agro"] },
          { title: "The next step", items: ["An RFQ button that carries the product name with it", "A WhatsApp option for quick questions", "Related products and the category they belong to"] },
        ],
        footnote: "Only values approved by someone who knows the product are published. Where a value varies, the page says \"subject to approved specification\" instead of guessing.",
      },
      {
        kind: "checklist",
        id: "rfq-form-fields",
        after: "rfq",
        title: "RFQ form fields that matter, and what happens after submit",
        subtext: "A short form gets sent. A form that asks the right things saves a day of back-and-forth.",
        groups: [
          { title: "Who is asking", items: ["Company name, contact person and business email", "Phone or WhatsApp number", "Country and destination city or port"] },
          { title: "What they need", items: ["Product or model (pre-filled from the page they came from)", "Specification or drawing upload", "Quantity and unit", "Sample or customisation need and target delivery window"] },
          { title: "Handling the enquiry", items: ["Each enquiry carries its source page and product", "Spam and vendor-solicitation filtering", "An owner is assigned and an auto-reply sends the catalogue link", "Status is tracked from received to quoted to won or lost"] },
          { title: "Keeping files safe", items: ["Uploaded drawings go to private storage, never a public URL", "File type and size limits, with malware scanning", "A consent line for how the data is used"] },
        ],
        footnote: "Conditional fields keep the form short: a sample request shows sample questions only. Which CRM, email or WhatsApp tools it connects to is agreed per project.",
      },
    ],
  },

  /* ───────────── web-03: packages ───────────── */
  websitePackages: {
    extraAdd: [
      {
        kind: "cards",
        id: "third-party-costs",
        after: "exclusions",
        title: "Costs you pay directly to other companies",
        subtext: "These are not part of any agency's fee, and a quote that never mentions them is incomplete.",
        items: [
          { title: "Domain name", desc: "Registered in your name and renewed every year or every few years." },
          { title: "Hosting", desc: "Where the site lives. Speed and uptime depend heavily on it, and the account should be in your name." },
          { title: "Premium plugins, themes and licences", desc: "Some features rely on paid tools that renew annually. Your quote should list which ones." },
          { title: "Payment gateway fees", desc: "Razorpay, PayU and similar providers charge per transaction. This applies to online stores and online booking." },
          { title: "Email, SMS and WhatsApp services", desc: "Business email, bulk email tools and the WhatsApp Business API are usually billed by their own providers." },
          { title: "Stock photos, fonts and video", desc: "Licensed assets are paid for separately unless you supply your own." },
        ],
        footnote: "We list the third-party costs that apply to your site in the proposal, so there are no surprises after launch.",
      },
    ],
  },

  /* ───────────── web-01: development cost ───────────── */
  websiteDevCost: {
    extraAdd: [
      {
        kind: "checklist",
        id: "ten-questions",
        after: "compare-quotes",
        title: "Ten questions to ask before you pay any web agency",
        subtext: "Ask them of us as well. The answers should be easy to give and easy to put in writing.",
        groups: [
          { title: "Scope and price", items: ["What exactly is included, page by page and feature by feature?", "Which items are not included and would be billed separately?", "How are changes to the scope handled and priced?", "What recurring costs will I pay after launch?"] },
          { title: "People and process", items: ["Who will actually build my site, and can I see their live work on my phone?", "What do you need from me, and by when, to keep the timeline?", "How many revision rounds are included?"] },
          { title: "Ownership and exit", items: ["Will the domain, hosting and admin logins be in my name?", "Do I receive the design files and code at handover?", "What happens if I want to move to another provider?"] },
        ],
        footnote: "A vendor who hesitates over any of these is telling you something. A good quote answers them without being asked.",
      },
    ],
  },

  /* ───────────── web-02: design cost ───────────── */
  websiteDesignCost: {
    faqAdd: [
      { q: "Why do some Ahmedabad designers charge Rs 5,000 and others Rs 1,00,000?", a: "They are usually selling different products. A low fee often means a ready-made template with your logo and text dropped in. A higher fee usually covers research, a layout planned around your customers, custom design for mobile and desktop, and revisions. Compare the deliverables, not only the figure." },
    ],
    extraAdd: [
      {
        kind: "cards",
        id: "design-inputs",
        after: "factors",
        title: "The seven things that set a design fee",
        subtext: "These are the questions behind any design estimate. Answer them and a quote becomes much easier to compare.",
        items: [
          { tag: "1", title: "Approach", desc: "Template-based, semi-custom, fully custom or a design system built for a large site." },
          { tag: "2", title: "Number of unique layouts", desc: "A home page, a service page and a blog page are three layouts, however many pages use them." },
          { tag: "3", title: "Section depth", desc: "A short page and a long, interactive page take very different amounts of design time." },
          { tag: "4", title: "Mobile prototype", desc: "Whether the mobile design is shown and approved on its own before development starts." },
          { tag: "5", title: "Brand work", desc: "No change, a refresh of the current identity or a new identity from scratch." },
          { tag: "6", title: "Languages", desc: "Extra languages such as Gujarati or Hindi change type and layout work, not only the words." },
          { tag: "7", title: "Imagery", desc: "Client-supplied photos, stock, a photoshoot or illustration." },
        ],
        footnote: "Ask any agency to show how these seven inputs lead to their figure. A fee that cannot be explained this way is hard to compare.",
      },
      {
        kind: "cards",
        id: "approval-gates",
        after: "revisions",
        title: "Approval gates: what you sign off, and when",
        subtext: "Work moves forward only after you approve the previous stage, so a change of mind costs the least it can.",
        items: [
          { tag: "Gate 1", title: "Sitemap", desc: "Which pages exist and how they connect. Changing this later is the most expensive change of all." },
          { tag: "Gate 2", title: "Wireframes", desc: "The layout of each page type in grey boxes, so you judge structure before colour and imagery." },
          { tag: "Gate 3", title: "Design mockups", desc: "The look of the key pages with real text and imagery. This is the main review round." },
          { tag: "Gate 4", title: "Mobile design", desc: "How the same pages work on a phone, where most of your visitors will see them." },
          { tag: "Gate 5", title: "Launch review", desc: "A final check on the live-ready site: forms, links, speed and content before it goes public." },
        ],
        footnote: "A revision round is one consolidated list of changes to an approved stage. A new idea after approval is a change request and is quoted separately, in writing, before work begins.",
      },
    ],
  },

  /* ───────────── seo-05: SEO for doctors ───────────── */
  seoDoctors: {
    extraAdd: [
      {
        kind: "checklist",
        id: "local-presence",
        after: "who-we-build-for",
        title: "Your local presence: what we set up and keep consistent",
        subtext: "Patients choose from what they see in the map pack, in directories and in reviews. These need to agree with each other.",
        groups: [
          { title: "Google Business Profile", items: ["Correct name, speciality category, address, phone and timings", "Services, doctors and a booking link added", "Fresh photos of the clinic and facilities, with patient privacy respected", "Questions and answers and posts kept current"] },
          { title: "Directories and listings", items: ["The same name, address and phone number on Practo, Lybrate, JustDial and similar listings", "Doctor profiles that match the website", "Duplicate or outdated listings found and merged or removed"] },
          { title: "Reviews", items: ["A simple, genuine way for satisfied patients to leave a Google review", "A calm, professional reply to every review, without confirming patient details", "No incentives, fake reviews or review gating"] },
          { title: "Doctor profile pages", items: ["Qualifications, registration details and years of experience shown accurately", "A real photograph and a short, factual biography", "Links between the doctor, the treatments they perform and the department"] },
        ],
        footnote: "Consistency across these places is one of the clearest signals of a real, trustworthy practice, for patients and for Google.",
      },
      {
        kind: "cards",
        id: "doctor-review-workflow",
        after: "compliance",
        title: "How doctor-reviewed content works",
        subtext: "Health content has to be accurate before it is optimised. The workflow keeps the doctor in control.",
        items: [
          { tag: "Step 1", title: "Topic and outline", desc: "We choose topics from what patients actually search, and write an outline with the questions to answer." },
          { tag: "Step 2", title: "Draft in plain language", desc: "A first draft written for patients, informational and without cure claims or promises." },
          { tag: "Step 3", title: "Doctor review", desc: "The treating doctor corrects facts, adds clinical nuance and approves the final text." },
          { tag: "Step 4", title: "Publish with credentials", desc: "The page shows who reviewed it and when, so patients and search engines can see where it comes from." },
          { tag: "Step 5", title: "Review on a schedule", desc: "Medical information changes, so pages are revisited and the review date is updated." },
        ],
        footnote: "We do not publish medical content that a qualified doctor has not approved.",
      },
    ],
  },

  /* ───────────── seo-06: SEO for manufacturers ───────────── */
  seoManufacturers: {
    extraAdd: [
      {
        kind: "checklist",
        id: "catalogue-technical-seo",
        after: "clusters",
        title: "Technical SEO for product catalogues",
        subtext: "Catalogues create problems that ordinary sites do not have. These are the checks we run on a manufacturer's site.",
        groups: [
          { title: "Structure", items: ["One crawlable page per product family, not one per colour or size", "Variants shown in tables or selectors instead of near-duplicate pages", "Categories linked clearly from the home page and from each other"] },
          { title: "Content Google can read", items: ["Specifications in HTML text, not only inside PDFs or images", "PDF datasheets offered as a download alongside the page, not instead of it", "Filters and search results that do not create endless duplicate URLs"] },
          { title: "Signals and markup", items: ["Product structured data where it is accurate", "Canonical tags for variant and filtered URLs", "Language and country pages marked correctly for export markets", "Fast loading for buyers on slower overseas connections"] },
        ],
        footnote: "These are checks, not guarantees. Rankings depend on competition and on how well each page answers what a buyer is asking.",
      },
    ],
  },

  /* ───────────── meta-03: clinics ───────────── */
  metaAdsClinics: {
    extraAdd: [
      {
        kind: "cards",
        id: "industry-pages",
        title: "Guides for specific healthcare providers",
        subtext: "The rules, audience and measurement differ by type of provider.",
        items: [
          { title: "Dentists", desc: "Local check-up, aligner and implant campaigns.", href: "/meta-ads-agency-ahmedabad/dentists/" },
          { title: "Hospitals", desc: "Department-wise campaigns and check-up packages.", href: "/meta-ads-agency-ahmedabad/hospitals/" },
          { title: "IVF and fertility clinics", desc: "Sensitive, privacy-first campaigns.", href: "/meta-ads-agency-ahmedabad/ivf-fertility-clinics/" },
          { title: "Dermatologists and skin clinics", desc: "Strict-policy creative and consultation booking.", href: "/meta-ads-agency-ahmedabad/dermatologists-skin-clinics/" },
        ],
      },
      {
        kind: "checklist",
        id: "reception-checklist",
        after: "lead-handling",
        title: "A lead-handling checklist for your reception team",
        subtext: "Ads bring the enquiry. The first reply decides whether it becomes an appointment.",
        groups: [
          { title: "In the first minutes", items: ["Reply on WhatsApp or call back as soon as the enquiry arrives", "Use a short, friendly template with the clinic name and the next step", "Ask one question at a time, such as the preferred day and time"] },
          { title: "Booking the appointment", items: ["Offer two time slots instead of an open question", "Confirm the date, doctor and address in writing", "Record the lead status so nothing is forgotten"] },
          { title: "Reducing no-shows", items: ["Send a reminder the day before", "Share how to reach the clinic and where to park", "Offer an easy way to reschedule"] },
          { title: "What to measure", items: ["Enquiries received and how fast each was answered", "Appointments booked and how many were attended", "Cost per booked appointment, not only cost per lead"] },
        ],
        footnote: "Please keep patient health details out of ad forms and out of any shared sheet. Ask only what is needed to book.",
      },
    ],
  },

  /* ───────────── gads-04: Google Ads for doctors ───────────── */
  googleAdsDoctors: {
    extraAdd: [
      {
        kind: "cards",
        id: "industry-pages",
        title: "Google Ads guides for specific specialities",
        subtext: "Search behaviour and policy limits differ by speciality.",
        items: [
          { title: "Dentists", desc: "Near-me and treatment campaigns with call tracking.", href: "/google-ads-for-dentists-ahmedabad/" },
          { title: "IVF and fertility clinics", desc: "Policy-aware search campaigns with privacy-first tracking.", href: "/google-ads-for-ivf-clinics-ahmedabad/" },
        ],
      },
      {
        kind: "cards",
        id: "query-themes",
        after: "how-patients-search",
        title: "Search themes we plan campaigns around",
        subtext: "Patients search in a handful of predictable ways. Each one needs its own campaign, ad wording and landing page.",
        items: [
          { tag: "Condition", title: "Symptom and condition searches", desc: "People who are worried and learning. Best met with informational pages and a clear route to a consultation." },
          { tag: "Treatment", title: "Treatment and procedure searches", desc: "People closer to a decision. These have the strongest intent and get focused campaigns and pages." },
          { tag: "Local", title: "Near me and area searches", desc: "People who want a doctor nearby. Location settings, Google Business Profile and call assets matter most." },
          { tag: "Compare", title: "Cost and comparison searches", desc: "People weighing options. Answered with honest information on what affects a fee, not with price claims." },
          { tag: "Name", title: "Doctor and hospital name searches", desc: "People who already know you. Protected with a brand campaign so competitors do not take the click." },
        ],
        footnote: "Which themes apply depends on your speciality and how many doctors and services you run.",
      },
    ],
  },

  /* ───────────── gads-02: Google Ads pricing ───────────── */
  googleAdsPricing: {
    extraAdd: [
      {
        kind: "cards",
        id: "budget-stages",
        after: "budget-calculator",
        title: "How a budget grows: test, learn, scale",
        subtext: "The first month and the sixth month should not look the same. A staged budget protects you while the data builds.",
        items: [
          { tag: "Stage 1", title: "Test", desc: "A controlled budget on the searches most likely to bring enquiries, with tracking checked before any money is pushed." },
          { tag: "Stage 2", title: "Learn", desc: "The search terms report shows what people actually typed. Waste is blocked and what converts gets more focus." },
          { tag: "Stage 3", title: "Scale", desc: "Budget moves toward campaigns that have cost-per-enquiry data behind them, and away from those that do not." },
          { tag: "Review", title: "Decide", desc: "At each review you compare cost per enquiry with what an enquiry is worth, and agree whether to continue, change or stop." },
        ],
        footnote: "Raising the budget does not fix a tracking or landing page problem. We fix those first.",
      },
    ],
  },

  /* ───────────── meta-02: Meta ads pricing ───────────── */
  metaAdsPricing: {
    extraAdd: [
      {
        kind: "cards",
        id: "meta-budget-stages",
        after: "budget-guidance",
        title: "How a Meta ads budget is usually staged",
        subtext: "Meta needs enough results to learn from. A budget that is too thin stalls, and one that is too big too early wastes money.",
        items: [
          { tag: "Weeks 1 to 2", title: "Set up and test", desc: "Tracking, lead form and WhatsApp handoff are checked first. Then a few audiences and creatives run side by side." },
          { tag: "Weeks 3 to 4", title: "Read the early signals", desc: "We compare cost per lead and, more importantly, lead quality. Creatives that attract the wrong people are stopped." },
          { tag: "Month 2", title: "Back what works", desc: "Budget moves to the audiences and creatives that produced leads your team could use." },
          { tag: "Month 3 on", title: "Scale with care", desc: "Increases are gradual, so results stay stable, and creative is refreshed before it tires out." },
        ],
        footnote: "The right monthly ad spend depends on your goal, your sector and how much a customer is worth. We work that out with you before you commit.",
      },
    ],
  },
  /* ───────────── meta-01: pillar ───────────── */
  metaAdsAhmedabad: {
    extraAdd: [
      {
        kind: "cards",
        id: "industry-pages",
        title: "Meta ads guides by industry",
        subtext: "Each industry has its own audience, rules and way of measuring a lead. Start with the guide closest to your business.",
        items: [
          { title: "Real estate", desc: "Site visits, qualifying forms and RERA-aware ads for builders and brokers.", href: "/meta-ads-agency-ahmedabad/real-estate/" },
          { title: "Hospitals", desc: "Department-wise campaigns, check-up packages and booked OPDs.", href: "/meta-ads-agency-ahmedabad/hospitals/" },
          { title: "Dentists", desc: "Local check-up, aligner and implant campaigns with WhatsApp booking.", href: "/meta-ads-agency-ahmedabad/dentists/" },
          { title: "IVF and fertility clinics", desc: "Sensitive, policy-aware campaigns with privacy-first tracking.", href: "/meta-ads-agency-ahmedabad/ivf-fertility-clinics/" },
          { title: "Dermatologists and skin clinics", desc: "Strict-policy creative, adult targeting and consultation booking.", href: "/meta-ads-agency-ahmedabad/dermatologists-skin-clinics/" },
          { title: "Education and coaching", desc: "Admission-season campaigns and counsellor follow-up.", href: "/meta-ads-agency-ahmedabad/education-coaching/" },
          { title: "Restaurants", desc: "Footfall, bookings and own-channel orders with food reels.", href: "/meta-ads-agency-ahmedabad/restaurants/" },
          { title: "Ecommerce and D2C", desc: "Pixel, Conversions API, catalogue ads and margin-first scaling.", href: "/meta-ads-agency-ahmedabad/ecommerce/" },
        ],
      },
    ],
    faqAdd: [
      { q: "How quickly will I see leads from Meta ads?", a: "Enquiries can start within days of a campaign going live, because ads are reviewed and served quickly. A steady cost per lead takes longer, because the system and our testing need a few weeks of data. Judge the first month on lead quality and direction, not a single day." },
    ],
  },
};
