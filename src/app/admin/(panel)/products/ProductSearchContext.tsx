"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ProductSearchValue = {
  search: string;
  setSearch: (value: string) => void;
};

const ProductSearchContext = createContext<ProductSearchValue | null>(null);

/**
 * Arama kutusu sayfa başlığında, ürün listesi ise altında olduğu için
 * arama metni bu context üzerinden paylaşılır.
 */
export function ProductSearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const value = useMemo(() => ({ search, setSearch }), [search]);

  return (
    <ProductSearchContext.Provider value={value}>
      {children}
    </ProductSearchContext.Provider>
  );
}

export function useProductSearch(): ProductSearchValue {
  const context = useContext(ProductSearchContext);
  if (!context) {
    throw new Error("useProductSearch, ProductSearchProvider içinde kullanılmalıdır.");
  }
  return context;
}

/** Sayfa başlığındaki arama alanı (başlık ile "Ürün Ekle" düğmesi arasında). */
export function ProductSearchField({
  totalProducts,
}: {
  totalProducts: number;
}) {
  const { search, setSearch } = useProductSearch();

  return (
    <div className="page-search">
      <div className="page-search-input-group">
        <span className="page-search-icon">
          <i className="fas fa-search" />
        </span>
        <input
          type="text"
          className="page-search-input"
          id="product-search"
          placeholder="Ürün adı ile arama yapın..."
          title="Türkçe ve İngilizce ürün isimleri içinde arama yapabilirsiniz"
          aria-label="Türkçe ve İngilizce ürün isimleri içinde arama yapabilirsiniz"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {search && (
          <button
            className="page-search-clear"
            type="button"
            id="clear-search"
            aria-label="Aramayı temizle"
            onClick={() => setSearch("")}
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
      <span className="page-search-count badge bg-light text-dark d-none d-lg-inline-flex">
        <i className="fas fa-box me-1" />
        <span id="total-products">{totalProducts}</span> ürün
      </span>
    </div>
  );
}
