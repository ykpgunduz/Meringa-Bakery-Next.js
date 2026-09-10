"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * welcome.blade.php içindeki dil scriptinin karşılığı:
 * dil URL parametresinden ya da localStorage'dan alınır, buton metni ona göre yazılır
 * ve kategori sayfasına dil bilgisi ile gidilir.
 */
export default function MenuButton() {
  const router = useRouter();
  const [lang, setLang] = useState("tr");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resolved =
      params.get("lang") || window.localStorage.getItem("lang") || "tr";
    window.localStorage.setItem("lang", resolved);
    // Statik sayfa: dil URL/localStorage'dan ilk render'dan sonra okunur.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(resolved);
    router.prefetch(`/categories?lang=${resolved}`);
  }, [router]);

  return (
    <a
      className="action-btn"
      id="menuBtn"
      href={`/categories?lang=${lang}`}
      onClick={(event) => {
        event.preventDefault();
        router.push(`/categories?lang=${lang}`);
      }}
    >
      {lang === "tr" ? "MENÜ" : "MENU"}
    </a>
  );
}
