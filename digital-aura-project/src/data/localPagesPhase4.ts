import type { LocalServiceConfig } from "@/components/LocalServicePage";
import { buildIndustryPage, industryUrl, type IndustryService, type IndustrySpec } from "@/data/industryPageBuilder";
import { metaRealEstate, metaHospitals, metaDentists, metaIvf } from "@/data/industryPagesMetaA";
import { metaDermatology, metaEducation, metaRestaurants, metaEcommerce } from "@/data/industryPagesMetaB";
import { googleIvf, googleDentists, webDentists, webOphthalmologists } from "@/data/industryPagesGoogleWeb";

/**
 * Round 3 industry pages. Each spec is turned into a full page config by buildIndustryPage().
 * Keys are used by App.tsx (routes) and PageSEO.tsx (title, description, schema, breadcrumbs).
 */

const specs: Record<string, IndustrySpec> = {
  metaRealEstate,
  metaHospitals,
  metaDentists,
  metaIvf,
  metaDermatology,
  metaEducation,
  metaRestaurants,
  metaEcommerce,
  googleIvf,
  googleDentists,
  webDentists,
  webOphthalmologists,
};

export const phase4Pages: Record<string, LocalServiceConfig> = Object.fromEntries(
  Object.entries(specs).map(([key, spec]) => [key, buildIndustryPage(spec)]),
);

const SERVICE_TYPE: Record<IndustryService, string> = {
  meta: "Meta Ads management",
  google: "Google Ads management",
  web: "Website design and development",
};
const PARENT: Record<IndustryService, [string, string]> = {
  meta: ["Meta Ads Agency in Ahmedabad", "/meta-ads-agency-ahmedabad/"],
  google: ["Google Ads Agency in Ahmedabad", "/google-ads-agency-ahmedabad/"],
  web: ["Website Development in Ahmedabad", "/website-development-services-ahmedabad/"],
};

export interface Phase4Entry {
  key: string;
  /** Path without trailing slash, used for routes and as the PAGE_META key. */
  path: string;
  /** Path with trailing slash, used in breadcrumbs and internal links. */
  url: string;
  name: string;
  title: string;
  description: string;
  serviceType: string;
  parentName: string;
  parentUrl: string;
}

export const phase4Entries: Phase4Entry[] = Object.entries(specs).map(([key, s]) => ({
  key,
  path: s.path.replace(/\/$/, ""),
  url: industryUrl(s.path),
  name: s.name,
  title: s.metaTitle,
  description: s.metaDescription,
  serviceType: SERVICE_TYPE[s.service],
  parentName: PARENT[s.service][0],
  parentUrl: PARENT[s.service][1],
}));
