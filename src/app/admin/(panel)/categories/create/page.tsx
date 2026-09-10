import type { Metadata } from "next";
import AdminPage from "@/components/AdminPage";
import "@/styles/admin-create-category.css";
import CreateCategoryForm from "./CreateCategoryForm";

export const metadata: Metadata = {
  title: "Yeni Kategori Ekle - Meringa QR Menu",
};

/** Laravel: resources/views/admin/create-category.blade.php */
export default function CreateCategoryPage() {
  return (
    <AdminPage title="Yeni Kategori Ekle">
      <div className="page-admin-create-category">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card modern-card shadow-sm">
              <div className="card-header modern-card-header">
                <div className="d-flex align-items-center">
                  <div className="header-icon">
                    <i className="fas fa-plus" />
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold text-white">Yeni Kategori Ekle</h6>
                    <small className="text-white-50">
                      Menü kategorisi oluşturun
                    </small>
                  </div>
                </div>
              </div>
              <div className="card-body p-4">
                <CreateCategoryForm />
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
                    <h6 className="mb-0 fw-bold text-white">Bilgilendirme</h6>
                    <small className="text-white-50">
                      Kategori ekleme rehberi
                    </small>
                  </div>
                </div>
              </div>
              <div className="card-body p-4">
                <div className="info-section mb-4">
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-key" />
                    </div>
                    <div className="info-content">
                      <h6 className="info-title">Kategori Anahtarı</h6>
                      <p className="info-text">
                        Bu kategori için benzersiz bir tanımlayıcı olmalıdır.
                        URL&apos;lerde kullanılacağı için sadece küçük harf, rakam
                        ve tire (-) karakterleri kullanın.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="example-section">
                  <h6 className="example-title">
                    <i className="fas fa-lightbulb me-2" />
                    Örnek Değerler
                  </h6>
                  <div className="example-items">
                    {[
                      "sicak-kahveler",
                      "soguk-icecekler",
                      "tatlilar",
                      "ekmekler",
                    ].map((example) => (
                      <div className="example-item" key={example}>
                        <span className="example-key">{example}</span>
                      </div>
                    ))}
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
