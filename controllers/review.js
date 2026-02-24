import { reviewModel } from "../models/review.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find().sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { name, rating, text, attraction } = req.body;
    if (!name || !rating || !text)
      return res.status(400).json({ message: "חסרים שדות" });
    const review = new reviewModel({ name, rating, text, attraction });
    await review.save();
    return res.status(201).json(review);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};