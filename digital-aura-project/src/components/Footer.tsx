import { Linkedin, Instagram, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useSettings } from "@/hooks/useSettings";

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
  { heading: "E-Commerce Solutions", color: "#FF6B2B", items: [
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
  { heading: "Mobile App Development", color: "#EC4899", items: [
    { label: "Android Development",           href: "/services/mobile-app-development?type=android" },
    { label: "Flutter App Development",       href: "/services/mobile-app-development?type=flutter" },
    { label: "React Native App Development",  href: "/services/mobile-app-development?type=reactnative" },
  ]},
];

const LinkItem = ({ label, href, dot }: { label: string; href: string; dot: string }) => (
  <li>
    <Link to={href} className="group text-[13px] text-white hover:opacity-80 transition-opacity duration-200 flex items-center gap-2">
      <span className="w-1 h-1 rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: dot }} />
      {label}
    </Link>
  </li>
);

const Footer = () => {
  const s = useSettings(['contact_email','contact_phone','address_full','footer_copyright','social_linkedin','social_instagram']);

  const linkedinHref  = s.social_linkedin  || 'https://www.linkedin.com/in/sambhav-shah/';
  const instagramHref = s.social_instagram || 'https://www.instagram.com/sambhavshah2/';

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

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
            <span className="w-3 h-px bg-[#FF6B2B]" /> Quick Links
          </h4>
          <ul className="grid grid-cols-2 lg:grid-cols-1 gap-x-2 gap-y-2.5">
            {quickLinks.map(l => <LinkItem key={l.label} {...l} dot="#FF6B2B" />)}
          </ul>
        </div>

        {/* Our Services — heading centered over both sub-columns */}
        <div className="sm:col-span-2 lg:col-span-2">
          <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.12em] mb-4 flex items-center gap-2 lg:justify-center lg:pr-[18%]">
            <span className="w-3 h-px bg-[#7C3AED]" /> Our Services
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {/* Left sub-column */}
            <div className="space-y-4">
              {servicesLeft.map(group => (
                <div key={group.heading}>
                  <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: group.color }}>{group.heading}</p>
                  <ul className="space-y-2">
                    {group.items.map(l => <LinkItem key={l.label} {...l} dot={group.color} />)}
                  </ul>
                </div>
              ))}
            </div>
            {/* Right sub-column */}
            <div className="space-y-4">
              {servicesRight.map(group => (
                <div key={group.heading}>
                  <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: group.color }}>{group.heading}</p>
                  <ul className="space-y-2">
                    {group.items.map(l => <LinkItem key={l.label} {...l} dot={group.color} />)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
            <span className="w-3 h-px bg-[#1A6FE8]" /> Contact Us
          </h4>
          <ul className="space-y-3 mb-4">
            <li>
              <a href={`tel:${(s.contact_phone||'+918141200284').replace(/\s/g,'')}`}
                className="flex items-center gap-2 text-[13px] text-white hover:opacity-80 transition-opacity">
                <Phone size={13} className="text-[#FF6B2B] shrink-0" />
                {s.contact_phone || "+91 8141200284"}
              </a>
            </li>
            <li>
              <a href={`mailto:${s.contact_email||'info@thedigitalaura.com'}`}
                className="flex items-start gap-2 text-[13px] text-white hover:opacity-80 transition-opacity">
                <Mail size={13} className="text-[#FF6B2B] shrink-0 mt-0.5" />
                {s.contact_email || "info@thedigitalaura.com"}
              </a>
            </li>
            <li>
              <a href="https://maps.app.goo.gl/rNtQ9RkNtePogkJeA" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2 text-[13px] text-white hover:opacity-80 transition-opacity group">
                <MapPin size={13} className="text-[#FF6B2B] shrink-0 mt-0.5" />
                <span>{s.address_full || "713, Shilp Arcade, Sardar Patel Ring Rd, Ahmedabad, Gujarat 382330"}</span>
              </a>
            </li>
          </ul>
          {/* Social icons */}
          <div className="flex gap-2.5">
            <a href={linkedinHref} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <Linkedin size={15} />
            </a>
            <a href={instagramHref} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <Instagram size={15} />
            </a>
          </div>
        </div>

      </div>

      <div className="h-px mb-5" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white">
        <span>{s.footer_copyright || "© 2026 — DigitalAura. All Rights Reserved."}</span>
        <div className="flex items-center gap-4">
          <Link to="/privacy-policy" className="hover:opacity-70 transition-opacity">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="hover:opacity-70 transition-opacity">Terms & Conditions</Link>
          <Link to="/cancellation-refund-policy" className="hover:opacity-70 transition-opacity">Cancellation & Refund Policy</Link>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
