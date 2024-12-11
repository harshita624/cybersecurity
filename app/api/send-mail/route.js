import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to, subject, message } = req.body;

    // Validate input
    if (!to || !subject || !message) {
      return res.status(400).json({ error: "Missing required email fields" });
    }

    // Consider using more reliable transporter configurations
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // More explicit configuration
      port: 465, // Use SSL port
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD // Recommend using App Password
      }
    });

    try {
      const info = await transporter.sendMail({
        from: `"Your App Name" <${process.env.EMAIL_USER}>`, // More professional sender format
        to, 
        subject, 
        html: message, // Consider using HTML for better formatting
        replyTo: process.env.EMAIL_USER // Good practice to set reply-to
      });

      console.log("Email sent successfully:", info.messageId);
      res.status(200).json({ 
        message: "Email sent successfully", 
        messageId: info.messageId 
      });

    } catch (error) {
      console.error("Comprehensive email error:", {
        message: error.message,
        stack: error.stack,
        code: error.code
      });

      res.status(500).json({ 
        error: "Failed to send email", 
        details: error.message 
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}