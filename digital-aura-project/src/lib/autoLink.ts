import type { Topic } from "@/data/linkMap";

/**
 * Turns existing words in a blog post into internal links (first mention only), so no sentence has to be added just to host a
 * link. Anchor text is exactly what the author wrote. Text inside headings, existing links, code and buttons is left alone,
 * a target already linked in the post is skipped, and the total is capped, so the page never looks stuffed.
 */
type Rule = { re: RegExp; href: string };

const RULES: Record<Topic, Rule[]> = {
  seo: [
    { re: /\bSEO (?:services|company|agency) in Ahmedabad\b/i, href: "/seo-services-ahmedabad" },
    { re: /\bfree SEO audit\b/i, href: "/seo/free-audit/" },
    { re: /\bSEO (?:pricing|packages|cost)\b/i, href: "/seo/pricing-ahmedabad/" },
    { re: /\btechnical SEO\b/i, href: "/services/seo-content-marketing/technical-seo/" },
    { re: /\bon-page SEO\b/i, href: "/services/seo-content-marketing/on-page-seo/" },
    { re: /\blocal SEO\b/i, href: "/services/seo-content-marketing/local-seo/" },
    { re: /\b(?:ecommerce|e-commerce) SEO\b/i, href: "/services/seo-content-marketing/ecommerce-seo/" },
    { re: /\bSEO audit\b/i, href: "/services/seo-content-marketing/seo-audit-strategy/" },
  ],
  gads: [
    { re: /\bGoogle Ads (?:management|agency)\b/i, href: "/google-ads-agency-ahmedabad" },
    { re: /\bGoogle Ads audit\b/i, href: "/google-ads-audit-ahmedabad/" },
    { re: /\bGoogle Ads (?:pricing|costs?)\b/i, href: "/google-ads-pricing-ahmedabad/" },
  ],
  meta: [
    { re: /\bMeta ads (?:management|agency)\b/i, href: "/meta-ads-agency-ahmedabad/" },
    { re: /\bMeta ads (?:pricing|costs?)\b/i, href: "/meta-ads-agency-ahmedabad/pricing/" },
  ],
  web: [],
};

const SKIP = /^(a|h[1-6]|code|pre|button|script|style|summary|th)$/i;

export function autoLink(html: string, topic: Topic, selfHref: string, max = 5): string {
  const rules = RULES[topic].filter((r) => r.href !== selfHref && !html.includes(`href="${r.href}"`));
  if (!rules.length) return html;
  const used = new Set<string>();
  let added = 0;
  const depth: string[] = [];
  return html
    .split(/(<[^>]+>)/g)
    .map((tok) => {
      if (tok.startsWith("<")) {
        const m = tok.match(/^<(\/)?([a-zA-Z0-9]+)/);
        if (m && SKIP.test(m[2]) && !/\/>$/.test(tok)) {
          if (m[1]) depth.pop();
          else depth.push(m[2]);
        }
        return tok;
      }
      if (depth.length || added >= max || !tok.trim()) return tok;
      let out = tok;
      for (const r of rules) {
        if (added >= max || used.has(r.href)) continue;
        const m = r.re.exec(out);
        if (!m) continue;
        out = out.slice(0, m.index) + `<a href="${r.href}">${m[0]}</a>` + out.slice(m.index + m[0].length);
        used.add(r.href);
        added++;
        break; // one link per text node keeps links apart
      }
      return out;
    })
    .join("");
}
