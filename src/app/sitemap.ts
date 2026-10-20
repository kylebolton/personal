import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";

const base = "https://kylebolton.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const newest = posts.reduce((a, p) => (p.date > a ? p.date : a), posts[0]?.date ?? "");
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: newest ? new Date(newest) : new Date() },
    ...posts.map(p => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date) })),
  ];
}
