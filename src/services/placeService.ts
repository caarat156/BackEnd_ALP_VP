
import { prismaClient as prisma } from '../utils/databaseUtil';
import { ResponseError } from '../error/responseError';

export const placeService = {
    async getAllPlaces(categoryId?: number, locationId?: number) {
        const places = await prisma.place.findMany({
            where: {
                ...(categoryId && { place_category_id: categoryId }),
                ...(locationId && { location_id: locationId }),
            },
            include: {
                place_category: true,
                location: true,
                place_review: {
                    select: {
                        rating: true,
                    },
                },
            },
        });

        // rata rata rating per place
        const placesWithRating = places.map((place: any) => {
            const totalRating = place.place_review.reduce(
                (sum: number, review: any) => sum + review.rating,
                0
            );
            const avgRating =
                place.place_review.length > 0 ? totalRating / place.place_review.length : 0;

            return {
                place_id: place.place_id,
                place_name: place.place_name,
                place_description: place.place_description,
                address: place.address,
                gmaps_link: place.gmaps_link,
                image_url: place.image_url,
                category_name: place.place_category.category_name,
                city_name: place.location.city_name,
                rating_avg: Math.round(avgRating * 10) / 10, // pembulatan 1 desimal
                review_count: place.place_review.length,
            };
        });

        return placesWithRating;
    },

    async getPlaceById(placeId: number) {
        const place = await prisma.place.findUnique({
            where: { place_id: placeId },
            include: {
                place_category: true,
                location: true,
                place_review: {
                    include: {
                        users: {
                            select: {
                                user_id: true,
                                name: true,
                            },
                        },
                    },
                    orderBy: {
                        created_at: 'desc',
                    },
                },
            },
        });

        if (!place) {
            throw new ResponseError(400, 'Place not found');
        }

        // Calculate average rating
        const totalRating = place.place_review.reduce(
            (sum: number, review: any) => sum + review.rating,
            0
        );
        const avgRating =
            place.place_review.length > 0 ? totalRating / place.place_review.length : 0;

        return {
            place_id: place.place_id,
            place_name: place.place_name,
            place_description: place.place_description,
            address: place.address,
            gmaps_link: place.gmaps_link,
            image_url: place.image_url,
            category_name: place.place_category!.category_name,
            city_name: place.location!.city_name,
            rating_avg: Math.round(avgRating * 10) / 10,
            review_count: place.place_review.length,
            reviews: place.place_review.map((review: any) => ({
                place_review_id: review.review_id,
                user_id: review.user_id,
                user_name: review.users?.name || '',
                rating: review.rating,
                comment: review.comment,
                created_at: review.created_at,
            })),
        };
    },

    async getRecommendedPlaces(locationId?: number) {
        // Get places with highest average rating
        const places = await this.getAllPlaces(undefined, locationId);
        
        return places
            .sort((a, b) => b.rating_avg - a.rating_avg)
            .slice(0, 10);
    },

    async getPopularPlaces(locationId?: number) {
        // Get places with most reviews
        const places = await this.getAllPlaces(undefined, locationId);
        
        return places
            .sort((a, b) => b.review_count - a.review_count)
            .slice(0, 10);
    },

    async createPlace(data: any) {
        const place = await prisma.place.create({
            data: {
                place_category_id: data.placeCategoryId,
                location_id: data.locationId,
                place_name: data.placeName,
                place_description: data.placeDescription,
                address: data.address,
                gmaps_link: data.gmapsLink,
                image_url: data.imageUrl,
            },
            include: {
                place_category: true,
                location: true,
            },
        });

        return {
            place_id: place.place_id,
            place_name: place.place_name,
            place_description: place.place_description,
            address: place.address,
            gmaps_link: place.gmaps_link,
            image_url: place.image_url,
            category_name: place.place_category!.category_name,
            city_name: place.location!.city_name,
        };
    },

    async updatePlace(placeId: number, data: any) {
        const place = await prisma.place.update({
            where: { place_id: placeId },
            data: {
                ...(data.placeCategoryId && { place_category_id: data.placeCategoryId }),
                ...(data.locationId && { location_id: data.locationId }),
                ...(data.placeName && { place_name: data.placeName }),
                ...(data.placeDescription && { place_description: data.placeDescription }),
                ...(data.address && { address: data.address }),
                ...(data.gmapsLink && { gmaps_link: data.gmapsLink }),
                ...(data.imageUrl && { image_url: data.imageUrl }),
            },
            include: {
                place_category: true,
                location: true,
            },
        });

        return {
            place_id: place.place_id,
            place_name: place.place_name,
            place_description: place.place_description,
            address: place.address,
            gmaps_link: place.gmaps_link,
            image_url: place.image_url,
            category_name: place.place_category!.category_name,
            city_name: place.location!.city_name,
        };
    },

    async deletePlace(placeId: number) {
        await prisma.place.delete({
            where: { place_id: placeId },
        });

        return {
            message: 'Place deleted successfully',
        };
    },
};
