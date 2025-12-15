import { z } from "zod";

export const LocationModel = {
    Create: z.object({
        city_name: z.string().min(1, "City name is required"),
    }),
    Update: z.object({
        city_name: z.string().min(1, "City name is required").optional(),
    }),
    GetById: z.object({
        location_id: z.number().positive(),
    }),
};

export type CreateLocationDTO = z.infer<typeof LocationModel.Create>;
export type UpdateLocationDTO = z.infer<typeof LocationModel.Update>;
export type GetLocationByIdDTO = z.infer<typeof LocationModel.GetById>;
