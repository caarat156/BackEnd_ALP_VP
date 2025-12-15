import { Request, Response } from "express";
import { prismaClient } from "../utils/databaseUtil";

export const getCalendarEvents = async (req: Request, res: Response) => {
    try {
        const { date, month, year } = req.query;

        let filter: any = {};

        // 1) Jika filter by specific date
        if (date) {
        const parsed = new Date(String(date));
        if (isNaN(parsed.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
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
};
