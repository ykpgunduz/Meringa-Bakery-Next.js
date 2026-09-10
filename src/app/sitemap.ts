import type { MetadataRoute } from "next";
import { getMenuData } from "@/lib/products";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = SITE_URL;
  const data = await getMenuData();

  const categoryRoutes: MetadataRoute.Sitemap = data.categories.map((cat) => ({
    url: `${siteUrl}/category/${cat.key}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: `${siteUrl}/qr-menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...categoryRoutes,
  ];
}
