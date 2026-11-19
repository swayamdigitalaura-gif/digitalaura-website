import { ShortsGrid, type YouTubeShort } from "@/components/ReelsAndTeam";

// Order: bike rental client, then Adroit HR. Covers are self-hosted in /public/videos.
export const TESTIMONIAL_SHORTS: YouTubeShort[] = [
  { id: "YpdcZLLOEK8", title: "Client video testimonial: bike rental company scaled 5X", thumb: "/videos/testimonial-bike-rental-5x.webp" },
  { id: "YbquCMkd5Qo", title: "Client video testimonial: Mrs. Riddhi Shah, Founder & CEO, ADROIT HR Services", thumb: "/videos/testimonial-adroit-hr.webp" },
];

/** Video testimonials shown right below a testimonials section (home page, website development page). */
const HomeVideoTestimonials = ({ shorts = TESTIMONIAL_SHORTS, background = "#FFFFFF" }: { shorts?: YouTubeShort[]; background?: string }) => (
  <section className="px-4 pb-20 md:px-8" style={{ background }}>
    <div className="max-w-7xl mx-auto">
      <h3 className="mb-8 text-center text-2xl font-bold tracking-tight text-[#0A1628] md:text-[28px]">Watch: Clients Share Their Experience</h3>
      <ShortsGrid shorts={shorts} />
    </div>
  </section>
);

export default HomeVideoTestimonials;
