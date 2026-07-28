import {Router} from "express";


import {createOrder, getAllOrders, getMyOrders, updateOrderStatus} from "../controllers/orderController";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/adminMiddleware";

const router = Router();





router.post('/', authMiddleware, createOrder);

router.get("/",authMiddleware, getMyOrders)

router.get("/all", authMiddleware, roleMiddleware("admin"), getAllOrders)

router.put("/:id/status",authMiddleware, roleMiddleware("admin"), updateOrderStatus)

export default router





