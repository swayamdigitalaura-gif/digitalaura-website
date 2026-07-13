import { MapPin, Mail, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home",         href: "/" },
  { label: "About Us",     href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Careers",      href: "/careers" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blogs",        href: "/blog" },
  { label: "Contact Us",   href: "/contact" },
];

const servicesLeft = [
  { heading: "AI Solutions", color: "#7C3AED", items: [
    { label: "AI Powered Web Apps",    href: "/services/ai-powered-web-apps" },
    { label: "AI Automation Systems",  href: "/services/ai-automation" },
    { label: "AI Chatbot & Assistants",href: "/services/ai-chatbot-assistant" },
  ]},
  { heading: "Web Solutions", color: "#1A6FE8", items: [
    { label: "Full Stack Development", href: "/services/full-stack-development" },
    { label: "WordPress Development",  href: "/services/wordpress-development" },
    { label: "Custom Web Development", href: "/services/web-app-development" },
  ]},
  { heading: "E-Commerce", color: "#FF6B2B", items: [
    { label: "Shopify Development",    href: "/services/shopify-development" },
    { label: "WooCommerce Development",href: "/services/woocommerce-development" },
  ]},
];

const servicesRight = [
  { heading: "Digital Marketing", color: "#22C55E", items: [
    { label: "SEO, AIO & GEO", href: "/services/seo-content-marketing" },
    { label: "Google Ads",     href: "/services/google-ads" },
    { label: "Meta Ads",       href: "/services/meta-ads" },
  ]},
  { heading: "Mobile Apps", color: "#EC4899", items: [
    { label: "Android Development",          href: "/services/android-development" },
    { label: "Flutter App Development",      href: "/services/flutter-apps" },
    { label: "React Native App Development", href: "/services/react-native-apps" },
  ]},
];

function LinkItem({ label, href, dot }: { label: string; href: string; dot: string }) {
  return (
    <li>
      <a href={href} className="group text-[13px] text-white hover:opacity-80 transition-opacity duration-200 flex items-center gap-2">
        <span className="w-1 h-1 rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: dot }} />
        {label}
      </a>
    </li>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "#070E1C" }} className="relative overflow-hidden">
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #7C3AED, #FF6B2B, #1A6FE8, transparent)" }} />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full pointer-events-none opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #FF6B2B, transparent)", filter: "blur(60px)" }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
              <span className="w-3 h-px bg-[#FF6B2B]" /> Quick Links
            </h4>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-x-2 gap-y-2.5">
              {quickLinks.map(l => <LinkItem key={l.label} {...l} dot="#FF6B2B" />)}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.12em] mb-4 flex items-center gap-2 lg:justify-center lg:pr-[18%]">
              <span className="w-3 h-px bg-[#7C3AED]" /> Our Services
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {servicesLeft.map(group => (
                  <div key={group.heading}>
                    <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: group.color }}>{group.heading}</p>
                    <ul className="space-y-2">{group.items.map(l => <LinkItem key={l.label} {...l} dot={group.color} />)}</ul>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {servicesRight.map(group => (
                  <div key={group.heading}>
                    <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: group.color }}>{group.heading}</p>
                    <ul className="space-y-2">{group.items.map(l => <LinkItem key={l.label} {...l} dot={group.color} />)}</ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
              <span className="w-3 h-px bg-[#1A6FE8]" /> Contact Us
            </h4>
            <ul className="space-y-3 mb-4">
              <li>
                <a href="tel:+918141200284" className="flex items-center gap-2 text-[13px] text-white hover:opacity-80 transition-opacity">
                  <Phone size={13} className="text-[#FF6B2B] shrink-0" /> +91 8141200284
                </a>
              </li>
              <li>
                <a href="mailto:info@thedigitalaura.com" className="flex items-start gap-2 text-[13px] text-white hover:opacity-80 transition-opacity">
                  <Mail size={13} className="text-[#FF6B2B] shrink-0 mt-0.5" /> info@thedigitalaura.com
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/rNtQ9RkNtePogkJeA" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-2 text-[13px] text-white hover:opacity-80 transition-opacity">
                  <MapPin size={13} className="text-[#FF6B2B] shrink-0 mt-0.5" />
                  <span>713, Shilp Arcade, Sardar Patel Ring Rd, Ahmedabad, Gujarat 382330</span>
                </a>
              </li>
            </ul>
            <div className="flex gap-2.5">
              <a href="https://www.linkedin.com/company/thedigitalaura/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.instagram.com/thedigitalaura/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="h-px mb-5" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white">
          <span>© {new Date().getFullYear()} — DigitalAura. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy" className="hover:opacity-70 transition-opacity">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:opacity-70 transition-opacity">Terms & Conditions</a>
            <a href="/cancellation-refund-policy" className="hover:opacity-70 transition-opacity">Cancellation & Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
