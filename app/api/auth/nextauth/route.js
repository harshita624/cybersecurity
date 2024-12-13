// app/api/auth/[...nextauth]/route.js
require('dotenv').config();
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = new MongoClient(process.env.MONGODB_URI);
        
        try {
          await client.connect();
          const db = client.db(process.env.MONGODB_DB);
          const usersCollection = db.collection("users");

          const user = await usersCollection.findOne({ email: credentials.email });

          if (user && await bcrypt.compare(credentials.password, user.password)) {
            return { 
              id: user._id.toString(), 
              email: user.email 
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        } finally {
          await client.close();
        }
      },
    }),
  ],
  
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    }
  },
  
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };