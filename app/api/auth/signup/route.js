import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    // Parse incoming request JSON
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Email and password are required' }),
        { status: 400 }  // Bad Request
      );
    }

    // Connect to MongoDB
    await client.connect();
    const db = client.db(process.env.MONGODB_DB || 'myapp');
    const usersCollection = db.collection('users');

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: 'User already exists' }),
        { status: 409 }  // Conflict
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await usersCollection.insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, message: 'User registered successfully' }),
      { status: 201 }  // Created
    );
  } catch (error) {
    console.error("Error in signup API:", error);
    return new Response(
      JSON.stringify({ success: false, message: 'Server error' }),
      { status: 500 }  // Internal Server Error
    );
  } finally {
    await client.close(); // Always close the database connection
  }
}
