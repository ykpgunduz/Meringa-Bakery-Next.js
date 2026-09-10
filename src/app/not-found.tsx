import { redirect } from "next/navigation";

/**
 * Müşteri veya ziyaretçi projede bulunmayan herhangi bir sayfaya (404)
 * gitmeye çalıştığında doğrudan ana QR menü sayfasına (/qr-menu) yönlendirilir.
 */
export default function NotFound() {
  redirect("/qr-menu");
}
