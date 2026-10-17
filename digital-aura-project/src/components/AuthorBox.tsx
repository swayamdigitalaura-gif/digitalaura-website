import { Linkedin, Instagram, ArrowRight } from "lucide-react";
import sambhavPhoto from "@/assets/sambhav.jpg";

const NAVY = "#0A1628";
const ORANGE = "#FF6B2B";
/** Darker orange for small text so it stays readable on white. */
const INK = "#C2410C";

/** Bio text is the same as the About page, so the author reads the same everywhere (E-E-A-T). */
const BIO = [
  "Sambhav didn't learn digital marketing in a classroom. Starting in 2015, he built his expertise the hard way — self-taught, hands-on, scaling teams and driving growth across industries for over a decade. He's led business development, managed client relationships across continents, built and mentored growing teams, and worn every hat a high-performance agency demands.",
  "With 10+ years of cross-functional experience in client acquisition, team leadership, and digital execution, he's personally involved in strategy — whether it's an SEO plan, a performance campaign targeting international markets, or a web platform built to convert.",
];
const TAGS = ["SEO Strategy", "Performance Marketing", "AI Solutions", "Team Leadership", "Client Success", "Business Growth"];

/**
 * "About the author" card used on every blog post and cluster page: Sambhav Shah, styled like the About page founder card
 * (photo, role, bio, skills, profile links). Server-rendered text, so it is in the raw HTML for crawlers and AI tools.
 */
export default function AuthorBox({ accent = ORANGE, className = "" }: { accent?: string; className?: string }) {
  return (
    <section aria-label="About the author" className={`mx-auto max-w-4xl px-4 md:px-8 ${className}`}>
      <div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 16px rgba(10,22,40,0.06)" }}>
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #7C3AED, #FF6B2B, #1A6FE8)" }} />
        <div className="flex flex-col gap-6 p-6 sm:flex-row md:p-8">
          <div className="flex shrink-0 items-center gap-4 sm:w-40 sm:flex-col sm:items-start sm:gap-3">
            <div className="h-24 w-24 overflow-hidden rounded-2xl sm:h-28 sm:w-28" style={{ boxShadow: "0 8px 28px rgba(124,58,237,0.28)", border: "3px solid rgba(124,58,237,0.18)" }}>
              <img src={sambhavPhoto} alt="Sambhav Shah, Founder and CEO of Digital Aura" width={112} height={112} loading="lazy" className="h-full w-full object-cover object-top" />
            </div>
            <div className="sm:hidden">
              <p className="text-lg font-black leading-tight" style={{ color: NAVY }}>Sambhav Shah</p>
              <p className="text-sm font-semibold" style={{ color: INK }}>Founder &amp; CEO, Digital Aura</p>
            </div>
          </div>
          <div className="flex-1">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: NAVY }}>
              <span className="h-0.5 w-4 rounded-full" style={{ background: accent }} /> About the author
            </p>
            <div className="mb-3 hidden sm:block">
              <p className="text-xl font-black leading-tight" style={{ color: NAVY }}>
                <a href="/about/" className="hover:underline">Sambhav Shah</a>
              </p>
              <p className="text-sm font-semibold" style={{ color: INK }}>Founder &amp; CEO, Digital Aura</p>
            </div>
            {BIO.map((p, i) => (
              <p key={i} className={`mb-3 leading-relaxed text-[#4B5563] ${i === 0 ? "text-[15px]" : "text-sm"}`}>{p}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span key={t} className="rounded-full px-3 py-1 text-[11.5px] font-semibold" style={{ background: "rgba(255,107,43,0.08)", color: ORANGE, border: "1px solid rgba(255,107,43,0.2)" }}>{t}</span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4 text-sm font-semibold" style={{ borderColor: "#E5E7EB" }}>
              <a href="https://www.linkedin.com/in/sambhav-shah/" target="_blank" rel="noopener noreferrer me" className="inline-flex items-center gap-1.5 hover:underline" style={{ color: NAVY }}>
                <Linkedin size={15} /> LinkedIn
              </a>
              <a href="https://www.instagram.com/sambhavshah2/" target="_blank" rel="noopener noreferrer me" className="inline-flex items-center gap-1.5 hover:underline" style={{ color: NAVY }}>
                <Instagram size={15} /> Instagram
              </a>
              <a href="/about/" className="inline-flex items-center gap-1.5 hover:gap-2.5 transition-all" style={{ color: INK }}>
                More about Sambhav <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
