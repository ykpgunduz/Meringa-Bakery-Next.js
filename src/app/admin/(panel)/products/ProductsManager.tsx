"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useToasts, useReorderIndicator } from "@/components/toasts";
import {
  deleteProductAction,
  reorderProductsAction,
  toggleProductActiveAction,
} from "../../actions";
import CategoryProductList from "./CategoryProductList";
import { useProductSearch } from "./ProductSearchContext";

export type AdminProduct = {
  id: number;
  name_tr: string;
  name_en: string;
  desc_tr: string;
  desc_en: string;
  price: number;
  calories?: number;
  allergens: string[];
  active: boolean;
  imageUrl: string | null;
};

export type AdminCategory = { key: string; name_tr: string; name_en: string };

export type SortState = { field: "price" | "status"; direction: "asc" | "desc" } | null;

/** products.blade.php içindeki arama, sıralama, aktiflik ve sürükle-bırak mantığının karşılığı. */
export default function ProductsManager({
  categories,
  products: initialProducts,
}: {
  categories: AdminCategory[];
  products: Record<string, AdminProduct[]>;
}) {
  const [products, setProducts] = useState(initialProducts);
  // Arama kutusu sayfa başlığında durduğu için metin context'ten gelir
  const { search } = useProductSearch();
  const [sorts, setSorts] = useState<Record<string, SortState>>({});
  const [lastSearch, setLastSearch] = useState(search);
  const { showToast, toastContainer } = useToasts();
  const { showReorderIndicator, reorderIndicator } = useReorderIndicator();

  const searchTerm = search.toLowerCase().trim();

  // Arama yapıldığında sıralama durumu sıfırlanır (products.blade.php resetSortingState)
  if (search !== lastSearch) {
    setLastSearch(search);
    if (search.trim() !== "") setSorts({});
  }

  const toggleActive = useCallback(
    async (categoryKey: string, productId: number, active: boolean) => {
      setProducts((current) => ({
        ...current,
        [categoryKey]: current[categoryKey].map((product) =>
          product.id === productId ? { ...product, active } : product
        ),
      }));

      const result = await toggleProductActiveAction(
        categoryKey,
        productId,
        active
      );

      if ("error" in result) {
        setProducts((current) => ({
          ...current,
          [categoryKey]: current[categoryKey].map((product) =>
            product.id === productId ? { ...product, active: !active } : product
          ),
        }));
        showToast("Ürün durumu güncellenemedi. Lütfen tekrar deneyin.", "error");
        return;
      }

      showToast(
        `Ürün durumu ${active ? "aktif" : "pasif"} olarak güncellendi.`,
        "success"
      );
    },
    [showToast]
  );

  const reorder = useCallback(
    async (categoryKey: string, orderedIds: number[]) => {
      const previous = products[categoryKey];
      const reordered = orderedIds
        .map((id) => previous.find((product) => product.id === id))
        .filter((product): product is AdminProduct => Boolean(product));

      if (reordered.length !== previous.length) return;

      setProducts((current) => ({ ...current, [categoryKey]: reordered }));
      showReorderIndicator("Sıralama kaydediliyor...");

      const result = await reorderProductsAction(categoryKey, orderedIds);

      if ("error" in result) {
        setProducts((current) => ({ ...current, [categoryKey]: previous }));
        showReorderIndicator("Sıralama kaydedilemedi!", "error");
        return;
      }

      showReorderIndicator("Sıralama başarıyla kaydedildi!", "success");
    },
    [products, showReorderIndicator]
  );

  const cycleSort = useCallback(
    (categoryKey: string, field: "price" | "status") => {
      setSorts((current) => {
        const active = current[categoryKey];
        const direction =
          !active || active.field !== field
            ? "asc"
            : active.direction === "asc"
              ? "desc"
              : null;

        const next: SortState = direction ? { field, direction } : null;

        if (next) {
          const label =
            field === "price"
              ? direction === "asc"
                ? "düşükten yükseğe"
                : "yüksekten düşüğe"
              : direction === "asc"
                ? "aktif ürünler önce"
                : "pasif ürünler önce";
          showToast(
            field === "price"
              ? `Ürünler fiyata göre ${label} sıralandı.`
              : `Ürünler duruma göre sıralandı: ${label}.`,
            "success"
          );
        }

        return { ...current, [categoryKey]: next };
      });
    },
    [showToast]
  );

  const visibleCategories = useMemo(() => {
    return categories.map((category) => {
      const list = products[category.key] ?? [];
      const filtered = searchTerm
        ? list.filter(
            (product) =>
              product.name_tr.toLowerCase().includes(searchTerm) ||
              product.name_en.toLowerCase().includes(searchTerm)
          )
        : list;

      const sort = sorts[category.key];
      const sorted = sort
        ? [...filtered].sort((a, b) => {
            if (sort.field === "price") {
              return sort.direction === "asc"
                ? a.price - b.price
                : b.price - a.price;
            }
            return sort.direction === "asc"
              ? Number(b.active) - Number(a.active)
              : Number(a.active) - Number(b.active);
          })
        : filtered;

      return {
        category,
        total: list.length,
        items: sorted,
      };
    });
  }, [categories, products, searchTerm, sorts]);

  return (
    <>
      {categories.length === 0 && (
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-triangle me-2" />
          Ürün ekleyebilmek için önce kategori oluşturmalısınız.
          <Link href="/admin/categories/create" className="alert-link">
            Kategori eklemek için tıklayın.
          </Link>
        </div>
      )}

      {visibleCategories.map(({ category, items, total }) => (
        <CategoryProductList
          key={category.key}
          category={category}
          products={items}
          totalCount={total}
          searchTerm={searchTerm}
          sort={sorts[category.key] ?? null}
          onSort={cycleSort}
          onToggleActive={toggleActive}
          onReorder={reorder}
          onDelete={deleteProductAction}
        />
      ))}

      {categories.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-folder-open" />
          </div>
          <h5>Henüz kategori oluşturulmamış</h5>
          <p>Ürün ekleyebilmek için önce kategoriler oluşturmalısınız</p>
          <Link href="/admin/categories/create" className="btn btn-modern-primary">
            <i className="fas fa-list" />
            İlk Kategorinizi Ekleyin
          </Link>
        </div>
      )}

      {toastContainer}
      {reorderIndicator}
    </>
  );
}
