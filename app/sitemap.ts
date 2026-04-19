import type { MetadataRoute } from "next";

const BASE_URL = "https://simptomed.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/chat", priority: 0.9, freq: "weekly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/faq", priority: 0.7, freq: "monthly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
    { path: "/terms", priority: 0.3, freq: "yearly" },
  ] as const;

  return pages.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}
