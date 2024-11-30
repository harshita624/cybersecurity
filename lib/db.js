// lib/db.js

import clientPromise from "./mongodb";

export const findUserByUsername = async (username) => {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection("users");  // Assuming you have a 'users' collection
  return await users.findOne({ username });
};
