import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userDetails, location, station } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const message = `
      New incident report:

      Name: ${userDetails.name}
      Phone: ${userDetails.phone}
      Location: Latitude: ${location.latitude}, Longitude: ${location.longitude}

      Nearest Station:
      Name: ${station.name}
      Address: ${station.address}
      Phone: ${station.phone}
    `;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: station.phone,  // You can replace this with the station's email or other method of contact
        subject: 'New Incident Report',
        text: message
      });

      res.status(200).json({ message: 'Details sent to police station.' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send details.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
