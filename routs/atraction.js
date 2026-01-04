import express from 'express';
import { verifyToken, isAdmin } from '../controllers/atraction.js';

import{getAtraction,getAtractiontById,createAtraction,deleteAtraction,updateAtraction}from "../controllers/atraction.js"

const router = express.Router();
router.get('/', getAtraction);
router.get('/:id', getAtractiontById);
router.post("/",/* verifyToken, isAdmin,*/ createAtraction);
router.delete("/:id", /*verifyToken, isAdmin,*/ deleteAtraction);
router.put("/:id", /*verifyToken, isAdmin, */updateAtraction);
export default router;
