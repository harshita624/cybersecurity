import connectMongo from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(req) {
  const { email, password, name } = await req.json();

  try {
    await connectMongo(); // Connect to MongoDB

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Return 409 if email already exists
      return new Response(
        JSON.stringify({ error: 'Email already registered' }),
        { status: 409 }
      );
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password, // You should hash the password before saving
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ message: 'User registered successfully' }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Something went wrong' }),
      { status: 500 }
    );
  }
}
