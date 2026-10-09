import { useState } from "react";
import { Play, Instagram, Linkedin } from "lucide-react";
import { track } from "@/lib/track";

export interface TeamMember { name: string; role: string; bio: string; photo: string; }

/**
 * Instagram reel with a click-to-load facade: the page ships only a link (crawlable, no third-party
 * script) and the Instagram embed is loaded when the visitor presses play.
 */
export const ReelCard = ({ id, label, accent }: { id: string; label: string; accent: string }) => {
  const [on, setOn] = useState(false);
  const url = `https://www.instagram.com/reel/${id}/`;
  return (
    <div className="rounded-2xl overflow-hidden border bg-white" style={{ borderColor: "#E5E7EB" }}>
      {on ? (
        <iframe
          src={`${url}embed/`}
          title={label}
          loading="lazy"
          allowFullScreen
          className="w-full block border-0"
          style={{ height: 560 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => { setOn(true); track("video_play", { video: id }); }}
          className="w-full flex flex-col items-center justify-center gap-3 text-white"
          style={{ height: 320, background: `linear-gradient(160deg, #0A1628, ${accent})` }}
          aria-label={`Play: ${label}`}
        >
          <span className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center"><Play className="w-6 h-6" fill="currentColor" /></span>
          <span className="font-bold text-sm px-4 text-center">{label}</span>
        </button>
      )}
      <div className="px-4 py-3 flex items-center justify-between gap-3 text-sm">
        <span className="text-[#4B5563]">Reel by Sambhav Shah</span>
        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold underline" style={{ color: accent }}>
          <Instagram className="w-4 h-4" /> Watch on Instagram
        </a>
      </div>
    </div>
  );
};

export const ReelGrid = ({ ids, accent, topic }: { ids: string[]; accent: string; topic: string }) => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {ids.map((id, i) => <ReelCard key={id} id={id} label={`${topic} reel ${i + 1}`} accent={accent} />)}
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
