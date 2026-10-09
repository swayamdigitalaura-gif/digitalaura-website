import { useEffect } from "react";

/**
 * Marks the current page noindex and drops its canonical while `active` is true.
 *
 * Used for dynamic routes (blog post, job) whose slug does not exist. The server answers every
 * unknown URL with the SPA shell (HTTP 200), so without this Google would see an indexable
 * page with a self-referencing canonical, a soft 404. PageSEO re-sets the canonical in the same
 * commit, so the change is applied again with a 0 ms timeout (same approach as NotFound.tsx).
 */
export function useNoindexWhen(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const mark = () => {
      let robots = document.head.querySelector('meta[name="robots"]');
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex, follow");
      document.head.querySelector('link[rel="canonical"]')?.remove();
    };
    mark();
    const timer = window.setTimeout(mark, 0);
    return () => {
      window.clearTimeout(timer);
      document.head.querySelector('meta[name="robots"]')?.setAttribute("content", "index, follow");
    };
  }, [active]);
}
