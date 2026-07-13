import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BarChart3, ArrowRight, ChevronDown, Check,
  TrendingUp, Users, ShoppingCart, Shield, Zap,
  Database, Globe2, FileText, Cpu, Settings,
  CheckCircle2, Clock, Target,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";

const accent = "#22C55E";
const accentLight = "rgba(34,197,94,0.1)";
const accentBorder = "rgba(34,197,94,0.25)";
const gradient = "linear-gradient(135deg,#22C55E,#16a34a)";

const features = [
  {
    Icon: TrendingUp, title: "Demand Forecasting",
    desc: "AI models that predict future sales, product demand, and seasonal fluctuations so you can optimise inventory, staffing, and procurement weeks in advance.",
    tags: ["Sales forecasting", "Inventory optimisation", "Seasonal planning"],
  },
  {
    Icon: Users, title: "Customer Churn Prediction",
    desc: "Identify customers likely to cancel or disengage before they do with enough lead time to trigger retention campaigns, personalised offers, or proactive outreach.",
    tags: ["Churn scoring", "Retention triggers", "Customer health"],
  },
  {
    Icon: Target, title: "Revenue & Growth Forecasting",
    desc: "Data driven revenue models that predict monthly recurring revenue, pipeline conversion rates, and growth trajectory giving leadership accurate projections for decisions.",
    tags: ["MRR forecasting", "Pipeline analysis", "Growth modelling"],
  },
  {
    Icon: ShoppingCart, title: "Customer Lifetime Value (CLV)",
    desc: "Predict how much revenue each customer will generate over their lifetime so you can focus acquisition spend on high value segments and personalise retention efforts.",
    tags: ["CLV modelling", "Segment targeting", "Acquisition ROI"],
  },
  {
    Icon: Shield, title: "Fraud & Anomaly Detection",
    desc: "Real time models that flag unusual transactions, access patterns, or operational anomalies before they cause financial loss or security incidents.",
    tags: ["Real time detection", "Anomaly flagging", "Financial protection"],
  },
  {
    Icon: BarChart3, title: "Marketing Mix Modelling",
    desc: "Understand which channels, campaigns, and spend levels drive the most revenue and optimise your marketing budget allocation based on actual attributable impact.",
    tags: ["Channel attribution", "Budget optimisation", "ROAS modelling"],
  },
];

const process = [
  { step: "01", title: "Business Objective Mapping", desc: "We start with what decision you want to make better not with data. The business outcome drives everything: the model choice, features, and success metrics." },
  { step: "02", title: "Data Audit & Preparation", desc: "We assess your available data sources, identify gaps, and clean, transform, and engineer features that give the model the best signal for accurate predictions." },
  { step: "03", title: "Model Development & Selection", desc: "We train multiple model types (regression, gradient boosting, neural nets) and select the one with the best accuracy, interpretability, and performance on your data." },
  { step: "04", title: "Validation & Testing", desc: "Models are rigorously back tested on historical data and validated on held out test sets before any predictions are used for real decisions." },
  { step: "05", title: "Deployment & Integration", desc: "The model is deployed as an API or embedded directly into your dashboards, CRM, or operational tools so predictions are available where decisions happen." },
  { step: "06", title: "Monitor & Retrain", desc: "We monitor model drift, accuracy degradation, and data pipeline health and retrain models periodically so predictions stay accurate as your business evolves." },
];

const useCases = [
  { Icon: ShoppingCart, label: "eCommerce inventory management" },
  { Icon: Users, label: "SaaS churn reduction programs" },
  { Icon: TrendingUp, label: "Financial revenue forecasting" },
  { Icon: Shield, label: "Insurance and fintech fraud detection" },
  { Icon: Target, label: "Marketing budget allocation" },
  { Icon: Globe2, label: "Supply chain demand planning" },
  { Icon: Clock, label: "Predictive maintenance (IoT/manufacturing)" },
  { Icon: FileText, label: "Healthcare readmission prediction" },
];

const tech = [
  { label: "ML Frameworks", color: accent, bg: accentLight, pills: ["scikit-learn", "XGBoost", "LightGBM", "TensorFlow", "PyTorch"] },
  { label: "Data Processing", color: "#1A6FE8", bg: "rgba(26,111,232,0.1)", pills: ["pandas", "Apache Spark", "dbt", "Airflow"] },
  { label: "Data Warehouses", color: "#7C3AED", bg: "rgba(124,58,237,0.1)", pills: ["BigQuery", "Snowflake", "Redshift", "PostgreSQL"] },
  { label: "Deployment", color: "#FF6B2B", bg: "rgba(255,107,43,0.1)", pills: ["MLflow", "FastAPI", "AWS SageMaker", "Docker"] },
  { label: "Visualisation", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", pills: ["Looker", "Tableau", "Power BI", "Metabase"] },
];

const stats = [
  { value: "92%", label: "Average model accuracy on client data" },
  { value: "4, 6 wk", label: "From data to first predictions" },
  { value: "30%", label: "Avg reduction in churn after deployment" },
  { value: "Real time", label: "Prediction latency for critical models" },
];

const whyUs = [
  "We start with business outcomes, not data your KPIs drive model design",
  "Interpretable models: we explain why the model made each prediction",
  "End to end ownership: data pipelines, modelling, deployment, monitoring",
  "Validated on held out test sets before any real decisions are made",
  "Integration with your existing BI tools and dashboards",
  "Ongoing monitoring and retraining so models stay accurate over time",
];

const results = [
  { Icon: TrendingUp, text: "Predict demand weeks before it happens" },
  { Icon: Users, text: "Retain customers before they churn" },
  { Icon: CheckCircle2, text: "Data driven decisions, not gut calls" },
  { Icon: Zap, text: "Real time insights where decisions happen" },
];

const faqs = [
  { q: "How much historical data do I need for predictive analytics?", a: "It depends on the use case. Churn models typically need 12+ months of customer behaviour data. Demand forecasting works best with 2+ years of sales history to capture seasonality. Fraud detection can work with less if the signal is strong. We always audit your data first and tell you honestly what's achievable before building anything." },
  { q: "Will the predictions actually be accurate for my business?", a: "Accuracy depends on data quality, data volume, and how predictable your domain is. We validate every model on held out test data and report honest accuracy metrics before deployment. If the data isn't sufficient for reliable predictions, we'll tell you and suggest what data collection would improve it rather than deploying a model that will mislead decisions." },
  { q: "How do I access the predictions?", a: "We deploy predictions where you make decisions. This might mean a column in your CRM showing churn risk, a dashboard widget showing next month's demand, an API your app calls in real time, or an automated trigger that fires when a customer crosses a risk threshold. The delivery format is designed around your actual workflow." },
  { q: "Do you build custom models or use off-the-shelf tools?", a: "Both, depending on your needs. For standard use cases (churn, demand, CLV), we start with proven ML frameworks and adapt them to your data. For novel or highly specialised problems, we build fully custom models from scratch. We choose based on accuracy requirements, cost, and your timeline not to showcase complexity." },
  { q: "Can you connect to our existing data warehouse?", a: "Yes. We connect to BigQuery, Snowflake, Redshift, PostgreSQL, MySQL, and most other SQL-based warehouses. We also build data pipelines to collect and transform data from your CRM, marketing tools, and operational systems if a warehouse isn't in place yet." },
  { q: "How do you handle model drift over time?", a: "All production models are monitored for accuracy degradation, data drift, and prediction quality. We set up automated alerts when performance degrades below acceptable thresholds and schedule periodic retraining cycles typically quarterly for stable domains, monthly for rapidly changing ones." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: open ? `${accent}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`predictive_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="predictive_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accent} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`predictive_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const PredictiveAnalyticsPage = () => {
  const _sp = useSettings(['predictive_hero_h1','predictive_hero_sub','predictive_cta_btn']);
  return (
  <PageLayout>
    {/* HERO */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 640, height: 640, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${accentLight} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0", left: "-8%", background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 pt-20 pb-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold mb-5 hover:underline" style={{ color: accent }}>
            ← Back to All Services
          </Link>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: accentLight, color: accent, border: `1px solid ${accentBorder}` }}>
              <BarChart3 size={12} /> Predictive Analytics
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="predictive_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">Act Before Problems Happen.<br />
            <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Predict What's Coming Next.
            </span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-5 leading-relaxed">
            <span data-cms-key="predictive_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">We build AI models that forecast demand, predict churn, detect fraud, and surface revenue opportunities so you can act on data before problems cost you money.</span>
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Churn Prediction", "Demand Forecasting", "CLV Modelling", "Fraud Detection", "Revenue Forecasting", "Real time"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: accentLight, color: accent, border: `1px solid ${accentBorder}` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: gradient, boxShadow: "0 8px 24px rgba(34,197,94,0.4)" }}>
              <span data-cms-key="predictive_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Start Predicting</span> <ArrowRight size={16} />
            </Link>
            <a href="#use cases" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all"
              style={{ borderColor: "#0A1628" }}>
              See Use Cases
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* STATS */}
    <section className="py-10 px-4" style={{ background: "#F8FAFF", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s, si) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.08 }}>
            <div className="text-3xl font-black mb-1" style={{ color: accent }}>{s.value}</div>
            <div className="text-[13px] text-[#6B7280] font-medium">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* FEATURES */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] mb-4 tracking-tight"><span data-cms-key="predictive_h2_26" data-cms-label="Section Heading" data-cms-attr="text">What We</span> <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Predict</span>
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-lg"><span data-cms-key="predictive_x11" data-cms-label="Body Text" data-cms-attr="text">From churn to demand to fraud every model is built for a specific decision your business needs to make better.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
              className="group rounded-2xl p-6 bg-[#F8FAFF] border relative overflow-hidden transition-all duration-200 hover:-translate-y-1"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 28px rgba(34,197,94,0.12)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: gradient }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: accentLight }}>
                <f.Icon size={20} style={{ color: accent }} />
              </div>
              <h3 className="text-[16px] font-bold text-[#0A1628] mb-2"><span data-cms-key={`predictive_f_${i}_title`} data-cms-label="Feature Title" data-cms-attr="text">{f.title}</span></h3>
              <p className="text-[13.5px] text-[#6B7280] leading-relaxed mb-4"><span data-cms-key={`predictive_f_${i}_desc`} data-cms-label="Feature Desc" data-cms-attr="text">{f.desc}</span></p>
              <div className="flex flex-wrap gap-1.5">
                {f.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: accentLight, color: accent }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* PROCESS */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl md:text-[38px] font-black text-[#0A1628] mb-4 tracking-tight"><span data-cms-key="predictive_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Our Analytics Process</span></h2>
          <p className="text-[#4B5563] max-w-lg mx-auto"><span data-cms-key="predictive_x12" data-cms-label="Body Text" data-cms-attr="text">We start with the decision, not the data so every model we build directly improves a business outcome you care about.</span></p>
        </motion.div>
        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {process.map((p, i) => (
            <motion.div key={p.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 border bg-white relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${accent}, #16a34a)` }}>{p.step}</div>
                <h3 className="font-bold text-[#0A1628] text-[15px]"><span data-cms-key={`predictive_p_${i}_title`} data-cms-label="Process Title" data-cms-attr="text">{p.title}</span></h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`predictive_p_${i}_desc`} data-cms-label="Process Desc" data-cms-attr="text">{p.desc}</span></p>
            </motion.div>
          ))}
        </div>
        {/* Desktop: split timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
            style={{ background: `linear-gradient(180deg, transparent, ${accent} 8%, ${accent} 92%, transparent)` }} />
          <div className="space-y-8">
            {process.map((p, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={p.step} initial={{ opacity: 0, x: isLeft ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                  <div className="flex-1 group" style={{ padding: isLeft ? "0 24px 0 0" : "0 0 0 24px" }}>
                    <div className="bg-white rounded-2xl p-6 border relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                      style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block" style={{ color: accent, background: `${accent}15` }}>Phase {p.step}</span>
                      <h3 className="font-bold text-[#0A1628] text-[16px] mb-2"><span data-cms-key={`predictive_p_${i}_title`} data-cms-label="Process Title" data-cms-attr="text">{p.title}</span></h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`predictive_p_${i}_desc`} data-cms-label="Process Desc" data-cms-attr="text">{p.desc}</span></p>
                    </div>
                  </div>
                  <div className="shrink-0 w-[56px] flex justify-center z-10">
                    <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-black text-white text-lg shadow-lg transition-all duration-300 hover:scale-125 hover:rotate-12"
                      style={{ background: `linear-gradient(135deg, ${accent}, #16a34a)` }}>
                      {p.step}
                    </div>
                  </div>
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    {/* USE CASES + TECH */}
    <section id="use cases" className="py-20 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="predictive_h2lbl_22" data-cms-label="Section Label" data-cms-attr="text">Industries & Use Cases</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {useCases.map((u, i) => (
              <motion.div key={u.label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAFF] border" style={{ borderColor: "#E5E7EB" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: accentLight }}>
                  <u.Icon size={15} style={{ color: accent }} />
                </div>
                <span className="text-[14.5px] text-[#374151]">{u.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="predictive_h2lbl_23" data-cms-label="Section Label" data-cms-attr="text">Tech Stack</span>
          </h2>
          <div className="space-y-4">
            {tech.map((t, i) => (
              <motion.div key={t.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="rounded-xl p-4 bg-[#F8FAFF] border" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: t.color }}><span data-cms-key={`predictive_t_${i}_label`} data-cms-label="Tech Label" data-cms-attr="text">{t.label}</span></p>
                <div className="flex flex-wrap gap-2">
                  {t.pills.map(p => (
                    <span key={p} className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: t.bg, color: t.color }}>{p}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* WHY US + RESULTS */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="predictive_h2lbl_24" data-cms-label="Section Label" data-cms-attr="text">Why Choose Digital Aura</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border" style={{ borderColor: "#E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`predictive_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="predictive_h2lbl_25" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {results.map((r, i) => (
              <motion.div key={r.text} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border"
                style={{ background: "#fff", borderColor: `${accent}20`, boxShadow: `0 4px 20px rgba(34,197,94,0.06)` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: accentLight }}>
                  <r.Icon size={20} style={{ color: accent }} />
                </div>
                <span className="text-[13px] font-medium text-[#374151] leading-snug">{r.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <div style={{ marginBottom: "-60px" }}><CaseStudies /></div>
    <Testimonials />

    {/* FAQ */}
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="predictive_h2lbl_27" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} />
          </h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div key={faq.q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}>
              <FAQItem q={faq.q} a={faq.a} idx={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 px-4 md:px-8" style={{ background: gradient }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4"><span data-cms-key="predictive_s11_h2" data-cms-label="Section Heading" data-cms-attr="text">Ready to Turn Your Data Into Decisions?</span></h2>
          <p className="text-white/80 mb-8 text-lg"><span data-cms-key="predictive_x14" data-cms-label="Body Text" data-cms-attr="text">Book a free data audit. We'll assess your data readiness and identify which predictive models would have the highest impact on your business today.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-white transition-all hover:gap-3 hover:shadow-xl"
            style={{ color: accent }}>
            Get My Data Audit <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
    {/* Final CTA */}
    <section className="py-16 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,107,43,0.08) 40%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />
      <div className="absolute top-8 left-8 w-48 h-48 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #FF6B2B, transparent)" }} />
      <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-[#FF6B2B]"
            style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)" }}>
            Let's Build Together
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="predictive_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to Make <span data-cms-key="predictive_hl_127" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Decisions</span> With <span data-cms-key="predictive_hl_128" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Predictive Intelligence</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="predictive_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free Analytics Discovery Call. We'll map your data sources, identify the highest value prediction opportunities, and show you what's buildable with your existing data.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My Analytics Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="predictive_x13" data-cms-label="Fine Print" data-cms-attr="text">No black box models — Full transparency on how every prediction is made.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default PredictiveAnalyticsPage;




