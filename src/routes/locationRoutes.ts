import { Router } from 'express';
import { locationController } from '../controllers/locationController';

const router = Router();

// Get all locations
router.get('/', locationController.getAllLocations);

// Get location by ID
router.get('/:locationId', locationController.getLocationById);

// Create new location
router.post('/', locationController.createLocation);

// Update location
router.put('/:locationId', locationController.updateLocation);

// Delete location
router.delete('/:locationId', locationController.deleteLocation);

export default router;
