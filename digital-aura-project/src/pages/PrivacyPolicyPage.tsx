import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Shield, Lock, Eye, Users, AlertCircle, CheckCircle2 } from "lucide-react";

const sections = [
  {
    icon: Eye,
    color: "#FF6B2B",
    title: "Information Collected",
    items: [
      "Personal details (name, email, phone, company name)",
      "Website access credentials and hosting information",
      "Social media account access (Facebook, Instagram, LinkedIn)",
      "Meta Ads Manager and Google Ads account access",
      "Business models, marketing strategies, and brand assets",
      "CRM data, lead generation forms, and customer information",
    ],
  },
  {
    icon: CheckCircle2,
    color: "#1A6FE8",
    title: "Information Usage",
    items: [
      "Executing digital marketing campaigns and delivering services",
      "Enhancing online performance across SEO, ads, and social media",
      "Communicating updates, reports, and project status",
      "Providing secure platform access for campaign execution",
    ],
  },
  {
    icon: Lock,
    color: "#7C3AED",
    title: "Data Protection",
    body: "All sensitive information provided by you (including logins, business data, and customer data) is kept strictly confidential. We do not share, sell, or rent your data to third parties. All team members sign confidentiality agreements, and encrypted tools are used to protect stored credentials.",
  },
  {
    icon: Users,
    color: "#22C55E",
    title: "Third-Party Access",
    body: "While trusted third-party tools (Google, Meta, CRM platforms) may be used for campaign execution, your proprietary client data remains undisclosed to any other parties.",
  },
  {
    icon: AlertCircle,
    color: "#F59E0B",
    title: "Consent",
    body: "By using our services, you agree to the terms outlined in this Privacy Policy and consent to the data usage practices described herein.",
  },
];

const PrivacyPolicyPage = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 480, height: 480, top: "-12%", right: "-6%", background: "radial-gradient(circle,rgba(255,107,43,0.10) 0%,transparent 70%)", filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 360, height: 360, bottom: "-10%", left: "-4%", background: "radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 pt-14 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(255,107,43,0.1)", border: "1px solid rgba(255,107,43,0.2)" }}>
            <Shield size={32} style={{ color: "#FF6B2B" }} />
          </div>
          <span className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5"
            style={{ background: "rgba(255,107,43,0.1)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.2)" }}>
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-[#4B5563] text-base leading-relaxed max-w-xl mx-auto">
            Digital Aura values client privacy and commits to safeguarding personal and business data. This policy explains how we collect, use, and protect your information.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Content */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-4xl mx-auto space-y-6">
        {sections.map((sec, i) => (
          <motion.div key={sec.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-8 bg-white border" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${sec.color}14`, border: `1px solid ${sec.color}30` }}>
                <sec.icon size={20} style={{ color: sec.color }} />
              </div>
              <h2 className="text-xl font-black text-[#0A1628]">{sec.title}</h2>
            </div>
            {sec.items ? (
              <ul className="space-y-3">
                {sec.items.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: sec.color }} />
                    <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[#374151] text-sm leading-relaxed">{sec.body}</p>
            )}
          </motion.div>
        ))}

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="rounded-2xl p-6 text-center" style={{ background: "rgba(255,107,43,0.05)", border: "1px solid rgba(255,107,43,0.15)" }}>
          <p className="text-sm text-[#6B7280]">
            Last updated: May 2026 · For privacy queries, contact us at{" "}
            <a href="mailto:info@thedigitalaura.com" className="font-semibold" style={{ color: "#FF6B2B" }}>
              info@thedigitalaura.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);

export default PrivacyPolicyPage;
