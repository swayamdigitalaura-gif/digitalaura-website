import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GUIDES, PILLARS, topicForParent } from "@/data/linkMap";

const NAVY = "#0A1628";

/**
 * "Guides from our team" block for cluster pages: three blog posts on the same topic, with the pillar page linked in the
 * heading, so a cluster page links up (pillar) and across (blog). Plain anchors, so they are in the prerendered HTML.
 */
export default function RelatedGuides({ parentHref, accent }: { parentHref: string; accent: string }) {
  const topic = topicForParent(parentHref);
  if (!topic) return null;
  const guides = GUIDES[topic].slice(0, 3);
  const pillar = PILLARS[topic];
  return (
    <section aria-label="Related guides" className="bg-white py-10 px-4 md:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-[13px] font-black uppercase tracking-[0.14em]" style={{ color: NAVY }}>Guides from our team</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#4B5563]">
          Read the thinking behind this page, or go back to our <a href={pillar.href} className="font-semibold underline" style={{ color: accent }}>{pillar.short}</a> page for the full picture.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link to={`/blog/${g.slug}/`} className="group flex h-full flex-col justify-between gap-3 rounded-2xl border bg-white p-4 transition-shadow hover:shadow-md" style={{ borderColor: "#E5E7EB" }}>
                <span className="text-[15px] font-bold leading-snug" style={{ color: NAVY }}>{g.title}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: accent }}>Read the guide <ArrowRight size={14} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
