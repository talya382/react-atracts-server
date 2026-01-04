// ייבוא express
import express from "express";

// ייבוא הפונקציות מה־controller
import {
  GetAllOrders,
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../controllers/orders.js";

// יצירת Router
const router = express.Router();

// שליפת כל ההזמנות
router.get("/", GetAllOrders);

// שליפת הזמנה לפי ID
router.get("/:id", getOrderById);

// הוספת הזמנה חדשה
router.post("/", addOrder);

// מחיקת הזמנה לפי ID
router.delete("/:id", deleteOrder);

// עדכון הזמנה – יצאה למשלוח
router.patch("/:id/ship", updateOrder);

// ייצוא ה־router
export default router;
