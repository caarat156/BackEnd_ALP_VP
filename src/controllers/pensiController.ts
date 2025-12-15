import { NextFunction, Request, Response } from "express"
import { PensiService } from "../services/pensiService"

export class PensiController {

    static async getAllPensi(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await PensiService.getAllPensi()

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getPensiDetail(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const eventId = Number(req.params.id)

            const response = await PensiService.getPensiDetail(eventId)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getSchedulesByEvent(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const eventId = Number(req.params.id)

            const response = await PensiService.getSchedulesByEvent(eventId)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}
