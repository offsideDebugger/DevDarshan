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
            name: user.username// assuming you have a name or username field
            // Add other user properties you want to include
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
    async jwt({ token,user }:any){
          if(user){
            token.id=user.id;
          }
          return token;
        },
        async session({ session,token }:any){
          if(token?.id){
            session.user.id=token.id as string;
          }
          return session;
        },
    
    // Fixed redirect callback - should return absolute URLs
    async redirect({ url, baseUrl }) {
      // Always redirect to dashboard after successful sign in
      return `${baseUrl}/dashboard`;
    }
  },
  
  pages: {
    signIn: "/login",
    error: "/login", // Optional: redirect errors to login page
  },
  
  session: {
    strategy: "jwt",
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

// For App Router - add this export
// export default NextAuth(authOptions);