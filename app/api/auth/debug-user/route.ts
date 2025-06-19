// app/api/debug-user/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  console.log("👉 Hit /api/debug-user");

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    console.log("🧾 Received:", { email, password });

    if (!email || !password) {
      console.log("⚠️ Missing email or password");
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    console.log("🔍 Prisma user lookup:", user);

    if (!user) {
      console.log("❌ No user found");
      return NextResponse.json({ foundUser: false }, { status: 200 });
    }

    if (!user.password) {
      console.log("⚠️ User has no password field");
    }

    const isValid = await bcrypt.compare(password, user.password ?? "");
    console.log("✅ Password match:", isValid);

    return NextResponse.json({
      foundUser: true,
      email: user.email,
      hasPassword: !!user.password,
      passwordMatch: isValid,
    });
  } catch (err) {
    console.error("❗Error in debug-user route:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
