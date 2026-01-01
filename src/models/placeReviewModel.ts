import { z } from "zod";

export const PlaceReviewModel = {
    Create: z.object({
        place_id: z.number().positive("Place ID is required"),
        user_id: z.number().positive("User ID is required"),
        rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
        comment: z.string().min(1, "Comment is required"),
    }),
    Update: z.object({
        rating: z.number().min(1).max(5).optional(),
        comment: z.string().min(1).optional(),
    }),
    GetById: z.object({
        review_id: z.number().positive(),
    }),
    GetByPlaceId: z.object({
        place_id: z.number().positive(),
    }),
    GetByUserId: z.object({
        user_id: z.number().positive(),
    }),
};

export type GetPlaceReviewByIdDTO = z.infer<typeof PlaceReviewModel.GetById>;
export type GetPlaceReviewByPlaceIdDTO = z.infer<typeof PlaceReviewModel.GetByPlaceId>;
export type GetPlaceReviewByUserIdDTO = z.infer<typeof PlaceReviewModel.GetByUserId>;
export interface CreatePlaceReviewDTO {
    userId: number
    placeId: number
    rating: number
    comment: string
} 
export interface UpdatePlaceReviewDTO {
    rating: number
    comment: string
}