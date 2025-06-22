import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/db";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    console.log("🔧 Manual verification for:", email);
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Mark user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });

    console.log("✅ User manually verified:", user.id);
    
    return NextResponse.json({ 
      message: "Account verified successfully! You can now login.",
      userId: user.id
    });
    
  } catch (error) {
    console.error("❌ Manual verification error:", error);
    return NextResponse.json({ error: "Failed to verify account" }, { status: 500 });
  }
} 