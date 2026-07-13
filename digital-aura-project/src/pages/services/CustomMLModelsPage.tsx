import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cpu, ArrowRight, ChevronDown, Check,
  TrendingUp, Shield, Database, Layers, Globe2,
  FileText, BarChart3, Settings, Zap, Target,
  CheckCircle2, Brain,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import CMSIcon from "@/components/CMSIcon";
import { useSettings } from "@/hooks/useSettings";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";

const accent = "#1A6FE8";
const accentLight = "rgba(26,111,232,0.1)";
const accentBorder = "rgba(26,111,232,0.25)";
const gradient = "linear-gradient(135deg,#1A6FE8,#1558c0)";

const features = [
  {
    Icon: Target, title: "Recommendation Engines",
    desc: "Custom collaborative and content-based recommendation models that surface the right products, content, or actions to each user trained on your actual behaviour data.",
    tags: ["Collaborative filtering", "Content-based", "Real time recommendations"],
  },
  {
    Icon: Shield, title: "Fraud & Risk Detection",
    desc: "Domain specific fraud models trained on your transaction patterns far more accurate than generic solutions because they understand your specific customer behaviour and fraud signatures.",
    tags: ["Transaction fraud", "Account takeover", "Risk scoring"],
  },
  {
    Icon: FileText, title: "Document Classification & NLP",
    desc: "Models that classify, route, and extract information from your documents support tickets, legal contracts, emails, medical records with accuracy tailored to your specific vocabulary.",
    tags: ["Text classification", "Named entity recognition", "Information extraction"],
  },
  {
    Icon: Brain, title: "Fine Tuned Language Models",
    desc: "LLMs fine tuned on your proprietary data so they write in your brand voice, understand your domain terminology, and generate outputs that match your specific quality standards.",
    tags: ["Domain fine tuning", "Brand voice training", "Instruction tuning"],
  },
  {
    Icon: BarChart3, title: "Time-Series & Forecasting Models",
    desc: "Custom forecasting models built for your specific signal patterns energy consumption, financial markets, web traffic, or operational metrics outperforming generic libraries on your data.",
    tags: ["Custom forecasting", "Anomaly detection", "Seasonal modelling"],
  },
  {
    Icon: Globe2, title: "Computer Vision Models",
    desc: "Purpose-built vision models for quality inspection, object counting, damage assessment, or medical imaging trained on your specific images rather than generic pretrained weights.",
    tags: ["Quality inspection", "Object detection", "Image segmentation"],
  },
];

const process = [
  { step: "01", title: "Problem Framing", desc: "We define the exact ML problem: what you're predicting, what success looks like, and what data signals are available before a single model is trained." },
  { step: "02", title: "Data Audit & Engineering", desc: "We assess your data quality, volume, and labelling requirements then build the data pipelines and feature engineering needed to give the model the strongest possible signal." },
  { step: "03", title: "Baseline & Experimentation", desc: "We establish a performance baseline with simpler models, then systematically experiment with more complex architectures choosing the best performing approach for your data and requirements." },
  { step: "04", title: "Training & Evaluation", desc: "Models are trained with proper train / validation / test splits, cross validation, and rigorous evaluation against business relevant metrics not just standard ML benchmarks." },
  { step: "05", title: "Deployment as API or Service", desc: "The final model is deployed as a fast, reliable API endpoint or embedded directly into your product with proper versioning, monitoring, and rollback capability." },
  { step: "06", title: "Monitoring & Retraining Pipeline", desc: "We set up automated monitoring for model drift, accuracy degradation, and data quality issues plus a retraining pipeline to keep the model fresh as your business and data evolve." },
];

const industries = [
  { Icon: Shield, label: "Fintech: fraud & credit risk scoring" },
  { Icon: Globe2, label: "eCommerce: personalised recommendations" },
  { Icon: FileText, label: "Legal & compliance: contract analysis" },
  { Icon: Settings, label: "Manufacturing: defect detection (vision)" },
  { Icon: Brain, label: "Healthcare: clinical NLP & coding" },
  { Icon: TrendingUp, label: "Media: content recommendation & moderation" },
  { Icon: Database, label: "SaaS: churn & expansion signal models" },
  { Icon: BarChart3, label: "Retail: demand & pricing optimisation" },
];

const tech = [
  { label: "ML Frameworks", color: accent, bg: accentLight, pills: ["PyTorch", "TensorFlow", "Keras", "JAX", "scikit-learn"] },
  { label: "NLP & LLMs", color: "#7C3AED", bg: "rgba(124,58,237,0.1)", pills: ["Hugging Face", "PEFT / LoRA", "Transformers", "spaCy"] },
  { label: "Computer Vision", color: "#FF6B2B", bg: "rgba(255,107,43,0.1)", pills: ["YOLOv8", "OpenCV", "torchvision", "Detectron2"] },
  { label: "MLOps & Serving", color: "#22C55E", bg: "rgba(34,197,94,0.1)", pills: ["MLflow", "Ray Serve", "TorchServe", "BentoML"] },
  { label: "Infrastructure", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", pills: ["AWS SageMaker", "GCP Vertex AI", "Azure ML", "Kubernetes"] },
];

const stats = [
  { value: "Domain", label: "Specific models trained on your data" },
  { value: "10-40%", label: "Typical accuracy improvement over generic" },
  { value: "Full", label: "Ownership of model weights & IP" },
  { value: "API ready", label: "Deployed as production services" },
];

const whyUs = [
  "We train on your data not generic pretrained weights alone",
  "You own the model: weights, training code, and data pipelines",
  "MLOps from day one: versioning, monitoring, retraining pipelines",
  "Interpretable models where regulation or trust requires explainability",
  "Domain expertise across fintech, eCommerce, legal, healthcare, and SaaS",
  "Honest about what's achievable we won't oversell ML on thin data",
];

const results = [
  { Icon: TrendingUp, text: "Higher accuracy than off-the-shelf solutions" },
  { Icon: Shield, text: "Private models that never share your data" },
  { Icon: CheckCircle2, text: "Full IP ownership: you keep the model" },
  { Icon: Zap, text: "Production-deployed and monitored from launch" },
];

const faqs = [
  { q: "Why build a custom ML model instead of using an existing AI API?", a: "Generic AI APIs are trained on broad, public data and perform well for general tasks. But for domain-specific problems detecting your specific fraud patterns, recommending your specific product catalogue, classifying your specific support tickets a model trained on your data will significantly outperform any generic solution. The accuracy gap is typically 10-40% in our experience, and that gap directly translates to business impact." },
  { q: "How much data do I need to train a custom model?", a: "It depends entirely on the problem. Image classification models can work with a few thousand labelled examples. Text classification can work with as few as 500-1000 examples with modern techniques like few shot learning and transfer learning. Fraud detection typically needs millions of transactions with labelled fraud cases. We always audit your data first and tell you honestly whether custom training is viable and what would improve it if not." },
  { q: "Who owns the trained model?", a: "You own everything: the model weights, the training code, the data pipelines, and all associated IP. We hand over full ownership at project completion and document everything so your team can maintain, retrain, and extend the model independently." },
  { q: "How is a fine tuned LLM different from just prompting GPT-4?", a: "Fine tuning adapts a model's weights to your specific data, vocabulary, writing style, and task so it becomes genuinely specialised for your domain rather than a general model with a long prompt. Fine tuned models are typically faster, cheaper per inference, more consistent in format, and significantly more accurate on domain-specific tasks than their prompted equivalents. They also run independently not dependent on a third party API." },
  { q: "Can you deploy the model inside our own infrastructure?", a: "Yes. We deploy models as containerised API services that can run on your AWS, GCP, or Azure environment or on-premise if required. For regulated industries, fully private deployment is often mandatory and we design for this from the start." },
  { q: "How do you prevent model bias and ensure fairness?", a: "We implement bias evaluation as part of the standard model development process testing performance across demographic segments, protected attributes, and edge cases before deployment. Where fairness is a regulatory requirement (e.g., credit scoring, hiring), we apply fairness aware training and provide documentation for compliance review." },
];

const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: open ? `${accent}40` : "#E5E7EB", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-[15px] font-semibold text-[#0A1628] pr-4"><span data-cms-key={`mlmodels_faq_${idx}_q`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <CMSIcon cmsKey="mlmodels_icon_1" cmsLabel="ChevronDown Icon" name="ChevronDown" size={18} color={accent} />
        </motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p className="px-6 pb-5 text-[14.5px] text-[#6B7280] leading-relaxed"><span data-cms-key={`mlmodels_faq_${idx}_a`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span></p>
      </motion.div>
    </div>
  );
};

const CustomMLModelsPage = () => {
  const _sp = useSettings(['mlmodels_hero_h1','mlmodels_hero_sub','mlmodels_cta_btn']);
  return (
  <PageLayout>
    {/* HERO */}
    <section className="relative pt-[72px] overflow-hidden" style={{ background: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 640, height: 640, top: "-20%", right: "-10%", background: `radial-gradient(circle, ${accentLight} 0%, transparent 70%)`, filter: "blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0", left: "-8%", background: "radial-gradient(circle, rgba(26,111,232,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
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
              <Cpu size={12} /> Custom ML Models
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.1] text-[#0A1628] mb-5 tracking-tight">
            <span data-cms-key="mlmodels_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">ML Models Built for<br />
            <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Your Data. Your Domain.
            </span>
          </span></h1>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto mb-5 leading-relaxed">
            <span data-cms-key="mlmodels_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">Domain specific machine learning models trained on your proprietary data for recommendation engines, fraud detection, document classification, computer vision, and more.</span>
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["Recommendation", "Fraud Detection", "NLP & Classification", "Fine tuned LLMs", "Computer Vision", "You Own the IP"].map(tag => (
              <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: accentLight, color: accent, border: `1px solid ${accentBorder}` }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:gap-3"
              style={{ background: gradient, boxShadow: "0 8px 24px rgba(26,111,232,0.4)" }}>
              <span data-cms-key="mlmodels_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Discuss My ML Project</span> <ArrowRight size={16} />
            </Link>
            <a href="#industries" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold border-2 text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all"
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
            <div className="text-2xl md:text-3xl font-black mb-1" style={{ color: accent }}>{s.value}</div>
            <div className="text-[13px] text-[#6B7280] font-medium">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* FEATURES */}
    <section className="py-20 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl md:text-[42px] font-black text-[#0A1628] mb-4 tracking-tight"><span data-cms-key="mlmodels_h2_26" data-cms-label="Section Heading" data-cms-attr="text">Models We</span> <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Build</span>
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-lg"><span data-cms-key="mlmodels_x11" data-cms-label="Body Text" data-cms-attr="text">Every model is trained on your data for your specific domain not generic weights applied to your problem.</span></p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
              className="group rounded-2xl p-6 bg-[#F8FAFF] border relative overflow-hidden transition-all duration-200 hover:-translate-y-1"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 28px rgba(26,111,232,0.12)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: gradient }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: accentLight }}>
                <f.Icon size={20} style={{ color: accent }} />
              </div>
              <h3 className="text-[16px] font-bold text-[#0A1628] mb-2"><span data-cms-key={`mlmodels_f_${i}_title`} data-cms-label="Feature Title" data-cms-attr="text">{f.title}</span></h3>
              <p className="text-[13.5px] text-[#6B7280] leading-relaxed mb-4"><span data-cms-key={`mlmodels_f_${i}_desc`} data-cms-label="Feature Desc" data-cms-attr="text">{f.desc}</span></p>
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
          <h2 className="text-3xl md:text-[38px] font-black text-[#0A1628] mb-4 tracking-tight"><span data-cms-key="mlmodels_s10_h2" data-cms-label="Section Heading" data-cms-attr="text">Our ML Development Process</span></h2>
          <p className="text-[#4B5563] max-w-lg mx-auto"><span data-cms-key="mlmodels_x12" data-cms-label="Body Text" data-cms-attr="text">Rigorous data science methodology we establish baselines, experiment systematically, and only deploy models that demonstrably outperform alternatives.</span></p>
        </motion.div>
        {/* Mobile: stacked */}
        <div className="md:hidden space-y-4">
          {process.map((p, i) => (
            <motion.div key={p.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 border bg-white relative overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${accent}, #1558c0)` }}>{p.step}</div>
                <h3 className="font-bold text-[#0A1628] text-[15px]"><span data-cms-key={`mlmodels_p_${i}_title`} data-cms-label="Process Title" data-cms-attr="text">{p.title}</span></h3>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`mlmodels_p_${i}_desc`} data-cms-label="Process Desc" data-cms-attr="text">{p.desc}</span></p>
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
                      <h3 className="font-bold text-[#0A1628] text-[16px] mb-2"><span data-cms-key={`mlmodels_p_${i}_title`} data-cms-label="Process Title" data-cms-attr="text">{p.title}</span></h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed"><span data-cms-key={`mlmodels_p_${i}_desc`} data-cms-label="Process Desc" data-cms-attr="text">{p.desc}</span></p>
                    </div>
                  </div>
                  <div className="shrink-0 w-[56px] flex justify-center z-10">
                    <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-black text-white text-lg shadow-lg transition-all duration-300 hover:scale-125 hover:rotate-12"
                      style={{ background: `linear-gradient(135deg, ${accent}, #1558c0)` }}>
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

    {/* INDUSTRIES + TECH */}
    <section id="industries" className="py-20 px-4 md:px-8" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="mlmodels_h2lbl_22" data-cms-label="Section Label" data-cms-attr="text">Industries & Use Cases</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {industries.map((ind, i) => (
              <motion.div key={ind.label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAFF] border" style={{ borderColor: "#E5E7EB" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: accentLight }}>
                  <ind.Icon size={15} style={{ color: accent }} />
                </div>
                <span className="text-[14.5px] text-[#374151]">{ind.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="mlmodels_h2lbl_23" data-cms-label="Section Label" data-cms-attr="text">Tech Stack</span>
          </h2>
          <div className="space-y-4">
            {tech.map((t, i) => (
              <motion.div key={t.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="rounded-xl p-4 bg-[#F8FAFF] border" style={{ borderColor: "#E5E7EB" }}>
                <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: t.color }}><span data-cms-key={`mlmodels_t_${i}_label`} data-cms-label="Tech Label" data-cms-attr="text">{t.label}</span></p>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="mlmodels_h2lbl_24" data-cms-label="Section Label" data-cms-attr="text">Why Choose Digital Aura</span>
          </h2>
          <ul className="space-y-3">
            {whyUs.map((w, i) => (
              <li key={w} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border" style={{ borderColor: "#E5E7EB" }}>
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                <span className="text-[14.5px] text-[#374151]"><span data-cms-key={`mlmodels_why_${i}`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span></span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-[13px] font-black uppercase tracking-[0.14em] text-[#0A1628] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="mlmodels_h2lbl_25" data-cms-label="Section Label" data-cms-attr="text">Results You Can Expect</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {results.map((r, i) => (
              <motion.div key={r.text} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border"
                style={{ background: "#fff", borderColor: `${accent}20`, boxShadow: `0 4px 20px rgba(26,111,232,0.06)` }}>
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
            <span className="w-4 h-0.5 rounded-full" style={{ background: accent }} /> <span data-cms-key="mlmodels_h2lbl_27" data-cms-label="Section Label" data-cms-attr="text">Frequently Asked Questions</span>
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
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4"><span data-cms-key="mlmodels_s11_h2" data-cms-label="Section Heading" data-cms-attr="text">Ready for a Model That's Actually Yours?</span></h2>
          <p className="text-white/80 mb-8 text-lg"><span data-cms-key="mlmodels_x14" data-cms-label="Body Text" data-cms-attr="text">Book a free ML scoping session. We'll assess your data, define the right problem framing, and give you an honest picture of what's achievable before any commitment.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-white transition-all hover:gap-3 hover:shadow-xl"
            style={{ color: accent }}>
            Start My ML Project <ArrowRight size={16} />
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
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"><span data-cms-key="mlmodels_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to Build a <span data-cms-key="mlmodels_hl_127" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">Model</span> Trained on <span data-cms-key="mlmodels_hl_128" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-purple-gradient">Your Data</span>?</span></h2>
          <p className="text-[#E2E8F0] mb-8 leading-relaxed"><span data-cms-key="mlmodels_cta_sub" data-cms-label="CTA Subtext" data-cms-attr="text">Book a free ML Discovery Call. We'll assess your data, define the right model approach, and give you a clear picture of what a custom ML build would involve.</span></p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
            Book My ML Discovery Call <ArrowRight size={16} />
          </Link>
          <p className="text-[#9CA3AF] text-xs mt-4"><span data-cms-key="mlmodels_x13" data-cms-label="Fine Print" data-cms-attr="text">No off-the-shelf models — Custom trained on your data, for your specific outcomes.</span></p>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);
};

export default CustomMLModelsPage;




