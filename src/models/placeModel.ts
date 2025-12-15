import { z } from "zod";

export const PlaceModel = {
    Create: z.object({
        placeCategoryId: z.number().positive("Category ID is required"),
        locationId: z.number().positive("Location ID is required"),
        placeName: z.string().min(1, "Place name is required"),
        placeDescription: z.string().min(1, "Place description is required"),
        address: z.string().min(1, "Address is required"),
        gmapsLink: z.string().url("Invalid Google Maps link").optional(),
        imageUrl: z.string().url("Invalid image URL").optional(),
    }),
    Update: z.object({
        placeCategoryId: z.number().positive().optional(),
        locationId: z.number().positive().optional(),
        placeName: z.string().min(1).optional(),
        placeDescription: z.string().min(1).optional(),
        address: z.string().min(1).optional(),
        gmapsLink: z.string().url().optional(),
        imageUrl: z.string().url().optional(),
    }),
    GetById: z.object({
        placeId: z.number().positive(),
    }),
    GetAll: z.object({
        categoryId: z.number().positive().optional(),
        locationId: z.number().positive().optional(),
        search: z.string().optional(),
    }),
};

export type CreatePlaceDTO = z.infer<typeof PlaceModel.Create>;
export type UpdatePlaceDTO = z.infer<typeof PlaceModel.Update>;
export type GetPlaceByIdDTO = z.infer<typeof PlaceModel.GetById>;
export type GetAllPlacesDTO = z.infer<typeof PlaceModel.GetAll>;
