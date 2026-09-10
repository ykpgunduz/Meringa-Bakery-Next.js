import type { AllergenId } from "@/lib/allergens";
import {
  Wheat,
  Shrimp,
  Fish,
  Nut,
  Milk,
  Wine,
  LeafyGreen,
  Flower2,
} from "lucide-react";

/**
 * Yumurta ikonu: Yumurta formu ve içinde sarısı (yolk)
 */
function EggWithYolk({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2C7.5 2 4 7.5 4 13.5a8 8 0 0 0 16 0C20 7.5 16.5 2 12 2z" />
      <circle cx="12" cy="14" r="3.2" fill="currentColor" fillOpacity="0.18" />
    </svg>
  );
}

/**
 * Yerfıstığı ikonu: Çift boğumlu fıstık kabuğu
 */
function PeanutIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15.5 3.5a4.2 4.2 0 0 0-3.6 2c-.6.9-.7 1.8-.6 2.7-.9.1-1.8.6-2.5 1.3A4.8 4.8 0 0 0 7.5 13c0 1.5.7 2.9 1.8 3.8-.1.9.1 1.8.7 2.6a4.2 4.2 0 0 0 3.5 2.1c1.5 0 2.9-.8 3.7-2.1.6-.9.7-1.8.6-2.7.9-.1 1.8-.6 2.5-1.3a4.8 4.8 0 0 0 1.3-3.4c0-1.5-.7-2.9-1.8-3.8.1-.9-.1-1.8-.7-2.6a4.2 4.2 0 0 0-3.7-2.1z" />
      <path d="M10.8 10c.4.4 1.2.4 1.6 0" />
      <path d="M11.6 14.5c.4.4 1.2.4 1.6 0" />
    </svg>
  );
}

/**
 * Soya fasulyesi ikonu: Açık soya baklası ve içinde 3 fasulye tanesi
 */
function SoybeanIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 19.5C8 22 17 19.5 20.5 4.5c-6-1-14.5 3-17 15z" />
      <circle cx="8" cy="16" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12.5" r="1.6" fill="currentColor" />
      <circle cx="16" cy="9" r="1.6" fill="currentColor" />
    </svg>
  );
}

/**
 * Hardal ikonu: Sos/hardal şişesi ve hardal damlası
 */
function MustardIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="7" y="9" width="10" height="12" rx="2.5" />
      <path d="M9.5 9V5.5a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5V9" />
      <path d="M12 4V2" />
      <path
        d="M12 12.5c-.8 1-1.2 1.7-1.2 2.3a1.2 1.2 0 0 0 2.4 0c0-.6-.4-1.3-1.2-2.3z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Susam tohumları ikonu: Üç adet susam tanesi
 */
function SesameIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3c-1.3 2.2-2.5 4.5-2.5 6.2a2.5 2.5 0 0 0 5 0c0-1.7-1.2-4-2.5-6.2z" />
      <path d="M6 13.5c-.9 1.8-1.8 3.5-1.8 4.8a2 2 0 0 0 4 0c0-1.3-.9-3-2.2-4.8z" />
      <path d="M18 13.5c.9 1.8 1.8 3.5 1.8 4.8a2 2 0 0 1-4 0c0-1.3.9-3 2.2-4.8z" />
    </svg>
  );
}

/**
 * Yumuşakçalar (Midye / İstiridye) ikonu: Yelpaze şeklinde deniz kabuğu
 */
function ScallopIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21c-5.5 0-9.5-4-9.5-9.5 0-5 3.5-8.5 9.5-8.5s9.5 3.5 9.5 8.5c0 5.5-4 9.5-9.5 9.5z" />
      <path d="M12 3v18" />
      <path d="M6.5 6.5l4 14" />
      <path d="M17.5 6.5l-4 14" />
      <path d="M9 21h6" />
    </svg>
  );
}

export default function AllergenIcon({
  id,
  size = 18,
  title,
}: {
  id: AllergenId;
  size?: number;
  title?: string;
}) {
  const strokeWidth = 2.2;

  const renderIcon = () => {
    switch (id) {
      case "gluten":
        return <Wheat size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
      case "kabuklu-deniz":
        return <Shrimp size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
      case "yumurta":
        return <EggWithYolk size={size} />;
      case "balik":
        return <Fish size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
      case "yer-fistigi":
        return <PeanutIcon size={size} />;
      case "soya":
        return <SoybeanIcon size={size} />;
      case "sut":
        return <Milk size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
      case "kuruyemis":
        return <Nut size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
      case "kereviz":
        return <LeafyGreen size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
      case "hardal":
        return <MustardIcon size={size} />;
      case "susam":
        return <SesameIcon size={size} />;
      case "sulfit":
        return <Wine size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
      case "aci-bakla":
        return <Flower2 size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
      case "yumusakcalar":
        return <ScallopIcon size={size} />;
      default:
        return <Wheat size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
    }
  };

  return (
    <span
      className="allergen-svg-wrapper"
      title={title}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 0,
      }}
    >
      {renderIcon()}
    </span>
  );
}
