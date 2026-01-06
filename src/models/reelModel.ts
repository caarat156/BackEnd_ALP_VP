// models/reelsModel.ts
import { z } from "zod";

export const reelSchema = z.object({
    caption: z.string().max(150, "Caption is too long").optional(),
    place_id: z.number().optional(), // Prepared for your future feature
});