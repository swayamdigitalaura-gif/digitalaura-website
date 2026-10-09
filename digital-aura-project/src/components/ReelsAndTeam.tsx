import { useState } from "react";
import { Instagram, Linkedin } from "lucide-react";

export interface TeamMember { name: string; role: string; bio: string; photo: string; }

/**
 * Reel card: a thumbnail (public/reels/<service>-<n>.webp) that plays the video in place when clicked. The video file is
 * public/reels/<service>-<n>.mp4, hosted on this site because the Instagram account restricts embedding. If the file is
 * missing, the card offers the Instagram link instead.
 */
export const ReelCard = ({ id, label, thumb, video, accent }: { id: string; label: string; thumb: string; video: string; accent: string }) => {
  const [mode, setMode] = useState<"idle" | "playing" | "error">("idle");
  const url = `https://www.instagram.com/reel/${id}/`;
  return (
    <div className="rounded-2xl overflow-hidden border bg-white" style={{ borderColor: "#E5E7EB" }}>
      <div className="relative w-full overflow-hidden bg-[#0A1628]" style={{ aspectRatio: "333 / 540" }}>
        {mode === "playing" ? (
          <video src={video} poster={thumb} controls autoPlay playsInline preload="auto" className="absolute inset-0 h-full w-full bg-black object-contain" onError={() => setMode("error")} />
        ) : mode === "error" ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 text-center text-white" style={{ background: "linear-gradient(160deg, #0A1628, #FF6B2B)" }}>
            <span className="font-bold">This video could not be loaded here</span>
            <span className="text-sm underline">Watch it on Instagram</span>
          </a>
        ) : (
          <button type="button" onClick={() => setMode("playing")} aria-label={`Play video: ${label}`} className="group absolute inset-0 block h-full w-full text-white" style={{ background: "linear-gradient(160deg, #0A1628, #FF6B2B)" }}>
            <img src={thumb} alt={`${label} thumbnail`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            <span className="absolute inset-0 bg-black/20 transition-all group-hover:bg-black/30" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-transform group-hover:scale-110" style={{ color: "#FF6B2B" }}>&#9654;</span>
            </span>
          </button>
        )}
      </div>
      <div className="px-4 py-3 text-sm border-t text-[#4B5563]" style={{ borderColor: "#E5E7EB" }}>Reel by Sambhav Shah</div>
    </div>
  );
};

export const ReelGrid = ({ ids, accent, topic, slug }: { ids: string[]; accent: string; topic: string; slug: string }) => (
  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
    {ids.map((id, i) => <ReelCard key={id} id={id} label={`${topic} reel ${i + 1}`} thumb={`/reels/${slug}-${i + 1}.webp`} video={`/reels/${slug}-${i + 1}.mp4`} accent={accent} />)}
  </div>
);

export const TeamGrid = ({ members, accent }: { members: TeamMember[]; accent: string }) => (
  <div className="grid gap-5 md:grid-cols-3">
    {members.map((m) => (
      <div key={m.name} className="p-5 rounded-2xl bg-white border" style={{ borderColor: "#E5E7EB" }}>
        <div className="flex items-center gap-3">
          <img src={m.photo} alt={`${m.name}, ${m.role} at Digital Aura`} width={56} height={56} loading="lazy" className="w-14 h-14 shrink-0 rounded-full object-cover bg-[#F3F4F6]" />
          <div>
            <h3 className="font-bold text-[#0A1628] leading-tight">{m.name}</h3>
            <p className="text-sm font-semibold" style={{ color: accent }}>{m.role}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-[#4B5563] leading-relaxed">{m.bio}</p>
      </div>
    ))}
  </div>
);

export const FounderLinks = ({ accent }: { accent: string }) => (
  <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#4B5563]">
    <span>Founder Sambhav Shah:</span>
    <a href="https://www.linkedin.com/in/sambhav-shah/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold underline" style={{ color: accent }}><Linkedin className="w-4 h-4" /> LinkedIn</a>
    <a href="https://www.instagram.com/sambhavshah2/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold underline" style={{ color: accent }}><Instagram className="w-4 h-4" /> Instagram</a>
  </p>
);
