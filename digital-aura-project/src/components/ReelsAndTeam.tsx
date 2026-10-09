import { useEffect, useRef, useState } from "react";
import { Instagram, Linkedin } from "lucide-react";

export interface TeamMember { name: string; role: string; bio: string; photo: string; }

/**
 * Official Instagram embed (blockquote + embed.js), as supplied by the owner. The blockquote is in the page
 * HTML (crawlable, and a working link if the script is blocked); embed.js is loaded only when a reel is near the
 * viewport and turns the blockquote into the Instagram player with its own thumbnail.
 */
type InstgrmWindow = Window & { instgrm?: { Embeds: { process: () => void } } };
let igLoading = false;
function processInstagram() {
  const w = window as InstgrmWindow;
  if (w.instgrm) { w.instgrm.Embeds.process(); return; }
  if (igLoading) return;
  igLoading = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.instagram.com/embed.js";
  s.onload = () => (window as InstgrmWindow).instgrm?.Embeds.process();
  document.body.appendChild(s);
}
const instagramEmbedHtml = (id: string) =>
  `<style>.da-ig{position:relative;overflow:hidden}.da-ig iframe.instagram-media{max-width:100%!important;min-width:0!important}</style><blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/${id}/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF;border:0;border-radius:3px;box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15);margin:1px;max-width:540px;min-width:300px;padding:0;width:calc(100% - 2px);"><div style="padding:16px;"><a href="https://www.instagram.com/reel/${id}/?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF;line-height:0;padding:0 0;text-align:center;text-decoration:none;width:100%;" target="_blank" rel="noopener"><div style="padding:19% 0;"></div><div style="color:#3897f0;font-family:Arial,sans-serif;font-size:14px;font-weight:550;line-height:18px;">View this post on Instagram</div><div style="padding:19% 0;"></div></a><p style="color:#c9c8cd;font-family:Arial,sans-serif;font-size:14px;line-height:17px;margin:8px 0 0;text-align:center;"><a href="https://www.instagram.com/reel/${id}/?utm_source=ig_embed&amp;utm_campaign=loading" style="color:#c9c8cd;text-decoration:none;" target="_blank" rel="noopener">A post shared by Sambhav Shah - Digital Marketing (@sambhavshah2)</a></p></div></blockquote>`;

export const ReelCard = ({ id, label, accent }: { id: string; label: string; accent: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: number | undefined;
    const start = () => {
      processInstagram();
      // If Instagram does not answer (privacy mode, blockers, restricted account), show a plain link card instead of an empty box.
      timer = window.setTimeout(() => {
        const f = el.querySelector("iframe.instagram-media");
        if (!f || f.getBoundingClientRect().height < 100) setFailed(true);
      }, 10000);
    };
    if (!("IntersectionObserver" in window)) { start(); return () => window.clearTimeout(timer); }
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { start(); io.disconnect(); } }, { rootMargin: "400px" });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, []);
  const url = `https://www.instagram.com/reel/${id}/`;
  return (
    <div className="rounded-2xl overflow-hidden border bg-white" style={{ borderColor: "#E5E7EB" }}>
      {failed ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="flex w-full flex-col items-center justify-center gap-3 px-5 text-center text-white" style={{ minHeight: 360, background: "linear-gradient(160deg, #0A1628, #FF6B2B)" }}>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-2xl">&#9654;</span>
          <span className="text-base font-bold">Watch this reel on Instagram</span>
          <span className="text-sm opacity-80">@sambhavshah2</span>
        </a>
      ) : (
        <div ref={ref} className="da-ig" style={{ minHeight: 480 }} aria-label={label} dangerouslySetInnerHTML={{ __html: instagramEmbedHtml(id) }} />
      )}
      <div className="px-4 py-3 flex items-center justify-between gap-3 text-sm border-t" style={{ borderColor: "#E5E7EB" }}>
        <span className="text-[#4B5563]">Reel by Sambhav Shah</span>
        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold underline" style={{ color: accent }}>
          <Instagram className="w-4 h-4" /> Watch on Instagram
        </a>
      </div>
    </div>
  );
};

export const ReelGrid = ({ ids, accent, topic }: { ids: string[]; accent: string; topic: string }) => (
  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
