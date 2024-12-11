import { MongoClient } from 'mongodb';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // MongoDB connection URI
    const uri = "mongodb+srv://23053364:kartik4903@cluster0.ma397.mongodb.net/myapp?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('myapp'); // Adjust 'myapp' to match your database name
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email });

    if (user && user.password === password) {
      return new Response(JSON.stringify({ success: true, message: 'Sign-in successful' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Invalid email or password' }), { status: 401 });
    }
  } catch (error) {
    console.error("Error in sign-in API:", error);
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), { status: 500 });
  }
}
