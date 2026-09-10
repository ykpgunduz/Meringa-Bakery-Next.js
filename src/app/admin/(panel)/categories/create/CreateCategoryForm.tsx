"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { storeCategoryAction } from "../../../actions";
import { EMPTY_FORM_STATE } from "@/lib/form-state";
import FormErrors from "@/components/FormErrors";
import ImageUploadField from "@/components/ImageUploadField";

/** create-category.blade.php içindeki Türkçe ad -> anahtar dönüşümü. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CreateCategoryForm() {
  const [state, formAction, pending] = useActionState(
    storeCategoryAction,
    EMPTY_FORM_STATE
  );
  const [nameTr, setNameTr] = useState("");
  const [key, setKey] = useState("");

  return (
    <>
      <FormErrors errors={state.errors} />

      <form action={formAction}>
        <ImageUploadField label="Kategori Fotoğrafı" />

        <div className="mb-4">
          <label htmlFor="key" className="form-label modern-label">
            <i className="fas fa-key me-2" />
            Kategori Anahtarı
            <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control modern-input"
            id="key"
            name="key"
            value={key}
            onChange={(event) => setKey(event.target.value)}
            required
          />
          <div className="form-text text-muted">
            <i className="fas fa-info-circle me-1" />
            URL&apos;de kullanılacak anahtar (örn: sicak-kahveler). Sadece küçük
            harf, rakam ve tire kullanın.
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
                value={nameTr}
                onChange={(event) => {
                  setNameTr(event.target.value);
                  setKey(slugify(event.target.value));
                }}
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

        <div className="d-flex gap-3">
          <button
            type="submit"
            className="btn btn-modern-primary px-4 py-2"
            disabled={pending}
          >
            <i className="fas fa-save me-2" />
            Kategori Ekle
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
