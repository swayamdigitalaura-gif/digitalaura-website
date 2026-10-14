import { useSetting } from "@/hooks/useSettings";

/** Slugs of code-published blog posts the team has deactivated in Admin -> Blogs. */
export function useHiddenBlogSlugs(): Set<string> {
  const raw = useSetting("hidden_blog_slugs", "[]");
  try {
    const list = JSON.parse(raw || "[]");
    return new Set(Array.isArray(list) ? list.map(String) : []);
  } catch {
    return new Set();
  }
}
