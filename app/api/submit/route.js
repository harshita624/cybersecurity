// /pages/api/submit.js

// app/api/submit/route.js

// /api/submit/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate and process the data here
    // You can store it in a database or perform other operations
    // For demonstration, I'm just logging it
    console.log('Received form data:', data);

    // Respond with success
    return NextResponse.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
