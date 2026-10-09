import type { Enhancement } from "@/data/pageEnhancements";

/**
 * Extra sections for the Google Ads and Meta ads cluster pages, from the page blueprint (gads-02/03/04, meta-02/03).
 * Content is general and qualitative: no prices, no results, no new numeric claims. A section with `after` is inserted right
 * after the section with that id; the rest are appended.
 */
export const clusterExtras: Record<string, Enhancement> = {
  googleAdsPricing: {
    extraAdd: [
      {
        kind: "cards",
        id: "worked-examples",
        after: "cost-drivers",
        eyebrow: "Worked examples",
        title: "Worked examples: four Ahmedabad scenarios",
        subtext: "How the budget conversation goes for four common businesses. These show how we think, not prices. Your written quote has the figures.",
        items: [
        { tag: "Clinic", title: "A clinic that wants booked appointments", desc: "Search campaigns on treatment and \"near me\" searches, call and WhatsApp tracking, and a landing page with the booking route. The budget is shaped by how many specialities you advertise and how many areas you serve. Success is measured in booked appointments, not clicks." },
        { tag: "Manufacturer", title: "A manufacturer that wants quotation requests", desc: "Search campaigns for product and industrial terms, an RFQ form that captures product and quantity, and feedback when a lead becomes an order. Fewer, higher-value enquiries, so the quality of each enquiry matters more than the cost of each one." },
        { tag: "Online store", title: "An online store with a product feed", desc: "Shopping and Performance Max campaigns fed by a clean product feed, with purchase tracking and values. The budget follows catalogue size and margins, and the break-even test is return on ad spend against your margin." },
        { tag: "Local service", title: "A service business that needs calls this week", desc: "Call-focused Search campaigns for urgent searches, with call assets and an ad schedule that matches when you answer the phone. The budget is shaped by competition for those searches and how many service areas you cover." },
        ],
        footnote: "Examples show structure and what drives budget. They are not promises of leads or cost per lead.",
      },
      {
        kind: "cards",
        id: "contract-reporting",
        after: "red-flags",
        eyebrow: "In the fee",
        title: "Contracts, ownership and reporting included in the fee",
        subtext: "What you should be able to see in writing before you start.",
        items: [
        { title: "Contract and notice terms", desc: "Written in your proposal before you decide, so there is nothing to find out later." },
        { title: "Account ownership", desc: "Campaigns run inside your own Google Ads and Google Analytics accounts, so the history and data stay yours." },
        { title: "Ad spend paid to Google", desc: "Your ad budget goes to Google, and you can see it in your own account. The management fee pays for the work." },
        { title: "Conversion tracking", desc: "Calls, WhatsApp clicks and form leads counted as conversions in your account." },
        { title: "Monthly report", desc: "A report on enquiries and cost per enquiry, and a call to agree what happens next." },
        { title: "Access for you", desc: "You keep admin access and can look at the account at any time." },
        ],
        footnote: "The exact inclusions are listed in your written quote.",
      },
      {
        kind: "text",
        id: "about-guide",
        eyebrow: "About this guide",
        title: "Who is behind this guide",
        paragraphs: [
          "This guide is published by Digital Aura, a digital marketing and web development agency based at 713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad. The agency is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing, and has delivered 750+ projects for 120+ clients.",
          "We write about Google Ads pricing in plain terms so you can judge any provider, including us. We update this page when our process or terms change, and the date at the top shows when it was last reviewed.",
        ],
        links: [{ label: "About Digital Aura", href: "/about/" }, { label: "Founder on LinkedIn", href: "https://www.linkedin.com/in/sambhav-shah/" }, { label: "Contact us", href: "/contact/" }],
      },
    ],
  },
  googleAdsAudit: {
    extraAdd: [
      {
        kind: "checklist",
        id: "audit-points",
        after: "checklist",
        eyebrow: "The 40 checks",
        title: "The 40 checks inside those nine groups",
        subtext: "A plain list you can use on any account, ours or someone else's.",
        groups: [
        { title: "Conversion tracking", items: ["A primary conversion exists for each business goal", "Conversions are not counted twice", "Phone calls from ads and call clicks are counted", "WhatsApp clicks are counted", "Conversion values are set where they matter"] },
        { title: "Account structure", items: ["Campaigns are split by intent, product or service", "Budgets match the importance of each campaign", "Campaigns are not bidding against each other", "Brand and non-brand searches are kept apart", "Naming is clear enough for anyone to read"] },
        { title: "Keywords and match types", items: ["Keywords map to what you actually sell", "Match types suit the amount of data you have", "Broad match is not running without conversion data", "A negative keyword list exists and is kept up to date", "Duplicate or overlapping keywords are removed"] },
        { title: "Search terms", items: ["Irrelevant searches are blocked", "Searches that convert get their own focus", "Competitor and job-seeker searches are handled on purpose", "The search terms report is reviewed on a schedule"] },
        { title: "Ads and assets", items: ["Each ad group has current, relevant ads", "Headlines match what was searched", "Sitelinks, call and location assets are in use", "Ads state a clear offer and next step", "Ad variants are tested, not left running for months"] },
        { title: "Settings and targeting", items: ["Location targeting reaches people in the area, not only people interested in it", "Language settings match your customers", "Device results are checked and bids adjusted if needed", "The ad schedule matches when you can answer", "Network settings match the goal of the campaign"] },
        { title: "Bidding and budgets", items: ["The bid strategy suits the conversion data you have", "Targets are realistic for your market", "Budgets are not limiting the best campaigns", "Spend is not drifting to low-value campaigns"] },
        { title: "Landing pages", items: ["Pages load fast on mobile", "The page matches the message of the ad", "There is one clear action to take", "Calling and WhatsApp are easy to reach"] },
        { title: "Search intent and conversion", items: ["Keywords and ads match what the searcher wants", "Trust signals such as reviews and credentials are on the page", "The form or call route works from start to finish"] },
        ],
        footnote: "A guide, not a promise of what an audit will find. Report names and settings change as Google updates its interface.",
      },
      {
        kind: "cards",
        id: "after-audit",
        after: "privacy",
        eyebrow: "After the audit",
        title: "After the audit: your options",
        subtext: "The audit is read-only. We do not change your account unless you ask us to.",
        items: [
        { tag: "Option 1", title: "Use the list yourself", desc: "The audit comes with a written action list. You or your team can apply it." },
        { tag: "Option 2", title: "Hand it to your current agency", desc: "Share the list with whoever runs your account today and ask them to work through it." },
        { tag: "Option 3", title: "Ask us to make the fixes", desc: "We make the agreed fixes once and hand the account back to you." },
        { tag: "Option 4", title: "Move to ongoing management", desc: "We run and improve the account month by month. Scope and fee are written down first.", href: "/google-ads-pricing-ahmedabad/", cta: "How the fee works" },
        { tag: "Option 5", title: "Do nothing", desc: "There is no obligation. You keep the report either way." },
        ],
      },
      {
        kind: "text",
        id: "about-guide",
        eyebrow: "About this guide",
        title: "Who is behind this guide",
        paragraphs: [
          "This guide is published by Digital Aura, a digital marketing and web development agency based at 713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad. The agency is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing, and has delivered 750+ projects for 120+ clients.",
          "We write about Google Ads audits in plain terms so you can judge any provider, including us. We update this page when our process or terms change, and the date at the top shows when it was last reviewed.",
        ],
        links: [{ label: "About Digital Aura", href: "/about/" }, { label: "Founder on LinkedIn", href: "https://www.linkedin.com/in/sambhav-shah/" }, { label: "Contact us", href: "/contact/" }],
      },
    ],
  },
  googleAdsDoctors: {
    extraAdd: [
      {
        kind: "cards",
        id: "rule-books",
        after: "how-patients-search",
        eyebrow: "The rules",
        title: "The rule-books that apply: Google, NMC, ASCI and the law",
        subtext: "Four sets of rules shape what a healthcare ad can say. We check the current version of each before a campaign launches.",
        items: [
        { tag: "Google", title: "Google Ads policies", desc: "Google restricts some healthcare and medicines advertising and does not allow misleading or unsafe claims. Policies change, so we check the current healthcare policy before launch." },
        { tag: "NMC", title: "Medical council rules", desc: "Doctors in India are bound by professional conduct rules from the National Medical Commission and state medical councils, which limit how doctors can advertise. These rules have been revised over time, so confirm the current wording with your medical council or legal adviser." },
        { tag: "ASCI", title: "Advertising Standards Council of India", desc: "The ASCI code covers misleading and unsubstantiated claims in advertising and has guidance for healthcare. Ads should be truthful and able to be backed up." },
        { tag: "Law", title: "The law", desc: "The Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954 restricts advertising that claims to cure certain conditions, and consumer protection law covers misleading advertisements." },
        ],
        footnote: "This is general information, not legal advice. Confirm the points that apply to you with your own legal adviser, and check the current wording of each rule.",
      },
      {
        kind: "text",
        id: "about-guide",
        eyebrow: "About this guide",
        title: "Who is behind this guide",
        paragraphs: [
          "This guide is published by Digital Aura, a digital marketing and web development agency based at 713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad. The agency is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing, and has delivered 750+ projects for 120+ clients.",
          "We write about Google Ads for doctors and hospitals in plain terms so you can judge any provider, including us. We update this page when our process or terms change, and the date at the top shows when it was last reviewed.",
        ],
        links: [{ label: "About Digital Aura", href: "/about/" }, { label: "Founder on LinkedIn", href: "https://www.linkedin.com/in/sambhav-shah/" }, { label: "Contact us", href: "/contact/" }],
      },
    ],
  },
  metaAdsPricing: {
    extraAdd: [
      {
        kind: "text",
        id: "about-guide",
        eyebrow: "About this guide",
        title: "Who is behind this guide",
        paragraphs: [
          "This guide is published by Digital Aura, a digital marketing and web development agency based at 713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad. The agency is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing, and has delivered 750+ projects for 120+ clients.",
          "We write about Meta ads pricing in plain terms so you can judge any provider, including us. We update this page when our process or terms change, and the date at the top shows when it was last reviewed.",
        ],
        links: [{ label: "About Digital Aura", href: "/about/" }, { label: "Founder on LinkedIn", href: "https://www.linkedin.com/in/sambhav-shah/" }, { label: "Contact us", href: "/contact/" }],
      },
    ],
  },
  metaAdsClinics: {
    extraAdd: [
      {
        kind: "cards",
        id: "indian-rules",
        after: "policy",
        eyebrow: "Indian rules",
        title: "Indian rules for doctors and clinics: NMC, ASCI and the law",
        subtext: "Meta's rules are only one layer. Indian rules also apply to what a clinic's ad or post can say.",
        items: [
        { title: "NMC and medical council rules", desc: "Doctors are bound by professional conduct rules that limit how they advertise, including on social media. The rules have been revised over time, so confirm the current wording with your medical council or legal adviser." },
        { title: "ASCI guidelines", desc: "The ASCI code covers misleading claims and has guidance for healthcare advertising. Claims must be truthful and able to be backed up." },
        { title: "Drugs and Magic Remedies Act", desc: "The Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954 restricts advertising that claims to cure certain conditions." },
        { title: "Consumer protection law", desc: "Misleading advertisements, including exaggerated results, can attract action under consumer protection law." },
        { title: "Testimonials and photos", desc: "Whether patient testimonials or before-and-after images are allowed depends on your provider type and the rules that apply. We use them only when you confirm they are allowed." },
        ],
        footnote: "This is general information, not legal advice. Confirm the points that apply to you with your own legal adviser, and check the current wording of each rule.",
      },
      {
        kind: "text",
        id: "about-guide",
        eyebrow: "About this guide",
        title: "Who is behind this guide",
        paragraphs: [
          "This guide is published by Digital Aura, a digital marketing and web development agency based at 713, Shilp Arcade, Sardar Patel Ring Road, Hanspura, Ahmedabad. The agency is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing, and has delivered 750+ projects for 120+ clients.",
          "We write about Meta ads for clinics and doctors in plain terms so you can judge any provider, including us. We update this page when our process or terms change, and the date at the top shows when it was last reviewed.",
        ],
        links: [{ label: "About Digital Aura", href: "/about/" }, { label: "Founder on LinkedIn", href: "https://www.linkedin.com/in/sambhav-shah/" }, { label: "Contact us", href: "/contact/" }],
      },
    ],
  },
};
