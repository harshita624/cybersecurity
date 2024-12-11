// lib/mongodb.js
// lib/mongodb.js
// lib/mongodb.js
// app/lib/mongodb.js
import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    // Already connected
    return;
  }

  // Connecting to the database
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectMongo;
