import nodemailer from 'nodemailer';

// Create Gmail transporter
export const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'devdarshannn@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD // We'll set this in .env
  }
});

// Verify transporter connection
export const verifyGmailConnection = async () => {
  try {
    await gmailTransporter.verify();
    console.log('✅ Gmail SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('❌ Gmail SMTP connection failed:', error);
    return false;
  }
}; 