import { NextFunction, Request, Response } from "express"
import { CalendarService } from "../services/calendarService"

export class CalendarController {

    static async getHolidays(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const year = Number(req.query.year)
            const country = req.query.country as string | undefined

            if (isNaN(year)) {
                throw new Error("Invalid year")
            }

            if (!country || country.trim() === "") {
                throw new Error("Invalid country");
            }

            const response = await CalendarService.getHolidays(year, country)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}
