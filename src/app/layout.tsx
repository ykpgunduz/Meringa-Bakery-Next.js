import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, SEO_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | QR Menü`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Meringa Bakery & Cafe dijital QR menüsü. Taze artizan pastane lezzetleri, tatlılar, zengin kahvaltılıklar, bowl ve özel kahve çeşitlerimizi güncel fiyatlarıyla keşfedin.",
  applicationName: "Meringa Bakery",
  authors: [{ name: SITE_NAME }],
  generator: "Next.js",
  keywords: SEO_KEYWORDS,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Dijital QR Menü`,
    description:
      "Meringa Bakery & Cafe'nin enfes pastane lezzetleri, artizan tatlıları, kahvaltılıkları ve özel kahvelerini dijital QR menümüzden inceleyin.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary", // WhatsApp ve sosyal ağlarda link yapıştırıldığında mini kare ikon olarak görünmesini sağlar
    title: `${SITE_NAME} | QR Menü`,
    description:
      "Meringa Bakery & Cafe'nin artizan lezzetleri, tatlıları ve kahve çeşitleri dijital QR menümüzde.",
    images: [DEFAULT_OG_IMAGE.url],
    creator: "@meringabakeryy",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/img/favicon.png", sizes: "500x500", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "food",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#853b17",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Bakery", "CafeOrCoffeeShop", "FoodEstablishment"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: [
        "Meringa Cafe",
        "Meringa Bakery",
        "Meringa",
        "Meringa Pastanesi",
        "Meringa Cafe Menü",
      ],
      url: SITE_URL,
      logo: `${SITE_URL}/img/favicon.png`,
      image: `${SITE_URL}/og-image.jpg`,
      description:
        "Meringa Bakery & Cafe; taze fırın ve artizan pastane lezzetleri, tatlılar, zengin kahvaltılıklar, bowl ve özel kahve çeşitleri sunmaktadır.",
      telephone: "+905384088034",
      priceRange: "₺₺",
      servesCuisine: [
        "Pastane",
        "Bakery",
        "Kafe",
        "Cafe",
        "Tatlı",
        "Kahvaltı",
        "Kahve",
        "Bowl",
      ],
      hasMenu: {
        "@type": "Menu",
        name: "Meringa Bakery & Cafe Dijital Menü",
        url: `${SITE_URL}/qr-menu`,
      },
      sameAs: [
        "https://www.instagram.com/meringabakeryy/",
        "https://maps.app.goo.gl/dfMfdrm7aXaPamyf6",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "tr-TR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        <link rel="image_src" href={`${SITE_URL}/og-image.jpg`} />
        <meta name="image" content={`${SITE_URL}/og-image.jpg`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
