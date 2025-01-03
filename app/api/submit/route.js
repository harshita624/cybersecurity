// app/api/submit/route.js

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Create transporter
function createTransporter() {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email configuration is missing');
    }

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Only use during development
      },
    });
  } catch (error) {
    console.error('Error creating transporter:', error);
    throw new Error('Failed to create email transporter');
  }
}

export async function POST(request) {
  let transporter;

  try {
    const data = await request.json();

    if (!data.name?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name is required.' },
        { status: 400 }
      );
    }
    
    if (!data.email?.trim() || !isValidEmail(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Valid email is required.' },
        { status: 400 }
      );
    }
    
    if (!data.message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Message is required.' },
        { status: 400 }
      );
    }
    

    // Create email transporter
    transporter = createTransporter();

    // Sanitize and format data
    const sanitizedData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      message: data.message.trim(),
    };

    // Admin email options
    const adminMailOptions = {
      from: `"Form Submission" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Form Submission from ${sanitizedData.name}`,
      text: `
New form submission received:

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Message: ${sanitizedData.message}

Timestamp: ${new Date().toISOString()}
      `,
      html: `
<h2>New Form Submission</h2>
<p><strong>Name:</strong> ${sanitizedData.name}</p>
<p><strong>Email:</strong> ${sanitizedData.email}</p>
<p><strong>Message:</strong> ${sanitizedData.message}</p>
<p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `,
    };

    // User confirmation email options
    const userMailOptions = {
      from: `"Your Company Name" <${process.env.EMAIL_USER}>`,
      to: sanitizedData.email,
      subject: 'Thank You for Your Submission',
      text: `
Dear ${sanitizedData.name},

Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.

Your submission details:
Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Message: ${sanitizedData.message}

Best regards,
Your Company Name Team
      `,
      html: `
<h2>Thank You for Your Submission</h2>
<p>Dear ${sanitizedData.name},</p>
<p>Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.</p>
<h3>Your submission details:</h3>
<p><strong>Name:</strong> ${sanitizedData.name}</p>
<p><strong>Email:</strong> ${sanitizedData.email}</p>
<p><strong>Message:</strong> ${sanitizedData.message}</p>
<br>
<p>Best regards,<br>Your Company Name Team</p>
      `,
    };

    // Send emails concurrently
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully. A confirmation email has been sent.',
    });
  } catch (error) {
    console.error('Error handling form submission:', error);

    // Define error responses based on the error type
    const errorResponses = {
      'Email configuration is missing': { message: 'Server configuration error. Please contact support.', status: 500 },
      EAUTH: { message: 'Email authentication failed. Please contact support.', status: 500 },
      ETIMEDOUT: { message: 'Request timed out. Please try again later.', status: 504 },
    };

    const { message, status } = errorResponses[error.message] || {
      message: 'An unexpected error occurred. Please try again later.',
      status: 500,
    };

    return NextResponse.json(
      { success: false, message },
      { status }
    );
  } finally {
    if (transporter) {
      transporter.close();
    }
  }
}
