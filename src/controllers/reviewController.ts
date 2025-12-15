import { Response } from 'express';
import { reviewService } from '../services/reviewService';
import { sendErrorResponse } from '../error/responseError';
import { AuthRequest } from '../middlewares/authMiddleware';

export const reviewController = {
  async addReview(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.userId;
      const { placeId, rating, comment } = req.body;

      const review = await reviewService.addReview({
        userId,
        placeId,
        rating,
        comment,
      });

      return res.status(201).json({
        success: true,
        message: 'Review added successfully',
        data: review,
      });
    } catch (error) {
      return sendErrorResponse(res, error);
    }
  },

  async updateReview(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.userId;
      const reviewId = parseInt(req.params.reviewId);
      const { rating, comment } = req.body;

      const review = await reviewService.updateReview(reviewId, userId, {
        rating,
        comment,
      });

      return res.status(200).json({
        success: true,
        message: 'Review updated successfully',
        data: review,
      });
    } catch (error) {
      return sendErrorResponse(res, error);
    }
  },

  async deleteReview(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.userId;
      const reviewId = parseInt(req.params.reviewId);

      const result = await reviewService.deleteReview(reviewId, userId);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      return sendErrorResponse(res, error);
    }
  },

  async getReviewsByPlaceId(req: AuthRequest, res: Response) {
    try {
      const placeId = parseInt(req.params.placeId);
      const userId = req.user?.userId;

      const reviews = await reviewService.getReviewsByPlaceId(placeId, userId);

      return res.status(200).json({
        success: true,
        message: 'Reviews retrieved successfully',
        data: reviews,
      });
    } catch (error) {
      return sendErrorResponse(res, error);
    }
  },

  async getReviewById(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.userId;
      const reviewId = parseInt(req.params.reviewId);

      const review = await reviewService.getReviewById(reviewId, userId);

      return res.status(200).json({
        success: true,
        message: 'Review retrieved successfully',
        data: review,
      });
    } catch (error) {
      return sendErrorResponse(res, error);
    }
  },
};