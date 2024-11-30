// pages/api/auth/[...nextauth].js

// app/api/auth/nextauth.js

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb"; // Path to your MongoDB connection helper

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // Add other providers (like Credentials) here if needed
  ],
  
  adapter: MongoDBAdapter(clientPromise),  // MongoDB adapter for storing session data

  pages: {
    signIn: '/auth/signin', // Customize the sign-in page URL
  },

  session: {
    strategy: "jwt",  // Or "database" if using MongoDB for sessions
  },
  
  secret: process.env.TOKEN_SECRET,  // Use your TOKEN_SECRET from the environment

  callbacks: {
    async jwt({ token, account, user }) {
      // Persist user information on JWT token
      if (account && user) {
        token.id = user.id;
        token.email = user.email; // Make sure to store email or other user data you need
      }
      return token;
    },

    async session({ session, token }) {
      // Attach the token information to the session
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },

  // Customizing other settings as necessary
  pages: {
    signIn: '/auth/signin', // Add your custom sign-in page path
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
