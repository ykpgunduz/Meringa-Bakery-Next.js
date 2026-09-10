import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/welcome.css";
import MenuButton from "./MenuButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import AllergenNoticeModal from "./AllergenNoticeModal";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/seo";

export const viewport: Viewport = {
  themeColor: "#853b17",
};

export const metadata: Metadata = {
  title: {
    absolute: "Meringa Bakery & Cafe | Dijital QR Menü",
  },
  description:
    "Meringa Bakery & Cafe dijital menüsü: Taze artizan pastane lezzetleri, el yapımı tatlılar, zengin kahvaltılıklar ve özel kahvelerimizi güncel fiyatlarıyla keşfedin.",
  alternates: {
    canonical: "/qr-menu",
  },
  openGraph: {
    title: "Meringa Bakery & Cafe | Dijital QR Menü",
    description:
      "Meringa Bakery & Cafe'nin taze artizan pastane lezzetleri, tatlıları, zengin kahvaltı ve özel kahve çeşitlerini dijital menümüzde keşfedin.",
    url: "/qr-menu",
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary",
    title: "Meringa Bakery & Cafe | Dijital QR Menü",
    description:
      "Meringa Bakery & Cafe'nin taze artizan pastane lezzetleri, tatlıları, zengin kahvaltı ve özel kahve çeşitlerini dijital menümüzde keşfedin.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

/** Laravel: resources/views/welcome.blade.php */
export default function WelcomePage() {
  return (
    <div className={`page-welcome ${montserrat.variable}`}>
      {/* Arama motorları için semantik H1 başlığı */}
      <h1 className="sr-only">Meringa Bakery &amp; Cafe - Dijital QR Menü</h1>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/bg.jpg" alt="Kafe Arka Plan" className="bg-image" fetchPriority="high" />
      <div className="bg-overlay" />

      {/* Alerjen Bilgilendirme Butonu ve Popup */}
      <AllergenNoticeModal />

      <div className="center-content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/meringa.png"
          alt="Meringa Cafe Logo"
          style={{
            maxWidth: "260px",
            marginBottom: "1.5rem",
            marginTop: "-100px",
            display: "block",
          }}
          fetchPriority="high"
        />
        <MenuButton />
      </div>

      {/* Sabit WhatsApp Butonu */}
      <WhatsAppButton />
    </div>
  );
}
