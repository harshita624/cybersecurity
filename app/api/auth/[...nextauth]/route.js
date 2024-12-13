// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = new MongoClient(process.env.MONGODB_URI);
        
        try {
          await client.connect();
          const db = client.db('myapp'); // Replace with your actual database name
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
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }