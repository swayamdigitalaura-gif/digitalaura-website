import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import {
  ArrowLeft, ArrowRight, ArrowUp, Calendar, Clock, Eye,
  Linkedin, Link as LinkIcon, RefreshCw, Tag, ImageOff,
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

function CardImage({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center ${className || ""}`} style={{ background: "linear-gradient(135deg, rgba(255,107,43,0.1), rgba(26,111,232,0.08))" }}>
        <ImageOff size={24} style={{ color: ACCENT }} strokeWidth={1.5} />
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [related, setRelated] = useState<Blog[]>([]);
  const [latest, setLatest] = useState<Blog[]>([]);
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
        const others = sorted.filter((b) => b.slug !== slug);
        setRelated(others.slice(0, 3));
        // Show a different set than "Related" when there are enough posts
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
              className="text-[#374151] leading-relaxed text-[15.5px] [&_h2]:font-black [&_h2]:text-[#0A1628] [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-bold [&_h3]:text-[#0A1628] [&_h3]:text-lg [&_h3]:mt-7 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_li]:leading-relaxed [&_p]:mb-4 [&_a]:text-[#1A6FE8] [&_a]:underline [&_strong]:font-semibold [&_strong]:text-[#0A1628] [&_img]:rounded-xl [&_img]:my-5 [&_img]:mx-auto [&_img]:max-h-[340px] [&_img]:w-auto [&_img]:max-w-full [&_img]:object-cover [&_img]:border [&_img]:border-[#E5E7EB] [&_img]:shadow-sm [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_th]:text-left [&_th]:bg-[#F8FAFF] [&_th]:p-3 [&_th]:border [&_th]:border-[#E5E7EB] [&_td]:p-3 [&_td]:border [&_td]:border-[#E5E7EB] [&_blockquote]:border-l-4 [&_blockquote]:border-[#FF6B2B] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[#0A1628] [&_blockquote]:font-medium [&_blockquote]:my-6 [&_pre]:bg-[#0A1628] [&_pre]:text-white [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre]:text-sm"
              dangerouslySetInnerHTML={{ __html: blog.content || "" }}
            />

            <ArticleNav prev={prev} next={next} />
          </article>

          <div className="hidden lg:block" />
        </div>

        {related.length > 0 && <RelatedArticles items={related} />}
        <AuthorProfile authorName={blog.author?.name} />
        {latest.length > 0 && <LatestPosts items={latest} />}
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
  const shareUrl = encodeURIComponent(canonicalUrl);
  const authorName = blog.author?.name || "Digital Aura Team";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable — no-op */ }
  };

  return (
    <section className="relative overflow-hidden pb-12 pt-12 lg:pb-14 lg:pt-16" style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 100%)" }}>
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-[0.12] blur-3xl" style={{ background: ACCENT }} />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full opacity-[0.10] blur-3xl" style={{ background: BLUE }} />
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-[820px] px-5 text-center lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center justify-center gap-2 text-[12.5px] text-[#9CA3AF]">
          <Link to="/" className="hover:text-[#FF6B2B]">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-[#FF6B2B]">Blog</Link>
          {blog.category && (<><span>/</span><span className="text-[#FF6B2B]">{blog.category}</span></>)}
        </nav>

        {blog.category && (
          <span className="inline-flex items-center gap-1.5 rounded-full mb-5 px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider" style={{ color: ACCENT, background: "rgba(255,107,43,0.1)" }}>
            <Tag size={12} /> {blog.category}
          </span>
        )}

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="mx-auto max-w-3xl text-[28px] font-black leading-[1.15] tracking-tight sm:text-[36px] lg:text-[42px]" style={{ color: HEADING }}>
            {blog.title}
          </h1>
          {blog.excerpt && (
            <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-[#6B7280] lg:text-[16.5px]">
              {blog.excerpt}
            </p>
          )}

          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full border border-[#E5E7EB] bg-white px-5 py-2.5 text-[13px] text-[#6B7280]" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
            <span className="inline-flex items-center gap-1.5">
              <span className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-black text-white" style={{ background: `linear-gradient(135deg, ${ACCENT}, #7C3AED)` }}>
                {authorName.charAt(0).toUpperCase()}
              </span>
              <span className="font-semibold" style={{ color: HEADING }}>{authorName}</span>
            </span>
            <span className="inline-flex items-center gap-1.5"><Calendar size={13} style={{ color: ACCENT }} /> {dateStr}</span>
            {updatedStr && <span className="inline-flex items-center gap-1.5"><RefreshCw size={13} style={{ color: ACCENT }} /> Updated {updatedStr}</span>}
            <span className="inline-flex items-center gap-1.5"><Clock size={13} style={{ color: ACCENT }} /> {minutes} min read</span>
            {!!blog.views && <span className="inline-flex items-center gap-1.5"><Eye size={13} style={{ color: ACCENT }} /> {blog.views.toLocaleString()}</span>}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] transition-all hover:-translate-y-0.5 hover:border-[#FF6B2B] hover:text-[#FF6B2B]">
              <Linkedin size={15} />
            </a>
            <button onClick={copyLink} aria-label="Copy link"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-[13px] font-semibold transition-all hover:-translate-y-0.5 hover:border-[#FF6B2B]"
              style={{ color: copied ? "#22C55E" : HEADING }}>
              <LinkIcon size={13} /> {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </motion.div>
      </div>

      {blog.cover_image ? (
        <div className="relative mx-auto mt-10 max-w-[880px] px-5 lg:px-8">
          <div className="mx-auto max-h-[420px] overflow-hidden rounded-2xl border border-[#E5E7EB] shadow-lg">
            <img src={blog.cover_image} alt={blog.title} width={1600} height={900} fetchPriority="high" className="aspect-[16/9] max-h-[420px] w-full object-cover" />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function FloatingSidebar({ toc, activeId, progress, minutes, canonicalUrl }: {
  toc: TocItem[]; activeId: string; progress: number; minutes: number; canonicalUrl: string; title: string;
}) {
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
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share"
              className="grid h-8 w-8 place-items-center rounded-lg border border-[#E5E7EB] text-[#6B7280] transition-colors hover:border-[#FF6B2B] hover:text-[#FF6B2B]">
              <Linkedin size={14} />
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
    <section className="border-t border-[#E5E7EB] py-16 lg:py-20" style={{ background: "#F8FAFF" }}>
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="text-[12px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Keep reading</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl" style={{ color: HEADING }}>Related articles</h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((b) => (
            <Link key={b.id} to={`/blog/${b.slug}`} className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all hover:-translate-y-1 hover:shadow-lg" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="relative">
                <CardImage src={b.cover_image} alt="" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {b.category && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold" style={{ color: ACCENT }}>{b.category}</span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#9CA3AF]">
                  <Clock size={12} /> {readTime(b.content)} min read
                </div>
                <h3 className="mt-2.5 text-[16px] font-bold leading-snug transition-colors group-hover:text-[#FF6B2B]" style={{ color: HEADING }}>{b.title}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold" style={{ color: ACCENT }}>
                  Read more <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
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
    <section className="border-t border-[#E5E7EB] bg-white py-14">
      <div className="mx-auto max-w-[800px] px-5 lg:px-8">
        <div className="flex items-center gap-5 rounded-2xl border border-[#E5E7EB] p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-lg font-black text-white" style={{ background: `linear-gradient(135deg, ${ACCENT}, #7C3AED)` }}>
            {initial}
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Written by</div>
            <h3 className="text-lg font-black" style={{ color: HEADING }}>{name}</h3>
            <p className="text-sm text-[#6B7280]">Performance marketing team, Digital Aura</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LatestPosts({ items }: { items: Blog[] }) {
  return (
    <section className="border-t border-[#E5E7EB] px-5 py-16 lg:px-8" style={{ background: "#FFFFFF" }}>
      <div className="mx-auto max-w-[1240px]">
        <div className="text-[12px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Fresh off the press</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl" style={{ color: HEADING }}>Latest posts</h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((b) => (
            <Link key={b.id} to={`/blog/${b.slug}`} className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all hover:-translate-y-1 hover:shadow-lg" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <CardImage src={b.cover_image} alt="" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="p-5">
                {b.category && (
                  <span className="rounded-full px-2.5 py-0.5 text-[12px] font-semibold" style={{ background: "rgba(255,107,43,0.1)", color: ACCENT }}>{b.category}</span>
                )}
                <h3 className="mt-3 text-[16px] font-bold leading-snug transition-colors group-hover:text-[#FF6B2B]" style={{ color: HEADING }}>{b.title}</h3>
                {b.excerpt && <p className="mt-2 text-[13.5px] leading-relaxed text-[#6B7280] line-clamp-2">{b.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="border-t border-[#E5E7EB] px-5 py-16 lg:px-8" style={{ background: "#F8FAFF" }}>
      <div className="relative mx-auto max-w-[900px] overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-14" style={{ background: `linear-gradient(135deg, ${HEADING} 0%, #16233D 100%)` }}>
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-3xl" style={{ background: ACCENT }} />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full opacity-20 blur-3xl" style={{ background: BLUE }} />

        <div className="relative">
          <h2 className="text-[26px] font-black leading-tight text-white sm:text-[34px]">Ready to grow faster?</h2>
          <p className="mx-auto mt-4 max-w-lg text-[15.5px] leading-relaxed text-white/70">
            Book a free strategy session with our senior team — we'll audit your funnel and hand you a 30-day action plan.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className="btn-orange px-7 py-3.5 text-[15px] gap-2 inline-flex items-center">
              Book a free strategy session <ArrowRight size={16} />
            </Link>
            <Link to="/case-studies" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10">
              View our work
            </Link>
          </div>
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
