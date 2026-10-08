# QA vs Page Blueprints, competitor gaps, own content and roadmap (2026-10-08)

Source of truth: `Digital Aura Page Blueprints.html` (20 pages), `Competitor-Content-Gap-Final.csv`, `Digital-Aura-Own-Content-Gap-2026-10-07.xlsx`.
Method: automated diff of every blueprint page against the built page (headings, FAQs, internal links, schema, competitor "table stakes / gaps to own / ideas to beat", CTA), then manual review.

## 1. Blueprint conformance

| Item | Status |
|---|---|
| All 20 blueprint URLs live, 200, one h1, self canonical, schema in raw HTML | Done (`npm run audit:live`) |
| Primary keyword in title, h1, meta description and first 120 words | Done on all pages (web-03 omits "with prices" because there are no prices) |
| FAQs (visible text = FAQPage schema) | Done. Blueprint questions added where missing (Meta pillar, Google Ads audit, redesign, AMC, SEO pricing, SEO cost guide) |
| Lead form (website URL first on audit pages) | Done on all cluster pages and the Meta pillar |
| Answer-first box, "published by / last updated", sources | Done on all cluster pages and the SEO pillar |
| Schema: FAQPage, BreadcrumbList, WebPage, Service, HowTo (audit pages), WebApplication (calculators), ItemList (packages) | Done. No Offer price, rating, review or video schema (no confirmed data) |
| Internal links ("up / across / down" in the blueprint) | Done for every page that exists. Links to pages that do not exist yet (planned cost pages, specialty child pages) are listed below |
| Calculators | Built: Google Ads budget, break-even (Google and Meta), package picker, Google Ads self-check (12 questions), downtime cost. **Not built (need your pricing logic): SEO cost calculator, website cost estimator, design-only estimator** |
| Word targets (3,000 to 6,400 words) | Not met on purpose. Remaining content needs proof, prices, team and legal review; padding would hurt E-E-A-T |

## 2. Competitor findings: what is covered

Covered honestly (no invented data): plain-language cost drivers, what is not included, red-flag lists, "why quotes differ" explainers (Google, Meta), quote-comparison grids and 3-year cost checklist (website), refresh vs redesign vs rebuild, platform-specific maintenance, accessibility and speed as design deliverables, clinic "how to evaluate any agency, including us" checklists, "what we do not do", specialty notes and playbooks, sector playbooks for manufacturers, pre-flight checklists, self-check and break-even tools, answer-first boxes, FAQ with schema, visible update date.

Not covered because it needs your input:
- Named client proof with numbers (IVF clinic, Prism, Krisha, AMVI, Shukan, Clarity, Parasher, Grand Palace, Inn of the Dove) and consent to name them
- Price tables, "from" prices, 20-row package matrix, add-on price list, fee bands, sourced competitor price-landscape tables
- Delivery times (audit turnaround, quote turnaround), SLAs, payment schedule, refund and ownership clauses
- Sample audit report / sample monthly report, walkthrough and explainer videos, downloadable PDF checklists
- Team and reviewer names and photos, tools list, Google Partner / Clutch / GoodFirms badges
- Legal review of healthcare rule-book sections (Google, NMC, ASCI, Drugs and Magic Remedies Act, DPDP)

## 3. Own content

Done: canonical loop fixed, soft-404 noindex, CRO page crash, 4 pillar reworks, 20 blueprint pages, 12 older blogs linked to service pages, duplicate title fixed, alt text, descriptive anchors, author links, schema deduplicated.
Still open:
- 19 of 24 Ahmedabad/Gujarat location pages share about 54% templated text. Rewrite with real local detail (areas, industries, cases) one by one.
- Two website pages compete: `/website-design-development-ahmedabad/` and `/website-development-services-ahmedabad/` (pillar). Decide a canonical or a clear split (design vs development).
- Two live metas over 160 characters were CMS-stored and have been updated by you.
- Sitewide claim conflicts to resolve: clients 475+ (settings) vs 750+ (schema, meta, llms.txt) vs 120+ (SEO pillar); "48 hours" audit delivery; "40%+ of budget leaks" (Google Ads pillar).

## 4. New content: done and suggested

Built now (from the content-gap CSV):
- `/social-media-marketing-agency-ahmedabad/` (about 1,500 combined monthly searches, very low difficulty)
- `/advertising-agency-ahmedabad/` (about 950 combined; also covers "PPC")

Suggested next, in priority order:
1. Blog: Google Ads cost in Ahmedabad (2026), GST on Google Ads, Google Ads for small business budgets, agency fees: percentage vs flat. (blueprint gads-02 "down" list)
2. Blog: NMC advertising rules explained, ASCI healthcare ad claims, how to track appointments from Google Ads. Needs medical-legal review before publishing.
3. Cost pages named in the blueprint "down" links: WordPress website cost, ecommerce website cost, Shopify store cost India, website maintenance cost, mobile app development cost.
4. Specialty child pages: Google Ads / Meta ads for IVF clinics, dentists, hospitals (after consent and scope are confirmed).
5. Case-study pages for Krisha Hospital, Shukan / AMVI, Clarity Eye Surgeons, Parasher Academy (needs scope, consent and numbers).
6. Hindi and Gujarati versions of the top three pages (no Ahmedabad competitor pillar carries Gujarati).
7. "Best Google Ads / SEO agencies in Ahmedabad" comparison pages (competitors win visibility with these; needs an honest, sourced method).
8. Mobile app and WordPress company pages (about 100 and 200 combined searches; low priority, cannibalisation risk with existing service pages).

## 5. CRO added (all cluster pages)

Hero: primary CTA, Call and WhatsApp links, "free, no obligation" line. Mobile sticky bar (call + primary CTA). Jump-to links. CTA bands after the process and before the form. Form beside a "what happens next" panel with phone, WhatsApp and address. Calculator CTA ("get a written quote"). Per-card "Choose Starter / Business / Growth / Custom" buttons. Clear errors and a short form (name and email required; phone, business, city optional).

Events pushed to `dataLayer` (Google Tag Manager is already on the site via the CMS global head code). Map these in GTM:
`cta_click` (cta_label, cta_location), `phone_click`, `whatsapp_click`, `lead_form_start`, `lead_form_submit` and `generate_lead` (form_name), `calculator_use` (calculator).
Mark `generate_lead` as the GA4 conversion.

## 6. SSR

`npm run build:live` prerenders every static route in `src/App.tsx` and fails on a thin or invalid page (one h1, title, meta, self canonical, valid JSON-LD, 150+ words). After deploy run `npm run audit:live`. The two new pages were picked up automatically.
