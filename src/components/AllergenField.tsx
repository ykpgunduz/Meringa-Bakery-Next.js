"use client";

import { useState } from "react";
import AllergenIcon from "@/components/AllergenIcon";
import {
  ALLERGENS,
  ALLERGEN_GROUPS,
  type Allergen,
  type AllergenId,
} from "@/lib/allergens";

const GROUP_ORDER: Allergen["group"][] = ["temel", "yemek", "gizli"];

/** Ürün formlarındaki alerjen seçim kutusu (çoklu seçim). */
export default function AllergenField({
  defaultSelected = [],
}: {
  defaultSelected?: AllergenId[];
}) {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(defaultSelected)
  );

  const toggle = (id: AllergenId, checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  return (
    <div className="mb-4">
      <label className="form-label modern-label">
        <i className="fas fa-triangle-exclamation me-2" />
        Alerjenler
      </label>

      <div className="allergen-wrapper">
        <div className="allergen-summary">
          <span className="allergen-summary-count">{selected.size}</span>
          <span>alerjen seçildi</span>
          {selected.size > 0 && (
            <button
              type="button"
              className="allergen-clear"
              onClick={() => setSelected(new Set())}
            >
              <i className="fas fa-times me-1" />
              Seçimi temizle
            </button>
          )}
        </div>

        {GROUP_ORDER.map((group) => (
          <div className="allergen-group" key={group}>
            <div className="allergen-group-title">{ALLERGEN_GROUPS[group]}</div>
            <div className="allergen-grid">
              {ALLERGENS.filter((allergen) => allergen.group === group).map(
                (allergen) => {
                  const checked = selected.has(allergen.id);
                  return (
                    <label
                      key={allergen.id}
                      className={`allergen-option${checked ? " selected" : ""}`}
                      title={allergen.hint_tr}
                    >
                      <input
                        type="checkbox"
                        name="allergens"
                        value={allergen.id}
                        checked={checked}
                        onChange={(event) =>
                          toggle(allergen.id, event.target.checked)
                        }
                      />
                      <span className="allergen-option-body">
                        <span className="allergen-option-name">
                          <AllergenIcon id={allergen.id} size={16} />
                          {allergen.name_tr}
                        </span>
                        <span className="allergen-option-hint">
                          {allergen.hint_tr}
                        </span>
                      </span>
                    </label>
                  );
                }
              )}
            </div>
          </div>
        ))}

        <div className="form-text text-muted">
          <i className="fas fa-info-circle me-1" />
          Seçilen alerjenler menüde ürünün altında gösterilir. Hiçbiri
          seçilmezse menüde alerjen satırı çıkmaz.
        </div>
      </div>
    </div>
  );
}
