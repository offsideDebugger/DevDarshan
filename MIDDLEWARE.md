# Middleware Documentation

## Overview

The middleware in this application provides comprehensive route protection, ensuring that only authenticated and verified users can access protected routes while allowing public access to essential pages.

## How It Works

### Route Protection Logic

1. **Public Routes**: The following routes are accessible without authentication:
   - `/` (home page)
   - `/signup` (registration page)
   - `/login` (login page)
   - `/about` (about page)
   - All authentication API routes (`/api/auth/*`)
   - Email verification routes (`/api/verify-email`, `/api/test-email`, `/api/manual-verify`)
   - Static assets (`/_next/*`, `/favicon.ico`)

2. **Protected Routes**: All other routes require:
   - Valid authentication token
   - Verified email address

### Authentication Flow

1. **No Token**: If no authentication token is found, users are redirected to `/login` with the original URL as `callbackUrl`
2. **Unverified User**: If a user is authenticated but not verified, they are redirected to `/login` with an "unverified" error message
3. **Verified User**: If a user is authenticated and verified, they can access the protected route

### Error Handling

The middleware provides specific error messages for different scenarios:

- **Unverified users**: "Please verify your email before accessing this page. Check your inbox for the verification link."
- **Missing authentication**: Users are redirected to login with the original URL preserved

## Configuration

### Matcher Pattern

The middleware uses a comprehensive matcher pattern that excludes:
- Authentication API routes
- Email verification routes
- Static files and assets
- Image files

```typescript
'/((?!api/auth|api/verify-email|api/test-email|api/manual-verify|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
```

### Environment Variables

The middleware requires:
- `NEXTAUTH_SECRET`: Used for JWT token verification

## Security Features

1. **Token Verification**: Uses NextAuth's `getToken` function to verify JWT tokens
2. **Email Verification Check**: Ensures users have verified their email before accessing protected content
3. **Redirect Preservation**: Maintains the original URL as `callbackUrl` for seamless user experience
4. **Comprehensive Coverage**: Protects all routes except explicitly public ones

## Testing

### Public Routes (Should be accessible)
- `GET /` ✅
- `GET /signup` ✅
- `GET /login` ✅
- `GET /api/auth/session` ✅

### Protected Routes (Should redirect to login)
- `GET /dashboard` → Redirects to `/login`
- `GET /profile` → Redirects to `/login`
- `GET /bookmarks` → Redirects to `/login`

### Verified User Flow
1. User logs in with verified email
2. User can access all protected routes
3. JWT token contains `isVerified: true`

### Unverified User Flow
1. User logs in with unverified email
2. User is redirected to login with "unverified" error
3. User must verify email before accessing protected routes

## Integration with NextAuth

The middleware works seamlessly with the NextAuth configuration:

- JWT tokens include `isVerified` field
- Session objects contain verification status
- Login page handles "unverified" error messages
- Email verification updates user status in database

## Maintenance

### Adding New Public Routes

To add a new public route, update the `publicRoutes` array in `middleware.ts`:

```typescript
const publicRoutes = [
  '/',
  '/signup',
  '/login',
  '/about',
  '/new-public-route', // Add here
  // ... other routes
];
```

### Adding New Protected Routes

New routes are automatically protected unless added to the public routes list.

### Debugging

To debug middleware issues:

1. Check browser network tab for redirects
2. Verify JWT token in browser storage
3. Check server logs for middleware execution
4. Ensure `NEXTAUTH_SECRET` is properly set

## Best Practices

1. **Always verify email**: Never allow unverified users to access protected content
2. **Preserve user intent**: Use `callbackUrl` to redirect users back to their intended destination
3. **Clear error messages**: Provide specific feedback for different authentication states
4. **Comprehensive coverage**: Protect all routes by default, explicitly allow public ones 