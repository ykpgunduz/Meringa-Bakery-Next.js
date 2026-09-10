import { readFlash } from "@/lib/session";
import DismissibleAlert from "@/components/DismissibleAlert";
import FlashCleanup from "@/components/FlashCleanup";

/**
 * layout.blade.php içindeki page-header + flash mesajı bloklarının karşılığı.
 * (Her sayfa kendi başlığını ve işlem düğmelerini verir.)
 */
export default async function AdminPage({
  title,
  actions,
  search,
  error,
  children,
}: {
  /** Verilmezse üstteki sayfa başlığı şeridi hiç render edilmez. */
  title?: string;
  actions?: React.ReactNode;
  /** Başlık ile işlem düğmeleri arasında gösterilen arama alanı. */
  search?: React.ReactNode;
  /** Yönlendirme ile taşınan hata mesajı (örn. "Ürün bulunamadı!"). */
  error?: string;
  children: React.ReactNode;
}) {
  const flash = await readFlash();

  return (
    <>
      {title && (
        <div className="page-header p-3 p-md-4 mb-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <h1 className="page-title">{title}</h1>
            {search}
            <div className="page-actions">{actions}</div>
          </div>
        </div>
      )}

      {error && <DismissibleAlert variant="danger">{error}</DismissibleAlert>}

      {flash && (
        <>
          <FlashCleanup />
          <DismissibleAlert variant={flash.type === "success" ? "success" : "danger"}>
            {flash.message}
          </DismissibleAlert>
        </>
      )}

      {children}
    </>
  );
}
