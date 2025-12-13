import { Request, Response } from "express";
import { prismaClient } from "../utils/databaseUtil";
import { PaymentSchema } from "../validations/paymentValidation";

export const checkoutPayment = async (req: Request, res: Response) => {
    try {
        const data = PaymentSchema.parse(req.body);

        const { userId, performanceEventId, eventScheduleId, quantity } = data;
        // Cek schedule
        const schedule = await prismaClient.eventSchedule.findUnique({
        where: { eventScheduleId },
        });

    if (!schedule) {
    return res.status(404).json({ message: "Schedule not found" });
        }

        // Hitung total harga
    const totalPrice = schedule.price * quantity;

        // Buat booking
    const booking = await prismaClient.eventBooking.create({
        data: {
        userId,
        performanceEventId,
        eventScheduleId,
        quantity,
        totalPrice,
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

    const booking = await prismaClient.eventBooking.findUnique({
        where: { eventBookingId: id },
        include: {
            PerformanceEvent: true,
            EventSchedule: true,
        },
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
