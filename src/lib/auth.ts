/**
 * Laravel tarafındaki AuthController + AdminAuth middleware karşılığı.
 * Statik kullanıcı bilgileri ile imzalı bir oturum çerezi kullanılır.
 * Web Crypto kullanıldığı için hem Node hem Edge (middleware) ortamında çalışır.
 */

export const SESSION_COOKIE = "admin_session";
export const FLASH_COOKIE = "flash";

const encoder = new TextEncoder();

function secret(): string {
  return process.env.SESSION_SECRET || "meringa-qr-menu-default-secret";
}

export function adminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "meringa123",
  };
}

function base64url(input: string): string {
  return btoa(unescape(encodeURIComponent(input)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64url(input: string): string {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  return decodeURIComponent(escape(atob(padded)));
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(username: string): Promise<string> {
  const payload = base64url(JSON.stringify({ u: username, iat: Date.now() }));
  return `${payload}.${await sign(payload)}`;
}

export async function verifySessionToken(
  token: string | undefined
): Promise<{ username: string } | null> {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = await sign(payload);
  if (expected.length !== signature.length) return null;

  // Sabit zamanlı karşılaştırma
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  if (diff !== 0) return null;

  try {
    const data = JSON.parse(fromBase64url(payload)) as { u?: string };
    return data.u ? { username: data.u } : null;
  } catch {
    return null;
  }
}
