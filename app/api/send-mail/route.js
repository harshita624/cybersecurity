import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to, subject, message } = req.body;

    // Log the request data
    console.log("Sending email:", { to, subject, message });

    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can also use other services like 'SendGrid', 'Mailgun', etc.
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // your Gmail app password or email password
      },
    });

    try {
      // Send the email
      await transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to, // recipient address
        subject, // subject line
        text: message, // plain text body
      });

      // Success response
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      // Error handling
      console.error("Error sending email:", error.stack || error);

      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    // Invalid method
    res.status(405).json({ error: "Method not allowed" });
  }
}
