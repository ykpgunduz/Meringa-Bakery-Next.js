import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminPage from "@/components/AdminPage";
import { getMenuData } from "@/lib/products";
import { publicFileExists } from "@/lib/images";
import "@/styles/admin-edit-product.css";
import EditProductForm from "./EditProductForm";

export const metadata: Metadata = {
  title: "Ürün Düzenle",
};

/** Laravel: resources/views/admin/edit-product.blade.php */
export default async function EditProductPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category: categoryKey, id } = await params;
  const data = await getMenuData();
  const product = data.products[categoryKey]?.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    // Render sırasında çerez yazılamayacağı için mesaj URL ile taşınır
    redirect(`/admin/products?error=${encodeURIComponent("Ürün bulunamadı!")}`);
  }

  const category = data.categories.find((item) => item.key === categoryKey);
  const imagePath = product.image ? `/img/products/${product.image}` : "";

  return (
    <AdminPage>
      <div className="page-admin-edit-product">
        <div className="card modern-card shadow-sm">
          <div className="card-header modern-card-header">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="d-flex align-items-center">
                <div className="header-icon">
                  <i className="fas fa-edit" />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold text-white">Ürün Düzenle</h6>
                  <small className="text-white-50">
                    {product.name_tr} ürününü güncelle
                  </small>
                </div>
              </div>
              {/* Kaldırılan "Ürün Bilgileri" kartındaki bilgiler burada özet olarak duruyor */}
              <div className="header-meta">
                <span className="header-meta-chip" title="Ürün ID">
                  <i className="fas fa-hashtag" />
                  {product.id}
                </span>
                <span className="header-meta-chip" title="Kategori">
                  <i className="fas fa-folder" />
                  {categoryKey}
                </span>
              </div>
            </div>
          </div>
          <div className="card-body p-4">
            <EditProductForm
              categoryKey={categoryKey}
              categoryLabel={
                category ? `${category.name_tr} (${category.name_en})` : ""
              }
              product={{
                id: product.id,
                name_tr: product.name_tr,
                name_en: product.name_en,
                desc_tr: product.desc_tr,
                desc_en: product.desc_en,
                price: product.price,
                calories: product.calories,
                allergens: product.allergens,
                active: product.active ?? true,
              }}
              imageUrl={
                imagePath && publicFileExists(imagePath) ? imagePath : null
              }
            />
          </div>
        </div>
      </div>
    </AdminPage>
  );
}
