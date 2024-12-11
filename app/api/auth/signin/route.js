// app/api/auth/signin/route.js
import { connectToDatabase } from '../../../../lib/db';  // Correct path to db.js
import User from '../../../../models/User';  // Correct path to User model

export async function POST(request) {
  const { email, password } = await request.json();

  // Connect to the database
  await connectToDatabase();

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
    }

    return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
  } catch (error) {
    console.error('Signin Error:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong!' }), { status: 500 });
  }
}
