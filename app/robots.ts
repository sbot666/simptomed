import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://xn--d1abiqalgnm.xn--p1ai/sitemap.xml", // симптомед.рф
  };
}
