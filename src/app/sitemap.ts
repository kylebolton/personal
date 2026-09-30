import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";

const base = "https://kylebolton.me";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    ...posts.map(p => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date) })),
  ];
}
