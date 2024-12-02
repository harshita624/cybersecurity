import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Subscriber Schema
const SubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    trim: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
});

// Create or get existing model
const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Invalid email address' }, 
        { status: 400 }
      );
    }

    // Check if subscriber already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { message: 'Email already subscribed' }, 
        { status: 409 }
      );
    }

    // Create new subscriber
    const newSubscriber = new Subscriber({ email, name });
    await newSubscriber.save();

    // Create transporter
    const transporter = createTransporter();

    // Send welcome email to subscriber
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email, // Dynamically set to the user's email
      subject: 'Welcome to CyberShield Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Welcome to CyberShield!</h1>
          <p>Hi ${name || 'there'},</p>
          <p>Thank you for subscribing to our newsletter. We'll keep you updated with the latest cybersecurity insights and protection strategies.</p>
          <p>Best regards,<br>CyberShield Team</p>
        </div>
      `
    });

    // Send internal notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Internal tracking email
      subject: 'New Newsletter Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Subscriber</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p>Subscribed on: ${new Date().toLocaleString()}</p>
        </div>
      `
    });

    return NextResponse.json(
      { message: 'Subscription successful' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'Email already subscribed' }, 
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Error processing subscription' }, 
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method Not Allowed' }, 
    { status: 405 }
  );
}