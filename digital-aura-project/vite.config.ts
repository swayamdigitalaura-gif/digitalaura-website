import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Blog posts go live on their own date (India time). PUBLISH_DATE=YYYY-MM-DD overrides it for a preview build.
const publishDate = process.env.PUBLISH_DATE || new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: { __PUBLISH_DATE__: JSON.stringify(publishDate) },
  server: {
    host: "::",
    port: 8083,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
