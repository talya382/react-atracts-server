import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ordersRoutes from "./routs/orders.js";
import attractionsRoutes from "./routs/atraction.js";
import usersRoutes from "./routs/user.js";
import connectDB from "./config/db.js";
import { printToLog } from "./middlewares/logToFile.js";
import { authMiddleware } from "./middlewares/auth.js";


// 🔹 טעינת משתני סביבה
dotenv.config();

// יצירת אפליקציית Express
const app = express();

app.use(printToLog);
app.use(express.json)
app.use(cors())

// חיבור למסד הנתונים
connectDB();

// routes
app.use("/orders", ordersRoutes);
app.use("/attractions", attractionsRoutes);
app.use("/users", usersRoutes);

let port=process.env.PORT

// הרצת השרת
app.listen(port, () => {
    console.log("Server running on port" +port);
});
