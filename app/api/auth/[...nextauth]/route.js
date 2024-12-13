// app/api/auth/nextauth/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://23053364:kartik4903@cluster0.ma397.mongodb.net/myapp?retryWrites=true&w=majority";

export const authOptions = {
  // Explicitly set the secret
  secret: process.env.NEXTAUTH_SECRET || 'fallback-very-long-random-secret-key-here',
  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = new MongoClient(uri);
        
        try {
          await client.connect();
          const db = client.db("myapp");
          const usersCollection = db.collection("users");

          const user = await usersCollection.findOne({ email: credentials.email });

          if (user && user.password === credentials.password) {
            return { id: user._id.toString(), email: user.email };
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
  
  // Add callback to log secret status
  callbacks: {
    async session({ session }) {
      console.log('NEXTAUTH_SECRET is:', process.env.NEXTAUTH_SECRET ? 'DEFINED' : 'UNDEFINED');
      return session;
    }
  },
  
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };