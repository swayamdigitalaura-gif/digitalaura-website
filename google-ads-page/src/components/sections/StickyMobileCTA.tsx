import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`fixed inset-x-0 bottom-4 z-40 px-4 transition-all duration-300 md:hidden ${show ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}>
      <a href="#audit" className="flex items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-md hover-btn-glow">
        Claim My Free Revenue Audit <ArrowRight className="size-4" />
      </a>
    </div>
  );
}
