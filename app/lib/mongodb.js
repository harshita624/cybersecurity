// lib/mongodb.js
// lib/mongodb.js
// lib/mongodb.js
// app/lib/mongodb.js
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectMongo;
