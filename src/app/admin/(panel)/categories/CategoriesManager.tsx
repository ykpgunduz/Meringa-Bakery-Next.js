"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useReorderIndicator } from "@/components/toasts";
import { useSortable } from "@/components/useSortable";
import { deleteCategoryAction, reorderCategoriesAction } from "../../actions";

export type AdminCategoryRow = {
  key: string;
  name_tr: string;
  name_en: string;
  imageUrl: string | null;
  productCount: number;
};

/** categories.blade.php içindeki listeleme + sürükle-bırak sıralama mantığının karşılığı. */
export default function CategoriesManager({
  categories: initialCategories,
}: {
  categories: AdminCategoryRow[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const { showReorderIndicator, reorderIndicator } = useReorderIndicator();
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const handleReorder = useCallback(
    async (keys: string[]) => {
      const previous = categories;
      const reordered = keys
        .map((key) => previous.find((category) => category.key === key))
        .filter((category): category is AdminCategoryRow => Boolean(category));

      if (reordered.length !== previous.length) return;

      setCategories(reordered);
      showReorderIndicator("Sıralama kaydediliyor...");

      const result = await reorderCategoriesAction(keys);

      if ("error" in result) {
        setCategories(previous);
        showReorderIndicator("Sıralama kaydedilemedi!", "error");
        return;
      }

      showReorderIndicator(
        "Kategori sıralaması başarıyla kaydedildi!",
        "success"
      );
    },
    [categories, showReorderIndicator]
  );

  useSortable(tbodyRef, ".drag-handle", handleReorder, ".sortable-row", "categoryKey");
  useSortable(
    mobileRef,
    ".mobile-drag-handle",
    handleReorder,
    ".sortable-mobile-card",
    "categoryKey"
  );

  const confirmDelete = (event: React.FormEvent<HTMLFormElement>) => {
    if (
      !window.confirm(
        "Bu kategoriyi ve içindeki tüm ürünleri silmek istediğinizden emin misiniz?"
      )
    ) {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="card modern-card shadow-sm">
        <div className="card-header modern-card-header">
          <div className="d-flex align-items-center">
            <div className="header-icon header-icon-categories">
              <i className="fas fa-list" />
            </div>
            <div>
              <h6 className="mb-0 fw-bold text-white">Kategoriler</h6>
              <small className="text-white-50">
                {categories.length} kategori mevcut
              </small>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          {categories.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="modern-table d-none d-md-block">
                <div className="table-responsive">
                  <table className="table table-modern mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: "40px" }}>Sıra</th>
                        <th>Kategori</th>
                        <th>Anahtar</th>
                        <th>Ürün Sayısı</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="sortable-tbody" ref={tbodyRef}>
                      {categories.map((category) => (
                        <tr
                          key={category.key}
                          className="table-row-modern sortable-row"
                          data-category-key={category.key}
                        >
                          <td>
                            <div className="drag-handle">
                              <i className="fas fa-grip-vertical" />
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="category-image">
                                {category.imageUrl ? (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img
                                    src={category.imageUrl}
                                    alt={category.name_tr}
                                    className="category-img"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="category-img-placeholder">
                                    <i className="fas fa-image" />
                                  </div>
                                )}
                              </div>
                              <div className="ms-3">
                                <div className="category-title">
                                  {category.name_tr}
                                </div>
                                <div className="category-subtitle">
                                  {category.name_en}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="code-badge">{category.key}</span>
                          </td>
                          <td>
                            <span className="count-badge">
                              {category.productCount}
                              <small>ürün</small>
                            </span>
                          </td>
                          <td className="text-end">
                            <div className="action-buttons">
                              <Link
                                href={`/admin/categories/${category.key}/edit`}
                                className="btn btn-action-edit"
                                title="Düzenle"
                              >
                                <i className="fas fa-edit" />
                              </Link>
                              <form
                                action={deleteCategoryAction}
                                className="d-inline"
                                onSubmit={confirmDelete}
                              >
                                <input
                                  type="hidden"
                                  name="key"
                                  value={category.key}
                                />
                                <button
                                  type="submit"
                                  className="btn btn-action-delete"
                                  title="Sil"
                                >
                                  <i className="fas fa-trash" />
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="d-md-none mobile-cards">
                <div className="sortable-mobile-container" ref={mobileRef}>
                  {categories.map((category) => (
                    <div
                      key={category.key}
                      className="mobile-card sortable-mobile-card"
                      data-category-key={category.key}
                    >
                      <div className="mobile-drag-handle">
                        <i className="fas fa-grip-horizontal" />
                      </div>
                      <div className="mobile-card-content">
                        <div className="d-flex align-items-center mb-3">
                          <div className="category-image">
                            {category.imageUrl ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={category.imageUrl}
                                alt={category.name_tr}
                                className="category-img"
                                loading="lazy"
                              />
                            ) : (
                              <div className="category-img-placeholder">
                                <i className="fas fa-image" />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow-1 ms-3 me-3">
                            <div className="category-title">{category.name_tr}</div>
                            <div className="category-subtitle">
                              {category.name_en}
                            </div>
                          </div>
                          <div className="mobile-count-container">
                            <span className="count-badge">
                              {category.productCount}
                              <small>ürün</small>
                            </span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="code-badge">{category.key}</span>
                          <div className="action-buttons">
                            <Link
                              href={`/admin/categories/${category.key}/edit`}
                              className="btn btn-action-edit me-2"
                            >
                              <i className="fas fa-edit me-1" />
                              Düzenle
                            </Link>
                            <form
                              action={deleteCategoryAction}
                              className="d-inline"
                              onSubmit={confirmDelete}
                            >
                              <input
                                type="hidden"
                                name="key"
                                value={category.key}
                              />
                              <button
                                type="submit"
                                className="btn btn-action-delete"
                              >
                                <i className="fas fa-trash me-1" />
                                Sil
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-list-alt" />
              </div>
              <h6 className="empty-title">Henüz kategori yok</h6>
              <p className="empty-text">İlk kategorinizi oluşturarak başlayın</p>
              <Link href="/admin/categories/create" className="btn btn-primary">
                <i className="fas fa-plus me-2" />
                İlk Kategorinizi Ekleyin
              </Link>
            </div>
          )}
        </div>
      </div>

      {reorderIndicator}
    </>
  );
}
