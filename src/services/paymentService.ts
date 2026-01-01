import { prismaClient } from "../utils/databaseUtil"
import { PaymentSchema } from "../validations/paymentValidation"
import { ResponseError } from "../error/responseError"
import { Prisma } from "@prisma/client"

export class PaymentService {

    static async checkout(user: any, request: unknown) {
        const data = PaymentSchema.parse(request)

        const schedule = await prismaClient.event_schedule.findUnique({
        where: { event_schedule_id: data.eventScheduleId }
        })

        if (!schedule || !schedule.price) {
        throw new ResponseError(404, "Schedule not found")
        }

        const event = await prismaClient.performance_event.findUnique({
        where: { performance_event_id: data.performanceEventId }
        })

        if (!event) {
        throw new ResponseError(404, "Event not found")
        }

        const totalPrice = new Prisma.Decimal(schedule.price)
        .mul(data.quantity)

        return prismaClient.event_booking.create({
        data: {
            user_id: user.user_id,
            performance_event_id: data.performanceEventId,
            quantity: data.quantity,
            total_price: totalPrice,
            status: "PAID"
        }
        })
    }

    static async getBooking(bookingId: number) {
        const booking = await prismaClient.event_booking.findUnique({
        where: { event_booking_id: bookingId },
        include: {
            performance_event: true,
            users: true
        }
        })

        if (!booking) {
        throw new ResponseError(404, "Booking not found")
        }

        return booking
    }
}
