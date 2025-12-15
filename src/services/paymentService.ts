import { prismaClient } from "../utils/databaseUtil"
import { PaymentSchema } from "../validations/paymentValidation"
import { ResponseError } from "../error/responseError"

export class PaymentService {

    static async checkout(user: any, request: any) {
        const data = PaymentSchema.parse(request)

        const schedule = await prismaClient.eventSchedule.findUnique({
            where: { eventScheduleId: data.eventScheduleId }
        })

        if (!schedule) {
            throw new ResponseError(404, "Schedule not found")
        }

        const event = await prismaClient.performanceEvent.findUnique({
            where: { performanceEventId: data.performanceEventId }
        });

        if (!event) {
            throw new ResponseError(404, "Event not found");
        }

        const totalPrice = schedule.price * data.quantity

        return prismaClient.eventBooking.create({
            data: {
                userId: user.id,
                performanceEventId: data.performanceEventId,
                eventScheduleId: data.eventScheduleId,
                quantity: data.quantity,
                totalPrice,
                status: "PAID"
            }
        })
    }

    static async getBooking(user: any, bookingId: number) {
        const booking = await prismaClient.eventBooking.findUnique({
            where: { eventBookingId: bookingId },
            include: {
                PerformanceEvent: true,
                EventSchedule: true
            }
        })

        if (!booking) {
            throw new ResponseError(404, "Booking not found")
        }

        return booking
    }
}
