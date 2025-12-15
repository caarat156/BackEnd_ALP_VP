
import { Request, Response } from 'express';
import { locationService } from '../services/locationService';
import { ResponseError } from '../error/responseError';

export const locationController = {

    async getAllLocations(req: Request, res: Response) {
        try {
            const locations = await locationService.getAllLocations();

            return res.status(200).json({
                success: true,
                message: 'Locations retrieved successfully',
                data: locations,
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

    async getLocationById(req: Request, res: Response) {
        try {
            const locationId = parseInt(req.params.locationId);

            const location = await locationService.getLocationById(locationId);

            return res.status(200).json({
                success: true,
                message: 'Location retrieved successfully',
                data: location,
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

    async createLocation(req: Request, res: Response) {
        try {
            const { city_name } = req.body;

            const location = await locationService.createLocation({ city_name });

            return res.status(201).json({
                success: true,
                message: 'Location created successfully',
                data: location,
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

    async updateLocation(req: Request, res: Response) {
        try {
            const locationId = parseInt(req.params.locationId);
            const { city_name } = req.body;

            const location = await locationService.updateLocation(locationId, { city_name });

            return res.status(200).json({
                success: true,
                message: 'Location updated successfully',
                data: location,
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

    async deleteLocation(req: Request, res: Response) {
        try {
            const locationId = parseInt(req.params.locationId);

            await locationService.deleteLocation(locationId);

            return res.status(200).json({
                success: true,
                message: 'Location deleted successfully',
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
