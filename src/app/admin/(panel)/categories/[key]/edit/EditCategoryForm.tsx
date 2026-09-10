"use client";

import Link from "next/link";
import { useActionState } from "react";
import { updateCategoryAction } from "@/app/admin/actions";
import { EMPTY_FORM_STATE } from "@/lib/form-state";
import FormErrors from "@/components/FormErrors";
import ImageUploadField from "@/components/ImageUploadField";

export default function EditCategoryForm({
  category,
  imageUrl,
}: {
  category: { key: string; name_tr: string; name_en: string };
  imageUrl: string | null;
}) {
  const [state, formAction, pending] = useActionState(
    updateCategoryAction,
    EMPTY_FORM_STATE
  );

  return (
    <>
      <FormErrors errors={state.errors} />

      <form action={formAction}>
        <input type="hidden" name="key" value={category.key} />

        <ImageUploadField label="Kategori Fotoğrafı" initialPreview={imageUrl} />

        <div className="mb-4">
          <label htmlFor="key" className="form-label modern-label">
            <i className="fas fa-key me-2" />
            Kategori Anahtarı
          </label>
          <input
            type="text"
            className="form-control modern-input readonly-input"
            id="key"
            defaultValue={category.key}
            readOnly
          />
          <div className="form-text text-muted">
            <i className="fas fa-lock me-1" />
            Anahtar değeri değiştirilemez.
          </div>
        </div>

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
                defaultValue={category.name_tr}
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
                defaultValue={category.name_en}
                required
              />
            </div>
          </div>
        </div>

        <div className="d-flex gap-3">
          <button
            type="submit"
            className="btn btn-modern-primary px-4 py-2"
            disabled={pending}
          >
            <i className="fas fa-save me-2" />
            Güncelle
          </button>
          <Link
            href="/admin/categories"
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
