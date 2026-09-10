"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";

export type CategoryCard = {
  key: string;
  name_tr: string;
  name_en: string;
  image: string;
};

/**
 * category.blade.php içindeki dil değiştirme + kategori listeleme scriptinin karşılığı.
 * Veriler sunucuda hazırlandığı için tarayıcıda ek bir products.json isteği yapılmaz.
 */
export default function CategoriesClient({
  categories,
}: {
  categories: CategoryCard[];
}) {
  const router = useRouter();
  const [lang, setLang] = useState<"tr" | "en">("tr");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    // Sayfa statik üretildiği için dil, blade sürümündeki gibi ilk render'dan
    // sonra URL'den okunur (sunucuda window yok).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (urlLang === "en" || urlLang === "tr") setLang(urlLang);
  }, []);

  const setLanguage = useCallback((next: "tr" | "en") => {
    setLang(next);
    window.localStorage.setItem("lang", next);
  }, []);

  const openCategory = useCallback(
    (key: string) => {
      router.push(`/category/${key}?lang=${lang}`);
    },
    [router, lang]
  );

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/meringa.png" alt="Logo" fetchPriority="high" />
        </div>
        <div className="lang-switcher">
          <button
            className={`lang-btn${lang === "tr" ? " active" : ""}`}
            id="lang-tr"
            onClick={() => setLanguage("tr")}
          >
            TR
          </button>
          <button
            className={`lang-btn${lang === "en" ? " active" : ""}`}
            id="lang-en"
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
        </div>
      </nav>

      <div className="category-container">
        <div className="category-grid" id="categoryGrid">
          {categories.map((category, index) => {
            const name = lang === "tr" ? category.name_tr : category.name_en;
            return (
              <div
                key={category.key}
                className="category-card"
                onClick={() => openCategory(category.key)}
                onMouseEnter={() => router.prefetch(`/category/${category.key}`)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="category-bg"
                  src={category.image}
                  alt={name}
                  loading={index < 4 ? "eager" : "lazy"}
                  fetchPriority={index < 2 ? "high" : "auto"}
                />
                <div className="category-overlay" />
                <div className="category-content">
                  <div className="category-name">{name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <WhatsAppButton />
    </>
  );
}
