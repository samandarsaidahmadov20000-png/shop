import { createProduct, getProducts } from "../controllers/productController";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/adminMiddleware";
import multer from "multer";
import path from "node:path";


const router = Router();




const storage = multer.diskStorage({
    destination: function(req, file, cb) {
       cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const uniquesSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniquesSuffix + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})





router.post("/", authMiddleware, roleMiddleware("admin"), upload.single('image'), createProduct);

router.get("/", getProducts)


export default router;
