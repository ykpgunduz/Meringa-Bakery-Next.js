"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { useSortable } from "@/components/useSortable";
import { getAllergen, sortAllergens } from "@/lib/allergens";
import AllergenIcon from "@/components/AllergenIcon";
import type { AdminCategory, AdminProduct, SortState } from "./ProductsManager";

function sortIconClass(sort: SortState, field: "price" | "status") {
  if (!sort || sort.field !== field) return "fas fa-sort sort-icon";
  return sort.direction === "asc"
    ? "fas fa-sort-up sort-icon"
    : "fas fa-sort-down sort-icon";
}

function sortDirection(sort: SortState, field: "price" | "status") {
  if (!sort || sort.field !== field) return "default";
  return sort.direction;
}

function mobileLabel(sort: SortState, field: "price" | "status") {
  if (!sort || sort.field !== field) {
    return field === "price" ? "Fiyata Göre Sırala" : "Duruma Göre Sırala";
  }
  if (field === "price") {
    return sort.direction === "asc" ? "Düşük → Yüksek" : "Yüksek → Düşük";
  }
  return sort.direction === "asc" ? "Aktif → Pasif" : "Pasif → Aktif";
}

export default function CategoryProductList({
  category,
  products,
  totalCount,
  searchTerm,
  sort,
  onSort,
  onToggleActive,
  onReorder,
  onDelete,
}: {
  category: AdminCategory;
  products: AdminProduct[];
  totalCount: number;
  searchTerm: string;
  sort: SortState;
  onSort: (categoryKey: string, field: "price" | "status") => void;
  onToggleActive: (
    categoryKey: string,
    productId: number,
    active: boolean
  ) => void;
  onReorder: (categoryKey: string, orderedIds: number[]) => void;
  onDelete: (formData: FormData) => void;
}) {
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const handleReorder = useCallback(
    (ids: string[]) => onReorder(category.key, ids.map(Number)),
    [category.key, onReorder]
  );

  useSortable(tbodyRef, ".drag-handle", handleReorder, ".sortable-row", "productId");
  useSortable(
    mobileRef,
    ".mobile-drag-handle",
    handleReorder,
    ".sortable-mobile-card",
    "productId"
  );

  // Arama sonucunda eşleşme yoksa kategori kartı gizlenir (products.blade.php filterProducts)
  if (searchTerm !== "" && products.length === 0) return null;

  const confirmDelete = (event: React.FormEvent<HTMLFormElement>) => {
    if (!window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      event.preventDefault();
    }
  };

  return (
    <div className="card modern-card shadow-sm mb-4">
      <div className="card-header modern-card-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="header-icon header-icon-category">
              <i className="fas fa-folder" />
            </div>
            <div>
              <h6 className="mb-0 fw-bold text-white">{category.name_tr}</h6>
              <small className="text-white-50">{category.name_en}</small>
            </div>
          </div>
          <span className="category-count-badge">
            {totalCount}
            <small>ürün</small>
          </span>
        </div>
      </div>
      <div className="card-body p-0">
        {totalCount > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="modern-table d-none d-md-block">
              <div className="table-responsive">
                <table className="table table-modern mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: "40px" }}>Sıra</th>
                      <th style={{ width: "80px" }}>Resim</th>
                      <th>Ürün Adı</th>
                      <th>Açıklama</th>
                      <th
                        className="sortable-header"
                        data-sort="price"
                        style={{ cursor: "pointer" }}
                        onClick={() => onSort(category.key, "price")}
                      >
                        Fiyat
                        <i
                          className={sortIconClass(sort, "price")}
                          data-sort-direction={sortDirection(sort, "price")}
                        />
                      </th>
                      <th style={{ width: "110px" }}>Kalori</th>
                      <th
                        className="sortable-header"
                        data-sort="status"
                        style={{ width: "100px", cursor: "pointer" }}
                        onClick={() => onSort(category.key, "status")}
                      >
                        Durum
                        <i
                          className={sortIconClass(sort, "status")}
                          data-sort-direction={sortDirection(sort, "status")}
                        />
                      </th>
                      <th style={{ width: "120px" }} className="text-end">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className="sortable-tbody"
                    data-category={category.key}
                    ref={tbodyRef}
                  >
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="table-row-modern sortable-row"
                        data-product-id={product.id}
                      >
                        <td>
                          <div className="drag-handle">
                            <i className="fas fa-grip-vertical" />
                          </div>
                        </td>
                        <td>
                          <div className="product-image">
                            {product.imageUrl ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={product.imageUrl}
                                alt={product.name_tr}
                                className="product-img"
                                loading="lazy"
                              />
                            ) : (
                              <div className="product-img-placeholder">
                                <i className="fas fa-image" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="product-info">
                            <div className="product-title">{product.name_tr}</div>
                            <div className="product-subtitle">
                              {product.name_en}
                            </div>
                            {product.allergens.length > 0 && (
                              <div className="product-allergen-tags">
                                {sortAllergens(product.allergens).map((id) => (
                                  <span className="allergen-tag" key={id}>
                                    <AllergenIcon id={id} size={13} />
                                    {getAllergen(id)!.name_tr}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="product-desc">
                            <div className="desc-tr">{product.desc_tr}</div>
                            <div className="desc-en">{product.desc_en}</div>
                          </div>
                        </td>
                        <td>
                          <span className="price-badge">₺{product.price}</span>
                        </td>
                        <td>
                          {product.calories !== undefined ? (
                            <span className="calorie-badge">
                              <i className="fas fa-fire" />
                              {product.calories} kcal
                            </span>
                          ) : (
                            <span className="calorie-empty">—</span>
                          )}
                        </td>
                        <td>
                          <div className="status-toggle">
                            <input
                              className="toggle-input product-toggle"
                              type="checkbox"
                              id={`active-${category.key}-${product.id}`}
                              checked={product.active}
                              onChange={(event) =>
                                onToggleActive(
                                  category.key,
                                  product.id,
                                  event.target.checked
                                )
                              }
                            />
                            <label
                              className="toggle-label"
                              htmlFor={`active-${category.key}-${product.id}`}
                            >
                              <span className="toggle-slider" />
                              <span className="status-text">
                                {product.active ? "Aktif" : "Pasif"}
                              </span>
                            </label>
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="action-buttons">
                            <Link
                              href={`/admin/products/${category.key}/${product.id}/edit`}
                              className="btn btn-action-edit"
                              title="Düzenle"
                            >
                              <i className="fas fa-edit" />
                            </Link>
                            <form
                              action={onDelete}
                              className="d-inline"
                              onSubmit={confirmDelete}
                            >
                              <input
                                type="hidden"
                                name="category"
                                value={category.key}
                              />
                              <input type="hidden" name="id" value={product.id} />
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
            <div className="mobile-cards d-block d-md-none">
              <div className="mobile-sort-controls">
                <button
                  className={`mobile-sort-btn${
                    sort?.field === "price" ? " active" : ""
                  }`}
                  data-category={category.key}
                  data-sort="price"
                  onClick={() => onSort(category.key, "price")}
                >
                  <i className={sortIconClass(sort, "price").replace(" sort-icon", "")} />
                  {mobileLabel(sort, "price")}
                </button>
                <button
                  className={`mobile-sort-btn${
                    sort?.field === "status" ? " active" : ""
                  }`}
                  data-category={category.key}
                  data-sort="status"
                  onClick={() => onSort(category.key, "status")}
                >
                  <i
                    className={sortIconClass(sort, "status").replace(" sort-icon", "")}
                  />
                  {mobileLabel(sort, "status")}
                </button>
              </div>
              <div
                className="sortable-mobile-container"
                data-category={category.key}
                ref={mobileRef}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="mobile-product-card sortable-mobile-card"
                    data-product-id={product.id}
                  >
                    <div className="mobile-drag-handle">
                      <i className="fas fa-grip-horizontal" />
                    </div>
                    <div className="product-card-content">
                      <div className="product-card-image">
                        {product.imageUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={product.imageUrl}
                            alt={product.name_tr}
                            className="product-mobile-img"
                            loading="lazy"
                          />
                        ) : (
                          <div className="product-mobile-placeholder">
                            <i className="fas fa-image" />
                          </div>
                        )}
                      </div>
                      <div className="product-card-info">
                        <div className="product-card-header">
                          <div className="product-title">{product.name_tr}</div>
                          <div className="product-subtitle">{product.name_en}</div>
                          {product.allergens.length > 0 && (
                            <div className="product-allergen-tags">
                              {sortAllergens(product.allergens).map((id) => (
                                <span className="allergen-tag" key={id}>
                                  <AllergenIcon id={id} size={13} />
                                  {getAllergen(id)!.name_tr}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="product-card-desc">
                          <div className="desc-tr">{product.desc_tr}</div>
                          <div className="desc-en">{product.desc_en}</div>
                        </div>
                        <div className="product-card-price">
                          <span className="price-badge">₺{product.price}</span>
                          {product.calories !== undefined && (
                            <span className="calorie-badge">
                              <i className="fas fa-fire" />
                              {product.calories} kcal
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="product-card-footer">
                      <div className="status-toggle">
                        <input
                          className="toggle-input product-toggle"
                          type="checkbox"
                          id={`mobile-active-${category.key}-${product.id}`}
                          checked={product.active}
                          onChange={(event) =>
                            onToggleActive(
                              category.key,
                              product.id,
                              event.target.checked
                            )
                          }
                        />
                        <label
                          className="toggle-label"
                          htmlFor={`mobile-active-${category.key}-${product.id}`}
                        >
                          <span className="toggle-slider" />
                          <span className="status-text">
                            {product.active ? "Aktif" : "Pasif"}
                          </span>
                        </label>
                      </div>
                      <div className="action-buttons">
                        <Link
                          href={`/admin/products/${category.key}/${product.id}/edit`}
                          className="btn btn-action-edit"
                          title="Düzenle"
                        >
                          <i className="fas fa-edit" />
                        </Link>
                        <form
                          action={onDelete}
                          className="d-inline"
                          onSubmit={confirmDelete}
                        >
                          <input
                            type="hidden"
                            name="category"
                            value={category.key}
                          />
                          <input type="hidden" name="id" value={product.id} />
                          <button
                            type="submit"
                            className="btn btn-action-delete"
                            title="Sil"
                          >
                            <i className="fas fa-trash" />
                          </button>
                        </form>
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
              <i className="fas fa-shopping-bag" />
            </div>
            <h5>Bu kategoride henüz ürün yok</h5>
            <p>Bu kategoriye ürün ekleyerek başlayın</p>
            <Link href="/admin/products/create" className="btn btn-modern-primary">
              <i className="fas fa-plus" />
              İlk Ürünü Ekle
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
