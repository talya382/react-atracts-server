import express from "express";
import cors from "cors";

import ordersRoutes from "./routs/orders.js";
import attractionsRoutes from "./routs/atraction.js";
import usersRoutes from "./routs/user.js";
import connectDB from "./config/db.js";

// יצירת אפליקציית Express
const app = express();

// 🔹 CORS – חייב להיות לפני ה־routes
app.use(cors({
    origin: "http://localhost:3000", // כתובת ה־React
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// middleware לקריאת JSON מהבקשות
app.use(express.json());

// חיבור למסד הנתונים
connectDB();

// חיבור כל הנתיבים
app.use("/orders", ordersRoutes);
app.use("/attractions", attractionsRoutes);
app.use("/users", usersRoutes);

let port = process.env.PORT || 5000;

// הרצת השרת
app.listen(port, () => {
    console.log("Server running on port " + port);
});
