import { prisma } from "@/db/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

 
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email.toLowerCase()
            }
          });

          // Check if user exists
          if (!user) {
            throw new Error('No user found with this email');
          }

          // ✅ CHECK IF EMAIL IS VERIFIED
          if (!user.isVerified) {
            throw new Error('Please verify your email before logging in. Check your inbox for verification link.');
          }

          // Verify password
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error('Invalid password');
          }

          // Return user object (NextAuth will handle the redirect)
          return {
            id: user.id,
            email: user.email,
            name: user.username,
            isVerified: user.isVerified
          };

        } catch (error) {
          console.error('Authentication error:', error);
          // Re-throw the error so NextAuth can handle it
          throw error;
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token?.id) {
        session.user.id = token.id as string;
        session.user.isVerified = token.isVerified;
      }
      return session;
    },
    
    async redirect({ baseUrl }: { baseUrl: string }) {
      // Always redirect to dashboard after successful sign in
      return `${baseUrl}/dashboard`;
    }
  },
  
  events: {
    async signOut() {
      // Clear any server-side session data if needed
      // No-op for now
    },
  },
  
  pages: {
    signIn: "/login",
    error: "/login", // Redirect errors to login page
    signOut: "/", // Redirect to home page after signout
  },
  
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};