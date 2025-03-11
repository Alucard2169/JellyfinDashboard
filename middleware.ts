import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    // If the user tries to access protected routes without a token, redirect
    if (!token && req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/server")) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
    matcher: ["/dashboard/:path*", "/server/:path*"], // Protects /dashboard & /server
};
