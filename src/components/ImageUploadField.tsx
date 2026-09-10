"use client";

import { useState } from "react";

/** Form sayfalarındaki previewImage/removeImage davranışının karşılığı. */
export default function ImageUploadField({
  label,
  initialPreview,
  inline = false,
}: {
  label: string;
  initialPreview?: string | null;
  /** true ise önizleme ile dosya seçici yan yana durur (yerden tasarruf). */
  inline?: boolean;
}) {
  const [preview, setPreview] = useState<string | null>(initialPreview ?? null);
  const [inputKey, setInputKey] = useState(0);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview(null);
    // input değerini sıfırlamak için alanı yeniden oluştur
    setInputKey((value) => value + 1);
  };

  return (
    <div className="mb-4">
      <label htmlFor="image" className="form-label modern-label">
        <i className="fas fa-image me-2" />
        {label}
      </label>
      <div
        className={`image-upload-container${inline ? " image-upload-inline" : ""}`}
      >
        {/* Satır içi düzende fotoğraf yoksa boş kutu yerine doğrudan dosya seçici durur */}
        {(!inline || preview) && (
          <div className="image-preview" id="imagePreview">
            {preview ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Preview" className="preview-image" />
                <button
                  type="button"
                  className="remove-image"
                  onClick={removeImage}
                >
                  <i className="fas fa-times" />
                </button>
              </>
            ) : (
              <div className="image-placeholder">
                <i className="fas fa-camera" />
                <span>Fotoğraf Seçin</span>
              </div>
            )}
          </div>
        )}
        <div className="image-upload-controls">
          <input
            key={inputKey}
            type="file"
            className="form-control modern-input"
            id="image"
            name="image"
            accept="image/*"
            onChange={onChange}
          />
          <div className="form-text text-muted">
            <i className="fas fa-info-circle me-1" />
            JPG, PNG veya WebP formatında maksimum 2MB boyutunda resim
            yükleyebilirsiniz.
          </div>
        </div>
      </div>
    </div>
  );
}
