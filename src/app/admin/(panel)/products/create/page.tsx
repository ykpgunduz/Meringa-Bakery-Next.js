import type { Metadata } from "next";
import Link from "next/link";
import AdminPage from "@/components/AdminPage";
import { getMenuData } from "@/lib/products";
import "@/styles/admin-create-product.css";
import CreateProductForm from "./CreateProductForm";

export const metadata: Metadata = {
  title: "Yeni Ürün Ekle - Meringa QR Menu",
};

/** Laravel: resources/views/admin/create-product.blade.php */
export default async function CreateProductPage() {
  const data = await getMenuData();

  return (
    <AdminPage title="Yeni Ürün Ekle">
      <div className="page-admin-create-product">
        {data.categories.length === 0 ? (
          <div className="alert alert-warning modern-alert">
            <div className="alert-icon">
              <i className="fas fa-exclamation-triangle" />
            </div>
            <div className="alert-content">
              <strong>Kategori Gerekli!</strong>
              Ürün ekleyebilmek için önce kategori oluşturmalısınız.
              <Link href="/admin/categories/create" className="alert-link">
                Kategori eklemek için tıklayın.
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card modern-card shadow-sm">
                <div className="card-header modern-card-header">
                  <div className="d-flex align-items-center">
                    <div className="header-icon">
                      <i className="fas fa-plus" />
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold text-white">Yeni Ürün Ekle</h6>
                      <small className="text-white-50">
                        Menüye yeni ürün ekleyin
                      </small>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4">
                  <CreateProductForm
                    categories={data.categories.map(
                      ({ key, name_tr, name_en }) => ({ key, name_tr, name_en })
                    )}
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
                        Ürün Ekleme Rehberi
                      </h6>
                      <small className="text-white-50">Adım adım rehber</small>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4">
                  <div className="guide-section">
                    {[
                      {
                        icon: "fa-folder",
                        title: "Kategori",
                        text: "Ürünün hangi kategoriye ait olduğunu belirtin.",
                      },
                      {
                        icon: "fa-tag",
                        title: "Ürün Adları",
                        text: "Hem Türkçe hem de İngilizce ürün adlarını girin.",
                      },
                      {
                        icon: "fa-align-left",
                        title: "Açıklamalar",
                        text: 'Ürün boyutu, miktarı veya özelliklerini belirtin (örn: "Adet", "200 gr").',
                      },
                      {
                        icon: "fa-turkish-lira-sign",
                        title: "Fiyat",
                        text: "Sadece sayı girin. ₺ sembolü otomatik eklenecektir.",
                      },
                      {
                        icon: "fa-fire",
                        title: "Kalori",
                        text: "İsteğe bağlıdır. Girilirse menüde ürünün yanında kcal olarak gösterilir.",
                      },
                      {
                        icon: "fa-triangle-exclamation",
                        title: "Alerjenler",
                        text: "Ürünün içerdiği alerjenleri işaretleyin; menüde müşteriye gösterilir.",
                      },
                      {
                        icon: "fa-toggle-on",
                        title: "Ürün Durumu",
                        text: "Aktif ürünler menüde görünür, pasif olanlar gizlenir.",
                      },
                      {
                        icon: "fa-image",
                        title: "Resim",
                        text: "Ürün için görsel eklemek isteğe bağlıdır.",
                      },
                    ].map((guide) => (
                      <div className="guide-item" key={guide.title}>
                        <div className="guide-icon">
                          <i className={`fas ${guide.icon}`} />
                        </div>
                        <div className="guide-content">
                          <h6 className="guide-title">{guide.title}</h6>
                          <p className="guide-text">{guide.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card modern-card shadow-sm mt-4">
                <div className="card-header modern-card-header">
                  <div className="d-flex align-items-center">
                    <div className="header-icon">
                      <i className="fas fa-lightbulb" />
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold text-white">Örnek Değerler</h6>
                      <small className="text-white-50">Referans için</small>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4">
                  <div className="example-box">
                    {[
                      ["Türkçe Ad:", "Cappuccino"],
                      ["İngilizce Ad:", "Cappuccino"],
                      ["Türkçe Açıklama:", "Adet"],
                      ["İngilizce Açıklama:", "Piece"],
                      ["Fiyat:", "160"],
                      ["Kalori:", "120"],
                    ].map(([label, value]) => (
                      <div className="example-row" key={label}>
                        <span className="example-label">{label}</span>
                        <span className="example-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminPage>
  );
}
