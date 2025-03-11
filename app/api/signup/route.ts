import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const ENV_PATH = path.join(process.cwd(), ".env.local");

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    // Read current .env.local
    let envContent = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, "utf-8") : "";

    // Check if username already exists
    if (envContent.includes(`USERNAME_${username.toUpperCase()}=`)) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Append user credentials to .env.local
    envContent += `\nUSERNAME_${username.toUpperCase()}=${username}\nPASSWORD_${username.toUpperCase()}=${hashedPassword}`;
    fs.writeFileSync(ENV_PATH, envContent, "utf-8");

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
}
