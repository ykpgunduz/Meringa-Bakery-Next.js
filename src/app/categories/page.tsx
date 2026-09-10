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

export const metadata: Metadata = {
  title: "Meringa Bakery QR Menü",
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
