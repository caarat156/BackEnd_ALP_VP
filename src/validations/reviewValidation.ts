import { z } from "zod";

export const addReviewValidation = z.object({
    placeId: z.number().int().positive("Place ID must be a positive integer"),
    rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
    comment: z.string().max(500, "Comment must not exceed 500 characters").optional(),
});

export type AddReviewValidationType = z.infer<typeof addReviewValidation>;

export const updateReviewValidation = z.object({
    rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
    comment: z.string().max(500, "Comment must not exceed 500 characters").optional(),
});

export type UpdateReviewValidationType = z.infer<typeof updateReviewValidation>;

export const deleteReviewValidation = z.object({
    reviewId: z.number().int().positive("Review ID must be a positive integer"),
});

export type DeleteReviewValidationType = z.infer<typeof deleteReviewValidation>;