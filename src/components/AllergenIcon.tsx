import type { AllergenId } from "@/lib/allergens";

/**
 * Alerjenler için satır içi SVG ikon seti.
 * Dış ikon kütüphanesi yüklenmemesi için menüdeki diğer ikonlarla aynı
 * çizgi (stroke) diliyle elle çizilmiştir.
 */
const PATHS: Record<AllergenId, React.ReactNode> = {
  // Buğday başağı
  gluten: (
    <>
      <path d="M12 21v-7.6" />
      <path d="M12 13.4c0-2.2 1.7-3.9 3.9-3.9 0 2.2-1.7 3.9-3.9 3.9z" />
      <path d="M12 13.4c0-2.2-1.7-3.9-3.9-3.9 0 2.2 1.7 3.9 3.9 3.9z" />
      <path d="M12 9.2c0-2.2 1.7-3.9 3.9-3.9 0 2.2-1.7 3.9-3.9 3.9z" />
      <path d="M12 9.2c0-2.2-1.7-3.9-3.9-3.9 0 2.2 1.7 3.9 3.9 3.9z" />
      <path d="M12 5.4C12 4 12.9 3 14 2.6c.2 1.4-.6 2.5-2 2.8z" />
    </>
  ),
  // Süt bardağı
  sut: (
    <>
      <path d="M7.8 3.5h8.4l-1 16.1a1 1 0 0 1-1 .9h-4.4a1 1 0 0 1-1-.9L7.8 3.5z" />
      <path d="M8.2 9.2h7.6" />
    </>
  ),
  // Yumurta
  yumurta: (
    <path d="M12 2.6c1.9 0 3.5 2 4.5 4.2a9.6 9.6 0 0 1 .9 4.1 5.4 5.4 0 0 1-10.8 0c0-1.4.3-2.8.9-4.1C8.5 4.6 10.1 2.6 12 2.6z" />
  ),
  // Fındık / kabuklu yemiş
  kuruyemis: (
    <>
      <path d="M12 20.8a6.3 6.3 0 0 0 6.3-6.3c0-4.2-2.8-7.6-6.3-7.6s-6.3 3.4-6.3 7.6A6.3 6.3 0 0 0 12 20.8z" />
      <path d="M8.1 7.6C9 5.7 10.4 4.6 12 4.6s3 1.1 3.9 3" />
      <path d="M12 20.8V8.4" />
    </>
  ),
  // Yer fıstığı
  "yer-fistigi": (
    <>
      <circle cx="9.6" cy="8.2" r="4.4" />
      <circle cx="14.4" cy="15.8" r="4.4" />
    </>
  ),
  // Susam taneleri
  susam: (
    <>
      <ellipse cx="8" cy="7.8" rx="1.6" ry="2.6" transform="rotate(-35 8 7.8)" />
      <ellipse cx="15.4" cy="7.4" rx="1.6" ry="2.6" transform="rotate(28 15.4 7.4)" />
      <ellipse cx="11.7" cy="12.4" rx="1.6" ry="2.6" transform="rotate(-8 11.7 12.4)" />
      <ellipse cx="7.6" cy="16.6" rx="1.6" ry="2.6" transform="rotate(22 7.6 16.6)" />
      <ellipse cx="15.8" cy="16.4" rx="1.6" ry="2.6" transform="rotate(-26 15.8 16.4)" />
    </>
  ),
  // Soya bakla ve taneleri
  soya: (
    <>
      <path d="M8.2 7.2h7.6a4.8 4.8 0 0 1 0 9.6H8.2a4.8 4.8 0 0 1 0-9.6z" />
      <circle cx="8.6" cy="12" r="1.35" />
      <circle cx="12" cy="12" r="1.35" />
      <circle cx="15.4" cy="12" r="1.35" />
    </>
  ),
  // Balık
  balik: (
    <>
      <ellipse cx="9.2" cy="12" rx="6" ry="4.6" />
      <path d="M15.2 12 21 8.6v6.8L15.2 12z" />
      <circle cx="6.6" cy="10.6" r=".85" />
    </>
  ),
  // Deniz kabuğu
  "kabuklu-deniz": (
    <>
      <path d="M12 20.5c-4.7 0-8.5-3.8-8.5-8.5h17c0 4.7-3.8 8.5-8.5 8.5z" />
      <path d="M12 20.5V12M8.2 19.2V12M15.8 19.2V12" />
    </>
  ),
  // Hardal şişesi
  hardal: (
    <>
      <path d="M10 3.2h4v2.4l1.7 2.6c.5.7.8 1.5.8 2.4V20a1 1 0 0 1-1 1H8.5a1 1 0 0 1-1-1v-9.4c0-.9.3-1.7.8-2.4L10 5.6V3.2z" />
      <path d="M7.6 12.4h8.8" />
    </>
  ),
  // Kereviz sapları
  kereviz: (
    <>
      <path d="M7.6 21c-.8-4.6-.5-9 .9-13" />
      <path d="M12 21c0-5 .3-9.5 1-13" />
      <path d="M16.4 21c.5-4.6.1-9-1.1-13" />
      <path d="M8.5 8c-1.1-1.4-1-3.3.3-4.6 1.1.8 1.6 2.1 1.4 3.4" />
      <path d="M13.6 6.6c.2-1.8 1.7-3.2 3.5-3.4.2 1.7-.7 3.3-2.2 4" />
    </>
  ),
  // Sülfit (laboratuvar şişesi)
  sulfit: (
    <>
      <path d="M9.8 3.2v6.3l-4.3 7.7A2.2 2.2 0 0 0 7.4 20.6h9.2a2.2 2.2 0 0 0 1.9-3.4l-4.3-7.7V3.2" />
      <path d="M8.6 3.2h6.8" />
      <path d="M7.4 15.2h9.2" />
    </>
  ),
  // Acı bakla (lupin çiçeği)
  "aci-bakla": (
    <>
      <path d="M12 21v-4.6" />
      <path d="M12 16.4c-2.1 0-3.7-1.2-3.7-2.7S9.9 11 12 11s3.7 1.2 3.7 2.7-1.6 2.7-3.7 2.7z" />
      <path d="M12 11c-1.8 0-3.2-1-3.2-2.3S10.2 6.4 12 6.4s3.2 1 3.2 2.3S13.8 11 12 11z" />
      <path d="M12 6.4c-1.4 0-2.5-.8-2.5-1.8S10.6 2.8 12 2.8s2.5.8 2.5 1.8-1.1 1.8-2.5 1.8z" />
    </>
  ),
};

export default function AllergenIcon({
  id,
  size = 16,
  title,
}: {
  id: AllergenId;
  size?: number;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      {PATHS[id]}
    </svg>
  );
}
