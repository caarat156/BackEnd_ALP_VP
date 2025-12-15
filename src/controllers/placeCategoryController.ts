import { Request, Response } from 'express';
import { placeCategoryService } from '../services/placeCategoryService';
import { ResponseError } from '../error/responseError';

export const placeCategoryController = {
    async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await placeCategoryService.getAllCategories();

            return res.status(200).json({
                success: true,
                message: 'Categories retrieved successfully',
                data: categories,
            });
        } catch (error) {
            if (error instanceof ResponseError) {
                return res.status(error.status).json({
                    success: false,
                    message: error.message,
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    },

    async getCategoryById(req: Request, res: Response) {
        try {
            const categoryId = parseInt(req.params.categoryId);

            const category = await placeCategoryService.getCategoryById(categoryId);

            return res.status(200).json({
                success: true,
                message: 'Category retrieved successfully',
                data: category,
            });
        } catch (error) {
            if (error instanceof ResponseError) {
                return res.status(error.status).json({
                    success: false,
                    message: error.message,
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    },

    async createCategory(req: Request, res: Response) {
        try {
            const { category_name } = req.body;

            const category = await placeCategoryService.createCategory({ category_name });

            return res.status(201).json({
                success: true,
                message: 'Category created successfully',
                data: category,
            });
        } catch (error) {
            if (error instanceof ResponseError) {
                return res.status(error.status).json({
                    success: false,
                    message: error.message,
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    },

    async updateCategory(req: Request, res: Response) {
        try {
            const categoryId = parseInt(req.params.categoryId);
            const { category_name } = req.body;

            const category = await placeCategoryService.updateCategory(categoryId, { category_name });

            return res.status(200).json({
                success: true,
                message: 'Category updated successfully',
                data: category,
            });
        } catch (error) {
            if (error instanceof ResponseError) {
                return res.status(error.status).json({
                    success: false,
                    message: error.message,
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    },

    async deleteCategory(req: Request, res: Response) {
        try {
            const categoryId = parseInt(req.params.categoryId);

            await placeCategoryService.deleteCategory(categoryId);

            return res.status(200).json({
                success: true,
                message: 'Category deleted successfully',
            });
        } catch (error) {
            if (error instanceof ResponseError) {
                return res.status(error.status).json({
                    success: false,
                    message: error.message,
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    },
};
