import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import ordersRoutes from "./routs/orders.js";
import attractionsRoutes from "./routs/atraction.js";
import usersRoutes from "./routs/user.js";
import connectDB from "./config/db.js";

// 🔹 טעינת משתני סביבה
dotenv.config();

// יצירת אפליקציית Express
const app = express();

// 🔹 CORS
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// middleware לקריאת JSON
app.use(express.json());

// חיבור למסד הנתונים
connectDB();

// routes
app.use("/orders", ordersRoutes);
app.use("/attractions", attractionsRoutes);
app.use("/users", usersRoutes);

// פורט מה־ENV
const port = process.env.PORT || 5000;

// הרצת השרת
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
