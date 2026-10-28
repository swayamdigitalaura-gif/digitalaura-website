import { useEffect, useMemo, useState } from "react";
import { AppLink } from "./AppLink";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Calendar, Clock, ChevronDown, ArrowRight, ArrowLeft, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import type { BlogPost } from "@/data/seoBlogPosts";
import { posts as allPosts } from "@/data/seoBlogPosts";
import { useHiddenBlogSlugs } from "@/hooks/useHiddenBlogs";
import { getTheme } from "@/data/seoBlogCategoryTheme";
import { relatedServiceFor } from "@/data/relatedService";
import { topicForBlog, PILLARS, CLUSTER_LINKS, DM_CLUSTER_LINKS, SEO_SERVICE_BY_CATEGORY } from "@/data/linkMap";
import { autoLink } from "@/lib/autoLink";
import AuthorBox from "@/components/AuthorBox";
import { StickyCtaBar } from "@/components/PageCta";
import { track, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from "@/lib/track";

const SITE = "https://thedigitalaura.com";

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
  // Plain question and answer, always open (same FAQ look on every page).
  return (
    <div className="border-b border-[#E5E7EB] py-6 first:pt-0 last:border-b-0">
      <h3 className="text-[17px] font-bold leading-snug text-[#0A1628] md:text-[18px]">{q}</h3>
      <p className="mt-2 text-[15.5px] leading-relaxed text-[#4B5563]">{a}</p>
    </div>
  );
};

const StaticSeoPostView = ({ post }: { post: BlogPost }) => {
  const theme = getTheme(post.category);
  const CategoryIcon = theme.Icon;
  const canonicalUrl = `${SITE}/blog/${post.slug}/`;
  const relatedService = relatedServiceFor(post.slug, post.category);
  const topic = topicForBlog(post.slug, post.category);
  const goDeeper = post.category === "Digital Marketing"
    ? DM_CLUSTER_LINKS
    : [...(topic === "seo" && SEO_SERVICE_BY_CATEGORY[post.category] ? [SEO_SERVICE_BY_CATEGORY[post.category]] : []), ...CLUSTER_LINKS[topic]].slice(0, 4);
  const bodyHtml = useMemo(() => autoLink(post.contentHtml, topic, PILLARS[topic].href), [post.contentHtml, topic]);
  // Posts with a cro block get a mid-article CTA band: the body is split at the middle section heading.
  const [bodyFirst, bodySecond] = useMemo(() => {
    if (!post.cro) return [bodyHtml, ""];
    const heads = [...bodyHtml.matchAll(/<h2[ >]/g)].map(m => m.index as number);
    if (heads.length < 4) return [bodyHtml, ""];
    const at = heads[Math.floor(heads.length / 2)];
    return [bodyHtml.slice(0, at), bodyHtml.slice(at)];
  }, [bodyHtml, post.cro]);
  const hiddenSlugs = useHiddenBlogSlugs();
  const posts = allPosts.filter(p => !hiddenSlugs.has(p.slug));
  const related = posts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const relatedFallback = posts.filter(p => p.slug !== post.slug).slice(0, 3);
  const relatedPosts = related.length ? related : relatedFallback;
  // "See all ... blogs" link at the end of the More Posts card: opens the blog page with that category filter pre-selected.
  const inSeoGroup = ["SEO Strategy", "Local SEO", "On-Page SEO", "Technical SEO"].includes(post.category);
  const seeAllLabel = inSeoGroup ? "See all SEO blogs" : `See all ${post.category} blogs`;
  const seeAllHref = `/blog/?category=${encodeURIComponent(inSeoGroup ? "SEO" : post.category)}`;

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
          author: { "@type": "Person", name: "Sambhav Shah", jobTitle: "Founder & CEO, Digital Aura", url: `${SITE}/about/`, sameAs: ["https://www.linkedin.com/in/sambhav-shah/", "https://www.instagram.com/sambhavshah2/"] },
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
          <AppLink to="/blog/" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: theme.ink }}>
            ← Back to All Articles
          </AppLink>
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full"
              style={{ color: theme.ink, background: theme.bg, border: `1px solid ${theme.border}` }}
            >
              <CategoryIcon size={13} /> {post.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight mb-5 leading-[1.3] sm:leading-[1.3]" style={{ color: "#0A1628" }}>
            <TitleWithHighlight title={post.title} highlight={post.titleHighlight} />
          </h1>
          <p className="text-lg mb-7 leading-relaxed max-w-xl mx-auto" style={{ color: "#4B5563" }}>{shortTeaser(post.directAnswer)}</p>
          <div className="flex flex-wrap items-center gap-5 text-sm justify-center" style={{ color: "#6B7280" }}>
            <span className="flex items-center gap-1.5"><Calendar size={14} style={{ color: theme.ink }} /> {post.dateDisplay}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} style={{ color: theme.ink }} /> {post.readTime}</span>
            <span>By <a href="/about/" className="font-bold hover:underline" style={{ color: "#0A1628" }}>Sambhav Shah</a></span>
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
                <CategoryIcon size={15} style={{ color: theme.ink }} /> Key Takeaways
              </h2>
              <ul className="space-y-2.5">
                {post.keyTakeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14.5px]" style={{ color: "#374151" }}>
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: theme.ink }} />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="blog-prose" style={{ ["--accent" as string]: theme.color, ["--accent-ink" as string]: theme.ink }} dangerouslySetInnerHTML={{ __html: bodyFirst }} />
            {post.cro && bodySecond && (
              <aside aria-label="Next step" className="my-10 rounded-2xl border p-6 md:p-7" style={{ background: "#FFF4EC", borderColor: "#FFD9C2" }}>
                <p className="text-xl font-black leading-tight text-[#0A1628]">{post.cro.bandHeading}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[#4B5563]">{post.cro.bandText}</p>
                <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                  <a href={post.cro.href} onClick={() => track("cta_click", { cta_label: post.cro!.label, cta_location: "blog_mid_band" })} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white" style={{ background: "#FF6B2B", boxShadow: "0 8px 24px #FF6B2B40" }}>
                    {post.cro.label} <ArrowRight size={15} />
                  </a>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <a href={PHONE_TEL} onClick={() => track("phone_click", { cta_location: "blog_mid_band" })} className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#C2410C" }}><Phone size={15} /> {PHONE_DISPLAY}</a>
                    <a href={whatsappLink("Hello, I have a question about: " + post.title)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { cta_location: "blog_mid_band" })} className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#C2410C" }}><MessageCircle size={15} /> WhatsApp</a>
                  </div>
                </div>
              </aside>
            )}
            {bodySecond && <div className="blog-prose" style={{ ["--accent" as string]: theme.color, ["--accent-ink" as string]: theme.ink }} dangerouslySetInnerHTML={{ __html: bodySecond }} />}

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2.5" style={{ color: "#0A1628" }}>
                <span className="w-5 h-1 rounded-full" style={{ background: theme.color }} /> Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {post.faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} color={theme.color} />)}
              </div>
            </div>

            {/* Author (E-E-A-T): Sambhav Shah, same card as the About page and the cluster pages */}
            <AuthorBox accent={theme.ink} className="mt-12 !max-w-none !px-0" />

            {relatedService && (
              <div className="mt-8 rounded-2xl p-6 border" style={{ borderColor: theme.border, background: theme.bg }}>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] mb-2" style={{ color: "#0A1628" }}>Related service</p>
                <p className="text-base font-bold mb-1" style={{ color: "#0A1628" }}>{relatedService.label}</p>
                <p className="text-sm mb-4" style={{ color: "#4B5563" }}>{relatedService.blurb}</p>
                <ul className="mb-4 flex flex-wrap gap-2">
                  {goDeeper.map((l) => (
                    <li key={l.href}><a href={l.href} className="inline-block rounded-full border bg-white px-3 py-1.5 text-[13px] font-semibold hover:underline" style={{ borderColor: theme.border, color: theme.ink }}>{l.label}</a></li>
                  ))}
                </ul>
                {/* Pillar apps outside the SPA need a normal anchor; in-app routes use Link. */}
                {relatedService.external ? (
                  <a href={relatedService.href} className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all" style={{ color: theme.ink }}>
                    {relatedService.cta} <ArrowRight size={14} />
                  </a>
                ) : (
                  <AppLink to={relatedService.href} className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all" style={{ color: theme.ink }}>
                    {relatedService.cta} <ArrowRight size={14} />
                  </AppLink>
                )}
              </div>
            )}

            <div className="pt-8 mt-8 border-t" style={{ borderColor: "#E5E7EB" }}>
              <AppLink to="/blog/" className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all" style={{ color: theme.ink }}>
                <ArrowLeft size={14} /> Back to all posts
              </AppLink>
            </div>
          </div>

          {/* Sidebar — single sticky wrapper so cards move together and never overlap */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="rounded-2xl p-5 border overflow-hidden relative" style={{ borderColor: "#E5E7EB" }}>
              <div className="h-1.5 w-full rounded-full mb-4" style={{ background: `linear-gradient(90deg, ${theme.color}, #7C3AED)` }} />
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 [@media(max-height:720px)]:hidden"
                style={{ background: theme.bg, border: `1px solid ${theme.border}` }}
              >
                <CategoryIcon size={18} style={{ color: theme.ink }} />
              </div>
              <h3 className="font-black text-base mb-2" style={{ color: "#0A1628" }}>Want results like this?</h3>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "#6B7280" }}>{post.cro ? post.cro.sidebar : "Talk to Digital Aura about your SEO."}</p>
              {post.cro ? (
                <a href={post.cro.href} className="btn-orange w-full py-3 text-sm">
                  {post.cro.label} <ArrowRight size={14} />
                </a>
              ) : (
                <AppLink to="/contact/" className="btn-orange w-full py-3 text-sm">
                  Get in Touch <ArrowRight size={14} />
                </AppLink>
              )}
            </div>

            {relatedPosts.length > 0 && (
              <div className="rounded-2xl p-5 border" style={{ borderColor: "#E5E7EB" }}>
                <h3 className="font-black text-base mb-3 flex items-center gap-2" style={{ color: "#0A1628" }}>
                  <span className="w-4 h-0.5 rounded-full" style={{ background: theme.color }} /> More Posts
                </h3>
                <div className="space-y-2.5">
                  {relatedPosts.map((p, idx) => {
                    const pTheme = getTheme(p.category);
                    return (
                      <AppLink key={p.slug} to={`/blog/${p.slug}`} className={`block p-2.5 rounded-xl border-l-4 border transition-all group ${idx >= 2 ? "[@media(max-height:820px)]:hidden" : idx === 1 ? "[@media(max-height:680px)]:hidden" : ""}`} style={{ borderColor: "#E5E7EB", borderLeftColor: pTheme.color }}>
                        <p className="text-sm font-bold leading-snug transition-colors" style={{ color: "#0A1628" }}>{p.title}</p>
                        <p className="text-xs mt-1 font-semibold" style={{ color: pTheme.ink }}>{p.category}</p>
                      </AppLink>
                    );
                  })}
                </div>
                <a href={seeAllHref} className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold hover:gap-2.5 transition-all" style={{ color: theme.ink }}>
                  {seeAllLabel} <ArrowRight size={13} />
                </a>
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
          {post.cro ? (
            <a href={post.cro.href} className="btn-orange" style={{ padding: "1rem 2rem", fontSize: ".95rem" }}>
              {post.ctaButton} <ArrowRight size={16} />
            </a>
          ) : (
            <AppLink to="/contact/" className="btn-orange" style={{ padding: "1rem 2rem", fontSize: ".95rem" }}>
              {post.ctaButton} <ArrowRight size={16} />
            </AppLink>
          )}
        </div>
      </section>
      {post.cro && (
        <>
          <StickyCtaBar accent="#FF6B2B" label={post.cro.label} href={post.cro.href} topic={post.title} />
          <div className="h-16 md:hidden" aria-hidden="true" />
        </>
      )}
    </PageLayout>
  );
};

export default StaticSeoPostView;
