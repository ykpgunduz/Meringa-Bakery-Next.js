import type { Metadata } from "next";
import Link from "next/link";
import AdminPage from "@/components/AdminPage";
import { getMenuData } from "@/lib/products";
import { categoryImage } from "@/lib/images";
import "@/styles/admin-dashboard.css";

export const metadata: Metadata = {
  title: "Panel - Meringa QR Menu",
};

/** Laravel: resources/views/admin/dashboard.blade.php */
export default async function AdminDashboardPage() {
  const data = await getMenuData();

  const allProducts = Object.values(data.products).flat();
  const totalProducts = allProducts.length;
  const totalPrice = allProducts.reduce((sum, product) => sum + product.price, 0);
  const averagePrice =
    totalProducts > 0 ? Math.round(totalPrice / totalProducts) : 0;
  const maxPrice = allProducts.reduce(
    (max, product) => (product.price > max ? product.price : max),
    0
  );

  return (
    <AdminPage title="Yönetim Paneline Hoşgeldiniz!">
      <div className="page-admin-dashboard">
        <div className="row g-3">
          <div className="col-lg-3 col-md-6">
            <div className="card stat-card stat-card-primary shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="stat-label">Toplam Kategori</div>
                    <div className="stat-number">{data.categories.length}</div>
                    <div className="stat-change">
                      <i className="fas fa-arrow-up me-1" />
                      Aktif kategoriler
                    </div>
                  </div>
                  <div className="stat-icon stat-icon-primary">
                    <i className="fas fa-list" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card stat-card stat-card-success shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="stat-label">Toplam Ürün</div>
                    <div className="stat-number">{totalProducts}</div>
                    <div className="stat-change">
                      <i className="fas fa-chart-line me-1" />
                      Menüde yer alan
                    </div>
                  </div>
                  <div className="stat-icon stat-icon-success">
                    <i className="fas fa-shopping-bag" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card stat-card stat-card-info shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="stat-label">Ortalama Fiyat</div>
                    <div className="stat-number">₺{averagePrice}</div>
                    <div className="stat-change">
                      <i className="fas fa-calculator me-1" />
                      Hesaplanmış değer
                    </div>
                  </div>
                  <div className="stat-icon stat-icon-info">
                    <span className="lira-icon">₺</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card stat-card stat-card-warning shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="stat-label">En Yüksek Fiyat</div>
                    <div className="stat-number">₺{maxPrice}</div>
                    <div className="stat-change">
                      <i className="fas fa-crown me-1" />
                      Premium ürün
                    </div>
                  </div>
                  <div className="stat-icon stat-icon-warning">
                    <i className="fas fa-arrow-up" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3 mt-2">
          <div className="col-lg-6">
            <div className="card modern-card shadow-sm h-100">
              <div className="card-header modern-card-header">
                <div className="header-content">
                  <div className="header-icon-wrapper">
                    <div className="header-icon header-icon-categories">
                      <i className="fas fa-list" />
                    </div>
                  </div>
                  <div className="header-text">
                    <h4 className="header-title">Kategoriler</h4>
                    <p className="header-subtitle">
                      {data.categories.length} kategori mevcut
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                {data.categories.length > 0 ? (
                  <div className="modern-list">
                    {data.categories.map((category, index) => (
                      <div
                        key={category.key}
                        className={`modern-list-item${index === 0 ? " first" : ""}`}
                      >
                        <div className="list-item-content">
                          <div className="list-item-image">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={categoryImage(category.image, category.key)}
                              alt={category.name_tr}
                              className="category-image"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-grow-1">
                            <div className="list-item-title">{category.name_tr}</div>
                            <div className="list-item-subtitle">
                              {category.name_en}
                            </div>
                          </div>
                          <div className="list-item-badge">
                            <span className="modern-badge">
                              {data.products[category.key]?.length ?? 0}
                              <small>ürün</small>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <i className="fas fa-list-alt" />
                    </div>
                    <h6 className="empty-title">Henüz kategori yok</h6>
                    <p className="empty-text">
                      İlk kategorinizi oluşturarak başlayın
                    </p>
                    <Link
                      href="/admin/categories/create"
                      className="btn btn-sm btn-primary"
                    >
                      <i className="fas fa-plus me-1" />
                      Kategori Ekle
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card modern-card shadow-sm h-100">
              <div className="card-header modern-card-header">
                <div className="header-content">
                  <div className="header-icon-wrapper">
                    <div className="header-icon header-icon-actions">
                      <i className="fas fa-rocket" />
                    </div>
                  </div>
                  <div className="header-text">
                    <h4 className="header-title">Hızlı İşlemler</h4>
                    <p className="header-subtitle">Yönetim kısayolları</p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-6">
                    <Link
                      href="/admin/categories/create"
                      className="btn btn-action btn-action-primary w-100 py-3"
                    >
                      <div className="btn-icon">
                        <i className="fas fa-plus" />
                      </div>
                      <div className="btn-content">
                        <span className="btn-title">Kategori Ekle</span>
                        <small className="btn-subtitle">Yeni kategori oluştur</small>
                      </div>
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link
                      href="/admin/products/create"
                      className="btn btn-action btn-action-success w-100 py-3"
                    >
                      <div className="btn-icon">
                        <i className="fas fa-plus" />
                      </div>
                      <div className="btn-content">
                        <span className="btn-title">Ürün Ekle</span>
                        <small className="btn-subtitle">Yeni ürün ekle</small>
                      </div>
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link
                      href="/admin/categories"
                      className="btn btn-action btn-action-info w-100 py-3"
                    >
                      <div className="btn-icon">
                        <i className="fas fa-cog" />
                      </div>
                      <div className="btn-content">
                        <span className="btn-title">Kategorileri Yönet</span>
                        <small className="btn-subtitle">Düzenle &amp; sil</small>
                      </div>
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link
                      href="/admin/products"
                      className="btn btn-action btn-action-warning w-100 py-3"
                    >
                      <div className="btn-icon">
                        <i className="fas fa-shopping-bag" />
                      </div>
                      <div className="btn-content">
                        <span className="btn-title">Ürünleri Yönet</span>
                        <small className="btn-subtitle">Düzenle &amp; sil</small>
                      </div>
                    </Link>
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
