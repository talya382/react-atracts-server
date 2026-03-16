import express from "express";
import {
  GetAllOrders,
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../controllers/orders.js";

const router = express.Router();

router.get("/", GetAllOrders);
router.get("/:id", getOrderById);
router.post("/", addOrder);
router.delete("/:id", deleteOrder);
router.patch("/:id/ship", updateOrder);

export default router;