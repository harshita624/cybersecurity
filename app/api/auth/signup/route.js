import { hash } from 'bcrypt';
import connectMongo from '../../../lib/mongodb';
import User from '../../../models/User'; // Going back 3 levels to reach the models directory


export async function POST(req) {
  try {
    await connectMongo();
    const { name, email, password } = await req.json();

    const hashedPassword = await hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });

    return new Response(JSON.stringify({ message: 'User registered successfully!' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Registration failed.' }), { status: 500 });
  }
}
