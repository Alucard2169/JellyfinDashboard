import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const ENV_PATH = path.join(process.cwd(), ".env.local");
const SECRET_KEY = process.env.SECRET_KEY || "supersecret";

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    // Read .env.local
    if (!fs.existsSync(ENV_PATH)) {
        return NextResponse.json({ message: "No users found" }, { status: 500 });
    }

    const envContent = fs.readFileSync(ENV_PATH, "utf-8");

    // Extract stored credentials
    const userEnv = `USERNAME_${username.toUpperCase()}=`;
    const passEnv = `PASSWORD_${username.toUpperCase()}=`;

    const userMatch = envContent.split("\n").find((line) => line.startsWith(userEnv));
    const passMatch = envContent.split("\n").find((line) => line.startsWith(passEnv));

    if (!userMatch || !passMatch) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const storedPassword = passMatch.split("=")[1];

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, storedPassword);
    if (!passwordMatch) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    // Set cookie with the token


    const response = NextResponse.json({ message: "Login successful", token });
    response.cookies.set("token", token, {
    httpOnly: true, // Prevent client-side JS from accessing it
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 3600,
    }); 
    
    return response;
}