# New public page checklist (SSR, SEO, E-E-A-T, AEO, GEO)

Every new public page on thedigitalaura.com must meet all of this before the PR is opened.
The build enforces the SSR part; the rest is reviewed.

## 1. Server-side rendering (enforced by `npm run build:live`)
- Add the page as a `<Route path="/..."/>` in `src/App.tsx`. `scripts/prerender.mjs` reads App.tsx, so the route is
  prerendered and added to `sitemap.xml` automatically. Dynamic routes (`/blog/:slug`, `/careers/:id`) are expanded from data.
- The **SSR quality gate** in `prerender.mjs` fails the build (and the PR check) when the raw HTML has: not exactly one `h1`,
  a missing/short `<title>` or meta description, a missing or non-self canonical, invalid JSON-LD, or under 150 words of body text.
  A failing page is never written, so the last good version keeps serving.
- Pages served by the separate apps (`landing-pages/`, `google-ads-page/`) are proxied by nginx and are not covered by the gate:
  run `npm run audit:live` after deploy.
- After every deploy run `npm run audit:live` (fetches the live sitemap as raw HTML, no JavaScript).

## 2. On-page and intent
- One primary keyword and one search intent per page. Title 15-60 characters, meta description 70-155, one `h1`, logical `h2`/`h3`.
- `PAGE_META` entry (title, description) in `src/components/PageSEO.tsx`. Unique per page.
- Internal links: at least 2 inbound links from existing pages (pillar, related lists, blog) and links out to the parent pillar and related pages.
  Descriptive anchor text, never "click here" or a bare "learn more".

## 3. AEO / GEO (answer-first)
- `quickAnswer` (40-60 words, direct answer to the main question) directly under the hero.
- Question-style headings, a visible FAQ whose answers start with the answer, and a `faqTitle` that names the topic.
- Entity facts stay consistent with the Organization schema (name, address, phone). Cite authoritative `sources` where claims rely on platform or Google guidance.

## 4. E-E-A-T
- Visible "Published by Digital Aura, address, last updated" line (`lastUpdated` in the page config; bump `LAST_UPDATED` in `src/data/auditContent.ts` on material edits).
- No unverified claims: no prices, client numbers, ratings, results, turnaround promises or legal statements unless the owner confirmed them.
- Health and finance topics: informational tone, no cure or outcome claims, general-information notice, no patient data in forms.

## 5. Schema (JSON-LD in raw HTML)
- `PAGE_SCHEMA` entry: `FAQPage` generated from the visible FAQs, `BreadcrumbList`, `WebPage` (with `dateModified`), `Service` where it is a service page,
  `HowTo` for step-by-step audit pages. Reference the organisation by `@id` (`https://thedigitalaura.com/#organization`).
- No `Offer` price, `AggregateRating`, `Review` or `VideoObject` unless real and visible on the page.

## 6. Forms and tracking
- Lead forms use `submitLead` (`src/lib/submitLead.ts`) with honeypot and captcha. Audit pages ask for the website address.

## 7. Before opening the PR
- `npx vite build --mode contabo && node scripts/prerender.mjs` passes with no new failures.
- Playwright desktop 1366 and mobile 390: no JS errors, no horizontal scroll, forms submit, links resolve.
