import { Request, Response } from "express";
import { prismaClient } from "../utils/databaseUtil";
import { PaymentSchema } from "../validations/paymentValidation";

export const checkoutPayment = async (req: Request, res: Response) => {
    try {
        const data = PaymentSchema.parse(req.body);

        const { userId, performanceEventId, eventScheduleId, quantity } = data;
        // Cek schedule
        const schedule = await prismaClient.event_schedule.findUnique({
        where: { event_schedule_id: eventScheduleId },
        });

    if (!schedule) {
    return res.status(404).json({ message: "Schedule not found" });
        }

        // Hitung total harga
    const totalPrice = Number(schedule.price!) * quantity;

        // Buat booking
    const booking = await prismaClient.event_booking.create({
        data: {
        user_id: userId,
        performance_event_id: performanceEventId,
        quantity,
        total_price: new Decimal(totalPrice),
        status: "PAID", // Dummy success
        },
        });

        return res.json({
        message: "Payment successful (dummy)",
        booking,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
    };

    export const getBooking = async (req: Request, res: Response) => {
    try {
    const id = Number(req.params.id);

    const booking = await prismaClient.event_booking.findUnique({
        where: { event_booking_id: id },
        include: {
            performance_event: true,
            event_schedule: true,
        },users
        });

        if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
        }

        return res.json(booking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
