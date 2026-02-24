import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  attraction: { type: String, default: 'כללי' },
  createdAt: { type: Date, default: Date.now }
});

export const reviewModel = mongoose.model("Review", reviewSchema);