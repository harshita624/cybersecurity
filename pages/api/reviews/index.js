// pages/api/reviews/index.js

let reviews = []; // In-memory storage for demonstration

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(reviews);
  } else if (req.method === 'POST') {
    const { name, reviewText, rating } = req.body;

    if (!name || !reviewText || typeof rating !== 'number') {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    const newReview = {
      _id: Date.now().toString(),
      name,
      reviewText,
      rating,
      timestamp: new Date(),
    };

    reviews.push(newReview);
    res.status(201).json({ message: 'Review added successfully' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
