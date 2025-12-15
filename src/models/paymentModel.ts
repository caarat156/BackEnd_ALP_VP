import { EventBooking } from "@prisma/client"

/* ================= REQUEST ================= */
export interface PaymentCreateRequest {
    performanceEventId: number
    eventScheduleId: number
    quantity: number
}

/* ================= RESPONSE ================= */
export interface PaymentResponse {
    eventBookingId: number
    totalPrice: number
    status: string
}

/* ================= MAPPER ================= */
export function toPaymentResponse(booking: EventBooking): PaymentResponse {
    return {
    eventBookingId: booking.eventBookingId,
    totalPrice: booking.totalPrice,
    status: booking.status,
    }
}