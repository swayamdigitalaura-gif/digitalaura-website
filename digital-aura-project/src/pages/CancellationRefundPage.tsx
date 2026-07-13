import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { XCircle, RefreshCw, Clock, CreditCard, AlertCircle } from "lucide-react";

const cancellationSections = [
  {
    number: "01",
    color: "#FF6B2B",
    title: "Ongoing Projects & Services",
    body: "Clients may cancel any ongoing service by providing a 30-day written notice in advance. Work completed up to the cancellation date will be billed accordingly.",
  },
  {
    number: "02",
    color: "#7C3AED",
    title: "Monthly Retainer Services",
    body: "Retainer-based services (such as SEO, social media management, and ad campaign management) require a 30-day advance written notice before the next billing cycle begins.",
  },
  {
    number: "03",
    color: "#1A6FE8",
    title: "Project-Based Work",
    body: "If cancellation occurs before project commencement, partial refunds may be available after deducting administrative, planning, and resource allocation fees incurred.",
  },
];

const refundSections = [
  {
    icon: XCircle,
    color: "#EF4444",
    title: "No Refunds on Delivered Work",
    body: "Due to the nature of digital services, no refunds are issued for services that have already been started, worked upon, or delivered. This includes strategy documents, creative assets, campaign setups, and live deliverables.",
  },
  {
    icon: CreditCard,
    color: "#22C55E",
    title: "Advance or Prepaid Projects",
    body: "Partial refunds may be considered for projects not yet started with minimal resource allocation, subject to review and approval by the Digital Aura management team.",
  },
  {
    icon: Clock,
    color: "#1A6FE8",
    title: "Refund Processing Time",
    body: "Any applicable refund will be processed within 7–10 business days through the original payment method used at the time of transaction.",
  },
];

const CancellationRefundPage = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 480, height: 480, top: "-12%", right: "-6%", background: "radial-gradient(circle,rgba(124,58,237,0.10) 0%,transparent 70%)", filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 360, height: 360, bottom: "-10%", left: "-4%", background: "radial-gradient(circle,rgba(255,107,43,0.08) 0%,transparent 70%)", filter: "blur(60px)" }} />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 pt-14 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
            <RefreshCw size={32} style={{ color: "#7C3AED" }} />
          </div>
          <span className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5"
            style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)" }}>
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            Cancellation &amp; Refund Policy
          </h1>
          <p className="text-[#4B5563] text-base leading-relaxed max-w-xl mx-auto">
            We believe in transparency. This policy outlines the terms for cancellations and refunds to ensure clarity for all clients engaging with Digital Aura.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Content */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Cancellation */}
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,107,43,0.1)", border: "1px solid rgba(255,107,43,0.2)" }}>
              <XCircle size={20} style={{ color: "#FF6B2B" }} />
            </div>
            <h2 className="text-2xl font-black text-[#0A1628]">Cancellation Policy</h2>
          </motion.div>
          <div className="space-y-4">
            {cancellationSections.map((sec, i) => (
              <motion.div key={sec.number}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl bg-white border" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="text-3xl font-black shrink-0 leading-none mt-0.5" style={{ color: `${sec.color}30` }}>
                  {sec.number}
                </div>
                <div>
                  <h3 className="font-black text-[#0A1628] mb-2">{sec.title}</h3>
                  <p className="text-[#374151] text-sm leading-relaxed">{sec.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Refund */}
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(26,111,232,0.1)", border: "1px solid rgba(26,111,232,0.2)" }}>
              <CreditCard size={20} style={{ color: "#1A6FE8" }} />
            </div>
            <h2 className="text-2xl font-black text-[#0A1628]">Refund Policy</h2>
          </motion.div>
          <div className="space-y-4">
            {refundSections.map((sec, i) => (
              <motion.div key={sec.title}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 bg-white border" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${sec.color}14`, border: `1px solid ${sec.color}30` }}>
                    <sec.icon size={17} style={{ color: sec.color }} />
                  </div>
                  <h3 className="font-black text-[#0A1628]">{sec.title}</h3>
                </div>
                <p className="text-[#374151] text-sm leading-relaxed">{sec.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl p-5 flex items-start gap-4" style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.15)" }}>
          <AlertCircle size={18} className="shrink-0 mt-0.5" style={{ color: "#7C3AED" }} />
          <p className="text-sm text-[#374151] leading-relaxed">
            All cancellation requests must be submitted in writing to{" "}
            <a href="mailto:info@thedigitalaura.com" className="font-semibold" style={{ color: "#7C3AED" }}>
              info@thedigitalaura.com
            </a>
            . Verbal cancellations are not accepted. Last updated: May 2026.
          </p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);

export default CancellationRefundPage;
