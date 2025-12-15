import { prismaClient as prisma } from '../utils/databaseUtil';
import { ResponseError } from '../error/responseError';
import { 
    CreatePlaceReviewDTO, 
    UpdatePlaceReviewDTO,
    GetPlaceReviewByPlaceIdDTO,
    GetPlaceReviewByIdDTO 
} from '../models/placeReviewModel';

export const reviewService = {
    async addReview(data: CreatePlaceReviewDTO) {
        // Check if place exists
        const place = await prisma.place.findUnique({
            where: { place_id: data.placeId },
        });

        if (!place) {
            throw new ResponseError('Place not found', 404);
        }

        // Check if user already reviewed this place
        const existingReview = await prisma.place_review.findFirst({
            where: {
                user_id: data.userId,
                place_id: data.placeId,
            },
        });

        if (existingReview) {
            throw new ResponseError('You have already reviewed this place', 400);
        }

        // Create review
        const review = await prisma.place_review.create({
            data: {
                user_id: data.userId,
                place_id: data.placeId,
                rating: data.rating,
                comment: data.comment,
            },
        });

        return {
            review_id: review.review_id,
            user_id: review.user_id,
            place_id: review.place_id,
            rating: review.rating,
            comment: review.comment,
            created_at: review.created_at,
        };
    },

    async updateReview(reviewId: number, userId: number, data: UpdatePlaceReviewDTO) {
        // Check if review exists and belongs to user
        const review = await prisma.place_review.findUnique({
            where: { review_id: reviewId },
        });

        if (!review) {
            throw new ResponseError('Review not found', 404);
        }

        if (review.user_id !== userId) {
            throw new ResponseError('You are not authorized to update this review', 403);
        }

        // Update review
        const updatedReview = await prisma.place_review.update({
            where: { review_id: reviewId },
            data: {
                rating: data.rating,
                comment: data.comment,
            },
        });

        return {
            review_id: updatedReview.review_id,
            user_id: updatedReview.user_id,
            place_id: updatedReview.place_id,
            rating: updatedReview.rating,
            comment: updatedReview.comment,
            created_at: updatedReview.created_at,
        };
    },

    async deleteReview(reviewId: number, userId: number) {
        // Check if review exists and belongs to user
        const review = await prisma.place_review.findUnique({
            where: { review_id: reviewId },
        });

        if (!review) {
            throw new ResponseError('Review not found', 404);
        }

        if (review.user_id !== userId) {
            throw new ResponseError('You are not authorized to delete this review', 403);
        }

        // Delete review
        await prisma.place_review.delete({
            where: { review_id: reviewId },
        });

        return {
            message: 'Review deleted successfully',
        };
    },

    async getReviewsByPlaceId(placeId: number, userId?: number) {
        const reviews = await prisma.place_review.findMany({
            where: { place_id: placeId },
            orderBy: {
                created_at: 'desc',
            },
        });

        return reviews.map((review) => ({
            review_id: review.review_id,
            user_id: review.user_id,
            rating: review.rating,
            comment: review.comment,
            created_at: review.created_at,
            isOwnReview: userId ? review.user_id === userId : false,
        }));
    },

    async getReviewById(reviewId: number, userId: number) {
        const review = await prisma.place_review.findUnique({
            where: { review_id: reviewId },
        });

        if (!review) {
            throw new ResponseError('Review not found', 404);
        }

        if (review.user_id !== userId) {
            throw new ResponseError('You are not authorized to view this review', 403);
        }

        return {
            review_id: review.review_id,
            user_id: review.user_id,
            place_id: review.place_id,
            rating: review.rating,
            comment: review.comment,
            created_at: review.created_at,
        };
    },

    async getAllReviews() {
        const reviews = await prisma.place_review.findMany({
            orderBy: {
                created_at: 'desc',
            },
        });

        return reviews.map((review) => ({
            review_id: review.review_id,
            user_id: review.user_id,
            place_id: review.place_id,
            rating: review.rating,
            comment: review.comment,
            created_at: review.created_at,
        }));
    },
};
