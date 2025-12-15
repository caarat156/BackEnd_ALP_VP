import { Router } from 'express';
import { placeController } from '../controllers/placeController';

const router = Router();

// Get all places with optional filters
router.get('/', placeController.getAllPlaces);

// Get place by ID
router.get('/:placeId', placeController.getPlaceById);

// Get recommended places
router.get('/recommended', placeController.getRecommendedPlaces);

// Get popular places
router.get('/popular', placeController.getPopularPlaces);

export default router;
