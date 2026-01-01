import { event_booking } from "@prisma/client"

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
export function toPaymentResponse(booking: event_booking): PaymentResponse {
    return {
        eventBookingId: booking.event_booking_id,
        totalPrice: Number(booking.total_price ?? 0),
        status: booking.status ?? ""
    }
}
