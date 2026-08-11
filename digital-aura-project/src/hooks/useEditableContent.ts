import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// Same slug convention as PageSEO.tsx: last non-empty path segment, 'home' for '/'.
function pathToSlug(pathname: string): string {
  if (pathname === "/") return "home";
  return pathname.replace(/\/$/, "").split("/").filter(Boolean).pop() || "home";
}

/**
 * Merges admin-editable body copy over a page's hardcoded default text.
 * `slug` can be a full pathname (e.g. "/case-studies/riant-bikes") or an
 * already-resolved CMS slug (e.g. "riant-bikes") — both resolve the same way
 * PageSEO does, so editing a page's SEO and its content live under one row.
 * Any key missing/blank in the CMS falls back to `defaults`, and a failed/slow
 * fetch just leaves the defaults in place — the page never blocks on this.
 */
export function useEditableContent<T extends Record<string, string>>(slug: string, defaults: T): T {
  const [content, setContent] = useState<T>(defaults);
  const resolvedSlug = slug.startsWith("/") ? pathToSlug(slug) : slug;

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/pages/${resolvedSlug}`)
      .then(r => (r.ok ? r.json() : null))
      .then(json => {
        if (cancelled || !json?.success || !json?.data?.content_json) return;
        const overrides = JSON.parse(json.data.content_json);
        const nonEmpty = Object.fromEntries(
          Object.entries(overrides).filter(([, v]) => typeof v === "string" && v.trim())
        );
        if (Object.keys(nonEmpty).length) {
          setContent(prev => ({ ...prev, ...nonEmpty }));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [resolvedSlug]);

  return content;
}
