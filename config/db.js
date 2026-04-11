import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is missing in environment variables!");
        }
        
        await mongoose.connect(uri);
        console.log("✅ MongoDB Connected!");
    } catch (error) {
        console.error("❌ Connection Failed:", error.message);
        // חשוב: לא עושים process.exit(1) כאן כדי שהשרת ימשיך לרוץ
    }
};

export default connectDB;