import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { AllergenId } from "./allergens";

export type Category = {
  key: string;
  name_tr: string;
  name_en: string;
  image?: string;
};

export type Product = {
  id: number;
  name_tr: string;
  name_en: string;
  desc_tr: string;
  desc_en: string;
  price: number;
  /** Ürünün kalori değeri (kcal). Girilmemişse menüde gösterilmez. */
  calories?: number;
  /** Ürünün içerdiği alerjenler. Boşsa menüde alerjen satırı gösterilmez. */
  allergens?: AllergenId[];
  active?: boolean;
  image?: string;
};

export type MenuData = {
  categories: Category[];
  products: Record<string, Product[]>;
};

const DATA_PATH = path.join(process.cwd(), "data", "products.json");

const EMPTY: MenuData = { categories: [], products: {} };

/**
 * Laravel'deki AdminController::getProductsData() karşılığı.
 * React `cache` ile aynı istek içinde dosya bir kez okunur.
 */
export const getMenuData = cache(async (): Promise<MenuData> => {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<MenuData>;
    return {
      categories: parsed.categories ?? [],
      products: parsed.products ?? {},
    };
  } catch {
    return EMPTY;
  }
});

/** Laravel'deki saveProductsData() karşılığı (JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE). */
export async function saveMenuData(data: MenuData): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 4), "utf8");
}

/** Laravel'deki getNextProductId() karşılığı. */
export function getNextProductId(data: MenuData): number {
  let maxId = 0;
  for (const products of Object.values(data.products)) {
    for (const product of products) {
      if (product.id > maxId) maxId = product.id;
    }
  }
  return maxId + 1;
}

export function findCategory(data: MenuData, key: string): Category | undefined {
  return data.categories.find((c) => c.key === key);
}

export function findProduct(
  data: MenuData,
  categoryKey: string,
  id: number
): Product | undefined {
  return data.products[categoryKey]?.find((p) => p.id === id);
}

export function totalProductCount(data: MenuData): number {
  return Object.values(data.products).reduce((sum, list) => sum + list.length, 0);
}

export function categoryProductCount(data: MenuData, key: string): number {
  return data.products[key]?.length ?? 0;
}
