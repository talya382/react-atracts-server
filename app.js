import express from "express";
import ordersRoutes from "./routs/orders.js";
import attractionsRoutes from "./routs/atraction.js";
import usersRoutes from "./routs/user.js";
import connectDB from "./config/db.js";

// יצירת אפליקציית Express
const app = express();

// middleware לקריאת JSON מהבקשות
app.use(express.json());

// חיבור למסד הנתונים
connectDB();

// חיבור כל נתיבי ההזמנות
app.use("/orders", ordersRoutes);
app.use("/attractions",attractionsRoutes );
app.use("/users", usersRoutes);


let port=process.env.PORT || 3000;
// הרצת השרת
app.listen(port, () => {
    console.log("Server running on port " + port);
});
