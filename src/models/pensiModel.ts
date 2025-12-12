import { z } from "zod";

export const PensiModel = {
Create: z.object({
name: z.string(),
date: z.string(),
location: z.string(),
price: z.number(),
}),
Payment: z.object({
pensiId: z.number(),
userId: z.number(),
amount: z.number(),
}),
};

export type CreatePensiDTO = z.infer<typeof PensiModel.Create>;
export type PaymentDTO = z.infer<typeof PensiModel.Payment>;
