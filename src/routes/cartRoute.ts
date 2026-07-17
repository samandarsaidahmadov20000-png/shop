import { Router } from "express";
import {
  createCart,
  getCart,
  removeCart,
  updateCart,
} from "../controllers/cartController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createCart);

router.get("/", authMiddleware, getCart);

router.delete("/:productId", authMiddleware, removeCart);

router.put("/:productId", authMiddleware, updateCart);

export default router;
