import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Calendar, ArrowRight, Zap } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { getBlogTheme } from "@/data/blogCategoryTheme";
import { posts as seoBlogPosts } from "@/data/seoBlogPosts";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

type RealBlog = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  createdAt: string;
  content?: string;
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const readTimeOf = (html?: string) => {
  const words = (html || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return words ? `${Math.max(1, Math.round(words / 200))} min read` : "";
};

// Every SEO-flavored category groups under one "SEO" filter pill; only
// non-SEO categories (like "AI Search") get their own pill.
const SEO_CATEGORIES = ["SEO Strategy", "Local SEO", "On-Page SEO", "Technical SEO"];

const BlogPage = () => {
  const s = useSettings([
    'blog_hero_badge', 'blog_hero_heading', 'blog_hero_subtext',
    'blog_cta_text', 'blog_cta_button',
  ]);

  const [realBlogs, setRealBlogs] = useState<RealBlog[] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    fetch(`${API_BASE}/api/blogs?status=published`)
      .then((r) => r.json())
      .then((d) => setRealBlogs(d?.data?.length ? d.data : null))
      .catch(() => setRealBlogs(null));
  }, []);

  const staticSeoPosts = seoBlogPosts.map((p) => ({
    n: p.slug,
    category: p.category,
    title: p.title,
    excerpt: p.metaDescription,
    date: p.dateDisplay,
    readTime: p.readTime,
    slug: p.slug,
  }));

  const dbPosts = realBlogs
    ? realBlogs.map((b) => ({
        n: b.id,
        category: b.category || "SEO",
        title: b.title,
        excerpt: b.excerpt || "",
        date: new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        readTime: readTimeOf(b.content),
        slug: b.slug,
      }))
    : [];

  // Real content always wins over the generic CMS placeholders — the 11
  // SEO/AEO/GEO posts are genuinely live, so they replace the 6 fallback
  // defaults entirely rather than only showing when no DB posts exist.
  const posts = [...staticSeoPosts, ...dbPosts];

  // Non-SEO categories present in the data get their own pill; everything
  // else falls under the single grouped "SEO" pill.
  const otherCategories = useMemo(
    () => Array.from(new Set(posts.map(p => p.category))).filter(c => !SEO_CATEGORIES.includes(c)),
    [posts]
  );

  const filtered = useMemo(() => posts.filter(p => {
    if (activeCategory === "All") return true;
    if (activeCategory === "SEO") return SEO_CATEGORIES.includes(p.category);
    return p.category === activeCategory;
  }), [posts, activeCategory]);


  return (
  <PageLayout>
    {/* Hero */}
    <section className="relative overflow-hidden pt-[72px]" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute animate-drift rounded-full" style={{ width: 600, height: 600, top: "-18%", right: "-10%", background: "radial-gradient(circle at 40% 40%, rgba(255,107,43,0.13) 0%, rgba(255,107,43,0.04) 50%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute animate-drift-2 rounded-full" style={{ width: 520, height: 520, bottom: "-16%", left: "-10%", background: "radial-gradient(circle at 60% 60%, rgba(124,58,237,0.08) 0%, rgba(26,111,232,0.05) 50%, transparent 70%)", filter: "blur(40px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none dot-pattern opacity-40" />

      <div className="max-w-3xl mx-auto px-4 md:px-8 w-full relative z-10 py-14 md:py-20 text-center">
        <motion.div {...fadeUp(0.05)}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5 border animate-ai-glow" style={{ background: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.3)", color: "#7C3AED" }}
            data-cms-key="blog_hero_badge" data-cms-label="Blog Hero Badge" data-cms-attr="text">
            <Zap size={14} fill="#7C3AED" /> {s.blog_hero_badge || 'Blog & Insights'}
          </span>
        </motion.div>

        <motion.h1 {...fadeUp(0.15)} className="text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.12] text-[#0A1628] mb-4 tracking-tight"
          data-cms-key="blog_hero_heading" data-cms-label="Blog Hero Heading" data-cms-attr="text">
          {s.blog_hero_heading || <>Digital Intelligence,<br /><span className="text-orange-gradient">No Fluff.</span></>}
        </motion.h1>

        <motion.p {...fadeUp(0.25)} className="text-lg leading-relaxed mx-auto text-[#4B5563]"
          data-cms-key="blog_hero_subtext" data-cms-label="Blog Hero Subtext" data-cms-attr="text">
          {s.blog_hero_subtext || 'Practical strategies on AI, development, marketing, and design, from the team that actually does it.'}
        </motion.p>
      </div>
    </section>

    {/* Filters */}
    <section className="px-4 md:px-8 relative z-10 pt-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setActiveCategory("All")}
            className="text-xs font-bold px-3.5 py-2 rounded-full border transition-colors"
            style={activeCategory === "All" ? { background: "#0A1628", borderColor: "#0A1628", color: "#fff" } : { background: "#fff", borderColor: "#E5E7EB", color: "#4B5563" }}
          >
            All
          </button>
          {["SEO", ...otherCategories].map(cat => {
            const t = getBlogTheme(cat);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-xs font-bold px-3.5 py-2 rounded-full border transition-colors flex items-center gap-1.5"
                style={isActive ? { background: t.color, borderColor: t.color, color: "#fff" } : { background: t.bg, borderColor: t.border, color: t.color }}
              >
                <t.Icon size={12} /> {cat}
              </button>
            );
          })}
        </div>
      </div>
    </section>

    {/* Grid — every post shown the same way, no special "featured" treatment */}
    <section className="py-14 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-center py-20" style={{ color: "#9CA3AF" }}>No articles match your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => {
              const t = getBlogTheme(p.category);
              const Icon = t.Icon;
              return (
                <motion.div key={p.slug || p.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.05 }}>
                  <Link
                    to={p.slug ? `/blog/${p.slug}` : "#"}
                    className="group flex flex-col h-full rounded-2xl border bg-white overflow-hidden card-hover"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <div className="h-24 flex items-center justify-center relative overflow-hidden" style={{ background: t.bg }}>
                      <div className="absolute inset-0 dot-pattern opacity-20" />
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center relative" style={{ background: "#fff", border: `1px solid ${t.border}` }}>
                        <Icon size={22} style={{ color: t.color }} />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="inline-flex w-fit text-[11px] font-bold px-2.5 py-1 rounded-full mb-3" style={{ color: t.color, background: t.bg }}>
                        {p.category}
                      </span>
                      <h3 className="text-[17px] font-black leading-snug mb-2.5 transition-colors" style={{ color: "#0A1628" }}>{p.title}</h3>
                      <p className="text-[13.5px] leading-relaxed mb-5 flex-1" style={{ color: "#6B7280" }}>
                        {p.excerpt.length > 130 ? p.excerpt.slice(0, 130).trim() + "…" : p.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs pt-4 border-t" style={{ borderColor: "#F3F4F6", color: "#9CA3AF" }}>
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {p.date}</span>
                        <span className="flex items-center gap-1 font-bold group-hover:gap-2 transition-all" style={{ color: t.color }}>
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-16">
          <p className="text-[#6B7280] mb-6" data-cms-key="blog_cta_text" data-cms-label="Blog CTA Text" data-cms-attr="text">
            {s.blog_cta_text || 'Want strategies like these implemented for your business?'}
          </p>
          <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2 inline-flex">
            <span data-cms-key="blog_cta_button" data-cms-label="Blog CTA Button" data-cms-attr="text">
              {s.blog_cta_button || 'Talk to Our Team'}
            </span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
  );
};

export default BlogPage;
