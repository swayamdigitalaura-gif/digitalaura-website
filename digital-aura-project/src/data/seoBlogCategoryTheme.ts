import { TrendingUp, MapPin, FileText, Gauge, ShoppingCart, Bot, MousePointerClick, Megaphone, Instagram, type LucideIcon } from "lucide-react";

export interface CategoryTheme {
  color: string;
  /** Darker orange for text and small labels, so they meet contrast on white. */
  ink: string;
  bg: string;
  border: string;
  glow: string;
  Icon: LucideIcon;
}

export const categoryTheme: Record<string, CategoryTheme> = {
  "SEO Strategy": { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: TrendingUp },
  "Local SEO": { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: MapPin },
  "On-Page SEO": { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: FileText },
  "Technical SEO": { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: Gauge },
  "eCommerce SEO": { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: ShoppingCart },
  "AI Search": { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: Bot },
  "Google Ads": { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: MousePointerClick },
  "Meta Ads": { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: Megaphone },
  "Social Media": { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: Instagram },
};

export const defaultTheme: CategoryTheme = categoryTheme["SEO Strategy"];

export const getTheme = (category: string): CategoryTheme => categoryTheme[category] || defaultTheme;
