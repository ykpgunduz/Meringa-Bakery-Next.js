"use client";

import { useEffect, useState } from "react";
import { ALLERGENS } from "@/lib/allergens";
import AllergenIcon from "@/components/AllergenIcon";

export default function AllergenNoticeModal() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"tr" | "en">("tr");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resolved =
      (params.get("lang") as "tr" | "en") ||
      (window.localStorage.getItem("lang") as "tr" | "en") ||
      "tr";
    // Statik sayfa: dil URL/localStorage'dan ilk render'dan sonra okunur.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(resolved === "en" ? "en" : "tr");
  }, []);

  // Modal açıkken arka plan kaydırmasını engelle
  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  // ESC ile kapatma
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {/* Köşedeki Tetikleyici Buton */}
      <button
        type="button"
        className="allergen-trigger-btn"
        id="allergenNoticeBtn"
        onClick={() => setOpen(true)}
        aria-label={lang === "tr" ? "Alerjen Bildirimi" : "Allergen Information"}
      >
        <span>{lang === "tr" ? "Alerjen Bildirimi" : "Allergen Info"}</span>
      </button>

      {/* Alerjen Bilgilendirme Modalı */}
      {open && (
        <div
          className="allergen-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="allergenModalTitle"
        >
          <div className="allergen-modal-card">
            {/* Modal Başlığı */}
            <div className="allergen-modal-header">
              <div className="allergen-modal-header-text">
                <h2 id="allergenModalTitle" className="allergen-modal-title">
                  {lang === "tr"
                    ? "Alerjen Bildirimi ve Rehberi"
                    : "Allergen Declaration & Guide"}
                </h2>
                <p className="allergen-modal-subtitle">
                  {lang === "tr"
                    ? "T.C. Tarım ve Orman Bakanlığı Türk Gıda Kodeksi uyarınca 14 temel alerjen bildirimi"
                    : "Declaration of 14 mandatory food allergens pursuant to official regulations"}
                </p>
              </div>

              <button
                type="button"
                className="allergen-modal-close"
                onClick={() => setOpen(false)}
                aria-label={lang === "tr" ? "Kapat" : "Close"}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Gövdesi */}
            <div className="allergen-modal-body">
              {/* Ürünlerde Nasıl Görünür? Önizleme Kutusu */}
              <div className="allergen-preview-box">
                <div className="allergen-preview-header">
                  <span className="allergen-preview-title">
                    {lang === "tr"
                      ? "Menüde Nasıl Gösterilir?"
                      : "How It Appears on the Menu"}
                  </span>
                </div>
                <p className="allergen-preview-desc">
                  {lang === "tr"
                    ? "Menüdeki ürünlerin alt satırında, içerdiği alerjenler simgeleriyle ve 'Alerjenler:' başlığı ile belirtilmektedir. Üzerine dokunarak ürün detayında alerjenlerin tam isimlerini de görebilirsiniz."
                    : "In our product lists, allergens contained in each item are indicated with dedicated icons under 'Allergens:'. Tap any item to see full details."}
                </p>

                {/* Görsel Temsili Örnek Kart */}
                <div className="allergen-demo-card">
                  <div className="allergen-demo-info">
                    <span className="allergen-demo-name">
                      {lang === "tr" ? "Ispanaklı Labneli Fupas" : "Spinach Labneh Fupas"}
                    </span>
                    <span className="allergen-demo-price">40₺</span>
                  </div>
                  <div className="allergen-demo-meta">
                    <span className="allergen-demo-cal">
                      <svg width="10" height="12" viewBox="0 0 448 512" fill="currentColor">
                        <path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4z" />
                      </svg>
                      200 kcal
                    </span>
                    <div className="allergen-demo-icons">
                      <span className="allergen-demo-label">
                        {lang === "tr" ? "Alerjenler:" : "Allergens:"}
                      </span>
                      <span className="allergen-demo-badge" title="Glüten">
                        <AllergenIcon id="gluten" size={13} />
                      </span>
                      <span className="allergen-demo-badge" title="Süt">
                        <AllergenIcon id="sut" size={13} />
                      </span>
                      <span className="allergen-demo-badge" title="Yumurta">
                        <AllergenIcon id="yumurta" size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerjenlerin Listesi (14 Temel Alerjen) */}
              <div className="allergen-list-section">
                <h3 className="allergen-section-heading">
                  {lang === "tr"
                    ? "Bakanlık Mevzuatına Tabi 14 Temel Alerjen"
                    : "14 Mandatory Allergens & Descriptions"}
                </h3>
                <div className="allergen-grid">
                  {ALLERGENS.map((allergen, index) => {
                    const name = lang === "tr" ? allergen.name_tr : allergen.name_en;
                    const desc =
                      lang === "tr"
                        ? allergen.hint_tr
                        : allergen.hint_en || allergen.hint_tr;
                    return (
                      <div key={allergen.id} className="allergen-item">
                        <div className="allergen-item-icon">
                          <AllergenIcon id={allergen.id} size={20} title={name} />
                        </div>
                        <div className="allergen-item-content">
                          <div className="allergen-item-title">
                            {index + 1}. {name}
                          </div>
                          <div className="allergen-item-desc">{desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Butonu */}
            <div className="allergen-modal-footer">
              <button
                type="button"
                className="allergen-modal-confirm-btn"
                onClick={() => setOpen(false)}
              >
                {lang === "tr" ? "Anladım, Teşekkürler" : "Understood, Thank You"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
