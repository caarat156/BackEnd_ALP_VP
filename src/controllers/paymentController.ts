import { Request, Response } from "express";
import { prismaClient } from "../utils/databaseUtil";
import { PaymentSchema } from "../validations/paymentValidation";

export const paymentController = {
    async checkout(req: Request, res: Response) {
        try {
        const data = PaymentSchema.parse(req.body);
        const { userId, performanceEventId, eventScheduleId, quantity } = data;

        const schedule = await prismaClient.event_schedule.findUnique({
            where: { event_schedule_id: eventScheduleId },
        });

        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        return res.status(201).json({
            success: true,
            message: "Checkout success",
        });
        } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
        }
    },

    async getBooking(req: Request, res: Response) {
        try {
        const id = Number(req.params.id);

        const booking = await prismaClient.event_booking.findUnique({
            where: { event_booking_id: id },
            include: {
            performance_event: true,
            users: true,
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
    },
};
