// 1. קודם כל טוענים את המשתנים - השורה הזו חייבת להיות ראשונה!
import dotenv from "dotenv";
dotenv.config(); 

// 2. עכשיו מייבאים את השאר
import express from "express";
import cors from "cors";
import ordersRoutes from "./routs/orders.js";
import attractionsRoutes from "./routs/atraction.js";
import usersRoutes from "./routs/user.js";
import connectDB from "./config/db.js"; // ודאי שבתוך הקובץ הזה אין קריאה עצמאית לחיבור
import { printToLog } from "./middlewares/logToFile.js";
import reviewRouter from "./routs/review.js";
import forgotPasswordRouter from "./routs/forgotPassword.js";

const app = express(); 

const startServer = async () => {
    try {
        // חיבור למסד הנתונים
        await connectDB();
        // כאן לא צריך להדפיס הצלחה, כי connectDB בטח כבר מדפיס
        
        // Middlewares
        app.use(cors({
            origin: [
                "http://localhost:5173",
                "https://atract-israel-bytay.netlify.app"
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

        const port = process.env.PORT || 3000;

        app.listen(port, "0.0.0.0", () => {
            console.log(`Server is running smoothly on port ${port}`);
        });

    } catch (error) {
        console.error("FAILED to start server:", error.message);
    }
};

startServer();