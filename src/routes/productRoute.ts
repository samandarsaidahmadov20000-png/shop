import { createProduct, deleteProducts, getOneProducts, getProducts, upadetProducts } from "../controllers/productController";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/adminMiddleware";
import multer from "multer";



const router = Router();






const upload = multer({storage: multer.memoryStorage()})





router.post("/", authMiddleware, roleMiddleware("admin"), upload.single('image'), createProduct);

router.get("/", getProducts);

router.get("/:id", getOneProducts)

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteProducts)

router.put("/:id", authMiddleware, roleMiddleware("admin"),upload.single('image'), upadetProducts)


export default router;
