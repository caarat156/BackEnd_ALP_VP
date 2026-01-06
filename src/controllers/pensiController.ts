import { Request, Response } from "express"
import { PensiService } from "../services/pensiService"
import { AuthRequest } from "../middlewares/authMiddleware" // Pastikan import AuthRequest

export class PensiController {

    static async getAllPensi(req: Request, res: Response) {
        try {
            // Ambil query param locationId (misal: ?locationId=1)
            const locationId = req.query.locationId ? Number(req.query.locationId) : undefined;
            
            const data = await PensiService.getAllPensi(locationId)
            res.json({ status: true, message: "Success retrieve events", data })
        } catch (e: any) {
            res.status(500).json({ status: false, message: e.message })
        }
    }

    static async getPensiDetail(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const data = await PensiService.getPensiDetail(id)
            res.json({ status: true, data })
        } catch (e: any) {
            res.status(e.status ?? 500).json({ status: false, message: e.message })
        }
    }

    static async getSchedulesByEvent(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const data = await PensiService.getSchedulesByEvent(id)
            res.json({ status: true, data })
        } catch (e: any) {
            res.status(e.status ?? 500).json({ status: false, message: e.message })
        }
    }

    // Controller History
    static async getHistory(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.user_id;
            if(!userId) throw new Error("Unauthorized");

            const data = await PensiService.getUserHistory(userId);
            res.json({ status: true, message: "Booking history retrieved", data });
        } catch (e: any) {
            res.status(500).json({ status: false, message: e.message })
        }
    }

    // Controller Create (Admin Mode)
    static async createPensi(req: Request, res: Response) {
        try {
            const data = await PensiService.createPensi(req.body);
            res.status(201).json({ status: true, message: "Event created", data });
        } catch (e: any) {
            res.status(500).json({ status: false, message: e.message })
        }
    }
}