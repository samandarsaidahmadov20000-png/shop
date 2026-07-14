import { Router } from "express";
import { createCart } from "../controllers/cartController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createCart);

export default router;
