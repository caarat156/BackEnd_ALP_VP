import { Request, Response } from "express";
import { PaymentService } from "../services/paymentService";
import { AuthRequest } from "../middlewares/authMiddleware"; // Pastikan import AuthRequest
import { sendErrorResponse } from "../error/responseError"; // Gunakan helper error

export const paymentController = {
    async checkout(req: Request, res: Response) {
        try {
            // Gunakan AuthRequest untuk mengambil user dari token
            const user = (req as AuthRequest).user;

            // Panggil Service untuk menyimpan data ke database
            const booking = await PaymentService.checkout(user, req.body);

            return res.status(201).json({
                success: true,
                message: "Checkout success",
                data: booking, // Tampilkan data booking yang baru dibuat
            });
        } catch (error) {
            return sendErrorResponse(res, error);
        }
    },

    async getBooking(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const booking = await PaymentService.getBooking(id); // Gunakan Service juga di sini

            return res.json({
                success: true,
                data: booking
            });
        } catch (error) {
            return sendErrorResponse(res, error);
        }
    },
};