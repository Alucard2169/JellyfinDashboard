import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ message: "Logged out" });

    // Remove the token by setting an expired cookie
    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(0), // Expires immediately
    });

    return response;
}
