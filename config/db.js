import mongoose from "mongoose";

// פונקציה לחיבור למסד הנתונים
const connectDB = async () => {
  try {
    // חיבור ל־MongoDB מקומי
    await mongoose.connect("mongodb://127.0.0.1:27017/ordersDB");

    console.log("MongoDB connected successfully");
  } catch (error) {
    // כשל בחיבור למסד
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// ייצוא הפונקציה
export default connectDB;
