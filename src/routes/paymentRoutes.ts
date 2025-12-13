import { Router } from 'express';
import { checkoutPayment, getBooking } from '../controllers/paymentController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/checkout', checkoutPayment);
router.get('/booking/:id', getBooking);
router.post('/checkout', verifyToken, checkoutPayment);
router.get('/booking/:id', verifyToken, getBooking);


export default router;