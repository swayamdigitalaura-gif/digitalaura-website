import type { Enhancement } from "@/data/pageEnhancements";
import type { ExtraSection } from "@/components/LocalServicePage";

/**
 * Wave 5: one short "where to go next" section on each new industry and cost page, and a matching sentence-level link block on
 * the existing cluster pages that now have a closer sibling or guide. Plain explanation only (no prices, results or client names).
 * Paragraphs use [anchor](/path/) links (see src/lib/inlineLinks.tsx). Every new page links up to its pillar and across to
 * siblings and guides; every pillar links down to these pages from its own page.
 */
const txt = (id: string, title: string, paragraphs: string[]): Enhancement => ({
  extraAdd: [{ kind: "text", id, title, paragraphs } as ExtraSection],
});

export const wave5Extras: Record<string, Enhancement> = {
  /* ───────────── new SEO industry pages ───────────── */
  seoRealEstate: txt("re-seo-next", "Where real estate SEO fits with your other marketing", [
    "Search works best beside your other channels. [Google Ads for real estate](/google-ads-for-real-estate-ahmedabad/) can bring site-visit enquiries during a launch, [Meta ads for real estate](/meta-ads-agency-ahmedabad/real-estate/) reach buyers before they search, and a project-first [real estate website](/website-design-for-real-estate-ahmedabad/) gives all of them a page that converts.",
    "To see how long results usually take, read [how long SEO takes](/blog/how-long-does-seo-take-ahmedabad/), and to decide between search and ads for a launch, read [SEO or paid ads first](/blog/seo-vs-paid-ads-which-first-ahmedabad/). The overall method is on our [SEO services in Ahmedabad](/seo-services-ahmedabad) page.",
  ]),
  seoEducation: txt("edu-seo-next", "Where education SEO fits with your other marketing", [
    "Admission search works best when SEO, ads and the website pull in the same direction. [Google Ads for coaching and schools](/google-ads-for-education-coaching-ahmedabad/) give quick reach during the season, [Meta ads for education](/meta-ads-agency-ahmedabad/education-coaching/) reach families earlier, and a clear [school and coaching website](/website-design-for-schools-coaching-ahmedabad/) turns the visit into an enquiry.",
    "Our [Google Business Profile checklist](/blog/google-business-profile-seo-checklist/) helps every branch appear in Maps, and [how long SEO takes](/blog/how-long-does-seo-take-ahmedabad/) explains why to start before the season. The overall method is on our [SEO services in Ahmedabad](/seo-services-ahmedabad) page.",
  ]),
  seoHospitality: txt("hospitality-seo-next", "Where restaurant SEO fits with your other marketing", [
    "Local search brings guests who are ready to decide, and other channels help them find you first. [Meta ads for restaurants](/meta-ads-agency-ahmedabad/restaurants/) bring footfall from food reels and offers, and a fast [restaurant website](/website-design-for-restaurants-ahmedabad/) keeps the menu and booking one tap away.",
    "Read our [Google Business Profile tricks for Google Maps](/blog/google-business-profile-tricks-google-maps/) and [local SEO strategies guide](/blog/local-seo-strategies-2026/) for the profile side. The overall method is on our [SEO services in Ahmedabad](/seo-services-ahmedabad) page.",
  ]),

  /* ───────────── new Google Ads industry pages ───────────── */
  googleRealEstate: txt("re-ads-next", "Where real estate ads fit with SEO, social and your website", [
    "Ads bring buyers quickly, and SEO keeps bringing them after the budget stops. Pair campaigns with [SEO for real estate](/seo/real-estate-ahmedabad/) project and locality pages, [Meta ads for real estate](/meta-ads-agency-ahmedabad/real-estate/) for earlier reach, and a [real estate website](/website-design-for-real-estate-ahmedabad/) that captures budget and configuration.",
    "Before you set a budget, read [Google Ads vs Meta Ads](/blog/google-ads-vs-meta-ads-ahmedabad/) and [how to track calls and WhatsApp leads](/blog/track-calls-whatsapp-leads-google-ads/). The overall method is on our [Google Ads agency in Ahmedabad](/google-ads-agency-ahmedabad) page, and the fee structure is on our [Google Ads pricing](/google-ads-pricing-ahmedabad/) page.",
  ]),
  googleEducation: txt("edu-ads-next", "Where education ads fit with SEO, social and your website", [
    "Season campaigns work best with pages that keep working all year. Pair them with [SEO for coaching and schools](/seo/education-coaching-ahmedabad/), [Meta ads for education](/meta-ads-agency-ahmedabad/education-coaching/) and a [school and coaching website](/website-design-for-schools-coaching-ahmedabad/) with a page for each course.",
    "Read [Google Ads vs Meta Ads](/blog/google-ads-vs-meta-ads-ahmedabad/) to plan the mix, and [how to track calls and WhatsApp leads](/blog/track-calls-whatsapp-leads-google-ads/) so counsellors see which spend fills seats. The overall method is on our [Google Ads agency in Ahmedabad](/google-ads-agency-ahmedabad) page.",
  ]),
  googleManufacturers: txt("b2b-ads-next", "Where B2B ads fit with SEO and your website", [
    "Ads reach buyers searching today, and SEO builds lasting visibility. Pair tight campaigns with [SEO for manufacturers](/seo/manufacturers-b2b-gujarat/) and a catalogue built for quotes, as described in our [website design for manufacturers](/website-design-for-manufacturers-ahmedabad/) page.",
    "Read [Performance Max vs Search campaigns](/blog/google-ads-performance-max-vs-search-leads/), [how industrial buyers find suppliers](/blog/b2b-seo-manufacturers-gujarat-guide/) and our [manufacturer website checklist](/blog/manufacturer-website-checklist-b2b-buyers/). The overall method is on our [Google Ads agency in Ahmedabad](/google-ads-agency-ahmedabad) page.",
  ]),

  /* ───────────── new website pages ───────────── */
  webHospitals: txt("hospital-site-next", "Where a hospital website fits with search and ads", [
    "A hospital site works hardest when patients can find it. [Healthcare SEO](/seo/doctors-hospitals-ahmedabad/) brings people from search and Maps, [Google Ads for doctors and hospitals](/google-ads-for-doctors-ahmedabad/) reach people searching now, and our [website design for doctors](/website-design-for-doctors-ahmedabad/) page covers smaller clinics.",
    "Keep the site healthy with our [website maintenance checklist](/blog/website-maintenance-checklist-for-business/). The overall process is on our [website development in Ahmedabad](/website-development-services-ahmedabad/) page, and what decides the price is in our [website development cost](/website-development-cost-ahmedabad/) guide.",
  ]),
  webRealEstate: txt("re-site-next", "Where a real estate website fits with search and ads", [
    "A project-first site needs traffic. [SEO for real estate](/seo/real-estate-ahmedabad/) builds project and locality visibility, and [Google Ads for real estate](/google-ads-for-real-estate-ahmedabad/) brings enquiries during launches.",
    "If you are replacing an older site, follow our [website redesign checklist](/blog/website-redesign-checklist-protect-traffic/) to protect existing traffic, and see [WordPress, Shopify or custom](/blog/wordpress-vs-shopify-vs-custom-website-india/) for platform choice. The overall process is on our [website development in Ahmedabad](/website-development-services-ahmedabad/) page.",
  ]),
  webEducation: txt("edu-site-next", "Where an education website fits with search and ads", [
    "Families find institutes through search, so pair the site with [SEO for coaching and schools](/seo/education-coaching-ahmedabad/) and [Google Ads for education](/google-ads-for-education-coaching-ahmedabad/) timed to the admission season.",
    "If you are replacing an older site, follow our [website redesign checklist](/blog/website-redesign-checklist-protect-traffic/), and keep it healthy with the [website maintenance checklist](/blog/website-maintenance-checklist-for-business/). The overall process is on our [website development in Ahmedabad](/website-development-services-ahmedabad/) page.",
  ]),
  webRestaurants: txt("restaurant-site-next", "Where a restaurant website fits with local search and ads", [
    "A fast menu page works best beside a strong map listing. See [SEO for restaurants and hotels](/seo/restaurants-hospitality-ahmedabad/) for Maps visibility and [Meta ads for restaurants](/meta-ads-agency-ahmedabad/restaurants/) for footfall and offers.",
    "Compare platforms in [WordPress, Shopify or custom](/blog/wordpress-vs-shopify-vs-custom-website-india/) and keep the site healthy with our [website maintenance checklist](/blog/website-maintenance-checklist-for-business/). The overall process is on our [website development in Ahmedabad](/website-development-services-ahmedabad/) page.",
  ]),
  webEcommerceCost: txt("ecom-cost-next", "Planning an online store: where to read next", [
    "Platform choice changes the cost, so read [WordPress, Shopify or custom](/blog/wordpress-vs-shopify-vs-custom-website-india/) and our [Shopify SEO tutorial](/blog/shopify-seo-tutorial-2026/). If you already have a store, our [website redesign checklist](/blog/website-redesign-checklist-protect-traffic/) shows how to move without losing traffic.",
    "Once the store is live, [ecommerce SEO](/services/seo-content-marketing/ecommerce-seo/) and [Meta ads for ecommerce](/meta-ads-agency-ahmedabad/ecommerce/) bring buyers. The overall process is on our [website development in Ahmedabad](/website-development-services-ahmedabad/) page.",
  ]),
  webWordpressCost: txt("wp-cost-next", "Planning a WordPress site: where to read next", [
    "Before you compare quotes, read [WordPress, Shopify or custom](/blog/wordpress-vs-shopify-vs-custom-website-india/) and our [website maintenance checklist](/blog/website-maintenance-checklist-for-business/) so running costs are in your budget from the start.",
    "If you are replacing an existing site, follow our [website redesign checklist](/blog/website-redesign-checklist-protect-traffic/). The overall process is on our [website development in Ahmedabad](/website-development-services-ahmedabad/) page, and our [website packages](/website-packages-ahmedabad/) show the standard options.",
  ]),

  /* ───────────── existing pages: link to the new siblings and guides ───────────── */
  seoFreeAudit: txt("audit-next-reads", "Where to read next after the audit", [
    "If you want to know how long fixes take to show, read [how long SEO takes](/blog/how-long-does-seo-take-ahmedabad/), and to compare search with ads, read [SEO or paid ads first](/blog/seo-vs-paid-ads-which-first-ahmedabad/). Sector guides cover [real estate](/seo/real-estate-ahmedabad/), [education](/seo/education-coaching-ahmedabad/) and [restaurants and hotels](/seo/restaurants-hospitality-ahmedabad/).",
  ]),
  seoManufacturers: txt("manuf-seo-next", "Related guides and pages for manufacturers", [
    "Read how buyers search in our [B2B SEO guide for manufacturers](/blog/b2b-seo-manufacturers-gujarat-guide/) and use our [manufacturer website checklist](/blog/manufacturer-website-checklist-b2b-buyers/) to review your catalogue. To capture buyers searching today, see [Google Ads for manufacturers](/google-ads-for-manufacturers-ahmedabad/).",
  ]),
  seoDoctors: txt("doctors-seo-next", "Related pages for hospitals", [
    "If you run a hospital, see our [hospital website design](/website-design-for-hospitals-ahmedabad/) page for department and doctor pages, and our [website maintenance checklist](/blog/website-maintenance-checklist-for-business/) for keeping the site healthy.",
  ]),
  seoPricing: txt("seo-pricing-next-reads", "Related guides on timing and choosing a channel", [
    "To judge what to expect for the fee, read [how long SEO takes](/blog/how-long-does-seo-take-ahmedabad/), and to choose between search and ads, read [SEO or paid ads first](/blog/seo-vs-paid-ads-which-first-ahmedabad/).",
  ]),
  googleAdsAudit: txt("gads-audit-next-reads", "Related guides on tracking and campaign types", [
    "Two audit topics have their own guides: [how to track calls and WhatsApp leads](/blog/track-calls-whatsapp-leads-google-ads/) and [Performance Max vs Search campaigns for lead generation](/blog/google-ads-performance-max-vs-search-leads/).",
  ]),
  googleAdsPricing: txt("gads-pricing-next-reads", "Related guides before you set a budget", [
    "Before you set a budget, read [Google Ads vs Meta Ads](/blog/google-ads-vs-meta-ads-ahmedabad/), and see industry pages for [real estate](/google-ads-for-real-estate-ahmedabad/), [education](/google-ads-for-education-coaching-ahmedabad/) and [manufacturers](/google-ads-for-manufacturers-ahmedabad/).",
  ]),
  metaAdsPricing: txt("meta-pricing-next-reads", "Related guides before you set a budget", [
    "Read [Google Ads vs Meta Ads](/blog/google-ads-vs-meta-ads-ahmedabad/) to decide where to start, [click-to-WhatsApp ads](/blog/meta-click-to-whatsapp-ads-guide/) if your customers prefer to message, and [how to test Meta ad creative](/blog/meta-ad-creative-testing-lead-generation/) to protect your budget.",
  ]),
  websiteDevCost: txt("web-cost-next-reads", "Cost guides for specific types of site", [
    "Two common builds have their own guides: [ecommerce website cost](/ecommerce-website-cost-ahmedabad/) and [WordPress website cost](/wordpress-website-cost-ahmedabad/). To choose a platform first, read [WordPress, Shopify or custom](/blog/wordpress-vs-shopify-vs-custom-website-india/).",
  ]),
  websiteDesignCost: txt("web-design-cost-next-reads", "Related cost guides", [
    "See also [WordPress website cost](/wordpress-website-cost-ahmedabad/) and [ecommerce website cost](/ecommerce-website-cost-ahmedabad/), and read [WordPress, Shopify or custom](/blog/wordpress-vs-shopify-vs-custom-website-india/) before choosing a platform.",
  ]),
  websitePackages: txt("web-packages-next-reads", "Choosing a platform and what it costs", [
    "Read [WordPress, Shopify or custom](/blog/wordpress-vs-shopify-vs-custom-website-india/), then compare [WordPress website cost](/wordpress-website-cost-ahmedabad/) and [ecommerce website cost](/ecommerce-website-cost-ahmedabad/).",
  ]),
  websiteRedesign: txt("redesign-next-reads", "A step-by-step checklist for redesigns", [
    "Our [website redesign checklist](/blog/website-redesign-checklist-protect-traffic/) walks through the audit, redirect map, staging tests and post-launch monitoring in order.",
  ]),
  websiteMaintenance: txt("amc-next-reads", "A monthly checklist you can use yourself", [
    "Use our [website maintenance checklist](/blog/website-maintenance-checklist-for-business/) to see what needs doing every month, and what a care plan should include.",
  ]),
  websiteDoctors: txt("web-doctors-next-reads", "Related pages for hospitals", [
    "For multi-department hospitals, see [hospital website design](/website-design-for-hospitals-ahmedabad/), and for visibility see [SEO for doctors and hospitals](/seo/doctors-hospitals-ahmedabad/).",
  ]),
  websiteManufacturers: txt("web-manuf-next-reads", "A checklist and related pages", [
    "Use our [manufacturer website checklist](/blog/manufacturer-website-checklist-b2b-buyers/) to review your catalogue, and see [SEO for manufacturers](/seo/manufacturers-b2b-gujarat/) and [Google Ads for manufacturers](/google-ads-for-manufacturers-ahmedabad/) for visibility.",
  ]),
};
