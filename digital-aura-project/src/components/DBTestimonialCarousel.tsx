import { useState, useEffect } from "react";
import TestimonialCarousel from "./TestimonialCarousel";

const COLORS = ["#FF6B2B", "#7C3AED", "#1A6FE8", "#22C55E"];

const FALLBACK = [
  { quote: "Digital Aura's team designed a professional website and executed a highly effective Meta Ads campaign that brought us real, measurable results.", personName: "Sahebrav Patil", name: "Business Owner", company: "Pest Control Business", initials: "SP", color: "#FF6B2B" },
  { quote: "We partnered with them for website development and lead generation campaigns, and the results were beyond our expectations.", personName: "Chintan Joshi", name: "Local Guide", company: "141 Reviews", initials: "CJ", color: "#7C3AED" },
  { quote: "Digital Aura helped us take our brand online and generate quality leads for our event solutions business.", personName: "Darshil Shah", name: "Owner", company: "Elegant Event Solutions", initials: "DS", color: "#1A6FE8" },
  { quote: "Their lead generation strategies through Meta Ads were impeccable, delivering high quality leads that swiftly converted into sales.", personName: "Tapan Joshi", name: "Business Owner", company: "Invisible Grills Business", initials: "TJ", color: "#22C55E" },
  { quote: "Excellent results and professional service! Our online presence has been outstanding since working with Digital Aura.", personName: "Ketan Patel", name: "Business Owner", company: "", initials: "KP", color: "#FF6B2B" },
  { quote: "Digital Aura improved our website user experience and boosted brand visibility, crucial for attracting more customers.", personName: "Tirth Patel", name: "Local Guide", company: "18 Reviews", initials: "TP", color: "#7C3AED" },
  { quote: "Working with Digital Aura transformed our online presence completely. The new website has been a game-changer for lead generation.", personName: "Shweta Sultania", name: "Interior Designer", company: "Sultania Interiors", initials: "SS", color: "#1A6FE8" },
  { quote: "Outstanding digital marketing services. They understood our niche perfectly and delivered campaigns that actually convert.", personName: "Rajesh Kumar", name: "Director", company: "K&R Manufacturing", initials: "RK", color: "#22C55E" },
];

const DBTestimonialCarousel = () => {
  const [items, setItems] = useState(FALLBACK);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/testimonials`)
      .then(r => r.json())
      .then(d => {
        if (d.data?.length) {
          setItems(d.data.map((t: Record<string, string>, i: number) => ({
            personName: t.name,
            name: t.role || '',
            company: t.company || '',
            quote: t.quote,
            initials: t.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase(),
            color: COLORS[i % 4],
          })));
        }
      })
      .catch(() => {});
  }, []);

  return <TestimonialCarousel items={items} />;
};

export default DBTestimonialCarousel;
