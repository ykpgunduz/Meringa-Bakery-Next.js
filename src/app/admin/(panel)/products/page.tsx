import type { Metadata } from "next";
import Link from "next/link";
import AdminPage from "@/components/AdminPage";
import { getMenuData } from "@/lib/products";
import "@/styles/admin-products.css";
import ProductsManager, { type AdminProduct } from "./ProductsManager";
import {
  ProductSearchField,
  ProductSearchProvider,
} from "./ProductSearchContext";

export const metadata: Metadata = {
  title: "Ürünler - Meringa QR Menu",
};

/** Laravel: resources/views/admin/products.blade.php */
export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const data = await getMenuData();

  const products: Record<string, AdminProduct[]> = {};
  for (const category of data.categories) {
    products[category.key] = (data.products[category.key] ?? []).map(
      (product) => ({
        id: product.id,
        name_tr: product.name_tr,
        name_en: product.name_en,
        desc_tr: product.desc_tr,
        desc_en: product.desc_en,
        price: product.price,
        calories: product.calories,
        allergens: product.allergens ?? [],
        active: product.active ?? true,
        imageUrl: product.image ? `/img/products/${product.image}` : null,
      })
    );
  }

  const totalProducts = Object.values(data.products).reduce(
    (sum, list) => sum + list.length,
    0
  );

  return (
    <ProductSearchProvider>
      <AdminPage
        title="Ürünler"
        error={error}
        search={<ProductSearchField totalProducts={totalProducts} />}
        actions={
          <Link href="/admin/products/create" className="btn btn-primary">
            <i className="fas fa-plus me-2 d-none d-md-inline" />
            <span className="d-none d-md-inline">Ürün Ekle</span>
            <i className="fas fa-plus d-md-none" />
          </Link>
        }
      >
        <div className="page-admin-products">
          <ProductsManager
            categories={data.categories.map(({ key, name_tr, name_en }) => ({
              key,
              name_tr,
              name_en,
            }))}
            products={products}
          />
        </div>
      </AdminPage>
    </ProductSearchProvider>
  );
}
