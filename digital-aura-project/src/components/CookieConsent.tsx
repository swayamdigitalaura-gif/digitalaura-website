import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Cookie, X, ShieldCheck, Settings2 } from "lucide-react";

const STORAGE_KEY = "da_cookie_consent";

type ConsentChoice = "all" | "necessary" | null;

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Small delay so the page loads first
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = (choice: ConsentChoice) => {
    localStorage.setItem(STORAGE_KEY, choice as string);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-2xl"
        >
          <div
            className="rounded-2xl p-5 shadow-2xl"
            style={{
              background: "#fff",
              border: "1px solid #E5E7EB",
              boxShadow: "0 8px 48px rgba(10,22,40,0.16)",
            }}
          >
            {/* Header row */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,107,43,0.1)", border: "1px solid rgba(255,107,43,0.2)" }}
              >
                <Cookie size={20} style={{ color: "#FF6B2B" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-[#0A1628] text-sm mb-1">We use cookies</p>
                <p className="text-[#6B7280] text-xs leading-relaxed">
                  We use cookies to enhance your browsing experience, analyse site traffic, and personalise content.
                  By clicking <strong className="text-[#0A1628]">Accept All</strong>, you consent to our use of cookies.{" "}
                  <Link to="/privacy-policy" className="underline font-semibold" style={{ color: "#FF6B2B" }}>
                    Privacy Policy
                  </Link>
                </p>
              </div>
              <button
                onClick={() => accept("necessary")}
                className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
                aria-label="Dismiss"
              >
                <X size={14} className="text-[#9CA3AF]" />
              </button>
            </div>

            {/* Cookie details toggle */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl p-4 mb-4 space-y-3" style={{ background: "#F8FAFF", border: "1px solid #E5E7EB" }}>
                    {[
                      { color: "#22C55E", label: "Necessary",    always: true,  desc: "Essential for the site to function. Cannot be disabled." },
                      { color: "#1A6FE8", label: "Analytics",    always: false, desc: "Help us understand how visitors interact with the site." },
                      { color: "#7C3AED", label: "Marketing",    always: false, desc: "Used to track visitors and show relevant ads." },
                      { color: "#F59E0B", label: "Preferences",  always: false, desc: "Remember your settings and personalise your experience." },
                    ].map(c => (
                      <div key={c.label} className="flex items-center justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: c.color }} />
                          <div>
                            <p className="text-xs font-bold text-[#0A1628]">{c.label}</p>
                            <p className="text-[11px] text-[#6B7280] leading-snug">{c.desc}</p>
                          </div>
                        </div>
                        {c.always ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.12)", color: "#22C55E" }}>
                            Always on
                          </span>
                        ) : (
                          <div
                            className="w-9 h-5 rounded-full relative cursor-pointer transition-colors"
                            style={{ background: "#E5E7EB" }}
                          >
                            <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 left-0.5 shadow-sm" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2">
              <button
                onClick={() => accept("all")}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg,#FF6B2B,#e85a1a)", boxShadow: "0 4px 16px rgba(255,107,43,0.35)" }}
              >
                <ShieldCheck size={14} />
                Accept All Cookies
              </button>
              <button
                onClick={() => accept("necessary")}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-gray-100 active:scale-[0.98]"
                style={{ border: "1px solid #E5E7EB", color: "#374151" }}
              >
                Necessary Only
              </button>
              <button
                onClick={() => setShowDetails(v => !v)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all hover:bg-gray-50 sm:ml-auto"
                style={{ color: "#9CA3AF" }}
              >
                <Settings2 size={13} />
                {showDetails ? "Hide details" : "Customise"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
