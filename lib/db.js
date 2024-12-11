const mongoose = require('mongoose');

const connectToDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || !uri.startsWith('mongodb')) {
    throw new Error('Please add your MongoDB URI to .env.local');
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw new Error('Failed to connect to MongoDB: ' + error.message);
  }
};

module.exports = { connectToDatabase };
