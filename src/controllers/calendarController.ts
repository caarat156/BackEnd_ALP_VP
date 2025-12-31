import { Request, Response } from "express";
import { CalendarService } from "../services/calendarService";

export class CalendarController {

    static async getCalendar(req: Request, res: Response) {
        try {
        const year = Number(req.query.year);
        const month = Number(req.query.month);

        const data = CalendarService.generateCalendar(year, month);

        res.json({ status: true, data });
        } catch (e: any) {
        res.status(400).json({
            status: false,
            message: e.message
        });
        }
    }

}
