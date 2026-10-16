import { PillarSection } from "@/components/pillar/Pillar";
import { MemberLinks } from "@/components/ReelsAndTeam";

const ORANGE = "#FF6B2B";
const NAVY = "#0A1628";

const FOUNDER = {
  name: "Sambhav Shah",
  role: "Founder & CEO",
  photo: "/team/sambhav-shah.webp",
  bio: "Sambhav started in digital marketing in 2015 and built his expertise hands-on, leading business development, client relationships and growing teams. With 10+ years across client acquisition, team leadership and digital execution, he stays personally involved in strategy on every account.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sambhav-shah/" },
    { label: "Instagram", href: "https://www.instagram.com/sambhavshah2/" },
  ],
};

/** Developers and project lead from the About page (same names, roles and photos), with a short role-based bio. */
const MEMBERS = [
  { name: "Jaspreet Singh", role: "Web Design & Dev Project Manager", photo: "/team/jaspreet.png", bio: "Jaspreet is your point of contact on a website project. He plans the scope and timeline, coordinates design and development, and keeps every stage moving towards the launch date." },
  { name: "Swayam Parikh", role: "AI Full Stack Developer", photo: "/team/swayam.png", bio: "Swayam builds the front end and back end of custom websites and web apps, and adds AI-powered features where they help, keeping the code fast, secure and easy to maintain." },
  { name: "Abhishek Kaushal", role: "Shopify Developer", photo: "/team/placeholder-male.svg", bio: "Abhishek builds and customises Shopify stores, from theme setup and product catalogues to checkout and payment integrations, so your online store is ready to sell." },
];

/** Team block for the Website Development page, laid out like the team on the Meta and Google Ads pages. */
export default function WebsiteTeam() {
  return (
    <PillarSection
      id="team"
      tone="white"
      eyebrow="Our team"
      title="Meet the team behind every website we build"
      intro="Digital Aura is led by founder Sambhav Shah, who has 10+ years of experience in digital marketing. This is the in-house team at our Hanspura office, Ahmedabad, that plans, designs and builds your website."
    >
      <div className="mx-auto grid gap-5 lg:grid-cols-[1fr_1.7fr]">
        <div className="pillar-card rounded-2xl border-2 bg-[#FFF8F2] p-5" style={{ borderColor: `${ORANGE}66` }}>
          <div className="flex items-center gap-4">
            <img src={FOUNDER.photo} alt={`${FOUNDER.name}, ${FOUNDER.role} at Digital Aura`} width={72} height={72} loading="lazy" className="h-[72px] w-[72px] shrink-0 rounded-2xl bg-white object-cover" />
            <div>
              <h3 className="text-[19px] font-bold leading-tight" style={{ color: NAVY }}>{FOUNDER.name}</h3>
              <p className="text-sm font-semibold" style={{ color: ORANGE }}>{FOUNDER.role}</p>
            </div>
          </div>
          <p className="mt-4 text-[14.5px] leading-relaxed text-[#4B5563]">{FOUNDER.bio}</p>
          <MemberLinks links={FOUNDER.links} accent={ORANGE} />
        </div>
        <div className="pillar-cols-2 grid gap-5 sm:grid-cols-2">
          {MEMBERS.map((m) => (
            <div key={m.name} className="pillar-card rounded-2xl border bg-white p-5">
              <div className="flex items-center gap-3">
                <img src={m.photo} alt={`${m.name}, ${m.role} at Digital Aura`} width={48} height={48} loading="lazy" className="h-12 w-12 shrink-0 rounded-full bg-[#F3F4F6] object-cover" />
                <div>
                  <h3 className="font-bold leading-tight" style={{ color: NAVY }}>{m.name}</h3>
                  <p className="text-sm font-semibold" style={{ color: ORANGE }}>{m.role}</p>
                </div>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-[#4B5563]">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </PillarSection>
  );
}
