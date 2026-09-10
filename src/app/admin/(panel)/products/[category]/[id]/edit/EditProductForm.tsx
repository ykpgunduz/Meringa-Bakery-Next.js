"use client";

import Link from "next/link";
import { useActionState } from "react";
import { updateProductAction } from "@/app/admin/actions";
import type { AllergenId } from "@/lib/allergens";
import { EMPTY_FORM_STATE } from "@/lib/form-state";
import ActiveToggleField from "@/components/ActiveToggleField";
import AllergenField from "@/components/AllergenField";
import FormErrors from "@/components/FormErrors";
import ImageUploadField from "@/components/ImageUploadField";

export default function EditProductForm({
  categoryKey,
  categoryLabel,
  product,
  imageUrl,
}: {
  categoryKey: string;
  categoryLabel: string;
  product: {
    id: number;
    name_tr: string;
    name_en: string;
    desc_tr: string;
    desc_en: string;
    price: number;
    calories?: number;
    allergens?: AllergenId[];
    active: boolean;
  };
  imageUrl: string | null;
}) {
  const [state, formAction, pending] = useActionState(
    updateProductAction,
    EMPTY_FORM_STATE
  );

  return (
    <>
      <FormErrors errors={state.errors} />

      <form action={formAction}>
        <input type="hidden" name="category" value={categoryKey} />
        <input type="hidden" name="id" value={product.id} />

        <div className="row">
          <div className="col-lg-6">
            <ImageUploadField
              label="Ürün Fotoğrafı"
              initialPreview={imageUrl}
              inline
            />
          </div>
          <div className="col-lg-6">
            <div className="mb-4">
              <label
                htmlFor="category_display"
                className="form-label modern-label"
              >
                <i className="fas fa-folder me-2" />
                Kategori
              </label>
              <input
                type="text"
                className="form-control modern-input readonly-input"
                id="category_display"
                defaultValue={categoryLabel}
                readOnly
              />
              <div className="form-text text-muted">
                <i className="fas fa-lock me-1" />
                Kategori değiştirilemez. Ürünü silip yeniden ekleyebilirsiniz.
              </div>
            </div>
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
                defaultValue={product.name_tr}
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
                defaultValue={product.name_en}
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
                defaultValue={product.desc_tr}
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
                defaultValue={product.desc_en}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6">
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
                defaultValue={product.price}
                min="0"
                step="1"
                required
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
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
                defaultValue={product.calories ?? ""}
              />
              <div className="form-text text-muted">
                <i className="fas fa-info-circle me-1" />
                Boş bırakılırsa menüde gösterilmez.
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <ActiveToggleField defaultChecked={product.active} />
          </div>
        </div>

        <AllergenField defaultSelected={product.allergens} />

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
