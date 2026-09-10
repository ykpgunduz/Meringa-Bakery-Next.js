"use client";

import { useEffect } from "react";

/** Flash çerezi ekranda gösterildikten sonra temizlenir (Laravel'deki tek seferlik session mesajı). */
export default function FlashCleanup() {
  useEffect(() => {
    document.cookie = "flash=; Max-Age=0; path=/";
  }, []);
  return null;
}
