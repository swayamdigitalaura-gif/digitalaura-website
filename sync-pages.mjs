/**
 * Registers every static route in App.tsx as a row in the admin CMS `pages` table, so it
 * shows up in the admin Pages panel (SEO + Content tabs) instead of staying invisible.
 * Safe to re-run any time — existing pages are left untouched (see pageController.ensure).
 *
 * Usage:
 *   ADMIN_API=https://thedigitalaura.com/api ADMIN_EMAIL=... ADMIN_PASSWORD=... node sync-pages.mjs
 *   (defaults to http://localhost:5000/api if ADMIN_API is not set)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_BASE = process.env.ADMIN_API || "http://localhost:5000/api";
const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD env vars (the admin panel login) and re-run.");
  process.exit(1);
}

function pathToSlug(routePath) {
  if (routePath === "/") return "home";
  return routePath.replace(/\/$/, "").split("/").filter(Boolean).pop() || "home";
}

function humanize(slug) {
  return slug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function extractRoutes(appTsxPath) {
  const src = fs.readFileSync(appTsxPath, "utf8");
  const routeRe = /<Route\s+path="([^"]+)"/g;
  const routes = [];
  let m;
  while ((m = routeRe.exec(src))) {
    const p = m[1];
    if (p === "*" || p.includes(":")) continue; // skip catch-all + dynamic (:id/:slug) routes
    routes.push(p);
  }
  return routes;
}

async function main() {
  const appTsxPath = path.join(__dirname, "digital-aura-project", "src", "App.tsx");
  const routes = extractRoutes(appTsxPath);

  const bySlug = new Map();
  for (const r of routes) {
    const slug = pathToSlug(r);
    if (!bySlug.has(slug)) bySlug.set(slug, { slug, title: humanize(slug), route: r });
  }
  const pages = [...bySlug.values()].map(({ slug, title }) => ({ slug, title }));

  console.log(`Found ${routes.length} static routes -> ${pages.length} unique CMS slugs.`);

  const loginRes = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const loginJson = await loginRes.json();
  if (!loginJson.token) {
    console.error("Login failed:", loginJson.message || loginJson);
    process.exit(1);
  }

  const ensureRes = await fetch(`${API_BASE}/pages/ensure`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${loginJson.token}` },
    body: JSON.stringify({ pages }),
  });
  const ensureJson = await ensureRes.json();
  if (!ensureJson.success) {
    console.error("Sync failed:", ensureJson.message || ensureJson);
    process.exit(1);
  }
  console.log(`Created ${ensureJson.created.length} new page(s):`, ensureJson.created);
  console.log(`(${ensureJson.total - ensureJson.created.length} already existed, untouched.)`);
}

main().catch(err => { console.error(err); process.exit(1); });
