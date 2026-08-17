import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Calendar, Clock, ChevronDown, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import type { BlogPost } from "@/data/seoBlogPosts";
import { posts } from "@/data/seoBlogPosts";
import { getTheme } from "@/data/seoBlogCategoryTheme";
import sambhavPhoto from "@/assets/sambhav.jpg";

const SITE = "https://thedigitalaura.com";

const AUTHOR_PHOTOS: Record<string, string> = {
  "Sambhav Shah": sambhavPhoto,
  "Jinali Lodariya": "/team/jinali.png",
  "Swayam Parikh": "/team/swayam.png",
  "Deepak Nagar": "/team/deepak.png",
};

const shortTeaser = (text: string) => {
  const firstSentence = text.split(/(?<=\.)\s/)[0];
  return firstSentence.length > 140 ? firstSentence.slice(0, 140).trim() + "…" : firstSentence;
};

const TitleWithHighlight = ({ title, highlight }: { title: string; highlight: string }) => {
  const idx = title.indexOf(highlight);
  if (idx === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-orange-gradient">{title.slice(idx, idx + highlight.length)}</span>
      {title.slice(idx + highlight.length)}
    </>
  );
};

const FAQItem = ({ q, a, color }: { q: string; a: string; color: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ borderColor: open ? `${color}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold" style={{ color: "#0A1628" }}>{q}</span>
        <ChevronDown size={18} className="shrink-0 transition-transform" style={{ color, transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      {/* Answer stays in the DOM at all times (grid-rows collapse, not conditional mount) so it's
          present in rendered HTML for Google/AI crawlers regardless of accordion state. */}
      <div className="grid transition-[grid-template-rows] duration-200 ease-in-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[14.5px] leading-relaxed" style={{ color: "#6B7280" }}>{a}</p>
        </div>
      </div>
    </div>
  );
};

const StaticSeoPostView = ({ post }: { post: BlogPost }) => {
  const theme = getTheme(post.category);
  const CategoryIcon = theme.Icon;
  const canonicalUrl = `${SITE}/blog/${post.slug}`;
  const related = posts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const relatedFallback = posts.filter(p => p.slug !== post.slug).slice(0, 3);
  const relatedPosts = related.length ? related : relatedFallback;

  useEffect(() => {
    document.title = post.metaTitle;
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        const isLink = selector.startsWith("link");
        el = document.createElement(isLink ? "link" : "meta");
        const m = selector.match(/\[([^\]=]+)="([^"]+)"\]/);
        if (m) el.setAttribute(m[1], m[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', "content", post.metaDescription);
    setMeta('link[rel="canonical"]', "href", canonicalUrl);
    setMeta('meta[property="og:title"]', "content", post.metaTitle);
    setMeta('meta[property="og:description"]', "content", post.metaDescription);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:type"]', "content", "article");

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.date,
          dateModified: post.date,
          author: { "@type": "Person", name: post.author, jobTitle: post.authorRole, url: `${SITE}/about` },
          publisher: { "@type": "Organization", name: "Digital Aura", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logos/digital-aura-logo.png` } },
          mainEntityOfPage: canonicalUrl,
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: post.faqs.map(f => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    };
    // Remove any JSON-LD already in <head> so client-side route changes never
    // leave a stale copy from the previous page behind.
    document.head.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [post, canonicalUrl]);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-[72px] pb-10 px-4 md:px-8 overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute animate-drift rounded-full" style={{ width: 560, height: 560, top: "-18%", right: "-8%", background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`, filter: "blur(60px)" }} />
          <div className="absolute animate-drift-2 rounded-full" style={{ width: 380, height: 380, bottom: "-10%", left: "-6%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute inset-0 dot-pattern opacity-20" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto relative z-10 py-10 text-center">
          <Link to="/blog" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: theme.color }}>
            ← Back to All Articles
          </Link>
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full"
              style={{ color: theme.color, background: theme.bg, border: `1px solid ${theme.border}` }}
            >
              <CategoryIcon size={13} /> {post.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight mb-5 leading-[1.15]" style={{ color: "#0A1628" }}>
            <TitleWithHighlight title={post.title} highlight={post.titleHighlight} />
          </h1>
          <p className="text-lg mb-7 leading-relaxed max-w-xl mx-auto" style={{ color: "#4B5563" }}>{shortTeaser(post.directAnswer)}</p>
          <div className="flex flex-wrap items-center gap-5 text-sm justify-center" style={{ color: "#6B7280" }}>
            <span className="flex items-center gap-1.5"><Calendar size={14} style={{ color: theme.color }} /> {post.dateDisplay}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} style={{ color: theme.color }} /> {post.readTime}</span>
            <span>By <strong style={{ color: "#0A1628" }}>{post.author}</strong></span>
            <span>Reviewed by: <strong style={{ color: "#0A1628" }}>Sambhav Shah</strong></span>
          </div>
        </motion.div>
      </section>

      {/* Body + sidebar */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div id="article-body" className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 lg:items-start scroll-mt-20">
          <div className="lg:col-span-2">
            {/* Full direct-answer paragraph — AEO-critical, kept as the true opening line of the article */}
            <p className="text-lg leading-relaxed mb-7 font-medium" style={{ color: "#374151" }}>{post.directAnswer}</p>

            {/* Key takeaways box - AEO/GEO quotable summary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl p-6 mb-8 border-l-4"
              style={{ background: theme.bg, borderColor: theme.color, borderTop: "1px solid #E5E7EB", borderRight: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}
            >
              <h2 className="text-[13px] font-black uppercase tracking-[0.14em] mb-3 flex items-center gap-2" style={{ color: "#0A1628" }}>
                <CategoryIcon size={15} style={{ color: theme.color }} /> Key Takeaways
              </h2>
              <ul className="space-y-2.5">
                {post.keyTakeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14.5px]" style={{ color: "#374151" }}>
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: theme.color }} />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="blog-prose" style={{ ["--accent" as string]: theme.color }} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2.5" style={{ color: "#0A1628" }}>
                <span className="w-5 h-1 rounded-full" style={{ background: theme.color }} /> Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {post.faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} color={theme.color} />)}
              </div>
            </div>

            {/* Author box - E-E-A-T, styled to match thedigitalaura.com/about */}
            <div className="mt-12 rounded-2xl p-6 md:p-8 border" style={{ borderColor: "#E5E7EB", background: "#F8FAFF" }}>
              <p className="text-[11px] font-black uppercase tracking-[0.14em] mb-5 flex items-center gap-2" style={{ color: "#0A1628" }}>
                <span className="w-4 h-0.5 rounded-full" style={{ background: theme.color }} /> About the Author
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="shrink-0 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden" style={{ boxShadow: `0 8px 32px ${theme.glow}`, border: `3px solid ${theme.border}` }}>
                    <img src={AUTHOR_PHOTOS[post.author] || sambhavPhoto} alt={post.author} className="w-full h-full object-cover object-top scale-110" />
                  </div>
                  <div className="sm:hidden">
                    <p className="font-black text-lg leading-tight" style={{ color: "#0A1628" }}>{post.author}</p>
                    <p className="text-sm font-semibold" style={{ color: theme.color }}>{post.authorRole}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="hidden sm:block mb-3">
                    <p className="font-black text-xl leading-tight" style={{ color: "#0A1628" }}>{post.author}</p>
                    <p className="text-sm font-semibold" style={{ color: theme.color }}>{post.authorRole}</p>
                  </div>
                  {post.authorBio.split("\n\n").map((para, i) => (
                    <p key={i} className={`leading-relaxed mb-3 last:mb-0 ${i === 0 ? "text-[15px]" : "text-sm"}`} style={{ color: "#4B5563" }}>{para}</p>
                  ))}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.authorTags.map(tag => (
                      <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "#fff", color: theme.color, border: `1px solid ${theme.border}` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t" style={{ borderColor: "#E5E7EB" }}>
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all" style={{ color: theme.color }}>
                <ArrowLeft size={14} /> Back to all posts
              </Link>
            </div>
          </div>

          {/* Sidebar — single sticky wrapper so cards move together and never overlap */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="rounded-2xl p-6 border overflow-hidden relative" style={{ borderColor: "#E5E7EB" }}>
              <div className="h-1.5 w-full rounded-full mb-5" style={{ background: `linear-gradient(90deg, ${theme.color}, #7C3AED)` }} />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: theme.bg, border: `1px solid ${theme.border}` }}
              >
                <CategoryIcon size={18} style={{ color: theme.color }} />
              </div>
              <h3 className="font-black text-base mb-2" style={{ color: "#0A1628" }}>Want results like this?</h3>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "#6B7280" }}>Talk to Digital Aura about your SEO.</p>
              <Link to="/contact" className="btn-orange w-full py-3 text-sm">
                Get in Touch <ArrowRight size={14} />
              </Link>
            </div>

            {relatedPosts.length > 0 && (
              <div className="rounded-2xl p-6 border" style={{ borderColor: "#E5E7EB" }}>
                <h3 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: "#0A1628" }}>
                  <span className="w-4 h-0.5 rounded-full" style={{ background: theme.color }} /> More Posts
                </h3>
                <div className="space-y-3">
                  {relatedPosts.map(p => {
                    const pTheme = getTheme(p.category);
                    return (
                      <Link key={p.slug} to={`/blog/${p.slug}`} className="block p-3 rounded-xl border-l-4 border transition-all group" style={{ borderColor: "#E5E7EB", borderLeftColor: pTheme.color }}>
                        <p className="text-sm font-bold leading-snug transition-colors" style={{ color: "#0A1628" }}>{p.title}</p>
                        <p className="text-xs mt-1 font-semibold" style={{ color: pTheme.color }}>{p.category}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 800, height: 800, background: `radial-gradient(circle, ${theme.glow} 0%, rgba(124,58,237,0.08) 40%, transparent 70%)` }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />
        <div className="absolute top-8 left-8 w-48 h-48 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle, ${theme.color}, transparent)` }} />
        <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-[#FF6B2B]" style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)" }}>
            Let's Build Together
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">{post.ctaHeading}</h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed">{post.ctaText}</p>
          <Link to="/contact" className="btn-orange" style={{ padding: "1rem 2rem", fontSize: ".95rem" }}>
            {post.ctaButton} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default StaticSeoPostView;
