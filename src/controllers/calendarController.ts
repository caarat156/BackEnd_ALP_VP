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

        filter.date = parsed;
        }

        // 2) Jika filter by month & year
        if (month && year) {
        const m = Number(month);
        const y = Number(year);

        if (isNaN(m) || isNaN(y)) {
            return res.status(400).json({ message: "Invalid month/year format" });
        }

        filter.date = {
            gte: new Date(`${y}-${String(m).padStart(2, "0")}-01`),
            lt: new Date(`${y}-${String(m + 1).padStart(2, "0")}-01`),
        };
        }

        const schedules = await prismaClient.event_schedule.findMany({
        where: filter,
        include: {
            performance_event: true,
        },
        });

        return res.json(schedules);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
