import { Router } from 'express';
import { authLogin, authRegister } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';


const router = Router();



router.post('/register', authRegister)

router.post('/login', authLogin)


export default router;