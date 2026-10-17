import type { Enhancement } from "@/data/pageEnhancements";
import type { ExtraSection } from "@/components/LocalServicePage";

/**
 * Wave 4: one extra "depth" section per cluster / industry page, written in plain explanation only.
 * Rules (same as earlier waves): no prices, no results, no client names, no new numeric claims, no legal or medical advice.
 * Paragraphs may contain [anchor](/path/) links (see src/lib/inlineLinks.tsx). Each section links to the four pillar
 * pages and to sibling cluster pages or guides that the reader would naturally want next.
 */

const sec = (id: string, title: string, paragraphs: string[], after?: string): Enhancement => ({
  extraAdd: [{ kind: "text", id, title, paragraphs, ...(after ? { after } : {}) } as ExtraSection],
});

export const wave4Extras: Record<string, Enhancement> = {
  /* ───────────── SEO cluster ───────────── */
  seoFreeAudit: sec("prioritise-findings", "How to prioritise what the audit finds", [
    "Not every finding deserves the same urgency. Sort what you read into three groups: problems that stop Google from finding or understanding your pages, problems that hold good pages back, and opportunities that need new content. Work through them in that order, because writing more does not help a page Google cannot crawl or index.",
    "Most findings repeat a few themes: titles and headings that do not match what people search, pages competing for one query, slow or unstable mobile pages, and thin service pages. Our guides on [technical SEO practices](/blog/technical-seo-practices-2026/) and the [on-page SEO checklist](/blog/on-page-seo-checklist-2026/) explain each one in plain language.",
    "If you want the findings turned into an ordered plan, our [SEO services in Ahmedabad](/seo-services-ahmedabad) team can take them from there, and the [SEO pricing guide](/seo/pricing-ahmedabad/) shows how that work is usually scoped. If the audit shows the site itself needs rebuilding, read about [website development in Ahmedabad](/website-development-services-ahmedabad/).",
  ], "after-the-audit"),
  seoPricing: sec("seo-and-other-channels", "SEO next to your other marketing channels", [
    "SEO and paid advertising answer different needs. Ads can bring enquiries in days and stop the moment the budget stops. SEO takes longer to build, but the pages keep working after the effort is done. Most businesses get the best result by using ads to cover the gap while organic rankings are built, then judging each by cost per enquiry.",
    "To compare fairly, put the numbers side by side: read the [Google Ads pricing guide](/google-ads-pricing-ahmedabad/) and the [Meta Ads pricing guide](/meta-ads-agency-ahmedabad/pricing/), then use a [free SEO audit](/seo/free-audit/) to see what SEO would actually need on your site. Our article on [how to increase organic website traffic](/blog/increase-organic-website-traffic-10x/) explains where organic growth usually comes from.",
    "When you are ready to talk scope, our [SEO services](/seo-services-ahmedabad) page explains how we work.",
  ], "agency-freelancer-inhouse"),
  seoDoctors: sec("pages-profile-and-ads", "How your pages, profile and ads fit together", [
    "Search visibility for a clinic comes from three things working together: pages that answer a patient's question, a Google Business Profile that is complete and consistent, and, where speed matters, paid search for urgent queries. Weakness in one lowers what the others can achieve, so it helps to look at all three at once.",
    "Our [Google Business Profile checklist](/blog/google-business-profile-seo-checklist/) and [local SEO strategies guide](/blog/local-seo-strategies-2026/) cover the profile and local side. Fast, clear service pages from a [website built for doctors](/website-design-for-doctors-ahmedabad/) give the pages room to rank, and [Google Ads for doctors](/google-ads-for-doctors-ahmedabad/) can cover high-intent searches while rankings build.",
    "The overall approach is the same as our [SEO services in Ahmedabad](/seo-services-ahmedabad), applied with the extra care healthcare content needs.",
  ], "websites-and-seo"),
  seoManufacturers: sec("search-in-the-sales-process", "Where search sits in a long B2B sales process", [
    "Industrial sales rarely close on one visit. A buyer may find you through search, check the catalogue, ask colleagues, and come back weeks later to request a quote. Search brings the first visit, but the site has to keep working through the whole decision, with clear specifications, proof of capability and an easy next step.",
    "That is why the pages that support enquiries matter as much as the pages that rank. A [website designed for manufacturers](/website-design-for-manufacturers-ahmedabad/) covers catalogue structure and quote requests, and a focused [Google Ads campaign](/google-ads-agency-ahmedabad) can capture buyers who are looking for a supplier today. Our [technical SEO practices guide](/blog/technical-seo-practices-2026/) helps keep large catalogues crawlable.",
    "Our [SEO services](/seo-services-ahmedabad) bring these pieces together around your products and your buyers.",
  ], "qualified-leads"),

  /* ───────────── Google Ads cluster ───────────── */
  googleAdsAudit: sec("fix-order", "Why tracking comes first in the fixes", [
    "When you read the findings, start with tracking. Every bidding decision Google makes depends on which actions you tell it count as a lead. If calls, forms or WhatsApp clicks are missing or double counted, the account learns from the wrong signals, and every other fix is built on weak ground.",
    "After tracking, work through structure and targeting, then wasted spend. Our [Google Ads strategy checklist](/blog/google-ads-strategy-checklist-2026/) and the article on [common Google Ads mistakes](/blog/7-google-ads-mistakes-2026/) explain these steps in plain English so you can follow your own findings.",
    "If you want help acting on the audit, our [Google Ads agency in Ahmedabad](/google-ads-agency-ahmedabad) team can take it from review to ongoing management. Local businesses should also read how [Google Ads and Maps work together](/blog/local-business-google-ads-maps-2026/).",
  ], "after-audit"),
  googleAdsPricing: sec("ads-next-to-seo-and-meta", "Comparing Google Ads with SEO and Meta Ads", [
    "Google Ads captures people who are already searching, which is why it can work quickly. It is not the only way to spend a marketing budget, and it is worth knowing what the same money would do elsewhere before you commit.",
    "Read how [SEO pricing](/seo/pricing-ahmedabad/) works for slower, compounding growth, and how [Meta Ads pricing](/meta-ads-agency-ahmedabad/pricing/) differs because social ads reach people before they search. If you are unsure whether your current account is worth scaling, a [Google Ads audit](/google-ads-audit-ahmedabad/) will show where money is going first.",
    "When you are ready, the [Google Ads agency](/google-ads-agency-ahmedabad) page shows how we run accounts, and our [strategy checklist](/blog/google-ads-strategy-checklist-2026/) lists what a healthy account should have in place.",
  ], "compare-two-quotes"),
  googleAdsDoctors: sec("paid-search-with-organic", "Pairing paid search with organic visibility and your website", [
    "Paid search works best when it is not the only thing carrying your clinic's visibility. Organic rankings and a strong Google Business Profile reduce how much you depend on ads, and a clear website decides whether a click becomes an appointment.",
    "See how this works for specialities such as [dentists](/google-ads-for-dentists-ahmedabad/) and [IVF clinics](/google-ads-for-ivf-clinics-ahmedabad/), why [Google Ads and Maps](/blog/local-business-google-ads-maps-2026/) belong together for local practices, and how [SEO for doctors and hospitals](/seo/doctors-hospitals-ahmedabad/) builds the organic side.",
    "The full approach is on our [Google Ads agency in Ahmedabad](/google-ads-agency-ahmedabad) page, supported by a [website designed for doctors](/website-design-for-doctors-ahmedabad/). Advertising rules for healthcare vary, so confirm what applies to you.",
  ], "evaluate-agency"),
  googleIvf: sec("search-beside-social", "How search ads sit beside social and organic", [
    "Search ads reach people who are actively looking, but many couples start learning well before that. Social campaigns support those who are still researching, and organic content builds the trust that makes a later enquiry feel safe. Each channel has a different job, and judging them all by same-day enquiries undersells the slower ones.",
    "See how we approach [Meta Ads for IVF clinics](/meta-ads-agency-ahmedabad/ivf-fertility-clinics/), the broader [Google Ads for doctors](/google-ads-for-doctors-ahmedabad/) page, and [SEO for hospitals and clinics](/seo/doctors-hospitals-ahmedabad/).",
    "Our [Google Ads agency in Ahmedabad](/google-ads-agency-ahmedabad) team can explain how these fit together. Rules on healthcare advertising differ, so please confirm what applies to your clinic.",
  ], "ivf-pages"),
  googleDentists: sec("ads-maps-and-website", "Where ads, maps and your website meet", [
    "A dental enquiry often involves three touchpoints in a few minutes: an ad or map result, your Google Business Profile, and your website. If one of them looks outdated or inconsistent, the patient moves to the next clinic, so it pays to review them together.",
    "Clear treatments, visible contact options and a fast mobile page help the website do its part; see [website design for dentists](/website-design-for-dentists-ahmedabad/). For awareness among people who are not searching yet, social campaigns are covered on [Meta Ads for dentists](/meta-ads-agency-ahmedabad/dentists/).",
    "Strong local rankings also reduce how much you rely on ads, which is why we pair this with [SEO for doctors and clinics](/seo/doctors-hospitals-ahmedabad/). The overall method is on our [Google Ads agency](/google-ads-agency-ahmedabad) page.",
  ], "dental-local"),

  /* ───────────── Meta Ads cluster ───────────── */
  metaAdsPricing: sec("creative-keeps-costing", "Creative is the cost that keeps coming back", [
    "Of the costs behind Meta Ads, creative is the one people forget. Images, video and copy wear out as the same audience sees them again and again, so a campaign that worked last quarter can slow down without any change in budget or targeting. Plan for a steady supply of new creative, not a single shoot.",
    "Our guides on [Meta lead generation ads](/blog/meta-lead-gen-ads-2026/) and [Meta Ads targeting](/blog/meta-ads-targeting-2026/) show how testing and audiences affect cost, and [why competitors outperform your Meta ads](/blog/why-competitors-outperform-meta-ads-2026/) covers the common gaps.",
    "To see how Meta compares with other channels, read the [Google Ads pricing guide](/google-ads-pricing-ahmedabad/) and the [SEO pricing guide](/seo/pricing-ahmedabad/). When you are ready to talk about your account, start with our [Meta Ads agency in Ahmedabad](/meta-ads-agency-ahmedabad/) page.",
  ], "costs-outside-fee"),
  metaAdsClinics: sec("choose-the-right-guide", "Choosing the right speciality guide", [
    "Clinics are not all alike, and the advice that suits a dental practice can be wrong for a fertility centre or a skin clinic. Differences in patient emotions, treatment cycles and how closely the platform reviews content change what a safe, effective campaign looks like.",
    "Start with the guide closest to your practice: [dentists](/meta-ads-agency-ahmedabad/dentists/), [IVF and fertility clinics](/meta-ads-agency-ahmedabad/ivf-fertility-clinics/), [skin clinics](/meta-ads-agency-ahmedabad/dermatologists-skin-clinics/) or [hospitals](/meta-ads-agency-ahmedabad/hospitals/). Read [why Meta disables ad accounts](/blog/why-meta-disables-ad-accounts-2026/) to understand the review risks.",
    "Social ads reach people before they search, so they work well beside [Google Ads for doctors](/google-ads-for-doctors-ahmedabad/) and organic work covered in [SEO for doctors](/seo/doctors-hospitals-ahmedabad/). The wider approach is on our [Meta Ads agency](/meta-ads-agency-ahmedabad/) page. Rules differ by profession and region, so please confirm what applies to you.",
  ], "specialty-playbooks"),
  metaRealEstate: sec("long-property-decisions", "Property decisions are long, so lead handling matters", [
    "Buying property is a slow decision with many conversations. Social ads are good at starting those conversations, but the value is decided by what happens next: how quickly an enquiry is called back, how clearly the project is explained, and whether the lead is followed up when they are not ready.",
    "Lead forms are quick to fill and quick to abandon, so it helps to understand how they behave; our guide to [Meta lead generation ads](/blog/meta-lead-gen-ads-2026/) covers form types and qualification. Audience choices are covered in [Meta Ads targeting](/blog/meta-ads-targeting-2026/).",
    "Property buyers also search, so social campaigns pair well with [Google Ads](/google-ads-agency-ahmedabad) for people looking for a specific project or locality, and with a well-structured project page from our [website development](/website-development-services-ahmedabad/) team. Our [Meta Ads agency in Ahmedabad](/meta-ads-agency-ahmedabad/) page explains how we run these campaigns.",
  ]),
  metaHospitals: sec("departments-and-search", "How departments connect to search and your website", [
    "A hospital's departments each have their own audience, so they also have their own search behaviour. Social campaigns can introduce a department, but the person who wants to book will usually search for it and land on a page that must be clear and specific.",
    "Larger groups often run speciality-level pages like [IVF and fertility clinics](/meta-ads-agency-ahmedabad/ivf-fertility-clinics/), with a broader view on the [clinics and doctors page](/meta-ads-agency-ahmedabad/clinics-doctors/). See how [SEO for hospitals](/seo/doctors-hospitals-ahmedabad/) and [Google Ads for doctors](/google-ads-for-doctors-ahmedabad/) support them, and read [why Meta disables ad accounts](/blog/why-meta-disables-ad-accounts-2026/) before building creative.",
    "For the overall approach, visit our [Meta Ads agency](/meta-ads-agency-ahmedabad/). Advertising rules vary, so please confirm what applies to you.",
  ]),
  metaDentists: sec("dental-social-ads", "What social ads can and cannot do for a dental clinic", [
    "Social ads are good at reminding people in your area that your clinic exists and at offering a simple first step such as a check-up or consultation. They are less good at catching someone with an urgent toothache, who is more likely to search. Knowing the difference stops you expecting one channel to do both jobs.",
    "Creative for dental ads needs the same care as other healthcare content, so read [why Meta disables ad accounts](/blog/why-meta-disables-ad-accounts-2026/) first. For people searching right now, [Google Ads for dentists](/google-ads-for-dentists-ahmedabad/) is the better fit, and a clear [dental website](/website-design-for-dentists-ahmedabad/) turns either source into bookings.",
    "Our [Meta Ads agency in Ahmedabad](/meta-ads-agency-ahmedabad/) page explains how campaigns are run, and the [Meta Ads pricing guide](/meta-ads-agency-ahmedabad/pricing/) shows how the work is scoped.",
  ]),
  metaIvf: sec("couples-still-researching", "Reaching couples who are still researching", [
    "Many couples research for weeks before they contact a clinic, so the aim of social advertising here is often to be a calm, trustworthy source of information rather than to push for a booking. Content that explains, reassures and respects privacy tends to serve patients and platform rules better than urgency.",
    "That is why a mix of channels helps. Search ads, covered on [Google Ads for IVF clinics](/google-ads-for-ivf-clinics-ahmedabad/), reach people who are actively looking, and [SEO for doctors and hospitals](/seo/doctors-hospitals-ahmedabad/) builds organic visibility. Read [why Meta disables ad accounts](/blog/why-meta-disables-ad-accounts-2026/) to understand the review risks.",
    "The whole approach sits under our [Meta Ads agency in Ahmedabad](/meta-ads-agency-ahmedabad/). Advertising rules for healthcare vary, so please confirm what applies to you.",
  ]),
  metaDermatology: sec("social-with-search-organic", "Pairing social ads with search and organic visibility", [
    "People who already know what treatment they want usually search for it, while social ads are better at reaching those who are still thinking. Using both lets each do the job it is good at, and organic visibility supports both by building trust.",
    "See [Google Ads for doctors](/google-ads-for-doctors-ahmedabad/) for search, [SEO for clinics](/seo/doctors-hospitals-ahmedabad/) for organic, and the [clinics and doctors page](/meta-ads-agency-ahmedabad/clinics-doctors/) for the wider picture on Meta. Our article on [why Meta disables ad accounts](/blog/why-meta-disables-ad-accounts-2026/) lists the typical triggers.",
    "The overall method is on our [Meta Ads agency](/meta-ads-agency-ahmedabad/) page. Rules differ by profession and region, so please confirm what applies to you.",
  ]),
  metaEducation: sec("admission-season-planning", "Planning ads around the admission calendar", [
    "Education enquiries come in waves that follow admission cycles, exam results and batch start dates. Campaigns that ignore the calendar spend most when interest is lowest. Planning creative, forms and follow-up for each wave lets you start warming parents and students before decisions are made.",
    "Parents and students ask different questions, so messaging should too. Our guide to [Meta lead generation ads](/blog/meta-lead-gen-ads-2026/) explains how form questions filter serious enquiries, and [Meta Ads targeting](/blog/meta-ads-targeting-2026/) covers audience choices.",
    "Many families also search by course and location, so [Google Ads](/google-ads-agency-ahmedabad) captures that intent, while a clear course page from our [website development](/website-development-services-ahmedabad/) team and organic work from [SEO services](/seo-services-ahmedabad) support both. The full approach is on our [Meta Ads agency in Ahmedabad](/meta-ads-agency-ahmedabad/) page.",
  ]),
  metaRestaurants: sec("restaurant-ads-and-footfall", "From a scroll to a table: what restaurant ads need", [
    "Restaurant ads work when the food looks good and the offer is easy to act on: a clear dish, a place, a time and one simple step such as a call, a booking or directions. Campaigns that try to say everything usually say nothing, so a single clear message per ad tends to work best.",
    "Fresh creative matters because people in a neighbourhood see the same ads repeatedly. Our [Meta Ads features guide](/blog/5-meta-ads-features-2026/) and [targeting guide](/blog/meta-ads-targeting-2026/) show how formats and audiences can be rotated without wasting budget.",
    "People also search for places to eat nearby, so [Google Ads and Maps](/blog/local-business-google-ads-maps-2026/) and local [SEO services](/seo-services-ahmedabad) cover that moment. The overall method is on our [Meta Ads agency in Ahmedabad](/meta-ads-agency-ahmedabad/) page, and [Meta Ads pricing](/meta-ads-agency-ahmedabad/pricing/) explains how the work is scoped.",
  ]),
  metaEcommerce: sec("ecommerce-tracking-first", "Get tracking right before scaling an online store", [
    "Ecommerce ads depend on the platform knowing which visitors bought. If purchase events are missing, duplicated or delayed, the system optimises toward the wrong people and spend rises without a matching rise in orders. Checking tracking, product feeds and the checkout path comes before any budget increase.",
    "Creative then matters: new products, clear offers and short video tend to keep campaigns fresh. See [why competitors outperform your Meta ads](/blog/why-competitors-outperform-meta-ads-2026/) for the common gaps, and our [Meta Ads features guide](/blog/5-meta-ads-features-2026/) for formats to test.",
    "Shoppers also search for products directly, so [Google Ads](/google-ads-agency-ahmedabad) and organic work from [SEO services](/seo-services-ahmedabad) matter, especially product and category pages; our [Shopify SEO tutorial](/blog/shopify-seo-tutorial-2026/) shows the basics. The store itself can be built or improved through our [website development](/website-development-services-ahmedabad/) team, and the full approach is on our [Meta Ads agency in Ahmedabad](/meta-ads-agency-ahmedabad/) page.",
  ]),

  /* ───────────── Website cluster ───────────── */
  websiteDevCost: sec("cost-and-whats-around", "How cost, design and care fit together", [
    "A website budget is rarely just the build. It sits next to design decisions, hosting and care after launch, and being found by the people you want. Looking at these together avoids a site that is cheap to build and expensive to live with.",
    "Our [website design cost guide](/website-design-cost-ahmedabad/) covers the design side in detail, and the [website packages](/website-packages-ahmedabad/) page explains fixed bundles for simpler needs. Plan for care afterwards with [maintenance and AMC](/website-maintenance-amc-ahmedabad/).",
    "A site also needs to be found, which is where our [SEO services](/seo-services-ahmedabad) come in. When you are ready to scope a project, start from our [website development services in Ahmedabad](/website-development-services-ahmedabad/) page.",
  ], "after-launch"),
  websiteDesignCost: sec("design-launch-and-after", "Design, launch and what follows", [
    "The design fee covers decisions as much as screens: which pages are needed, what each should say, and how a visitor moves from the first screen to an enquiry. Good design also has to work on a phone first, load quickly and be easy for your team to edit.",
    "Design is one part of the total, and it is worth reading it next to the build costs in our [website development cost guide](/website-development-cost-ahmedabad/). If you are updating an existing site, [website redesign services](/website-redesign-services-ahmedabad/) explains how to change the design without losing search visibility.",
    "Clear pages also make [SEO services](/seo-services-ahmedabad) and [Google Ads](/google-ads-agency-ahmedabad) traffic work harder. When you are ready, our [website development services](/website-development-services-ahmedabad/) page shows how we take a project from brief to launch.",
  ], "around-design"),
  websitePackages: sec("when-a-package-is-not-enough", "When a package is not enough", [
    "A package works when your needs match what it includes. The signs that it will not: you need special features such as bookings or logins, you have many different kinds of page, or the site has to connect to other systems. In those cases a custom scope is usually the more honest route.",
    "The [website development cost guide](/website-development-cost-ahmedabad/) explains what a custom scope involves, and [website design cost](/website-design-cost-ahmedabad/) covers the design side. A package can also be a sensible start that you grow from.",
    "Whichever route you choose, plan the period after launch with [maintenance and AMC](/website-maintenance-amc-ahmedabad/), and visibility with our [SEO services](/seo-services-ahmedabad). The full process is on our [website development services in Ahmedabad](/website-development-services-ahmedabad/) page.",
  ], "upgrade-path"),
  websiteRedesign: sec("redesign-with-seo-team", "Working with an SEO team during a redesign", [
    "A redesign changes more than the look, and each change is a chance to protect or lose visibility. Bringing SEO into the project at the start means someone is responsible for the list of pages that rank today, the redirect map and the post-launch checks.",
    "Our [SEO services in Ahmedabad](/seo-services-ahmedabad) team does this as part of redesign projects, and our guide on [technical SEO practices](/blog/technical-seo-practices-2026/) explains what a good launch checks.",
    "Budget and care both matter: compare costs in the [website development cost](/website-development-cost-ahmedabad/) and [website design cost](/website-design-cost-ahmedabad/) guides, and plan [maintenance and AMC](/website-maintenance-amc-ahmedabad/) for after launch. Our [website development services](/website-development-services-ahmedabad/) page explains the full build.",
  ], "ranking-risks"),
  websiteMaintenance: sec("care-redesign-and-seo", "How maintenance, redesign and SEO relate", [
    "Maintenance keeps a site healthy; it does not fix a site that no longer fits the business. If the design is outdated, the structure confuses visitors or the platform limits what you can do, a [website redesign](/website-redesign-services-ahmedabad/) is the better step, and maintenance then protects the new site.",
    "Care also protects search work, since speed and technical health feed into rankings; see our [technical SEO practices guide](/blog/technical-seo-practices-2026/) and [SEO services](/seo-services-ahmedabad).",
    "For new builds, [website packages](/website-packages-ahmedabad/) explains simple bundles, and our [website development services in Ahmedabad](/website-development-services-ahmedabad/) page shows how projects and care fit together.",
  ], "downtime-cost"),
  websiteDoctors: sec("site-search-and-ads", "How the site connects to search and ads", [
    "A clinic website rarely works alone. Patients arrive from search results, maps, social ads or word of mouth, and the site has to meet each of them clearly. The treatment pages and doctor profiles are also what search engines and ads rely on.",
    "See how this works with [SEO for doctors and hospitals](/seo/doctors-hospitals-ahmedabad/) and how paid search uses these pages in [Google Ads for doctors](/google-ads-for-doctors-ahmedabad/). Speciality examples are on our [dental website](/website-design-for-dentists-ahmedabad/) and [eye care website](/website-design-for-ophthalmologists-ahmedabad/) pages.",
    "The build, hosting and care follow our [website development services in Ahmedabad](/website-development-services-ahmedabad/) process, with extra attention to privacy and clear patient information. Please confirm local requirements that apply to your practice.",
  ], "local-seo"),
  websiteManufacturers: sec("site-and-buyer-search", "How the site connects to buyer search", [
    "A manufacturer's site works with search, not instead of it. Buyers find it through product and supplier searches, then judge it on specifications, proof and how easy it is to request a quote.",
    "Read how this works in [SEO for manufacturers and B2B](/seo/manufacturers-b2b-gujarat/). For buyers searching for a supplier today, [Google Ads](/google-ads-agency-ahmedabad) can add enquiries while organic rankings build.",
    "Large catalogues need structure and speed, which are part of the build described in our [website development cost guide](/website-development-cost-ahmedabad/) and [website development services in Ahmedabad](/website-development-services-ahmedabad/) page. Keep it healthy afterwards with [maintenance and AMC](/website-maintenance-amc-ahmedabad/).",
  ], "rfq"),
  webDentists: sec("dental-website-basics", "What a dental website should do in its first ten seconds", [
    "People looking for a dentist decide fast. In the first few seconds they want to see where you are, what you treat, and how to book. A clean layout, clear treatment pages and a prominent call or booking button matter more than animations, especially on a phone held in one hand.",
    "Trust comes from real detail: the dentist's qualifications, the clinic, genuine patient feedback and clear information about what to expect. These pages also support search; see [SEO for doctors and clinics](/seo/doctors-hospitals-ahmedabad/) and [Google Ads for dentists](/google-ads-for-dentists-ahmedabad/).",
    "Social channels can remind people in your area that you are nearby; see [Meta Ads for dentists](/meta-ads-agency-ahmedabad/dentists/). The build and care follow our [website development services in Ahmedabad](/website-development-services-ahmedabad/) process, and the [website packages](/website-packages-ahmedabad/) page shows simpler options.",
  ]),
  webOphthalmologists: sec("eye-care-website-clarity", "Clarity matters most on an eye care website", [
    "Eye care patients include older visitors and people with poor vision, so readability is a real requirement, not a style choice. Larger text, strong contrast, simple navigation and clear buttons help everyone and reduce abandoned visits.",
    "Treatment pages should explain procedures calmly and plainly, with accurate information from the clinical team. Those pages are also what search engines and ads rely on; see [SEO for doctors and hospitals](/seo/doctors-hospitals-ahmedabad/) and [Google Ads for doctors](/google-ads-for-doctors-ahmedabad/).",
    "For the broader picture of a medical site, see our [website design for doctors](/website-design-for-doctors-ahmedabad/) page, and for the build and ongoing care, our [website development services in Ahmedabad](/website-development-services-ahmedabad/) and [maintenance and AMC](/website-maintenance-amc-ahmedabad/) pages.",
  ]),
};
