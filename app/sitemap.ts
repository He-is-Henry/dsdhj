import { MetadataRoute } from "next";

const backendBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const siteUrl = "https://dsdhj.ng";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${backendBase}/published/all`);
  const manuscripts: Manuscript[] = res.ok ? await res.json() : [];

  const manuscriptUrls = manuscripts.map((m) => ({
    url: `${siteUrl}/manuscript/${m.slug}`,
    lastModified: m.createdAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const staticUrls = [
    { url: siteUrl, priority: 1.0 },
    { url: `${siteUrl}/archive`, priority: 0.7 },
    { url: `${siteUrl}/issue`, priority: 0.7 },
    { url: `${siteUrl}/recent-uploads`, priority: 0.7 },
    { url: `${siteUrl}/editorial-board`, priority: 0.5 },
    { url: `${siteUrl}/author-guidelines`, priority: 0.5 },
    { url: `${siteUrl}/ethics`, priority: 0.5 },
    { url: `${siteUrl}/reviews`, priority: 0.5 },
    { url: `${siteUrl}/login`, priority: 0.4 },
    { url: `${siteUrl}/signup`, priority: 0.4 },
    { url: `${siteUrl}/contact`, priority: 0.4 },
    { url: `${siteUrl}/privacy`, priority: 0.3 },
  ].map((entry) => ({
    ...entry,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
  }));

  return [...staticUrls, ...manuscriptUrls];
}
