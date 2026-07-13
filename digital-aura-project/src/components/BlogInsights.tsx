import { motion } from "framer-motion";
import { ArrowRight, Calendar, TrendingUp, Target, DollarSign, Globe, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface Post {
  category: string;
  catColor: string;
  catBg: string;
  Icon: LucideIcon;
  iconColor: string;
  thumbBg: string;
  title: string;
  date: string;
}

const posts: Post[] = [
  {
    category: "Web Development",
    catColor: "#7C3AED",
    catBg: "rgba(124,58,237,0.1)",
    Icon: Globe,
    iconColor: "#7C3AED",
    thumbBg: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.02) 100%)",
    title: "Why Your Business Needs a High Performance Website in 2025",
    date: "Apr 5, 2025",
  },
  {
    category: "AI Solutions",
    catColor: "#1A6FE8",
    catBg: "rgba(26,111,232,0.1)",
    Icon: Bot,
    iconColor: "#1A6FE8",
    thumbBg: "linear-gradient(135deg, rgba(26,111,232,0.08) 0%, rgba(26,111,232,0.02) 100%)",
    title: "How AI Automation Can Save Your Business 20+ Hours a Week",
    date: "Mar 28, 2025",
  },
  {
    category: "Meta Ads",
    catColor: "#FF6B2B",
    catBg: "rgba(255,107,43,0.1)",
    Icon: Target,
    iconColor: "#FF6B2B",
    thumbBg: "linear-gradient(135deg, rgba(255,107,43,0.08) 0%, rgba(255,107,43,0.02) 100%)",
    title: "How Meta Ads Can Triple Your Leads in 30 Days",
    date: "Mar 15, 2025",
  },
  {
    category: "SEO",
    catColor: "#22C55E",
    catBg: "rgba(34,197,94,0.1)",
    Icon: TrendingUp,
    iconColor: "#22C55E",
    thumbBg: "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.02) 100%)",
    title: "10 SEO Strategies That Will Dominate Google in 2025",
    date: "Feb 20, 2025",
  },
];

const BlogInsights = () => (
  <section id="blog" className="pt-20 pb-4 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="section-badge" data-cms-key="blog_ins_badge_5" data-cms-label="Section Badge" data-cms-attr="text">Blog</span>
        <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight">
          <span data-cms-key="blog_sec_1" data-cms-label="Blog Section Heading" data-cms-attr="text">
            Digital Intelligence &amp; <span data-cms-key="blog_ins_hl_105" data-cms-label="Heading Highlight" data-cms-attr="text" className="text-orange-gradient">AI Insights</span>
          </span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((p, i) => (
          <motion.a
            key={p.title}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-hover group rounded-2xl overflow-hidden border bg-white block"
            style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            {/* Thumbnail, icon centered, no emoji */}
            <div
              className="h-44 flex items-center justify-center relative overflow-hidden"
              style={{ background: p.thumbBg }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                style={{ background: `${p.iconColor}15`, border: `1.5px solid ${p.iconColor}25` }}
              >
                <p.Icon size={32} style={{ color: p.iconColor }} strokeWidth={1.5} />
              </div>
              {/* Category tag */}
              <span
                className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ color: p.catColor, background: p.catBg }}
              >
                <span data-cms-key={`blog_sec_post_${i}_category`} data-cms-label="Blog Post Category" data-cms-attr="text">{p.category}</span>
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-base font-bold text-[#0A1628] mb-3 leading-snug group-hover:text-[#FF6B2B] transition-colors">
                <span data-cms-key={`blog_sec_post_${i}_title`} data-cms-label="Blog Post Title" data-cms-attr="text">{p.title}</span>
              </h3>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <Calendar size={12} /> <span data-cms-key={`blog_sec_post_${i}_date`} data-cms-label="Blog Post Date" data-cms-attr="text">{p.date}</span>
                </span>
                <span
                  className="text-xs font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  style={{ color: "#FF6B2B" }}
                >
                  Read More <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/blog" className="btn-outline-orange px-8 py-3.5 text-sm gap-2 inline-flex">
          View All Insights <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

export default BlogInsights;
