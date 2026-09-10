import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/welcome.css";
import MenuButton from "./MenuButton";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meringa Bakery QR Menü",
};

/** Laravel: resources/views/welcome.blade.php */
export default function WelcomePage() {
  return (
    <div className={`page-welcome ${montserrat.variable}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/bg.jpg" alt="Kafe Arka Plan" className="bg-image" fetchPriority="high" />
      <div className="bg-overlay" />
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
    </div>
  );
}
