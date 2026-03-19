import express from "express";
import { forgotPassword, changePassword } from "../controllers/forgotPassword.js";

const router = express.Router();

router.post("/forgot", forgotPassword);
router.post("/change", changePassword);

export default router;