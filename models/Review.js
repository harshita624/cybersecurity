
// models/Review.js
import mongoose from "mongoose";

// Define the schema
const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Export the model
export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);

