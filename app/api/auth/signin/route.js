// app/api/auth/signin/route.js (or a similar file path in your project)
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req, res) {
  const uri = process.env.MONGODB_URI;

  try {
    const { email, password } = await req.json(); // Parse JSON from request body

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    const usersCollection = db.collection('users');

    // Find user by email
    const user = await usersCollection.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // If user is authenticated successfully
    return res.status(200).json({
      success: true,
      message: 'Sign-in successful',
      user: {
        id: user._id.toString(), // Convert MongoDB ObjectId to string
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Error in sign-in API:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
