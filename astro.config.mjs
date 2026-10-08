import { defineConfig } from "astro/config";

const base = process.env.BASE_PATH || "/";

export default defineConfig({
  site: "https://mythiipanda.github.io",
  base,
  output: "static",
  trailingSlash: "always",
});
