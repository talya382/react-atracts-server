import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ordersRoutes from "./routs/orders.js";
import attractionsRoutes from "./routs/atraction.js";
import usersRoutes from "./routs/user.js";
import connectDB from "./config/db.js";
import { printToLog } from "./middlewares/logToFile.js";
import reviewRouter from "./routs/review.js";


// טעינת משתני סביבה
dotenv.config();

// יצירת אפליקציית Express
const app = express(); 

// חיבור למסד הנתונים
connectDB();

// Middlewares - חייבים לבוא לפני ה-Routes
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(printToLog);


// Routes
app.use("/orders", ordersRoutes);
app.use("/attractions", attractionsRoutes);
app.use("/users", usersRoutes);
app.use("/reviews", reviewRouter);

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

// הרצת השרת
app.listen(port, () => {
    console.log("Server running on port " + port);
});