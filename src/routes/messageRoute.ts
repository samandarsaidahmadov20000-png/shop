import {Router} from "express";


import {createMessage,getConversations,getMessage} from '../controllers/messageController';




import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/adminMiddleware";


const router = Router();

router.get('/conversations', authMiddleware, roleMiddleware("admin"), getConversations)
router.post('/', authMiddleware, createMessage);
router.get('/', authMiddleware, getMessage); 
router.get('/:userId', authMiddleware, getMessage);

export default router;