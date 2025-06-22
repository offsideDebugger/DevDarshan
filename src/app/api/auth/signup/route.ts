import { prisma } from "@/db/db";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { sendGmailVerificationEmail } from "@/lib/sendGmailVerification";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("🔥 Registration API called"); // Debug log

  try {
    const { username, email, password } = await request.json();

    console.log("📝 Registration data:", { username, email, password: "***" }); // Debug log

    if (!username || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    console.log("🔍 Checking if user exists..."); // Debug log
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      console.log("❌ User already exists"); // Debug log
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 });
    }

    // Hash password
    console.log("🔒 Hashing password..."); // Debug log
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification token
    console.log("🎲 Generating verification token..."); // Debug log
    const verificationToken = randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    console.log("📧 Verification token:", verificationToken); // Debug log

    // Create user (unverified)
    console.log("👤 Creating user..."); // Debug log
    const user = await prisma.user.create({
      data: {
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
        isVerified: false,
      }
    });

    console.log("✅ User created:", user.id); // Debug log

    // Create verification token record
    console.log("🎫 Creating verification token record..."); // Debug log
    await prisma.verificationToken.create({
      data: {
        token: verificationToken,
        userId: user.id,
        expires: tokenExpiry,
      }
    });

    // Send verification email via Gmail
    console.log("📤 Attempting to send verification email via Gmail..."); // Debug log
    try {
      await sendGmailVerificationEmail(email, verificationToken);
      console.log("✅ Gmail email sent successfully!"); // Debug log
    } catch (emailError) {
      console.error("❌ Gmail email sending failed:", emailError); // Debug log
      
      // Still return success but log the email error
      return NextResponse.json({ 
        message: "Registration successful! However, there was an issue sending the verification email. Please contact support.",
        emailError: true
      }, { status: 201 });
    }

    return NextResponse.json({ 
      message: "Registration successful! Please check your email to verify your account before logging in.",
      requiresVerification: true
    }, { status: 201 });

  } catch (error) {
    console.error("💥 Registration error:", error); // Debug log
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}