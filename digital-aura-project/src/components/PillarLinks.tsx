/**
 * Contextual internal links from the older /services/* pages to the four ranking pillar pages.
 * Plain anchors / Link (no effects), so they prerender into the static HTML for crawlers.
 * SEO and Google Ads pillars are separate apps, hence real <a> tags (full page load).
 */
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type Pillar = { key: string; label: string; blurb: string; href: string; hard?: boolean };

const PILLARS: Record<string, Pillar> = {
  seo: {
    key: "seo",
    label: "SEO services in Ahmedabad",
    blurb: "Technical, on-page and local SEO that turns searches into enquiries.",
    href: "/seo-services-ahmedabad",
    hard: true,
  },
  googleAds: {
    key: "googleAds",
    label: "Google Ads agency in Ahmedabad",
    blurb: "Search and Maps campaigns built around qualified leads, not just clicks.",
    href: "/google-ads-agency-ahmedabad",
    hard: true,
  },
  metaAds: {
    key: "metaAds",
    label: "Meta Ads agency in Ahmedabad",
    blurb: "Facebook and Instagram lead campaigns tested against your real cost per lead.",
    href: "/meta-ads-agency-ahmedabad/",
  },
  web: {
    key: "web",
    label: "Website development services in Ahmedabad",
    blurb: "Business websites built to load fast, rank on Google and convert visitors.",
    href: "/website-development-services-ahmedabad/",
  },
};

// service slug -> pillars shown (own pillar excluded on purpose)
const BY_SLUG: Record<string, string[]> = {
  "digital-marketing": ["seo", "googleAds", "metaAds"],
  "email-whatsapp-marketing": ["metaAds", "seo", "googleAds"],
  "linkedin-youtube-ads": ["metaAds", "googleAds"],
  "social-media-marketing": ["metaAds", "seo"],
  "seo-content-marketing": ["seo", "web"],
  "google-ads": ["googleAds", "seo"],
  "meta-ads": ["metaAds", "googleAds"],
  "web-app-development": ["web", "seo"],
  "full-stack-development": ["web"],
  "wordpress-development": ["web", "seo"],
  "design-branding": ["web"],
  "cro": ["web", "googleAds"],
  "shopify-development": ["web", "seo"],
  "woocommerce-development": ["web", "seo"],
  "bigcommerce-development": ["web", "seo"],
  "custom-ai-web-solutions": ["web"],
  // city / country variants of the service pages
  "shopify-website-design-ahmedabad": ["web", "seo"],
  "shopify-development-international": ["web", "seo"],
  "woocommerce-website-design-ahmedabad": ["web", "seo"],
  "woocommerce-development-gujarat": ["web", "seo"],
  "full-stack-development-ahmedabad": ["web", "seo"],
  "full-stack-development-gujarat": ["web", "seo"],
  "website-design-development-gujarat": ["web", "seo"],
  "ai-automation-ahmedabad": ["web", "googleAds"],
  "ai-automation-gujarat": ["web", "googleAds"],
  "mobile-app-development-ahmedabad": ["web", "seo"],
  "mobile-app-development-gujarat": ["web", "seo"],
  "seo-company-gujarat": ["seo", "googleAds", "web"],
  "seo-agency-international": ["seo", "googleAds", "web"],
  "digital-marketing-agency-gujarat": ["seo", "googleAds", "metaAds"],
  // proof / company pages
  "case-study-riant-bikes": ["googleAds", "web"],
  "case-study-prism-calibration": ["seo", "googleAds"],
  "case-study-ivf-clinic": ["seo", "metaAds"],
  "case-study-dp-electrical-repairs": ["seo", "googleAds"],
  "case-study-oblprint": ["googleAds", "web"],
  "case-study-grand-palace": ["web", "seo"],
  "case-studies": ["seo", "googleAds", "metaAds", "web"],
  "about": ["seo", "googleAds", "metaAds", "web"],
  "awards": ["seo", "googleAds", "metaAds", "web"],
  "testimonials": ["seo", "googleAds", "metaAds", "web"],
  "engagement-models": ["seo", "googleAds", "metaAds", "web"],
};

const PillarLinks = ({ slug }: { slug: string }) => {
  const keys = BY_SLUG[slug];
  if (!keys) return null;
  return (
    <section className="px-4 md:px-8 py-10" style={{ background: "#F8FAFF" }} aria-label="Related services">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] mb-4 text-[#0A1628]">Related services in Ahmedabad</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {keys.map((k) => {
            const p = PILLARS[k];
            const inner = (
              <>
                <span className="block text-[15px] font-bold text-[#0A1628] mb-1">{p.label}</span>
                <span className="block text-sm text-[#4B5563] mb-3">{p.blurb}</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF6B2B]">
                  Explore the service <ArrowRight size={14} />
                </span>
              </>
            );
            const cls = "block rounded-2xl border bg-white p-5 transition-shadow hover:shadow-md";
            return p.hard ? (
              <a key={k} href={p.href} className={cls} style={{ borderColor: "#E5E7EB" }}>{inner}</a>
            ) : (
              <Link key={k} to={p.href} className={cls} style={{ borderColor: "#E5E7EB" }}>{inner}</Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PillarLinks;
