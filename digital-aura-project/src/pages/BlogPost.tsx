import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import {
  ArrowLeft, ArrowRight, Calendar, Clock,
  Linkedin, Link as LinkIcon,
} from "lucide-react";
import { getBlogTheme } from "@/data/blogCategoryTheme";
import sambhavPhoto from "@/assets/sambhav.jpg";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const SITE_URL = "https://thedigitalaura.com";
const ACCENT = "#FF6B2B";
const HEADING = "#0A1628";
const BLUE = "#1A6FE8";

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  category?: string;
  status: string;
  meta_title?: string;
  meta_desc?: string;
  schema_code?: string;
  views?: number;
  createdAt: string;
  updatedAt?: string;
  author?: { id: number; name: string } | null;
};

function setTag(selector: string, valueAttr: string, value: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    const isLink = selector.trimStart().startsWith("link");
    el = document.createElement(isLink ? "link" : "meta");
    const m = selector.match(/\[([^\]=]+)="([^"]+)"\]/);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
}

const readTime = (html?: string) => {
  const words = (html || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const shortTeaser = (text?: string) => {
  if (!text) return "";
  const firstSentence = text.split(/(?<=\.)\s/)[0];
  return firstSentence.length > 140 ? firstSentence.slice(0, 140).trim() + "…" : firstSentence;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [related, setRelated] = useState<Blog[]>([]);
  const [latest, setLatest] = useState<Blog[]>([]);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetch(`${API_BASE}/api/blogs/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!d?.success || !d?.data || d.data.status !== "published") setNotFound(true);
        else setBlog(d.data);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));

    fetch(`${API_BASE}/api/blogs?status=published`)
      .then((r) => r.json())
      .then((d) => {
        const all: Blog[] = d?.data || [];
        const sorted = [...all].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        const sameCategory = sorted.filter((b) => b.slug !== slug && b.category === all.find((x) => x.slug === slug)?.category);
        const others = sorted.filter((b) => b.slug !== slug);
        setRelated((sameCategory.length ? sameCategory : others).slice(0, 3));
        setLatest(others.length > 3 ? others.slice(3, 6) : others.slice(0, 3));
      })
      .catch(() => {});
  }, [slug]);

  // Dynamic SEO tags
  useEffect(() => {
    if (!blog) return;
    const title = blog.meta_title?.trim() || blog.title;
    const desc = blog.meta_desc?.trim() || blog.excerpt || "";
    const canonicalUrl = `${SITE_URL}/blog/${blog.slug}/`;

    document.title = title;
    setTag('meta[name="description"]', "content", desc);
    setTag('meta[property="og:title"]', "content", title);
    setTag('meta[property="og:description"]', "content", desc);
    setTag('meta[name="twitter:title"]', "content", title);
    setTag('meta[name="twitter:description"]', "content", desc);
    setTag('link[rel="canonical"]', "href", canonicalUrl);
    setTag('meta[property="og:url"]', "content", canonicalUrl);
    if (blog.cover_image) {
      setTag('meta[property="og:image"]', "content", blog.cover_image);
      setTag('meta[name="twitter:image"]', "content", blog.cover_image);
    }

    document.head.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
    const schemaJson = blog.schema_code?.trim() || JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: desc,
      image: blog.cover_image || undefined,
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt || blog.createdAt,
      author: { "@type": "Organization", name: blog.author?.name || "Digital Aura" },
      publisher: { "@type": "Organization", name: "Digital Aura", url: SITE_URL },
      mainEntityOfPage: canonicalUrl,
    });
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = schemaJson;
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [blog]);

  if (loading) return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center pt-[72px]">
        <div className="w-10 h-10 rounded-full border-4 border-[#FF6B2B] border-t-transparent animate-spin" />
      </div>
    </PageLayout>
  );

  if (notFound || !blog) return (
    <PageLayout>
      <div className="min-h-screen flex flex-col items-center justify-center pt-[72px] gap-4">
        <h2 className="text-2xl font-black text-[#0A1628]">Blog post not found</h2>
        <Link to="/blog" className="btn-orange px-6 py-3 text-sm gap-2 inline-flex items-center">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>
    </PageLayout>
  );

  const canonicalUrl = `${SITE_URL}/blog/${blog.slug}`;
  const minutes = readTime(blog.content);
  const dateStr = fmtDate(blog.createdAt);
  const theme = getBlogTheme(blog.category);
  const CategoryIcon = theme.Icon;
  const authorName = blog.author?.name || "Sambhav Shah";

  return (
    <PageLayout>
      <div className="pt-[72px]">
        {/* Hero */}
        <section className="relative overflow-hidden pt-8 pb-10" style={{ background: "#fff" }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute animate-drift rounded-full" style={{ width: 560, height: 560, top: "-18%", right: "-8%", background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`, filter: "blur(60px)" }} />
            <div className="absolute animate-drift-2 rounded-full" style={{ width: 380, height: 380, bottom: "-10%", left: "-6%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute inset-0 dot-pattern opacity-20" />
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto relative z-10 py-10 text-center px-5">
            <Link to="/blog" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: theme.color }}>
              ← Back to All Articles
            </Link>
            {blog.category && (
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full" style={{ color: theme.color, background: theme.bg, border: `1px solid ${theme.border}` }}>
                  <CategoryIcon size={13} /> {blog.category}
                </span>
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight mb-5 leading-[1.15]" style={{ color: HEADING }}>
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="text-lg mb-8 leading-relaxed max-w-xl mx-auto text-[#4B5563]">{shortTeaser(blog.excerpt)}</p>
            )}
            <div className="flex flex-wrap items-center gap-5 text-sm justify-center text-[#6B7280]">
              <span className="flex items-center gap-1.5"><Calendar size={14} style={{ color: theme.color }} /> {dateStr}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} style={{ color: theme.color }} /> {minutes} min read</span>
              <span>By <strong style={{ color: HEADING }}>{authorName}</strong></span>
            </div>
          </motion.div>
        </section>

        {/* Body + sidebar */}
        <section className="py-12 px-5 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 lg:items-start">
            <div className="lg:col-span-2 min-w-0">
              <div
                className="blog-prose"
                style={{ ["--accent" as string]: theme.color }}
                dangerouslySetInnerHTML={{ __html: blog.content || "" }}
              />

              {/* Author box */}
              <div className="mt-12 rounded-2xl p-6 md:p-8 border" style={{ borderColor: "#E5E7EB", background: "#F8FAFF" }}>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] mb-5 flex items-center gap-2" style={{ color: HEADING }}>
                  <span className="w-4 h-0.5 rounded-full" style={{ background: theme.color }} /> About the Author
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="shrink-0 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden" style={{ boxShadow: `0 8px 32px ${theme.glow}`, border: `3px solid ${theme.border}` }}>
                      <img src={sambhavPhoto} alt={authorName} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="sm:hidden">
                      <p className="font-black text-lg leading-tight" style={{ color: HEADING }}>{authorName}</p>
                      <p className="text-sm font-semibold" style={{ color: theme.color }}>Founder, Digital Aura</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="hidden sm:block mb-3">
                      <p className="font-black text-xl leading-tight" style={{ color: HEADING }}>{authorName}</p>
                      <p className="text-sm font-semibold" style={{ color: theme.color }}>Founder, Digital Aura</p>
                    </div>
                    <p className="text-[15px] leading-relaxed mb-3 text-[#4B5563]">
                      Sambhav didn't learn digital marketing in a classroom. Starting in 2015, he built his expertise the hard way — self-taught, hands-on, scaling teams and driving growth across industries for over a decade.
                    </p>
                    <p className="text-sm leading-relaxed text-[#4B5563]">
                      With 10+ years of cross-functional experience in client acquisition, team leadership, and digital execution, he's personally involved in strategy on every engagement Digital Aura takes on.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {["SEO Strategy", "Performance Marketing", "AI Solutions", "Team Leadership"].map((tag) => (
                        <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "#fff", color: theme.color, border: `1px solid ${theme.border}` }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t flex items-center justify-between flex-wrap gap-4" style={{ borderColor: "#E5E7EB" }}>
                <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all" style={{ color: theme.color }}>
                  <ArrowLeft size={14} /> Back to all posts
                </Link>
                <div className="flex items-center gap-2">
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn"
                    className="grid h-9 w-9 place-items-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] transition-all hover:-translate-y-0.5" style={{ borderColor: "#E5E7EB" }}>
                    <Linkedin size={15} />
                  </a>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF]"><LinkIcon size={12} /> {canonicalUrl.replace("https://", "")}</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl p-6 border overflow-hidden relative" style={{ borderColor: "#E5E7EB" }}>
                <div className="h-1.5 w-full rounded-full mb-5" style={{ background: `linear-gradient(90deg, ${theme.color}, #7C3AED)` }} />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: theme.bg, border: `1px solid ${theme.border}` }}>
                  <CategoryIcon size={18} style={{ color: theme.color }} />
                </div>
                <h3 className="font-black text-base mb-2" style={{ color: HEADING }}>Want results like this?</h3>
                <p className="text-xs mb-4 leading-relaxed text-[#6B7280]">Talk to Digital Aura about your growth.</p>
                <Link to="/contact" className="btn-orange w-full py-3 text-sm inline-flex items-center justify-center gap-2">
                  Get in Touch <ArrowRight size={14} />
                </Link>
              </div>

              {related.length > 0 && (
                <div className="rounded-2xl p-6 border" style={{ borderColor: "#E5E7EB" }}>
                  <h3 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: HEADING }}>
                    <span className="w-4 h-0.5 rounded-full" style={{ background: theme.color }} /> More Posts
                  </h3>
                  <div className="space-y-3">
                    {related.map((b) => {
                      const bTheme = getBlogTheme(b.category);
                      return (
                        <Link key={b.id} to={`/blog/${b.slug}`} className="block p-3 rounded-xl border-l-4 border transition-all" style={{ borderColor: "#E5E7EB", borderLeftColor: bTheme.color }}>
                          <p className="text-sm font-bold leading-snug" style={{ color: HEADING }}>{b.title}</p>
                          {b.category && <p className="text-xs mt-1 font-semibold" style={{ color: bTheme.color }}>{b.category}</p>}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {latest.length > 0 && <LatestPosts items={latest} />}
        <FinalCTA />
      </div>
    </PageLayout>
  );
};

function LatestPosts({ items }: { items: Blog[] }) {
  return (
    <section className="border-t border-[#E5E7EB] px-5 py-16 lg:px-8" style={{ background: "#F8FAFF" }}>
      <div className="mx-auto max-w-[1240px]">
        <div className="text-[12px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Fresh off the press</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl" style={{ color: HEADING }}>Latest posts</h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((b) => {
            const bTheme = getBlogTheme(b.category);
            const Icon = bTheme.Icon;
            return (
              <Link key={b.id} to={`/blog/${b.slug}`} className="group flex flex-col h-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all hover:-translate-y-1 hover:shadow-lg" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="h-20 flex items-center justify-center relative overflow-hidden" style={{ background: bTheme.bg }}>
                  <div className="absolute inset-0 dot-pattern opacity-20" />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center relative" style={{ background: "#fff", border: `1px solid ${bTheme.border}` }}>
                    <Icon size={18} style={{ color: bTheme.color }} />
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  {b.category && (
                    <span className="w-fit rounded-full px-2.5 py-0.5 text-[12px] font-semibold mb-2.5" style={{ background: bTheme.bg, color: bTheme.color }}>{b.category}</span>
                  )}
                  <h3 className="text-[16px] font-bold leading-snug transition-colors group-hover:text-[#FF6B2B]" style={{ color: HEADING }}>{b.title}</h3>
                  {b.excerpt && <p className="mt-2 text-[13.5px] leading-relaxed text-[#6B7280] line-clamp-2 flex-1">{b.excerpt}</p>}
                  <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold" style={{ color: bTheme.color }}>
                    Read more <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-16 px-5 lg:px-8 relative overflow-hidden text-center" style={{ background: HEADING }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(255,107,43,0.1) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${ACCENT}, #7C3AED, ${BLUE})` }} />
      <div className="absolute top-8 left-8 w-48 h-48 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle, ${ACCENT}, transparent)` }} />
      <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
      <div className="max-w-2xl mx-auto relative z-10">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-[#FF6B2B]" style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)" }}>
          Let's Build Together
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Ready to Grow Faster?</h2>
        <p className="text-[#E2E8F0] mb-8 leading-relaxed">
          Book a free strategy session with our senior team — we'll audit your funnel and hand you a 30-day action plan.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/contact" className="btn-orange px-7 py-3.5 text-[15px] gap-2 inline-flex items-center">
            Book a free strategy session <ArrowRight size={16} />
          </Link>
          <Link to="/case-studies" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10">
            View our work
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BlogPost;
