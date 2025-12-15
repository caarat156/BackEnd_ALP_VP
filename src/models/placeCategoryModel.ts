import { z } from "zod";

export const PlaceCategoryModel = {
    Create: z.object({
        category_name: z.string().min(1, "Category name is required"),
    }),
    Update: z.object({
        category_name: z.string().min(1, "Category name is required").optional(),
    }),
    GetById: z.object({
        place_category_id: z.number().positive(),
    }),
};

export type CreatePlaceCategoryDTO = z.infer<typeof PlaceCategoryModel.Create>;
export type UpdatePlaceCategoryDTO = z.infer<typeof PlaceCategoryModel.Update>;
export type GetPlaceCategoryByIdDTO = z.infer<typeof PlaceCategoryModel.GetById>;
