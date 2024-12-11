// models/Subscriber.js
import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  name: {
    type: String,
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate email registrations
SubscriberSchema.index({ email: 1 }, { unique: true });

export default mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);