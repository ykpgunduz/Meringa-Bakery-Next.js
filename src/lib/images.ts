import "server-only";
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

export const DEFAULT_IMAGE = "/img/default.jpg";

export function publicFileExists(relativePath: string): boolean {
  if (!relativePath) return false;
  const clean = relativePath.replace(/^\/+/, "");
  return fs.existsSync(path.join(PUBLIC_DIR, clean));
}

/**
 * Blade tarafında tarayıcıda yapılan onerror kontrolünün sunucu tarafı karşılığı:
 * dosya yoksa doğrudan varsayılan görsel kullanılır (fazladan istek oluşmaz).
 */
export function categoryImage(image?: string, key?: string): string {
  const candidate = image || (key ? `${key}.jpg` : "");
  const url = `/img/category/${candidate}`;
  return candidate && publicFileExists(url) ? url : DEFAULT_IMAGE;
}

export function productImage(image?: string): string {
  if (!image) return DEFAULT_IMAGE;
  const url = `/img/products/${image}`;
  return publicFileExists(url) ? url : DEFAULT_IMAGE;
}
