// pages/api/reviews/index.js

import connectToDatabase from "@/lib/mongodb"; // Adjust if the path is different
import Review from "@/models/Review"; // Adjust if the path is different

const handler = async (req, res) => {
  try {
    // Connect to the database
    await connectToDatabase();

    if (req.method === "POST") {
      const { name, reviewText, rating } = req.body;

      // Validate the input
      if (!name || !reviewText || typeof rating !== "number" || rating < 1 || rating > 5) {
        return res.status(400).json({
          message: "All fields are required. Rating must be a number between 1 and 5.",
        });
      }

      // Save the new review
      const newReview = new Review({ name, reviewText, rating });
      await newReview.save();

      return res.status(201).json({ message: "Review submitted successfully!" });
    }

    if (req.method === "GET") {
      // Fetch all reviews
      const reviews = await Review.find({}).sort({ createdAt: -1 }); // Newest first
      return res.status(200).json(reviews);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

export default handler;
