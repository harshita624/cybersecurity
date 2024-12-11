// app/api/auth/nextauth/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://23053364:kartik4903@cluster0.ma397.mongodb.net/myapp?retryWrites=true&w=majority";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db("myapp");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email: credentials.email });

        if (user && user.password === credentials.password) {
          return { id: user._id, email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
