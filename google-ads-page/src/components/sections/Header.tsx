import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Phone, ChevronDown,
  Bot, Brain, Workflow,
  Globe2, Code2, PenTool,
  ShoppingCart, Store,
  Search, Share2, Target,
  Smartphone, AppWindow, Layers,
  ArrowRight,
} from "lucide-react";

const LOGO_SRC = "/logo-cropped.png";
const BASE = "https://thedigitalaura.com";

const companyLinks = [
  { label: "About Us", href: `${BASE}/about`, color: "#FF6B2B", bg: "rgba(255,107,43,0.08)" },
  { label: "Our Engagement Models", href: `${BASE}/engagement-models`, color: "#7C3AED", bg: "rgba(124,58,237,0.08)" },
  { label: "Testimonials", href: `${BASE}/testimonials`, color: "#22C55E", bg: "rgba(34,197,94,0.08)" },
  { label: "Careers", href: `${BASE}/careers`, color: "#1A6FE8", bg: "rgba(26,111,232,0.08)" },
];

const megaCategories = [
  {
    key: "ai", label: "AI & Development", color: "#7C3AED", bg: "rgba(124,58,237,0.07)",
    items: [
      { icon: Bot,      title: "AI Powered Web Apps",      desc: "Smart, scalable apps with AI at the core",     route: `${BASE}/services/ai-powered-web-apps` },
      { icon: Brain,    title: "AI Automation Systems",    desc: "Intelligent workflows that save hours daily",    route: `${BASE}/services/ai-automation` },
      { icon: Workflow, title: "AI Chatbots & Assistants", desc: "24/7 conversational AI for leads & support",    route: `${BASE}/services/ai-chatbot-assistant` },
    ],
  },
  {
    key: "web", label: "Web Solutions", color: "#1A6FE8", bg: "rgba(26,111,232,0.07)",
    items: [
      { icon: Globe2,  title: "Custom Web Development",  desc: "High performance, SEO ready websites",          route: `${BASE}/services/web-app-development` },
      { icon: Code2,   title: "Full Stack Development",  desc: "End to end apps with robust backends & APIs",   route: `${BASE}/services/full-stack-development` },
      { icon: PenTool, title: "WordPress Development",   desc: "Fast, SEO driven WordPress sites",              route: `${BASE}/services/wordpress-development` },
    ],
  },
  {
    key: "ecommerce", label: "eCommerce", color: "#FF6B2B", bg: "rgba(255,107,43,0.07)",
    items: [
      { icon: ShoppingCart, title: "Shopify Development",     desc: "High converting custom Shopify stores",    route: `${BASE}/services/shopify-development` },
      { icon: Store,        title: "WooCommerce Development", desc: "Flexible WooCommerce with full control",   route: `${BASE}/services/woocommerce-development` },
    ],
  },
  {
    key: "marketing", label: "Digital Marketing", color: "#22C55E", bg: "rgba(34,197,94,0.07)",
    items: [
      { icon: Search, title: "SEO & Content Marketing", desc: "Rank on page 1 with technical SEO & content", route: `${BASE}/services/seo-content-marketing` },
      { icon: Target, title: "Google Ads",              desc: "Data driven Search, Display & Shopping ads",   route: `${BASE}/services/google-ads` },
      { icon: Share2, title: "Meta Ads",                desc: "Facebook & Instagram campaigns that convert",  route: `${BASE}/services/meta-ads` },
    ],
  },
  {
    key: "mobile", label: "Mobile Apps", color: "#EC4899", bg: "rgba(236,72,153,0.07)",
    items: [
      { icon: Smartphone, title: "Android Development", desc: "Native Kotlin apps for every Android device", route: `${BASE}/services/android-development` },
      { icon: AppWindow,  title: "Flutter Apps",        desc: "iOS & Android, one codebase, native feel",    route: `${BASE}/services/flutter-apps` },
      { icon: Layers,     title: "React Native Apps",   desc: "Cross platform apps with native UX",          route: `${BASE}/services/react-native-apps` },
    ],
  },
];

function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed left-0 right-0 overflow-hidden z-40"
      style={{ top: 72, boxShadow: "0 24px 64px rgba(0,0,0,0.13)", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB", background: "#fff" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-5 divide-x divide-gray-100">
          {megaCategories.map((cat) => (
            <div key={cat.key} className="p-4">
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: cat.color }} />
                <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: cat.color }}>{cat.label}</span>
              </div>
              <div className="space-y-1">
                {cat.items.map((item) => (
                  <a
                    key={item.title} href={item.route} onClick={onClose}
                    className="group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150"
                    style={{ background: "transparent" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = cat.bg; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: cat.bg }}>
                      <item.icon size={15} style={{ color: cat.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[#0A1628] leading-tight mb-0.5">{item.title}</p>
                      <p className="text-[11.5px] text-[#9CA3AF] leading-snug">{item.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-100 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#374151]">15+ services &nbsp;|&nbsp; Results guaranteed</span>
          <a href={`${BASE}/services`} onClick={onClose} className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#FF6B2B] transition-all">
            View All Services <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!megaOpen) return;
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.closest("nav")?.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [megaOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.08)" : "0 1px 0 rgba(0,0,0,0.06)",
        }}
        onMouseLeave={() => { setMegaOpen(false); setCompanyOpen(false); }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[72px] px-4 md:px-6">
          {/* Logo */}
          <a href={BASE} className="shrink-0 flex items-center">
            <img src={LOGO_SRC} alt="Digital Aura" className="h-[56px] w-auto object-contain" style={{ mixBlendMode: "multiply" }} />
          </a>

          {/* Center nav */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={BASE} className="text-[14px] font-medium text-[#374151] hover:text-[#FF6B2B] transition-colors relative group whitespace-nowrap">
              Home
              <span className="absolute -bottom-0.5 left-0 h-0.5 rounded-full transition-all duration-300 bg-[#FF6B2B] w-0 group-hover:w-full" />
            </a>

            {/* Company */}
            <div className="relative flex items-center" onMouseEnter={() => { setCompanyOpen(true); setMegaOpen(false); }} onMouseLeave={() => setCompanyOpen(false)}>
              <span className="text-[14px] font-medium text-[#374151] hover:text-[#FF6B2B] transition-colors cursor-default whitespace-nowrap">Company</span>
              <button onClick={() => setCompanyOpen(v => !v)} className={`ml-0.5 p-1 transition-colors ${companyOpen ? "text-[#FF6B2B]" : "text-[#374151] hover:text-[#FF6B2B]"}`}>
                <ChevronDown size={13} className={`transition-transform duration-200 ${companyOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl overflow-hidden z-[200] transition-all duration-150 ${companyOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid #F3F4F6" }}
              >
                <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />
                {companyLinks.map((cl) => (
                  <a key={cl.label} href={cl.href} onClick={() => setCompanyOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-[#374151] transition-colors"
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = cl.bg; (e.currentTarget as HTMLElement).style.color = cl.color; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = ""; }}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: cl.color }} />{cl.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Services mega */}
            <div ref={megaRef} className="relative flex items-center" onMouseEnter={() => setMegaOpen(true)}>
              <a href={`${BASE}/services`} className="text-[14px] font-medium text-[#374151] hover:text-[#FF6B2B] transition-colors relative group whitespace-nowrap">
                Services
                <span className="absolute -bottom-0.5 left-0 h-0.5 rounded-full transition-all duration-300 bg-[#FF6B2B] w-0 group-hover:w-full" />
              </a>
              <button onClick={() => setMegaOpen(v => !v)} className={`ml-0.5 p-1 transition-colors ${megaOpen ? "text-[#FF6B2B]" : "text-[#374151] hover:text-[#FF6B2B]"}`}>
                <ChevronDown size={13} className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
              </button>
              {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
            </div>

            {[{ label: "Case Studies", href: `${BASE}/case-studies` }, { label: "Blogs", href: `${BASE}/blog` }, { label: "Contact", href: `${BASE}/contact` }].map(l => (
              <a key={l.label} href={l.href} className="text-[14px] font-medium text-[#374151] hover:text-[#FF6B2B] transition-colors relative group whitespace-nowrap">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-0.5 rounded-full transition-all duration-300 bg-[#FF6B2B] w-0 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a href="tel:+918141200284" className="flex items-center gap-1.5 text-[15px] font-medium text-[#374151] hover:text-[#FF6B2B] transition-colors">
              <Phone size={14} className="text-[#FF6B2B]" /> +91 81412 00284
            </a>
            <a href={`${BASE}/contact`} style={{ background: "#FF6B2B", color: "#fff", borderRadius: "8px", padding: "10px 20px", fontWeight: 600, fontSize: "15px", textDecoration: "none", display: "inline-block" }}>
              Get Growth Plan
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden p-2 rounded-lg text-[#0A1628] hover:bg-gray-100 transition-colors" onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[100] flex flex-col bg-white overflow-y-auto transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 py-6">
          <a href={BASE}><img src={LOGO_SRC} alt="Digital Aura" className="h-[56px] w-auto object-contain" style={{ mixBlendMode: "multiply" }} /></a>
          <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 text-[#0A1628]"><X size={24} /></button>
        </div>
        <div className="flex flex-col px-6 flex-1">
          <a href={BASE} onClick={() => setMobileOpen(false)} className="block text-2xl font-bold border-b border-gray-100 py-4 text-[#0A1628] hover:text-[#FF6B2B] transition-colors">Home</a>

          <div>
            <div className="flex items-center justify-between border-b border-gray-100 py-4">
              <span className="text-2xl font-bold text-[#0A1628]">Company</span>
              <button onClick={() => setMobileCompanyOpen(v => !v)} className="p-2 -mr-2">
                <ChevronDown size={20} className={`transition-transform duration-200 ${mobileCompanyOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            <div className={`overflow-hidden transition-all duration-200 ${mobileCompanyOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="py-2 space-y-1">
                {companyLinks.map(cl => (
                  <a key={cl.label} href={cl.href} onClick={() => setMobileOpen(false)} className="block py-2.5 px-2 text-[15px] font-medium text-[#374151] hover:text-[#FF6B2B] transition-colors">{cl.label}</a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-gray-100 py-4">
              <a href={`${BASE}/services`} onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-[#0A1628]">Services</a>
              <button onClick={() => setMobileServicesOpen(v => !v)} className="p-2 -mr-2">
                <ChevronDown size={20} className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            <div className={`overflow-hidden transition-all duration-200 ${mobileServicesOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
              {megaCategories.map(cat => (
                <div key={cat.key} className="mb-4 mt-2">
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                    <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: cat.color }}>{cat.label}</span>
                  </div>
                  {cat.items.map(item => (
                    <a key={item.title} href={item.route} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-2.5 px-2 rounded-xl">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: cat.bg }}>
                        <item.icon size={13} style={{ color: cat.color }} />
                      </div>
                      <span className="text-[14px] font-medium text-[#0A1628]">{item.title}</span>
                    </a>
                  ))}
                </div>
              ))}
              <a href={`${BASE}/services`} onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#FF6B2B] mb-4">
                View All Services <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {[{ label: "Case Studies", href: `${BASE}/case-studies` }, { label: "Blogs", href: `${BASE}/blog` }, { label: "Contact", href: `${BASE}/contact` }].map(l => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block text-2xl font-bold border-b border-gray-100 py-4 text-[#0A1628] hover:text-[#FF6B2B] transition-colors">{l.label}</a>
          ))}
        </div>
        <div className="px-6 pb-8 mt-4 space-y-3">
          <a href="tel:+918141200284" className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Phone size={14} className="text-[#FF6B2B]" /> +91 81412 00284
          </a>
          <a href={`${BASE}/contact`} className="block text-center w-full py-4 px-6 text-base font-semibold text-white rounded-xl" style={{ background: "#FF6B2B" }}>
            Get Growth Plan →
          </a>
        </div>
      </div>
    </>
  );
}
