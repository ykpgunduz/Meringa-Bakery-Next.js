import type { Metadata } from "next";
import Link from "next/link";
import AdminPage from "@/components/AdminPage";
import { getMenuData } from "@/lib/products";
import { publicFileExists } from "@/lib/images";
import "@/styles/admin-categories.css";
import CategoriesManager, { type AdminCategoryRow } from "./CategoriesManager";

export const metadata: Metadata = {
  title: "Kategoriler - Meringa QR Menu",
};

/** Laravel: resources/views/admin/categories.blade.php */
export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const data = await getMenuData();

  const categories: AdminCategoryRow[] = data.categories.map((category) => {
    const imagePath = category.image ? `/img/category/${category.image}` : "";
    return {
      key: category.key,
      name_tr: category.name_tr,
      name_en: category.name_en,
      imageUrl: imagePath && publicFileExists(imagePath) ? imagePath : null,
      productCount: data.products[category.key]?.length ?? 0,
    };
  });

  return (
    <AdminPage
      title="Kategoriler"
      error={error}
      actions={
        <Link href="/admin/categories/create" className="btn btn-primary">
          <i className="fas fa-plus me-2 d-none d-md-inline" />
          <span className="d-none d-md-inline">Kategori Ekle</span>
          <i className="fas fa-plus d-md-none" />
        </Link>
      }
    >
      <div className="page-admin-categories">
        <CategoriesManager categories={categories} />
      </div>
    </AdminPage>
  );
}
