import ClientLogoGrid from "./ClientLogoGrid";
import { useClientLogos, ClientLogoItem } from "@/hooks/useClientLogos";

interface Props {
  servicePage: string;
  accentColor?: string;
  heading: string;
  fallback?: ClientLogoItem[];
}

const ClientLogoSection = ({ servicePage, accentColor = "#22C55E", heading, fallback = [] }: Props) => {
  const { logos } = useClientLogos(servicePage, fallback);

  if (logos.length === 0) return null;

  return (
    <section className="py-16 px-4 md:px-8" style={{ background: "#F8FAFF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-badge">Clients We&#39;ve Grown</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A1628] mt-2">{heading}</h2>
        </div>
        <ClientLogoGrid accentColor={accentColor} clients={logos} />
      </div>
    </section>
  );
};

export default ClientLogoSection;
