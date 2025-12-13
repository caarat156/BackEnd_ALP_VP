import { z } from "zod";

export const PaymentSchema = z.object({
    userId: z.number(),
    performanceEventId: z.number(),
    eventScheduleId: z.number(),
    quantity: z.number().min(1),
});