import { motion } from "framer-motion";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const CtaBanner = () => {
  const s = useSettings(['cta_badge','cta_heading','cta_subtext','cta_button','contact_phone','contact_email']);
  return (
  <section className="py-14 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,107,43,0.08) 40%, transparent 70%)" }} />
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #1A6FE8)" }} />
    <div className="absolute top-8 left-8 w-32 h-32 rounded-full animate-drift opacity-20" style={{ background: "radial-gradient(circle, #FF6B2B, transparent)" }} />
    <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full animate-drift-2 opacity-15" style={{ background: "radial-gradient(circle, #1A6FE8, transparent)" }} />

    <div className="max-w-3xl mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span
          data-cms-key="cta_badge" data-cms-label="CTA Badge" data-cms-attr="text"
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-[#FF6B2B]"
          style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)" }}
        >
          {s.cta_badge || "Let's Build Together"}
        </span>

        <h2
          data-cms-key="cta_heading" data-cms-label="CTA Heading" data-cms-attr="text"
          className="text-4xl md:text-5xl lg:text-[54px] font-bold text-white leading-tight mb-5 tracking-tight"
        >
          {s.cta_heading || "Ready to Build, Automate & Grow?"}
        </h2>

        <p
          data-cms-key="cta_subtext" data-cms-label="CTA Subtext" data-cms-attr="text"
          className="text-[#E2E8F0] text-lg mb-10 max-w-xl mx-auto"
        >
          {s.cta_subtext || "From your first app to your 100th lead, Digital Aura is your all in one AI powered digital partner."}
        </p>

        <a href="/contact" data-cms-key="cta_button" data-cms-label="CTA Button" data-cms-attr="text"
          className="btn-orange px-10 py-4 text-lg gap-2 mb-6 inline-flex">
          {s.cta_button || "Start Your Project Today"} <ArrowRight size={20} />
        </a>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#E2E8F0]">
          <a href={`tel:${(s.contact_phone||'+918141200284').replace(/\s/g,'')}`}
            data-cms-key="contact_phone" data-cms-label="Phone Number" data-cms-attr="text"
            className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={15} className="text-[#FF6B2B]" /> {s.contact_phone || "+91 81412 00284"}
          </a>
          <a href={`mailto:${s.contact_email||'info@thedigitalaura.com'}`}
            data-cms-key="contact_email" data-cms-label="Email Address" data-cms-attr="text"
            className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={15} className="text-[#FF6B2B]" /> {s.contact_email || "info@thedigitalaura.com"}
          </a>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export default CtaBanner;
