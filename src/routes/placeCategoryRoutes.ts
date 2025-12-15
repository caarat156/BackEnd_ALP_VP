import { Router } from 'express';
import { placeCategoryController } from '../controllers/placeCategoryController';

const router = Router();

// Get all categories
router.get('/', placeCategoryController.getAllCategories);

// Get category by ID
router.get('/:categoryId', placeCategoryController.getCategoryById);

// Create new category
router.post('/', placeCategoryController.createCategory);

// Update category
router.put('/:categoryId', placeCategoryController.updateCategory);

// Delete category
router.delete('/:categoryId', placeCategoryController.deleteCategory);

export default router;
