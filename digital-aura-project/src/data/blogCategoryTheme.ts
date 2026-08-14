import { TrendingUp, Bot, Code2, Palette, DollarSign, Target, ShoppingCart, MapPin, FileText, Gauge, type LucideIcon } from "lucide-react";

export interface BlogCategoryTheme {
  color: string;
  bg: string;
  border: string;
  glow: string;
  Icon: LucideIcon;
}

export const blogCategoryTheme: Record<string, BlogCategoryTheme> = {
  "SEO":               { color: "#FF6B2B", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: TrendingUp },
  "Digital Marketing":  { color: "#22C55E", bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.25)",  glow: "rgba(34,197,94,0.14)",  Icon: Target },
  "Web Development":    { color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", border: "rgba(26,111,232,0.25)", glow: "rgba(26,111,232,0.14)", Icon: Code2 },
  "AI & Tech":           { color: "#7C3AED", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.25)", glow: "rgba(124,58,237,0.14)", Icon: Bot },
  "Case Study":          { color: "#F59E0B", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", glow: "rgba(245,158,11,0.14)", Icon: DollarSign },
  "Social Media":        { color: "#EC4899", bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.25)", glow: "rgba(236,72,153,0.14)", Icon: Palette },
  "eCommerce":           { color: "#96BF48", bg: "rgba(150,191,72,0.1)",  border: "rgba(150,191,72,0.3)",  glow: "rgba(150,191,72,0.16)", Icon: ShoppingCart },

  // Category names used by the SEO/AEO/GEO blog post series (src/data/seoBlogPosts.ts)
  "SEO Strategy":  { color: "#FF6B2B", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: TrendingUp },
  "Local SEO":     { color: "#22C55E", bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.25)",  glow: "rgba(34,197,94,0.14)",  Icon: MapPin },
  "On-Page SEO":   { color: "#1A6FE8", bg: "rgba(26,111,232,0.08)", border: "rgba(26,111,232,0.25)", glow: "rgba(26,111,232,0.14)", Icon: FileText },
  "Technical SEO": { color: "#7C3AED", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.25)", glow: "rgba(124,58,237,0.14)", Icon: Gauge },
  "eCommerce SEO": { color: "#96BF48", bg: "rgba(150,191,72,0.1)",  border: "rgba(150,191,72,0.3)",  glow: "rgba(150,191,72,0.16)", Icon: ShoppingCart },
  "AI Search":     { color: "#EC4899", bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.25)", glow: "rgba(236,72,153,0.14)", Icon: Bot },
};

export const defaultBlogTheme: BlogCategoryTheme = blogCategoryTheme["SEO"];

export const getBlogTheme = (category?: string): BlogCategoryTheme =>
  (category && blogCategoryTheme[category]) || defaultBlogTheme;
