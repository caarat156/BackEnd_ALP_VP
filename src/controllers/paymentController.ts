import { NextFunction, Response } from "express"
import { UserRequest } from "../models/userRequestModel"
import { PaymentService } from "../services/paymentService"

export class PaymentController {
    static async checkout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await PaymentService.checkout(req.user!, req.body)
            res.status(200).json({ data: response })
        } catch (error) {
            next(error)
        }
    }

    static async getBooking(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const bookingId = Number(req.params.id)
            const response = await PaymentService.getBooking(req.user!, bookingId)
            res.status(200).json({ data: response })
        } catch (error) {
            next(error)
        }
    }
}
