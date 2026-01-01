import { Request, Response } from "express"
import { PensiService } from "../services/pensiService"

export class PensiController {

    static async getAllPensi(req: Request, res: Response) {
        try {
        const data = await PensiService.getAllPensi()
        res.json({ status: true, data })
        } catch (e: any) {
        res.status(500).json({
            status: false,
            message: e.message
        })
        }
    }

    static async getPensiDetail(req: Request, res: Response) {
        try {
        const id = Number(req.params.id)
        const data = await PensiService.getPensiDetail(id)
        res.json({ status: true, data })
        } catch (e: any) {
        res.status(e.status ?? 500).json({
            status: false,
            message: e.message
        })
        }
    }

    static async getSchedulesByEvent(req: Request, res: Response) {
        try {
        const id = Number(req.params.id)
        const data = await PensiService.getSchedulesByEvent(id)
        res.json({ status: true, data })
        } catch (e: any) {
        res.status(e.status ?? 500).json({
            status: false,
            message: e.message
        })
        }
    }
}
