import { createProduct } from "../controllers/productController";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/adminMiddleware";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("admin"), createProduct);

export default router;
