import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const COLORS = ["#FF6B2B", "#7C3AED", "#1A6FE8", "#22C55E", "#F59E0B", "#EC4899", "#0EA5E9", "#14B8A6"];

const FALLBACK = [
  { quote: "Digital Aura's team designed a professional website and executed a highly effective Meta Ads campaign that brought us real, measurable results.", name: "Sahebrav Patil", role: "Business Owner", company: "Pest Control Business", platform: "Google" },
  { quote: "We partnered with them for website development and lead generation campaigns, and the results were beyond our expectations.", name: "Chintan Joshi", role: "Local Guide", company: "141 Reviews", platform: "Google" },
  { quote: "Digital Aura helped us take our brand online and generate quality leads for our event solutions business.", name: "Darshil Shah", role: "Owner", company: "Elegant Event Solutions", platform: "Google" },
  { quote: "Their lead generation strategies through Meta Ads were impeccable, delivering high quality leads that swiftly converted into sales.", name: "Tapan Joshi", role: "Business Owner", company: "Invisible Grills Business", platform: "Google" },
  { quote: "Excellent results and professional service! Our online presence has been outstanding since working with Digital Aura.", name: "Ketan Patel", role: "Business Owner", company: "", platform: "Google" },
  { quote: "Digital Aura improved our website user experience and boosted brand visibility, crucial for attracting more customers.", name: "Tirth Patel", role: "Local Guide", company: "18 Reviews", platform: "Google" },
  { quote: "Digital Aura transformed my online presence as an insurance consultant, helping me reach the right audience effectively.", name: "Vrukshal Shah", role: "Insurance Consultant", company: "", platform: "Google" },
  { quote: "Sambhav helped me start my business online in New Zealand and did a fantastic job. I strongly recommend them.", name: "Samkit Talajia", role: "Business Owner", company: "New Zealand", platform: "Google" },
  { quote: "The SEO work they did for our website dramatically increased our organic traffic within just 3 months. Highly professional team.", name: "Priya Mehta", role: "Founder", company: "Ayurveda Wellness", platform: "Clutch" },
  { quote: "Outstanding digital marketing services. They understood our niche perfectly and delivered campaigns that actually convert.", name: "Rajesh Kumar", role: "Director", company: "K&R Manufacturing", platform: "Clutch" },
  { quote: "Working with Digital Aura for Google Ads was a game-changer for our e-commerce store. ROAS improved by 4x in 60 days.", name: "Ananya Shah", role: "Co-Founder", company: "StyleHouse", platform: "GoodFirms" },
  { quote: "Their web development team built exactly what we envisioned — fast, beautiful, and conversion-optimized.", name: "Mohammed Al-Rashid", role: "CEO", company: "Gulf Trade Hub", platform: "GoodFirms" },
];

const VIDEO_TESTIMONIALS = [
  { id: "WsOGGFQgXnI", name: "Dr. Karan Maheshwari", role: "Hand Surgeon · Krisha Hospital", quote: "Patient inquiries tripled in 90 days. Doctors who never referred to us before now send us cases every week." },
  { id: "LVKs_qFTVAk", name: "Sachin Salunkhe", role: "Co-Founder · IntegsCloud Technologies", quote: "3 agencies failed to deliver this. Digital Aura completed the Shopify Plus + NetSuite integration in just 6 weeks — seamlessly." },
  { id: "oniJ5OOaXHY", name: "Nikhil Parasher", role: "Founder · Parasher Academy", quote: "Every agency gave me a standard pitch. Only Digital Aura listened. 6 months later — 200+ leads and I cannot keep up." },
  { id: "3ZXgamYo_Us", name: "Maya Pillai", role: "Local Business Owner", quote: "The results were beyond our expectations — highly professional team." },
];

const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const PlatformBadge = ({ platform }: { platform: string }) => {
  if (platform === "Google") return (
    <div className="flex items-center gap-1">
      <GoogleIcon />
      <span className="text-[10px] text-[#6B7280] font-medium">Google</span>
    </div>
  );
  const colors: Record<string, string> = { Clutch: "#EF4444", GoodFirms: "#22C55E", DesignRush: "#7C3AED" };
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{ background: `${colors[platform] || "#6B7280"}15`, color: colors[platform] || "#6B7280" }}>
      {platform}
    </span>
  );
};

const TestimonialCard = ({ t, color, index }: { t: Record<string, string>; color: string; index: number }) => {
  const initials = t.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.4 }}
      className="rounded-2xl p-7 border bg-white relative overflow-hidden flex flex-col"
      style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: color }} />
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}15` }}>
        <Quote size={18} style={{ color }} />
      </div>
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} size={13} fill="#FF6B2B" color="#FF6B2B" />
        ))}
      </div>
      <p className="text-[#374151] leading-relaxed text-[15px] flex-1 mb-6 italic">"{t.quote}"</p>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {t.photo ? (
            <img src={t.photo} alt={t.name}
              className="w-10 h-10 rounded-full object-cover shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: color }}>
              {initials}
            </div>
          )}
          <div>
            <p className="font-bold text-[#0A1628] text-[15px]">{t.name}</p>
            <p className="text-xs text-[#6B7280]">{t.role}{t.company ? ` · ${t.company}` : ""}</p>
          </div>
        </div>
        <PlatformBadge platform={t.platform || "Google"} />
      </div>
    </motion.div>
  );
};

const VIDEO_COLORS = ["#FF6B2B", "#7C3AED", "#1A6FE8", "#22C55E"];

interface VideoItem { id: string; name: string; role: string; quote: string; }

const VideoCard = ({ video, index }: { video: VideoItem; index: number }) => {
  const [playing, setPlaying] = useState(false);
  const color = VIDEO_COLORS[index % VIDEO_COLORS.length];
  const initials = video.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl bg-white border flex flex-col overflow-hidden"
      style={{ borderColor: "#E5E7EB", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
      {/* top color bar */}
      <div className="h-1 w-full" style={{ background: color }} />
      {/* video */}
      <div className="relative w-full aspect-video cursor-pointer group" onClick={() => !playing && setPlaying(true)}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-all" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: "#fff", boxShadow: "0 6px 24px rgba(0,0,0,0.25)" }}>
                <Play size={20} fill={color} color={color} className="ml-1" />
              </div>
            </div>
          </>
        )}
      </div>
      {/* quote section */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} size={13} fill="#FF6B2B" color="#FF6B2B" />
          ))}
        </div>
        <p className="text-[#374151] text-[13px] leading-relaxed italic flex-1">"{video.quote}"</p>
        <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: color }}>
            {initials}
          </div>
          <div>
            <p className="font-bold text-[#0A1628] text-[13px]">{video.name}</p>
            <p className="text-[11px] text-[#6B7280]">{video.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState(
    FALLBACK.map((t, i) => ({ ...t, color: COLORS[i % COLORS.length] }))
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/testimonials`)
      .then(r => r.json())
      .then(d => {
        if (d.data?.length) {
          setTestimonials(
            d.data
              .filter((t: Record<string, string>) => t.is_visible !== false)
              .map((t: Record<string, string>, i: number) => ({
                quote: t.quote,
                name: t.name,
                role: t.role || "",
                company: t.company || "",
                photo: t.photo || "",
                platform: t.platform || "Google",
                color: COLORS[i % COLORS.length],
              }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const stats = [
    { label: "Happy Clients", value: "750+", color: "#FF6B2B" },
    { label: "5-Star Reviews", value: "200+", color: "#22C55E" },
    { label: "Average Rating", value: "4.9", color: "#7C3AED" },
    { label: "Years Trusted", value: "10+", color: "#1A6FE8" },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-[72px] overflow-hidden" style={{ background: "#F8FAFF" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-15%", right: "-5%", background: "radial-gradient(circle, rgba(255,107,43,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
          <div className="absolute inset-0 dot-pattern opacity-20" />
        </div>
        <div className="max-w-5xl mx-auto px-4 md:px-8 pt-20 pb-20 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase"
              style={{ background: "rgba(255,107,43,0.1)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.25)" }}>
              <Star size={12} fill="#FF6B2B" /> Client Testimonials
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[58px] font-black leading-[1.08] text-[#0A1628] mb-5 tracking-tight">
              What Our Clients <span className="text-orange-gradient">Say About Us</span>
            </h1>
            <p className="text-[#4B5563] text-lg max-w-2xl mx-auto leading-relaxed">
              Real results, real people. Hear from 750+ clients across industries who chose Digital Aura to grow their business online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 md:px-8" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6 text-center border bg-white"
                style={{ borderColor: `${s.color}20`, boxShadow: `0 4px 20px ${s.color}08` }}>
                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-[#6B7280] font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 px-4 md:px-8 relative overflow-hidden" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-widest uppercase"
              style={{ background: "rgba(124,58,237,0.08)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)" }}>
              <Play size={11} fill="#7C3AED" /> Video Testimonials
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628]">Hear It Directly From Our Clients</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VIDEO_TESTIMONIALS.map((v, i) => (
              <VideoCard key={v.id} video={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Written Reviews */}
      <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-widest uppercase"
              style={{ background: "rgba(255,107,43,0.08)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.2)" }}>
              <Star size={11} fill="#FF6B2B" /> Written Reviews
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A1628]">What Our Clients Are Saying</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={`${t.name}-${i}`} t={t} color={t.color} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 relative overflow-hidden text-center" style={{ background: "#0A1628" }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 700, height: 700, background: "radial-gradient(circle, rgba(255,107,43,0.1) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-[#FF6B2B]"
              style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)" }}>
              Join 750+ Happy Clients
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Ready to Be Our Next <span className="text-orange-gradient">Success Story?</span>
            </h2>
            <p className="text-[#94a3b8] mb-8 text-sm leading-relaxed max-w-lg mx-auto">
              Partner with Digital Aura and experience the growth that 750+ businesses already trust us for.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:gap-3"
                style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 20px rgba(255,107,43,0.4)" }}>
                Get a Free Consultation <ArrowRight size={15} />
              </Link>
              <Link to="/case-studies"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border transition-all"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)" }}>
                View Case Studies <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TestimonialsPage;
