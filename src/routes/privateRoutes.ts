import express, { Router } from 'express';
import { verifyToken } from '../middlewares/authMiddleware';
import pensiRoutes from './pensiRoutes';
import paymentRoutes from './paymentRoutes';
import calendarRoutes from './calendarRoutes';
import reviewRoutes from './reviewRoutes';

const privateRoutes: Router = express.Router();

// Apply token verification to all private routes
privateRoutes.use(verifyToken);

// Event (Pensi) routes - require auth
privateRoutes.use('/pensi', pensiRoutes);

// Payment & Booking routes - require auth
privateRoutes.use('/payment', paymentRoutes);

// Calendar/Schedule routes - require auth
privateRoutes.use('/calendar', calendarRoutes);

// Review routes - require auth for create/update/delete
privateRoutes.use('/reviews', reviewRoutes);

export default privateRoutes;
