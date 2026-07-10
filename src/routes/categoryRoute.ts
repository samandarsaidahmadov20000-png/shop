import { Router } from "express";

import {createCategory, getCategories} from "../controllers/categoryController"
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/adminMiddleware";



const router = Router();

router.post("/", authMiddleware, roleMiddleware("admin"), createCategory);

router.get("/", getCategories)

export default router