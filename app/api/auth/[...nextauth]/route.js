// app/api/auth/nextauth/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs'; // Recommended for password hashing

const uri = "mongodb+srv://23053364:kartik4903@cluster0.ma397.mongodb.net/myapp?retryWrites=true&w=majority";

export const authOptions = {
  // Add the secret at the top level
  secret: process.env.NEXTAUTH_SECRET,
  
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

          if (user) {
            // Compare hashed password
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password, 
              user.password
            );

            if (isPasswordCorrect) {
              return { 
                id: user._id.toString(), 
                email: user.email 
              };
            }
          }
          
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        } finally {
          await client.close();
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };