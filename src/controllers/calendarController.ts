import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getCalendarEvents = async (req: Request, res: Response) => {
const { date, month, year } = req.query;

let filter: any = {};

if (date) filter.date = new Date(String(date));
if (month && year) {
filter.date = {
gte: new Date(`${year}-${month}-01`),
lt: new Date(`${year}-${Number(month) + 1}-01`),
};
}

const schedules = await prisma.eventSchedule.findMany({
where: filter,
include: {
PerformanceEvent: true,
},
});

res.json(schedules);
};