import { prismaClient as prisma } from '../utils/databaseUtil';
import { ResponseError } from '../error/responseError';
import { CreateLocationDTO, UpdateLocationDTO } from '../models/locationModel';

export const locationService = {
    async getAllLocations() {
        const locations = await prisma.location.findMany({
            orderBy: {
                city_name: 'asc',
            },
        });

        return locations.map((location) => ({
            location_id: location.location_id,
            city_name: location.city_name,
        }));
    },

    async getLocationById(locationId: string | number) {
        const numericLocationId = Number(locationId);
        const location = await prisma.location.findUnique({
            where: { location_id: numericLocationId },
        });

        if (!location) {
            throw new ResponseError('Location not found', 404);
        }

        return {
            location_id: location.location_id,
            city_name: location.city_name,
        };
    },

    async createLocation(data: CreateLocationDTO) {
        const location = await prisma.location.create({
            data: {
                city_name: data.city_name,
            },
        });

        return {
            location_id: location.location_id,
            city_name: location.city_name,
        };
    },

    async updateLocation(locationId: string | number, data: UpdateLocationDTO) {
        const numericLocationId = typeof locationId === 'string' ? parseInt(locationId) : locationId;
        const location = await prisma.location.update({
            where: { location_id: numericLocationId },
            data: {
                ...(data.city_name && { city_name: data.city_name }),
            },
        });

        return {
            location_id: location.location_id,
            city_name: location.city_name,
        };
    },

    async deleteLocation(locationId: string | number) {
        const numericLocationId = typeof locationId === 'string' ? parseInt(locationId) : locationId;
        const placesUsingLocation = await prisma.place.count({
            where: { location_id: numericLocationId },
        });

        if (placesUsingLocation > 0) {
            throw new ResponseError('Cannot delete location that is being used by places', 400);
        }

        await prisma.location.delete({
            where: { location_id: numericLocationId },
        });

        return {
            message: 'Location deleted successfully',
        };
    },
};
