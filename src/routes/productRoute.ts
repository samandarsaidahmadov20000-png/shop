import { createProduct, getProducts } from "../controllers/productController";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/adminMiddleware";
import multer from "multer";



const router = Router();






const upload = multer({storage: multer.memoryStorage()})





router.post("/", authMiddleware, roleMiddleware("admin"), upload.single('image'), createProduct);

router.get("/", getProducts)


export default router;
