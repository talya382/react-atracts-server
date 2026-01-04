import express from 'express';
import * as userController from "../controllers/user.js";
import { auth } from "../middlewares/auth.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();
//“יכול להגיע לפונקציה שמחזירה משתמשים א ADMINרק משתמש מחובר שהו  
router.get('/', auth, adminOnly, userController.getUsers);
router.post('/login', userController.login);
router.post('/', userController.addUser);
export default router;