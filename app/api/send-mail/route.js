import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to, subject, message, type } = req.body;

    // Validate input
    if (!to || !subject || !message || !type) {
      return res.status(400).json({ error: "Missing required email fields" });
    }

    // Prepare the email content based on the type
    let emailContent;
    if (type === "form_submission") {
      emailContent = `<p>You have received a form submission:</p><p>${message}</p>`;
    } else if (type === "subscription") {
      emailContent = `<p>Thank you for subscribing! Here are your details:</p><p>${message}</p>`;
    } else {
      return res.status(400).json({ error: "Invalid email type" });
    }

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    try {
      const info = await transporter.sendMail({
        from: `"Your App Name" <${process.env.EMAIL_USER}>`,
        to, 
        subject, 
        html: emailContent,
        replyTo: process.env.EMAIL_USER
      });

      console.log("Email sent successfully:", info.messageId);
      res.status(200).json({ message: "Email sent successfully", messageId: info.messageId });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: "Failed to send email", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
