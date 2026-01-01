import { event_booking } from "@prisma/client"

/* ================= REQUEST ================= */
export interface PaymentCreateRequest {
    performanceEventId: number
    eventScheduleId: number
    quantity: number
}

export interface PaymentResponse {
    eventBookingId: number
    totalPrice: number
    status: string
}

export function toPaymentResponse(booking: event_booking): PaymentResponse {
    return {
        eventBookingId: booking.event_booking_id,
        totalPrice: Number(booking.total_price),
        status: booking.status ?? ""
    }
}
