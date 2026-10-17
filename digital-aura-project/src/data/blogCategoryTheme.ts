import { TrendingUp, Bot, Code2, Palette, DollarSign, Target, ShoppingCart, MapPin, FileText, Gauge, type LucideIcon } from "lucide-react";

export interface BlogCategoryTheme {
  color: string;
  /** Darker orange for text and small labels, so they meet contrast on white. */
  ink: string;
  bg: string;
  border: string;
  glow: string;
  Icon: LucideIcon;
}

export const blogCategoryTheme: Record<string, BlogCategoryTheme> = {
  "SEO":               { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: TrendingUp },
  "Digital Marketing":  { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)",  Icon: Target },
  "Web Development":    { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: Code2 },
  "AI & Tech":           { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: Bot },
  "Case Study":          { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: DollarSign },
  "Social Media":        { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: Palette },
  "eCommerce":           { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: ShoppingCart },

  // Category names used by the SEO/AEO/GEO blog post series (src/data/seoBlogPosts.ts)
  "SEO Strategy":  { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: TrendingUp },
  "Local SEO":     { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)",  Icon: MapPin },
  "On-Page SEO":   { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: FileText },
  "Technical SEO": { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: Gauge },
  "eCommerce SEO": { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: ShoppingCart },
  "AI Search":     { color: "#FF6B2B", ink: "#C2410C", bg: "rgba(255,107,43,0.08)", border: "rgba(255,107,43,0.25)", glow: "rgba(255,107,43,0.14)", Icon: Bot },
};

export const defaultBlogTheme: BlogCategoryTheme = blogCategoryTheme["SEO"];

export const getBlogTheme = (category?: string): BlogCategoryTheme =>
  (category && blogCategoryTheme[category]) || defaultBlogTheme;
