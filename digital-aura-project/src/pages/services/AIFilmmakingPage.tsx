/**
 * SERVICE PAGE — AI Filmmaking & Video Production for Social Media Marketing
 * Route (to be added):   /services/ai-filmmaking
 * No city/location targeting on this page — this is the general service pillar,
 * matching the structure and tone of /services/ai-powered-web-apps (AIWebAppsPage.tsx).
 *
 * Integration steps still pending (not yet wired into the repo):
 *   1. App.tsx      → add: <Route path="/services/ai-filmmaking" element={<AIFilmmakingPage />} />
 *   2. PageSEO.tsx   → add a PAGE_META + JSON-LD entry keyed "/services/ai-filmmaking"
 *
 * Suggested <title>: "AI Video & Film Making for Social Media Marketing | Digital Aura"
 * Suggested meta description: "Get scroll-stopping Reels, Shorts and video ads made with AI —
 *   no camera crew, no studio. Strategy, production and paid promotion in one team."
 */
import ClientLogoGrid from "@/components/ClientLogoGrid";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import DBTestimonialCarousel from "@/components/DBTestimonialCarousel";
import {
  ArrowRight, ChevronDown, Clapperboard,
  Film, Megaphone, Mic, CalendarDays, Target,
} from "lucide-react";

const accent = "#EC4899";
const accentBg = "rgba(236,72,153,0.08)";
const accentBorder = "rgba(236,72,153,0.2)";

const services = [
  { Icon: Film,         title: "AI-Generated Reels & Shorts",        desc: "Faceless or AI-avatar-led vertical videos built for Instagram Reels, YouTube Shorts, and Facebook Reels." },
  { Icon: Megaphone,    title: "AI UGC-Style Ad Creatives",          desc: "AI actors and avatars delivering authentic-feeling product pitches, tested in multiple variations for paid campaigns." },
  { Icon: Mic,          title: "AI Voiceover & Script-to-Video",     desc: "Send a script or product brief, get back a fully edited video with AI voice, captions, and b-roll." },
  { Icon: CalendarDays, title: "Social Media Management",            desc: "Full content calendar planning, publishing, caption writing, and day-to-day community management." },
  { Icon: Target,       title: "Paid Social Video Ads",              desc: "AI-produced ad creatives tested and optimised inside Meta and YouTube campaigns for the lowest cost per result." },
  { Icon: Clapperboard, title: "Brand Story & Explainer Films",      desc: "Longer-form AI-assisted brand films for your website, YouTube channel, and investor or partner decks." },
];

const processSteps = [
  { num: "01", title: "Brand & Audience Discovery — Week 1", desc: "We map your offer, audience, and competitors' top-performing content before writing a single script." },
  { num: "02", title: "Script, Storyboard & AI Production — Week 1-2", desc: "Scripts, hooks, and storyboards go to review, then AI video and voice tools generate the first batch." },
  { num: "03", title: "Publishing & Paid Promotion — Ongoing", desc: "Content goes live on a fixed calendar, with top performers pushed into paid campaigns for reach." },
  { num: "04", title: "Performance Review & Iteration — Monthly", desc: "Watch-time, saves, and conversions are reviewed monthly, and the next batch is written from what worked." },
];

const whyUs = [
  { title: "AI Speed, Human Strategy",             desc: "Production is AI-accelerated, but scripts, hooks, and targeting are planned by our in-house strategists." },
  { title: "Multi-Platform Native Editing",        desc: "One shoot becomes 9:16, 1:1, and 16:9 cuts, correctly framed for each platform, not just resized." },
  { title: "Data-Backed Creative Decisions",       desc: "Watch-time, hook retention, and saves are reviewed monthly to decide what gets made next." },
  { title: "In-House AI, Design & Media Buying",   desc: "Production, editing, and paid promotion sit under one roof, not three separate vendors." },
  { title: "Transparent Reporting",                desc: "You see exactly what was made, what was spent, and what it returned, every month." },
  { title: "Full Content Ownership",               desc: "Every video file is yours to keep and reuse — no watermarks, no platform lock-in." },
];

const faqs = [
  { q: "What is AI video marketing and how is it different from a normal video ad?", a: "AI video marketing uses AI tools to generate, voice, and edit video content — avatars, script-to-video, auto-captions — so you get finished Reels, Shorts, and ad creatives without booking a camera crew or studio. A normal shoot takes 1-2 weeks and a full crew; an AI-produced video can be scripted, generated, and edited in 2-4 days." },
  { q: "Can AI-generated videos actually perform well on Instagram and YouTube?", a: "Yes, when they're built on a real hook-and-retention script rather than AI novelty alone. We pair AI production with the short-form editing principles that already drive high-performing organic and paid content: a 2-3 second hook, on-screen captions, and a clear call to action." },
  { q: "Do I need to appear on camera for AI video content?", a: "No. We can produce fully faceless videos using AI avatars, voiceover, and generated or stock b-roll, or a hybrid look combining AI avatars with your real product footage if you prefer." },
  { q: "How fast can you turn around a batch of social media videos?", a: "A first batch of 8-10 short-form videos is typically scripted, produced, and delivered within 5-7 working days after brand and audience discovery. Ongoing monthly batches follow a fixed content calendar." },
  { q: "Is AI video content more affordable than traditional video production?", a: "Generally yes. With no film crew, studio rental, or multi-day shoot, AI-produced short-form video typically costs a fraction of a traditional shoot per finished video, letting you test more creative variations for the same budget." },
  { q: "Which platforms do you create content for?", a: "Instagram Reels, YouTube Shorts, Facebook Reels, LinkedIn video, and vertical or square cuts built specifically for paid placements on Meta and YouTube." },
  { q: "Do you only make the videos, or do you also manage posting and engagement?", a: "Both are available. You can take the raw video files and post them yourself, or we can run the full social media management: content calendar, publishing, captions, hashtags, and community/comment management." },
  { q: "How much does AI video and social media marketing cost?", a: "Packages start from roughly ₹25,000 per month for AI video production plus social media management, scaling with video volume, paid ad spend management, and number of platforms covered. An exact quote follows a free content strategy call." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "#E5E7EB" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left gap-4">
        <span className="font-semibold text-[#0A1628] text-[15px]"><span data-cms-key={`aifilm_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <ChevronDown size={18} className="shrink-0 transition-transform" style={{ transform: open ? "rotate(180deg)" : "none", color: accent }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="pb-4 text-[#6B7280] text-sm leading-relaxed"><span data-cms-key={`aifilm_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AIFilmmakingPage = () => {
  return (
  <PageLayout>

    {/* Hero */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full animate-drift" style={{ width: 600, height: 600, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute rounded-full animate-drift-2" style={{ width: 400, height: 400, bottom: "-10%", left: "-8%", background: "radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none dot-pattern opacity-30" />
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-4 hover:underline" style={{ color: accent }}>← Back to All Services</Link>
          <span className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: "rgba(236,72,153,0.1)", color: accent, border: "1px solid rgba(236,72,153,0.3)" }}>
              <Film size={12} /> Social Media Marketing · AI Video & Film Making
            </span>
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-bold leading-[1.15] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="aifilm_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Most Content Fills a Feed.<br className="hidden md:block" />
            Yours Should Fill a Pipeline.
          </span></h1>
          <p className="text-base md:text-lg text-[#4B5563] max-w-xl mx-auto leading-relaxed mb-10">
            <span data-cms-key="aifilm_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">AI-produced Reels, Shorts, and ad creatives in days, not weeks — plus the strategy and paid promotion to back them.</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-orange px-8 py-4 text-base gap-2">
              <span data-cms-key="aifilm_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Book a Free Content Strategy Call</span> <ArrowRight size={18} />
            </Link>
            <a href="#services-list" className="btn-outline-dark px-8 py-4 text-base">See What We Create</a>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-6"><span data-cms-key="aifilm_trust_line" data-cms-label="Body Text" data-cms-attr="text">Trusted by 750+ brands across healthcare, restaurants, real estate, eCommerce and more</span></p>
        </motion.div>
      </div>
    </section>

    {/* Positioning */}
    <section id="services-list" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="section-badge" data-cms-key="aifilm_badge_1" data-cms-label="Section Badge" data-cms-attr="text">Not Your Typical Social Media Agency</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-5 leading-tight">
            <span data-cms-key="aifilm_h2_main" data-cms-label="Section Heading" data-cms-attr="text">Most Agencies Sell You a Posting Calendar.</span><br className="hidden md:block" /> <span data-cms-key="aifilm_h2_main2" data-cms-label="Section Heading 2" data-cms-attr="text">We Build You a Content Engine.</span>
          </h2>
          <p className="text-[#4B5563] max-w-3xl leading-relaxed mb-8"><span data-cms-key="aifilm_body_1" data-cms-label="Body Text" data-cms-attr="text">Stock-footage reels and generic captions don't move a feed anymore. AI video production only pays off when it's built on real strategy — so that's where we start.</span></p>

          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#EF4444] mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full bg-[#EF4444]" /> What Most Agencies Deliver
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-3xl">
            {[
              { pain: "Generic stock-footage reels", detail: "Looks like everyone else's Instagram page" },
              { pain: "A posting calendar with no strategy", detail: "No reason behind why each video exists" },
              { pain: "Expensive film shoots for short-lived content", detail: "24 hours of relevance for a full-day shoot" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}>
                <span className="text-[#EF4444] font-black text-base leading-none mt-0.5 shrink-0">✕</span>
                <div>
                  <p className="text-[13.5px] font-semibold text-[#0A1628] leading-snug mb-1">{item.pain}</p>
                  <p className="text-[11.5px] text-[#9CA3AF]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl rounded-xl px-5 py-4 border-l-4 flex items-start gap-3" style={{ background: "rgba(236,72,153,0.06)", borderLeftColor: accent }}>
            <span style={{ color: accent }} className="text-lg font-black mt-0.5 shrink-0">⚠</span>
            <p className="text-[14.5px] font-semibold text-[#374151] leading-relaxed">
              <span data-cms-key="aifilm_warning" data-cms-label="Body Text" data-cms-attr="text">If your last "viral reel attempt" cost a full-day shoot and got 400 views, the process — not the platform — is the problem.</span>
            </p>
          </div>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { title: "AI Video Production at Scale",              desc: "Ten script variations and ten finished videos in the time one traditional shoot takes, so we test hooks instead of guessing at them." },
            { title: "Strategy-Led Content Calendars",            desc: "Every video is tied to a business goal — awareness, lead capture, retargeting — before a single frame is generated." },
            { title: "Built for the Algorithm, Not the Award Show", desc: "Hook-first editing, native captions, and platform-correct aspect ratios designed for watch-time and shares." },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
              <div className="w-2 h-2 rounded-full mb-3" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2"><span data-cms-key={`aifilm_card_${i}_t`} data-cms-label="card title" data-cms-attr="text">{card.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aifilm_card_${i}_d`} data-cms-label="card desc" data-cms-attr="text">{card.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aifilm_badge_2" data-cms-label="Section Badge" data-cms-attr="text">What We Create</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mb-3"><span data-cms-key="aifilm_s2_h2" data-cms-label="Section Heading" data-cms-attr="text">Six Formats, One Content Engine</span></h2>
          <p className="text-[#4B5563] max-w-2xl mx-auto"><span data-cms-key="aifilm_body_2" data-cms-label="Body Text" data-cms-attr="text">Every format below is produced with AI video and film-making tools, then reviewed and edited by our in-house team before it ever reaches your feed.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, si) => (
            <motion.div key={si} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.07 }}
              className="bg-white rounded-2xl p-6 border hover:-translate-y-1 transition-all duration-200" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div className="h-0.5 w-10 rounded-full mb-4" style={{ background: accent }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: accentBg }}>
                <s.Icon size={20} style={{ color: accent }} />
              </div>
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`aifilm_svc_${si}_title`} data-cms-label="Service Title" data-cms-attr="text">{s.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aifilm_svc_${si}_desc`} data-cms-label="Service Desc" data-cms-attr="text">{s.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process Roadmap */}
    <section className="py-20 px-4 md:px-8 overflow-hidden" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-badge" data-cms-key="aifilm_badge_3" data-cms-label="Section Badge" data-cms-attr="text">How We Work</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight mt-2"><span data-cms-key="aifilm_s3_h2" data-cms-label="Section Heading" data-cms-attr="text">From Brief to Published Post</span></h2>
          <p className="text-[#6B7280] mt-3 max-w-xl mx-auto"><span data-cms-key="aifilm_s3_sub" data-cms-label="Section Subtext" data-cms-attr="text">A fixed four-phase cycle that repeats every month, so content quality compounds instead of resetting.</span></p>
        </motion.div>

        <div className="hidden md:block relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
            style={{ background: `linear-gradient(180deg, transparent, ${accent} 8%, ${accent} 92%, transparent)` }} />
          <div className="space-y-8">
            {processSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.13, duration: 0.5 }}
                  className={`flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className="flex-1 group" style={{ padding: isLeft ? "0 24px 0 0" : "0 0 0 24px" }}>
                    <div className="bg-white rounded-2xl p-6 border relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                      style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
                      <span className="inline-block text-[10px] font-black tracking-[0.18em] uppercase px-2.5 py-1 rounded-full mb-3"
                        style={{ background: `${accent}12`, color: accent }}>Phase {step.num}</span>
                      <h3 className="font-black text-[#0A1628] text-[15px] leading-snug mb-2"><span data-cms-key={`aifilm_step_${i}_t`} data-cms-label="step title" data-cms-attr="text">{step.title}</span></h3>
                      <p className="text-[13px] text-[#6B7280] leading-relaxed"><span data-cms-key={`aifilm_step_${i}_d`} data-cms-label="step desc" data-cms-attr="text">{step.desc}</span></p>
                    </div>
                  </div>
                  <div className="shrink-0 w-[56px] flex justify-center z-10">
                    <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-black text-white text-base transition-all duration-300 hover:scale-125 hover:rotate-12 cursor-default"
                      style={{ background: `linear-gradient(135deg, ${accent}, #be185d)`, boxShadow: `0 4px 20px ${accent}50` }}>
                      {step.num}
                    </div>
                  </div>
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="md:hidden relative pl-12">
          <div className="absolute left-4 top-2 bottom-2 w-[2px] rounded-full"
            style={{ background: `linear-gradient(180deg, ${accent}, ${accent}30)` }} />
          <div className="space-y-6">
            {processSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                <div className="absolute -left-[34px] w-8 h-8 rounded-full flex items-center justify-center font-black text-white text-xs z-10"
                  style={{ background: `linear-gradient(135deg, ${accent}, #be185d)`, boxShadow: `0 2px 12px ${accent}40` }}>
                  {step.num}
                </div>
                <div className="bg-white rounded-2xl p-5 border relative overflow-hidden" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div className="absolute bottom-0 left-0 h-[3px] w-10 rounded-b-xl" style={{ background: accent }} />
                  <span className="inline-block text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full mb-3"
                    style={{ background: `${accent}12`, color: accent }}>Phase {step.num}</span>
                  <h3 className="font-black text-[#0A1628] text-[14px] leading-snug mb-2">{step.title}</h3>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="section-badge" data-cms-key="aifilm_badge_4" data-cms-label="Section Badge" data-cms-attr="text">Client Love</span>
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight"><span data-cms-key="aifilm_s4_h2" data-cms-label="Section Heading" data-cms-attr="text">What Clients Say About Working With Us</span></h2>
        </motion.div>
        <DBTestimonialCarousel />
      </div>
    </section>

    {/* Why Us */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aifilm_badge_5" data-cms-label="Section Badge" data-cms-attr="text">Why Digital Aura</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="aifilm_s5_h2" data-cms-label="Section Heading" data-cms-attr="text">AI Speed, Without Losing the Strategy</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {whyUs.map((w, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border group relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${accent}, #7C3AED)` }} />
              <div className="w-2 h-2 rounded-full mb-4" style={{ background: accent }} />
              <h3 className="font-bold text-[#0A1628] mb-2 text-[15px]"><span data-cms-key={`aifilm_why_${i}_title`} data-cms-label="Why Title" data-cms-attr="text">{w.title}</span></h3>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`aifilm_why_${i}_desc`} data-cms-label="Why Desc" data-cms-attr="text">{w.desc}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Brands */}
    <section className="py-14 px-4 md:px-8 bg-white" style={{ borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] mb-2" style={{ color: "#9CA3AF" }}>Brands We've Created AI Video Content For</p>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mb-2">Real Businesses, Real AI Video Content, Delivered by Digital Aura</h2>
        </motion.div>
        <ClientLogoGrid accentColor={accent} clients={[
          { name: "Track My Ads",         tag: "AdTech",            logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 44'%3E%3Crect width='130' height='44' rx='8' fill='%232B4FD8'/%3E%3Crect x='8' y='7' width='30' height='30' rx='6' fill='white'/%3E%3Ctext x='23' y='27' font-family='Arial,sans-serif' font-size='17' font-weight='900' fill='%232B4FD8' text-anchor='middle'%3ET%3C/text%3E%3Ctext x='88' y='27' font-family='Arial,sans-serif' font-size='12' font-weight='700' fill='white' text-anchor='middle'%3Erackmyads%3C/text%3E%3C/svg%3E", logoBg: "#f0f8ff" },
          { name: "Silverstone Financial",tag: "Financial Services", logo: "https://silverstonefinancial.co.nz/wp-content/uploads/2025/03/Transparent-BG-e1747031572364.png", logoBg: "#f0faff" },
          { name: "Gleekey",              tag: "Tech & SaaS",       logo: "https://www.gleekey.in/public/front/images/logos/1765275447_logo.png", logoBg: "#f5f0ff" },
        ]} />
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="section-badge" data-cms-key="aifilm_badge_6" data-cms-label="Section Badge" data-cms-attr="text">FAQ</span>
          <h2 className="text-3xl font-black text-[#0A1628] tracking-tight"><span data-cms-key="aifilm_s6_h2" data-cms-label="Section Heading" data-cms-attr="text">Common Questions</span></h2>
        </motion.div>
        <div>{faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} idx={i} />)}</div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #EC4899, #7C3AED, #1A6FE8)" }} />
      <div className="absolute top-8 left-8 w-48 h-48 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #FF6B2B, transparent)" }} />
      <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
            style={{ background: "rgba(236,72,153,0.12)", border: "1px solid rgba(236,72,153,0.3)", color: accent }}>
            Let's Build Together
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            <span data-cms-key="aifilm_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Let's Turn Your Brand Into Scroll-Stopping Content</span>
          </h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="aifilm_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free content strategy call. We'll look at your current social presence and show you exactly which AI video formats would move the needle first — no generic proposal.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: `linear-gradient(135deg, ${accent}, #be185d)`, boxShadow: `0 4px 20px ${accent}40` }}>
            Book My Free Content Strategy Call <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default AIFilmmakingPage;
