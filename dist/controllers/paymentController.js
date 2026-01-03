"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooking = exports.checkoutPayment = void 0;
const databaseUtil_1 = require("../utils/databaseUtil");
const paymentValidation_1 = require("../validations/paymentValidation");
const checkoutPayment = async (req, res) => {
    try {
        const data = paymentValidation_1.PaymentSchema.parse(req.body);
        const { userId, performanceEventId, eventScheduleId, quantity } = data;
        // Cek schedule
        const schedule = await databaseUtil_1.prismaClient.eventSchedule.findUnique({
            where: { eventScheduleId },
        });
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }
        // Hitung total harga
        const totalPrice = schedule.price * quantity;
        // Buat booking
        const booking = await databaseUtil_1.prismaClient.eventBooking.create({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.checkoutPayment = checkoutPayment;
const getBooking = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const booking = await databaseUtil_1.prismaClient.eventBooking.findUnique({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.getBooking = getBooking;
