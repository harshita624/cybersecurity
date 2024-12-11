// In your MongoDB connection file (likely utils/dbConnect.js or similar)
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    
    await mongoose.connect(MONGODB_URI, {
      // Remove deprecated options
      // serverSelectionTimeoutMS: 5000, // Optional: Add timeout
      // socketTimeoutMS: 45000, // Optional: Socket timeout
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export default connectDB;