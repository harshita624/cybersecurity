// app/api/subscribe/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/utils/dbConnect';
import Subscriber from '@/models/Subscriber';

export async function POST(request) {
  try {
    // Ensure database connection
    await connectDB();

    // Parse request body
    const body = await request.json();
    const { email, name } = body;

    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' }, 
        { status: 400 }
      );
    }

    // Check for existing subscriber
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { message: 'Email already subscribed' }, 
        { status: 400 }
      );
    }

    // Create new subscriber
    const newSubscriber = new Subscriber({
      email,
      name: name || undefined
    });

    await newSubscriber.save();

    return NextResponse.json(
      { 
        message: 'Subscription successful',
        subscriber: { email, name }
      }, 
      { status: 201 }
    );

  } catch (error) {
    console.error('Subscription error:', error);

    // Handle specific mongoose validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          message: 'Invalid input',
          errors: Object.values(error.errors).map(err => err.message)
        }, 
        { status: 400 }
      );
    }

    // Generic server error
    return NextResponse.json(
      { 
        message: 'Internal server error', 
        error: error.message 
      }, 
      { status: 500 }
    );
  }
}