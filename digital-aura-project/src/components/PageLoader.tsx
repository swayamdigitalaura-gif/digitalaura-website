import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const PageLoader = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const steps = 80;
    const interval = 1600 / steps;

    const timer = setInterval(() => {
      current += 100 / steps;
      const eased = Math.min(100, current);
      setProgress(eased);

      if (eased >= 100) {
        clearInterval(timer);
        setTimeout(onDone, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#FFFFFF" }}
    >
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,107,43,0.07) 0%, transparent 70%)", filter: "blur(60px)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,111,232,0.06) 0%, transparent 70%)", filter: "blur(60px)", transform: "translate(-30%, 30%)" }} />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6"
      >
        <img src={logo} alt="Digital Aura" className="h-24 w-auto object-contain" style={{ mixBlendMode: "multiply" }} />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45 }}
        className="text-sm font-medium tracking-widest uppercase mb-10"
        style={{ color: "#94A3B8", letterSpacing: "0.2em" }}
      >
        Data Driven Digital Marketing
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="w-56 h-1 rounded-full overflow-hidden"
        style={{ background: "#F1F5F9" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #FF6B2B, #1A6FE8)",
            transition: "width 0.08s linear",
          }}
        />
      </motion.div>

      {/* Percentage */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-3 text-xs font-semibold tabular-nums"
        style={{ color: "#FF6B2B" }}
      >
        {Math.floor(progress)}%
      </motion.span>

      {/* Dots */}
      <div className="flex gap-1.5 mt-8">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: i === 0 ? "#FF6B2B" : i === 1 ? "#1A6FE8" : "#E5E7EB" }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PageLoader;
