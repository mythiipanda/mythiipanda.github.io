const basePath = process.env.BASE_PATH ?? "";
const assetPrefix = process.env.ASSET_PREFIX || basePath || undefined;
export default { output: "export", basePath, assetPrefix, images: { unoptimized: true }, trailingSlash: true };
