import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getMenuData } from "@/lib/products";
import { categoryImage } from "@/lib/images";
import "@/styles/categories.css";
import CategoriesClient, { type CategoryCard } from "./CategoriesClient";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Menü Kategorileri",
  description:
    "Meringa Bakery & Cafe zengin menü kategorileri: Kahvaltılıklar, artizan tatlılar, soğuk ve sıcak kahveler, taze fırın ürünleri ve bowl çeşitleri.",
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title: "Menü Kategorileri | Meringa Bakery & Cafe",
    description:
      "Meringa Bakery & Cafe zengin menü kategorileri: Kahvaltılıklar, artizan tatlılar, kahveler ve daha fazlası.",
    url: "/categories",
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary",
    title: "Menü Kategorileri | Meringa Bakery & Cafe",
    description:
      "Meringa Bakery & Cafe zengin menü kategorileri: Kahvaltılıklar, artizan tatlılar, kahveler ve daha fazlası.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

/** Laravel: resources/views/category.blade.php */
export default async function CategoriesPage() {
  const data = await getMenuData();

  const categories: CategoryCard[] = data.categories.map((category) => ({
    key: category.key,
    name_tr: category.name_tr,
    name_en: category.name_en,
    image: categoryImage(category.image, category.key),
  }));

  return (
    <div className={`page-categories ${inter.variable}`}>
      <CategoriesClient categories={categories} />
    </div>
  );
}
