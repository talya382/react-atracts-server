import express from "express";
import {
  getAtraction,
  getAtractiontById,
  createAtraction,
  deleteAtraction,
  updateAtraction,
  incrementOrderCount,
  getTop10
} from "../controllers/atraction.js";

const router = express.Router();

router.get("/top10", getTop10);
router.get("/", getAtraction);
router.get("/:id", getAtractiontById);

router.post("/", createAtraction);
router.delete("/:id", deleteAtraction);
router.put("/:id", updateAtraction);
router.patch("/:id/order", incrementOrderCount);

export default router;