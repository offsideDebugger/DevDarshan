# Gmail SMTP Setup Guide

## 🎯 Why Gmail SMTP?

Using your own Gmail account (`devdarshannn@gmail.com`) for sending emails will:
- ✅ **Better delivery rates** - Gmail is trusted by all email providers
- ✅ **No spam filtering** - Emails come from a real Gmail account
- ✅ **Professional appearance** - Users see emails from your actual email
- ✅ **Reliable delivery** - Gmail's infrastructure is very reliable

## 📋 Step-by-Step Setup

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on **"Security"** in the left sidebar
3. Find **"2-Step Verification"** and click **"Get started"**
4. Follow the setup process to enable 2FA on your account

### Step 2: Generate App Password

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on **"Security"** in the left sidebar
3. Find **"App passwords"** (under "Signing in to Google")
4. Click **"App passwords"**
5. Select **"Mail"** as the app
6. Select **"Other (Custom name)"** as device
7. Enter **"DevDarshan"** as the name
8. Click **"Generate"**
9. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)

### Step 3: Update Environment Variables

1. Open your `.env` file
2. Replace the placeholder with your actual app password:

```env
# Gmail Configuration
GMAIL_APP_PASSWORD=your_actual_16_character_app_password

# Keep existing variables
RESEND_API_KEY=re_QYDiMe8L_594C4kHNZiYZTuyahnP4pu9d
NEXTAUTH_SECRET="meup"
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="postgresql://neondb_owner:npg_Gl3vaNc5qXEh@ep-curly-flower-a5jhtgx1-pooler.us"
```

### Step 4: Test the Setup

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Test email sending:**
   ```bash
   curl -X POST "http://localhost:3000/api/test-email" \
        -H "Content-Type: application/json" \
        -d '{"email":"your-test-email@gmail.com"}'
   ```

3. **Or use the web interface:**
   - Go to `http://localhost:3000/test-email`
   - Enter your email address
   - Click "Send Test Email"

## 🔧 Troubleshooting

### Common Issues:

#### 1. "Invalid login" Error
- **Problem:** App password is incorrect
- **Solution:** Generate a new app password and update `.env`

#### 2. "Less secure app access" Error
- **Problem:** 2FA not enabled or wrong password type
- **Solution:** Make sure you're using an App Password, not your regular password

#### 3. "Connection timeout" Error
- **Problem:** Network or firewall blocking SMTP
- **Solution:** Check your internet connection and firewall settings

### Debug Commands:

```bash
# Check if Gmail connection works
curl -X POST "http://localhost:3000/api/test-email" \
     -H "Content-Type: application/json" \
     -d '{"email":"test@gmail.com"}' -v

# Check server logs for Gmail connection status
# Look for: "✅ Gmail SMTP connection verified successfully"
```

## 📧 Email Features

### What Users Will See:
- **From:** `DevDarshan <devdarshannn@gmail.com>`
- **Subject:** `🔐 Verify your DevDarshan account - Complete your registration`
- **Professional HTML email** with your branding
- **Verification link** that expires in 1 hour

### Benefits:
- ✅ **High delivery rate** - Gmail is trusted worldwide
- ✅ **No spam folder** - Emails go directly to inbox
- ✅ **Professional appearance** - Real Gmail account
- ✅ **Reliable service** - Gmail's infrastructure

## 🚀 Production Deployment

### For Production:
1. **Use the same setup** - Gmail works great in production
2. **Update NEXTAUTH_URL** to your production domain
3. **Monitor email delivery** through Gmail's sent folder
4. **Consider email limits** - Gmail allows 500 emails/day for free

### Alternative for High Volume:
If you need to send many emails, consider:
- **Gmail Business** (higher limits)
- **Google Workspace** (enterprise features)
- **SendGrid** (dedicated email service)

## ✅ Success Indicators

You'll know it's working when:
- ✅ Server starts without Gmail connection errors
- ✅ Test emails are delivered to inbox (not spam)
- ✅ Users receive verification emails immediately
- ✅ Email links work and verify accounts successfully

---

**Need Help?** Check the terminal logs for detailed error messages and connection status. 