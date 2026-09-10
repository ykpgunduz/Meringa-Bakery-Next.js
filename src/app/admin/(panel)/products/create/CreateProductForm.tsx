"use client";

import Link from "next/link";
import { useActionState } from "react";
import { storeProductAction } from "../../../actions";
import { EMPTY_FORM_STATE } from "@/lib/form-state";
import ActiveToggleField from "@/components/ActiveToggleField";
import AllergenField from "@/components/AllergenField";
import FormErrors from "@/components/FormErrors";
import ImageUploadField from "@/components/ImageUploadField";

export default function CreateProductForm({
  categories,
}: {
  categories: { key: string; name_tr: string; name_en: string }[];
}) {
  const [state, formAction, pending] = useActionState(
    storeProductAction,
    EMPTY_FORM_STATE
  );

  return (
    <>
      <FormErrors errors={state.errors} />

      <form action={formAction}>
        <div className="mb-4">
          <label htmlFor="category" className="form-label modern-label">
            <i className="fas fa-folder me-2" />
            Kategori
            <span className="text-danger">*</span>
          </label>
          <select
            className="form-select modern-select"
            id="category"
            name="category"
            required
            defaultValue=""
          >
            <option value="">Kategori seçin...</option>
            {categories.map((category) => (
              <option value={category.key} key={category.key}>
                {category.name_tr} ({category.name_en})
              </option>
            ))}
          </select>
        </div>

        <ImageUploadField label="Ürün Fotoğrafı" />

        <div className="row">
          <div className="col-md-6">
            <div className="mb-4">
              <label htmlFor="name_tr" className="form-label modern-label">
                <i className="fas fa-flag me-2" />
                Türkçe Adı
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control modern-input"
                id="name_tr"
                name="name_tr"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label htmlFor="name_en" className="form-label modern-label">
                <i className="fas fa-globe me-2" />
                İngilizce Adı
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control modern-input"
                id="name_en"
                name="name_en"
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-4">
              <label htmlFor="desc_tr" className="form-label modern-label">
                <i className="fas fa-align-left me-2" />
                Türkçe Açıklama
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control modern-input"
                id="desc_tr"
                name="desc_tr"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label htmlFor="desc_en" className="form-label modern-label">
                <i className="fas fa-align-left me-2" />
                İngilizce Açıklama
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control modern-input"
                id="desc_en"
                name="desc_en"
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="form-label modern-label">
            <i className="fas fa-turkish-lira-sign me-2" />
            Fiyat (₺)
            <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="form-control modern-input"
            id="price"
            name="price"
            min="0"
            step="1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="calories" className="form-label modern-label">
            <i className="fas fa-fire me-2" />
            Kalori (kcal)
          </label>
          <input
            type="number"
            className="form-control modern-input"
            id="calories"
            name="calories"
            min="0"
            step="1"
            placeholder="Örn: 250"
          />
          <div className="form-text text-muted">
            <i className="fas fa-info-circle me-1" />
            İsteğe bağlıdır. Boş bırakılırsa menüde kalori bilgisi gösterilmez.
          </div>
        </div>

        <AllergenField />

        <ActiveToggleField />

        <div className="d-flex gap-3">
          <button
            type="submit"
            className="btn btn-modern-primary px-4 py-2"
            disabled={pending}
          >
            <i className="fas fa-save me-2" />
            Ürün Ekle
          </button>
          <Link
            href="/admin/products"
            className="btn btn-modern-secondary px-4 py-2"
          >
            <i className="fas fa-arrow-left me-2" />
            Geri Dön
          </Link>
        </div>
      </form>
    </>
  );
}
