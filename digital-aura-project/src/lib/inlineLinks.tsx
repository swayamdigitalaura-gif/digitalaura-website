import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Renders a plain string that may contain markdown-style links: "see [our SEO guide](/seo/pricing/) first".
 * Strings without a link render exactly as before. In-app paths use the router Link; the two pillar pages
 * served by separate apps (SEO, Google Ads) and anything external use a normal anchor.
 */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const HARD = /^\/(seo-services-ahmedabad|google-ads-agency-ahmedabad|digital-marketing-company-ahmedabad)\/?$/;

export function renderInline(text: string): ReactNode {
  if (!text.includes("](")) return text;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK.lastIndex = 0;
  while ((m = LINK.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, label, href] = m;
    const cls = "font-semibold underline underline-offset-2 hover:opacity-80";
    out.push(
      href.startsWith("/") && !HARD.test(href)
        ? <Link key={out.length} to={href} className={cls}>{label}</Link>
        : <a key={out.length} href={href} className={cls}>{label}</a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <Fragment>{out}</Fragment>;
}
