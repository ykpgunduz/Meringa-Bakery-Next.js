import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/** Laravel'deki 'admin.auth' middleware'inin karşılığı (Next 16 proxy dosyası). */
export default async function proxy(request: NextRequest) {
  const session = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value
  );

  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    // Zaten giriş yapmışsa admin panele yönlendir
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
