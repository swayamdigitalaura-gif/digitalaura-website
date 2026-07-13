import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { FileText, Clock, CreditCard, Palette, AlertTriangle } from "lucide-react";

const sections = [
  {
    icon: FileText,
    color: "#1A6FE8",
    title: "General",
    items: [
      "Digital Aura provides website design, SEO, paid advertising, and social media services on a project or retainer basis.",
      "All services are subject to written agreements and mutual understanding between Digital Aura and the client.",
    ],
  },
  {
    icon: Clock,
    color: "#7C3AED",
    title: "Service Timelines",
    items: [
      "Delivery schedules depend on project scope and how quickly clients provide the necessary information and materials.",
      "Delays due to incomplete client inputs, missing assets, or delayed approvals are not the responsibility of Digital Aura.",
    ],
  },
  {
    icon: CreditCard,
    color: "#FF6B2B",
    title: "Payment Terms",
    items: [
      "All payments are to be made in advance unless otherwise agreed in writing.",
      "Late payments may attract penalties or result in the suspension of active services until dues are cleared.",
    ],
  },
  {
    icon: Palette,
    color: "#22C55E",
    title: "Intellectual Property",
    items: [
      "All creative assets, designs, and deliverables remain the property of Digital Aura until full payment is received.",
      "Clients receive full rights to the completed work upon settlement of all outstanding payments.",
    ],
  },
  {
    icon: AlertTriangle,
    color: "#F59E0B",
    title: "Limitation of Liability",
    body: "Digital Aura is not liable for any loss, business interruption, or damage arising from delays, technical errors, or third-party platform issues (including but not limited to Google, Meta, or hosting providers). By engaging our services, clients acknowledge and accept these limitations.",
  },
];

const TermsAndConditionsPage = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 480, height: 480, top: "-12%", right: "-6%", background: "radial-gradient(circle,rgba(26,111,232,0.10) 0%,transparent 70%)", filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 360, height: 360, bottom: "-10%", left: "-4%", background: "radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 pt-14 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(26,111,232,0.1)", border: "1px solid rgba(26,111,232,0.2)" }}>
            <FileText size={32} style={{ color: "#1A6FE8" }} />
          </div>
          <span className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5"
            style={{ background: "rgba(26,111,232,0.1)", color: "#1A6FE8", border: "1px solid rgba(26,111,232,0.2)" }}>
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-[#4B5563] text-base leading-relaxed max-w-xl mx-auto">
            By engaging with Digital Aura's services, you agree to the following terms. Please read them carefully before commencing any project or retainer arrangement.
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
              <ul className="space-y-4">
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
          className="rounded-2xl p-6 text-center" style={{ background: "rgba(26,111,232,0.05)", border: "1px solid rgba(26,111,232,0.15)" }}>
          <p className="text-sm text-[#6B7280]">
            Last updated: May 2026 · For any queries regarding these terms, contact us at{" "}
            <a href="mailto:info@thedigitalaura.com" className="font-semibold" style={{ color: "#1A6FE8" }}>
              info@thedigitalaura.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);

export default TermsAndConditionsPage;
