import { prismaClient as prisma } from '../utils/databaseUtil';
import { ResponseError } from '../error/responseError';
import { CreatePlaceCategoryDTO, UpdatePlaceCategoryDTO } from '../models/placeCategoryModel';

export const placeCategoryService = {
    async getAllCategories() {
        const categories = await prisma.place_category.findMany({
            orderBy: {
                category_name: 'asc',
            },
        });

        return categories.map((category) => ({
            place_category_id: category.place_category_id,
            category_name: category.category_name,
        }));
    },

    async getCategoryById(placeCategoryId: string | number) {
        const numericCategoryId = Number(placeCategoryId);
        const category = await prisma.place_category.findUnique({
            where: { place_category_id: numericCategoryId },
        });

        if (!category) {
            throw new ResponseError('Category not found', 404);
        }

        return {
            place_category_id: category.place_category_id,
            category_name: category.category_name,
        };
    },

    async createCategory(data: CreatePlaceCategoryDTO) {
        const category = await prisma.place_category.create({
            data: {
                category_name: data.category_name,
            },
        });

        return {
            place_category_id: category.place_category_id,
            category_name: category.category_name,
        };
    },

    async updateCategory(placeCategoryId: string | number, data: UpdatePlaceCategoryDTO) {
        const numericCategoryId = Number(placeCategoryId);
        const category = await prisma.place_category.update({
            where: { place_category_id: numericCategoryId },
            data: {
                ...(data.category_name && { category_name: data.category_name }),
            },
        });

        return {
            place_category_id: category.place_category_id,
            category_name: category.category_name,
        };
    },

    async deleteCategory(placeCategoryId: string | number) {
        const numericCategoryId = Number(placeCategoryId);
        const placesUsingCategory = await prisma.place.count({
            where: { place_category_id: numericCategoryId },
        });

        if (placesUsingCategory > 0) {
            throw new ResponseError('Cannot delete category that is being used by places', 400);
        }

        await prisma.place_category.delete({
            where: { place_category_id: numericCategoryId },
        });

        return {
            message: 'Category deleted successfully',
        };
    },
};
