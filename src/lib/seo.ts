export const SITE_NAME = "Meringa Bakery & Cafe";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://meringa.harpysocial.com";

/**
 * WhatsApp, iMessage, Telegram ve sosyal medya paylaşımlarında
 * önizleme görseli (thumbnail) olarak kafenin gerçek cephe fotoğrafı kullanılır.
 */
export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  secureUrl: `${SITE_URL}/og-image.jpg`,
  width: 768,
  height: 768,
  alt: "Meringa Bakery & Cafe",
  type: "image/jpeg",
};

export const SEO_KEYWORDS = [
  "Meringa",
  "Meringa Cafe",
  "Meringa Bakery",
  "Meringa QR Menü",
  "Meringa Menü",
  "Meringa Pastanesi",
  "Meringa Fırın",
  "Meringa Kahvaltı",
  "Meringa Tatlı",
  "Meringa Tatlılar",
  "Meringa Kahveler",
  "QR Menü",
  "Dijital Menü",
  "Artizan Fırın",
  "Cafe Menüsü",
  "Bakery Cafe",
  "Online Menü",
  "İstanbul Bakery Cafe",
];
