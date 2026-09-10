"use client";

import { useCallback, useRef, useState } from "react";

type Toast = { id: number; message: string; type: "success" | "error" };

/** Bootstrap toast bileşeninin JS'siz karşılığı (products.blade.php showToast). */
export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const showToast = useCallback(
    (message: string, type: "success" | "error" = "success") => {
      const id = nextId.current++;
      setToasts((current) => [...current, { id, message, type }]);
      setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 3000);
    },
    []
  );

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toastContainer = (
    <div
      id="toast-container"
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1060 }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast align-items-center text-white bg-${
            toast.type === "success" ? "success" : "danger"
          } border-0 show`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Close"
              onClick={() => dismiss(toast.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return { showToast, toastContainer };
}

type Indicator = { message: string; type: "info" | "success" | "error" } | null;

/** Sürükle-bırak sıralama geri bildirimi (reorder-indicator). */
export function useReorderIndicator() {
  const [indicator, setIndicator] = useState<Indicator>(null);
  const [visible, setVisible] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const showReorderIndicator = useCallback(
    (message: string, type: "info" | "success" | "error" = "info") => {
      timers.current.forEach(clearTimeout);
      timers.current = [];

      setIndicator({ message, type });
      timers.current.push(setTimeout(() => setVisible(true), 100));
      timers.current.push(
        setTimeout(
          () => {
            setVisible(false);
            timers.current.push(setTimeout(() => setIndicator(null), 300));
          },
          type === "info" ? 1000 : 3000
        )
      );
    },
    []
  );

  const background =
    indicator?.type === "success"
      ? "linear-gradient(135deg, #10b981, #059669)"
      : indicator?.type === "error"
        ? "linear-gradient(135deg, #ef4444, #dc2626)"
        : undefined;

  const iconClass =
    indicator?.type === "success"
      ? "fas fa-check"
      : indicator?.type === "error"
        ? "fas fa-exclamation-triangle"
        : "fas fa-sync fa-spin";

  const reorderIndicator = indicator ? (
    <div
      className={`reorder-indicator${visible ? " show" : ""}`}
      style={background ? { background } : undefined}
    >
      <i className={iconClass} />
      {indicator.message}
    </div>
  ) : null;

  return { showReorderIndicator, reorderIndicator };
}
