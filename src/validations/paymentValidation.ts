import { z } from 'zod'

export const PaymentSchema = z.object({
userId: z.number().optional(),
quantity: z.number().min(1).optional()
})