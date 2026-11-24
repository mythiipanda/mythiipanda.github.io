import path from "node:path";
const basePath = process.env.BASE_PATH ?? "";
const assetPrefix = process.env.ASSET_PREFIX || basePath || undefined;
export default {
  output: "export",
  basePath,
  assetPrefix,
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: { root: path.resolve(".") },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
