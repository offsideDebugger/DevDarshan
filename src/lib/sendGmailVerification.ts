import { gmailTransporter } from './gmailConfig';

export async function sendGmailVerificationEmail(email: string, token: string) {
  console.log("📧 Sending Gmail verification email to:", email);
  
  const verifyUrl = `${process.env.NEXTAUTH_URL}/api/verify-email?token=${token}`;
  console.log("🔗 Verification URL:", verifyUrl);

  const mailOptions = {
    from: 'DevDarshan <devdarshannn@gmail.com>',
    to: email,
    subject: '🔐 Verify your DevDarshan account - Complete your registration',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🚀 Welcome to DevDarshan!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your GSoC journey starts here</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin-bottom: 20px; font-size: 24px;">Verify Your Email Address</h2>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Thanks for joining DevDarshan! To complete your registration and start tracking GSoC organizations, 
            please verify your email address by clicking the button below.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verifyUrl}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
              ✅ Verify Email Address
            </a>
          </div>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">🔗 Or copy and paste this link:</p>
            <p style="word-break: break-all; color: #4b5563; font-size: 14px; margin: 0; font-family: monospace; background: white; padding: 10px; border-radius: 4px; border: 1px solid #e5e7eb;">
              ${verifyUrl}
            </p>
          </div>
          
          <div style="border-left: 4px solid #ef4444; padding-left: 20px; margin: 30px 0;">
            <p style="color: #ef4444; font-weight: bold; margin: 0; font-size: 14px;">
              ⏰ This verification link will expire in 1 hour
            </p>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">💡 What's Next?</h3>
            <ul style="color: #92400e; margin: 0; padding-left: 20px; font-size: 14px;">
              <li>Browse GSoC organizations</li>
              <li>Bookmark your favorites</li>
              <li>Track repositories and contributions</li>
              <li>Connect with the community</li>
            </ul>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            If you didn't create a DevDarshan account, you can safely ignore this email.
          </p>
          <p style="color: #6b7280; font-size: 12px; margin: 10px 0 0 0;">
            © 2025 DevDarshan. Walk the path. Write the code. Earn the karma.
          </p>
        </div>
      </div>
    `,
  };

  try {
    const result = await gmailTransporter.sendMail(mailOptions);
    console.log("✅ Gmail email sent successfully!");
    console.log("📧 Email details:", {
      to: email,
      subject: '🔐 Verify your DevDarshan account - Complete your registration',
      from: 'DevDarshan <devdarshannn@gmail.com>',
      messageId: result.messageId
    });
    return result;
  } catch (error) {
    console.error("❌ Gmail email sending error:", error);
    throw error;
  }
} 