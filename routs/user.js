import express from "express";
import * as userController from "../controllers/user.js";
import {
  authMiddleware,
  authManagerMiddleware
} from "../middlewares/auth.js";

const router = express.Router();

// קבלת כל המשתמשים – רק ADMIN
router.get(
  "/",
  authMiddleware,
  authManagerMiddleware,
  userController.getUsers
);

// התחברות – פתוח
router.post("/login", userController.login);

// הרשמה – פתוח
router.post("/", userController.addUser);

export default router;
