import { NextResponse, type NextRequest } from "next/server";
import { USER_COOKIE, readUserId } from "@/lib/user-token";

// halaman yang boleh dibuka tamu (belum login)
const PUBLIC_PAGES = ["/", "/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (PUBLIC_PAGES.includes(pathname)) return NextResponse.next();

  const token = request.cookies.get(USER_COOKIE)?.value;
  if (token && readUserId(token)) return NextResponse.next();

  // belum login -> lempar ke login, sambil ingetin halaman tujuannya
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname + search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // api, panel admin (punya login sendiri), dan file statis (yang ada titiknya, mis. .png) gak ikut dicek
  matcher: ["/((?!api|admin|_next/static|_next/image|.*\\..*).*)"],
};
