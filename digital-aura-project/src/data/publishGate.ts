/**
 * Scheduled publishing for blog posts. A post goes live on its own `date` (India time): the site is rebuilt every day, and a
 * post whose date is still in the future is left out of the blog list, its page, the prerendered HTML, the sitemap and every
 * link to it. The build date comes from `__PUBLISH_DATE__` (set in vite.config.ts, or the PUBLISH_DATE environment variable
 * for a preview); if it is missing, today's date in India is used.
 */
declare const __PUBLISH_DATE__: string | undefined;

const istToday = () => new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);

export const PUBLISH_DATE: string =
  typeof __PUBLISH_DATE__ === "string" && /^\d{4}-\d{2}-\d{2}$/.test(__PUBLISH_DATE__) ? __PUBLISH_DATE__ : istToday();

/** True when a post or card dated `date` should be visible today. */
export const isPublished = (date: string | undefined | null): boolean => !date || date <= PUBLISH_DATE;
