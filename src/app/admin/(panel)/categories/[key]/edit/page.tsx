import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminPage from "@/components/AdminPage";
import { getMenuData } from "@/lib/products";
import { publicFileExists } from "@/lib/images";
import "@/styles/admin-edit-category.css";
import EditCategoryForm from "./EditCategoryForm";

export const metadata: Metadata = {
  title: "Kategori Düzenle - Meringa QR Menu",
};

/** Laravel: resources/views/admin/edit-category.blade.php */
export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const data = await getMenuData();
  const category = data.categories.find((item) => item.key === key);

  if (!category) {
    // Render sırasında çerez yazılamayacağı için mesaj URL ile taşınır
    redirect(
      `/admin/categories?error=${encodeURIComponent("Kategori bulunamadı!")}`
    );
  }

  const candidates = [
    category.image ? `/img/category/${category.image}` : "",
    `/img/category/${category.key}.jpg`,
  ];
  const imageUrl = candidates.find((path) => path && publicFileExists(path)) ?? null;

  return (
    <AdminPage title="Kategori Düzenle">
      <div className="page-admin-edit-category">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card modern-card shadow-sm">
              <div className="card-header modern-card-header">
                <div className="d-flex align-items-center">
                  <div className="header-icon">
                    <i className="fas fa-edit" />
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold text-white">Kategori Düzenle</h6>
                    <small className="text-white-50">
                      {category.name_tr} kategorisini güncelle
                    </small>
                  </div>
                </div>
              </div>
              <div className="card-body p-4">
                <EditCategoryForm
                  category={{
                    key: category.key,
                    name_tr: category.name_tr,
                    name_en: category.name_en,
                  }}
                  imageUrl={imageUrl}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card modern-card shadow-sm">
              <div className="card-header modern-card-header">
                <div className="d-flex align-items-center">
                  <div className="header-icon">
                    <i className="fas fa-info-circle" />
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold text-white">
                      Kategori Bilgileri
                    </h6>
                    <small className="text-white-50">Mevcut bilgiler</small>
                  </div>
                </div>
              </div>
              <div className="card-body p-4">
                <div className="info-section">
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-key" />
                    </div>
                    <div className="info-content">
                      <h6 className="info-title">Kategori Anahtarı</h6>
                      <p className="info-value">{category.key}</p>
                      <p className="info-text">
                        Kategori anahtarı değiştirilemez. Bu değer
                        URL&apos;lerde kullanılır.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="warning-section mt-4">
                  <div className="warning-icon">
                    <i className="fas fa-exclamation-triangle" />
                  </div>
                  <div className="warning-content">
                    <h6 className="warning-title">Önemli Not</h6>
                    <p className="warning-text">
                      Sadece kategori adları güncellenebilir. Anahtar değer
                      sistem tarafından korunur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPage>
  );
}
