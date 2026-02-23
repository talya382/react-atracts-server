import express from "express";
import {
  getAtraction,
  getAtractiontById,
  createAtraction,
  deleteAtraction,
  updateAtraction
} from "../controllers/atraction.js";

// import {
//   authMiddleware,
//   authManagerMiddleware
// } from "../middlewares/auth.js";

const router = express.Router();

// צפייה – פתוח
router.get("/", getAtraction);
router.get("/:id", getAtractiontById);

// פעולות ניהול – רק ADMIN
//router.post("/", authMiddleware, authManagerMiddleware, createAtraction);
//router.delete("/:id", authMiddleware, authManagerMiddleware, deleteAtraction);
//router.put("/:id", authMiddleware, authManagerMiddleware, updateAtraction);

export default router;
