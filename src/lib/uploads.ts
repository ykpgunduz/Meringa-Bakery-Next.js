import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

export const PRODUCT_IMAGE_DIR = path.join(PUBLIC_DIR, "img", "products");
export const CATEGORY_IMAGE_DIR = path.join(PUBLIC_DIR, "img", "category");

const MAX_BYTES = 2048 * 1024; // Laravel: max:2048 (KB)

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/pjpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

export function isEmptyUpload(file: unknown): file is null {
  return !(file instanceof File) || file.size === 0;
}

/** Laravel: 'image|mimes:jpeg,png,jpg,gif(,webp)|max:2048' doğrulamasının karşılığı. */
export function validateImage(
  file: File,
  allowed: string[]
): string | null {
  const extension =
    (file.name.split(".").pop() || "").toLowerCase() ||
    EXTENSION_BY_TYPE[file.type] ||
    "";

  if (!allowed.includes(extension)) {
    return `image alanı şu türlerden biri olmalıdır: ${allowed.join(", ")}.`;
  }
  if (!file.type.startsWith("image/")) {
    return "image alanı bir görsel olmalıdır.";
  }
  if (file.size > MAX_BYTES) {
    return "image alanı 2048 kilobyte değerinden büyük olmamalıdır.";
  }
  return null;
}

export function extensionOf(file: File): string {
  const fromName = (file.name.split(".").pop() || "").toLowerCase();
  return fromName || EXTENSION_BY_TYPE[file.type] || "jpg";
}

export async function storeUpload(
  file: File,
  directory: string,
  fileName: string
): Promise<void> {
  await fs.mkdir(directory, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(directory, fileName), buffer);
}

export async function removeUpload(
  directory: string,
  fileName?: string
): Promise<void> {
  if (!fileName) return;
  try {
    await fs.unlink(path.join(directory, fileName));
  } catch {
    // dosya yoksa sessizce geç (Laravel'deki file_exists kontrolü ile aynı davranış)
  }
}
