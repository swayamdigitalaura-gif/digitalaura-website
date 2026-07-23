import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import {
  ArrowLeft, ArrowRight, ArrowUp, Bookmark, Calendar, Clock, Eye,
  Facebook, Linkedin, Twitter, Link as LinkIcon, RefreshCw, Tag,
} from "lucide-react";

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

type TocItem = { id: string; label: string };

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

const slugifyHeading = (text: string, i: number) =>
  text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 50) || `section-${i}`;

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [related, setRelated] = useState<Blog[]>([]);
  const [prev, setPrev] = useState<Blog | null>(null);
  const [next, setNext] = useState<Blog | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const schemaRef = useRef<HTMLScriptElement | null>(null);
  const articleRef = useRef<HTMLDivElement>(null);

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
        const idx = sorted.findIndex((b) => b.slug === slug);
        if (idx !== -1) {
          setPrev(sorted[idx + 1] || null);
          setNext(idx > 0 ? sorted[idx - 1] : null);
        }
        setRelated(sorted.filter((b) => b.slug !== slug).slice(0, 3));
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

    if (schemaRef.current) { schemaRef.current.remove(); schemaRef.current = null; }
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
    schemaRef.current = script;

    return () => { if (schemaRef.current) { schemaRef.current.remove(); schemaRef.current = null; } };
  }, [blog]);

  // Build TOC from real headings inside the rendered content
  useEffect(() => {
    if (!blog || !articleRef.current) return;
    const headings = Array.from(articleRef.current.querySelectorAll("h2"));
    const items: TocItem[] = headings.map((h, i) => {
      if (!h.id) h.id = slugifyHeading(h.textContent || "", i);
      return { id: h.id, label: h.textContent || "" };
    });
    setToc(items);
    if (items[0]) setActiveId(items[0].id);
  }, [blog]);

  // Reading progress + scrollspy + scroll-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(100, (h.scrollTop / total) * 100) : 0);
      setShowTop(window.scrollY > 800);
      for (const item of toc) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 140) setActiveId(item.id);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

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
  const updatedStr = blog.updatedAt && blog.updatedAt !== blog.createdAt ? fmtDate(blog.updatedAt) : null;

  return (
    <PageLayout>
      {/* Reading progress bar */}
      <div className="fixed left-0 right-0 top-[72px] z-40 h-[3px] bg-transparent">
        <div className="h-full transition-[width] duration-150" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${ACCENT}, ${BLUE})` }} />
      </div>

      <div className="pt-[72px]">
        <Hero blog={blog} dateStr={dateStr} updatedStr={updatedStr} minutes={minutes} canonicalUrl={canonicalUrl} />

        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-5 pb-16 lg:grid-cols-[240px_minmax(0,760px)_1fr] lg:gap-12 lg:px-8">
          <FloatingSidebar toc={toc} activeId={activeId} progress={progress} minutes={minutes} canonicalUrl={canonicalUrl} title={blog.title} />

          <article className="min-w-0 pt-10">
            <div
              ref={articleRef}
              className="text-[#374151] leading-relaxed text-[15.5px] [&_h2]:font-black [&_h2]:text-[#0A1628] [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-bold [&_h3]:text-[#0A1628] [&_h3]:text-lg [&_h3]:mt-7 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_li]:leading-relaxed [&_p]:mb-4 [&_a]:text-[#1A6FE8] [&_a]:underline [&_strong]:font-semibold [&_strong]:text-[#0A1628] [&_img]:rounded-xl [&_img]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_th]:text-left [&_th]:bg-[#F8FAFF] [&_th]:p-3 [&_th]:border [&_th]:border-[#E5E7EB] [&_td]:p-3 [&_td]:border [&_td]:border-[#E5E7EB] [&_blockquote]:border-l-4 [&_blockquote]:border-[#FF6B2B] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[#0A1628] [&_blockquote]:font-medium [&_blockquote]:my-6 [&_pre]:bg-[#0A1628] [&_pre]:text-white [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre]:text-sm"
              dangerouslySetInnerHTML={{ __html: blog.content || "" }}
            />

            <ArticleNav prev={prev} next={next} />
          </article>

          <div className="hidden lg:block" />
        </div>

        {related.length > 0 && <RelatedArticles items={related} />}
        <AuthorProfile authorName={blog.author?.name} />
        <Newsletter />
        <FinalCTA />
      </div>

      <ScrollToTop show={showTop} />
    </PageLayout>
  );
};

function Hero({ blog, dateStr, updatedStr, minutes, canonicalUrl }: {
  blog: Blog; dateStr: string; updatedStr: string | null; minutes: number; canonicalUrl: string;
}) {
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(blog.title);
  const shareUrl = encodeURIComponent(canonicalUrl);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable — no-op */ }
  };

  return (
    <section className="relative overflow-hidden pb-14 pt-10 lg:pb-16" style={{ background: "#F8FAFF" }}>
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-[1000px] px-5 text-center lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-[13px] text-[#9CA3AF]">
          <Link to="/" className="hover:text-[#FF6B2B]">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-[#FF6B2B]">Blog</Link>
          {blog.category && (<><span>/</span><span className="text-[#FF6B2B]">{blog.category}</span></>)}
        </nav>

        {blog.category && (
          <span className="inline-flex items-center gap-1.5 rounded-full mb-6 px-3 py-1 text-[12px] font-bold uppercase tracking-wider" style={{ color: ACCENT, background: "rgba(255,107,43,0.1)" }}>
            <Tag size={12} /> {blog.category}
          </span>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="mx-auto max-w-4xl text-[32px] font-black leading-[1.1] tracking-tight sm:text-[44px] lg:text-[52px]" style={{ color: HEADING }}>
            {blog.title}
          </h1>
          {blog.excerpt && (
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-[#6B7280] lg:text-[18px]">
              {blog.excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[14px] text-[#6B7280]">
            <span className="font-semibold" style={{ color: HEADING }}>{blog.author?.name || "Digital Aura Team"}</span>
            <span className="inline-flex items-center gap-1.5"><Calendar size={14} style={{ color: ACCENT }} /> {dateStr}</span>
            {updatedStr && <span className="inline-flex items-center gap-1.5"><RefreshCw size={14} style={{ color: ACCENT }} /> Updated {updatedStr}</span>}
            <span className="inline-flex items-center gap-1.5"><Clock size={14} style={{ color: ACCENT }} /> {minutes} min read</span>
            {!!blog.views && <span className="inline-flex items-center gap-1.5"><Eye size={14} style={{ color: ACCENT }} /> {blog.views.toLocaleString()} views</span>}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Twitter"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] transition-all hover:-translate-y-0.5 hover:border-[#FF6B2B] hover:text-[#FF6B2B]">
              <Twitter size={16} />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] transition-all hover:-translate-y-0.5 hover:border-[#FF6B2B] hover:text-[#FF6B2B]">
              <Linkedin size={16} />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] transition-all hover:-translate-y-0.5 hover:border-[#FF6B2B] hover:text-[#FF6B2B]">
              <Facebook size={16} />
            </a>
            <button onClick={copyLink} aria-label="Copy link"
              className="ml-1 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-[#FF6B2B]"
              style={{ color: copied ? "#22C55E" : HEADING }}>
              <LinkIcon size={14} /> {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </motion.div>
      </div>

      {blog.cover_image ? (
        <div className="relative mx-auto mt-12 max-w-[1000px] px-5 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-[#E5E7EB] shadow-lg">
            <img src={blog.cover_image} alt={blog.title} width={1600} height={900} fetchPriority="high" className="aspect-[16/9] w-full object-cover" />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function FloatingSidebar({ toc, activeId, progress, minutes, canonicalUrl, title }: {
  toc: TocItem[]; activeId: string; progress: number; minutes: number; canonicalUrl: string; title: string;
}) {
  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(canonicalUrl);
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 pt-10">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">
            <span>Progress</span>
            <span style={{ color: ACCENT }}>{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F1F5F9]">
            <div className="h-full transition-all" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${ACCENT}, ${BLUE})` }} />
          </div>

          {toc.length > 0 && (
            <>
              <div className="mt-6 text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">On this page</div>
              <ul className="mt-3 space-y-1.5">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}
                      className="block rounded-lg border-l-2 py-1.5 pl-3 text-[13.5px] leading-snug transition-all"
                      style={activeId === item.id
                        ? { borderColor: ACCENT, background: "rgba(255,107,43,0.06)", fontWeight: 600, color: HEADING }
                        : { borderColor: "transparent", color: "#6B7280" }}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-6 flex items-center gap-1.5 text-[12px] text-[#9CA3AF]">
            <Clock size={14} style={{ color: ACCENT }} /> {minutes} min read
          </div>

          <div className="mt-5 flex items-center gap-1.5">
            <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share"
              className="grid h-8 w-8 place-items-center rounded-lg border border-[#E5E7EB] text-[#6B7280] transition-colors hover:border-[#FF6B2B] hover:text-[#FF6B2B]">
              <Twitter size={14} />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share"
              className="grid h-8 w-8 place-items-center rounded-lg border border-[#E5E7EB] text-[#6B7280] transition-colors hover:border-[#FF6B2B] hover:text-[#FF6B2B]">
              <Linkedin size={14} />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share"
              className="grid h-8 w-8 place-items-center rounded-lg border border-[#E5E7EB] text-[#6B7280] transition-colors hover:border-[#FF6B2B] hover:text-[#FF6B2B]">
              <Facebook size={14} />
            </a>
          </div>

          <Link to="/blog" className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#E5E7EB] py-2 text-[13px] font-semibold transition-colors hover:border-[#FF6B2B] hover:text-[#FF6B2B]" style={{ color: HEADING }}>
            <ArrowLeft size={14} /> Back to blog
          </Link>
        </div>
      </div>
    </aside>
  );
}

function ArticleNav({ prev, next }: { prev: Blog | null; next: Blog | null }) {
  if (!prev && !next) return null;
  return (
    <nav className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {prev && (
        <Link to={`/blog/${prev.slug}`} className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#FF6B2B]/40" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>
            <ArrowLeft size={14} /> Previous
          </div>
          <div className="mt-2 text-[16px] font-bold leading-snug" style={{ color: HEADING }}>{prev.title}</div>
        </Link>
      )}
      {next && (
        <Link to={`/blog/${next.slug}`} className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 text-right transition-all hover:-translate-y-1 hover:border-[#FF6B2B]/40" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center justify-end gap-2 text-[12px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>
            Next <ArrowRight size={14} />
          </div>
          <div className="mt-2 text-[16px] font-bold leading-snug" style={{ color: HEADING }}>{next.title}</div>
        </Link>
      )}
    </nav>
  );
}

function RelatedArticles({ items }: { items: Blog[] }) {
  return (
    <section className="border-t border-[#E5E7EB] py-20" style={{ background: "#F8FAFF" }}>
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="text-[12px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Keep reading</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl" style={{ color: HEADING }}>Related articles</h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((b) => (
            <Link key={b.id} to={`/blog/${b.slug}`} className="group rounded-2xl overflow-hidden border border-[#E5E7EB] bg-white transition-all hover:-translate-y-1" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              {b.cover_image ? (
                <img src={b.cover_image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="aspect-[4/3] w-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(255,107,43,0.1), rgba(26,111,232,0.08))" }}>
                  <Tag size={28} style={{ color: ACCENT }} strokeWidth={1.5} />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-[#9CA3AF]">
                  {b.category && <span className="rounded-full px-2.5 py-0.5" style={{ background: "rgba(255,107,43,0.1)", color: ACCENT }}>{b.category}</span>}
                  <span>{readTime(b.content)} min read</span>
                </div>
                <h3 className="mt-3 text-[16px] font-bold leading-snug transition-colors group-hover:text-[#FF6B2B]" style={{ color: HEADING }}>{b.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuthorProfile({ authorName }: { authorName?: string }) {
  const name = authorName || "Digital Aura Team";
  const initial = name.charAt(0).toUpperCase();
  return (
    <section className="border-t border-[#E5E7EB] bg-white py-16">
      <div className="mx-auto max-w-[800px] px-5 lg:px-8">
        <div className="flex items-center gap-5 rounded-2xl border border-[#E5E7EB] p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full text-xl font-black text-white" style={{ background: `linear-gradient(135deg, ${ACCENT}, #7C3AED)` }}>
            {initial}
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Written by</div>
            <h3 className="text-lg font-black" style={{ color: HEADING }}>{name}</h3>
            <p className="text-sm text-[#6B7280]">Digital Aura Team</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email,
          message: "Newsletter signup from blog",
          project: "Newsletter",
          source: "blog-newsletter",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="relative mx-auto max-w-[1000px] overflow-hidden rounded-3xl p-10 text-white sm:p-12" style={{ background: `linear-gradient(135deg, ${ACCENT}, #7C3AED)` }}>
        <h2 className="text-[28px] font-black leading-tight sm:text-[36px]">The one growth email your team actually reads.</h2>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-white/85">Practical strategies on AI, marketing, and growth — straight to your inbox.</p>

        {status === "done" ? (
          <p className="mt-6 font-semibold">You're subscribed! Thanks for joining.</p>
        ) : (
          <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-full border-0 bg-white/95 px-5 py-3.5 text-[15px] text-[#0A1628] placeholder:text-[#9CA3AF] outline-none focus:ring-4 focus:ring-white/30" />
            <button type="submit" disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: "#0A1628" }}>
              {status === "loading" ? "Submitting…" : "Subscribe"} <ArrowRight size={16} />
            </button>
          </form>
        )}
        {status === "error" && <p className="mt-3 text-sm text-white/90">Something went wrong. Please try again.</p>}
        <p className="mt-3 text-[12px] text-white/70">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="border-t border-[#E5E7EB] px-5 py-16 lg:px-8" style={{ background: "#F8FAFF" }}>
      <div className="mx-auto max-w-[800px] text-center">
        <h2 className="text-[30px] font-black leading-tight sm:text-[40px]" style={{ color: HEADING }}>Ready to grow faster?</h2>
        <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-[#6B7280]">
          Book a free strategy session with our senior team — we'll audit your funnel and hand you a 30-day action plan.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link to="/contact" className="btn-orange px-7 py-3.5 text-[15px] gap-2 inline-flex items-center">
            Book a free strategy session <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ScrollToTop({ show }: { show: boolean }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full text-white shadow-lg transition-all ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      style={{ background: `linear-gradient(135deg, ${ACCENT}, #7C3AED)` }}>
      <ArrowUp size={20} />
    </button>
  );
}

export default BlogPost;
