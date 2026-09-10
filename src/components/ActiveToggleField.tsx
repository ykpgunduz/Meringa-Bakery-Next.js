"use client";

import { useState } from "react";

/** create-product / edit-product sayfalarındaki "Ürün Durumu" anahtarı. */
export default function ActiveToggleField({
  defaultChecked = true,
}: {
  defaultChecked?: boolean;
}) {
  const [active, setActive] = useState(defaultChecked);

  return (
    <div className="mb-4">
      <label className="form-label modern-label">
        <i className="fas fa-toggle-on me-2" />
        Ürün Durumu
      </label>
      <div className="status-toggle-wrapper">
        <div className="status-toggle">
          <input
            className="toggle-input"
            type="checkbox"
            id="active"
            name="active"
            value="1"
            checked={active}
            onChange={(event) => setActive(event.target.checked)}
          />
          <label className="toggle-label" htmlFor="active">
            <span className="toggle-slider" />
            <span className="status-text">{active ? "Aktif" : "Pasif"}</span>
          </label>
        </div>
        <div className="form-text text-muted">
          <i className="fas fa-info-circle me-1" />
          Pasif ürünler menüde görünmez.
        </div>
      </div>
    </div>
  );
}
