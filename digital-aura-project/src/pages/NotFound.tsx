import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowRight, Search, Zap, Globe, MessageSquare } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  const quickLinks = [
    { icon: Home,         label: "Home",         to: "/",           color: "#FF6B2B" },
    { icon: Globe,        label: "Services",      to: "/services",   color: "#7C3AED" },
    { icon: Zap,          label: "Case Studies",  to: "/case-studies", color: "#1A6FE8" },
    { icon: MessageSquare,label: "Contact Us",    to: "/contact",    color: "#22C55E" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      style={{ background: "#F8FAFF" }}>

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, rgba(255,107,43,0.04) 50%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute rounded-full animate-drift" style={{ width: 300, height: 300, top: "10%", right: "5%", background: "radial-gradient(circle, rgba(255,107,43,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute rounded-full animate-drift-2" style={{ width: 250, height: 250, bottom: "10%", left: "5%", background: "radial-gradient(circle, rgba(26,111,232,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />

      <div className="relative z-10 text-center max-w-2xl mx-auto">

        {/* 404 big number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}>
          <div className="relative inline-block mb-6">
            <span className="text-[140px] md:text-[180px] font-black leading-none select-none"
              style={{
                background: "linear-gradient(135deg, #FF6B2B 0%, #7C3AED 50%, #1A6FE8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 40px rgba(255,107,43,0.2))",
              }}>
              404
            </span>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -right-6 px-3 py-1 rounded-full text-xs font-black"
              style={{ background: "rgba(255,107,43,0.12)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.25)" }}>
              Oops!
            </motion.div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}>
          <h1 className="text-2xl md:text-4xl font-black mb-4 tracking-tight" style={{ color: "#0A1628" }}>
            This Page Took a Wrong Turn
          </h1>
          <p className="text-base md:text-lg leading-relaxed mb-3 max-w-lg mx-auto" style={{ color: "#4B5563" }}>
            The page <code className="font-mono text-sm px-2 py-0.5 rounded" style={{ color: "#FF6B2B", background: "rgba(255,107,43,0.08)" }}>{location.pathname}</code> doesn't exist — but everything else at Digital Aura does.
          </p>
          <p className="text-sm mb-10" style={{ color: "#6B7280" }}>Try one of the links below or head back home.</p>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {quickLinks.map(({ icon: Icon, label, to, color }, i) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.07 }}>
              <Link to={to}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-md group"
                style={{ background: "#ffffff", borderColor: "#E5E7EB" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: `${color}14` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <span className="text-xs font-semibold transition-colors" style={{ color: "#374151" }}>{label}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}>
          <Link to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all hover:gap-3 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #FF6B2B, #e85a1a)", boxShadow: "0 4px 24px rgba(255,107,43,0.3)" }}>
            <Home size={16} /> Back to Home <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-12 pt-8 border-t" style={{ borderColor: "#E5E7EB" }}>
          <p className="text-xs mb-3" style={{ color: "#9CA3AF" }}>Looking for something specific?</p>
          <Link to="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
            style={{ color: "#7C3AED" }}>
            <Search size={13} /> Contact our team — we'll help you find it <ArrowRight size={13} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default NotFound;
