// lib/mongodb.js
// lib/mongodb.js
// lib/mongodb.js
// lib/mongodb.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URL);

const clientPromise = client.connect();

export default clientPromise;

