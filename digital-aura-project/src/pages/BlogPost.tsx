import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { ArrowLeft, ArrowRight, Calendar, ChevronRight, Clock, Tag } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const SITE_URL = "https://thedigitalaura.com";
const ACCENT = "#1A6FE8";

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  category?: string;
  tags?: string;
  status: string;
  meta_title?: string;
  meta_desc?: string;
  schema_code?: string;
  createdAt: string;
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
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [related, setRelated] = useState<Blog[]>([]);
  const schemaRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetch(`${API_BASE}/api/blogs/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!d?.success || !d?.data || d.data.status !== "published") {
          setNotFound(true);
        } else {
          setBlog(d.data);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));

    fetch(`${API_BASE}/api/blogs?status=published`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.data) setRelated(d.data.filter((b: Blog) => b.slug !== slug).slice(0, 3));
      })
      .catch(() => {});
  }, [slug]);

  // Dynamic SEO tags for this specific blog post
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

    if (schemaRef.current) { schemaRef.current.remove(); schemaRef.current = null; }
    const schemaJson = blog.schema_code?.trim() || JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: desc,
      image: blog.cover_image || undefined,
      datePublished: blog.createdAt,
      author: { "@type": "Organization", name: "Digital Aura" },
      publisher: { "@type": "Organization", name: "Digital Aura", url: SITE_URL },
      mainEntityOfPage: canonicalUrl,
    });
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = schemaJson;
    document.head.appendChild(script);
    schemaRef.current = script;

    return () => {
      if (schemaRef.current) { schemaRef.current.remove(); schemaRef.current = null; }
    };
  }, [blog]);

  if (loading) return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center pt-[72px]">
        <div className="w-10 h-10 rounded-full border-4 border-[#1A6FE8] border-t-transparent animate-spin" />
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

  const dateStr = new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-[72px] pb-10 px-4 md:px-8 relative overflow-hidden" style={{ background: "#F8FAFF" }}>
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 pt-10">
          <nav className="flex items-center gap-2 text-xs text-[#9CA3AF] mb-8">
            <Link to="/" className="hover:text-[#1A6FE8] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/blog" className="hover:text-[#1A6FE8] transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-[#0A1628] font-semibold truncate">{blog.title}</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {blog.category && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full mb-4"
                style={{ color: ACCENT, background: "rgba(26,111,232,0.1)" }}>
                <Tag size={11} /> {blog.category}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">{blog.title}</h1>
            <div className="flex flex-wrap gap-5 text-sm text-[#6B7280]">
              <span className="flex items-center gap-1.5"><Calendar size={14} style={{ color: ACCENT }} /> {dateStr}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} style={{ color: ACCENT }} /> {readTime(blog.content)}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 md:px-8" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          <div className="lg:col-span-2 space-y-8">
            {blog.cover_image && (
              <img src={blog.cover_image} alt={blog.title} className="w-full rounded-2xl object-cover max-h-96" />
            )}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[#4B5563] leading-relaxed text-[15px] [&_h2]:font-black [&_h2]:text-[#0A1628] [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-bold [&_h3]:text-[#0A1628] [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_li]:leading-relaxed [&_p]:mb-4 [&_a]:text-[#1A6FE8] [&_a]:underline [&_strong]:font-semibold [&_strong]:text-[#0A1628] [&_img]:rounded-xl [&_img]:my-4"
              dangerouslySetInnerHTML={{ __html: blog.content || "" }} />

            <div className="pt-6 border-t" style={{ borderColor: "#E5E7EB" }}>
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all" style={{ color: ACCENT }}>
                <ArrowLeft size={14} /> Back to all posts
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl p-6 border sticky top-24" style={{ borderColor: "#E5E7EB" }}>
              <div className="h-1 w-full rounded-full mb-5" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}44)` }} />
              <h3 className="font-black text-[#0A1628] text-base mb-2">Want results like this?</h3>
              <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">Talk to our team about your project.</p>
              <Link to="/contact"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
                style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}cc)` }}>
                Get in Touch <ArrowRight size={14} />
              </Link>
            </div>

            {related.length > 0 && (
              <div className="rounded-2xl p-6 border" style={{ borderColor: "#E5E7EB" }}>
                <h3 className="font-black text-[#0A1628] text-base mb-4">More Posts</h3>
                <div className="space-y-3">
                  {related.map((b) => (
                    <Link key={b.id} to={`/blog/${b.slug}`}
                      className="block p-3 rounded-xl border hover:border-[#1A6FE8] transition-all group"
                      style={{ borderColor: "#E5E7EB" }}>
                      <p className="text-sm font-bold text-[#0A1628] group-hover:text-[#1A6FE8] transition-colors leading-snug">{b.title}</p>
                      {b.category && <p className="text-xs text-[#9CA3AF] mt-0.5">{b.category}</p>}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogPost;
