import express from "express";
import {
  GetAllOrders,
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../controllers/orders.js";

// import {
//   authMiddleware,
//   authManagerMiddleware
// } from "../middlewares/auth.js";

const router = express.Router();


// כל ההזמנות – רק ADMIN
//router.get("/", authMiddleware, authManagerMiddleware, GetAllOrders);

// הזמנה לפי ID – משתמש מחובר
//router.get("/:id", authMiddleware, getOrderById);

// יצירת הזמנה – משתמש מחובר
//router.post("/", authMiddleware, addOrder);

// מחיקת הזמנה – רק ADMIN
//router.delete("/:id", authMiddleware, authManagerMiddleware, deleteOrder);

// עדכון סטטוס משלוח – רק ADMIN
//router.patch("/:id/ship", authMiddleware, authManagerMiddleware, updateOrder);

export default router;
