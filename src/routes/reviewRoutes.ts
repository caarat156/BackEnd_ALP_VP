import { Router } from 'express';
import { reviewController } from '../controllers/reviewController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// Add review (requires auth)
router.post('/', verifyToken, reviewController.addReview);

// Update review (requires auth)
router.put('/:reviewId', verifyToken, reviewController.updateReview);

// Delete review (requires auth)
router.delete('/:reviewId', verifyToken, reviewController.deleteReview);

// Get reviews by place ID
router.get('/place/:placeId', reviewController.getReviewsByPlaceId);

// Get review by ID
router.get('/:reviewId', reviewController.getReviewById);

export default router;
