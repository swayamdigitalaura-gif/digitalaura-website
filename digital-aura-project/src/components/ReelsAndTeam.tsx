import { useState } from "react";
import { Instagram, Linkedin } from "lucide-react";

export interface TeamMember { name: string; role: string; bio: string; photo: string; }

/**
 * Reel card styled like an Instagram post (profile header, video, "View more on Instagram"). The thumbnail is
 * public/reels/<service>-<n>.webp and the video public/reels/<service>-<n>.mp4, both hosted on this site because the Instagram
 * account restricts embedding. Clicking plays the video in place; if the file is missing the card offers the Instagram link.
 */
export const ReelCard = ({ id, label, thumb, video }: { id: string; label: string; thumb: string; video: string; accent: string }) => {
  const [mode, setMode] = useState<"idle" | "playing" | "error">("idle");
  const [thumbOk, setThumbOk] = useState(true);
  const url = `https://www.instagram.com/reel/${id}/`;
  return (
    <div className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: "#DBDBDB" }}>
      <div className="flex items-center gap-2 px-3 py-2.5">
        <img src="/reels/sambhav-avatar.jpg" alt="Sambhav Shah" width={28} height={28} loading="lazy" className="h-7 w-7 shrink-0 rounded-full bg-[#EFEFEF] object-cover" />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[11px] font-semibold text-[#262626]">sambhavshah2</p>
          <p className="truncate text-[10px] text-[#8E8E8E]">Original audio</p>
        </div>
        <a href="https://www.instagram.com/sambhavshah2/" target="_blank" rel="noopener noreferrer" className="rounded px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: "#4C5FEF" }}>View profile</a>
      </div>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 5", background: thumbOk ? "#000" : "linear-gradient(160deg, #0A1628, #3a3a5c)" }}>
        {mode === "playing" ? (
          <video src={video} poster={thumb} controls autoPlay playsInline preload="auto" className="absolute inset-0 h-full w-full bg-black object-contain" onError={() => setMode("error")} />
        ) : mode === "error" ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 text-center text-white">
            <span className="text-sm font-bold">This video could not be loaded here</span>
            <span className="text-xs underline">Watch it on Instagram</span>
          </a>
        ) : (
          <button type="button" onClick={() => setMode("playing")} aria-label={`Play video: ${label}`} className="group absolute inset-0 block h-full w-full">
            <img src={thumb} alt={`${label} thumbnail`} loading="lazy" className={`absolute inset-0 h-full w-full object-contain ${thumbOk ? "" : "hidden"}`} onError={() => setThumbOk(false)} />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#262626] shadow-lg transition-transform group-hover:scale-110"><span className="ml-1">&#9654;</span></span>
            </span>
          </button>
        )}
      </div>
      <div className="px-3 pb-2 pt-2.5">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-medium text-[#3897F0]">View more on Instagram</a>
      </div>
      <div className="mx-3 border-t border-[#EFEFEF]" />
      <div className="flex items-center gap-3 px-3 py-2.5 text-[#262626]" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z" /></svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
        <span className="ml-auto"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg></span>
      </div>
      <div className="mx-3 border-t border-[#EFEFEF]" />
      <div className="flex items-center justify-between px-3 py-2.5 text-[11px] text-[#8E8E8E]" aria-hidden="true">
        <span>Add a comment...</span>
        <span className="text-[#262626]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg></span>
      </div>
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
