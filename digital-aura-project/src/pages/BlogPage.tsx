import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Calendar, ArrowRight, TrendingUp, Target, DollarSign, Bot, Code2, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

type RealBlog = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  createdAt: string;
};

const POST_ICONS: LucideIcon[] = [TrendingUp, Target, DollarSign, Bot, Code2, Palette];
const POST_COLORS = ["#1A6FE8", "#FF6B2B", "#22C55E", "#7C3AED", "#1A6FE8", "#F59E0B"];
const POST_BG = [
  "rgba(26,111,232,0.1)", "rgba(255,107,43,0.1)", "rgba(34,197,94,0.1)",
  "rgba(124,58,237,0.1)", "rgba(26,111,232,0.1)", "rgba(245,158,11,0.1)",
];

const POST_DEFAULTS = [
  { category: "SEO",             title: "10 SEO Strategies That Will Dominate Google in 2025",                                     excerpt: "AI generated content, EEAT signals, and Core Web Vitals, here's what's actually moving the needle this year.",                                                                            date: "Mar 28, 2025", readTime: "6 min read" },
  { category: "Meta Ads",        title: "How Meta Ads Can Triple Your Leads in 30 Days",                                           excerpt: "A breakdown of the exact audience structure, creative format, and bidding strategy we use to hit 3x ROAS consistently.",                                                             date: "Mar 15, 2025", readTime: "8 min read" },
  { category: "Google Ads",      title: "Why Your Google Ads Are Losing Money (And How to Fix It)",                                excerpt: "The 5 most common mistakes that drain ad budgets, and the exact fixes that have saved our clients lakhs every month.",                                                                    date: "Feb 20, 2025", readTime: "7 min read" },
  { category: "AI & Automation", title: "How We Built an AI Chatbot That Reduced Support Tickets by 68%",                          excerpt: "A technical walkthrough of how we architected a GPT-4 powered support assistant for an eCommerce brand, from prompt engineering to deployment.",                                           date: "Feb 5, 2025",  readTime: "10 min read" },
  { category: "Development",     title: "SaaS MVP in 6 Weeks: Our Full Stack Development Framework",                               excerpt: "The exact tech stack, sprint structure, and delivery process we use to launch production-ready MVPs faster than any agency.",                                                          date: "Jan 22, 2025", readTime: "9 min read" },
  { category: "Design",          title: "Why 90% of Landing Pages Fail (And What Great Design Actually Looks Like)",               excerpt: "A teardown of 50 landing pages, the patterns that kill conversion and the design decisions that consistently outperform.",                                                               date: "Jan 10, 2025", readTime: "7 min read" },
];

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

  useEffect(() => {
    fetch(`${API_BASE}/api/blogs?status=published`)
      .then((r) => r.json())
      .then((d) => setRealBlogs(d?.data?.length ? d.data : null))
      .catch(() => setRealBlogs(null));
  }, []);

  const fallbackPosts = POST_DEFAULTS.map((def, i) => ({
    n: i + 1,
    Icon: POST_ICONS[i],
    catColor: POST_COLORS[i],
    catBg: POST_BG[i],
    category: s[`blog_post${i+1}_cat`] || def.category,
    title: s[`blog_post${i+1}_title`] || def.title,
    excerpt: s[`blog_post${i+1}_excerpt`] || def.excerpt,
    date: s[`blog_post${i+1}_date`] || def.date,
    readTime: s[`blog_post${i+1}_readtime`] || def.readTime,
    href: "#",
    slug: null as string | null,
  }));

  // Use real published blogs from the CMS/API when available; otherwise
  // fall back to the CMS-settings-driven placeholder posts.
  const posts = realBlogs
    ? realBlogs.map((b, i) => ({
        n: i + 1,
        Icon: POST_ICONS[i % POST_ICONS.length],
        catColor: POST_COLORS[i % POST_COLORS.length],
        catBg: POST_BG[i % POST_BG.length],
        category: b.category || "Blog",
        title: b.title,
        excerpt: b.excerpt || "",
        date: new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        readTime: "",
        href: `/blog/${b.slug}`,
        slug: b.slug,
      }))
    : fallbackPosts;

  return (
  <PageLayout>
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full animate-drift" style={{ width: 500, height: 500, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(26,111,232,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none dot-pattern opacity-30" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
            style={{ background: "rgba(26,111,232,0.1)", color: "#1A6FE8", border: "1px solid rgba(26,111,232,0.25)" }}
            data-cms-key="blog_hero_badge" data-cms-label="Blog Hero Badge" data-cms-attr="text">
            {s.blog_hero_badge || 'Blog & Insights'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.1] text-[#0A1628] mb-6 tracking-tight"
            data-cms-key="blog_hero_heading" data-cms-label="Blog Hero Heading" data-cms-attr="text">
            {s.blog_hero_heading || 'Digital Intelligence, No Fluff.'}
          </h1>
          <p className="text-lg text-[#4B5563] max-w-xl mx-auto"
            data-cms-key="blog_hero_subtext" data-cms-label="Blog Hero Subtext" data-cms-attr="text">
            {s.blog_hero_subtext || 'Practical strategies on AI, development, marketing, and design, from the team that actually does it.'}
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.a key={p.slug || i} href={p.href}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
              className="card-hover group rounded-2xl overflow-hidden border bg-white block"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="h-44 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${p.catBg} 0%, rgba(255,255,255,0.5) 100%)` }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                  style={{ background: `${p.catColor}15`, border: `1.5px solid ${p.catColor}25` }}>
                  <p.Icon size={32} style={{ color: p.catColor }} strokeWidth={1.5} />
                </div>
                <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ color: p.catColor, background: p.catBg }}
                  {...(!p.slug && { 'data-cms-key': `blog_post${p.n}_cat`, 'data-cms-label': `Blog Post ${p.n} Category`, 'data-cms-attr': 'text' })}>
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <h2 className="text-base font-bold text-[#0A1628] mb-2 leading-snug group-hover:text-[#FF6B2B] transition-colors"
                  {...(!p.slug && { 'data-cms-key': `blog_post${p.n}_title`, 'data-cms-label': `Blog Post ${p.n} Title`, 'data-cms-attr': 'text' })}>
                  {p.title}
                </h2>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-4"
                  {...(!p.slug && { 'data-cms-key': `blog_post${p.n}_excerpt`, 'data-cms-label': `Blog Post ${p.n} Excerpt`, 'data-cms-attr': 'text' })}>
                  {p.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                    <Calendar size={11} />
                    <span {...(!p.slug && { 'data-cms-key': `blog_post${p.n}_date`, 'data-cms-label': `Blog Post ${p.n} Date`, 'data-cms-attr': 'text' })}>{p.date}</span>
                    {p.readTime && (
                      <>
                        {" · "}
                        <span {...(!p.slug && { 'data-cms-key': `blog_post${p.n}_readtime`, 'data-cms-label': `Blog Post ${p.n} Read Time`, 'data-cms-attr': 'text' })}>{p.readTime}</span>
                      </>
                    )}
                  </span>
                  <span className="text-xs font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: "#FF6B2B" }}>
                    Read <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-[#6B7280] mb-6"
            data-cms-key="blog_cta_text" data-cms-label="Blog CTA Text" data-cms-attr="text">
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
