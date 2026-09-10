"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getAllergen, sortAllergens } from "@/lib/allergens";
import AllergenIcon from "@/components/AllergenIcon";

export type MenuProduct = {
  id: number;
  name_tr: string;
  name_en: string;
  desc_tr: string;
  desc_en: string;
  price: number;
  calories?: number;
  allergens: string[];
  image: string;
  categoryKey: string;
  categoryName_tr: string;
  categoryName_en: string;
};

type Lang = "tr" | "en";

type DetailState = {
  name: string;
  desc: string;
  price: number;
  calories?: number;
  allergens: string[];
  image: string;
} | null;

/** Kalori bilgisindeki alev ikonu. */
function FlameIcon() {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 448 512"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z" />
    </svg>
  );
}

function nameOf(product: MenuProduct, lang: Lang) {
  return lang === "tr"
    ? product.name_tr
    : product.name_en || product.name_tr || "Ürün";
}

function descOf(product: MenuProduct, lang: Lang) {
  return lang === "tr"
    ? product.desc_tr
    : product.desc_en || product.desc_tr || "";
}

/** category_products.blade.php içindeki tüm arayüz mantığının karşılığı. */
export default function CategoryProductsClient({
  categoryKey,
  categoryNameTr,
  categoryNameEn,
  headerImage,
  allProducts,
}: {
  categoryKey: string;
  categoryNameTr: string;
  categoryNameEn: string;
  headerImage: string;
  allProducts: MenuProduct[];
}) {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("tr");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  // Kapanış animasyonu sırasında içeriğin kaybolmaması için içerik ve açıklık ayrı tutulur
  const [detail, setDetail] = useState<DetailState>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    // Statik sayfa: dil bilgisi ilk render'dan sonra URL'den okunur.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (urlLang === "en" || urlLang === "tr") setLang(urlLang);
  }, []);

  const products = useMemo(
    () => allProducts.filter((product) => product.categoryKey === categoryKey),
    [allProducts, categoryKey]
  );

  const toggleLang = useCallback(() => {
    const next: Lang = lang === "tr" ? "en" : "tr";
    setLang(next);
    // URL güncellemesi state güncelleyicisinin içinde değil, olay işleyicisinde yapılır
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url);
  }, [lang]);

  // Arama açıldığında imleç doğrudan arama kutusuna gitsin
  useEffect(() => {
    if (!searchOpen) return;
    // Modalın açılma geçişi bittikten sonra odakla (gizli alan odaklanamaz)
    const timer = setTimeout(() => searchInputRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, [searchOpen]);

  // Modal açıkken gövde kaydırmasını engelle
  useEffect(() => {
    const locked = searchOpen || detailOpen;
    document.body.classList.toggle("no-scroll", locked);
    return () => document.body.classList.remove("no-scroll");
  }, [searchOpen, detailOpen]);

  // ESC ile kapatma
  useEffect(() => {
    if (!searchOpen && !detailOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (detailOpen) setDetailOpen(false);
      else if (searchOpen) setSearchOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [searchOpen, detailOpen]);

  const openDetail = useCallback(
    (product: MenuProduct) => {
      setDetail({
        name: nameOf(product, lang),
        desc: descOf(product, lang),
        price: product.price,
        calories: product.calories,
        allergens: product.allergens,
        image: product.image,
      });
      setDetailOpen(true);
    },
    [lang]
  );

  const searchResults = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return allProducts;
    return allProducts.filter((product) => {
      const name = nameOf(product, lang).toLowerCase();
      const desc = (descOf(product, lang) || "").toLowerCase();
      return name.includes(term) || desc.includes(term);
    });
  }, [allProducts, query, lang]);

  const categoryTitle = lang === "tr" ? categoryNameTr : categoryNameEn;

  return (
    <>
      <div className="container">
        <div className="header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="header-img"
            id="headerImg"
            src={headerImage}
            alt="Kategori Görseli"
            fetchPriority="high"
          />
          <div className="header-overlay" />
          <div className="header-controls">
            <button className="header-lang" id="lang-toggle" onClick={toggleLang}>
              {lang.toUpperCase()}
            </button>
            <div
              className="header-search"
              title="Ara"
              onClick={() => setSearchOpen(true)}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
          <div className="header-content">
            <div className="header-title" id="categoryTitle">
              {categoryTitle}
            </div>
            <button
              className="header-btn"
              id="backMenuBtn"
              onClick={() => router.push(`/categories?lang=${lang}`)}
            >
              {lang === "tr" ? "Menüye Dön" : "Back to Menu"}
            </button>
          </div>
        </div>

        <div className="main-content">
          {products.length > 0 ? (
            <div className="product-list" id="productList">
              {products.map((product, index) => {
                const productName = nameOf(product, lang);
                const productDesc = descOf(product, lang);
                return (
                  <div
                    key={product.id}
                    className="product-item"
                    onClick={() => openDetail(product)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="product-img"
                      src={product.image}
                      alt={productName}
                      loading={index < 6 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    <div className="product-info">
                      {/* 1. ve 2. satır: ad + açıklama; hizalarında sağda fiyat */}
                      <div className="product-header">
                        <div className="product-text">
                          <div className="product-name">{productName}</div>
                          {productDesc && (
                            <div className="product-desc">{productDesc}</div>
                          )}
                        </div>
                        <div className="product-price">{product.price}₺</div>
                      </div>

                      {/* 3. satır: solda kalori, sağda alerjen ikonları */}
                      {(product.calories !== undefined ||
                        product.allergens.length > 0) && (
                        <div className="product-meta">
                          {product.calories !== undefined && (
                            <span className="product-calories">
                              <FlameIcon />
                              {product.calories} kcal
                            </span>
                          )}
                          {product.allergens.length > 0 && (
                            <span className="product-allergen-icons">
                              {sortAllergens(product.allergens).map((id) => {
                                const allergen = getAllergen(id)!;
                                const name =
                                  lang === "tr"
                                    ? allergen.name_tr
                                    : allergen.name_en;
                                return (
                                  <span
                                    className="allergen-icon"
                                    key={id}
                                    title={name}
                                  >
                                    <AllergenIcon
                                      id={id}
                                      size={15}
                                      title={name}
                                    />
                                  </span>
                                );
                              })}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state" id="emptyState">
              <div className="empty-icon">🍽️</div>
              <div className="empty-text">
                {lang === "tr"
                  ? "Bu kategoride ürün bulunmuyor"
                  : "No products in this category"}
              </div>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-contact footer-contact-box">
                <div className="footer-logo" style={{ marginBottom: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/img/meringa-renkli.png"
                    alt="Meringa Logo"
                    className="footer-logo-img"
                    loading="lazy"
                  />
                </div>
                <div className="footer-social" style={{ marginBottom: "8px" }}>
                  <a
                    href="https://www.instagram.com/meringabakeryy/"
                    target="_blank"
                    rel="noopener"
                    className="social-link instagram"
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 448 512"
                      fill="#b88900"
                      aria-hidden="true"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://maps.app.goo.gl/dfMfdrm7aXaPamyf6"
                    target="_blank"
                    rel="noopener"
                    className="social-link maps"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Haritalar</span>
                  </a>
                </div>
                <div className="contact-item">
                  <svg
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>
                    Yeşilköy Mahallesi, Şehit Özcan Canik Sokak, No: 3/70B Bakırköy,
                    Florya/İstanbul
                  </span>
                </div>
                <div className="contact-item">
                  <svg
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Her Gün 07:30 – 00:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reklam Çubuğu */}
          <div className="ad-bar">
            <div className="ad-content harpy-ad">
              <a
                href="https://harpysocial.com"
                target="_blank"
                rel="noopener"
                className="harpy-link"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/harpy-credit.png"
                  alt="Harpy Social"
                  className="harpy-credit"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </footer>
      </div>

      <WhatsAppButton />

      {/* Ürün Detay Modal */}
      <div
        className={`product-detail-modal${detailOpen ? " show" : ""}`}
        id="productDetailModal"
        onClick={(event) => {
          if (event.target === event.currentTarget) setDetailOpen(false);
        }}
      >
        <div className="product-detail-container">
          <button
            className="product-detail-close"
            id="closeProductDetail"
            onClick={() => setDetailOpen(false)}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="product-detail-image-container">
            {detail && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                className="product-detail-image"
                id="productDetailImage"
                src={detail.image}
                alt={detail.name}
              />
            )}
            <div className="product-detail-image-overlay" />
          </div>

          <div className="product-detail-content">
            <h2 className="product-detail-name" id="productDetailName">
              {detail?.name}
            </h2>
            <p className="product-detail-description" id="productDetailDescription">
              {detail?.desc}
            </p>

            <div className="product-detail-meta">
              <div className="product-detail-price-container">
                <div
                  className="product-detail-price-label"
                  id="productDetailPriceLabel"
                >
                  {lang === "tr" ? "Fiyat" : "Price"}
                </div>
                <div className="product-detail-price" id="productDetailPrice">
                  {detail?.price}
                </div>
              </div>

              {detail?.calories !== undefined && (
                <div className="product-detail-calorie-container">
                  <div className="product-detail-calorie-label">
                    {lang === "tr" ? "Kalori" : "Calories"}
                  </div>
                  <div className="product-detail-calorie">
                    {detail.calories}
                    <span className="product-detail-calorie-unit">kcal</span>
                  </div>
                </div>
              )}
            </div>

            {detail && detail.allergens.length > 0 && (
              <div className="product-detail-allergens">
                <div className="product-detail-allergens-title">
                  {lang === "tr" ? "Alerjenler" : "Allergens"}
                </div>
                <div className="product-detail-allergen-list">
                  {sortAllergens(detail.allergens).map((id) => {
                    const allergen = getAllergen(id)!;
                    const name =
                      lang === "tr" ? allergen.name_tr : allergen.name_en;
                    return (
                      <span className="product-detail-allergen" key={id}>
                        <AllergenIcon id={id} size={17} />
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Arama Modal */}
      <div
        className={`search-modal${searchOpen ? " show" : ""}`}
        id="searchModal"
        onClick={(event) => {
          if (event.target === event.currentTarget) setSearchOpen(false);
        }}
      >
        <div className="search-container">
          <div className="search-header">
            <h2 className="search-title">
              {lang === "tr" ? "Ürün Ara" : "Search Products"}
            </h2>
            <button
              className="search-close"
              id="closeSearch"
              onClick={() => setSearchOpen(false)}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              id="searchInput"
              ref={searchInputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                lang === "tr" ? "Ürün adını girin..." : "Enter product name..."
              }
            />
            <span className="search-icon">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </div>
          <div className="search-results" id="searchResults">
            {searchResults.length > 0 ? (
              searchResults.map((product) => {
                const productName = nameOf(product, lang);
                const productDesc = descOf(product, lang);
                const categoryName =
                  lang === "tr"
                    ? product.categoryName_tr
                    : product.categoryName_en || product.categoryName_tr;
                return (
                  <div
                    key={`${product.categoryKey}-${product.id}`}
                    className="search-result-item"
                    onClick={() => {
                      setSearchOpen(false);
                      if (product.categoryKey !== categoryKey) {
                        router.push(
                          `/category/${product.categoryKey}?lang=${lang}`
                        );
                      } else {
                        openDetail(product);
                      }
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="search-result-img"
                      src={product.image}
                      alt={productName}
                      loading="lazy"
                    />
                    <div className="search-result-info">
                      <div className="search-result-header">
                        <div className="search-result-name">{productName}</div>
                        <div className="search-result-price">
                          {product.price}₺
                        </div>
                      </div>
                      <div className="search-result-category">{categoryName}</div>
                      <div className="product-meta search-result-meta">
                        {productDesc && (
                          <span className="product-desc">{productDesc}</span>
                        )}
                        {product.calories !== undefined && (
                          <span className="product-calories">
                            <FlameIcon />
                            {product.calories} kcal
                          </span>
                        )}
                        {product.allergens.length > 0 && (
                          <span className="product-allergen-icons">
                            {sortAllergens(product.allergens).map((id) => {
                              const allergen = getAllergen(id)!;
                              const name =
                                lang === "tr"
                                  ? allergen.name_tr
                                  : allergen.name_en;
                              return (
                                <span
                                  className="allergen-icon"
                                  key={id}
                                  title={name}
                                >
                                  <AllergenIcon id={id} size={14} title={name} />
                                </span>
                              );
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <div className="no-results-text">
                  {lang === "tr" ? "Ürün bulunamadı" : "No products found"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
