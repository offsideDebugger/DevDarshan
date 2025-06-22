# Email Verification Quick Reference

## Quick Commands

### Test Email Functionality
```bash
curl -X POST "http://localhost:3000/api/test-email" \
     -H "Content-Type: application/json" \
     -d '{"email":"your-email@example.com"}'
```

### Manual Verification (Development)
```bash
curl -X POST "http://localhost:3000/api/manual-verify" \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com"}'
```

### Test Verification Endpoint
```bash
curl "http://localhost:3000/api/verify-email?token=test-token"
```

## Common Issues & Solutions

### ❌ 405 Method Not Allowed
**Problem:** API route using old Pages Router format
**Solution:** Convert to App Router format (already fixed)

### ❌ Email Not Received
**Problem:** Email sent but not delivered
**Solutions:**
1. Check spam/junk folder
2. Verify Gmail app password is correct
3. Check Gmail sent folder for delivery status
4. Use manual verification endpoint for testing

### ❌ Gmail Authentication Error
**Problem:** "Invalid login" or "Less secure app access" error
**Solutions:**
1. Enable 2-Factor Authentication on Gmail
2. Use App Password, not regular password
3. Generate new app password if needed

### ❌ Token Expired
**Problem:** Verification link expired
**Solutions:**
1. Tokens expire after 1 hour
2. Register again to get new token
3. Use manual verification for immediate access

### ❌ Database Connection Error
**Problem:** Can't connect to PostgreSQL
**Solutions:**
1. Check DATABASE_URL in .env
2. Ensure PostgreSQL is running
3. Run `npx prisma migrate dev`

## Environment Variables Checklist

```env
# Gmail Configuration (Required)
GMAIL_APP_PASSWORD=your_gmail_app_password_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="your-secret"

# Database Configuration
DATABASE_URL="postgresql://user:pass@host:port/db"
```

## Email Flow Summary

1. **User Registration** → Creates unverified account
2. **Token Generation** → 32-character hex token (1 hour expiry)
3. **Email Sending** → Via Gmail SMTP
4. **User Clicks Link** → Verifies token in database
5. **Account Activation** → User can now login

## Security Notes

- ✅ Tokens expire after 1 hour
- ✅ Tokens are deleted after use
- ✅ Passwords are hashed with bcrypt
- ✅ HTTPS required in production
- ✅ Gmail app password for secure authentication
- ⚠️ Check spam folders for emails
- ⚠️ Monitor Gmail sent folder for delivery issues

## Development Tips

1. **Use manual verification** for quick testing
2. **Check terminal logs** for debugging info
3. **Test with different email providers**
4. **Monitor Gmail sent folder** for delivery status
5. **Use Gmail app password** for authentication

## Production Checklist

- [ ] Gmail app password configured
- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Email delivery monitoring
- [ ] Error logging configured
- [ ] Gmail sent folder monitoring 