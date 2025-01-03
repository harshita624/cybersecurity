// utils/dbConnect.js
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    // If already connected, no need to connect again
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MongoDB URI is not defined');
  }

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectDB;
