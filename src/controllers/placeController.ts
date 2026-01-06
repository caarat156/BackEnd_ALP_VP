import { Request, Response } from 'express';
import { placeService } from '../services/placeService';
import { sendErrorResponse } from '../error/responseError';
import { PlaceModel } from '../models/placeModel';

export const placeController = {
    async getAllPlaces(req: Request, res: Response) {
    try {
        const categoryId = req.query.categoryId
        ? parseInt(req.query.categoryId as string)
        : undefined;
        const locationId = req.query.locationId
        ? parseInt(req.query.locationId as string)
        : undefined;

        const places = await placeService.getAllPlaces(categoryId, locationId);

        return res.status(200).json({
        success: true,
        message: 'Places retrieved successfully',
        data: places,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
},

    async getPlaceById(req: Request, res: Response) {
    try {
        const placeId = parseInt(req.params.placeId);

        const place = await placeService.getPlaceById(placeId);

        return res.status(200).json({
        success: true,
        message: 'Place retrieved successfully',
        data: place,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
    },

    async getRecommendedPlaces(req: Request, res: Response) {
    try {
        const locationId = req.query.locationId
        ? parseInt(req.query.locationId as string)
        : undefined;

        const places = await placeService.getRecommendedPlaces(locationId);

        return res.status(200).json({
        success: true,
        message: 'Recommended places retrieved successfully',
        data: places,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
    },

    async getPopularPlaces(req: Request, res: Response) {
    try {
        const locationId = req.query.locationId
        ? parseInt(req.query.locationId as string)
        : undefined;

        const places = await placeService.getPopularPlaces(locationId);

        return res.status(200).json({
        success: true,
        message: 'Popular places retrieved successfully',
        data: places,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
    },

    async createPlace(req: Request, res: Response) {
        try {
            // Validasi input
            const data = PlaceModel.Create.parse(req.body);
            
            const place = await placeService.createPlace(data);

            return res.status(201).json({
                success: true,
                message: 'Place created successfully',
                data: place,
            });
        } catch (error) {
            return sendErrorResponse(res, error);
        }
    },

    async updatePlace(req: Request, res: Response) {
        try {
            const placeId = parseInt(req.params.placeId);
            const data = req.body; // Data yang mau direvisi (misal locationId: 2)
            
            // Panggil service updatePlace yang sudah ada
            const place = await placeService.updatePlace(placeId, data);

            return res.status(200).json({
                success: true,
                message: 'Place updated successfully',
                data: place,
            });
        } catch (error) {
            return sendErrorResponse(res, error);
        }
    },
};