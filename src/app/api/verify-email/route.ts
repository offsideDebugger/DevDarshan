import { prisma } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/?error=invalid-token", request.url));
  }

  try {
    const record = await prisma.verificationToken.findUnique({ 
      where: { token } 
    });

    if (!record || record.expires < new Date()) {
      // ✅ Redirect to registration with error
      return NextResponse.redirect(new URL("/?error=token-expired", request.url));
    }

    // Mark user as verified
    await prisma.user.update({
      where: { id: record.userId },
      data: { isVerified: true },
    });

    // Delete used token
    await prisma.verificationToken.delete({ 
      where: { token } 
    });

    // ✅ Redirect to login with success message
    return NextResponse.redirect(new URL("/login?verified=true", request.url));

  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(new URL("/?error=verification-failed", request.url));
  }
}