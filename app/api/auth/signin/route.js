import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    const { email, password } = await req.json();
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'User not found' }),
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid password' }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Sign-in successful',
        user: { id: user._id, email: user.email, name: user.name },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in sign-in API:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { status: 500 }
    );
  } finally {
    await client.close(); // Always close the database connection
  }
}
