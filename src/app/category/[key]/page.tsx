import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getMenuData } from "@/lib/products";
import { categoryImage, productImage } from "@/lib/images";
import "@/styles/category.css";
import CategoryProductsClient, {
  type MenuProduct,
} from "./CategoryProductsClient";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meringa Bakery QR Menü",
};

/** Tüm kategoriler derleme anında statik HTML'e dönüştürülür. */
export async function generateStaticParams() {
  const data = await getMenuData();
  return data.categories.map((category) => ({ key: category.key }));
}

/** Laravel: resources/views/category_products.blade.php */
export default async function CategoryProductsPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const data = await getMenuData();
  const category = data.categories.find((item) => item.key === key);

  // Arama tüm kategorilerde çalıştığı için aktif ürünlerin tamamı gönderilir.
  const allProducts: MenuProduct[] = [];
  for (const [categoryKey, products] of Object.entries(data.products)) {
    const owner = data.categories.find((item) => item.key === categoryKey);
    for (const product of products) {
      if (product.active === false) continue;
      allProducts.push({
        id: product.id,
        name_tr: product.name_tr,
        name_en: product.name_en,
        desc_tr: product.desc_tr,
        desc_en: product.desc_en,
        price: product.price,
        calories: product.calories,
        allergens: product.allergens ?? [],
        image: productImage(product.image),
        categoryKey,
        categoryName_tr: owner?.name_tr ?? "Kategori",
        categoryName_en: owner?.name_en ?? owner?.name_tr ?? "Category",
      });
    }
  }

  return (
    <div className={`page-category ${inter.variable}`}>
      <CategoryProductsClient
        categoryKey={key}
        categoryNameTr={category?.name_tr ?? "Kategori"}
        categoryNameEn={category?.name_en ?? category?.name_tr ?? "Kategori"}
        headerImage={categoryImage(category?.image, key)}
        allProducts={allProducts}
      />
    </div>
  );
}
