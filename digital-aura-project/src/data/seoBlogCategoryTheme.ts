import { TrendingUp, MapPin, FileText, Gauge, ShoppingCart, Bot, MousePointerClick, Megaphone, Instagram, type LucideIcon } from "lucide-react";

export interface CategoryTheme {
  color: string;
  bg: string;
  border: string;
  glow: string;
  Icon: LucideIcon;
}

export const categoryTheme: Record<string, CategoryTheme> = {
  "SEO Strategy": { color: "#FF6B2B", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: TrendingUp },
  "Local SEO": { color: "#22C55E", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.25)", glow: "rgba(34,197,94,0.14)", Icon: MapPin },
  "On-Page SEO": { color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", border: "rgba(26,111,232,0.25)", glow: "rgba(26,111,232,0.14)", Icon: FileText },
  "Technical SEO": { color: "#7C3AED", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.25)", glow: "rgba(124,58,237,0.14)", Icon: Gauge },
  "eCommerce SEO": { color: "#96BF48", bg: "rgba(150,191,72,0.1)", border: "rgba(150,191,72,0.3)", glow: "rgba(150,191,72,0.16)", Icon: ShoppingCart },
  "AI Search": { color: "#EC4899", bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.25)", glow: "rgba(236,72,153,0.14)", Icon: Bot },
  "Google Ads": { color: "#4285F4", bg: "rgba(66,133,244,0.08)", border: "rgba(66,133,244,0.25)", glow: "rgba(66,133,244,0.14)", Icon: MousePointerClick },
  "Meta Ads": { color: "#0866FF", bg: "rgba(8,102,255,0.08)", border: "rgba(8,102,255,0.25)", glow: "rgba(8,102,255,0.14)", Icon: Megaphone },
  "Social Media": { color: "#8B5CF6", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.25)", glow: "rgba(139,92,246,0.14)", Icon: Instagram },
};

export const defaultTheme: CategoryTheme = categoryTheme["SEO Strategy"];

export const getTheme = (category: string): CategoryTheme => categoryTheme[category] || defaultTheme;
