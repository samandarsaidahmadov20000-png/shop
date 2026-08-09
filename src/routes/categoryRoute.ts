import { Router } from "express";

import {categoriesDelete, categoriesUpdate, createCategory, getCategories} from "../controllers/categoryController"
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/adminMiddleware";



const router = Router();

router.post("/", authMiddleware, roleMiddleware("admin"), createCategory);

router.get("/", getCategories)

router.delete("/:id", authMiddleware, roleMiddleware("admin"), categoriesDelete)

router.put("/:id", authMiddleware, roleMiddleware("admin"), categoriesUpdate)



export default router