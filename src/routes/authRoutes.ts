import { Router } from 'express';
import { AuthController } from '../controllers/authController'; // Import the Class
import { verifyToken } from '../middlewares/authMiddleware'; // Make sure this exists
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

// Notice we use AuthController.methodName
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', verifyToken, AuthController.getProfile);
router.put('/profile', verifyToken, upload.single('profile_photo'), AuthController.updateProfile);

export default router;