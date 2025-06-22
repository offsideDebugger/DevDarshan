# Email Verification System Documentation

## Overview

This document explains the complete email verification system implemented in the GSOC Tracker application using **Gmail SMTP** with nodemailer. The system ensures that users verify their email addresses before they can access the application.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Setup & Configuration](#setup--configuration)
3. [Email Verification Flow](#email-verification-flow)
4. [API Endpoints](#api-endpoints)
5. [Database Schema](#database-schema)
6. [Troubleshooting](#troubleshooting)
7. [Alternative Solutions](#alternative-solutions)
8. [Security Considerations](#security-considerations)

## System Architecture

```
User Registration → Email Verification → Account Activation → Login Access
       ↓                    ↓                    ↓              ↓
   Create User         Send Email         Verify Token      Grant Access
   (Unverified)      (Gmail SMTP)       (Database)       (NextAuth)
```

### Components

1. **Registration System** (`/api/auth/signup`)
2. **Email Service** (Gmail SMTP with nodemailer)
3. **Verification System** (`/api/verify-email`)
4. **Database** (PostgreSQL with Prisma)
5. **Authentication** (NextAuth.js)

## Setup & Configuration

### 1. Environment Variables

Create a `.env` file in your project root:

```env
# Gmail Configuration
GMAIL_APP_PASSWORD=your_gmail_app_password_here

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL=http://localhost:3000

# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"
```

### 2. Gmail Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password** from Google Account Settings
3. **Add App Password** to your `.env` file
4. **Test the connection** using the test endpoint

### 3. Install Dependencies

```bash
npm install nodemailer @types/nodemailer
```

## Email Verification Flow

### Step 1: User Registration

```typescript
// User fills signup form
POST /api/auth/signup
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Step 2: Account Creation

```typescript
// 1. Check if user exists
const existingUser = await prisma.user.findUnique({
  where: { email: email.toLowerCase() }
});

// 2. Hash password
const hashedPassword = await bcrypt.hash(password, 12);

// 3. Generate verification token
const verificationToken = randomBytes(32).toString('hex');
const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

// 4. Create user (unverified)
const user = await prisma.user.create({
  data: {
    username,
    email: email.toLowerCase(),
    password: hashedPassword,
    isVerified: false,
  }
});

// 5. Store verification token
await prisma.verificationToken.create({
  data: {
    token: verificationToken,
    userId: user.id,
    expires: tokenExpiry,
  }
});
```

### Step 3: Email Sending

```typescript
// Send verification email via Gmail SMTP
await sendGmailVerificationEmail(email, verificationToken);
```

### Step 4: Email Verification

```typescript
// User clicks email link
GET /api/verify-email?token=abc123...

// 1. Validate token
const record = await prisma.verificationToken.findUnique({ 
  where: { token } 
});

// 2. Check expiration
if (!record || record.expires < new Date()) {
  return redirect("/?error=token-expired");
}

// 3. Mark user as verified
await prisma.user.update({
  where: { id: record.userId },
  data: { isVerified: true },
});

// 4. Delete used token
await prisma.verificationToken.delete({ 
  where: { token } 
});

// 5. Redirect to login
return redirect("/login?verified=true");
```

## API Endpoints

### 1. Registration Endpoint

**URL:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Registration successful! Please check your email to verify your account before logging in.",
  "requiresVerification": true
}
```

**Error Responses:**
- `400` - Missing fields or user already exists
- `500` - Internal server error

### 2. Email Verification Endpoint

**URL:** `GET /api/verify-email?token={token}`

**Parameters:**
- `token` - Verification token from email

**Responses:**
- `307` - Redirect to `/login?verified=true` (success)
- `307` - Redirect to `/?error=token-expired` (expired token)
- `307` - Redirect to `/?error=verification-failed` (error)

### 3. Manual Verification Endpoint (Development)

**URL:** `POST /api/manual-verify`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Account verified successfully! You can now login.",
  "userId": "user_id"
}
```

## Database Schema

### User Model

```prisma
model User {
  id String @id @default(cuid())
  username String
  email String @unique
  password String
  image String?
  isVerified Boolean @default(false)  // Email verification status
  bookmarks Bookmark[]
  createdAt DateTime @default(now())
  verificationTokens VerificationToken[]
}
```

### VerificationToken Model

```prisma
model VerificationToken {
  token String @id
  userId String
  user User @relation(fields: [userId], references: [id])
  expires DateTime
}
```

## Email Template

### HTML Email Structure

```html
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
```

## Troubleshooting

### Common Issues

#### 1. Emails Not Received

**Symptoms:** User registers but doesn't receive verification email

**Solutions:**
- Check spam/junk folder
- Verify Gmail app password is correct
- Check Gmail sent folder for delivery status
- Use manual verification endpoint for testing

**Debug Steps:**
```bash
# Test email functionality
curl -X POST "http://localhost:3000/api/test-email" \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
```

#### 2. Gmail Authentication Error

**Symptoms:** "Invalid login" or "Less secure app access" error

**Solutions:**
- Ensure 2-Factor Authentication is enabled
- Use App Password, not regular password
- Generate new app password if needed

#### 3. Token Expiration

**Symptoms:** User clicks email link but gets "token expired" error

**Solutions:**
- Tokens expire after 1 hour
- Generate new verification email
- Use manual verification for immediate access

#### 4. Database Connection Issues

**Symptoms:** Registration fails with database errors

**Solutions:**
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Run Prisma migrations: `npx prisma migrate dev`

### Debug Commands

```bash
# Check if server is running
curl http://localhost:3000/api/auth/session

# Test email sending
curl -X POST "http://localhost:3000/api/test-email" \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'

# Manual verification
curl -X POST "http://localhost:3000/api/manual-verify" \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com"}'

# Test verification endpoint
curl "http://localhost:3000/api/verify-email?token=test-token"
```

## Alternative Solutions

### 1. Manual Verification (Development)

For development and testing, use the manual verification endpoint:

```bash
curl -X POST "http://localhost:3000/api/manual-verify" \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com"}'
```

### 2. Different Email Providers

If Gmail SMTP has issues, consider:

- **Outlook/Hotmail SMTP**
- **Yahoo SMTP**
- **SendGrid**
- **Mailgun**
- **AWS SES**

### 3. SMS Verification

For additional security, implement SMS verification:

```typescript
// Example SMS verification
const twilio = require('twilio');
const client = twilio(accountSid, authToken);

await client.messages.create({
  body: `Your verification code is: ${verificationCode}`,
  from: '+1234567890',
  to: phoneNumber
});
```

## Security Considerations

### 1. Token Security

- **Random Generation:** Use `crypto.randomBytes(32)` for secure tokens
- **Expiration:** Set reasonable expiration times (1 hour recommended)
- **One-time Use:** Delete tokens after verification
- **HTTPS:** Always use HTTPS in production

### 2. Rate Limiting

Implement rate limiting to prevent abuse:

```typescript
// Example with express-rate-limit
const rateLimit = require('express-rate-limit');

const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});

app.use('/api/auth/signup', signupLimiter);
```

### 3. Email Validation

```typescript
// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({ error: "Invalid email format" });
}
```

### 4. Password Security

```typescript
// Strong password requirements
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
if (!passwordRegex.test(password)) {
  return res.status(400).json({ 
    error: "Password must be at least 8 characters with uppercase, lowercase, number, and special character" 
  });
}
```

## Production Deployment

### 1. Environment Variables

```env
# Production
GMAIL_APP_PASSWORD=your_production_app_password
NEXTAUTH_SECRET="your-secure-secret"
NEXTAUTH_URL=https://yourdomain.com
DATABASE_URL="postgresql://user:pass@host:port/db"
```

### 2. Gmail Configuration

1. **Use the same Gmail account** or create a dedicated one
2. **Monitor email limits** - Gmail allows 500 emails/day for free
3. **Check sent folder** for delivery status
4. **Set up email monitoring** for delivery issues

### 3. Monitoring

- **Email Delivery Rates:** Monitor in Gmail sent folder
- **Error Logging:** Implement proper error logging
- **User Feedback:** Add user-friendly error messages

## Testing

### Unit Tests

```typescript
// Example test for email verification
describe('Email Verification', () => {
  it('should verify user with valid token', async () => {
    // Test implementation
  });

  it('should reject expired token', async () => {
    // Test implementation
  });
});
```

### Integration Tests

```typescript
// Test complete flow
describe('Registration Flow', () => {
  it('should register user and send verification email', async () => {
    // Test implementation
  });
});
```

## Conclusion

This email verification system provides a secure and user-friendly way to verify user accounts using Gmail SMTP. The combination of Gmail for reliable email delivery, secure token generation, and proper database management ensures a robust verification process.

For development, the manual verification endpoint provides a quick way to test the system without waiting for emails. In production, proper email delivery monitoring and user feedback are essential for a good user experience.

---

**Last Updated:** June 22, 2025  
**Version:** 2.0  
**Author:** DevDarshan Team 