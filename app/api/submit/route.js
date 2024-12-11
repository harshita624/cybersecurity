// app/api/submit/route.js

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate the data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: 'All fields (name, email, message) are required.' },
        { status: 400 }
      );
    }

    // Create a transporter object using SMTP for sending email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like 'SendGrid', 'Mailgun', etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email address from .env.local
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Mail options for the admin (you)
    const adminMailOptions = {
      from: data.email, // Sender email (this can be the email provided by the user)
      to: process.env.EMAIL_USER, // Replace with the recipient email address
      subject: 'New Form Submission',
      text: `
        You have a new form submission:

        Name: ${data.name}
        Email: ${data.email}
        Message: ${data.message}
      `,
    };

    // Mail options for the user (confirmation email)
    const userMailOptions = {
      from: process.env.EMAIL_USER, // Replace with your email address
      to: data.email, // The email provided by the user
      subject: 'Confirmation: Form Submission Received',
      text: `
        Dear ${data.name},

        Thank you for your submission! We have received your form, and our team will get back to you soon.

        Here are the details we received:
        
        Name: ${data.name}
        Email: ${data.email}
        Message: ${data.message}

        Best regards,
        Your Team
      `,
    };

    // Send the admin email and the confirmation email
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    // Respond with success
    return NextResponse.json({ success: true, message: 'Form submitted successfully. A confirmation email has been sent.' });
  } catch (error) {
    console.error('Error processing form submission:', error);

    // Handle error in email sending
    if (error.response) {
      console.error('Email sending failed with response:', error.response);
    }

    return NextResponse.json(
      { success: false, message: 'Failed to submit form. Please try again later.' },
      { status: 500 }
    );
  }
}
