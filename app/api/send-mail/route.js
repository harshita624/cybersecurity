// pages/api/send-mail/route.js

import nodemailer from "nodemailer";

// Email template generator
const generateEmailTemplate = (type, message, additionalData = {}) => {
  const templates = {
    form_submission: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message}
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Submitted at: ${new Date().toLocaleString()}
        </p>
      </div>
    `,
    subscription: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Subscription Confirmation</h2>
        <p>Thank you for subscribing!</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message}
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Subscribed at: ${new Date().toLocaleString()}
        </p>
      </div>
    `
  };

  return templates[type] || '';
};

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Rate limiting setup (basic implementation)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour
const MAX_EMAILS_PER_WINDOW = 50;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Basic API key validation
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { to, subject, message, type } = req.body;

    // Input validation
    if (!to || !subject || !message || !type) {
      return res.status(400).json({ 
        error: "Missing required fields",
        details: "All fields (to, subject, message, type) are required"
      });
    }

    if (!isValidEmail(to)) {
      return res.status(400).json({ 
        error: "Invalid email format",
        details: "The provided email address is not valid"
      });
    }

    // Rate limiting check
    const now = Date.now();
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const clientKey = `${clientIp}-${now}`;
    
    if (!rateLimit.has(clientIp)) {
      rateLimit.set(clientIp, {
        count: 0,
        firstRequest: now
      });
    }

    const clientData = rateLimit.get(clientIp);
    if (now - clientData.firstRequest > RATE_LIMIT_WINDOW) {
      clientData.count = 0;
      clientData.firstRequest = now;
    }

    if (clientData.count >= MAX_EMAILS_PER_WINDOW) {
      return res.status(429).json({ 
        error: "Too many requests",
        details: "Rate limit exceeded. Please try again later."
      });
    }

    // Validate email type
    const validTypes = ['form_submission', 'subscription'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ 
        error: "Invalid email type",
        details: `Email type must be one of: ${validTypes.join(', ')}`
      });
    }

    // Generate email content
    const emailContent = generateEmailTemplate(type, message);
    if (!emailContent) {
      return res.status(400).json({ 
        error: "Template generation failed",
        details: "Could not generate email template for the specified type"
      });
    }

    // Setup email transporter with retry logic
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      pool: true, // Use pooled connections
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000, // Delay between messages
      rateLimit: 5 // Max messages per rateDelta
    });

    // Verify transporter configuration
    await transporter.verify();

    // Send email with retry logic
    let retries = 3;
    let lastError = null;

    while (retries > 0) {
      try {
        const info = await transporter.sendMail({
          from: `"${process.env.EMAIL_FROM_NAME || 'Your App'}" <${process.env.EMAIL_USER}>`,
          to: to.trim(),
          subject: subject.trim(),
          html: emailContent,
          replyTo: process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER,
          headers: {
            'X-Entity-Ref-ID': `${type}-${Date.now()}` // For tracking
          }
        });

        // Update rate limit counter
        clientData.count++;
        rateLimit.set(clientIp, clientData);

        // Clean up old rate limit entries
        for (const [key, value] of rateLimit.entries()) {
          if (now - value.firstRequest > RATE_LIMIT_WINDOW) {
            rateLimit.delete(key);
          }
        }

        return res.status(200).json({ 
          message: "Email sent successfully", 
          messageId: info.messageId 
        });
      } catch (error) {
        lastError = error;
        retries--;
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
          continue;
        }
        break;
      }
    }

    // If we get here, all retries failed
    console.error("Email error after retries:", lastError);
    return res.status(500).json({ 
      error: "Failed to send email", 
      details: lastError.message 
    });

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      details: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred'
    });
  }
}