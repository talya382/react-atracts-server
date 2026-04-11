import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ordersRoutes from "./routs/orders.js";
import attractionsRoutes from "./routs/atraction.js";
import usersRoutes from "./routs/user.js";
import connectDB from "./config/db.js";
import { printToLog } from "./middlewares/logToFile.js";
import reviewRouter from "./routs/review.js";
import forgotPasswordRouter from "./routs/forgotPassword.js";

// טעינת משתני סביבה - ודאי שזה קורה לפני הכל
dotenv.config();

const app = express(); 

// פונקציית עזר להרצת השרת רק אחרי חיבור מוצלח ל-DB
const startServer = async () => {
    try {
        // חיבור למסד הנתונים
        await connectDB();
        console.log("Database connected successfully");

        // Middlewares
        app.use(cors({
          origin: [
              "http://localhost:5173", // לעבודה במחשב
              "https://atract-israel-bytay.netlify.app" // האתר החי בנטליפיי
          ],
          methods: ["GET", "POST", "PUT", "DELETE"],
          credentials: true
      }));

        app.use(express.json()); 
        app.use(express.urlencoded({ extended: true }));
        app.use(printToLog);

        // Routes
        app.use("/orders", ordersRoutes);
        app.use("/attractions", attractionsRoutes);
        app.use("/users", usersRoutes);
        app.use("/reviews", reviewRouter);
        app.use("/auth", forgotPasswordRouter);

        // הגדרת פורט - חשוב מאוד ל-Render
        const port = process.env.PORT || 10000;

        app.listen(port, "0.0.0.0", () => {
            console.log(`Server is running smoothly on port ${port}`);
        });

    } catch (error) {
        console.error("FAILED to start server:", error.message);
        // לא קורסים מיד, נותנים ל-Render לנסות שוב
    }
};

startServer();