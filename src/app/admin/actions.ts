"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sortAllergens } from "@/lib/allergens";
import { adminCredentials } from "@/lib/auth";
import type { FormState } from "@/lib/form-state";
import {
  getMenuData,
  getNextProductId,
  saveMenuData,
  type Product,
} from "@/lib/products";
import { loginSession, logoutSession, requireAdmin, setFlash } from "@/lib/session";
import {
  CATEGORY_IMAGE_DIR,
  PRODUCT_IMAGE_DIR,
  extensionOf,
  isEmptyUpload,
  removeUpload,
  storeUpload,
  validateImage,
} from "@/lib/uploads";

/** Menüde kullanılan statik sayfaların yeniden üretilmesini tetikler. */
function revalidateMenu() {
  revalidatePath("/categories");
  revalidatePath("/category/[key]", "page");
  revalidatePath("/admin", "layout");
}

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Formda işaretlenen alerjenleri katalog sırasına göre döndürür.
 * Hiçbiri işaretlenmemişse ürüne `allergens` alanı yazılmaz.
 */
function parseAllergens(formData: FormData) {
  const selected = formData
    .getAll("allergens")
    .filter((value): value is string => typeof value === "string");
  const sorted = sortAllergens(selected);
  return sorted.length ? sorted : undefined;
}

/**
 * Kalori alanı isteğe bağlıdır: boş bırakılırsa ürüne hiç yazılmaz,
 * doldurulursa 0 veya daha büyük bir tam sayı olmalıdır.
 */
function parseCalories(
  raw: string,
  errors: string[]
): number | undefined {
  if (!raw) return undefined;

  const value = Number(raw);
  if (Number.isNaN(value)) {
    errors.push("calories alanı bir sayı olmalıdır.");
    return undefined;
  }
  if (value < 0) {
    errors.push("calories alanı en az 0 olmalıdır.");
    return undefined;
  }
  return Math.trunc(value);
}

/* ------------------------------------------------------------------ */
/* Kimlik doğrulama (AuthController)                                    */
/* ------------------------------------------------------------------ */

export async function loginAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const username = text(formData, "username");
  const password = String(formData.get("password") ?? "");

  const errors: string[] = [];
  if (!username) errors.push("Kullanıcı adı gereklidir.");
  if (!password) errors.push("Şifre gereklidir.");
  if (errors.length) return { errors };

  const credentials = adminCredentials();
  if (
    username !== credentials.username ||
    password !== credentials.password
  ) {
    return { errors: ["Kullanıcı adı veya şifre hatalı."] };
  }

  await loginSession(username);
  await setFlash("success", "Başarıyla giriş yaptınız!");
  redirect("/admin");
}

export async function logoutAction() {
  await logoutSession();
  await setFlash("success", "Başarıyla çıkış yaptınız!");
  redirect("/admin/login");
}

/* ------------------------------------------------------------------ */
/* Ürünler (AdminController)                                            */
/* ------------------------------------------------------------------ */

export async function storeProductAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const category = text(formData, "category");
  const nameTr = text(formData, "name_tr");
  const nameEn = text(formData, "name_en");
  const descTr = text(formData, "desc_tr");
  const descEn = text(formData, "desc_en");
  const priceRaw = text(formData, "price");
  const caloriesRaw = text(formData, "calories");
  const image = formData.get("image");

  const errors: string[] = [];
  if (!category) errors.push("category alanı gereklidir.");
  if (!nameTr) errors.push("name tr alanı gereklidir.");
  if (!nameEn) errors.push("name en alanı gereklidir.");
  if (!descTr) errors.push("desc tr alanı gereklidir.");
  if (!descEn) errors.push("desc en alanı gereklidir.");

  const price = Number(priceRaw);
  if (!priceRaw || Number.isNaN(price)) {
    errors.push("price alanı gereklidir.");
  } else if (price < 0) {
    errors.push("price alanı en az 0 olmalıdır.");
  }

  const calories = parseCalories(caloriesRaw, errors);
  const allergens = parseAllergens(formData);

  if (!isEmptyUpload(image)) {
    const problem = validateImage(image as File, ["jpeg", "png", "jpg", "gif"]);
    if (problem) errors.push(problem);
  }

  if (errors.length) return { errors };

  const data = await getMenuData();
  const product: Product = {
    id: getNextProductId(data),
    name_tr: nameTr,
    name_en: nameEn,
    desc_tr: descTr,
    desc_en: descEn,
    price: Math.trunc(price),
    ...(calories !== undefined ? { calories } : {}),
    ...(allergens ? { allergens } : {}),
    active: formData.get("active") !== null,
  };

  if (!isEmptyUpload(image)) {
    const file = image as File;
    const fileName = `${Date.now()}.${extensionOf(file)}`;
    await storeUpload(file, PRODUCT_IMAGE_DIR, fileName);
    product.image = fileName;
  }

  data.products[category] = [...(data.products[category] ?? []), product];
  await saveMenuData(data);
  revalidateMenu();

  await setFlash("success", "Ürün başarıyla eklendi!");
  redirect("/admin/products");
}

export async function updateProductAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const category = text(formData, "category");
  const productId = Number(text(formData, "id"));
  const nameTr = text(formData, "name_tr");
  const nameEn = text(formData, "name_en");
  const descTr = text(formData, "desc_tr");
  const descEn = text(formData, "desc_en");
  const priceRaw = text(formData, "price");
  const caloriesRaw = text(formData, "calories");
  const image = formData.get("image");

  const errors: string[] = [];
  if (!nameTr) errors.push("name tr alanı gereklidir.");
  if (!nameEn) errors.push("name en alanı gereklidir.");
  if (!descTr) errors.push("desc tr alanı gereklidir.");
  if (!descEn) errors.push("desc en alanı gereklidir.");

  const price = Number(priceRaw);
  if (!priceRaw || Number.isNaN(price)) {
    errors.push("price alanı gereklidir.");
  } else if (price < 0) {
    errors.push("price alanı en az 0 olmalıdır.");
  }

  const calories = parseCalories(caloriesRaw, errors);
  const allergens = parseAllergens(formData);

  if (!isEmptyUpload(image)) {
    const problem = validateImage(image as File, ["jpeg", "png", "jpg", "gif"]);
    if (problem) errors.push(problem);
  }

  if (errors.length) return { errors };

  const data = await getMenuData();
  const list = data.products[category] ?? [];
  const index = list.findIndex((item) => item.id === productId);

  if (index === -1) {
    await setFlash("error", "Ürün bulunamadı!");
    redirect("/admin/products");
  }

  const updated: Product = {
    id: productId,
    name_tr: nameTr,
    name_en: nameEn,
    desc_tr: descTr,
    desc_en: descEn,
    price: Math.trunc(price),
    ...(calories !== undefined ? { calories } : {}),
    ...(allergens ? { allergens } : {}),
    active: formData.get("active") !== null,
  };

  // Mevcut resmi koru
  if (list[index].image) updated.image = list[index].image;

  if (!isEmptyUpload(image)) {
    const file = image as File;
    const fileName = `${Date.now()}.${extensionOf(file)}`;
    await storeUpload(file, PRODUCT_IMAGE_DIR, fileName);
    updated.image = fileName;
  }

  list[index] = updated;
  data.products[category] = list;
  await saveMenuData(data);
  revalidateMenu();

  await setFlash("success", "Ürün başarıyla güncellendi!");
  redirect("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();

  const category = text(formData, "category");
  const productId = Number(text(formData, "id"));

  const data = await getMenuData();
  if (data.products[category]) {
    data.products[category] = data.products[category].filter(
      (item) => item.id !== productId
    );
  }

  await saveMenuData(data);
  revalidateMenu();

  await setFlash("success", "Ürün başarıyla silindi!");
  redirect("/admin/products");
}

export async function toggleProductActiveAction(
  category: string,
  id: number,
  active: boolean
): Promise<{ success: true; active: boolean } | { error: string }> {
  await requireAdmin();

  const data = await getMenuData();
  const list = data.products[category];
  if (!list) return { error: "Kategori bulunamadı" };

  const index = list.findIndex((item) => item.id === id);
  if (index === -1) return { error: "Ürün bulunamadı" };

  list[index].active = active;
  await saveMenuData(data);
  revalidateMenu();

  return { success: true, active };
}

export async function reorderProductsAction(
  category: string,
  productIds: number[]
): Promise<{ success: true } | { error: string }> {
  await requireAdmin();

  const data = await getMenuData();
  const existing = data.products[category];
  if (!existing) return { error: "Kategori bulunamadı" };

  const reordered: Product[] = [];
  for (const id of productIds) {
    const found = existing.find((item) => item.id === id);
    if (found) reordered.push(found);
  }

  if (reordered.length !== existing.length) {
    return { error: "Ürün sıralamasında hata oluştu" };
  }

  data.products[category] = reordered;
  await saveMenuData(data);
  revalidateMenu();

  return { success: true };
}

/* ------------------------------------------------------------------ */
/* Kategoriler (AdminController)                                        */
/* ------------------------------------------------------------------ */

export async function storeCategoryAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const key = text(formData, "key");
  const nameTr = text(formData, "name_tr");
  const nameEn = text(formData, "name_en");
  const image = formData.get("image");

  const data = await getMenuData();

  const errors: string[] = [];
  if (!key) {
    errors.push("key alanı gereklidir.");
  } else if (data.categories.some((category) => category.key === key)) {
    errors.push("Bu anahtar zaten kullanılıyor. Farklı bir anahtar seçin.");
  }
  if (!nameTr) errors.push("name tr alanı gereklidir.");
  if (!nameEn) errors.push("name en alanı gereklidir.");

  if (!isEmptyUpload(image)) {
    const problem = validateImage(image as File, [
      "jpeg",
      "png",
      "jpg",
      "gif",
      "webp",
    ]);
    if (problem) errors.push(problem);
  }

  if (errors.length) return { errors };

  let imageName = `${key}.jpg`;
  if (!isEmptyUpload(image)) {
    const file = image as File;
    imageName = `${key}.${extensionOf(file)}`;
    await storeUpload(file, CATEGORY_IMAGE_DIR, imageName);
  }

  data.categories.push({
    key,
    name_tr: nameTr,
    name_en: nameEn,
    image: imageName,
  });
  data.products[key] = [];

  await saveMenuData(data);
  revalidateMenu();

  await setFlash("success", "Kategori başarıyla eklendi!");
  redirect("/admin/categories");
}

export async function updateCategoryAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const key = text(formData, "key");
  const nameTr = text(formData, "name_tr");
  const nameEn = text(formData, "name_en");
  const image = formData.get("image");

  const errors: string[] = [];
  if (!nameTr) errors.push("name tr alanı gereklidir.");
  if (!nameEn) errors.push("name en alanı gereklidir.");

  if (!isEmptyUpload(image)) {
    const problem = validateImage(image as File, [
      "jpeg",
      "png",
      "jpg",
      "gif",
      "webp",
    ]);
    if (problem) errors.push(problem);
  }

  if (errors.length) return { errors };

  const data = await getMenuData();
  const index = data.categories.findIndex((category) => category.key === key);

  if (index !== -1) {
    const current = data.categories[index];
    current.name_tr = nameTr;
    current.name_en = nameEn;

    if (!isEmptyUpload(image)) {
      const file = image as File;
      await removeUpload(CATEGORY_IMAGE_DIR, current.image);
      const fileName = `${key}.${extensionOf(file)}`;
      await storeUpload(file, CATEGORY_IMAGE_DIR, fileName);
      current.image = fileName;
    } else if (!current.image) {
      current.image = `${key}.jpg`;
    }
  }

  await saveMenuData(data);
  revalidateMenu();

  await setFlash("success", "Kategori başarıyla güncellendi!");
  redirect("/admin/categories");
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdmin();

  const key = text(formData, "key");
  const data = await getMenuData();

  data.categories = data.categories.filter((category) => category.key !== key);
  delete data.products[key];

  await saveMenuData(data);
  revalidateMenu();

  await setFlash(
    "success",
    "Kategori ve içindeki ürünler başarıyla silindi!"
  );
  redirect("/admin/categories");
}

export async function reorderCategoriesAction(
  categoryKeys: string[]
): Promise<{ success: true } | { error: string }> {
  await requireAdmin();

  const data = await getMenuData();
  if (!data.categories.length) return { error: "Kategori bulunamadı" };

  const reordered = [];
  for (const key of categoryKeys) {
    const found = data.categories.find((category) => category.key === key);
    if (found) reordered.push(found);
  }

  if (reordered.length !== data.categories.length) {
    return { error: "Kategori sıralamasında hata oluştu" };
  }

  data.categories = reordered;
  await saveMenuData(data);
  revalidateMenu();

  return { success: true };
}
