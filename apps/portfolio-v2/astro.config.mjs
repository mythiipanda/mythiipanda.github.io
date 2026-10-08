import { defineConfig } from "astro/config";

// BASE_PATH is set per deploy target (for example /portfolio-v2 for the preview,
// empty for the domain root in production).
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  site: "https://mythiipanda.github.io",
  base,
  output: "static",
  trailingSlash: "always",
});
