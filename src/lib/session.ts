import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  FLASH_COOKIE,
  SESSION_COOKIE,
  createSessionToken,
  verifySessionToken,
} from "./auth";

const WEEK = 60 * 60 * 24 * 7;

export async function loginSession(username: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WEEK,
  });
}

export async function logoutSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function currentAdmin() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** AdminAuth middleware karşılığı: giriş yoksa login sayfasına gönder. */
export async function requireAdmin() {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export type Flash = { type: "success" | "error"; message: string };

/** Laravel'deki ->with('success', ...) / ->with('error', ...) karşılığı. */
export async function setFlash(type: Flash["type"], message: string) {
  const store = await cookies();
  store.set(FLASH_COOKIE, JSON.stringify({ type, message }), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 30,
  });
}

export async function readFlash(): Promise<Flash | null> {
  const store = await cookies();
  const raw = store.get(FLASH_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Flash;
    return parsed?.message ? parsed : null;
  } catch {
    return null;
  }
}
