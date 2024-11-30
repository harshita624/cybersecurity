// lib/users.js
import clientPromise from './mongodb';

export async function findUserByUsername(username) {
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection('users');
  
  const user = await usersCollection.findOne({ username });

  return user;
}
