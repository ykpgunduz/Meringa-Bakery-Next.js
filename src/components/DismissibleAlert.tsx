"use client";

import { useState } from "react";

/** Bootstrap'in alert-dismissible bileşeninin JS'siz karşılığı. */
export default function DismissibleAlert({
  variant,
  children,
}: {
  variant: "success" | "danger";
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      className={`alert alert-${variant} alert-dismissible fade show`}
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => setVisible(false)}
      />
    </div>
  );
}
