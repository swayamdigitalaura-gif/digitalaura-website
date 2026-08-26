import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useSettings } from "@/hooks/useSettings";
import { posts as seoBlogPosts } from "@/data/seoBlogPosts";
import { getBlogTheme } from "@/data/blogCategoryTheme";

const MotionLink = motion(Link);

const byNewest = (a: { date: string }, b: { date: string }) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

interface BlogInsightsProps {
  /** Show posts from these categories first (e.g. ["Local SEO", "SEO Strategy"]).
   *  Falls back to the latest posts overall when a service has no matching posts yet. */
  categories?: string[];
  heading?: React.ReactNode;
  badge?: string;
}

const BlogInsights = ({ categories, heading, badge }: BlogInsightsProps) => {
  const s = useSettings(["blog_ins_badge_5", "blog_sec_1", "blog_ins_hl_105"]);

  const matched = categories
    ? [...seoBlogPosts].filter(p => categories.includes(p.category)).sort(byNewest)
    : [];
  const backfill = categories
    ? [...seoBlogPosts].filter(p => !categories.includes(p.category)).sort(byNewest)
    : [...seoBlogPosts].sort(byNewest);
  const posts = [...matched, ...backfill].slice(0, 4);

  return (
  <section id="blog" className="pt-20 pb-4 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        {categories ? (
          <>
            <span className="section-badge">{badge || "Blog"}</span>
            <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight">
              {heading || <>Guides &amp; <span className="text-orange-gradient">Insights</span></>}
            </h2>
          </>
        ) : (
          <>
            <span className="section-badge" data-cms-key="blog_ins_badge_5" data-cms-label="Section Badge" data-cms-attr="text">{s.blog_ins_badge_5 || "Blog"}</span>
            <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight">
              <span data-cms-key="blog_sec_1" data-cms-label="Blog Section Heading" data-cms-attr="text">
                {s.blog_sec_1 || <>Digital Intelligence &amp; <span data-cms-key="blog_ins_hl_105" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">{s.blog_ins_hl_105 || "AI Insights"}</span></>}
              </span>
            </h2>
          </>
        )}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((p, i) => {
          const theme = getBlogTheme(p.category);
          return (
            <MotionLink
              key={p.slug}
              to={`/blog/${p.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-hover group rounded-2xl overflow-hidden border bg-white block"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              {/* Thumbnail, icon centered, no emoji */}
              <div
                className="h-44 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.color}05 100%)` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                  style={{ background: `${theme.color}15`, border: `1.5px solid ${theme.color}25` }}
                >
                  <theme.Icon size={32} style={{ color: theme.color }} strokeWidth={1.5} />
                </div>
                {/* Category tag */}
                <span
                  className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ color: theme.color, background: theme.bg }}
                >
                  {p.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-base font-bold text-[#0A1628] mb-3 leading-snug group-hover:text-[#FF6B2B] transition-colors">
                  {p.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                    <Calendar size={12} /> {p.dateDisplay}
                  </span>
                  <span
                    className="text-xs font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                    style={{ color: "#FF6B2B" }}
                  >
                    Read More <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </MotionLink>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <Link to="/blog" className="btn-outline-orange px-8 py-3.5 text-sm gap-2 inline-flex">
          View All Insights <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
  );
};

export default BlogInsights;
