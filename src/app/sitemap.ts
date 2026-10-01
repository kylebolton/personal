import type { MetadataRoute } from "next";

const base = "https://kylebolton.me";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
  ];
}
