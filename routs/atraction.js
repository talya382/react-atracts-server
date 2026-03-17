import express from "express";
import {
  getAtraction,
  getAtractiontById,
  createAtraction,
  deleteAtraction,
  updateAtraction,
  incrementOrderCount,  // ← הועבר לכאן
  getTop10              // ← הועבר לכאן
} from "../controllers/atraction.js";

import {
  authMiddleware,
  authManagerMiddleware
} from "../middlewares/auth.js";

const router = express.Router();

const adminMiddlewares = [authMiddleware, authManagerMiddleware]; // ← חדש

router.get("/top10", getTop10);
router.get("/", getAtraction);
router.get("/:id", getAtractiontById);

router.post("/", ...adminMiddlewares, createAtraction);           // ← נקי יותר
router.delete("/:id", ...adminMiddlewares, deleteAtraction);
router.put("/:id", ...adminMiddlewares, updateAtraction);
router.patch("/:id/order", incrementOrderCount);

export default router;