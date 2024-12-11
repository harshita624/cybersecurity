import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { userDetails, location, station } = await request.json();

    // Validate input
    if (!userDetails || !location || !station) {
      return NextResponse.json(
        { error: 'Missing required information' }, 
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const message = `
      Emergency Incident Report:
      
      Reporting Person:
      - Name: ${userDetails.name}
      - Phone: ${userDetails.phone}
      
      Location:
      - Latitude: ${location.latitude}
      - Longitude: ${location.longitude}
      
      Nearest Police Station:
      - Name: ${station.name}
      - Address: ${station.address}
      - Contact: ${station.phone}
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: station.email || station.phone,
      subject: 'Emergency Incident Report',
      text: message
    });

    return NextResponse.json({ 
      message: 'Details sent to police station successfully' 
    });

  } catch (error) {
    console.error('Error in notify-police route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' }, 
      { status: 500 }
    );
  }
}