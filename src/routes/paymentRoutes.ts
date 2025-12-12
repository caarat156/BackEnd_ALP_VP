import { Router } from 'express';
import { checkoutPayment, getBooking } from '../controllers/paymentController';

const router = Router();

router.post('/checkout', checkoutPayment);
router.get('/booking/:id', getBooking);

export default router;