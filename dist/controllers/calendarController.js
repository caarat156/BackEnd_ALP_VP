"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalendarEvents = void 0;
const databaseUtil_1 = require("../utils/databaseUtil");
const getCalendarEvents = async (req, res) => {
    try {
        const { date, month, year } = req.query;
        let filter = {};
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
        const schedules = await databaseUtil_1.prismaClient.eventSchedule.findMany({
            where: filter,
            include: {
                PerformanceEvent: true,
            },
        });
        return res.json(schedules);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.getCalendarEvents = getCalendarEvents;
