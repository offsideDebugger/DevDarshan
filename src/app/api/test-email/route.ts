import { NextRequest, NextResponse } from "next/server";
import { sendGmailVerificationEmail } from "@/lib/sendGmailVerification";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    console.log("🧪 Testing Gmail email functionality for:", email);
    
    // Generate a test token
    const testToken = "test-token-" + Date.now();
    
    // Send test email via Gmail
    await sendGmailVerificationEmail(email, testToken);
    
    return NextResponse.json({ 
      message: "Gmail test email sent successfully!",
      token: testToken,
      verificationUrl: `${process.env.NEXTAUTH_URL}/api/verify-email?token=${testToken}`
    });
    
  } catch (error) {
    console.error("❌ Gmail test email error:", error);
    return NextResponse.json({ error: "Failed to send Gmail test email" }, { status: 500 });
  }
} 