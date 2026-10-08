/**
 * Shared content for the audit pages (/seo/free-audit/, /services/seo-content-marketing/seo-audit-strategy/,
 * /google-ads-audit-ahmedabad/). One source so the audit sequence and checklist never drift apart.
 *
 * Sequence (owner-defined, 2026-10-08): business understanding -> check points -> walkthrough -> report.
 */

/** Date the page content was last reviewed by us. Bump when copy changes materially. */
export const LAST_UPDATED = "2026-10-08";

export const SEO_AUDIT_SEQUENCE = [
  {
    title: "1. Understand your business",
    desc: "We start with your business, not a tool. We learn your goals (calls, sales, appointments), services and margins, the customers and areas you serve, your competitors, how enquiries reach you today and what has already been tried.",
  },
  {
    title: "2. Check points",
    desc: "We run the full checklist below across your website, search data and links: technical, on-page, content, search intent, internal links, off-page and spam backlinks, conversion, schema, E-E-A-T, AEO, GEO and local. Tools find the issues, and a person decides which ones matter for your business.",
  },
  {
    title: "3. Walkthrough",
    desc: "We explain the findings in plain English on a call or screen-share: what is wrong, why it matters for your goals and what to fix first. You can ask questions as we go.",
  },
  {
    title: "4. Report",
    desc: "You receive a written report with a short summary, the top priorities ranked by impact and effort, detailed findings by area and quick wins. Use it yourself, with your developer or with us.",
  },
];

export const SEO_AUDIT_CHECKLIST: { title: string; items: string[] }[] = [
  {
    title: "Technical SEO",
    items: [
      "Crawling and indexing: robots.txt, XML sitemap, noindex or blocked pages, and pages Google has not indexed",
      "Canonical tags, duplicate URLs, redirect chains and loops",
      "Broken links, 404 errors and soft 404s",
      "Mobile usability and Core Web Vitals: loading speed, layout stability and responsiveness",
      "HTTPS, security and mixed content",
      "Rendering: whether important content is in the HTML without JavaScript (server-side or pre-rendered)",
    ],
  },
  {
    title: "On-page SEO",
    items: [
      "Title tags and meta descriptions: unique, the right length and written for clicks",
      "One clear H1 per page and a logical H2 and H3 structure",
      "Keyword placement that reads naturally, without stuffing",
      "Image alt text, file sizes and descriptive file names",
      "URL structure, breadcrumbs and pagination",
    ],
  },
  {
    title: "Content quality",
    items: [
      "Thin, duplicate or outdated pages",
      "Content depth compared with the pages that rank today",
      "Pages that compete with each other for the same keyword (cannibalisation)",
      "Missing pages for services, locations or questions customers ask",
      "Clear next steps on every page",
    ],
  },
  {
    title: "Search intent and keyword mapping",
    items: [
      "One primary keyword and intent per page: informational, commercial, transactional or local",
      "Whether the page type matches what Google shows for that search",
      "Keyword gaps against your top competitors",
      "Branded versus non-branded search balance",
      "Pages on page two that need only a small push",
    ],
  },
  {
    title: "User search behaviour",
    items: [
      "The questions people actually ask: People Also Ask, related searches and Search Console queries",
      "Phrasing in English, Hindi and Gujarati where your customers use them",
      "Mobile and 'near me' behaviour",
      "What searchers expect to see: prices, reviews, comparisons, maps or video",
      "Where visitors leave and what they were probably looking for",
    ],
  },
  {
    title: "Internal links and site structure",
    items: [
      "Orphan pages that no other page links to",
      "Important pages buried many clicks deep",
      "Anchor text that describes the destination",
      "Blog posts that link to the matching service pages",
      "Navigation, footer and breadcrumb links",
    ],
  },
  {
    title: "Off-page SEO",
    items: [
      "Backlink quality, relevance and anchor text mix",
      "Referring domains compared with competitors",
      "Brand mentions, including unlinked mentions",
      "Local citations: consistency of name, address and phone",
      "Realistic link and PR opportunities for your business",
    ],
  },
  {
    title: "Spam and toxic backlinks",
    items: [
      "Sudden link spikes from unrelated or low-quality sites",
      "Spammy anchor text, such as casino, adult, pharma or foreign-language keywords",
      "Link networks and paid-link patterns",
      "Whether a disavow file is needed, as a careful last resort, and what is already disavowed",
      "Manual action and security issue signals in Search Console",
    ],
  },
  {
    title: "Conversion (CRO)",
    items: [
      "A clear call to action on mobile and desktop",
      "Forms: number of fields, errors, spam protection and thank-you tracking",
      "Click-to-call and WhatsApp buttons, and whether they are tracked",
      "Trust signals: reviews, case studies, real team and address",
      "Speed and layout shift on key landing pages",
      "Tracking set-up: GA4 events and Search Console",
    ],
  },
  {
    title: "Schema and structured data",
    items: [
      "Organisation, LocalBusiness, Breadcrumb, FAQ, Article and Product markup that matches visible content",
      "Errors and warnings in Google's Rich Results Test",
      "Duplicate or conflicting schema",
      "Schema present in the raw HTML, not only after JavaScript runs",
    ],
  },
  {
    title: "E-E-A-T and trust",
    items: [
      "Real authors, bios and credentials on expert content",
      "About, contact, address, privacy and terms pages",
      "Evidence of experience: case studies, original photos and data",
      "Reviews and third-party mentions",
      "Accuracy and update dates on important pages",
      "Extra care for health and finance pages",
    ],
  },
  {
    title: "AEO (answer engine optimisation)",
    items: [
      "Direct, concise answers near the top of the page",
      "Question-style headings that match real queries",
      "FAQ sections with visible answers",
      "Lists, tables and steps that can be used as featured snippets",
      "Eligibility for featured snippets and voice answers",
    ],
  },
  {
    title: "GEO (generative engine optimisation)",
    items: [
      "Whether AI tools such as ChatGPT, Gemini, Perplexity and Google AI Overviews mention you for your key searches",
      "Clear entity details: who you are, where you are and what you do, consistent across the web",
      "Quotable facts with sources on your pages",
      "Crawl access for AI crawlers, including robots.txt and llms.txt",
      "Mentions on sites that AI tools commonly draw from",
    ],
  },
  {
    title: "Local SEO and Google Business Profile",
    items: [
      "Profile completeness: categories, services, hours, photos and posts",
      "Reviews: volume, recency and replies",
      "Consistency of name, address and phone across listings",
      "Location and service-area pages",
      "Map pack visibility for your key searches",
    ],
  },
];

export const AUDIT_SOURCES = [
  { label: "Google Search Central: SEO Starter Guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
  { label: "Google Search Central: Creating helpful, reliable, people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
  { label: "Google Search Central: Spam policies for Google web search", href: "https://developers.google.com/search/docs/essentials/spam-policies" },
  { label: "Google Search Central: Introduction to structured data", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
  { label: "Google Search Central: AI features and your website", href: "https://developers.google.com/search/docs/appearance/ai-features" },
  { label: "web.dev: Core Web Vitals", href: "https://web.dev/vitals/" },
];
