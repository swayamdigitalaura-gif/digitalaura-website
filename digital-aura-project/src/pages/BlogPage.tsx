import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Calendar, Clock, ArrowRight, Search, Zap, CheckCircle2, BadgeCheck, BookOpen } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { getBlogTheme } from "@/data/blogCategoryTheme";

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

const POST_DEFAULTS = [
  { category: "SEO",             title: "10 SEO Strategies That Will Dominate Google in 2025",                                     excerpt: "AI generated content, EEAT signals, and Core Web Vitals, here's what's actually moving the needle this year.",                                                                            date: "Mar 28, 2025", readTime: "6 min read" },
  { category: "Meta Ads",        title: "How Meta Ads Can Triple Your Leads in 30 Days",                                           excerpt: "A breakdown of the exact audience structure, creative format, and bidding strategy we use to hit 3x ROAS consistently.",                                                             date: "Mar 15, 2025", readTime: "8 min read" },
  { category: "Google Ads",      title: "Why Your Google Ads Are Losing Money (And How to Fix It)",                                excerpt: "The 5 most common mistakes that drain ad budgets, and the exact fixes that have saved our clients lakhs every month.",                                                                    date: "Feb 20, 2025", readTime: "7 min read" },
  { category: "AI & Automation", title: "How We Built an AI Chatbot That Reduced Support Tickets by 68%",                          excerpt: "A technical walkthrough of how we architected a GPT-4 powered support assistant for an eCommerce brand, from prompt engineering to deployment.",                                           date: "Feb 5, 2025",  readTime: "10 min read" },
  { category: "Development",     title: "SaaS MVP in 6 Weeks: Our Full Stack Development Framework",                               excerpt: "The exact tech stack, sprint structure, and delivery process we use to launch production-ready MVPs faster than any agency.",                                                          date: "Jan 22, 2025", readTime: "9 min read" },
  { category: "Design",          title: "Why 90% of Landing Pages Fail (And What Great Design Actually Looks Like)",               excerpt: "A teardown of 50 landing pages, the patterns that kill conversion and the design decisions that consistently outperform.",                                                               date: "Jan 10, 2025", readTime: "7 min read" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const readTimeOf = (html?: string) => {
  const words = (html || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return words ? `${Math.max(1, Math.round(words / 200))} min read` : "";
};

const BlogPage = () => {
  const s = useSettings([
    'blog_hero_badge', 'blog_hero_heading', 'blog_hero_subtext',
    'blog_post1_cat', 'blog_post1_title', 'blog_post1_excerpt', 'blog_post1_date', 'blog_post1_readtime',
    'blog_post2_cat', 'blog_post2_title', 'blog_post2_excerpt', 'blog_post2_date', 'blog_post2_readtime',
    'blog_post3_cat', 'blog_post3_title', 'blog_post3_excerpt', 'blog_post3_date', 'blog_post3_readtime',
    'blog_post4_cat', 'blog_post4_title', 'blog_post4_excerpt', 'blog_post4_date', 'blog_post4_readtime',
    'blog_post5_cat', 'blog_post5_title', 'blog_post5_excerpt', 'blog_post5_date', 'blog_post5_readtime',
    'blog_post6_cat', 'blog_post6_title', 'blog_post6_excerpt', 'blog_post6_date', 'blog_post6_readtime',
    'blog_cta_text', 'blog_cta_button',
  ]);

  const [realBlogs, setRealBlogs] = useState<RealBlog[] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/blogs?status=published`)
      .then((r) => r.json())
      .then((d) => setRealBlogs(d?.data?.length ? d.data : null))
      .catch(() => setRealBlogs(null));
  }, []);

  const fallbackPosts = POST_DEFAULTS.map((def, i) => ({
    n: i + 1,
    category: s[`blog_post${i + 1}_cat`] || def.category,
    title: s[`blog_post${i + 1}_title`] || def.title,
    excerpt: s[`blog_post${i + 1}_excerpt`] || def.excerpt,
    date: s[`blog_post${i + 1}_date`] || def.date,
    readTime: s[`blog_post${i + 1}_readtime`] || def.readTime,
    slug: null as string | null,
  }));

  const posts = realBlogs
    ? realBlogs.map((b) => ({
        n: b.id,
        category: b.category || "SEO",
        title: b.title,
        excerpt: b.excerpt || "",
        date: new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        readTime: readTimeOf(b.content),
        slug: b.slug,
      }))
    : fallbackPosts;

  const categories = useMemo(() => Array.from(new Set(posts.map(p => p.category))), [posts]);

  const filtered = useMemo(() => posts.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesQuery = query.trim() === "" || p.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [posts, activeCategory, query]);

  const isDefaultView = activeCategory === "All" && query.trim() === "";
  const featured = posts[0];
  const featuredTheme = getBlogTheme(featured?.category);
  const FeaturedIcon = featuredTheme.Icon;

  return (
  <PageLayout>
    {/* Hero */}
    <section className="relative overflow-hidden pt-[72px]" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute animate-drift rounded-full" style={{ width: 600, height: 600, top: "-18%", right: "-10%", background: "radial-gradient(circle at 40% 40%, rgba(255,107,43,0.13) 0%, rgba(255,107,43,0.04) 50%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute animate-drift-2 rounded-full" style={{ width: 520, height: 520, bottom: "-16%", left: "-10%", background: "radial-gradient(circle at 60% 60%, rgba(124,58,237,0.08) 0%, rgba(26,111,232,0.05) 50%, transparent 70%)", filter: "blur(40px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none dot-pattern opacity-40" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 py-14 md:py-20">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3">
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

            <motion.p {...fadeUp(0.25)} className="text-lg leading-relaxed mb-7 max-w-lg text-[#4B5563]"
              data-cms-key="blog_hero_subtext" data-cms-label="Blog Hero Subtext" data-cms-attr="text">
              {s.blog_hero_subtext || 'Practical strategies on AI, development, marketing, and design, from the team that actually does it.'}
            </motion.p>

            <motion.div {...fadeUp(0.35)} className="flex flex-wrap gap-x-6 gap-y-3">
              {["Written by Practitioners", "No Recycled Advice", "Updated Regularly"].map((t) => (
                <span key={t} className="flex items-center gap-2 text-sm font-medium text-[#374151]">
                  <CheckCircle2 size={16} className="text-[#22C55E] shrink-0" /> {t}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-2 hidden lg:flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: 40, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="animate-bob w-full max-w-[320px]"
            >
              <div className="rounded-2xl p-6 border" style={{ background: "#fff", borderColor: "#E5E7EB", boxShadow: "0 24px 64px rgba(0,0,0,0.10), 0 4px 16px rgba(124,58,237,0.07)" }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold" style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED" }}>
                      <BookOpen size={10} /> Blog
                    </div>
                    <h3 className="font-bold text-[#0A1628] text-sm">Content Library</h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse-ring" />
                    <span className="text-xs text-[#22C55E] font-semibold">Live</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl p-3.5" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                    <p className="text-2xl font-black" style={{ color: "#FF6B2B" }}>{posts.length}</p>
                    <p className="text-[11px] font-semibold text-[#6B7280] mt-0.5">Articles</p>
                  </div>
                  <div className="rounded-xl p-3.5" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                    <p className="text-2xl font-black" style={{ color: "#7C3AED" }}>{categories.length}</p>
                    <p className="text-[11px] font-semibold text-[#6B7280] mt-0.5">Categories</p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap mb-4">
                  {categories.slice(0, 3).map(cat => {
                    const t = getBlogTheme(cat);
                    return (
                      <span key={cat} className="text-xs font-semibold px-2.5 py-1 rounded-full border" style={{ color: t.color, background: t.bg, borderColor: t.bg }}>
                        {cat}
                      </span>
                    );
                  })}
                </div>

                <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: "#F3F4F6" }}>
                  <div>
                    <p className="text-xs text-[#6B7280]">Written by</p>
                    <p className="text-sm font-bold text-[#0A1628]">Digital Aura Team</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(124,58,237,0.08)" }}>
                    <BadgeCheck size={14} style={{ color: "#7C3AED" }} />
                    <span className="text-[11px] font-bold" style={{ color: "#7C3AED" }}>Verified Experts</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    {/* Filters */}
    <section className="px-4 md:px-8 relative z-10 pb-2">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl border shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center" style={{ borderColor: "#E5E7EB" }}>
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none border"
            style={{ borderColor: "#E5E7EB", color: "#0A1628" }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("All")}
            className="text-xs font-bold px-3.5 py-2 rounded-full border transition-colors"
            style={activeCategory === "All" ? { background: "#0A1628", borderColor: "#0A1628", color: "#fff" } : { background: "#fff", borderColor: "#E5E7EB", color: "#4B5563" }}
          >
            All
          </button>
          {categories.map(cat => {
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

    {/* Featured post */}
    {isDefaultView && featured && (
      <section className="px-4 md:px-8 pt-10">
        <div className="max-w-6xl mx-auto">
          <Link
            to={featured.slug ? `/blog/${featured.slug}` : "#"}
            className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border card-hover"
            style={{ borderColor: "#E5E7EB" }}
          >
            <div className="p-8 md:p-10 flex flex-col justify-center relative overflow-hidden" style={{ background: "#0A1628" }}>
              <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${featuredTheme.color}33 0%, transparent 70%)` }} />
              <span className="relative inline-flex w-fit items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full mb-4" style={{ color: featuredTheme.color, background: "rgba(255,255,255,0.08)" }}>
                <FeaturedIcon size={12} /> Featured &middot; {featured.category}
              </span>
              <h2 className="relative text-2xl md:text-3xl font-black text-white leading-tight mb-3">{featured.title}</h2>
              <p className="relative text-sm mb-5 leading-relaxed" style={{ color: "#CBD5E1" }}>{featured.excerpt}</p>
              <div className="relative flex items-center gap-4 text-xs mb-5" style={{ color: "#9CA3AF" }}>
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {featured.date}</span>
                {featured.readTime && <span className="flex items-center gap-1.5"><Clock size={12} /> {featured.readTime}</span>}
              </div>
              <span className="relative inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all w-fit" style={{ color: featuredTheme.color }}>
                Read Article <ArrowRight size={14} />
              </span>
            </div>
            <div className="hidden md:flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${featuredTheme.bg}, rgba(124,58,237,0.08))` }}>
              <div className="absolute inset-0 dot-pattern opacity-25" />
              <FeaturedIcon size={120} strokeWidth={1} style={{ color: featuredTheme.color, opacity: 0.25 }} />
            </div>
          </Link>
        </div>
      </section>
    )}

    {/* Grid */}
    <section className="py-14 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-center py-20" style={{ color: "#9CA3AF" }}>No articles match your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(isDefaultView ? filtered.slice(1) : filtered).map((p, i) => {
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
